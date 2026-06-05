import Image from "next/image";

const fitments = [
  ["Model 3", "19x9.5 +30", "Daily flush stance"],
  ["Model 3 Performance", "20x9.5 +32", "Factory-plus upgrade"],
  ["Model Y", "20x10 +35", "SUV fitment balance"],
];

const specs = [
  ["Construction", "Forged or flow-formed first-run targets"],
  ["Finish", "Satin graphite, brushed silver, gloss black concepts"],
  ["Fitment", "Tesla-focused offsets with real-world clearance in mind"],
  ["Intent", "Strength, stance, and daily drivability before hype"],
];

const process = [
  ["01", "Validate Fitment", "Start with Tesla platforms and sizing that works on real cars."],
  ["02", "Build Interest", "Collect owner feedback before locking a production run."],
  ["03", "Refine Specs", "Dial finishes, widths, offsets, and load targets around demand."],
];

export default function Home() {
  return (
    <main className="site">
      <section className="hero">
        <Image
          src="/images/mpw-hero.jpg"
          alt="Performance sedan with MPW concept wheels"
          fill
          priority
          className="heroImage"
        />
        <div className="heroOverlay" />

        <div className="heroContent">
          <p className="eyebrow">Mollat Performance Wheel</p>
          <h1>
            Performance wheels
            <br />
            for Tesla fitment.
          </h1>

          <p>
            MPW is exploring a limited first run of clean, aggressive wheel
            fitments built around stance, strength, and everyday drivability.
          </p>

          <div className="heroActions">
            <a href="#interest" className="primaryBtn">
              Join The First Run
            </a>
            <a href="#wheel" className="ghostBtn">
              View Concept
            </a>
          </div>
        </div>
      </section>

      <section className="signalBand" aria-label="MPW highlights">
        {[
          "Tesla-first sizing",
          "Direct manufacturing relationships",
          "Real-world fitment testing",
          "Limited first-run concept",
        ].map((item) => (
          <div key={item}>{item}</div>
        ))}
      </section>

      <section id="wheel" className="section split">
        <div>
          <p className="eyebrow">The Idea</p>
          <h2>Not another generic wheel page.</h2>
        </div>

        <div className="copyStack">
          <p>
            MPW starts from a simple observation: the right wheel changes the
            whole car. The first concept is aimed at Tesla owners who want a
            sharper stance without turning the car into a fragile showpiece.
          </p>
          <p>
            This is an interest page before it is a store. The goal is to test
            demand, refine the fitments, and see whether a small first run
            deserves to exist.
          </p>
        </div>
      </section>

      <section id="fitments" className="section">
        <div className="sectionHeader">
          <p className="eyebrow">Fitment Targets</p>
          <h2>Focused around the cars people actually modify.</h2>
        </div>

        <div className="fitmentGrid">
          {fitments.map(([model, size, note]) => (
            <article key={`${model}-${size}`} className="fitmentCard">
              <span>{model}</span>
              <strong>{size}</strong>
              <p>{note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section specSection">
        <div className="specPanel">
          <p className="eyebrow">Concept Direction</p>
          <h2>A wheel with purpose before polish.</h2>
          <p>
            Final sizing, construction, pricing, and finishes would be locked
            only after enough real owner interest comes in.
          </p>
        </div>

        <div className="specList">
          {specs.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="first-run" className="section processSection">
        <div className="sectionHeader">
          <p className="eyebrow">First Run</p>
          <h2>Small, measured, and built around feedback.</h2>
        </div>

        <div className="processGrid">
          {process.map(([num, title, text]) => (
            <article key={num} className="processCard">
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="interest" className="interest">
        <div>
          <p className="eyebrow">Interest Check</p>
          <h2>Would you run MPW?</h2>
          <p>
            If this becomes real, early interest will shape the first fitments,
            finishes, and production quantity.
          </p>
        </div>

        <a
          href="mailto:info@mollatperformancewheel.com?subject=MPW%20First%20Run%20Interest"
          className="primaryBtn"
        >
          Register Interest
        </a>
      </section>
    </main>
  );
}
