import Image from "next/image";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";
import { serviceHref, siteConfig, type ServiceKey } from "@/lib/site-config";

const steps = [
  { number: "01", title: "Tell Mia what you need", body: "Choose your service and tell us about the occasion, your style preferences, sizing, and what you want your outfit to say about you." },
  { number: "02", title: "Share your wardrobe—or your wish list", body: "Upload the pieces you want Mia to style, or ask her to build a new purchasable look around your size, style, occasion, and budget." },
  { number: "03", title: "Get your fit", body: "Receive a personalized MIA Fit Card showing exactly what to wear, how to put the outfit together, and available alternatives." },
];

const services: Array<{ key: ServiceKey; name: string; price: string; tagline: string; description?: string; note?: string; delivery: string; features: string[] }> = [
  { key: "dressMe", name: "Mia, Dress Me", price: "$19", tagline: "Style what I already own.", delivery: "Delivered within 48 hours after complete intake is received", features: ["Styling for one occasion", "One complete outfit from your wardrobe", "Shoes and accessories", "One alternate option", "One revision"] },
  { key: "buildMyLook", name: "Mia, Build My Look", price: "$39", tagline: "Shop me a new look.", description: "Starting from scratch? Let Mia shop a personalized head-to-toe outfit based on your style, size, occasion, and budget.", delivery: "Delivered within 48 hours after complete intake is received", features: ["One complete head-to-toe outfit", "Specific clothing recommendations", "Shoes and accessories", "Purchase links", "Recommendations within your stated budget", "Alternate options for key pieces", "One revision"] },
  { key: "buildMyFits", name: "Build My Fits", price: "$49", tagline: "Build multiple outfits from my wardrobe.", note: "Best for building a few looks", delivery: "Delivered within 48 hours after complete intake is received", features: ["Three complete outfits", "Shoes and accessories", "Alternate styling options", "Closet gap analysis", "Up to 3 shopping recommendations", "One revision"] },
  { key: "closetReset", name: "Closet Reset", price: "$99", tagline: "Review and refresh my wardrobe.", delivery: "Delivered within 3–4 days after complete intake is received", features: ["Closet review", "Seven complete outfits", "Shoes and accessories", "Alternate styling options", "Wardrobe gap analysis", "Up to 7 shopping recommendations", "One revision"] },
];

const faqs = [
  ["When does my turnaround time begin?", "Turnaround begins after we receive your completed style intake and the wardrobe photos or shopping details needed for your service."],
  ["Can Mia create an outfit if I don't already own the clothes?", "Yes. Choose “Mia, Build My Look.” Tell Mia your size, style preferences, occasion, and budget, and you'll receive a complete outfit with specific clothing, shoe, and accessory recommendations and purchase links."],
  ["Do I need to buy new clothes?", "Only if you choose Mia, Build My Look or decide to purchase an optional recommendation. Our other services begin with the wardrobe you already own."],
  ["Do I have to send a photo of myself?", "No. Personal photos are optional. They can help when you want fit or proportion guidance."],
  ["What counts as a revision?", "A revision is a reasonable adjustment to the original styling request, such as changing shoes, replacing a selected garment, or adjusting the style direction. Styling for an entirely different occasion requires a new order."],
  ["Can I get a refund?", "Orders may be cancelled and refunded before styling work begins. Once styling work has started, styling fees are non-refundable. If MIA | Men's Style is unable to complete the purchased service, the applicable service fee will be refunded."],
];

