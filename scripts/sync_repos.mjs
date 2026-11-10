#!/usr/bin/env node
/* Refresca data/proyectos.json desde la API de GitHub SIN pisar lo que tú curas.
   Conserva: area, es, en, destacado, nombre, estado (si lo fijaste a mano), live.
   Actualiza por repo: lang (lenguaje principal) y fecha (último push).
   Uso:  node scripts/sync_repos.mjs            (usa GITHUB_TOKEN si existe, para no toparte el rate limit)
   La GitHub Action lo corre solo a diario. */
import { readFile, writeFile } from "node:fs/promises";

const USER = "Mind0T";
const FILE = new URL("../data/proyectos.json", import.meta.url);
const token = process.env.GITHUB_TOKEN;
const headers = { "Accept": "application/vnd.github+json", "User-Agent": "irvingsoriano-sync" };
if (token) headers.Authorization = `Bearer ${token}`;

async function gh(path) {
  const r = await fetch(`https://api.github.com${path}`, { headers });
  if (!r.ok) throw new Error(`${path} → ${r.status}`);
  return r.json();
}

const json = JSON.parse(await readFile(FILE, "utf8"));
let changed = 0;

for (const p of json.proyectos) {
  if (!p.repo) continue;
  try {
    const repo = await gh(`/repos/${USER}/${p.repo}`);
    const fecha = (repo.pushed_at || "").slice(0, 10);
    const lang = repo.language || p.lang;
    if (fecha && fecha !== p.fecha) { p.fecha = fecha; changed++; }
    if (lang && lang !== p.lang) { p.lang = lang; changed++; }
    // descripción de GitHub como respaldo si no tienes texto curado
    if (repo.description && !p.es) { p.es = repo.description; changed++; }
  } catch (e) {
    console.warn("saltado:", p.repo, e.message);
  }
}

json.proyectos.sort((a, b) => (b.destacado - a.destacado) || String(b.fecha).localeCompare(String(a.fecha)));
await writeFile(FILE, JSON.stringify(json, null, 2) + "\n", "utf8");
console.log(`listo · ${changed} campos actualizados`);
