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
    goal:
      "Package a reliable underwater drivetrain within the submarine’s tight volume while managing alignment, sealing, manufacturing tolerances, and design loads of 1.8–2.1 kN.",
    built:
      "Spent 100+ hours modelling the gearbox and housing, then ran 30+ structural and flow simulations before revising the design for machining and assembly.",
    result:
      "Reduced mass with pockets and ribs, refined prototype fit to approximately ±0.1–0.2 mm, and maintained simulated safety factors above the design target.",
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

export const projectHighlight = {
  status: "Project highlight / In progress",
  title: "SO-101 Robot Arm",
  summary:
    "Building the SO-101 as a hands-on robotics platform, then redesigning its printed structure around measured loads, repeatable motion, and simulation.",
  stages: [
    {
      label: "01 / Concept",
      title: "System baseline",
      description:
        "Assemble and program the SO-101 before changing its mechanical design.",
      visual: "arm",
    },
    {
      label: "02 / Redesign",
      title: "Joint development",
      description:
        "Use measured behavior and motor loads to guide stronger printed joints.",
      visual: "joint",
    },
    {
      label: "03 / Validation",
      title: "Test, simulate, repeat",
      description:
        "Compare bench observations, ANSYS load cases, and the next printed iteration.",
      visual: "validation",
    },
  ],
} as const;

export const experience = {
  company: "StarSolutions",
  role: "Mechanical / Electrical Engineering Intern",
  location: "Richmond, BC",
  timeframe: "Current",
  summary:
    "Supporting active RF hardware development through mechanical design, electrical documentation, and component research.",
  projects: [
    {
      id: "rf-adapter",
      title: "NEX10-to-SMA Adapter",
      summary:
        "Developing a chassis-mounted RF connector interface in SolidWorks, translating engineer-reviewed integration requirements into an assembly and manufacturing drawing.",
      visual: "adapter",
    },
    {
      id: "chassis-documentation",
      title: "5G Chassis Integration Diagram",
      summary:
        "Created a cable and block diagram that translates mechanical packaging and electrical interfaces into clear build documentation for an ongoing chassis program.",
      visual: "chassis",
    },
  ],
  disclosure: "Generalized to protect proprietary information.",
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
