import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

interface ScrollExpandMediaProps {
  mediaSrc: string;
  mediaAlt: string;
  mobileMediaSrc?: string;
  backgroundSrc?: string;
}

function useMobileLayout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 760px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export function ScrollExpandMedia({
  mediaSrc,
  mediaAlt,
  mobileMediaSrc,
  backgroundSrc = mediaSrc,
}: ScrollExpandMediaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMobileLayout();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.3,
  });
  const progress = prefersReducedMotion ? scrollYProgress : smoothProgress;

  const initialClip = isMobile
    ? "inset(22% 15% 22% 15% round 24px)"
    : "inset(17% 34% 17% 34% round 28px)";
  const clipPath = useTransform(
    progress,
    [0, 0.72],
    [initialClip, "inset(0% 0% 0% 0% round 0px)"],
  );
  const imageScale = useTransform(progress, [0, 0.75], [1.12, 1]);
  const backgroundOpacity = useTransform(progress, [0, 0.55], [0.23, 0]);
  const introOpacity = useTransform(progress, [0, 0.23, 0.5], [1, 1, 0]);
  const introY = useTransform(progress, [0, 0.5], [0, -24]);
  const firstNameX = useTransform(progress, [0, 0.62], [0, isMobile ? -90 : -320]);
  const lastNameX = useTransform(progress, [0, 0.62], [0, isMobile ? 90 : 320]);
  const titleOpacity = useTransform(progress, [0, 0.48, 0.68], [1, 1, 0]);
  const endOpacity = useTransform(progress, [0.68, 0.86], [0, 1]);
  const endY = useTransform(progress, [0.68, 0.86], [24, 0]);

  return (
    <section
      ref={sectionRef}
      className="expansion-hero"
      data-reduced-motion={prefersReducedMotion ? "true" : "false"}
      aria-label="Introduction"
    >
      <div className="expansion-sticky">
        <motion.div
          className="expansion-background"
          style={{ opacity: backgroundOpacity }}
          aria-hidden="true"
        >
          <picture>
            {mobileMediaSrc && (
              <source media="(max-width: 760px)" srcSet={mobileMediaSrc} />
            )}
            <img src={backgroundSrc} alt="" />
          </picture>
        </motion.div>

        <motion.div className="expansion-media" style={{ clipPath }}>
          <motion.div className="expansion-picture" style={{ scale: imageScale }}>
            <picture>
              {mobileMediaSrc && (
                <source media="(max-width: 760px)" srcSet={mobileMediaSrc} />
              )}
              <img src={mediaSrc} alt={mediaAlt} fetchPriority="high" />
            </picture>
          </motion.div>
          <div className="expansion-media-shade" aria-hidden="true" />
        </motion.div>

        <motion.div
          className="expansion-meta"
          style={{ opacity: introOpacity, y: introY }}
        >
          <img
            className="expansion-ubc-logo"
            src="/media/brand/ubc-logo.svg"
            alt="The University of British Columbia"
          />
          <span>Mechanical Engineering</span>
          <span>Vancouver, BC</span>
        </motion.div>

        <motion.h1 className="expansion-name" style={{ opacity: titleOpacity }}>
          <motion.span style={{ x: firstNameX }}>Chiune</motion.span>
          <motion.span style={{ x: lastNameX }}>Honda</motion.span>
        </motion.h1>

        <motion.div
          className="expansion-scroll-cue"
          style={{ opacity: introOpacity }}
          aria-hidden="true"
        >
          <span>Scroll to enter</span>
          <i />
        </motion.div>

        <motion.div
          className="expansion-end-copy"
          style={{ opacity: endOpacity, y: endY }}
        >
          <p>Mechanical Engineering · UBC</p>
          <span>Building toward mechatronics</span>
          <span className="expansion-location-tag">Summit of Mount Brunswick</span>
        </motion.div>
      </div>
    </section>
  );
}

export default ScrollExpandMedia;
