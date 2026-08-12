import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = JSON.parse(await readFile(resolve(repoRoot, "website-2/src/data/projects.json"), "utf8"));

function expectSyncFailure(testRoot, output, expectedMessage) {
  try {
    execFileSync(process.execPath, [resolve(repoRoot, "scripts/sync-career-ops.mjs")], {
      env: {...process.env, CAREER_OPS_ROOT:testRoot, PORTFOLIO_DATABASE_OUTPUT:output},
      stdio:"pipe",
    });
  } catch (error) {
    const failureOutput = `${error.stdout || ""}\n${error.stderr || ""}`;
    if (!failureOutput.includes(expectedMessage)) throw error;
    return;
  }
  throw new Error(`Invalid database unexpectedly passed validation: ${expectedMessage}`);
}

for (const project of source.projects.filter((entry) => entry.public === true)) {
  project.images = [{src:"/media/test-project.png", alt:"Test project image"}];
}
for (const experience of source.experiences.filter((entry) => entry.public === true)) {
  experience.projects = experience.projects.map((project) => ({
    ...project,
    image: {src:"/media/test-experience.png", alt:"Test experience image"},
  }));
}

source.projects.push({
  ...source.projects[0],
  id:"future-public-project",
  title:"Future Public Project",
  public:true,
  images:[{src:"/media/future-project.png", alt:"Future public project"}],
});
source.projects.push({id:"private-career-project", title:"Private Career Project", public:false});
source.experiences.push({
  id:"future-public-experience",
  company:"Future Employer",
  role:"Engineering Intern",
  location:"Vancouver, BC",
  timeframe:"Summer 2027",
  public:true,
  summary:"Future public experience fixture.",
  disclosure:"Public test disclosure.",
  projects:[{
    id:"future-experience-project",
    title:"Future Experience Project",
    summary:"Public test record.",
    image:{src:"/media/future-experience.png", alt:"Future public experience"},
  }],
});
source.experiences.push({id:"private-career-experience", company:"Private Employer", public:false});

const testRoot = await mkdtemp(resolve(tmpdir(), "career-ops-sync-"));
try {
  await mkdir(resolve(testRoot, "data"));
  const sourcePath = resolve(testRoot, "data/portfolio.json");
  await writeFile(sourcePath, JSON.stringify(source), "utf8");
  const output = resolve(testRoot, "public.json");
  const syncStdout = execFileSync(process.execPath, [resolve(repoRoot, "scripts/sync-career-ops.mjs")], {
    env: {...process.env, CAREER_OPS_ROOT:testRoot, PORTFOLIO_DATABASE_OUTPUT:output},
    stdio:"pipe",
    encoding:"utf8",
  });
  const syncResult = JSON.parse(syncStdout);
  if (syncResult.source !== sourcePath) throw new Error("Sync did not report the overridden Career-Ops source");
  const result = JSON.parse(await readFile(output, "utf8"));
  const ids = [...result.projects, ...result.experiences].map((entry) => entry.id);
  if (!ids.includes("future-public-project") || !ids.includes("future-public-experience")) throw new Error("Public records were not exported");
  if (ids.includes("private-career-project") || ids.includes("private-career-experience")) throw new Error("Private records leaked into public output");

  const invalidProject = structuredClone(source);
  invalidProject.projects.find((entry) => entry.public === true).images = [];
  await writeFile(sourcePath, JSON.stringify(invalidProject), "utf8");
  expectSyncFailure(testRoot, output, "images with src and alt");

  const invalidExperience = structuredClone(source);
  invalidExperience.experiences.find((entry) => entry.public === true).projects[0].image.alt = "";
  await writeFile(sourcePath, JSON.stringify(invalidExperience), "utf8");
  expectSyncFailure(testRoot, output, "projects with id, title, summary, and image src/alt");

  console.log("Career-Ops sync test passed: source override reported, public-only export enforced, and image metadata validated.");
} finally {
  await rm(testRoot, {recursive:true, force:true});
}
