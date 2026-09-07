# Nido Águila Riverside

Multi-page site for the academy. Plain HTML, CSS, and vanilla JavaScript —
no build step, no dependencies. Hosted on GitHub Pages.

## Pages

| File | Page |
|---|---|
| `index.html` | Home — hero, intro, "explore" links, leagues, call to action |
| `about.html` | About (Who We Are) |
| `program.html` | Program — Our Mission, The Nido Standard, Player Development |
| `competition.html` | Competition & Player Projection |
| `coaching.html` | Coaching + Our Coaching Standard |
| `community.html` | Community + Our Vision + photo gallery |
| `locations.html` | Training Locations (map) |

Every interior page has a **Back to home** link near the top and a button
at the bottom.

## The "Join" button

Every "Join Nido Águila Riverside" button (nav, hero, footer, home CTA)
opens the Google registration form in a new tab. The URL is set once as
`FORM_URL` at the top of `js/layout.js`; the hero and home-CTA buttons in
`index.html` also carry it directly — update all three spots if the form
link changes.

## How the shared parts work

The header (logo + nav + language toggle) and the footer are the **same on
every page**, so they are built once in `js/layout.js` and inserted into
each page automatically. To change a nav link, the footer, or the social
links, edit `js/layout.js` — not every HTML file.

Each page tells the layout which nav item to highlight with
`<body data-page="about">` (etc.).

```
css/style.css                    styles — theme variables are at the very top
js/layout.js                      shared header + footer, frame-guard, canonical/OG URL fix
js/i18n.js                        English + Spanish copy and the EN/ES toggle
js/carousel.js                    home-page hero carousel
js/gallery.js                     community-page photo albums + carousel
js/main.js                        mobile menu, back-to-top, scroll animations
assets/logos/                     crest + "where we compete" logos, social share image
assets/pictures/                  hero and section photos
assets/pictures/gallery/          one folder per Community photo album (see below)
assets/pictures/gallery-thumbs/   auto-generated small copies for the album grid
assets/pictures/gallery-albums.json  auto-generated list of albums
sitemap.xml, robots.txt          auto-generated for search engines
scripts/build-site.mjs            rebuilds albums, thumbnails, sitemap, robots
.github/workflows/build.yml       runs that script automatically on push
.github/dependabot.yml            keeps the workflow's actions up to date
404.html                          custom "page not found"
assets/favicon.ico                browser tab icon (generated from the crest)
```

## Editing content

All visible text lives in `js/i18n.js` as one object with `en` and `es`
values, grouped by section (`hero`, `about`, `mission`, `standard`,
`leagues`, …). Change the text in both languages and it updates everywhere.
The HTML only holds `data-i18n="section.key"` hooks, not the words.

The two numbered lists — **The Nido Standard** (6) and **Our Coaching
Standard** (5) — are the `items` arrays inside `standard` and
`coachingStandard`.

Training days/times are in the `locations` block; the map itself is the
`<iframe>` in `locations.html`.

## The "Where we compete" logos (home page)

Four logo cards in `index.html` (`.league-row`):

| Logo file | Links to |
|---|---|
| `league-calsouth.png` | https://calsouth.com/ |
| `league-inland.png` | Inland United Instagram |
| `league-mundialito.png` | https://mundialito.net/ |
| `league-america.png` | https://copaclubamerica.com/home |

To change one: replace the file in `assets/logos/` (keep the name) or edit
the `src`/`href` in `index.html`. A logo with a light background can sit on
a plain `.league-card`; one designed on black uses
`class="league-card league-card--dark"` (like Mundialito). Edit the intro
line via `leagues.note` in `js/i18n.js`.

> The current Cal South image is low-resolution and cropped — replace
> `assets/logos/league-calsouth.png` with a clean version when you have one.

## Swapping photos

Drop new images into `assets/pictures/` and point the `src` (and `srcset`
for the hero) at them in the HTML. Photos are referenced by filename.

| Where | File |
|---|---|
| Home hero carousel | `0v1a9546`, `dsc08009`, `dsc_0457`, `dsc_0538`, `dsc_0633`, `hjn06328` (each also has a `-1024.jpg` copy for phones) |
| About | `dsc_0401` (banner), `dsc_0513` (photo) |
| Program | `dsc_0538` (banner), `dsc_0603`, `dsc_0432` |
| Competition | `dsc_0457` (banner), `2n0a7606` |
| Coaching | `dsc_0627` (banner), `dsc_0499` |
| Community | `dsc_0401` (banner), `dsc_6318`, `dsc_0606` |
| Locations | `dsc_0633` (banner) |

Spare shots in the folder: `dsc_0394`, `dsc_0487`, `dsc_0600`, `dsc_0639`,
`hjn04418`, `hjn05391`, `2n0a7604`.

The originals were large camera JPEGs; they were resized (~1600px wide,
1920px for the hero) and compressed for the web. Shrink any new full-size
photo before adding it — a ~300–500 KB JPEG is plenty.

## Community photo albums

