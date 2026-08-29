import { useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import {
  experiences,
  projectById,
  type ProjectCaseStudy,
} from "@/data/portfolio";
import { ProjectModal, ProjectShowcase } from "@/components/ProjectSection";

const relatedProjectByExperience: Record<string, string> = {
  "starsolutions-internship-2026": "starsolutions-engineering-internship",
  "subc-drivetrain-team-2025-2026": "subc-drivetrain",
};

const companyLabelByExperience: Record<string, string> = {
  "subc-drivetrain-team-2025-2026": "SUBC · UBC",
};

function getBrandClass(experienceId: string) {
  return experienceId.startsWith("starsolutions") ? "is-star" : "is-subc";
}

export function ExperienceSection() {
  const [activeProject, setActiveProject] = useState<ProjectCaseStudy | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const closeActiveProject = () => {
    setActiveProject(null);
    window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
  };

  return (
    <section
      className="experience-section"
      id="experience"
      aria-labelledby="experience-heading"
    >
      <header className="projects-heading experience-heading">
        <div>
          <p className="section-index">02 / Experience</p>
          <h2 id="experience-heading">Experience</h2>
        </div>
      </header>

      <div className="experience-shell">
        <div className="experience-list">
          {experiences.map((experience) => {
            const relatedProjectId = relatedProjectByExperience[experience.id];
            const relatedProject = relatedProjectId
              ? projectById[relatedProjectId]
              : undefined;
            const companyLabel =
              companyLabelByExperience[experience.id] ?? experience.company;

            return (
              <div
                className="experience-entry"
                key={experience.id}
              >
                <article
                  className={`experience-item ${getBrandClass(experience.id)}`}
                  aria-labelledby={`experience-${experience.id}-title`}
                >
                  <div className="experience-logo" aria-hidden="true">
                    <img
                      src={experience.logo.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="experience-intro">
                    <p className="experience-company">
                      <span>{companyLabel}</span>
                      <span>{experience.timeframe}</span>
                    </p>
                    <h3 id={`experience-${experience.id}-title`}>
                      {experience.role}
                    </h3>

                    <p className="experience-summary">{experience.summary}</p>
                  </div>
                </article>

                {relatedProject && (
                  <ProjectShowcase
                    project={relatedProject}
                    indexLabel={`Experience project / ${relatedProject.categoryLabel}`}
                    compact
                    onOpen={(selectedProject, trigger) => {
                      lastTriggerRef.current = trigger;
                      setActiveProject(selectedProject);
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="experience-scroll-cue">
          <a className="project-highlight-scroll-cue" href="#projects">
            <span>Scroll for projects</span>
            <i aria-hidden="true">
              <ArrowDown size={15} />
            </i>
          </a>
        </div>
      </div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={closeActiveProject} />
      )}
    </section>
  );
}
