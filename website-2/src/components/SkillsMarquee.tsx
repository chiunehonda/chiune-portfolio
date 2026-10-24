import { Activity, CircuitBoard, Cog, DraftingCompass, Wrench } from "lucide-react";
import projectDatabase from "@/data/projects.json";

const displaySkills = [
  "SolidWorks", "GD&T", "DFMA", "FMEA", "FEA Load Development", "Python", "ANSYS FEA", "ANSYS Fluent",
  "CNC Design", "Lathe", "Milling", "Waterjet Cutting", "Manufacturing Drawings",
  "Raspberry Pi", "ReSpeaker",
  "JavaScript", "HTML", "CSS",
];
const verifiedSkills = new Set([...projectDatabase.projects.flatMap((project) => project.skills), ...projectDatabase.selfReportedSkills].map((skill) => skill.toLowerCase()));
const skills = displaySkills.filter((skill) => verifiedSkills.has(skill.toLowerCase()));
const logos: Record<string, string> = {
  SolidWorks: "solidworks.svg",
  Python: "python.svg",
  "ANSYS FEA": "ansys.svg",
  "ANSYS Fluent": "ansys.svg",
  "Raspberry Pi": "raspberrypi.svg",
  JavaScript: "javascript.svg",
  HTML: "html5.svg",
  CSS: "css3.svg",
};

function iconFor(skill: string) {
  if (/drawing|design|gd&t/i.test(skill)) return DraftingCompass;
  if (/fea|fmea/i.test(skill)) return Activity;
  if (/raspberry|respeaker/i.test(skill)) return CircuitBoard;
  if (/lathe|milling|cnc|waterjet|dfma/i.test(skill)) return Wrench;
  return Cog;
}

function SkillList({ duplicate = false }: { duplicate?: boolean }) {
  return <ul className="skills-marquee-list" aria-hidden={duplicate || undefined}>
    {skills.map((skill) => {
      const Icon = iconFor(skill);
      const logo = logos[skill];
      return <li key={skill} className={skill === "SolidWorks" ? "skill-wordmark" : undefined}>
        {logo ? <img src={`/media/skills/${logo}`} alt="" aria-hidden="true" /> : <Icon size={25} strokeWidth={1.6} aria-hidden="true" />}
        <span>{skill}</span>
      </li>;
    })}
  </ul>;
}

export function SkillsMarquee() {
  return <section id="skills" className="skills-section" aria-labelledby="skills-title">
    <div className="section-heading"><h2 id="skills-title">Skills & Tools</h2><span className="skills-count">{skills.length} selected</span></div>
    <div className="skills-marquee" role="region" aria-label="Skills and tools">
      <div className="skills-marquee-track"><SkillList /><SkillList duplicate /></div>
    </div>
  </section>;
}
