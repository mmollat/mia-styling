import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Terms of Service", description: "Terms for using MIA Men's Style personalized styling services." };

export default function TermsPage() {
  return (
    <LegalLayout eyebrow="Terms" title="Terms of Service">
      <p>These Terms govern your use of the MIA | Men&apos;s Style website and personalized styling services. By placing an order, you agree to these Terms and our Refund and Privacy Policies.</p>

      <h2>Our service</h2>
      <p>We provide personalized outfit and wardrobe recommendations based on the information and images you submit. The scope of your service, number of looks, included recommendations, revision allowance, and estimated delivery time are described on the service page at the time of purchase.</p>

      <h2>Your information and responsibilities</h2>
      <p>You are responsible for providing accurate sizing, preferences, occasion details, usable wardrobe photos, and any other information reasonably needed to fulfill your order. Turnaround time begins only after we receive a complete intake and usable materials. Delays in providing them may delay delivery.</p>

      <h2>Recommendations are subjective</h2>
      <p>Personal styling involves judgment and individual taste. We aim to reflect the preferences and goals you share, but we cannot guarantee that every recommendation will match your subjective expectations. Garment colors, textures, proportions, and fit may appear differently in photographs, on screens, or in person.</p>

      <h2>Revisions</h2>
      <p>Each listed service includes one reasonable revision to the original styling request. A revision may include changing shoes, replacing a selected garment, or adjusting the style direction within the same occasion and scope. A different occasion, substantially different request, or additional look requires a new order.</p>

      <h2>Shopping recommendations</h2>
      <p>MIA | Men&apos;s Style recommends clothing but does not sell the recommended items directly. Any third-party product recommendation is optional. Availability, sizing, prices, shipping, returns, quality, product descriptions, and other purchase terms are controlled by the third-party retailer and can change. You are responsible for reviewing the retailer&apos;s current terms before purchasing.</p>

      <h2>Delivery estimates</h2>
      <p>Published turnaround periods are good-faith estimates that begin after complete intake. We will communicate if circumstances materially affect delivery. Digital styling deliverables are sent using the contact information supplied with the order.</p>

      <h2>Acceptable use</h2>
      <p>You may not misuse the website, submit unlawful or infringing content, interfere with the service, attempt unauthorized access, impersonate another person, or use the service for fraudulent purposes. You must have the right to provide any photos or other material you submit.</p>

      <h2>Intellectual property</h2>
      <p>The website, branding, layouts, written materials, and styling deliverable format are owned by or licensed to the service operator. After payment, you may use your personalized Fit Card for your own personal, non-commercial use. You may not resell, publish as your own service, or commercially reproduce our materials without permission.</p>

      <h2>Refunds and cancellations</h2>
      <p>Cancellations and refunds are governed by our <a href="/refunds">Refund Policy</a>, which is incorporated into these Terms.</p>

      <h2>Disclaimer and reasonable limitation</h2>
      <p>The service is provided with reasonable care but without a guarantee of a particular personal, social, professional, or commercial result. To the fullest extent permitted by applicable law, the service operator is not responsible for indirect, incidental, or consequential loss arising from use of the service or optional third-party purchases. Nothing in these Terms limits liability that cannot lawfully be limited.</p>

      <h2>Governing terms and contact</h2>
      <p>These Terms are governed by the laws of the State of California, without regard to conflict-of-law principles, except where applicable consumer law requires otherwise. For questions regarding these Terms, contact MIA | Men&apos;s Style via <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">{siteConfig.instagramHandle} on Instagram</a>.</p>
    </LegalLayout>
  );
}
