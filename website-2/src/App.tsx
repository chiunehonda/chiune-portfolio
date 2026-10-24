import { lazy, Suspense, useEffect, useState, type PointerEvent } from "react";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { contact, experiences, projectById, type PortfolioImage } from "@/data/portfolio";
import { CustomCursor } from "@/components/CustomCursor";
import { SakuraLeft } from "@/components/SakuraLeft";
import { SkillsMarquee } from "@/components/SkillsMarquee";

const InteractiveCadViewer = lazy(async () => ({ default: (await import("@/components/CadViewer")).CadViewer }));
function CadViewer(props: { src: string; title: string; caption: string }) {
  return <Suspense fallback={<div className="cad-viewer cad-viewer-loading">Loading interactive CAD…</div>}><InteractiveCadViewer {...props} /></Suspense>;
}

const projectGroups = [
  { id: "projects-work", title: "Work", ids: ["starsolutions-engineering-internship"] },
  { id: "projects-student-team", title: "Student Team", ids: ["subc-drivetrain", "ubc-solar-suspension-rockers"] },
  { id: "projects-personal", title: "Personal", ids: ["sonous-acoustic-drone-sensing", "so-101-robot-arm", "v6-engine", "radiator-conjugate-heat-transfer", "hydroelectric-generator", "apsc-101-study-system"] },
] as const;

const experienceOrder = ["starsolutions-internship-2026", "sonous-echo-development-2026", "ubc-solar-vehicle-dynamics-2026", "subc-drivetrain-team-2025-2026"] as const;
const experienceCaseIds: Record<string, string> = {
  "starsolutions-internship-2026": "starsolutions-engineering-internship",
  "sonous-echo-development-2026": "sonous-acoustic-drone-sensing",
  "ubc-solar-vehicle-dynamics-2026": "ubc-solar-suspension-rockers",
  "subc-drivetrain-team-2025-2026": "subc-drivetrain",
};

