"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectMedia } from "@/lib/projects";

export default function ProjectGallery({ title, media }: { title: string; media: ProjectMedia[] }) {
  const [active, setActive] = useState<number | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const isOpen = active !== null;

  useEffect(() => {
    if (!isOpen) return;
    const viewer = document.getElementById("project-viewer");
    if (viewer) viewer.inert = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((index) => index === null ? null : (index + 1) % media.length);
      if (event.key === "ArrowLeft") setActive((index) => index === null ? null : (index - 1 + media.length) % media.length);
      if (event.key === "Tab") {
        const dialog = document.getElementById("project-lightbox");
        const controls = Array.from(dialog?.querySelectorAll<HTMLButtonElement>("button") ?? []);
        const current = controls.indexOf(document.activeElement as HTMLButtonElement);
        if (controls.length && (event.shiftKey && current <= 0 || !event.shiftKey && current === controls.length - 1)) {
          event.preventDefault();
          controls[event.shiftKey ? controls.length - 1 : 0].focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      if (viewer) viewer.inert = false;
      trigger.current?.focus();
    };
  }, [isOpen, media.length]);

  if (!media.length) return null;

  return (
    <section className="case-gallery" aria-label={`${title} gallery`}>
      <div className="case-rule-heading"><span>Field evidence</span><span>{String(media.length).padStart(2, "0")} captures</span></div>
      <div className="case-gallery-grid">
        {media.map((item, index) => (
          <button key={item.src} type="button" className="case-gallery-item" onClick={(event) => { trigger.current = event.currentTarget; setActive(index); }} aria-label={`Open ${item.caption}`}>
            <Image src={item.src} width={item.width} height={item.height} alt={item.alt} />
            <span>{item.caption}</span>
          </button>
        ))}
      </div>
      {active !== null && createPortal(
        <div id="project-lightbox" className="case-lightbox" role="dialog" aria-modal="true" aria-label={`${title} image ${active + 1} of ${media.length}`}>
          <div className="case-lightbox-bar">
            <span>{String(active + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}</span>
            <button ref={closeButton} type="button" onClick={() => setActive(null)} aria-label="Close image"><X className="w-[22px] h-[22px]" aria-hidden /></button>
          </div>
          <figure>
            <Image src={media[active].src} width={media[active].width} height={media[active].height} alt={media[active].alt} />
            <figcaption>{media[active].caption}</figcaption>
          </figure>
          {media.length > 1 && <div className="case-lightbox-nav">
            <button type="button" onClick={() => setActive((active - 1 + media.length) % media.length)} aria-label="Previous image"><ChevronLeft className="w-5 h-5" aria-hidden /></button>
            <button type="button" onClick={() => setActive((active + 1) % media.length)} aria-label="Next image"><ChevronRight className="w-5 h-5" aria-hidden /></button>
          </div>}
        </div>, document.body,
      )}
    </section>
  );
}
