/* Rebuilds assets/pictures/gallery-albums.json from the folders in
   assets/pictures/gallery/ and generates thumbnails in
   assets/pictures/gallery-thumbs/.

   Each album is a folder named "<Title> <number>" (e.g. "Community 1",
   "America vs Dallas 4") — the number sets the order and is dropped from
   the title shown on the site.

   Run by the "Build gallery" GitHub Action on every push that touches the
   gallery folders. You can also run it locally:  node scripts/build-gallery.mjs
   (thumbnail generation needs ImageMagick's `convert` on your PATH; without
   it the manifest is still written and the site falls back to full images). */

import { readdirSync, statSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, extname } from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const GALLERY = join(ROOT, "assets", "pictures", "gallery");
const THUMBS = join(ROOT, "assets", "pictures", "gallery-thumbs");
const MANIFEST = join(ROOT, "assets", "pictures", "gallery-albums.json");
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const THUMB_MAX = 800;

function isImage(name) {
  return !name.startsWith(".") && IMAGE_EXT.has(extname(name).toLowerCase());
}

function write(albums) {
  const json = JSON.stringify({ generated: new Date().toISOString(), albums }, null, 2) + "\n";
  writeFileSync(MANIFEST, json);
}

if (!existsSync(GALLERY)) {
  write([]);
  console.log("no gallery folder — wrote empty manifest");
  process.exit(0);
}

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

const albums = [];

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
write(albums);
console.log(`wrote ${albums.length} album(s):`, albums.map((a) => `${a.title} (${a.photos.length})`).join(", "));
