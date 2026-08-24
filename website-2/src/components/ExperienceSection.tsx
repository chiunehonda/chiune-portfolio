import { ArrowDown, ArrowRight } from "lucide-react";
import { experiences } from "@/data/portfolio";

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
            const companyLabel =
              companyLabelByExperience[experience.id] ?? experience.company;

            return (
              <article
                className={`experience-item ${getBrandClass(experience.id)}`}
                key={experience.id}
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

                  {relatedProjectId && (
                    <a
                      className="experience-project-link"
                      href={`#project-${relatedProjectId}`}
                    >
                      View project
                      <ArrowRight size={15} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
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
    </section>
  );
}
