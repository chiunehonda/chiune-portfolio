import { useEffect, useRef } from "react";

export function SakuraLeft() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const element = ref.current;
      if (!element) return;

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      const reveal = Math.max(0, Math.min(1200, ((progress - 0.06) / 0.94) * 1200));
      const mask = `linear-gradient(to bottom, #000 0px, #000 ${Math.max(0, reveal - 80)}px, transparent ${reveal}px)`;
      element.style.maskImage = mask;
      element.style.webkitMaskImage = mask;
      element.style.transform = `translateX(${-6 + progress * 12}px)`;
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="sakura-left" aria-hidden="true" />;
}
