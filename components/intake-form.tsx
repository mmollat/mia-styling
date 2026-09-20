"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MAX_FILES, services, serviceKeys, type ServiceType } from "@/lib/intake";

type FieldErrors = Record<string, string[]>;

function Field({ label, name, required = false, type = "text", error }: { label: string; name: string; required?: boolean; type?: string; error?: string }) {
  return <label className="form-field"><span>{label}{required ? " *" : ""}</span><input name={name} type={type} required={required} aria-invalid={Boolean(error)} />{error && <small>{error}</small>}</label>;
}

function Area({ label, name, required = false, help, error }: { label: string; name: string; required?: boolean; help?: string; error?: string }) {
  return <label className="form-field form-field-wide"><span>{label}{required ? " *" : ""}</span>{help && <em>{help}</em>}<textarea name={name} rows={4} required={required} aria-invalid={Boolean(error)} />{error && <small>{error}</small>}</label>;
}

function Select({ label, name, options, error }: { label: string; name: string; options: string[]; error?: string }) {
  return <label className="form-field"><span>{label} *</span><select name={name} required aria-invalid={Boolean(error)} defaultValue=""><option value="" disabled>Select one</option>{options.map((option) => <option key={option}>{option}</option>)}</select>{error && <small>{error}</small>}</label>;
}

