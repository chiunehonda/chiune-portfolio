import projectDatabase from "./projects.json";

export type ProjectCategory = "mechanical" | "mechatronics" | "software";

export interface PortfolioImage {
  src: string;
  alt: string;
  caption?: string;
  kind?: "image" | "video";
  poster?: string;
}

export interface PortfolioLink {
  label: string;
  href: string;
}

export interface PortfolioExperienceProject {
  id: string;
  title: string;
  summary: string;
  image: PortfolioImage;
}

export interface PortfolioExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  timeframe: string;
  public: boolean;
  summary: string;
  disclosure: string;
  website: string;
  logo: PortfolioImage;
  projects: PortfolioExperienceProject[];
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  timeframe: string;
  cardSummary: string;
  summary: string;
  goal: string;
  built: string;
  result: string;
  images: PortfolioImage[];
  links?: PortfolioLink[];
  disclosure?: string;
}

export const siteIdentity = {
  name: "Chiune Honda",
  discipline: "Mechanical Engineering",
  role: "Mechanical Engineering Student",
  school: "University of British Columbia",
  location: "Vancouver, BC",
  nextStep: "Applying to the Mechatronics Option",
  availability: "Open to 2026–27 co-op and hardware design opportunities",
} as const;

const legacyProjects: ProjectCaseStudy[] = [
  {
    id: "subc-drivetrain",
    title: "SUBC Submarine Drivetrain",
    category: "mechanical",
    categoryLabel: "Mechanical",
    timeframe: "2025–2026",
    cardSummary:
      "A 2:1 contra-rotating gearbox developed through CAD, calculations, FEA, and machining.",
    summary:
      "Designed a compact 2:1 straight-bevel gearbox to transfer pilot power to UBC SUBC’s counter-rotating propellers.",
    goal:
      "Deliver 180 RPM to concentric, counter-rotating shafts while minimizing gearbox mass and maintaining alignment, strength, serviceability, and underwater reliability.",
    built:
      "Combined AGMA gear calculations, DE-Goodman shaft fatigue analysis, and SolidWorks static FEA to iterate bevel gears and ribbed, pocketed 6061-T6 housing plates for CNC machining.",
    result:
      "Reduced modeled bottom-plate mass by 38%—from 2.35 lb to 1.45 lb—then manufactured and assembled the four-plate housing, bevel gears, concentric shafts, bearings, bushings, and retainers.",
    images: [
      {
        src: "/media/projects/subc-drivetrain-cad-raw.png",
        alt: "SolidWorks render of the SUBC submarine drivetrain gearbox",
      },
      {
        src: "/media/projects/subc-bevel-gear-fea.png",
        alt: "SolidWorks static FEA stress contour on the SUBC bevel gear and set-screw interface",
      },
      {
        src: "/media/projects/subc-pocketed-plate-fea.png",
        alt: "SolidWorks static FEA stress contour on the pocketed SUBC gearbox bottom plate",
      },
      {
        src: "/media/projects/subc-built-gearbox-raw.webp",
        alt: "Top view of the machined SUBC bevel gearbox",
      },
      {
        src: "/media/projects/subc-installed-drivetrain-raw.webp",
        alt: "Physical SUBC drivetrain installed beside the submarine hull",
      },
    ],
  },
  {
    id: "v6-engine",
    title: "V6 Engine Assembly",
    category: "mechanical",
    categoryLabel: "Mechanical",
    timeframe: "Personal project · 2025",
    cardSummary:
      "A functional CAD assembly built to study real engine motion and constraints.",
    summary:
      "A functional 55+ part SolidWorks assembly with linked piston, crankshaft, camshaft, and valve motion.",
    goal:
      "Build a functional 55+ part V6 assembly to study how geometry, constraints, and four-stroke timing interact.",
    built:
      "Modelled the crankshaft, pistons, camshaft, and valves, then coordinated 150+ SolidWorks mates to link their motion.",
    result:
      "Manual crank rotation drives functional four-stroke piston and valve motion, demonstrating assembly planning, constraint control, and mechanical timing.",
    images: [
      {
        src: "/media/projects/v6-engine-raw.webp",
        alt: "Detailed SolidWorks render of a V6 engine assembly",
      },
      {
        src: "/media/projects/v6-engine-block-raw.webp",
        alt: "SolidWorks render of the V6 engine block and intake assembly",
      },
      {
        src: "/media/projects/v6-connecting-rod-raw.webp",
        alt: "SolidWorks render and toolpath study of the V6 connecting rod",
      },
    ],
  },
  {
    id: "hydroelectric-generator",
    title: "Hydroelectric Generator",
    category: "mechatronics",
    categoryLabel: "Mechatronics",
    timeframe: "APSC design project",
    cardSummary:
      "A compact turbine and gearbox prototype that generated usable voltage from water flow.",
    summary:
      "A water-driven turbine and speed-increasing gearbox that powered an LED through a DC motor.",
    goal:
      "Convert slow water flow into a 1:5 speed increase and enough electrical output to light an LED.",
    built:
      "Built a spoon turbine, 75-tooth driver, 15-tooth driven gear, DC motor circuit, and repeatable test setup.",
    result:
      "Generated up to 4.7 V and demonstrated the complete path from water flow to rotation and electrical output.",
    images: [
      {
        src: "/media/projects/hydro-generator-cover-raw.webp",
        alt: "Completed hydroelectric generator prototype held in the lab",
      },
      {
        src: "/media/projects/hydro-generator-test-raw.webp",
        alt: "Hydroelectric generator during hands-on testing",
      },
      {
        src: "/media/projects/hydro-generator-kit-raw.webp",
        alt: "Hydroelectric generator components and finished kit on a worktable",
      },
    ],
  },
  {
    id: "apsc-101-study-system",
    title: "APSC 101 Study System",
    category: "software",
    categoryLabel: "Software",
    timeframe: "Independent project · 2026",
    cardSummary:
      "An original study guide and quiz system used by 30+ APSC 101 students.",
    summary:
      "An original full-course study guide and interactive practice site built to make dense engineering material searchable and testable.",
    goal:
      "Turn scattered APSC 101 notes, quizzes, worksheets, and references into one searchable study system.",
    built:
      "Converted 87 source files into structured notes, formula references, concept cards, and quizzes with live topic search and interactive answer reveals.",
    result:
      "Used by 30+ APSC 101 students for quick lookup and active recall, with no backend required.",
    images: [
      {
        src: "/media/projects/apsc-study-guide-overview.png",
        alt: "APSC 101 study guide with module navigation, search, and structured notes",
      },
      {
        src: "/media/projects/apsc-practice-quiz.png",
        alt: "APSC 101 practice quiz with an answer revealed",
      },
    ],
    links: [
      {
        label: "Visit study guide",
        href: "/projects/apsc101-study-guide.html",
      },
      {
        label: "Visit practice quiz",
        href: "/projects/apsc101-practice-midterm.html",
      },
    ],
  },
];

