import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Pause, Play } from "lucide-react";
import { projectHighlight } from "@/data/portfolio";

type PlaybackMode = "auto" | "play" | "pause";

interface HighlightVideoProps {
  src: string;
  poster: string;
  alt: string;
  isInView: boolean;
  reducedMotion: boolean | null;
}

function HighlightVideo({
  src,
  poster,
  alt,
  isInView,
  reducedMotion,
}: HighlightVideoProps) {
  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>("auto");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    const syncPlayback = () => {
      const motionPreferenceAllowsPlayback =
        playbackMode === "play" ||
        (playbackMode === "auto" && reducedMotion === false);
      const shouldPlay =
        isInView && !document.hidden && motionPreferenceAllowsPlayback;

      if (shouldPlay) {
        video.muted = true;
        void video.play().catch(() => {
          if (!cancelled) setIsPlaying(false);
        });
      } else {
        video.pause();
      }
    };

    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [isInView, playbackMode, reducedMotion]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.muted = true;
      setPlaybackMode("play");
      void video.play().catch(() => setIsPlaying(false));
    } else {
      setPlaybackMode("pause");
      video.pause();
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        className="project-highlight-media"
        src={src}
        poster={poster}
        aria-label={alt}
        autoPlay={isInView && reducedMotion === false}
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button
        className="project-highlight-video-toggle"
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Pause project video" : "Play project video"}
      >
        {isPlaying ? (
          <Pause size={15} aria-hidden="true" />
        ) : (
          <Play size={15} aria-hidden="true" />
        )}
      </button>
    </>
  );
}

export function ProjectHighlight() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [instantChange, setInstantChange] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(galleryRef, { amount: 0.35 });
  const stage = projectHighlight.stages[activeSlide];
  const media = stage.media;

  const selectSlide = (index: number) => {
    setInstantChange(false);
    setActiveSlide(index);
  };

  const showNext = (instant = false) => {
    setInstantChange(instant);
    setActiveSlide((index) => (index + 1) % projectHighlight.stages.length);
  };

  const showPrevious = (instant = false) => {
    setInstantChange(instant);
    setActiveSlide(
      (index) =>
        (index - 1 + projectHighlight.stages.length) %
        projectHighlight.stages.length,
    );
  };

  return (
    <section
      className="project-highlight"
      id="projects"
      aria-labelledby="project-highlight-heading"
    >
      <div className="project-highlight-sticky">
        <motion.div
          className="project-highlight-inner"
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: reducedMotion ? 0 : 0.76,
            ease: [0.2, 0.7, 0.2, 1],
          }}
        >
          <div
            ref={galleryRef}
            className="project-highlight-gallery"
            role="region"
            aria-roledescription="carousel"
            aria-label={`${projectHighlight.title} project media`}
            onKeyDown={(event) => {
              if (
                event.target instanceof HTMLElement &&
                event.target.closest(".project-highlight-video-toggle")
              ) {
                return;
              }
              if (event.key === "ArrowRight") {
                event.preventDefault();
                showNext(true);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                showPrevious(true);
              }
            }}
          >
            <p className="sr-only" aria-live="polite">
              Slide {activeSlide + 1} of {projectHighlight.stages.length}: {stage.title}
            </p>
            <div className="project-highlight-viewport">
              <AnimatePresence mode="sync" initial={false} custom={instantChange}>
                <motion.figure
                  key={media.src}
                  className="project-highlight-slide"
                  custom={instantChange}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: (isInstant: boolean) => ({
                      opacity: 1,
                      transition: {
                        duration: isInstant ? 0 : reducedMotion ? 0.125 : 0.2,
                        ease: [0.23, 1, 0.32, 1],
                      },
                    }),
                    removed: (isInstant: boolean) => ({
                      opacity: 0,
                      transition: {
                        duration: isInstant ? 0 : reducedMotion ? 0.125 : 0.2,
                        ease: [0.23, 1, 0.32, 1],
                      },
                    }),
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="removed"
                >
                  {media.kind === "video" ? (
                    <HighlightVideo
                      src={media.src}
                      poster={media.poster ?? ""}
                      alt={media.alt}
                      isInView={isInView}
                      reducedMotion={reducedMotion}
                    />
                  ) : (
                    <img
                      className={`project-highlight-media ${
                        media.src.endsWith("echo-dashboard-devices.png")
                          ? "is-contained-dashboard"
                          : ""
                      }`}
                      src={media.src}
                      alt={media.alt}
                    />
                  )}
                  <figcaption className="sr-only">
                    {stage.label}: {stage.title}. {stage.description}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>

              <button
                className="project-highlight-image-next"
                type="button"
                onClick={() => showNext()}
                aria-label="Show next project media"
              >
                <ArrowRight size={16} aria-hidden="true" />
              </button>

              <div className="project-highlight-slots" aria-label="Choose project media">
                {projectHighlight.stages.map((item, index) => (
                  <button
                    key={item.media.src}
                    type="button"
                    className={index === activeSlide ? "is-active" : ""}
                    aria-label={`Show ${item.title}`}
                    aria-pressed={index === activeSlide}
                    onClick={() => selectSlide(index)}
                  >
                    <span aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="project-highlight-copy">
            <img
              className="project-highlight-brand"
              src="/media/projects/sonous/sonous-header-dark.svg"
              alt="Sonous — Acoustic Operations"
            />
            <p className="project-highlight-status">{projectHighlight.status}</p>
            <h2 id="project-highlight-heading">{projectHighlight.title}</h2>
            <p className="project-highlight-summary">{projectHighlight.summary}</p>
          </div>

          <a className="project-highlight-scroll-cue" href="#all-projects">
            <span>Scroll for all projects</span>
            <i aria-hidden="true">
              <ArrowDown size={15} />
            </i>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
