import { access, copyFile, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, extname, relative, resolve, sep } from "node:path";

const root = process.cwd();
const projectsDir = resolve(root, "projects");
const outputDir = resolve(root, "public", "projects");
const generatedFile = resolve(root, "app", "generated", "projects.ts");
const requiredFields = ["title", "slug", "description", "order", "cover"];
const allowedImageExtensions = new Set([".webp", ".avif", ".png", ".jpg", ".jpeg", ".svg"]);

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function warn(folder, message) {
  console.warn(`⚠ projects/${folder}: ${message}`);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function safeRelativePath(value) {
  if (!isNonEmptyString(value)) return null;
  const normalized = value.replaceAll("\\", "/").replace(/^\.\//, "");
  if (normalized.startsWith("/") || normalized.split("/").includes("..")) return null;
  return normalized;
}

function optionalString(value) {
  return isNonEmptyString(value) ? value.trim() : undefined;
}

function stringList(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter(isNonEmptyString).map((item) => item.trim()))];
}

function validExternalUrl(value, field, folder) {
  if (!isNonEmptyString(value)) return undefined;
  try {
    const url = new URL(value);
    if (!new Set(["http:", "https:"]).has(url.protocol)) throw new Error("unsupported protocol");
    return url.toString();
  } catch {
    warn(folder, `поле «${field}» содержит некорректную ссылку и будет проигнорировано`);
    return undefined;
  }
}

async function copyAsset(folderPath, folderName, slug, value, field) {
  const path = safeRelativePath(value);
  if (!path) {
    warn(folderName, `поле «${field}» содержит небезопасный или пустой путь`);
    return null;
  }
  if (!allowedImageExtensions.has(extname(path).toLowerCase())) {
    warn(folderName, `файл «${path}» имеет неподдерживаемый формат`);
    return null;
  }

  const source = resolve(folderPath, path);
  const insideFolder = relative(folderPath, source);
  if (insideFolder.startsWith(`..${sep}`) || insideFolder === "..") {
    warn(folderName, `файл «${path}» находится вне папки проекта`);
    return null;
  }
  if (!(await exists(source))) {
    warn(folderName, `файл «${path}» из поля «${field}» не найден — будет показан fallback`);
    return null;
  }

  const destination = resolve(outputDir, slug, path);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(source, destination);
  return `projects/${slug}/${path}`;
}

await mkdir(projectsDir, { recursive: true });
await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await mkdir(dirname(generatedFile), { recursive: true });

const entries = await readdir(projectsDir, { withFileTypes: true });
const folders = entries.filter((entry) => entry.isDirectory() && !entry.name.startsWith(".")).sort((a, b) => a.name.localeCompare(b.name));
const projects = [];
const slugs = new Set();

for (const folder of folders) {
  const folderPath = resolve(projectsDir, folder.name);
  const jsonPath = resolve(folderPath, "project.json");
  if (!(await exists(jsonPath))) {
    warn(folder.name, "нет файла project.json — папка пропущена");
    continue;
  }

  let source;
  try {
    source = JSON.parse((await readFile(jsonPath, "utf8")).replace(/^\uFEFF/, ""));
  } catch (error) {
    warn(folder.name, `не удалось прочитать project.json (${error instanceof Error ? error.message : "неизвестная ошибка"}) — проект пропущен`);
    continue;
  }

  const missing = requiredFields.filter((field) => source[field] === undefined || source[field] === null || source[field] === "");
  if (missing.length) {
    warn(folder.name, `отсутствуют обязательные поля: ${missing.join(", ")} — проект пропущен`);
    continue;
  }
  if (!isNonEmptyString(source.title) || !isNonEmptyString(source.slug) || !isNonEmptyString(source.description)) {
    warn(folder.name, "title, slug и description должны быть непустыми строками — проект пропущен");
    continue;
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(source.slug)) {
    warn(folder.name, "slug должен содержать только строчные латинские буквы, цифры и дефисы — проект пропущен");
    continue;
  }
  if (slugs.has(source.slug)) {
    warn(folder.name, `slug «${source.slug}» уже используется — проект пропущен`);
    continue;
  }
  if (!Number.isFinite(source.order)) {
    warn(folder.name, "order должен быть числом — проект пропущен");
    continue;
  }
  const categories = stringList(source.categories);
  const year = source.year === undefined || source.year === null ? undefined : optionalString(String(source.year));

  slugs.add(source.slug);
  const cover = await copyAsset(folderPath, folder.name, source.slug, source.cover, "cover");
  const preview = source.preview ? await copyAsset(folderPath, folder.name, source.slug, source.preview, "preview") : null;
  const gallery = [];
  for (const [index, item] of stringList(source.gallery).entries()) {
    const copied = await copyAsset(folderPath, folder.name, source.slug, item, `gallery[${index}]`);
    if (copied) gallery.push(copied);
  }

  const website = validExternalUrl(source.website, "website", folder.name);
  const github = validExternalUrl(source.github, "github", folder.name);

  projects.push({
    title: source.title.trim(),
    slug: source.slug,
    description: source.description.trim(),
    ...(optionalString(source.longDescription) ? { longDescription: source.longDescription.trim() } : {}),
    ...(year ? { year } : {}),
    order: source.order,
    featured: source.featured === true,
    hidden: source.hidden === true,
    ...(optionalString(source.status) ? { status: source.status.trim() } : {}),
    categories,
    technologies: stringList(source.technologies),
    cover,
    preview,
    gallery,
    ...(website ? { website } : {}),
    ...(github ? { github } : {}),
    color: /^#[0-9a-f]{6}$/i.test(source.color) ? source.color : "#FF1838",
  });
}

projects.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, "ru"));

const output = `// Создано автоматически скриптом scripts/sync-projects.mjs.\n// Не редактируйте этот файл вручную.\nimport type { Project } from "../types/project";\n\nexport const projects: Project[] = ${JSON.stringify(projects, null, 2)};\n`;
await writeFile(generatedFile, output, "utf8");

const visibleCount = projects.filter((project) => !project.hidden).length;
console.log(`✓ Синхронизация завершена: ${visibleCount} опубликовано, ${projects.length - visibleCount} скрыто.`);