export function IntakeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initial = searchParams.get("service") as ServiceType | null;
  const [serviceType, setServiceType] = useState<ServiceType>(initial && serviceKeys.includes(initial) ? initial : "dress_me");
  const [submissionKey, setSubmissionKey] = useState(() => crypto.randomUUID());
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const service = useMemo(() => services[serviceType], [serviceType]);
  const error = (name: string) => errors[name]?.[0];

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true); setErrors({}); setMessage("");
    const body = new FormData(event.currentTarget);
    body.set("submissionKey", submissionKey);
    body.set("serviceType", serviceType);
    try {
      const response = await fetch("/api/intake", { method: "POST", body });
      const result = await response.json();
      if (!response.ok) {
        setErrors(result.fields ?? {}); setMessage(result.error ?? "Please try again."); setSubmitting(false); return;
      }
      setSubmissionKey(crypto.randomUUID());
      const query = new URLSearchParams({ client: result.client_number, order: result.order_number, service: result.service_type, due: result.due_at });
      router.push(`/intake/success?${query}`);
    } catch {
      setMessage("We could not submit your intake. Check your connection and try again."); setSubmitting(false);
    }
  }

  return <form className="intake-form" onSubmit={submit} noValidate={false}>
    <section className="form-section">
      <p className="section-index">01 — SELECT YOUR SERVICE</p>
      <div className="service-selector">
        {serviceKeys.map((key) => <label className={key === serviceType ? "selected" : ""} key={key}>
          <input type="radio" name="serviceChoice" value={key} checked={key === serviceType} onChange={() => setServiceType(key)} />
          <strong>{services[key].name}</strong><span>${services[key].price}</span><em>{services[key].short}</em>
        </label>)}
      </div>
    </section>

    <section className="form-section">
      <p className="section-index">02 — ABOUT YOU</p>
      <div className="form-grid">
        <Field label="Full name" name="fullName" required error={error("fullName")} />
        <Field label="Email" name="email" type="email" required error={error("email")} />
        <Field label="Instagram handle" name="instagramHandle" required error={error("instagramHandle")} />
        <Field label="Height" name="height" required error={error("height")} />
        <Field label="Usual shirt/top size" name="shirtSize" required error={error("shirtSize")} />
        <Field label="Waist/pants size" name="waistSize" required error={error("waistSize")} />
        <Field label="Shoe size" name="shoeSize" required error={error("shoeSize")} />
        <Select label="Preferred fit" name="preferredFit" options={["Slim", "Regular", "Relaxed", "Not sure"]} error={error("preferredFit")} />
        <Area label="Style preferences / desired look" name="stylePreferences" required error={error("stylePreferences")} />
        <Area label="Favorite colors" name="favoriteColors" required error={error("favoriteColors")} />
        <Area label="Colors you avoid" name="avoidedColors" required error={error("avoidedColors")} />
        <Area label="Brands you like" name="brandsLiked" required error={error("brandsLiked")} />
        <Area label="Brands you dislike or avoid" name="brandsAvoided" required error={error("brandsAvoided")} />
        <Field label="Occasion or styling goal" name="occasion" required error={error("occasion")} />
        <Field label="Occasion date (optional)" name="occasionDate" type="date" error={error("occasionDate")} />
        <Area label="Anything Mia should know?" name="anythingKnow" />
      </div>
    </section>

    <section className="form-section">
      <p className="section-index">03 — {service.name.toUpperCase()}</p>
      <div className="form-grid">
        {serviceType === "dress_me" && <><Area label="What do you need to dress for?" name="dressFor" required error={error("dressFor")} /><Area label="Pieces you want included" name="includePieces" /><Area label="Pieces you want excluded" name="excludePieces" /></>}
        {serviceType === "build_my_look" && <><p className="service-explainer">Mia will recommend pieces from third-party retailers and provide purchase links. Product availability, pricing, sizing, shipping, and returns are controlled by each retailer.</p><Field label="Total outfit budget" name="totalBudget" required error={error("totalBudget")} /><Area label="Preferred retailers" name="preferredRetailers" /><Area label="Retailers to avoid" name="avoidedRetailers" /><Area label="Anything you will not wear" name="wontWear" required error={error("wontWear")} /><Area label="Specific item to build around" name="specificItem" /><Area label="Shopping priorities or restrictions" name="shoppingRestrictions" /></>}
        {serviceType === "build_my_fits" && <><Area label="Describe your lifestyle" name="lifestyle" required error={error("lifestyle")} /><Area label="Your most-used pieces" name="mostUsedPieces" required error={error("mostUsedPieces")} /><Area label="Pieces you struggle to style" name="strugglePieces" required error={error("strugglePieces")} /><Field label="Open to purchasing a few additions?" name="openToPurchase" required error={error("openToPurchase")} /><Field label="Budget for additions (optional)" name="additionsBudget" /></>}
        {serviceType === "closet_reset" && <><Area label="Describe a typical week" name="typicalWeek" required error={error("typicalWeek")} /><Area label="Work dress expectations" name="workExpectations" required error={error("workExpectations")} /><Area label="Weekend style" name="weekendStyle" required error={error("weekendStyle")} /><Area label="Biggest wardrobe problems" name="wardrobeProblems" required error={error("wardrobeProblems")} /><Area label="Most-worn pieces" name="mostWorn" required error={error("mostWorn")} /><Area label="Rarely-worn pieces" name="rarelyWorn" required error={error("rarelyWorn")} /><Area label="Style goals" name="styleGoals" required error={error("styleGoals")} /><Field label="Open to filling wardrobe gaps?" name="openToGaps" required error={error("openToGaps")} /><Field label="Budget for improvements (optional)" name="improvementBudget" /></>}
      </div>
    </section>

    {service.uploads && <section className="form-section">
      <p className="section-index">04 — WARDROBE PHOTOS</p>
      <label className="upload-field"><strong>Upload clear photos of the pieces you want Mia to review *</strong><span>JPG, PNG, or WebP. Up to {MAX_FILES} files, 8 MB each.</span><input name="wardrobePhotos" type="file" accept="image/jpeg,image/png,image/webp" multiple required /></label>
      {error("wardrobePhotos") && <p className="form-error">{error("wardrobePhotos")}</p>}
    </section>}

    <div className="submit-row"><div><p className="micro-label">SELECTED SERVICE</p><strong>{service.name} — ${service.price}</strong></div><button className="button button-dark" type="submit" disabled={submitting}>{submitting ? "SUBMITTING…" : "SUBMIT INTAKE"}<span>↗</span></button></div>
    {message && <p className="form-message" role="alert">{message}</p>}
  </form>;
}
