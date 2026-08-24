import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { projects, type ProjectCaseStudy } from "@/data/portfolio";

interface ProjectCarouselProps {
  project: ProjectCaseStudy;
  reducedMotion: boolean | null;
}

function ProjectCarousel({ project, reducedMotion }: ProjectCarouselProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [instantChange, setInstantChange] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const focusActiveSlotRef = useRef(false);
  const isNearView = useInView(galleryRef, {
    once: true,
    margin: "300px 0px",
  });
  const currentImage = project.images[activeImage];
  const fillsMediaFrame =
    project.id === "sonous-acoustic-drone-sensing" ||
    project.id === "apsc-101-study-system";
  const alignsMediaLeft =
    /sonous\/cross-validation-|apsc-study-guide-overview/.test(currentImage.src);
  const lightMedia =
    /subc-.*(?:cad|fea)|v6-|sonous\/cross-validation-|apsc-practice-quiz|\/media\/experience\//.test(
      currentImage.src,
    );

  useEffect(() => {
    if (!isNearView) return;
    project.images.forEach(({ src }) => {
      const image = new Image();
      image.src = src;
      void image.decode().catch(() => undefined);
    });
  }, [isNearView, project.images]);

  useEffect(() => {
    if (!focusActiveSlotRef.current) return;
    focusActiveSlotRef.current = false;
    slotRefs.current[activeImage]?.focus();
  }, [activeImage]);

  const showNext = (options: { instant?: boolean; focusSlot?: boolean } = {}) => {
    setInstantChange(Boolean(options.instant));
    focusActiveSlotRef.current = Boolean(options.focusSlot);
    setActiveImage((index) => (index + 1) % project.images.length);
  };

  const showPrevious = (
    options: { instant?: boolean; focusSlot?: boolean } = {},
  ) => {
    setInstantChange(Boolean(options.instant));
    focusActiveSlotRef.current = Boolean(options.focusSlot);
    setActiveImage(
      (index) => (index - 1 + project.images.length) % project.images.length,
    );
  };

  return (
    <div
      ref={galleryRef}
      className="project-highlight-gallery project-showcase-gallery"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${project.title} project media`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          showNext({
            instant: true,
            focusSlot:
              event.target instanceof HTMLElement &&
              Boolean(event.target.closest(".project-highlight-slots")),
          });
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          showPrevious({
            instant: true,
            focusSlot:
              event.target instanceof HTMLElement &&
              Boolean(event.target.closest(".project-highlight-slots")),
          });
        }
      }}
    >
      <p className="sr-only" aria-live="polite">
        Image {activeImage + 1} of {project.images.length}.
      </p>
      <div
        className={`project-highlight-viewport project-showcase-viewport ${
          lightMedia ? "is-light" : ""
        } ${fillsMediaFrame ? "is-filled" : ""}`}
      >
        <AnimatePresence mode="sync" initial={false} custom={instantChange}>
          <motion.figure
            key={currentImage.src}
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
            <img
              className={`project-highlight-media project-showcase-media ${
                alignsMediaLeft ? "is-left-crop" : ""
              }`}
              src={currentImage.src}
              alt={currentImage.alt}
              loading="lazy"
            />
            {currentImage.caption && (
              <figcaption className="project-showcase-caption">
                {currentImage.caption}
              </figcaption>
            )}
          </motion.figure>
        </AnimatePresence>

        {project.images.length > 1 && (
          <>
            <button
              className="project-highlight-image-next"
              type="button"
              onClick={() => showNext()}
              aria-label={`Show next image for ${project.title}`}
            >
              <ArrowRight size={16} aria-hidden="true" />
            </button>

            <div
              className="project-highlight-slots"
              aria-label={`Choose ${project.title} image`}
            >
              {project.images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  className={index === activeImage ? "is-active" : ""}
                  aria-label={`Show image ${index + 1} of ${project.images.length}: ${image.alt}`}
                  aria-pressed={index === activeImage}
                  tabIndex={index === activeImage ? 0 : -1}
                  ref={(element) => {
                    slotRefs.current[index] = element;
                  }}
                  onClick={() => {
                    setInstantChange(false);
                    setActiveImage(index);
                  }}
                >
                  <span aria-hidden="true" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

interface ProjectModalProps {
  project: ProjectCaseStudy;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const currentImage = project.images[activeImage];
  const lightMedia = /subc-.*(?:cad|fea)|v6-|apsc-practice|\/media\/experience\//.test(
    currentImage.src,
  );

  useEffect(() => {
    document.body.classList.add("modal-open");
    closeRef.current?.focus();
    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleDialogKeys);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleDialogKeys);
    };
  }, [onClose, project.id]);

  const closeFromBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div className="project-dialog-backdrop" onMouseDown={closeFromBackdrop}>
      <section
        ref={dialogRef}
        className="project-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-dialog-title-${project.id}`}
      >
        <div className="project-dialog-gallery">
          <div className="project-dialog-primary">
            <div className={`project-dialog-main-image ${lightMedia ? "is-light" : ""}`}>
              <img src={currentImage.src} alt={currentImage.alt} />
            </div>
            {currentImage.caption && (
              <p className="project-dialog-image-caption">{currentImage.caption}</p>
            )}
          </div>
          {project.images.length > 1 && (
            <div className="project-dialog-thumbs" aria-label="Project images">
              {project.images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  className={index === activeImage ? "is-active" : ""}
                  aria-label={`Show image ${index + 1} of ${project.images.length}`}
                  aria-pressed={index === activeImage}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image.src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="project-dialog-copy">
          <button
            ref={closeRef}
            className="project-dialog-close"
            type="button"
            aria-label={`Close ${project.title} case study`}
            onClick={onClose}
          >
            Close <X size={16} aria-hidden="true" />
          </button>
          <p className="project-dialog-meta">
            <span>{project.categoryLabel}</span>
            <span>{project.timeframe}</span>
          </p>
          <h2 id={`project-dialog-title-${project.id}`}>{project.title}</h2>
          <p className="project-dialog-summary">{project.summary}</p>

          <dl className="project-detail-list">
            <div>
              <dt>Goal</dt>
              <dd>{project.goal}</dd>
            </div>
            <div>
              <dt>Built</dt>
              <dd>{project.built}</dd>
            </div>
            <div>
              <dt>Result</dt>
              <dd>{project.result}</dd>
            </div>
          </dl>

          {project.disclosure && (
            <p className="project-dialog-disclosure">{project.disclosure}</p>
          )}

          {project.links && (
            <div className="project-dialog-links">
              {project.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                  {link.label} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export function ProjectSection() {
  const [activeProject, setActiveProject] = useState<ProjectCaseStudy | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const reducedMotion = useReducedMotion();

  const closeActiveProject = () => {
    setActiveProject(null);
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
  };

  return (
    <section className="projects-section" aria-labelledby="projects-heading">
      <motion.header
        className="projects-heading"
        id="all-projects"
        initial={reducedMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{
          duration: reducedMotion ? 0 : 0.76,
          ease: [0.2, 0.7, 0.2, 1],
        }}
      >
        <div>
          <p className="section-index">03 / Selected work</p>
          <h2 id="projects-heading">Projects</h2>
        </div>
      </motion.header>

      <div className="project-grid">
        {projects.map((project, index) => (
          <motion.article
            className="project-showcase"
            key={project.id}
            id={`project-${project.id}`}
            aria-labelledby={`project-${project.id}-heading`}
            initial={{
              opacity: reducedMotion ? 0.65 : 0,
              transform: reducedMotion
                ? "translateY(0px)"
                : "translateY(8px)",
            }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            viewport={{
              once: true,
              amount: 0.2,
              margin: "0px 0px -100px 0px",
            }}
            transition={{
              duration: reducedMotion ? 0.2 : 0.6,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <div className="project-highlight-inner project-showcase-inner">
              <ProjectCarousel project={project} reducedMotion={reducedMotion} />

              <div className="project-highlight-copy project-showcase-copy">
                <p className="project-highlight-status">
                  {String(index + 1).padStart(2, "0")} / {project.categoryLabel}
                </p>
                <h3 id={`project-${project.id}-heading`}>{project.title}</h3>
                <p className="project-highlight-summary">{project.cardSummary}</p>
                <button
                  className="project-showcase-cta"
                  type="button"
                  aria-haspopup="dialog"
                  aria-label={`Learn more about ${project.title}`}
                  onClick={(event) => {
                    lastTriggerRef.current = event.currentTarget;
                    setActiveProject(project);
                  }}
                >
                  <span>Learn more</span>
                  <i aria-hidden="true">
                    <ArrowRight size={15} />
                  </i>
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={closeActiveProject} />
      )}
    </section>
  );
}
