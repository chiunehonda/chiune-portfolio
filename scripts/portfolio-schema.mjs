const requiredProjectFields = [
  "id",
  "title",
  "category",
  "categoryLabel",
  "timeframe",
  "cardSummary",
  "summary",
  "goal",
  "built",
  "result",
];
const requiredExperienceFields = [
  "id",
  "company",
  "role",
  "location",
  "timeframe",
  "summary",
  "disclosure",
];
const requiredExperienceProjectFields = ["id", "title", "summary"];

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function missingFields(record, fields) {
  return fields.filter((field) => !isNonEmptyString(record?.[field]));
}

function hasValidImage(image) {
  return isNonEmptyString(image?.src)
    && isNonEmptyString(image?.alt)
    && (image?.kind === undefined || image.kind === "image" || image.kind === "video")
    && (image?.kind !== "video" || isNonEmptyString(image?.poster));
}

export function validatePortfolioDatabase(database, source = "portfolio database") {
  if (
    database?.schemaVersion !== 1
    || !Array.isArray(database.projects)
    || !Array.isArray(database.experiences)
  ) {
    throw new Error(`Invalid Career-Ops portfolio schema: ${source}`);
  }

  const ids = [...database.projects, ...database.experiences].map((entry) => entry?.id);
  if (ids.some((id) => !isNonEmptyString(id)) || new Set(ids).size !== ids.length) {
    throw new Error("Every project and experience needs a unique non-empty id");
  }

  for (const project of database.projects.filter((entry) => entry.public === true)) {
    const missing = missingFields(project, requiredProjectFields);
    const invalidImages = !Array.isArray(project.images)
      || project.images.length === 0
      || project.images.some((image) => !hasValidImage(image));
    if (missing.length || invalidImages) {
      throw new Error(
        `Public project ${project.id} is incomplete: ${missing.join(", ") || "images with src and alt"}`,
      );
    }
  }

  for (const experience of database.experiences.filter((entry) => entry.public === true)) {
    const missing = missingFields(experience, requiredExperienceFields);
    const invalidProjects = !Array.isArray(experience.projects)
      || experience.projects.length === 0
      || experience.projects.some((project) => (
        missingFields(project, requiredExperienceProjectFields).length > 0
        || !hasValidImage(project.image)
      ));
    if (missing.length || invalidProjects) {
      throw new Error(
        `Public experience ${experience.id} is incomplete: ${missing.join(", ") || "projects with id, title, summary, and image src/alt"}`,
      );
    }
  }

  return database;
}
