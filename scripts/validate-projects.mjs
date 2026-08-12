import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { validatePortfolioDatabase } from "./portfolio-schema.mjs";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const databasePath = process.env.PORTFOLIO_DATABASE_OUTPUT
  || resolve(repoRoot, "website-2/src/data/projects.json");
const database = JSON.parse(await readFile(databasePath, "utf8"));

validatePortfolioDatabase(database, databasePath);
const experienceLabel = database.experiences.length === 1 ? "experience" : "experiences";
console.log(
  `Validated ${database.projects.length} projects and ${database.experiences.length} ${experienceLabel} from ${databasePath}`,
);
