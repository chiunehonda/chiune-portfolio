import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { projectHighlight } from "@/data/portfolio";

type HighlightVisual = (typeof projectHighlight.stages)[number]["visual"];

function ArmConcept() {
  return (
    <svg
      className="highlight-technical-visual"
      viewBox="0 0 960 720"
      role="img"
      aria-label="Concept illustration of an SO-101-style robot arm"
    >
      <defs>
        <linearGradient id="highlight-arm-front" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#343434" />
          <stop offset="0.5" stopColor="#171717" />
          <stop offset="1" stopColor="#050505" />
        </linearGradient>
        <linearGradient id="highlight-arm-side" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#181818" />
          <stop offset="1" stopColor="#010101" />
        </linearGradient>
        <radialGradient id="highlight-arm-joint" cx="32%" cy="28%" r="76%">
          <stop offset="0" stopColor="#676767" />
          <stop offset="0.35" stopColor="#252525" />
          <stop offset="1" stopColor="#050505" />
        </radialGradient>
        <pattern id="highlight-grid" width="42" height="42" patternUnits="userSpaceOnUse">
          <path d="M42 0H0V42" fill="none" stroke="#111" strokeWidth="1" />
        </pattern>
        <filter id="highlight-arm-shadow" x="-30%" y="-30%" width="170%" height="190%">
          <feDropShadow dx="0" dy="16" floodColor="#000" floodOpacity="0.42" stdDeviation="12" />
        </filter>
      </defs>

      <rect width="960" height="720" fill="#e9e7e1" />
      <rect width="960" height="720" fill="url(#highlight-grid)" opacity="0.6" />
      <g filter="url(#highlight-arm-shadow)">
        <ellipse cx="480" cy="632" rx="210" ry="26" fill="#000" opacity="0.15" />

        <path d="M330 565H582L616 632H294Z" fill="url(#highlight-arm-front)" />
        <path d="M355 528H555L582 565H330Z" fill="#242424" />
        <path d="M582 565L616 545V610L616 632Z" fill="url(#highlight-arm-side)" />
        <rect x="390" y="470" width="150" height="72" rx="15" fill="url(#highlight-arm-front)" />
        <ellipse cx="465" cy="470" rx="75" ry="28" fill="#303030" />

        <g>
          <circle cx="465" cy="458" r="66" fill="#090909" />
          <circle cx="465" cy="458" r="57" fill="url(#highlight-arm-joint)" />
          <circle cx="465" cy="458" r="21" fill="#080808" stroke="#797979" strokeWidth="2" />
          <circle cx="465" cy="458" r="7" fill="#d8d6cf" />
        </g>

        <g transform="rotate(-35 465 458)">
          <path d="M435 236L482 222L507 240V426L482 458H435Z" fill="url(#highlight-arm-side)" />
          <path d="M407 246Q407 226 427 226H465Q484 226 484 246V421Q484 441 465 441H427Q407 441 407 421Z" fill="url(#highlight-arm-front)" />
          <path d="M427 226H465L482 222L507 240H484Q476 238 465 238H427Z" fill="#343434" />
          <path d="M424 274V394" stroke="#666" strokeWidth="3" opacity="0.7" />

          <circle cx="446" cy="220" r="54" fill="#090909" />
          <circle cx="446" cy="220" r="46" fill="url(#highlight-arm-joint)" />
          <circle cx="446" cy="220" r="17" fill="#080808" stroke="#777" strokeWidth="2" />

          <g transform="rotate(82 446 220)">
            <path d="M421 56L462 46L484 62V194L462 220H421Z" fill="url(#highlight-arm-side)" />
            <path d="M396 65Q396 49 412 49H450Q466 49 466 65V185Q466 202 450 202H412Q396 202 396 185Z" fill="url(#highlight-arm-front)" />
            <path d="M412 49H450L462 46L484 62H466Q458 60 450 60H412Z" fill="#383838" />

            <circle cx="431" cy="47" r="43" fill="#090909" />
            <circle cx="431" cy="47" r="35" fill="url(#highlight-arm-joint)" />
            <circle cx="431" cy="47" r="13" fill="#080808" stroke="#777" strokeWidth="2" />

            <g transform="rotate(-30 431 47)">
              <rect x="406" y="-27" width="58" height="54" rx="9" fill="url(#highlight-arm-front)" />
              <path d="M407 -27L420 -38H463L476 -26L463 -17H420Z" fill="#333" />
              <path d="M415 -31C382 -49 369 -75 387 -92C407 -66 430 -59 442 -58V-42C430 -42 422 -38 415 -31Z" fill="#111" />
              <path d="M458 -31C490 -49 505 -75 487 -92C467 -66 445 -59 433 -58V-42C445 -42 451 -38 458 -31Z" fill="#080808" />
            </g>
          </g>
        </g>
      </g>

      <g fill="none" stroke="#676767" strokeWidth="1.5">
        <path d="M535 457H760V402" />
        <path d="M460 222H740V238" />
      </g>
      <g fill="#222" fontFamily="monospace" fontSize="20" letterSpacing="1.5">
        <text x="772" y="397">SERVO AXIS</text>
        <text x="752" y="234">PRINTED LINK</text>
      </g>
    </svg>
  );
}

