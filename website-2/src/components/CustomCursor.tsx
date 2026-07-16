import { useEffect, useRef } from "react";

const clickableSelector = "a, button, [role='button'], summary, input, select, textarea";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = currentX;
    let targetY = currentY;

    const draw = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      frame = window.requestAnimationFrame(draw);
    };

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursorRef.current?.classList.add("is-visible");
    };
    const over = (event: PointerEvent) => {
      const target = event.target as Element | null;
      cursorRef.current?.classList.toggle(
        "is-clickable",
        Boolean(target?.closest(clickableSelector)),
      );
    };
    const scroll = () => {
      cursorRef.current?.classList.toggle(
        "is-compact",
        window.scrollY > window.innerHeight * 1.35,
      );
    };
    const leave = () => cursorRef.current?.classList.remove("is-visible");

    document.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    document.addEventListener("mouseleave", leave);
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    frame = window.requestAnimationFrame(draw);

    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("mouseleave", leave);
      window.removeEventListener("scroll", scroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={cursorRef} className="story-cursor" aria-hidden="true" />;
}
