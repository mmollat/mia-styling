"use client";

import Image from "next/image";
import { FormEvent, useRef, useState } from "react";

const experiences = [
  {
    number: "01",
    label: "Connect",
    title: "The members lounge",
    copy: "Great coffee, comfortable corners, fast Wi-Fi, and room for conversations that turn into drives, deals, and friendships.",
    className: "loungeCard",
  },
  {
    number: "02",
    label: "Create",
    title: "Your private workshop",
    copy: "Reserve a professional lift, use the house tools, and get hands-on without sacrificing your home garage or driveway.",
    className: "workshopCard",
  },
  {
    number: "03",
    label: "Belong",
    title: "Events worth showing up for",
    copy: "Curated drives, technical workshops, guest speakers, watch parties, and low-key evenings at the house.",
    className: "eventsCard",
  },
];

const careServices = [
  ["Battery care", "Smart tender monitoring and charging included with every residency."],
  ["Exercise program", "Scheduled starts, temperature cycling, and tire repositioning."],
  ["Drive-ready service", "Request your car and find it staged, checked, and ready to leave."],
  ["Concierge coordination", "Detailing, transport, inspection, and service appointments managed."],
];

const tiers = [
  {
    name: "Silver",
    tagline: "For the social enthusiast",
    monthly: 125,
    annual: 113,
    cta: "Join Silver",
    features: [
      "Full members lounge access",
      "Two workshop reservations / month",
      "House tool library",
      "Member events and group drives",
      "Guest passes each quarter",
    ],
  },
  {
    name: "Gold",
    tagline: "For the active collector",
    monthly: 225,
    annual: 203,
    cta: "Join Gold",
    featured: true,
    features: [
      "Everything in Silver",
      "Four workshop reservations / month",
      "Preferred storage rate",
      "Priority booking and staging",
      "One complimentary wash / month",
    ],
  },
  {
    name: "Platinum",
    tagline: "For the committed custodian",
    monthly: 425,
    annual: 383,
    cta: "Join Platinum",
    dark: true,
    features: [
      "Everything in Gold",
      "Unlimited workshop reservations",
      "Best available storage rate",
      "Monthly hand detail for one stored car",
      "Drive-ready concierge service",
      "After-hours access and private locker",
    ],
  },
];

