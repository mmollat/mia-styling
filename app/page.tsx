import Image from "next/image";

const contactEmail = "mark.mollat@gmail.com";

const fitments = [
  ["Front Wheel", "20x9 +26", "245/35 front tire"],
  ["Rear Wheel", "20x10.5 +38", "285/30 rear tire"],
  ["Setup", "Staggered", "Model 3 performance stance"],
];

const specs = [
  ["Construction", "Forged or flow-formed first-run target"],
  ["Finish", "Satin black launch concept with graphite options"],
  ["Wheel Fitment", "20x9 +26 front and 20x10.5 +38 rear"],
  ["Tire Package", "245/35 front and 285/30 rear"],
];

const process = [
  ["01", "Prove The Look", "Use the current car and wheel package as the visual benchmark."],
  ["02", "Collect Demand", "Build a short list before committing to production volume."],
  ["03", "Lock The Run", "Finalize specs, finish, pricing, and quantity around real interest."],
];

const runDetails = [
  ["Target Run", "25 sets"],
  ["Launch Finish", "Satin black"],
  ["Current Spec", "20-inch staggered"],
  ["Status", "Interest check"],
];

const gallery = [
  {
    src: "/images/mpw-model3-garage-front.jpg",
    alt: "White Tesla Model 3 with black performance wheels from the front",
    label: "Garage fitment study",
  },
  {
    src: "/images/mpw-wheel-closeup.jpg",
    alt: "Close-up of black MPW wheel with red Tesla brake caliper",
    label: "Wheel detail",
  },
  {
    src: "/images/mpw-model3-street-rear.jpg",
    alt: "Rear three-quarter view of white Tesla Model 3 on black wheels",
    label: "Street stance",
  },
  {
    src: "/images/mpw-wheel-unboxed.jpg",
    alt: "Satin black performance wheel sitting in packaging",
    label: "Unboxed sample",
  },
];

export default function Home() {
  return (
    <main className="site">
      <section className="hero">
        <Image
          src="/images/mpw-model3-garage-side.jpg"
          alt="White Tesla Model 3 with black performance wheels in a finished garage"
          fill
          priority
          className="heroImage"
        />
        <div className="heroOverlay" />

        <div className="heroContent">
          <p className="eyebrow">Mollat Performance Wheel</p>
          <h1>
            Tesla fitment,
            <br />
            finished right.
          </h1>

          <p>
            A premium first-run concept for Model 3 and Model Y owners who want
            the car to look complete without giving up daily drivability.
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

        <div className="heroSpec">
          <Image
            src="/images/mpw-logo-white.png"
            alt="MPW"
            width={260}
            height={76}
            className="heroSpecLogo"
          />
          <span>First concept</span>
          <strong>20x9 front / 20x10.5 rear</strong>
          <p>+26 front offset, +38 rear offset, wrapped in 245/35 and 285/30 tires.</p>
        </div>
      </section>

      <section className="signalBand" aria-label="MPW highlights">
        {[
          "Tesla-first sizing",
          "Real-world test car",
          "Manufacturer relationship",
          "Limited first run",
        ].map((item) => (
          <div key={item}>{item}</div>
        ))}
      </section>

      <section id="wheel" className="section split">
        <div>
          <p className="eyebrow">The Idea</p>
          <h2>A wheel page with real metal behind it.</h2>
        </div>

        <div className="copyStack">
          <p>
            MPW starts with a real Tesla, real fitment photos, and a wheel shape
            that already works on the car. The goal is not to look like every
            other aftermarket catalog. It is to make the car feel sharper,
            cleaner, and more intentional.
          </p>
          <p>
            This is still an interest page before it becomes a store. If enough
            owners want it, MPW can move from concept to a small, carefully
            specified first production run.
          </p>
        </div>
      </section>

      <section className="featureStrip">
        <div className="featureImage">
          <Image
            src="/images/mpw-wheel-closeup.jpg"
            alt="MPW wheel close-up with red Tesla brake caliper"
            fill
            sizes="(max-width: 900px) 100vw, 48vw"
          />
        </div>
        <div className="featureCopy">
          <p className="eyebrow">First Look</p>
          <h2>Black spokes, red calipers, no apology.</h2>
          <p>
            The current wheel has the right visual ingredients: thin split
            spokes, deep contrast, a motorsport feel, and enough openness to
            show the brake package instead of hiding it.
          </p>
          <div className="microStats">
            <span>5-lug Tesla pattern</span>
            <span>Satin black direction</span>
            <span>Performance brake presence</span>
          </div>
        </div>
      </section>

      <section id="fitments" className="section">
        <div className="sectionHeader">
          <p className="eyebrow">Exact Fitment</p>
          <h2>The setup shown on this car.</h2>
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

      <section className="gallerySection" aria-label="MPW concept gallery">
        {gallery.map((item, index) => (
          <figure key={item.src} className={index === 0 ? "galleryLarge" : ""}>
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes={index === 0 ? "(max-width: 900px) 100vw, 60vw" : "(max-width: 900px) 100vw, 36vw"}
            />
            <figcaption>{item.label}</figcaption>
          </figure>
        ))}
      </section>

      <section className="section specSection">
        <div className="specPanel">
          <p className="eyebrow">Concept Direction</p>
          <h2>Premium, but still practical.</h2>
          <p>
            The first run should feel special, but it still needs to clear real
            brakes, hold up to real roads, and make sense for owners who drive
            their cars every day.
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
        <div className="firstRunIntro">
          <div>
            <p className="eyebrow">First Run</p>
            <h2>Small enough to stay sharp.</h2>
          </div>

          <div className="runCard">
            <span>MPW-01</span>
            <strong>Limited first-run concept</strong>
            <p>
              Early interest will decide whether this moves into a real batch,
              what finish launches first, and how many sets make sense.
            </p>
            <div className="runStats">
              {runDetails.map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
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
        <div className="interestCopy">
          <p className="eyebrow">Interest Check</p>
          <h2>Would you put MPW on your car?</h2>
          <p>
            Send a quick note with your car and preferred setup. For now, this
            goes straight to Mark while the official MPW inbox is getting set up.
          </p>
          <a
            href={`mailto:${contactEmail}?subject=MPW%20First%20Run%20Interest`}
            className="ghostBtn"
          >
            Email Mark Directly
          </a>
        </div>

        <form
          className="interestForm"
          action={`mailto:${contactEmail}?subject=MPW%20First%20Run%20Interest`}
          method="post"
          encType="text/plain"
        >
          <label>
            Name
            <input name="Name" type="text" placeholder="Your name" />
          </label>

          <label>
            Email
            <input name="Email" type="email" placeholder="you@email.com" />
          </label>

          <label>
            Car
            <select name="Car" defaultValue="">
              <option value="" disabled>
                Select your Tesla
              </option>
              <option>Model 3</option>
              <option>Model 3 Performance</option>
              <option>Model Y</option>
              <option>Other Tesla</option>
            </select>
          </label>

          <label>
            Interested setup
            <select name="Interested setup" defaultValue="MPW-01 staggered 20-inch">
              <option>MPW-01 staggered 20-inch</option>
              <option>Square daily setup</option>
              <option>Model Y fitment</option>
              <option>Just want updates</option>
            </select>
          </label>

          <label className="fullField">
            Notes
            <textarea
              name="Notes"
              rows={4}
              placeholder="Current wheels, desired finish, brake setup, or anything else useful."
            />
          </label>

          <button type="submit" className="primaryBtn">
            Send Interest
          </button>
        </form>
      </section>
    </main>
  );
}
