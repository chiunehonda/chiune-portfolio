const projects = [
  {
    title: "SUBC Submarine Drivetrain",
    category: "mechanical",
    year: "2025-2026",
    image: "assets/subc-gearbox-cad.webp",
    alt: "CAD render of a submarine drivetrain gearbox",
    summary:
      "A compact human-powered submarine drivetrain focused on power transfer, shaft alignment, manufacturability, and reliability underwater.",
    tags: ["SolidWorks", "FEA", "Shaft design", "CNC", "Gearbox"],
    metrics: ["2:1 bevel gear ratio", "6061-T6 aluminum housing", "Tapered roller bearings"],
    challenge:
      "Previous drivetrain concepts used more stages and suffered from gear alignment, loose tolerances, mass, and reliability concerns. The system needed a simpler way to transmit input power to contra-rotating propellers while staying manufacturable.",
    engineering:
      "Developed a bevel gear transmission, reviewed shaft free-body diagrams and fatigue criteria, validated gears through FEA, selected 6061-T6 aluminum for the housing and shafts, and used tapered roller bearings plus Delrin bushings to support shaft alignment.",
    impact:
      "Reduced drivetrain complexity, improved alignment control, lowered the risk of gear skipping, and made the assembly more consistent through precision-machined housing plates and clearer bearing seats.",
    gallery: [
      "assets/subc-gearbox-cad.webp",
      "assets/subc-housing-cad.webp",
      "assets/subc-build.webp",
      "assets/subc-submarine.webp"
    ]
  },
  {
    title: "Hydroelectric Generator",
    category: "mechatronics",
    year: "APSC Build",
    image: "assets/hydro-test.webp",
    alt: "Hydroelectric generator prototype with circuit testing",
    summary:
      "A water-powered turbine and gearbox system designed to spin a DC motor and power an LED.",
    tags: ["Gear ratios", "Circuits", "Prototyping", "Testing"],
    metrics: ["1:5 gear ratio", "75T driver / 15T driven", "Up to 4.7 V measured"],
    challenge:
      "The goal was to convert water flow into enough rotational speed to generate usable voltage from a DC motor and visibly power an LED.",
    engineering:
      "Built a turbine, designed a gear train with a 1:5 speed-increase ratio, connected the motor to an LED and voltmeter, and iterated on alignment so the water-driven turbine could transmit motion efficiently.",
    impact:
      "Produced upward of 4.7 volts and demonstrated the link between torque, gear ratios, mechanical energy transfer, and basic circuit behavior.",
    gallery: [
      "assets/hydro-test.webp",
      "assets/hydro-propeller.webp",
      "assets/portfolio-page-hydro.webp"
    ]
  },
  {
    title: "V6 Engine CAD Model",
    category: "mechanical",
    year: "Independent CAD Project",
    image: "assets/v6-engine.webp",
    alt: "CAD render of a V6 engine model",
    summary:
      "A 55-plus part SolidWorks assembly exploring engine architecture, piston motion, crankshaft mates, and detailed part modeling.",
    tags: ["SolidWorks", "Assemblies", "Mates", "CAD"],
    metrics: ["55+ parts", "Functional piston motion", "Manual crank actuation"],
    challenge:
      "The project was built to learn realistic assembly modeling through a complex mechanical system with linked motion and many interacting parts.",
    engineering:
      "Modeled pistons, rods, crankshaft components, an air filter, and manifold geometry using sketches, shell features, circular patterns, boundary features, and mechanical mates.",
    impact:
      "Built fluency with advanced SolidWorks features and learned how detailed part constraints affect full assembly behavior.",
    gallery: [
      "assets/v6-engine.webp",
      "assets/v6-piston.webp",
      "assets/v6-rod.webp"
    ]
  },
  {
    title: "APSC 101 Study Guide",
    category: "documentation",
    year: "2026",
    image: "assets/portfolio-page-subc.webp",
    alt: "Portfolio page preview used as documentation visual",
    summary:
      "A structured engineering study resource assembled from course notes, quizzes, textbook questions, and module material.",
    tags: ["Technical communication", "Systems thinking", "Learning design"],
    metrics: ["87 source files", "Module notes", "Quiz consolidation"],
    challenge:
      "Large course content can become hard to study from when notes, quiz material, and supplemental files are scattered across formats.",
    engineering:
      "Organized module material, quiz references, textbook questions, and HTML/PDF notes into a navigable study package that made review more direct.",
    impact:
      "Created a practical learning system that shows organization, documentation discipline, and the ability to turn messy information into a usable tool.",
    gallery: ["assets/portfolio-page-subc.webp"]
  },
  {
    title: "StarSolutions Electronics Exposure",
    category: "mechatronics",
    year: "Industry Experience",
    image: "assets/subc-build.webp",
    alt: "Engineering build environment",
    summary:
      "Industry exposure to circuit assembly, soldering, product testing, certification, and practical electrical engineering workflows.",
    tags: ["Soldering", "Circuit assembly", "Testing", "Hardware"],
    metrics: ["SIM reader extension", "Engineer shadowing", "Product testing exposure"],
    challenge:
      "Real hardware work requires electrical decisions to be built, tested, inspected, and documented in a way that survives product requirements.",
    engineering:
      "Assisted with basic circuit assembly and soldering while observing professional workflows around testing, certification, and hardware troubleshooting.",
    impact:
      "Strengthened interest in mechatronics by connecting mechanical design instincts with electronics, embedded systems, and product-level validation.",
    gallery: ["assets/subc-build.webp"]
  }
];