function JointConcept() {
  return (
    <svg
      className="highlight-technical-visual"
      viewBox="0 0 960 720"
      role="img"
      aria-label="Concept diagram of a robot arm joint redesign"
    >
      <defs>
        <linearGradient id="highlight-joint-metal" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#555" />
          <stop offset="0.5" stopColor="#202020" />
          <stop offset="1" stopColor="#070707" />
        </linearGradient>
        <radialGradient id="highlight-joint-hub" cx="34%" cy="30%" r="76%">
          <stop offset="0" stopColor="#888" />
          <stop offset="0.3" stopColor="#3a3a3a" />
          <stop offset="1" stopColor="#080808" />
        </radialGradient>
        <pattern id="highlight-joint-grid" width="42" height="42" patternUnits="userSpaceOnUse">
          <path d="M42 0H0V42" fill="none" stroke="#111" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="960" height="720" fill="#e9e7e1" />
      <rect width="960" height="720" fill="url(#highlight-joint-grid)" opacity="0.6" />
      <g transform="translate(0 22)">
        <g transform="translate(216 320)">
          <path d="M-78 -142H45L78 -110V120L45 150H-78Z" fill="url(#highlight-joint-metal)" />
          <path d="M-78 -142L-46 -168H77L108 -137L78 -110H-45Z" fill="#353535" />
          <circle r="72" fill="#0a0a0a" stroke="#4e4e4e" strokeWidth="8" />
          <circle r="49" fill="url(#highlight-joint-hub)" />
          <circle r="16" fill="#080808" stroke="#aaa" strokeWidth="2" />
          <circle cx="-49" cy="-100" r="5" fill="#bbb" />
          <circle cx="47" cy="100" r="5" fill="#bbb" />
        </g>

        <path d="M330 320H418" stroke="#444" strokeDasharray="9 8" strokeWidth="2" />
        <path d="M405 306L424 320L405 334" fill="none" stroke="#222" strokeWidth="3" />

        <g transform="translate(500 320)">
          <rect x="-70" y="-105" width="140" height="210" rx="26" fill="url(#highlight-joint-metal)" />
          <path d="M-54 -78H54V78H-54Z" fill="#0d0d0d" stroke="#5c5c5c" strokeWidth="3" />
          <circle r="50" fill="#0b0b0b" stroke="#747474" strokeWidth="7" />
          <circle r="32" fill="url(#highlight-joint-hub)" />
          <path d="M0 -31V31M-31 0H31" stroke="#999" strokeWidth="2" />
        </g>

        <path d="M578 320H666" stroke="#444" strokeDasharray="9 8" strokeWidth="2" />
        <path d="M653 306L672 320L653 334" fill="none" stroke="#222" strokeWidth="3" />

        <g transform="translate(760 320)">
          <path d="M-70 -148H48L82 -118V118L48 148H-70Z" fill="url(#highlight-joint-metal)" />
          <path d="M-70 -148L-39 -174H79L111 -143L82 -118H-37Z" fill="#3b3b3b" />
          <circle r="73" fill="#080808" stroke="#5f5f5f" strokeWidth="9" />
          <circle r="50" fill="url(#highlight-joint-hub)" />
          <circle r="15" fill="#070707" stroke="#aaa" strokeWidth="2" />
          <path d="M-66 -92L-28 -64M66 92L28 64" stroke="#8a8a8a" strokeWidth="4" />
        </g>
      </g>

      <g fontFamily="monospace" letterSpacing="2">
        <text x="142" y="575" fill="#1f1f1f" fontSize="20">PRINTED JOINT</text>
        <text x="448" y="575" fill="#1f1f1f" fontSize="20">SERVO</text>
        <text x="694" y="575" fill="#1f1f1f" fontSize="20">NEXT ITERATION</text>
      </g>
    </svg>
  );
}

