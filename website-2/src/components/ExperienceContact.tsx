import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { contact, experience, siteIdentity } from "@/data/portfolio";

function ChassisArchitectureVisual() {
  return (
    <div className="experience-schematic-frame">
      <svg
        viewBox="0 0 960 720"
        role="img"
        aria-label="Generalized cable and block diagram for a communications chassis"
      >
        <defs>
          <pattern id="experience-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#c7c5bf" strokeWidth="1" />
          </pattern>
          <linearGradient id="experience-block" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#303030" />
            <stop offset="1" stopColor="#090909" />
          </linearGradient>
        </defs>
        <rect width="960" height="720" fill="#e9e7e1" />
        <rect width="960" height="720" fill="url(#experience-grid)" opacity="0.64" />

        <g fill="url(#experience-block)" stroke="#555" strokeWidth="2">
          <rect x="98" y="248" width="174" height="224" rx="18" />
          <rect x="350" y="156" width="260" height="160" rx="18" />
          <rect x="350" y="404" width="260" height="160" rx="18" />
          <rect x="688" y="248" width="174" height="224" rx="18" />
        </g>

        <g fill="none" stroke="#252525" strokeWidth="5">
          <path d="M272 312H350" />
          <path d="M272 408H350" />
          <path d="M610 236H650V312H688" />
          <path d="M610 484H650V408H688" />
        </g>
        <g fill="#252525">
          <path d="M336 300L350 312L336 324Z" />
          <path d="M336 396L350 408L336 420Z" />
          <path d="M674 300L688 312L674 324Z" />
          <path d="M674 396L688 408L674 420Z" />
        </g>

        <g fill="#f1efe9" fontFamily="monospace" textAnchor="middle">
          <text x="185" y="342" fontSize="26" letterSpacing="2">POWER</text>
          <text x="185" y="380" fontSize="18" fill="#aaa8a2" letterSpacing="1.5">DISTRIBUTION</text>
          <text x="480" y="222" fontSize="26" letterSpacing="2">CONTROL</text>
          <text x="480" y="260" fontSize="18" fill="#aaa8a2" letterSpacing="1.5">INTERFACE</text>
          <text x="480" y="470" fontSize="26" letterSpacing="2">SIGNAL</text>
          <text x="480" y="508" fontSize="18" fill="#aaa8a2" letterSpacing="1.5">CONDITIONING</text>
          <text x="775" y="342" fontSize="26" letterSpacing="2">RF</text>
          <text x="775" y="380" fontSize="18" fill="#aaa8a2" letterSpacing="1.5">OUTPUT STAGE</text>
        </g>
      </svg>
    </div>
  );
}

export function ExperienceContact() {
  const [activeProject, setActiveProject] = useState(0);
  const reducedMotion = useReducedMotion();
  const project = experience.projects[activeProject];

  const showNextProject = () => {
    setActiveProject((current) => (current + 1) % experience.projects.length);
  };

  const showPreviousProject = () => {
    setActiveProject((current) =>
      (current - 1 + experience.projects.length) % experience.projects.length,
    );
  };

  return (
    <>
      <section className="experience-section" id="experience" aria-labelledby="experience-heading">
        <div className="experience-sticky">
          <div className="experience-inner">
            <div
              className="experience-gallery"
              role="region"
              aria-roledescription="carousel"
              aria-label="Current StarSolutions projects"
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  showNextProject();
                }
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  showPreviousProject();
                }
              }}
            >
              <p className="sr-only" aria-live="polite">
                Project {activeProject + 1} of {experience.projects.length}: {project.title}
              </p>
              <div className="experience-viewport">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.figure
                    key={project.id}
                    className="experience-slide"
                    initial={reducedMotion ? false : { opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0, x: -16 }}
                    transition={{ duration: reducedMotion ? 0 : 0.32, ease: [0.2, 0.7, 0.2, 1] }}
                  >
                    {project.visual === "adapter" ? (
                      <div className="experience-adapter-frame">
                        <img
                          src="/media/experience/nex10-sma-adapter.png"
                          alt="SolidWorks assembly preview of the NEX10-to-SMA adapter"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ) : (
                      <ChassisArchitectureVisual />
                    )}
                  </motion.figure>
                </AnimatePresence>

                <button
                  className="experience-image-next"
                  type="button"
                  onClick={showNextProject}
                  aria-label="Show next internship project"
                >
                  <ArrowRight size={16} aria-hidden="true" />
                </button>

                <div className="experience-slots" aria-label="Choose internship project">
                  {experience.projects.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      className={index === activeProject ? "is-active" : ""}
                      aria-label={`Show ${item.title}`}
                      aria-pressed={index === activeProject}
                      onClick={() => setActiveProject(index)}
                    >
                      <span aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              className="experience-copy"
              initial={reducedMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: reducedMotion ? 0 : 0.76,
                ease: [0.2, 0.7, 0.2, 1],
              }}
            >
              <p className="experience-company">
                {experience.company}
                <span>{experience.timeframe}</span>
              </p>
              <p className="experience-role">{experience.role}</p>
              <div className="experience-project-copy">
                <h2 id="experience-heading">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={project.id}
                      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: reducedMotion ? 0 : 0.28 }}
                    >
                      {project.title}
                    </motion.span>
                  </AnimatePresence>
                </h2>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={`${project.id}-summary`}
                    className="experience-summary"
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: reducedMotion ? 0 : 0.26 }}
                  >
                    {project.summary}
                  </motion.p>
                </AnimatePresence>
              </div>
              <p className="experience-disclosure">{experience.disclosure}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-heading">
        <motion.div
          className="contact-intro"
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: reducedMotion ? 0 : 0.76,
            ease: [0.2, 0.7, 0.2, 1],
          }}
        >
          <p className="section-index">04 / Contact</p>
          <h2 id="contact-heading">{contact.heading}</h2>
          <p>{contact.summary}</p>
        </motion.div>
        <motion.div
          className="contact-links"
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: reducedMotion ? 0 : 0.72,
            delay: reducedMotion ? 0 : 0.08,
            ease: [0.2, 0.7, 0.2, 1],
          }}
        >
          {contact.links.map((link) => (
            <a key={link.href} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>
              <span>{link.label}</span>
              <strong>{link.display}</strong>
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </motion.div>
      </section>

      <footer className="site-footer-v2">
        <span>{siteIdentity.name} · {siteIdentity.discipline}</span>
        <span>{siteIdentity.location}</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