export default function HomePage() {
  return (
    <main>
      <Header />

      <section className="hero">
        <div className="hero-image" aria-hidden="true">
          <Image src="/mia-hero.jpg" alt="" fill priority sizes="100vw" />
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <div className="container hero-content">
          <div className="hero-copy">
            <p className="eyebrow light">MIA | Men&apos;s Style</p>
            <p className="hero-kicker">Personal styling, made simple.</p>
            <h1>Your personal stylist.<br />Your closet. Your style—<em>put together.</em></h1>
            <p className="hero-support">Tell Mia where you&apos;re going and choose whether to style what you already own or shop a completely new look built around your size, preferences, occasion, and budget.</p>
            <div className="button-row">
              <a href="#services" className="button button-light">Get Styled <span aria-hidden="true">↗</span></a>
              <a href="#how-it-works" className="button button-ghost">See How It Works</a>
            </div>
          </div>
          <p className="hero-aside">01 / A better way to get dressed</p>
        </div>
      </section>

      <section className="intro section-pad">
        <div className="container intro-grid">
          <p className="section-index">01 — The approach</p>
          <div>
            <h2>Style starts with what&apos;s already yours.</h2>
            <p>We can style what you already own or build a completely new, purchasable look around your size, preferences, occasion, and budget.</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how section-pad">
        <div className="container">
          <div className="section-heading">
            <p className="section-index">02 — How it works</p>
            <h2>From occasion to outfit<br />in three simple steps.</h2>
          </div>
          <div className="steps-grid">
            {steps.map((step) => (
              <article className="step-card" key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="services section-pad">
        <div className="container">
          <div className="section-heading split">
            <div>
              <p className="section-index">03 — Services</p>
              <h2>Choose the level of<br />styling you need.</h2>
            </div>
            <p>Style the clothes you own, shop a new head-to-toe look, or refresh your wardrobe. Every service is personal. No subscription.</p>
          </div>
          <div className="pricing-grid">
            {services.map((service) => (
              <article className={`price-card ${service.note ? "featured" : ""}`} key={service.key}>
                {service.note && <p className="service-note">{service.note}</p>}
                <div className="price-head">
                  <h3>{service.name}</h3>
                  <p>{service.price}</p>
                </div>
                <p className="service-tagline">{service.tagline}</p>
                {service.description && <p className="service-description">{service.description}</p>}
                <ul>
                  {service.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <p className="delivery">{service.delivery}</p>
                <a href={serviceHref(service.key)} className={`button ${service.note ? "button-light" : "button-outline"}`}>
                  Choose {service.name} <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fit-section section-pad">
        <div className="container fit-grid">
          <div className="fit-copy">
            <p className="section-index">04 — What you receive</p>
            <h2>Your look,<br /><em>clearly laid out.</em></h2>
            <p>Your MIA Fit Card lays out a complete look—whether styled from your wardrobe or shopped from scratch—with clear guidance and thoughtful alternatives.</p>
            <div className="fit-stat"><strong>1</strong><span>clear, complete<br />styling plan</span></div>
          </div>
          <article className="fit-card">
            <header><div><span>MIA</span> FIT</div><p>FIT—0001</p></header>
            <div className="fit-card-body">
              <p className="micro-label">THE FIT</p>
              <ol className="outfit-list">
                <li><span>01</span> Black quarter-zip</li>
                <li><span>02</span> White tapered trousers</li>
                <li><span>03</span> Toffee leather sneakers</li>
                <li><span>04</span> Rose-gold watch</li>
                <li><span>05</span> Black belt</li>
              </ol>
              <div className="notes-grid">
                <div><p className="micro-label">MIA&apos;S NOTES</p><p>The clean contrast sharpens the silhouette while warm leather keeps the look relaxed and considered.</p></div>
                <div><p className="micro-label">SWAP IT</p><p>Trade the quarter-zip for your charcoal knit polo for a softer, more casual finish.</p></div>
              </div>
              <div className="missing-piece"><p className="micro-label">MISSING PIECE</p><p>No purchase needed—this fit works with what you own.</p></div>
            </div>
            <footer>PERSONAL STYLING, MADE SIMPLE. <span>MIA / 01</span></footer>
          </article>
        </div>
      </section>

      <section id="faq" className="faq section-pad">
        <div className="container faq-grid">
          <div><p className="section-index">05 — FAQ</p><h2>Good questions.<br />Straight answers.</h2></div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary><span>{question}</span><span className="plus" aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact section-pad">
        <div className="container contact-grid">
          <div>
            <p className="section-index light">06 — Contact</p>
            <h2>Questions before<br />getting styled?</h2>
          </div>
          <div className="contact-cta">
            <p>Send Mia a message on Instagram. She&apos;ll help you figure out which styling service is right for you.</p>
            <a className="button button-light" href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
              Message Mia on Instagram <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
