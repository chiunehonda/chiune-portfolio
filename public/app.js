const projects = [
  {
    title: "SUBC Submarine Drivetrain",
    category: "mechanical",
    categoryLabel: "Mechanical",
    year: "2025–2026",
    image: "assets/subc-gearbox-cad.webp",
    alt: "SolidWorks render of the SUBC submarine drivetrain gearbox",
    summary:
      "Designed and validated sealed drivetrain and gearbox components for UBC’s human-powered submarine.",
    tags: ["SolidWorks", "FEA", "CFD", "Machining"],
    metrics: ["100+ CAD hours", "30+ simulations", "1.8–2.1 kN design loads"],
    problem:
      "The drivetrain needed to transfer rider input through a compact underwater assembly while controlling alignment, mass, structural loading, and manufacturing tolerances.",
    work:
      "Modelled gearbox and housing components, ran static, fatigue, and buckling studies in SolidWorks Simulation, completed flow and pressure analysis, and iterated parts for manual machining and assembly.",
    outcome:
      "Topology-based pocketing and rib changes reduced component weight by 32–45%. Prototype adjustments reached approximately ±0.1–0.2 mm fabrication accuracy while maintaining a factor of safety above 1.2 in predicted load cases.",
    gallery: [
      "assets/subc-gearbox-cad.webp",
      "assets/subc-housing-cad.webp",
      "assets/subc-build.webp",
      "assets/subc-submarine.webp"
    ]
  },
  {
    title: "V6 Engine Assembly",
    category: "mechanical",
    categoryLabel: "Mechanical",
    year: "Personal project · 2025",
    image: "assets/v6-engine.webp",
    alt: "Detailed SolidWorks render of a V6 engine assembly",
    summary:
      "A functional 55+ part SolidWorks assembly with linked piston, crankshaft, camshaft, and valve motion.",
    tags: ["SolidWorks", "Assemblies", "Mechanical mates"],
    metrics: ["55+ parts", "150+ mates", "Functional four-stroke motion"],
    problem:
      "I wanted to move beyond isolated CAD parts and learn how a dense mechanical assembly behaves when geometry, motion, and constraints all interact.",
    work:
      "Modelled the powertrain using lofts, boundaries, ribs, shells, drafts, patterns, and detailed part features. Gear, cam, tangent, concentric, and coincident mates connect the valvetrain and lower engine assembly.",
    outcome:
      "The completed model reproduces four-stroke motion through manual crankshaft rotation and became a practical study in assembly architecture, constraint management, and advanced SolidWorks features.",
    gallery: ["assets/v6-engine.webp", "assets/v6-piston.webp", "assets/v6-rod.webp"]
  },
  {
    title: "Hydroelectric Generator",
    category: "mechatronics",
    categoryLabel: "Mechatronics",
    year: "APSC design project",
    image: "assets/hydro-test.webp",
    alt: "Hydroelectric generator prototype during voltage testing",
    summary:
      "A water-driven turbine and speed-increasing gearbox that powered an LED through a DC motor.",
    tags: ["Gear design", "Circuits", "Prototyping", "Testing"],
    metrics: ["1:5 speed increase", "75T / 15T gears", "Up to 4.7 V"],
    problem:
      "The system had to convert a low-speed water input into enough motor speed and electrical output to visibly power an LED.",
    work:
      "Built the turbine and structure, aligned a 75-tooth driver with a 15-tooth driven gear, and connected the DC motor to an LED and voltmeter for repeated testing.",
    outcome:
      "The final prototype generated up to 4.7 V and demonstrated the complete energy path from water flow to rotational motion, gearing, electrical generation, and circuit output.",
    gallery: [
      "assets/hydro-test.webp",
      "assets/hydro-propeller.webp",
      "assets/portfolio-page-hydro.webp"
    ]
  },
  {
    title: "APSC 101 Study System",
    category: "software",
    categoryLabel: "Software",
    year: "Independent project · 2026",
    visual: "study-guide",
    summary:
      "An original full-course study guide and interactive practice site built to make dense engineering material searchable and testable.",
    tags: ["HTML", "CSS", "JavaScript", "Information design"],
    metrics: ["Modules 5–7", "Live topic search", "Interactive answer reveal"],
    problem:
      "Notes, quizzes, worksheets, and reference files were spread across formats, slowing focused review.",
    work:
      "Combined 87 source files into searchable module notes, collapsible concept cards, formula references, and a practice quiz with hidden answers.",
    outcome:
      "A fast browser-based system for reference and active recall, with no installation or backend required.",
    gallery: ["assets/apsc-study-guide-overview.png", "assets/apsc-practice-quiz.png"],
    links: [
      {
        label: "Visit study guide",
        href: "projects/apsc101-study-guide.html"
      },
      {
        label: "Visit practice quiz",
        href: "projects/apsc101-practice-midterm.html"
      }
    ]
  }
];

