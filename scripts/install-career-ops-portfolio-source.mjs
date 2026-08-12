import { copyFile, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const careerOpsRoot = process.env.CAREER_OPS_ROOT || "C:\\Users\\Chiune Honda\\Documents\\career-ops";
const seed = resolve(repoRoot, "website-2/src/data/projects.json");
const catalog = resolve(careerOpsRoot, "data/portfolio.json");
await copyFile(seed, catalog);

const digestPath = resolve(careerOpsRoot, "article-digest.md");
let digest = await readFile(digestPath, "utf8");
digest = digest
  .replace("# Portfolio Project Evidence", "# Article Digest — Career Evidence")
  .replace(/<!-- GENERATED:.*?-->\r?\n<!-- Source:.*?-->\r?\n<!-- Database updated:.*?-->\r?\n\r?\n/, "")
  .replace("Use these verified facts for truthful tailoring. Never present planned or in-progress work as completed.", "Career-Ops is the source of truth for these verified facts. Never present planned or in-progress work as completed.");
await writeFile(digestPath, digest, "utf8");

const customPath = resolve(careerOpsRoot, "modes/_custom.md");
let custom = await readFile(customPath, "utf8");
custom = custom.replace(/\r?\n## Portfolio Database Integration[\s\S]*?(?=\r?\n## |$)/, "");
custom += `\n\n## Portfolio Database Integration\n\n- Career-Ops is the source of truth for projects and experiences. Continue using the built-in \`add\` workflow: after confirmation it updates \`cv.md\` and, for projects, \`article-digest.md\`.\n- After an approved project or experience is added or materially changed, also create or update its record in \`data/portfolio.json\`. Preserve private career evidence in Career-Ops and set \`public: true\` only when the record is approved for the public portfolio.\n- For public projects include: \`id\`, title, category, timeframe, status, summaries, goal, engineering work, result/current state, skills, verified facts, and any approved images or links. For experiences include public company, role, timeframe, summary, subprojects, and disclosure text.\n- Then run \`npm.cmd run sync:career-ops\` from \`${repoRoot}\` to export approved public records into the separate portfolio folder. Never export application tracking, contact data, private notes, or confidential technical details.\n- If a new record lacks enough information for a portfolio case study, keep it in Career-Ops with \`public: false\` until the user supplies and approves the missing public fields.\n`;
await writeFile(customPath, custom, "utf8");

console.log(JSON.stringify({status:"installed", catalog, digest:digestPath, customInstructions:customPath}));
