"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { fitCards, featuredFitCard, type FitCard } from "@/lib/fit-cards";

export function FitCardGallery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeCard, setActiveCard] = useState<FitCard>(featuredFitCard);
  const [zoom, setZoom] = useState(1);

  function openCard(card: FitCard) {
    setActiveCard(card);
    setZoom(1);
    requestAnimationFrame(() => dialogRef.current?.showModal());
  }

  function closeCard() {
    dialogRef.current?.close();
    setZoom(1);
  }

  return (
    <>
      <section id="fit-cards" className="fit-section section-pad">
        <div className="container fit-grid">
          <div className="fit-copy">
            <p className="section-index">03 — What you receive</p>
            <h2>Your look,<br /><em>clearly laid out.</em></h2>
            <p>Your MIA Fit Card lays out a complete look—whether styled from your wardrobe or shopped from scratch—with clear guidance and thoughtful alternatives.</p>
            <p className="visualization-note">Fit Card imagery is an AI styling visualization. Garment details may vary; these examples are not customer photos.</p>
          </div>
          <button className="featured-fit-card" type="button" onClick={() => openCard(featuredFitCard)} aria-label={`Open ${featuredFitCard.title} Fit Card at full resolution`}>
            <Image src={featuredFitCard.image} alt={featuredFitCard.imageDescription} width={featuredFitCard.width} height={featuredFitCard.height} sizes="(max-width: 900px) calc(100vw - 32px), 56vw" />
            <span>View full card</span>
          </button>
        </div>

        <div className="container fit-gallery" aria-labelledby="fit-gallery-title">
          <div className="section-heading split fit-gallery-heading">
            <div>
              <p className="section-index">Explore Fit Cards</p>
              <h2 id="fit-gallery-title">Looks for real-life<br />occasions.</h2>
            </div>
            <p>Browse approved MIA styling visualizations for WFH, casual, and smart-casual dressing. Open any card to inspect it at full resolution.</p>
          </div>
          <div className="fit-gallery-grid">
            {fitCards.map((card) => (
              <article className="gallery-card" key={card.id}>
                <button type="button" onClick={() => openCard(card)} aria-label={`Open ${card.title} Fit Card at full resolution`}>
                  <span className="gallery-image">
                    <Image src={card.image} alt={card.imageDescription} fill sizes="(max-width: 700px) calc(100vw - 32px), (max-width: 1100px) 50vw, 25vw" />
                  </span>
                  <span className="gallery-meta"><small>{card.occasion}</small><strong>{card.title}</strong><em>Open + zoom</em></span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <dialog className="fit-lightbox" ref={dialogRef} aria-labelledby="fit-lightbox-title" onClose={() => setZoom(1)} onClick={(event) => { if (event.target === event.currentTarget) closeCard(); }}>
        <div className="lightbox-shell">
          <header>
            <div><p>{activeCard.occasion}</p><h2 id="fit-lightbox-title">{activeCard.title}</h2></div>
            <button type="button" onClick={closeCard} aria-label="Close Fit Card viewer">Close</button>
          </header>
          <div className="lightbox-content">
            <div className="lightbox-viewport">
              <Image
                src={activeCard.image}
                alt={activeCard.imageDescription}
                width={activeCard.width}
                height={activeCard.height}
                sizes="90vw"
                unoptimized
                style={{ width: `${zoom * 100}%`, maxWidth: "none" }}
              />
            </div>
            <aside>
              <div><p className="micro-label">Garments</p><ul>{activeCard.garments.map((garment) => <li key={garment}>{garment}</li>)}</ul></div>
              <div><p className="micro-label">Styling notes</p><ul>{activeCard.stylingNotes.map((note) => <li key={note}>{note}</li>)}</ul></div>
              <p className="visualization-note">AI styling visualization. Garment details may vary. Not a customer photo or result.</p>
            </aside>
          </div>
          <div className="zoom-controls" aria-label="Image zoom controls">
            <button type="button" onClick={() => setZoom((value) => Math.max(1, Number((value - .25).toFixed(2))))} disabled={zoom === 1} aria-label="Zoom out">−</button>
            <output aria-live="polite">{Math.round(zoom * 100)}%</output>
            <button type="button" onClick={() => setZoom((value) => Math.min(3, Number((value + .25).toFixed(2))))} disabled={zoom === 3} aria-label="Zoom in">+</button>
            <button type="button" onClick={() => setZoom(1)}>Reset</button>
          </div>
        </div>
      </dialog>
    </>
  );
}
