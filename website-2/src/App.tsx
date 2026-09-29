import { useEffect, useState, type PointerEvent } from "react";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { contact, experiences, projectById, type PortfolioImage, type ProjectCaseStudy } from "@/data/portfolio";
import { CustomCursor } from "@/components/CustomCursor";
import { SakuraLeft } from "@/components/SakuraLeft";

const featuredIds = [
  "subc-drivetrain", "sonous-acoustic-drone-sensing", "starsolutions-engineering-internship",
  "radiator-conjugate-heat-transfer", "v6-engine", "hydroelectric-generator", "apsc-101-study-system",
] as const;

const notes: Record<string, { situation: string; action: string; evidence: string; next: string }> = {
  "subc-drivetrain": {
    situation: "The package had to turn human input into two concentric propeller outputs inside a limited hull envelope. Output speed, shaft alignment, mass, serviceability, and underwater reliability were the governing requirements.",
    action: "The design cycle connected hand calculations to a buildable layout: AGMA gear sizing, DE-Goodman shaft fatigue checks, and static FEA on gears and housing. Pocketing and ribs removed material where the model showed it was less useful. A four-plate 6061-T6 housing kept machining and assembly access in view, a practical DFMA decision.",
    evidence: "The 38% bottom-plate reduction is a modeled mass comparison, from 2.35 lb to 1.45 lb. The gearbox was then machined and assembled. Underwater endurance and full-system performance are separate validation questions.",
    next: "A formal DFMEA would rank bearing misalignment, fastener loosening, seal leakage, and gear wear by severity and detectability. That could guide an instrumented endurance test and inspection plan; those tests are not claimed here.",
  },
  "sonous-acoustic-drone-sensing": {
    situation: "Echo is an in-progress system. A useful field node has to capture sound, estimate direction, attach location and time, combine observations, and present uncertainty to an operator.",
    action: "The work is divided into traceable data and evaluation, embedded capture, raw-channel direction finding, GPS/PPS-aware messages, local-ENU fusion, enclosure design, and interfaces. This makes each subsystem inspectable before complete-system validation.",
    evidence: "A license-safe YAMNet head reached 0.900 F1, 0.925 balanced accuracy, and 0.984 ROC-AUC on 90 out-of-fold recordings in five-fold leakage-aware validation. These are offline results, not a field detection rate. Quantitative calibration and the complete multi-node system remain in progress.",
    next: "The next risk review should cover missed detections, false alarms, timestamp and GPS errors, microphone orientation, enclosure weather resistance, and misleading bearings. Field trials with known source positions can close the loop.",
  },
  "starsolutions-engineering-internship": {
    situation: "The assignment sat inside an active commercial RF chassis program. Mechanical fit, RF performance, supplier feasibility, and integration documentation all mattered to the same product.",
    action: "The direct chassis-mounted NEX10-to-SMA adapter moved through SolidWorks design, a three-sheet manufacturing drawing, and a printed fit-check. Supplier comparisons tested sourcing options, VNA measurements checked two four-way splitters at 4.01 GHz, and a cable/block diagram clarified interfaces.",
    evidence: "Across 24 measurements, splitter results averaged 2.0% deviation from datasheet typicals and passed applicable hard limits. Supplier prices of $18.71 at MOQ 100 and $13.72 at MOQ 300 were quotations, not realized savings or a production release.",
    next: "A production handoff would still need sample qualification, tolerance review, environmental and assembly checks, and purchase approval. Only employer-approved artifacts are shown.",
  },
  "radiator-conjugate-heat-transfer": {
    situation: "The study asked how coolant flow and radiator-face air might affect heat removal, outlet temperature, and pressure drop. A defensible baseline was essential before interpreting a more complex air-side model.",
    action: "The workflow used water and external-air domains, an aluminum shell with a 1 mm wall, energy coupling, standard k-epsilon turbulence, and a 903,945-element tetrahedral mesh. Reports and flow/temperature views helped separate numbers from visual impressions.",
    evidence: "The convection-boundary baseline converged from a 373 K inlet to about 371.232 K at the outlet, estimating about 1.03 kW removed at 0.13919 kg/s. The explicit-air case remains qualitative and is not validated.",
    next: "The next cycle is mesh independence, boundary-condition sensitivity, interface cleanup, fin/core representation, and comparison with experiment or an accepted analytical reference.",
  },
  "v6-engine": {
    situation: "This personal project examined the relationship between component geometry, assembly constraints, and four-stroke timing in a moving system.",
    action: "More than 55 modeled parts and 150 SolidWorks mates linked the crankshaft, pistons, camshaft, and valves. The assembly was built to move meaningfully, not merely look correct in a still render.",
    evidence: "Manual crank rotation drives linked piston and valve motion. That demonstrates constraint planning and timing behavior in CAD, not a manufactured or running engine.",
    next: "Interference checks, tolerance stacks, and manufacturability review on selected parts would move the exercise toward a production-oriented DFMA study.",
  },
  "hydroelectric-generator": {
    situation: "The design task was to turn low-speed water flow into enough generator speed and electrical output to light an LED.",
    action: "The prototype combined a spoon turbine, a 75-tooth driver and 15-tooth driven gear for a 1:5 speed increase, a DC motor used as a generator, and a repeatable test setup. It was treated as a chain of energy conversions.",
    evidence: "Testing produced up to 4.7 V and powered the LED. That is a measured peak voltage in the prototype test, not a claim about continuous power or efficiency.",
    next: "Further iteration would quantify flow rate, shaft speed, torque, loaded voltage/current, and repeatability, then prioritize gear slip, turbine imbalance, connection loss, and splash exposure.",
  },
  "apsc-101-study-system": {
    situation: "Engineering students had scattered notes, quizzes, worksheets, and references. The project aimed to make that material fast to find and useful for active recall.",
    action: "Eighty-seven source files were reorganized into structured notes, formula references, concept cards, and interactive quizzes. Search and answer reveals were kept in a no-backend site.",
    evidence: "More than 30 APSC 101 students used the system. That establishes real use; learning-outcome improvement would require a separate study.",
    next: "A useful next cycle would observe where students fail to find an answer, revise the information architecture, and measure task completion and quiz recall over time.",
  },
};

