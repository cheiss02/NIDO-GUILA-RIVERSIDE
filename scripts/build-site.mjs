/* Regenerates the parts of the site that are derived from its contents:

   1. assets/pictures/gallery-albums.json  — the Community photo albums,
      one per folder in assets/pictures/gallery/ named "<Title> <number>".
   2. assets/pictures/gallery-thumbs/       — small copies for the album grid.
   3. sitemap.xml and robots.txt            — from the .html pages in the repo
      root and the site URL (CNAME file, or the SITE_URL env var).

   Run by the "Build" GitHub Action; also runs locally:
     node scripts/build-site.mjs
   (thumbnails need ImageMagick's `convert`; sitemap needs a known site URL —
   set one with  SITE_URL=https://example.com/  or a CNAME file.) */

import { readdirSync, statSync, existsSync, mkdirSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { join, extname } from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const GALLERY = join(ROOT, "assets", "pictures", "gallery");
const THUMBS = join(ROOT, "assets", "pictures", "gallery-thumbs");
const MANIFEST = join(ROOT, "assets", "pictures", "gallery-albums.json");
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const THUMB_MAX = 800;

/* -------------------------------------------------------------- gallery --- */

function isImage(name) {
  return !name.startsWith(".") && IMAGE_EXT.has(extname(name).toLowerCase());
}

function writeManifest(albums) {
  writeFileSync(MANIFEST, JSON.stringify({ generated: new Date().toISOString(), albums }, null, 2) + "\n");
}

let albums = [];

if (!existsSync(GALLERY)) {
  writeManifest([]);
  console.log("no gallery folder — wrote empty manifest");
} else {
  let magick = true;
  try {
    execFileSync("convert", ["-version"], { stdio: "ignore" });
  } catch {
    magick = false;
    console.warn("ImageMagick `convert` not found — skipping thumbnails");
  }

  const folders = readdirSync(GALLERY).filter(
    (name) => !name.startsWith(".") && statSync(join(GALLERY, name)).isDirectory()
  );

  for (const folder of folders) {
    const match = folder.match(/^(.+?)\s+(\d+)\s*$/);
    if (!match) {
      console.warn(`skip "${folder}" — folder name must end with a number, e.g. "${folder} 4"`);
      continue;
    }
    const title = match[1].trim();
    const order = parseInt(match[2], 10);

    const photos = readdirSync(join(GALLERY, folder))
      .filter(isImage)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));

    if (!photos.length) {
      console.warn(`skip "${folder}" — no images`);
      continue;
    }

    if (magick) {
      const thumbDir = join(THUMBS, folder);
      mkdirSync(thumbDir, { recursive: true });
      for (const photo of photos) {
        const src = join(GALLERY, folder, photo);
        const dst = join(thumbDir, photo);
        if (existsSync(dst) && statSync(dst).mtimeMs >= statSync(src).mtimeMs) continue;
        try {
          execFileSync("convert", [
            src, "-auto-orient", "-strip",
            "-resize", `${THUMB_MAX}x${THUMB_MAX}>`,
            "-quality", "72", "-interlace", "Plane", dst,
          ], { stdio: "ignore" });
        } catch (e) {
          console.warn(`thumbnail failed for ${folder}/${photo}: ${e.message}`);
        }
      }
    }

    albums.push({ title, order, folder, photos });
  }

  albums.sort((a, b) => a.order - b.order);
  writeManifest(albums);

  /* Drop thumbnails for folders or photos that no longer exist, so removing an
     album folder from the repo also removes it from the site with no leftovers. */
  if (existsSync(THUMBS)) {
    const keepPhotos = new Map(albums.map((a) => [a.folder, new Set(a.photos)]));
    for (const name of readdirSync(THUMBS)) {
      const dir = join(THUMBS, name);
      if (!statSync(dir).isDirectory()) continue;
      if (!keepPhotos.has(name)) {
        rmSync(dir, { recursive: true, force: true });
        console.log(`pruned thumbnails for removed album "${name}"`);
        continue;
      }
      const keep = keepPhotos.get(name);
      for (const file of readdirSync(dir)) {
        if (!keep.has(file)) {
          rmSync(join(dir, file), { force: true });
          console.log(`pruned stale thumbnail ${name}/${file}`);
        }
      }
    }
  }

  console.log(`wrote ${albums.length} album(s):`, albums.map((a) => `${a.title} (${a.photos.length})`).join(", "));
}

/* ---------------------------------------------------- sitemap + robots --- */

function siteUrl() {
  let base = (process.env.SITE_URL || "").trim();
  if (!base && existsSync(join(ROOT, "CNAME"))) {
    base = "https://" + readFileSync(join(ROOT, "CNAME"), "utf8").trim() + "/";
  }
  if (!base) return null;
  if (!/^https?:\/\//.test(base)) base = "https://" + base;
  if (!base.endsWith("/")) base += "/";
  return base;
}

const base = siteUrl();

if (!base) {
  console.warn("no site URL (CNAME / SITE_URL) — skipped sitemap.xml and robots.txt");
} else {
  const pages = readdirSync(ROOT)
    .filter((f) => f.endsWith(".html") && f !== "404.html")
    .sort();

  const today = new Date().toISOString().slice(0, 10);
  const urls = pages.map((f) => {
    const loc = f === "index.html" ? base : base + f;
    const priority = f === "index.html" ? "1.0" : "0.8";
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  });

  writeFileSync(
    join(ROOT, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`
  );
  writeFileSync(
    join(ROOT, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${base}sitemap.xml\n`
  );
  console.log(`wrote sitemap.xml (${pages.length} pages) and robots.txt for ${base}`);
}
