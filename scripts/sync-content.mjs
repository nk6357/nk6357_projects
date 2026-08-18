import { access, copyFile, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const projectsDir = resolve(root, "projects");
const publicDir = resolve(root, "public");
const generatedFile = resolve(root, "app", "generated-content.ts");

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

await mkdir(projectsDir, { recursive: true });
await mkdir(publicDir, { recursive: true });

const fontName = "LEMONMILK-RegularItalic.otf";
let fontFile = null;
if (await exists(resolve(root, fontName))) {
  await copyFile(resolve(root, fontName), resolve(publicDir, fontName));
  fontFile = `./${fontName}`;
} else {
  await rm(resolve(publicDir, fontName), { force: true });
}

const files = await readdir(projectsDir);
const numbers = files
  .map((file) => file.match(/^(\d+)\.txt$/)?.[1])
  .filter(Boolean)
  .map(Number)
  .filter((number, index, all) => all.indexOf(number) === index)
  .sort((a, b) => a - b);

const projects = [];
for (const number of numbers) {
  const titlePath = resolve(projectsDir, `${number}.txt`);
  const linkPath = resolve(projectsDir, `link${number}.txt`);
  if (!(await exists(linkPath))) {
    console.warn(`Проект ${number} пропущен: нет обязательного файла link${number}.txt`);
    continue;
  }
  const title = (await readFile(titlePath, "utf8")).replace(/^\uFEFF/, "").trim();
  const link = (await readFile(linkPath, "utf8")).replace(/^\uFEFF/, "").trim();
  if (!title || !link) {
    console.warn(`Проект ${number} пропущен: название или ссылка пустые`);
    continue;
  }
  const aboutPath = resolve(projectsDir, `about${number}.txt`);
  const about = await exists(aboutPath) ? (await readFile(aboutPath, "utf8")).replace(/^\uFEFF/, "").trim() : undefined;
  projects.push({ number, title, link, ...(about ? { about } : {}) });
}

const output = `// Создано автоматически. Не редактируйте вручную.\nexport const fontFile: string | null = ${JSON.stringify(fontFile)};\nexport const projects: Array<{ number: number; title: string; link: string; about?: string }> = ${JSON.stringify(projects, null, 2)};\n`;
await writeFile(generatedFile, output, "utf8");
console.log(`Готово: проектов — ${projects.length}.`);
