import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export interface StoryImage {
  src: string;
  alt: string;
  label: string;
  position?: string;
  fit?: "cover" | "contain";
  lighting?: "default" | "left";
  layout?: "full" | "portrait" | "collage";
  supportingImages?: Array<{
    src: string;
    alt: string;
    position?: string;
  }>;
}

interface StoryFrameProps {
  frame: StoryImage;
  index: number;
  total: number;
}

function StoryFrame({ frame, index, total }: StoryFrameProps) {
  const frameRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isPortrait = frame.layout === "portrait";
  const isCollage = frame.layout === "collage";
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
  });
  const progress = reducedMotion ? scrollYProgress : smoothProgress;
  const scale = useTransform(progress, [0.1, 0.5, 0.9], [1.045, 1, 1.015]);
  const opacity = useTransform(progress, [0, 0.18, 0.82, 1], [0.35, 1, 1, 0.45]);
  const captionY = useTransform(progress, [0.15, 0.48], [30, 0]);
  const captionOpacity = useTransform(progress, [0.13, 0.38, 0.8], [0, 1, 1]);

  return (
    <article
      ref={frameRef}
      className="story-frame"
      id={isPortrait ? "build-transition" : undefined}
    >
      <motion.div
        className={`story-frame-sticky ${isPortrait ? "is-portrait" : ""} ${isCollage ? "is-collage" : ""}`}
        style={{ opacity: reducedMotion ? 1 : opacity }}
      >
        {isCollage ? (
          <motion.div
            className="story-collage"
            style={{ scale: reducedMotion ? 1 : scale }}
          >
            <img
              src={frame.src}
              alt={frame.alt}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: frame.position ?? "center" }}
            />
            {frame.supportingImages?.map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: image.position ?? "center" }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.img
            src={frame.src}
            alt={frame.alt}
            loading={index === 0 ? "eager" : "lazy"}
            style={{
              scale: reducedMotion ? 1 : scale,
              objectFit: frame.fit ?? "cover",
              objectPosition: frame.position ?? "center",
            }}
          />
        )}
        <div
          className={`story-shade ${frame.lighting === "left" ? "is-left-lit" : ""}`}
          aria-hidden="true"
        />
        <motion.div
          className="story-caption"
          style={{
            opacity: reducedMotion ? 1 : captionOpacity,
            y: reducedMotion ? 0 : captionY,
          }}
        >
          <p>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <h3>{frame.label}</h3>
        </motion.div>
      </motion.div>
    </article>
  );
}

export function PhotoStory({ frames }: { frames: StoryImage[] }) {
  return (
    <section className="photo-story" aria-labelledby="story-heading">
      <header className="story-heading">
        <p className="section-index">01 / Beyond the desk</p>
        <h2 id="story-heading">Outside engineering</h2>
      </header>
      {frames.map((frame, index) => (
        <StoryFrame
          key={frame.src}
          frame={frame}
          index={index}
          total={frames.length}
        />
      ))}
    </section>
  );
}