export default function Home() {
  const [period, setPeriod] = useState<"monthly" | "annual">("monthly");
  const [submitted, setSubmitted] = useState(false);
  const [selectedTier, setSelectedTier] = useState("I'm still exploring");
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openTour(tier?: string) {
    if (tier) setSelectedTier(tier);
    setSubmitted(false);
    dialogRef.current?.showModal();
  }

  function submitTour(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      <section className="hero" id="top">
        <Image
          src="/images/apex-house-hero.png"
          alt="Modern performance cars inside the Apex House members lounge and workshop"
          fill
          priority
          loading="eager"
          className="heroImage"
          sizes="100vw"
        />
        <div className="heroShade" />
        <div className="heroContent">
          <p className="eyebrow">Private automotive club <span>Est. 2026</span></p>
          <h1>More than a garage.<br /><em>Your place to belong.</em></h1>
          <p className="heroCopy">
            A private home for remarkable cars and the people who appreciate them.
            Lounge, connect, wrench, and drive.
          </p>
          <div className="heroActions">
            <button className="button buttonLight" onClick={() => openTour()}>
              Become a founding member
            </button>
            <a className="textLink" href="#experience">Discover the house <span>↘</span></a>
          </div>
        </div>
        <div className="heroMeta">
          {["Members lounge", "Collector storage", "Private workshop"].map((item, index) => (
            <div key={item}><span>0{index + 1}</span><p>{item}</p></div>
          ))}
        </div>
      </section>

      <section className="intro section" id="house">
        <p className="sectionIndex">01 / The idea</p>
        <div className="introGrid">
          <h2>Built around the drive.<br /><em>Designed around you.</em></h2>
          <div className="introBody">
            <p>
              Apex House is where car culture meets genuine hospitality. Come for
              coffee, stay for the conversation, and know your vehicle is cared for
              like one of our own.
            </p>
            <p>
              No velvet ropes. No showroom pressure. Just a considered space for
              enthusiasts, builders, collectors, and the naturally curious.
            </p>
          </div>
        </div>
      </section>

      <section className="featureGrid" id="experience">
        {experiences.map((item) => (
          <article className={`featureCard ${item.className}`} key={item.number}>
            <div className="cardNumber">{item.number}</div>
            <div>
              <p className="eyebrow">{item.label}</p>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="storage section" id="storage">
        <div className="storageHeading">
          <p className="sectionIndex">02 / Vehicle residency</p>
          <h2>Your car deserves<br /><em>more than a parking spot.</em></h2>
        </div>
        <div className="storageLayout">
          <div className="storageVisual">
            <Image
              src="/images/apex-house-hero.png"
              alt="A modern silver performance car in climate-controlled storage"
              fill
              sizes="(max-width: 900px) 100vw, 60vw"
            />
            <div className="temperature">
              <span>Climate</span><strong>68°</strong><small>Monitored 24/7</small>
            </div>
          </div>
          <div className="storageServices">
            <p className="lead">
              Secure, climate-controlled residency with attentive care and
              on-demand access. Your vehicle stays ready for the next great road.
            </p>
            {careServices.map(([title, copy], index) => (
              <div className="serviceRow" key={title}>
                <span>0{index + 1}</span>
                <div><h4>{title}</h4><p>{copy}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="memberships section" id="memberships">
        <div className="membershipHeading">
          <div>
            <p className="sectionIndex">03 / Memberships</p>
            <h2>Choose your<br /><em>level of access.</em></h2>
          </div>
          <p>
            Memberships are intentionally limited to keep the house personal,
            available, and worth returning to.
          </p>
        </div>

        <div className="tierTabs">
          <button className={period === "monthly" ? "active" : ""} onClick={() => setPeriod("monthly")}>
            Monthly
          </button>
          <button className={period === "annual" ? "active" : ""} onClick={() => setPeriod("annual")}>
            Annual <span>Save 10%</span>
          </button>
        </div>

        <div className="tierGrid">
          {tiers.map((tier) => (
            <article
              className={`tierCard ${tier.featured ? "featured" : ""} ${tier.dark ? "dark" : ""}`}
              key={tier.name}
            >
              {tier.featured && <div className="popular">Most popular</div>}
              <p className="tierName">{tier.name}</p>
              <p className="tierFor">{tier.tagline}</p>
              <p className="price">
                <span>$</span><strong>{tier[period]}</strong><small>/ month</small>
              </p>
              <button
                className={`button ${tier.dark ? "buttonLight" : tier.featured ? "buttonGold" : "buttonOutline"}`}
                onClick={() => openTour(tier.name)}
              >
                {tier.cta}
              </button>
              <ul>{tier.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            </article>
          ))}
        </div>
        <p className="pricingNote">
          Vehicle residency is billed separately. Founding rates shown for concept purposes.
        </p>
      </section>

      <section className="finalCta">
        <p className="eyebrow">Founding membership</p>
        <h2>There&apos;s a space here<br /><em>with your name on it.</em></h2>
        <p>Be among the first to call Apex House your automotive home.</p>
        <button className="button buttonLight" onClick={() => openTour()}>Request a private tour</button>
      </section>

      <footer>
        <a className="brand footerBrand" href="#top"><i aria-hidden="true" /> APEX HOUSE</a>
        <p>A private automotive club for people who never really stopped looking back at their car.</p>
        <div className="footerLinks">
          <a href="#house">The house</a><a href="#storage">Vehicle care</a>
          <a href="#memberships">Memberships</a><a href="mailto:hello@apexhouse.club">Contact</a>
        </div>
        <div className="footerBottom"><span>© 2026 Apex House</span><span>Concept website</span></div>
      </footer>

      <dialog className="tourModal" ref={dialogRef} onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current?.close();
      }}>
        <button className="modalClose" aria-label="Close" onClick={() => dialogRef.current?.close()}>×</button>
        {!submitted ? (
          <>
            <p className="eyebrow">Come see the house</p>
            <h2>Request a private tour</h2>
            <p className="modalCopy">Tell us a little about yourself. We&apos;ll reach out to arrange a personal walk-through.</p>
            <form onSubmit={submitTour}>
              <label>Name<input name="name" type="text" placeholder="Your full name" required /></label>
              <label>Email<input name="email" type="email" placeholder="you@example.com" required /></label>
              <label>
                Membership interest
                <select value={selectedTier} onChange={(event) => setSelectedTier(event.target.value)}>
                  <option>I&apos;m still exploring</option><option>Silver</option>
                  <option>Gold</option><option>Platinum</option><option>Vehicle residency only</option>
                </select>
              </label>
              <label>What do you drive?<input name="vehicle" type="text" placeholder="Tell us about your car(s)" /></label>
              <button className="button buttonGold" type="submit">Send request</button>
            </form>
          </>
        ) : (
          <div className="formSuccess">
            <span>✓</span><h3>You&apos;re on the list.</h3>
            <p>Thanks for your interest. We&apos;ll be in touch to arrange your tour.</p>
          </div>
        )}
      </dialog>
    </main>
  );
}