// Keep the presentation layer typed while project facts remain portable JSON.
const allPublicProjects = projectDatabase.projects.filter(
  (project) => project.public,
) as ProjectCaseStudy[];

export const projectById = Object.fromEntries(
  allPublicProjects.map((project) => [project.id, project]),
) as Record<string, ProjectCaseStudy>;

export const experienceProjectIds = [
  "starsolutions-engineering-internship",
  "subc-drivetrain",
] as const;

const selectedWorkOrder = [
  "so-101-robot-arm",
  "radiator-conjugate-heat-transfer",
  "v6-engine",
  "hydroelectric-generator",
  "apsc-101-study-system",
] as const;

export const projects = selectedWorkOrder
  .map((id) => projectById[id])
  .filter(Boolean) as ProjectCaseStudy[];

export const experiences = projectDatabase.experiences as PortfolioExperience[];

// Compile-time guard while migrating: the previous literal stays available for
// quick comparison but is never rendered or used as a factual source.
void legacyProjects;

const highlightedProject = projectById["sonous-acoustic-drone-sensing"];
const highlightStageCopy = [
  ["01 / Field demo", "Echo outdoors"],
  ["02 / Enclosure", "Node enclosure"],
  ["03 / Companion displays", "Dashboard across devices"],
  ["04 / Internal layout", "Inside an Echo node"],
  ["05 / Dashboard", "Operator interface in motion"],
] as const;

export const projectHighlight = {
  status: "Project highlight / In progress",
  title: highlightedProject.title,
  summary: highlightedProject.cardSummary,
  stages: highlightedProject.images.map((media, index) => ({
    label: highlightStageCopy[index]?.[0] ?? `${String(index + 1).padStart(2, "0")} / Media`,
    title: highlightStageCopy[index]?.[1] ?? media.alt,
    description: media.caption ?? media.alt,
    media: {
      ...media,
      kind: media.kind ?? "image",
    },
  })),
};

export const contact = {
  heading: "Let’s build something useful.",
  summary:
    "I’m open to co-op roles, design teams, and technical projects where I can contribute to real hardware and keep growing toward mechatronics.",
  links: [
    {
      label: "Email",
      display: "chonda@student.ubc.ca",
      href: "mailto:chonda@student.ubc.ca",
    },
    {
      label: "LinkedIn",
      display: "chiunehonda",
      href: "https://www.linkedin.com/in/chiunehonda/",
    },
    {
      label: "GitHub",
      display: "chiunehonda",
      href: "https://github.com/chiunehonda",
    },
  ],
} as const;