function Media({ media, eager = false }: { media: PortfolioImage; eager?: boolean }) {
  return media.kind === "video"
    ? <video src={media.src} poster={media.poster} controls playsInline preload="metadata" aria-label={media.alt} />
    : <img src={media.src} alt={media.alt} loading={eager ? "eager" : "lazy"} />;
}

function FlipHeading({ english, japanese }: { english: string; japanese: string }) {
  const revealToPointer = (event: PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType === "touch") return;
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const position = Math.max(0, Math.min(100, ((event.clientX - left) / width) * 100));
    event.currentTarget.style.setProperty("--heading-position", `${position}%`);
  };

  const enter = (event: PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType === "touch") return;
    event.currentTarget.dataset.revealing = "";
    revealToPointer(event);
  };

  return <span className="flip-heading" tabIndex={0} onPointerEnter={enter} onPointerMove={revealToPointer} onPointerLeave={(event) => event.currentTarget.removeAttribute("data-revealing")}><span className="flip-english">{english}</span><span className="flip-japanese" lang="ja" aria-hidden="true">{japanese}</span></span>;
}

function App() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onHash = () => {
      setHash(window.location.hash);
      if (window.location.hash.startsWith("#/")) window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const detailId = hash.startsWith("#/project/") ? decodeURIComponent(hash.slice(10)) : "";
  const detail = projectById[detailId];
  const note = notes[detailId];
  const selected = featuredIds.map((id) => projectById[id]).filter(Boolean) as ProjectCaseStudy[];

  return <div className={`site-shell ${detail ? "is-case" : ""}`}>
    <CustomCursor />
    <a className="skip-link" href={detail ? "#case-content" : "#experience"} onClick={detail ? (event) => { event.preventDefault(); document.getElementById("case-content")?.focus(); } : undefined}>Skip to content</a>
    <div className="sakura-wash" aria-hidden="true" />
    {!detail && <SakuraLeft />}
    {detail && note ? <main id="case-content" className="case-page" tabIndex={-1}>
      <a href="#/" className="back-link"><ArrowLeft size={16} /> Back to work</a>
      <div className="eyebrow">{detail.categoryLabel} <span>/</span> {detail.timeframe}</div>
      <h1>{detail.title}</h1>
      <p className="case-deck">{detail.summary}</p>
      <div className="case-hero-media"><Media media={detail.images[0]} eager /></div>
      <div className="case-body">
        <aside className="case-index" aria-label="Case study sections"><span>CASE STUDY</span>{[["situation", "01 / Situation"], ["task", "02 / Task"], ["action", "03 / Action"], ["result", "04 / Result"], ["next", "05 / Next cycle"]].map(([id, label]) => <button type="button" key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}>{label}</button>)}</aside>
        <div className="case-story">
          <section id="situation"><span className="section-number">01 / SITUATION</span><h2>Why this problem mattered</h2><p>{note.situation}</p></section>
          <section id="task"><span className="section-number">02 / TASK</span><h2>Requirements & constraints</h2><p>{detail.goal}</p></section>
          <section id="action"><span className="section-number">03 / ACTION</span><h2>From concept to evidence</h2><p>{detail.built}</p><p>{note.action}</p></section>
          {detail.images.slice(1, 3).map((media) => <figure className="case-figure" key={media.src}><Media media={media} /><figcaption>{media.caption || media.alt}</figcaption></figure>)}
          <section id="result"><span className="section-number">04 / RESULT</span><h2>What the work showed</h2><p>{detail.result}</p><p>{note.evidence}</p></section>
          <section id="next"><span className="section-number">05 / NEXT CYCLE</span><h2>Failure modes & next tests</h2><p>{note.next}</p></section>
          {detail.images.slice(3).map((media) => <figure className="case-figure" key={media.src}><Media media={media} /><figcaption>{media.caption || media.alt}</figcaption></figure>)}
          {detail.links?.length ? <div className="case-links">{detail.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} <ArrowUpRight size={15} /></a>)}</div> : null}
          <a className="next-work" href="#/">← Explore all work</a>
        </div>
      </div>
    </main> : <main className="home">
      <section className="intro" aria-labelledby="intro-title">
        <div className="name-line"><h1 id="intro-title"><FlipHeading english="Chiune Honda" japanese="本多 千畝" /></h1><span className="japanese-name" lang="ja">本多 千畝</span></div>
      </section>
      <section id="experience" className="listing experience" aria-labelledby="experience-title">
        <div className="section-heading"><h2 id="experience-title"><FlipHeading english="Experience" japanese="経験" /></h2></div>
        <div className="experience-list">{experiences.map((item) => <article className="experience-row" key={item.id}>
          <img className="company-logo" src={item.logo.src} alt={item.logo.alt} loading="lazy" />
          <div className="experience-text"><h3>{item.role}</h3><div className="experience-meta"><a href={item.website} target="_blank" rel="noreferrer">{item.company} <ArrowUpRight size={12} /></a>{item.id !== "ubc-solar-vehicle-dynamics-2026" && <a className="experience-detail" href={`#/project/${item.id === "starsolutions-internship-2026" ? "starsolutions-engineering-internship" : "subc-drivetrain"}`}>View work <ArrowUpRight size={12} /></a>}</div></div>
          <span className="experience-date">{item.timeframe}</span>
        </article>)}</div>
      </section>
      <section id="work" className="listing work" aria-labelledby="work-title">
        <div className="section-heading"><h2 id="work-title"><FlipHeading english="Projects" japanese="プロジェクト" /></h2></div>
        <div className="project-list">{selected.map((project, index) => <a className="project-row" key={project.id} href={`#/project/${project.id}`} aria-label={`Read case study: ${project.title}`}>
          <span className="row-index">{String(index + 1).padStart(2, "0")}</span><span className="project-thumb"><Media media={project.images[0]} /></span>
          <span className="project-text"><strong>{project.title}</strong><span>{project.cardSummary}</span></span><span className="row-arrow"><ArrowUpRight size={18} /></span>
        </a>)}</div>
      </section>
      <section id="contact" className="contact-section"><h2><FlipHeading english="Contact" japanese="連絡先" /></h2><p>Open to Summer 2027 co-op opportunities and conversations about mechanical design, testing, and mechatronics.</p>
        <a className="email-link" href="mailto:chonda@student.ubc.ca"><Mail size={18} /> chonda@student.ubc.ca <ArrowUpRight size={18} /></a>
        <div className="social-links">{contact.links.filter((link) => link.label !== "Email").map((link) => <a href={link.href} key={link.label} target="_blank" rel="noreferrer">{link.label} <ArrowUpRight size={13} /></a>)}</div>
      </section>
    </main>}
    <footer className="footer"><span>© {new Date().getFullYear()} Chiune Honda</span><span lang="ja">本多 千畝 <span className="footer-flower">✿</span></span></footer>
  </div>;
}

export default App;
