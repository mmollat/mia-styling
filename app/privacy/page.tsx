import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Privacy Policy", description: "How MIA Men's Style collects, uses, and handles customer information." };

export default function PrivacyPage() {
  return (
    <LegalLayout eyebrow="Privacy" title="Privacy Policy">
      <p>This policy explains what information MIA | Men&apos;s Style collects when you visit our website or purchase a personalized styling service, why we collect it, and the choices available to you.</p>

      <h2>Information you provide</h2>
      <p>Depending on how you use our service, you may provide your name, email address, sizing information, style preferences, wardrobe photos, optional personal photos, occasion details, messages, and order- or payment-related information.</p>

      <h2>How we use information</h2>
      <p>We use the information you provide to respond to questions, process and fulfill orders, understand your styling request, prepare your personalized recommendations and Fit Cards, provide revisions, prevent misuse, maintain business records, and comply with applicable obligations.</p>

      <h2>Photos and styling details</h2>
      <p>Wardrobe photos help us identify items you already own. Personal photos are optional and, when supplied, may be used to provide fit and proportion guidance. Please do not submit photos or information you do not want used to complete your service.</p>

      <h2>Payments</h2>
      <p>Payments are processed by our payment provider. Payment card details are submitted directly to that provider and are not stored directly by this website. We may receive limited transaction information such as payment status, amount, and an order reference.</p>

      <h2>Service providers and disclosures</h2>
      <p>We may use service providers to support website hosting, communications, file storage, payment processing, and order fulfillment. They may process information only as needed to provide those services. We may also disclose information when reasonably necessary to comply with law, enforce our terms, or protect rights and safety.</p>

      <h2>Retention</h2>
      <p>We retain information for as long as reasonably needed to fulfill your order, provide support, keep necessary business records, resolve disputes, and meet applicable obligations. Retention periods can vary by the type of information and the reason it was collected.</p>

      <h2>Your choices</h2>
      <p>You may ask questions about your information or request access, correction, or deletion by emailing <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>. Some information may need to be retained where required or permitted for legitimate business, legal, fraud-prevention, or recordkeeping purposes.</p>

      <h2>Children&apos;s privacy</h2>
      <p>The service is not directed to children, and we do not knowingly seek personal information from children.</p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy as the service changes. The effective date above identifies the current version.</p>

      <h2>Contact</h2>
      <p>For privacy questions or deletion requests, contact {siteConfig.operatorName} at <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>.</p>
      <p className="placeholder-note"><strong>Launch note:</strong> Replace the operator-name and support-domain placeholders in <code>lib/site-config.ts</code> before accepting orders.</p>
    </LegalLayout>
  );
}