The Community page shows one cover tile per album; clicking a tile opens a
full-screen carousel of that album's photos.

Each album is a folder inside `assets/pictures/gallery/` **named
`<Title> <number>`**:

```
assets/pictures/gallery/
  Community 1/            →  tile titled "Community"
  Game with Colorado 2/  →  tile titled "Game with Colorado"
  Fun activity 3/        →  tile titled "Fun activity"
```

The trailing number sets the order and is dropped from the title. Put any
number of photos in a folder (any filenames). The first photo becomes the
tile's cover image.

**To add an album:** create a new folder, e.g. `America vs Dallas 4/`, drop
photos in, and commit. The **Build** GitHub Action rebuilds
`gallery-albums.json` and the thumbnails automatically — no code changes.
(First time only: Settings → Actions → General → Workflow permissions →
"Read and write permissions", so the Action can commit its output back.)

**To remove an album:** delete its folder and commit. The Action drops it
from the manifest and deletes its thumbnails, so it disappears from the
site with nothing left behind.

Not using Actions? Run `node scripts/build-site.mjs` and commit the
result, or edit `assets/pictures/gallery-albums.json` by hand.

Keep album photos web-sized (~1500px, ~300 KB) — they are committed to the
repo as-is.

## Search engines & AI discovery

Built in so the site is found when families search for youth soccer in the
area:

- **`sitemap.xml` + `robots.txt`** — generated by the Build Action using the
  real domain (read from the `CNAME` file GitHub Pages creates when you set a
  custom domain; falls back to the `*.github.io` URL until then).
- **Structured data** on the home page (`index.html`, the `application/ld+json`
  block): a `SportsActivityLocation` with the address, map coordinates,
  training hours, languages, area served (Riverside / Moreno Valley / Inland
  Empire) and social links, plus an `FAQPage`. This is what Google and AI
  assistants read to answer "youth soccer near me". Update it if the address,
  hours, or links change.
- **Visible FAQ** on the home page (`faq` block in `js/i18n.js`) — the answers
  must stay in sync with the FAQ structured data in `index.html`.
- `js/layout.js` rewrites the canonical / Open Graph / JSON-LD URLs to the
  domain the page is actually served from, so they are never wrong.

**When the domain is set:**

1. In GitHub → Settings → Pages, enter the custom domain and tick
   **Enforce HTTPS**. (This writes the `CNAME` file; the Action then
   regenerates `sitemap.xml` / `robots.txt` for it.)
2. Find-and-replace `YOURDOMAIN.com` → your domain in every `.html` file
   (the raw Open Graph tags, for link previews on apps that don't run JS).
3. Verify the site in [Google Search Console](https://search.google.com/search-console)
   and submit `sitemap.xml`. Do the same in [Bing Webmaster Tools](https://www.bing.com/webmasters).
4. Create a free **Google Business Profile** for the academy at the training
   address — this is the biggest single lever for local "near me" results.

## Security

Static site, no backend, no database, no forms on our domain (the Join
button opens a Google Form) — so the attack surface is small. In place:

- A **Content-Security-Policy** meta tag on every page limits what can load
  (own files + Google Fonts + the Google Maps embed only — no inline or
  third-party scripts).
- `Referrer-Policy`, `rel="noopener"` on every external link, a script that
  breaks the page out of any `<iframe>` (clickjacking guard), and language
  input validated before use.
- The Build Action pins its action versions and Dependabot updates them.

**GitHub Pages can't send real HTTP security headers.** For full protection
put the site behind **Cloudflare (free plan)**:

1. Add the domain to Cloudflare and point GoDaddy's nameservers at it.
2. SSL/TLS → **Full (strict)**; enable **Always Use HTTPS** and **HSTS**.
3. Security → **Bot Fight Mode** on; the free **WAF managed ruleset** on.
4. Rules → Transform Rules → add response headers:
   `X-Content-Type-Options: nosniff`,
   `X-Frame-Options: DENY`,
   `Permissions-Policy: geolocation=(), microphone=(), camera=()`.

Also turn on GitHub → Settings → Code security → **Dependabot alerts** and
**secret scanning**.

## Colours and fonts

Top of `css/style.css`:

```css
--color-primary: #003c71;   /* navy  */
--color-accent:  #f9e547;   /* gold  */
--color-red:     #e03c31;   /* red   */
--font-heading:  "Manrope", …;
--font-body:     "DM Sans", …;
```

Change those and the whole site reskins. Fonts load from Google Fonts.

## Contact details

- Footer email link: `info@nidoaguilariverside.com` (in `js/layout.js`) —
  change if the academy uses a different address.
- Footer socials point at the real Nido Águila Riverside Facebook and
  Instagram (in `js/layout.js`).
- `YOURDOMAIN.com` in the `.html` files is fixed automatically at runtime
  for the live site; still do the find-and-replace once the domain is set
  (see "Search engines & AI discovery" above).

## Running locally

Because the site uses JavaScript includes, open it through a local server
rather than double-clicking the file:

```
python -m http.server 8000
```

then visit <http://localhost:8000>.