function ValidationConcept() {
  return (
    <svg
      className="highlight-technical-visual"
      viewBox="0 0 960 720"
      role="img"
      aria-label="Planned robot arm testing and iteration workflow"
    >
      <defs>
        <pattern id="highlight-validation-grid" width="42" height="42" patternUnits="userSpaceOnUse">
          <path d="M42 0H0V42" fill="none" stroke="#111" strokeWidth="1" />
        </pattern>
        <linearGradient id="highlight-validation-fill" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#3c3c3c" />
          <stop offset="1" stopColor="#080808" />
        </linearGradient>
      </defs>
      <rect width="960" height="720" fill="#e9e7e1" />
      <rect width="960" height="720" fill="url(#highlight-validation-grid)" opacity="0.6" />
      <g transform="translate(0 18)">
        <g transform="translate(70 190)">
          <rect width="238" height="286" fill="#dedbd4" stroke="#292929" strokeWidth="2" />
          <text x="24" y="42" fill="#191919" fontFamily="monospace" fontSize="18" letterSpacing="2">01 / BENCH</text>
          <path d="M66 214H180L194 244H53Z" fill="url(#highlight-validation-fill)" />
          <rect x="93" y="170" width="57" height="50" rx="8" fill="#191919" />
          <circle cx="121" cy="169" r="27" fill="#0a0a0a" stroke="#666" strokeWidth="5" />
          <path d="M111 150L94 86L116 80L137 145" fill="#171717" stroke="#555" strokeWidth="3" />
          <circle cx="105" cy="82" r="18" fill="#111" stroke="#666" strokeWidth="4" />
          <path d="M104 65L154 50L160 70L112 90" fill="#161616" />
          <path d="M24 258H214" stroke="#888" strokeWidth="1" />
          <text x="24" y="276" fill="#626262" fontFamily="monospace" fontSize="15" letterSpacing="1">MOTION + LOAD BEHAVIOR</text>
        </g>

        <path d="M326 334H364" stroke="#222" strokeWidth="2" />
        <path d="M351 323L366 334L351 345" fill="none" stroke="#222" strokeWidth="2" />

        <g transform="translate(366 190)">
          <rect width="238" height="286" fill="#101010" stroke="#292929" strokeWidth="2" />
          <text x="24" y="42" fill="#f0eee8" fontFamily="monospace" fontSize="18" letterSpacing="2">02 / ANSYS</text>
          <path d="M65 207L103 79L178 111L163 226Z" fill="#242424" stroke="#bdbab2" strokeWidth="2" />
          <path d="M83 185L112 99L158 118L147 205Z" fill="#e7e4dd" />
          <g fill="none" stroke="#797979" strokeWidth="1">
            <path d="M96 147L151 171M104 124L158 147M90 171L143 195" />
            <path d="M116 101L89 185M139 111L109 210M160 119L133 216" />
          </g>
          <path d="M24 258H214" stroke="#4a4a4a" strokeWidth="1" />
          <text x="24" y="276" fill="#aaa8a2" fontFamily="monospace" fontSize="15" letterSpacing="1">MOTOR MOMENTS + LOAD CASES</text>
        </g>

        <path d="M622 334H660" stroke="#222" strokeWidth="2" />
        <path d="M647 323L662 334L647 345" fill="none" stroke="#222" strokeWidth="2" />

        <g transform="translate(662 190)">
          <rect width="228" height="286" fill="#dedbd4" stroke="#292929" strokeWidth="2" />
          <text x="24" y="42" fill="#191919" fontFamily="monospace" fontSize="18" letterSpacing="2">03 / ITERATE</text>
          <path d="M47 196L76 92H157L187 196L164 223H69Z" fill="url(#highlight-validation-fill)" />
          <circle cx="117" cy="150" r="42" fill="#090909" stroke="#707070" strokeWidth="6" />
          <circle cx="117" cy="150" r="15" fill="#bab8b1" />
          <path d="M68 108L93 131M165 108L141 131M69 192L94 170M164 192L140 170" stroke="#888" strokeWidth="4" />
          <path d="M24 258H204" stroke="#888" strokeWidth="1" />
          <text x="24" y="276" fill="#626262" fontFamily="monospace" fontSize="15" letterSpacing="1">REPRINT + COMPARE</text>
        </g>
      </g>

      <path d="M779 504C779 568 480 582 209 522" fill="none" stroke="#323232" strokeDasharray="8 9" strokeWidth="2" />
      <path d="M220 511L204 521L217 535" fill="none" stroke="#323232" strokeWidth="2" />
    </svg>
  );
}

