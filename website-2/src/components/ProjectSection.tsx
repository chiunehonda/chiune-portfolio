import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { projects, type ProjectCaseStudy } from "@/data/portfolio";

function ProjectPreview({ project }: { project: ProjectCaseStudy }) {
  if (project.id === "subc-drivetrain") {
    return (
      <span className="project-engineering-preview" aria-hidden="true">
        <span className="project-engineering-cad">
          <img src={project.images[0].src} alt="" loading="lazy" />
        </span>
        <span className="project-engineering-build">
          <img src={project.images[1].src} alt="" loading="lazy" />
        </span>
      </span>
    );
  }

  if (project.id === "apsc-101-study-system") {
    return (
      <span className="project-study-preview" aria-hidden="true">
        {project.images.map((image) => (
          <img key={image.src} src={image.src} alt="" loading="lazy" />
        ))}
      </span>
    );
  }

  return (
    <span className="project-card-image">
      <img src={project.images[0].src} alt="" loading="lazy" />
    </span>
  );
}

interface ProjectModalProps {
  project: ProjectCaseStudy;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const currentImage = project.images[activeImage];
  const lightMedia = /subc-.*cad|v6-|apsc-practice/.test(
    currentImage.src,
  );

  useEffect(() => {
    document.body.classList.add("modal-open");
    closeRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose, project.id]);

  const closeFromBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div className="project-dialog-backdrop" onMouseDown={closeFromBackdrop}>
      <section
        className="project-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
      >
        <div className="project-dialog-gallery">
          <div className={`project-dialog-main-image ${lightMedia ? "is-light" : ""}`}>
            <img src={currentImage.src} alt={currentImage.alt} />
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
            onClick={onClose}
          >
            Close <X size={16} aria-hidden="true" />
          </button>
          <h2 id="project-dialog-title">{project.title}</h2>
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
  const reducedMotion = useReducedMotion();

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
          <p className="section-index">02 / Selected work</p>
          <h2 id="projects-heading">Projects</h2>
        </div>
      </motion.header>

      <motion.div
        className="project-grid"
        initial={reducedMotion ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{
          duration: reducedMotion ? 0 : 0.72,
          delay: reducedMotion ? 0 : 0.08,
          ease: [0.2, 0.7, 0.2, 1],
        }}
      >
        {projects.map((project, index) => (
          <article
            className={`project-card project-card-${index + 1}`}
            key={project.id}
          >
            <button type="button" onClick={() => setActiveProject(project)}>
              <ProjectPreview project={project} />
              <span className="project-card-copy">
                <strong>{project.title}</strong>
                <span>{project.cardSummary}</span>
                <em>
                  Open project <ArrowUpRight size={15} aria-hidden="true" />
                </em>
              </span>
            </button>
          </article>
        ))}
      </motion.div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}
