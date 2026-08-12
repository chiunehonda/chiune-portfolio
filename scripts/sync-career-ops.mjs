import { access, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { validatePortfolioDatabase } from "./portfolio-schema.mjs";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const defaultCareerOpsRoots = [
  "C:\\Windows\\System32\\career-ops",
  "C:\\Users\\Chiune Honda\\Documents\\career-ops",
];
const careerOpsRoots = process.env.CAREER_OPS_ROOT
  ? [process.env.CAREER_OPS_ROOT]
  : defaultCareerOpsRoots;

async function findPortfolioSource(roots) {
  for (const root of roots) {
    const candidate = resolve(root, "data/portfolio.json");
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try the next known Career-Ops installation.
    }
  }
  throw new Error(`Career-Ops portfolio database not found. Checked: ${roots.join(", ")}`);
}

const sourcePath = await findPortfolioSource(careerOpsRoots);
const outputPath = process.env.PORTFOLIO_DATABASE_OUTPUT || resolve(repoRoot, "website-2/src/data/projects.json");

const database = JSON.parse(await readFile(sourcePath, "utf8"));
validatePortfolioDatabase(database, sourcePath);

const publicDatabase = {
  ...database,
  updatedAt: new Date().toISOString().slice(0, 10),
  projects: database.projects.filter((entry) => entry.public === true),
  experiences: database.experiences.filter((entry) => entry.public === true),
};

await writeFile(outputPath, `${JSON.stringify(publicDatabase, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  status: "synced-from-career-ops",
  source: sourcePath,
  output: outputPath,
  projects: publicDatabase.projects.length,
  experiences: publicDatabase.experiences.length,
}));
