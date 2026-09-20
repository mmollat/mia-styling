import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { ALLOWED_FILE_TYPES, intakeSchema, MAX_FILES, MAX_FILE_SIZE, services } from "@/lib/intake";

export const runtime = "nodejs";

function safeFilename(filename: string) {
  const extension = filename.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  return `${crypto.randomUUID()}.${extension}`;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("wardrobePhotos").filter((item): item is File => item instanceof File && item.size > 0);
    const fields = Object.fromEntries([...formData.entries()].filter(([, value]) => typeof value === "string"));
    const parsed = intakeSchema.safeParse(fields);

    if (!parsed.success) {
      return NextResponse.json({ error: "Please review the highlighted fields.", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const service = services[parsed.data.serviceType];
    if (service.uploads && files.length === 0) {
      return NextResponse.json({ error: "Please upload at least one clear wardrobe photo.", fields: { wardrobePhotos: ["At least one wardrobe photo is required."] } }, { status: 400 });
    }
    if (files.length > MAX_FILES) return NextResponse.json({ error: `Upload no more than ${MAX_FILES} photos.` }, { status: 400 });
    for (const file of files) {
      if (!ALLOWED_FILE_TYPES.includes(file.type as (typeof ALLOWED_FILE_TYPES)[number])) return NextResponse.json({ error: "Photos must be JPG, PNG, or WebP files." }, { status: 400 });
      if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: `${file.name} is larger than 8 MB.` }, { status: 400 });
    }

    const supabase = createSupabaseAdminClient();
    const { data: existing } = await supabase.from("mia_orders").select("order_number,service_type,due_at,mia_clients(client_number)").eq("submission_key", parsed.data.submissionKey).maybeSingle();
    if (existing) {
      const relatedClient = Array.isArray(existing.mia_clients) ? existing.mia_clients[0] : existing.mia_clients;
      return NextResponse.json({ client_number: relatedClient?.client_number, order_number: existing.order_number, service_type: existing.service_type, due_at: existing.due_at });
    }
    const uploaded: Array<{ storage_path: string; original_filename: string; file_type: string; file_size: number }> = [];
    for (const file of files) {
      const path = `${parsed.data.submissionKey}/${safeFilename(file.name)}`;
      const { error } = await supabase.storage.from("mia-wardrobe-images").upload(path, file, { contentType: file.type, upsert: false });
      if (error) {
        if (uploaded.length) await supabase.storage.from("mia-wardrobe-images").remove(uploaded.map((item) => item.storage_path));
        return NextResponse.json({ error: "We could not securely upload your photos. Please try again." }, { status: 500 });
      }
      uploaded.push({ storage_path: path, original_filename: file.name, file_type: file.type, file_size: file.size });
    }

    const { submissionKey, fullName, email, instagramHandle, serviceType, occasion, occasionDate, ...intakeData } = parsed.data;
    const { data, error } = await supabase.rpc("mia_complete_intake", {
      p_submission_key: submissionKey,
      p_full_name: fullName,
      p_email: email,
      p_instagram_handle: instagramHandle,
      p_service_type: serviceType,
      p_amount: service.price,
      p_occasion: occasion,
      p_occasion_date: occasionDate || null,
      p_intake_data: intakeData,
      p_files: uploaded,
    });

    if (error) {
      if (uploaded.length) await supabase.storage.from("mia-wardrobe-images").remove(uploaded.map((item) => item.storage_path));
      return NextResponse.json({ error: "We could not save your intake. Please try again." }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "The intake service is not configured yet. Please try again later." }, { status: 503 });
  }
}
