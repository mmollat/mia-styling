import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Refund Policy", description: "Cancellation and refund terms for MIA Men's Style services." };

export default function RefundsPage() {
  return (
    <LegalLayout eyebrow="Orders" title="Refund Policy">
      <p>Because MIA | Men&apos;s Style provides personalized digital styling work, refund eligibility depends on whether work on your order has begun.</p>

      <h2>Before styling work begins</h2>
      <p>You may cancel your order for a full refund before styling work begins. Contact us as soon as possible via <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">{siteConfig.instagramHandle} on Instagram</a> with the email used for your order and your order reference.</p>

      <h2>After styling work begins</h2>
      <p>Once styling work has begun, styling fees are non-refundable. Work may begin after we receive the complete style intake and usable wardrobe photos needed for your selected service.</p>

      <h2>If we cannot complete your service</h2>
      <p>If MIA | Men&apos;s Style is unable to complete the purchased service, we will refund the applicable service fee. We may first contact you if missing, incomplete, or unusable intake materials are preventing fulfillment.</p>

      <h2>Revisions</h2>
      <p>Each service includes one reasonable revision within the original request. Dissatisfaction that can reasonably be addressed through the included revision does not automatically qualify the order for a refund. Requests for a different occasion or a substantially different service are treated as new orders.</p>

      <h2>How refunds are issued</h2>
      <p>Approved refunds are returned to the original payment method. Your payment provider or financial institution may require additional time to post the credit after it is issued.</p>

      <h2>Contact</h2>
      <p>To request a cancellation or ask about this policy, message <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">{siteConfig.instagramHandle} on Instagram</a>.</p>
    </LegalLayout>
  );
}