function TechnicalVisual({ visual }: { visual: HighlightVisual }) {
  if (visual === "joint") return <JointConcept />;
  if (visual === "validation") return <ValidationConcept />;
  return <ArmConcept />;
}

export function ProjectHighlight() {
  const [activeSlide, setActiveSlide] = useState(0);
  const reducedMotion = useReducedMotion();
  const stage = projectHighlight.stages[activeSlide];

  const showNext = () => {
    setActiveSlide((current) => (current + 1) % projectHighlight.stages.length);
  };

  const showPrevious = () => {
    setActiveSlide((current) =>
      (current - 1 + projectHighlight.stages.length) % projectHighlight.stages.length,
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
            className="project-highlight-gallery"
            role="region"
            aria-roledescription="carousel"
            aria-label="SO-101 project highlight"
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                showNext();
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                showPrevious();
              }
            }}
          >
            <p className="sr-only" aria-live="polite">
              Image {activeSlide + 1} of {projectHighlight.stages.length}: {stage.title}
            </p>
            <div className="project-highlight-viewport">
              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={stage.visual}
                  className="project-highlight-slide"
                  initial={reducedMotion ? false : { opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, x: -18 }}
                  transition={{ duration: reducedMotion ? 0 : 0.34, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <TechnicalVisual visual={stage.visual} />
                </motion.figure>
              </AnimatePresence>
              <button
                className="project-highlight-image-next"
                type="button"
                onClick={showNext}
                aria-label="Show next project image"
              >
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              <div className="project-highlight-slots" aria-label="Choose project image">
                {projectHighlight.stages.map((item, index) => (
                  <button
                    key={item.visual}
                    type="button"
                    className={index === activeSlide ? "is-active" : ""}
                    aria-label={`Show ${item.title}`}
                    aria-pressed={index === activeSlide}
                    onClick={() => setActiveSlide(index)}
                  >
                    <span aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="project-highlight-copy">
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