const notes: Record<string, { situation: string; action: string; evidence: string; next: string }> = {
  "so-101-robot-arm": {
    situation: "The arm had to become a reliable working platform before any redesign could be judged. Mechanical fit, cable routing, motor setup, calibration, code, and feedback all affect whether a commanded move becomes useful motion.",
    action: "The control process moved from controller connection and motor calibration to running Python motion commands. Telemetry and live tests were used to inspect how the assembled arm responded. The media follows that sequence from assembly and wiring through motion tests, then shows the claw and handle CAD work now underway.",
    evidence: "The baseline arm is assembled, calibrated, and shown moving in the test clips. The redesign images show work in progress; they do not establish an improved grip, a finished handle, or a validated FEA result.",
    next: "Finish the claw and handle geometry, compare the revised claw under representative loads, then test the physical changes against the working baseline.",
  },
  "ubc-solar-suspension-rockers": {
    situation: "UBC Solar is developing lighter suspension rockers while preserving strength, stiffness, the wheel-to-shock load path, and the intended motion ratio.",
    action: "Current work compares aluminum and carbon-fibre concepts and evaluates alternative geometries with ANSYS FEA against suspension loads and packaging constraints.",
    evidence: "Design evaluation is ongoing. No material or final geometry has been selected, and no measured mass saving or physical test result is claimed.",
    next: "Use the FEA comparison to select a design candidate, then plan manufacturing and physical validation.",
  },
  "subc-drivetrain": {
    situation: "SUBC's drivetrain team designs and refines the system that carries pilot power to the counter-rotating propellers. Within that larger effort, my work focused on cutting gearbox-plate weight and developing a frame backplate. Output speed, alignment, mass, serviceability, and underwater reliability shaped the design.",
    action: "A core strength in this work was deriving FEA load cases from power, gear geometry, and support reactions. I used those calculations and SolidWorks stress studies to compare uncut, pocketed, and ribbed plate concepts. I also modeled the frame backplate, made a dimensioned drawing, and worked on machining its pocket and bore. The team continued the bevel-gear, shaft, housing, and assembly work around these parts.",
    evidence: "The 38% bottom-plate reduction is a modeled mass comparison, from 2.35 lb to 1.45 lb; the 1.51 lb layout was another concept considered. The supplied stress plots document iteration, not a passing safety factor or physical validation. The backplate drawing and machining photo show a separate CAD-to-shop contribution.",
    next: "A formal DFMEA would rank bearing misalignment, fastener loosening, seal leakage, and gear wear by severity and detectability. That could guide an instrumented endurance test and inspection plan; those tests are not claimed here.",
  },
  "sonous-acoustic-drone-sensing": {
    situation: "A useful acoustic outpost needs more than a classifier. The node must hold its microphones and electronics in a deployable enclosure, recognize a possible drone, estimate where the sound came from, and send an understandable observation to an operator. Sonous now presents both a fixed Echo node and a Mobile Echo rover concept.",
    action: "My work joins the physical node design with the software chain: enclosure CAD, prototype multichannel capture, a source-traceable audio dataset, leakage-aware model evaluation, direction finding, location-aware messages, multi-node fusion software, and dashboard concepts. Each stage has its own evidence and open questions.",
    evidence: "The license-safe YAMNet head reached 0.900 F1, 0.925 balanced accuracy, and 0.984 ROC-AUC on 90 out-of-fold recordings in five-fold leakage-aware validation. Those are offline classifier results. The three-node fusion view is a synthetic software demonstration, and quantitative field detection and localization accuracy remain unverified.",
    next: "Build and compare the node hardware against known sound-source positions outdoors. Measure false alarms, missed detections, bearing error, time synchronization, weather exposure, and the effect of the rover's own noise when it stops to listen.",
  },
  "starsolutions-engineering-internship": {
    situation: "Users could over-torque the existing RF connector stack and damage the chassis. A direct NEX10-to-SMA part could remove an intermediate cable, but its panel fit, inside nut, and neighboring RF hardware still had to work together.",
    action: "I used SolidWorks to model the adapter around panel thickness, thread engagement, inside-nut access, and coax clearance. A 3D-printed prototype let me check the geometry in the chassis before the three-sheet manufacturing drawing went to supplier review. For the separate splitter task, I used a Keysight E5071C and documented system interfaces in Microsoft Visio.",
    evidence: "The printed fit check supports mechanical packaging; it does not establish RF performance of the new adapter. The RF results apply to two four-way splitters: 24 measurements passed applicable hard limits with 2.0% mean deviation from datasheet typicals. The $18.71 and $13.72 unit prices were supplier quotations at MOQs of 100 and 300.",
    next: "A production handoff would still need sample qualification, tolerance review, environmental and assembly checks, and purchase approval.",
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
  const orderedExperiences = experienceOrder.flatMap((id) => {
    const experience = experiences.find((item) => item.id === id);
    return experience ? [experience] : [];
  });

  return <div className={`site-shell ${detail ? "is-case" : ""}`}>
    <CustomCursor />
    <a className="skip-link" href={detail ? "#case-content" : "#experience"} onClick={detail ? (event) => { event.preventDefault(); document.getElementById("case-content")?.focus(); } : undefined}>Skip to content</a>
    <div className="sakura-wash" aria-hidden="true" />
    {!detail && <SakuraLeft />}
    {detail && note ? <main id="case-content" className="case-page" tabIndex={-1}>
      <a href="#/" className="back-link"><ArrowLeft size={16} /> Back to work</a>
      <div className="eyebrow">{detail.categoryLabel} <span>/</span> {detail.timeframe}</div>
      <h1>{detail.title}</h1>
      <p className="case-deck">{detail.subtitle && <><strong>{detail.subtitle}</strong><br /></>}{detail.summary}</p>
      <div className={`case-hero-media${detail.id === "ubc-solar-suspension-rockers" ? " case-hero-media--logo" : detail.id === "starsolutions-engineering-internship" ? " case-hero-media--star" : ""}`}><Media media={detail.images[0]} eager />{detail.id === "ubc-solar-suspension-rockers" && <div className="solar-hero-status"><span>IN PROGRESS</span><strong>Suspension rocker concepts</strong><p>Aluminum · Carbon fibre · ANSYS FEA</p></div>}</div>
      {detail.id === "starsolutions-engineering-internship" && <div className="case-skill-line"><span>TOOLS & METHODS</span><div>{detail.skills?.map((skill) => <span key={skill}>{skill}</span>)}</div></div>}
      <div className="case-body">
        <aside className="case-index" aria-label="Case study sections"><span>CASE STUDY</span>{[["situation", "01 / Situation"], ["task", "02 / Task"], ["action", "03 / Action"], ["result", "04 / Result"], ["next", "05 / Next cycle"]].map(([id, label]) => <button type="button" key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}>{label}</button>)}</aside>
        <div className="case-story">
          <section id="situation"><span className="section-number">01 / SITUATION</span><h2>Why this problem mattered</h2><p>{note.situation}</p></section>
          <section id="task"><span className="section-number">02 / TASK</span><h2>Requirements & constraints</h2><p>{detail.goal}</p></section>
          <section id="action"><span className="section-number">03 / ACTION</span><h2>From concept to evidence</h2><p>{detail.built}</p><p>{note.action}</p>{detail.id === "subc-drivetrain" && <div className="case-load-breakdown"><h3>How the FEA loads were derived</h3><ol><li><strong>Gear input</strong><span>The bevel-pair sheet uses the team's nominal 110 W per propeller at 90 RPM and a 24:12 tooth pair. It calculates 180 RPM output and 8.61 / 4.30 ft·lbf at the two shafts.</span></li><li><strong>Gear forces</strong><span>Using torque and pitch radius, the sheet calculates 137.7 lbf tangential force, then resolves the gear geometry into 22.4 lbf radial and 44.8 lbf axial components.</span></li><li><strong>Plate reactions</strong><span>A separate bottom-plate sheet starts with its own 162.824 and 181.476 lbf tangential inputs. Across a 5.75 in support span, the larger-gear case gives 54.9 and 108.0 lbf support reactions, or 27.4 and 54.0 lbf per hole when split across two mounting holes.</span></li></ol><p>The sheets do not document how the bottom-plate inputs were selected from the bevel-pair case, so these are presented as separate calculation cases.</p></div>}</section>
          {detail.id === "subc-drivetrain" && <div className="case-work-block"><h3>Bottom-plate concepts compared</h3><p>The same plate was studied before and after removing material. A different rib layout was also explored. These are modeled mass comparisons, with stress plots used to inspect the load path.</p><div className="case-design-grid">{detail.images.slice(3, 6).map((media) => <figure key={media.src}><Media media={media} /><figcaption>{media.caption}</figcaption></figure>)}</div><p className="case-work-note">The plots do not establish a passing safety factor or a physically tested plate.</p></div>}
          {detail.id === "subc-drivetrain" && <div className="case-work-block case-backplate-block"><h3>Frame backplate: CAD to machining</h3><p>I modeled the backplate in SolidWorks, prepared a dimensioned drawing for its pocket, center bore, and mounting holes, then worked on the part at the mill.</p><div className="case-backplate-grid">{detail.images.slice(6, 8).map((media) => <figure key={media.src}><Media media={media} /><figcaption>{media.caption}</figcaption></figure>)}</div><div className="case-links">{detail.links?.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} <ArrowUpRight size={15} /></a>)}</div></div>}
          {detail.id === "subc-drivetrain" && <CadViewer src="/media/models/subc-drivetrain-assembly.glb" title="SUBC drivetrain assembly" caption="Rotate the supplied SolidWorks assembly to inspect the gearbox, shafts, gears, and supporting plates. CAD geometry represents a design iteration." />}
          {detail.id === "starsolutions-engineering-internship" && <CadViewer src="/media/models/star-nex10-sma-adapter.glb" title="NEX10-to-SMA chassis adapter" caption="Rotate the CAD model behind the manufactured adapter to inspect the connector geometry and mounting features." />}
          {detail.id === "starsolutions-engineering-internship" && <div className="case-work-block star-process"><h3>From printed prototype to chassis fit</h3><p>The DFMA goal was one panel-mounted adapter in place of an intermediate cable. In SolidWorks I accounted for wall thickness, internal nut installation, and thread engagement. I then used the black 3D-printed prototype for a fit check; the two chassis photos show the connector positions, nearby RF hardware, and cable clearance. The drawing below is one sheet of the three-sheet package.</p><div className="star-process-grid">{detail.images.slice(1, 5).map((media) => <figure key={media.src}><Media media={media} /><figcaption>{media.caption}</figcaption></figure>)}</div><figure className="star-drawing"><Media media={detail.images[5]} /><figcaption>{detail.images[5].caption}</figcaption></figure></div>}
          {detail.id === "ubc-solar-suspension-rockers" && <div className="case-work-block"><h3>Front rocker concept generation</h3><p>The D1 aluminum twin-plate model is one front rocker geometry under consideration. Its paired plates and connecting features give the team a concrete design to compare for mass, packaging, and the load path. Evaluation is ongoing.</p><CadViewer src="/media/models/solar-front-d1-twin-plates.glb" title="D1 aluminum twin-plate rocker" caption="Supplied concept STEP model. This is a candidate design, not a selected or built rocker." /></div>}
          {detail.id === "sonous-acoustic-drone-sensing" && <div className="sonous-deep-dive">
            <div className="sonous-chapter"><span className="section-number">PRODUCT DIRECTION</span><h3>One sensing node, two ways to place it</h3><p>The current Sonous site describes Echo as a sealed four-microphone node that listens, classifies what it hears, and reports a bearing. Mobile Echo puts that node on a rover. The rover moves to a listening position, stops its drive motors, listens, and reports; motor noise during movement would mask the sound it is trying to detect.</p><div className="sonous-cad-pair sonous-photo-pair">{detail.images.slice(1, 3).map((media) => <figure key={media.src}><Media media={media} /><figcaption>{media.caption}</figcaption></figure>)}</div></div>
            <div className="sonous-chapter"><span className="section-number">MECHANICAL DESIGN</span><h3>Packaging the acoustic outpost</h3><p>I worked through the Echo enclosure in CAD so the sensing hardware, microphone arrangement, service access, and mounting could be considered as a system. The interactive model below is a local assembly version. The four-microphone product direction shown on sonous.ca and the six-channel development capture work are different stages of the project.</p><CadViewer src="/media/models/sonous-echo-node.glb" title="Echo sensing node" caption="Rotate the supplied Echo node assembly STEP model. Enclosure production and field validation remain in progress." /><div className="sonous-cad-pair">{detail.images.slice(3, 5).map((media) => <figure key={media.src}><Media media={media} /><figcaption>{media.caption}</figcaption></figure>)}</div></div>
            <div className="sonous-chapter"><span className="section-number">SYSTEM PIPELINE</span><h3>From waveform to operator view</h3><ol className="sonous-pipeline"><li><strong>Capture</strong><span>Record multichannel audio on a Raspberry Pi and ReSpeaker development node.</span></li><li><strong>Classify</strong><span>Evaluate a license-safe drone-sound classifier on grouped recordings to avoid leakage across folds.</span></li><li><strong>Estimate bearing</strong><span>Use raw microphone channels to calculate an arrival direction, then attach location and time to the node message.</span></li><li><strong>Combine and display</strong><span>Fuse bearings in local coordinates and show the estimate and uncertainty in an operator dashboard.</span></li></ol><p>The bearing and fusion views below are software demonstrations; they do not measure outdoor localization accuracy.</p><div className="sonous-cad-pair">{detail.images.slice(7, 9).map((media) => <figure key={media.src}><Media media={media} /><figcaption>{media.caption}</figcaption></figure>)}</div></div>
            <div className="sonous-chapter"><span className="section-number">EVALUATION</span><h3>What the offline data supports</h3><div className="sonous-metrics"><div><strong>0.900</strong><span>F1</span></div><div><strong>0.925</strong><span>Balanced accuracy</span></div><div><strong>0.984</strong><span>ROC-AUC</span></div></div><p>These figures come from 90 out-of-fold recordings across five leakage-aware folds for a license-safe YAMNet head. The dataset pipeline tracks 2,090 audio clips in 1,614 leakage groups. Performance varied by fold, and a field test with known drone and non-drone sounds is still needed.</p><div className="sonous-cad-pair">{detail.images.slice(9, 11).map((media) => <figure key={media.src}><Media media={media} /><figcaption>{media.caption}</figcaption></figure>)}</div></div>
            <div className="sonous-chapter"><span className="section-number">INTERFACE</span><h3>Make the observation usable</h3><p>The dashboard concepts translate detections and estimated directions into an operator view, with smaller companion layouts for glanceable devices. Their visual design is shown here; deployment and user testing remain ahead.</p><figure><Media media={detail.images[5]} /><figcaption>{detail.images[5].caption}</figcaption></figure></div>
          </div>}
          {detail.id !== "sonous-acoustic-drone-sensing" && detail.id !== "starsolutions-engineering-internship" && detail.images.slice(1, detail.id === "subc-drivetrain" ? 2 : 3).map((media) => <figure className="case-figure" key={media.src}><Media media={media} /><figcaption>{media.caption || media.alt}</figcaption></figure>)}
          <section id="result"><span className="section-number">04 / RESULT</span><h2>What the work showed</h2><p>{detail.result}</p><p>{note.evidence}</p>{detail.id === "so-101-robot-arm" && <div className="robot-motion-grid">{detail.images.slice(3, 5).map((media) => <figure key={media.src}><Media media={media} /><figcaption>{media.caption || media.alt}</figcaption></figure>)}</div>}</section>
          {detail.id === "starsolutions-engineering-internship" && <div className="case-work-block star-validation"><h3>Validating the RF splitters</h3><p>With the Keysight E5071C vector network analyzer, I tested two four-way splitters at 4.01 GHz. Insertion loss tracks signal delivered from the sum port to each of four outputs; port-to-port isolation checks unwanted coupling; VSWR checks impedance matching and reflections. Across 24 measurements, mean deviation from datasheet typicals was 2.0%, and every applicable hard limit passed. Amplitude unbalance measured 0.135 and 0.150 dB, both below the 0.6 dB maximum.</p><div className="star-validation-grid">{detail.images.slice(7, 9).map((media) => <figure key={media.src}><Media media={media} /><figcaption>{media.caption}</figcaption></figure>)}</div></div>}
          <section id="next"><span className="section-number">05 / NEXT CYCLE</span><h2>Failure modes & next tests</h2><p>{note.next}</p>{detail.id === "so-101-robot-arm" && <div className="robot-design-grid">{detail.images.slice(5).map((media) => <figure key={media.src}><Media media={media} /><figcaption>{media.caption || media.alt}</figcaption></figure>)}</div>}</section>
          {detail.id === "starsolutions-engineering-internship" && <div className="star-support-grid">{[detail.images[6], detail.images[9]].map((media) => <figure key={media.src}><Media media={media} /><figcaption>{media.caption}</figcaption></figure>)}</div>}
          {detail.id !== "sonous-acoustic-drone-sensing" && detail.id !== "so-101-robot-arm" && detail.id !== "starsolutions-engineering-internship" && detail.images.slice(detail.id === "subc-drivetrain" ? 8 : 3).map((media) => <figure className="case-figure" key={media.src}><Media media={media} /><figcaption>{media.caption || media.alt}</figcaption></figure>)}
          {detail.id !== "subc-drivetrain" && detail.links?.length ? <div className="case-links">{detail.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} <ArrowUpRight size={15} /></a>)}</div> : null}
          <a className="next-work" href="#/">← Explore all work</a>
        </div>
      </div>
    </main> : <main className="home">
      <section className="intro" aria-labelledby="intro-title">
        <div className="name-line"><h1 id="intro-title"><FlipHeading english="Chiune Honda" japanese="本多 千畝" /></h1><span className="japanese-name" lang="ja">本多 千畝</span></div>
      </section>
      <section id="experience" className="listing experience" aria-labelledby="experience-title">
        <div className="section-heading"><h2 id="experience-title"><FlipHeading english="Experience" japanese="経験" /></h2></div>
        <div className="experience-list">{orderedExperiences.map((item) => <article className="experience-row" key={item.id}>
          <img className="company-logo" src={item.logo.src} alt={item.logo.alt} loading="lazy" />
          <div className="experience-text"><h3>{item.role}</h3><div className="experience-meta"><a href={item.website} target="_blank" rel="noreferrer">{item.company} <ArrowUpRight size={12} /></a><a className="experience-detail" href={`#/project/${experienceCaseIds[item.id]}`}>View work <ArrowUpRight size={12} /></a></div></div>
          <span className="experience-date">{item.timeframe}</span>
        </article>)}</div>
      </section>
      <section id="work" className="listing work" aria-labelledby="work-title">
        <div className="section-heading"><h2 id="work-title"><FlipHeading english="Projects" japanese="プロジェクト" /></h2></div>
        <div className="project-groups">{projectGroups.map((group) => <section className="project-group" key={group.id} aria-labelledby={group.id}>
          <div className="project-group-heading"><h3 id={group.id}>{group.title}</h3></div>
          <div className="project-list">{group.ids.map((id, index) => {
            const project = projectById[id];
            return project ? <a className="project-row" key={project.id} href={`#/project/${project.id}`} aria-label={`Read case study: ${project.title}`}>
              <span className="row-index">{String(index + 1).padStart(2, "0")}</span><span className="project-thumb"><Media media={project.images[0]} /></span>
              <span className="project-text"><strong>{project.title}</strong><span>{project.cardSummary}</span></span><span className="row-arrow"><ArrowUpRight size={18} /></span>
            </a> : null;
          })}</div>
        </section>)}</div>
      </section>
      <section id="contact" className="contact-section"><h2><FlipHeading english="Contact" japanese="連絡先" /></h2><p>Open to Summer 2027 co-op opportunities and conversations about mechanical design, testing, and mechatronics.</p>
        <a className="email-link" href="mailto:chonda@student.ubc.ca"><Mail size={18} /> chonda@student.ubc.ca <ArrowUpRight size={18} /></a>
        <div className="social-links">{contact.links.filter((link) => link.label !== "Email").map((link) => <a href={link.href} key={link.label} target="_blank" rel="noreferrer">{link.label} <ArrowUpRight size={13} /></a>)}</div>
      </section>
      <SkillsMarquee />
    </main>}
    <footer className="footer"><span>© {new Date().getFullYear()} Chiune Honda</span><span lang="ja">本多 千畝 <span className="footer-flower">✿</span></span></footer>
  </div>;
}

export default App;