const grid = document.querySelector("[data-project-grid]");
const filterButtons = document.querySelectorAll("[data-filter]");
const modal = document.querySelector("[data-modal]");
const modalContent = document.querySelector("[data-modal-content]");
const modalClose = document.querySelector("[data-modal-close]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const header = document.querySelector("[data-header]");

let lastTrigger = null;

function studyGuidePreview() {
  return `
    <span class="project-image-wrap study-gallery-preview">
      <img
        src="assets/apsc-study-guide-overview.png"
        alt="APSC 101 study guide showing module navigation, search, and structured notes"
        loading="lazy"
      />
      <img
        src="assets/apsc-practice-quiz.png"
        alt="APSC 101 practice quiz with an answer revealed"
        loading="lazy"
      />
    </span>
  `;
}

function projectMedia(project) {
  if (project.visual === "study-guide") {
    return studyGuidePreview();
  }

  return `
    <span class="project-image-wrap">
      <img src="${project.image}" alt="${project.alt}" loading="lazy" />
    </span>
  `;
}

function projectCard(project, index, featured = false) {
  return `
    <article class="project-card ${featured ? "project-card-featured" : ""}" data-category="${project.category}">
      <button
        class="project-open"
        type="button"
        data-project-index="${index}"
        aria-label="Open ${project.title} case study"
      >
        <span class="project-visual">
          ${projectMedia(project)}
          <span class="project-visual-label">
            <strong>${project.title}</strong>
            <em>${project.categoryLabel}</em>
          </span>
        </span>
        <span class="project-card-body">
          <span class="project-meta">
            <span>${String(index + 1).padStart(2, "0")} / ${project.categoryLabel}</span>
            <span>${project.year}</span>
          </span>
          <strong class="project-title">${project.title}</strong>
          <span class="project-summary">${project.summary}</span>
          <span class="project-tags">
            ${project.tags.map((tag) => `<em>${tag}</em>`).join("")}
          </span>
          <span class="project-cta">View case study <i aria-hidden="true">↗</i></span>
        </span>
      </button>
    </article>
  `;
}

function renderProjects(filter = "all") {
  const visibleProjects = projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => filter === "all" || project.category === filter);

  grid.innerHTML = visibleProjects
    .map(({ project, index }) =>
      projectCard(project, index, index === 0)
    )
    .join("");

  document.querySelectorAll("[data-project-index]").forEach((button) => {
    button.addEventListener("click", () => {
      lastTrigger = button;
      openProject(Number(button.dataset.projectIndex));
    });
  });
}

function externalLinks(project) {
  if (!project.links?.length) {
    return "";
  }

  return `
    <div class="modal-links">
      ${project.links
        .map(
          (link) => `
            <a href="${link.href}" target="_blank" rel="noreferrer">
              ${link.label} <span aria-hidden="true">↗</span>
            </a>
          `
        )
        .join("")}
    </div>
  `;
}

function projectImages(project) {
  return [...new Set([project.image, ...project.gallery].filter(Boolean))];
}

function modalViewer(project, images) {
  const mainAlt = project.alt || `${project.title} project interface`;

  return `
    <div class="modal-media">
      <div class="modal-stage">
        <img src="${images[0]}" alt="${mainAlt}" data-modal-main />
      </div>
      <div class="modal-thumbnails" aria-label="${project.title} image gallery">
        ${images
          .map(
            (image, imageIndex) => `
              <button
                class="modal-thumbnail ${imageIndex === 0 ? "active" : ""}"
                type="button"
                data-modal-thumb="${image}"
                aria-label="Show ${project.title} image ${imageIndex + 1}"
                aria-pressed="${imageIndex === 0 ? "true" : "false"}"
              >
                <img src="${image}" alt="" />
              </button>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function openProject(index) {
  const project = projects[index];
  const images = projectImages(project);

  modalContent.innerHTML = `
    <div class="modal-layout modal-layout-${project.category}">
      ${modalViewer(project, images)}

      <div class="modal-info">
        <div class="modal-heading">
          <span class="project-meta">${project.year} / ${project.categoryLabel}</span>
          <h2>${project.title}</h2>
          <p>${project.summary}</p>
        </div>

        <div class="modal-metrics">
          ${project.metrics.map((metric) => `<span>${metric}</span>`).join("")}
        </div>

        <div class="modal-sections">
          <section>
            <span>01</span>
            <h3>Problem</h3>
            <p>${project.problem}</p>
          </section>
          <section>
            <span>02</span>
            <h3>Work</h3>
            <p>${project.work}</p>
          </section>
          <section>
            <span>03</span>
            <h3>Result</h3>
            <p>${project.outcome}</p>
          </section>
        </div>

        ${externalLinks(project)}
      </div>
    </div>
  `;

  const mainImage = modalContent.querySelector("[data-modal-main]");
  modalContent.querySelectorAll("[data-modal-thumb]").forEach((button) => {
    button.addEventListener("click", () => {
      mainImage.src = button.dataset.modalThumb;
      modalContent.querySelectorAll("[data-modal-thumb]").forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
    });
  });

  document.body.classList.add("modal-open");
  modal.showModal();
}

function closeModal() {
  modal.close();
  document.body.classList.remove("modal-open");
  lastTrigger?.focus();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    renderProjects(button.dataset.filter);
  });
});

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});
modal.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  lastTrigger?.focus();
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
  header.classList.toggle("scrolled", window.scrollY > 12);
});

renderProjects();
