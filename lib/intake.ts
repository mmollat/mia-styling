import { z } from "zod";

export const services = {
  dress_me: { slug: "dress-me", name: "Mia, Dress Me", price: 19, short: "Style what I already own.", uploads: true },
  build_my_look: { slug: "build-my-look", name: "Mia, Build My Look", price: 39, short: "Shop me a new look.", uploads: false },
  build_my_fits: { slug: "build-my-fits", name: "Build My Fits", price: 49, short: "Build multiple outfits from my wardrobe.", uploads: true },
  closet_reset: { slug: "closet-reset", name: "Closet Reset", price: 99, short: "Review and refresh my wardrobe.", uploads: true },
} as const;

export type ServiceType = keyof typeof services;
export const serviceKeys = Object.keys(services) as ServiceType[];
export type ServiceSlug = (typeof services)[ServiceType]["slug"];

const serviceTypeBySlug = Object.fromEntries(
  serviceKeys.map((serviceType) => [services[serviceType].slug, serviceType]),
) as Record<ServiceSlug, ServiceType>;

// Service query parameters control intake routing only. They do not verify payment.
export function getServiceTypeFromSlug(value: unknown): ServiceType | null {
  if (typeof value !== "string") return null;
  return serviceTypeBySlug[value as ServiceSlug] ?? null;
}
export const MAX_FILES = 15;
export const MAX_FILE_SIZE = 8 * 1024 * 1024;
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

const required = (label: string) => z.string().trim().min(1, `${label} is required.`).max(2000);
const optional = z.string().trim().max(2000).optional().default("");

const intakeFields = z.object({
  submissionKey: z.string().uuid(),
  fullName: required("Full name").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(254).transform((value) => value.toLowerCase()),
  instagramHandle: required("Instagram handle").max(80).transform((value) => value.replace(/^@/, "")),
  height: required("Height").max(80),
  shirtSize: required("Shirt/top size").max(80),
  waistSize: required("Waist/pants size").max(80),
  shoeSize: required("Shoe size").max(80),
  preferredFit: z.enum(["Slim", "Regular", "Relaxed", "Not sure"]),
  stylePreferences: required("Style preferences"),
  favoriteColors: required("Favorite colors"),
  avoidedColors: required("Colors to avoid"),
  brandsLiked: required("Brands you like"),
  brandsAvoided: required("Brands to avoid"),
  occasion: required("Occasion"),
  occasionDate: z.union([z.literal(""), z.string().date()]).optional().default(""),
  anythingKnow: optional,
  dressFor: optional,
  includePieces: optional,
  excludePieces: optional,
  totalBudget: optional,
  preferredRetailers: optional,
  avoidedRetailers: optional,
  wontWear: optional,
  specificItem: optional,
  shoppingRestrictions: optional,
  lifestyle: optional,
  mostUsedPieces: optional,
  strugglePieces: optional,
  openToPurchase: optional,
  additionsBudget: optional,
  typicalWeek: optional,
  workExpectations: optional,
  weekendStyle: optional,
  wardrobeProblems: optional,
  mostWorn: optional,
  rarelyWorn: optional,
  styleGoals: optional,
  openToGaps: optional,
  improvementBudget: optional,
});

export function getIntakeSchema(serviceType: ServiceType) {
  return intakeFields.superRefine((data, context) => {
    const requireFields = (fields: Array<[keyof typeof data, string]>) => {
      for (const [key, label] of fields) {
        if (!String(data[key] ?? "").trim()) {
          context.addIssue({ code: "custom", path: [key], message: `${label} is required.` });
        }
      }
    };

    if (serviceType === "dress_me") requireFields([["dressFor", "What you need to dress for"]]);
    if (serviceType === "build_my_look") requireFields([["totalBudget", "Total budget"], ["wontWear", "Items you will not wear"]]);
    if (serviceType === "build_my_fits") requireFields([["lifestyle", "Lifestyle"], ["mostUsedPieces", "Most-used pieces"], ["strugglePieces", "Pieces you struggle to style"], ["openToPurchase", "Purchase preference"]]);
    if (serviceType === "closet_reset") requireFields([["typicalWeek", "Typical week"], ["workExpectations", "Work dress expectations"], ["weekendStyle", "Weekend style"], ["wardrobeProblems", "Wardrobe problems"], ["mostWorn", "Most-worn pieces"], ["rarelyWorn", "Rarely-worn pieces"], ["styleGoals", "Style goals"], ["openToGaps", "Wardrobe-gap preference"]]);
  });
}

export type IntakeValues = z.infer<typeof intakeFields>;