const grid = document.querySelector("[data-project-grid]");
const buttons = document.querySelectorAll("[data-filter]");
const modal = document.querySelector("[data-modal]");
const modalContent = document.querySelector("[data-modal-content]");
const modalClose = document.querySelector("[data-modal-close]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const header = document.querySelector("[data-header]");

function projectCard(project, index) {
  return `
    <article class="project-card" data-project-card data-category="${project.category}">
      <button class="project-open" type="button" data-project-index="${index}" aria-label="Open ${project.title} case study">
        <span class="project-image-wrap">
          <img src="${project.image}" alt="${project.alt}" loading="lazy" />
        </span>
        <span class="project-card-body">
          <span class="project-meta">${project.year} / ${project.category}</span>
          <strong>${project.title}</strong>
          <span>${project.summary}</span>
          <span class="tag-row">
            ${project.tags.slice(0, 3).map((tag) => `<em>${tag}</em>`).join("")}
          </span>
        </span>
      </button>
    </article>
  `;
}

function renderProjects(filter = "all") {
  const visibleProjects = projects
    .map((project, index) => ({ ...project, index }))
    .filter((project) => filter === "all" || project.category === filter);

  grid.innerHTML = visibleProjects.map((project) => projectCard(project, project.index)).join("");

  document.querySelectorAll("[data-project-index]").forEach((button) => {
    button.addEventListener("click", () => openProject(Number(button.dataset.projectIndex)));
  });
}

function openProject(index) {
  const project = projects[index];
  modalContent.innerHTML = `
    <div class="modal-hero">
      <div>
        <span class="project-meta">${project.year} / ${project.category}</span>
        <h2>${project.title}</h2>
        <p>${project.summary}</p>
      </div>
      <img src="${project.image}" alt="${project.alt}" />
    </div>

    <div class="modal-metrics">
      ${project.metrics.map((metric) => `<span>${metric}</span>`).join("")}
    </div>

    <div class="modal-sections">
      <section>
        <h3>Problem</h3>
        <p>${project.challenge}</p>
      </section>
      <section>
        <h3>Engineering</h3>
        <p>${project.engineering}</p>
      </section>
      <section>
        <h3>Impact</h3>
        <p>${project.impact}</p>
      </section>
    </div>

    <div class="modal-gallery">
      ${project.gallery
        .map((image) => `<img src="${image}" alt="${project.title} supporting visual" loading="lazy" />`)
        .join("")}
    </div>
  `;
  modal.showModal();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});

modalClose.addEventListener("click", () => modal.close());
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.close();
  }
});

menuButton.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 16);
});

renderProjects();
