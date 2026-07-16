export type ProjectCategory = "mechanical" | "mechatronics" | "software";

export interface PortfolioImage {
  src: string;
  alt: string;
}

export interface PortfolioLink {
  label: string;
  href: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  timeframe: string;
  cardSummary: string;
  summary: string;
  metrics: string[];
  goal: string;
  built: string;
  result: string;
  images: PortfolioImage[];
  links?: PortfolioLink[];
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

export const projects: ProjectCaseStudy[] = [
  {
    id: "subc-drivetrain",
    title: "SUBC Submarine Drivetrain",
    category: "mechanical",
    categoryLabel: "Mechanical",
    timeframe: "2025–2026",
    cardSummary:
      "Sealed drivetrain and gearbox work for UBC’s human-powered submarine.",
    summary:
      "Designed and validated sealed drivetrain and gearbox components for UBC’s human-powered submarine.",
    metrics: ["100+ CAD hours", "30+ simulations", "1.8–2.1 kN design loads"],
    goal:
      "Package a reliable underwater drivetrain inside a tight submarine volume while controlling alignment, sealing, weight, and manufacturing tolerances.",
    built:
      "Built the gearbox and housing in CAD, checked structural and flow cases in simulation, then revised the design around machining and assembly constraints.",
    result:
      "Reduced component mass with pockets and ribs, refined prototype fit to about ±0.1–0.2 mm, and kept simulated safety factors above target loads.",
    images: [
      {
        src: "/media/projects/subc-drivetrain-cad-raw.png",
        alt: "SolidWorks render of the SUBC submarine drivetrain gearbox",
      },
      {
        src: "/media/projects/subc-installed-drivetrain-raw.webp",
        alt: "Physical SUBC drivetrain installed beside the submarine hull",
      },
      {
        src: "/media/projects/subc-built-gearbox-raw.webp",
        alt: "Top view of the machined SUBC bevel gearbox",
      },
      {
        src: "/media/projects/subc-full-hull-raw.webp",
        alt: "SUBC human-powered submarine hull in the workshop",
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
    metrics: ["55+ parts", "150+ mates", "Functional four-stroke motion"],
    goal:
      "Learn how a dense mechanical assembly behaves when geometry, motion, and constraints all interact.",
    built:
      "Modelled 55+ parts and linked the crankshaft, pistons, camshaft, and valves with functional SolidWorks mates.",
    result:
      "Manual crank rotation drives visible four-stroke motion, showing assembly planning, constraint control, and mechanical timing.",
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
    metrics: ["1:5 speed increase", "75T / 15T gears", "Up to 4.7 V"],
    goal:
      "Turn slow water flow into enough motor speed and electrical output to light an LED.",
    built:
      "Built a spoon turbine, 75T-to-15T gear train, DC motor circuit, and test setup.",
    result:
      "Generated up to 4.7 V and demonstrated the full path from water flow to rotation to electrical output.",
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
      "A browser-based study guide and quiz system built from full-course APSC 101 material.",
    summary:
      "An original full-course study guide and interactive practice site built to make dense engineering material searchable and testable.",
    metrics: ["Modules 5–7", "Live topic search", "Interactive answer reveal"],
    goal:
      "Course material was scattered across notes, quizzes, worksheets, and reference files.",
    built:
      "Converted 87 source files into searchable notes, concept cards, formula references, and practice quizzes.",
    result:
      "Created a fast browser-based review system for quick lookup and active recall, with no backend required.",
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

export const experience = {
  company: "StarSolutions",
  role: "Engineer Shadowing / Intern",
  location: "Richmond, BC",
  timeframe: "Aug 2024",
  summary:
    "Re-engineered a USB-SIM card reader for a portable enclosure, completed precision soldering and product testing, and reviewed certification documentation with mechanical and electrical engineers.",
} as const;

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
