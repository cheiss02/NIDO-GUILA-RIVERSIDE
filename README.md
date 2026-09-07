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
js/layout.js                      shared header + footer (+ the Join form URL), injected everywhere
js/i18n.js                        English + Spanish copy and the EN/ES toggle
js/carousel.js                    home-page hero carousel
js/gallery.js                     community-page photo albums + lightbox
js/main.js                        mobile menu, back-to-top, scroll animations
assets/logos/                     crest + "where we compete" logos, social share image
assets/pictures/                  hero and section photos
assets/pictures/gallery/          one folder per Community photo album (see below)
assets/pictures/gallery-thumbs/   auto-generated small copies for the album grid
assets/pictures/gallery-albums.json  auto-generated list of albums
scripts/build-gallery.mjs         rebuilds the album list + thumbnails
.github/workflows/build-gallery.yml  runs that script automatically on push
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
photos in, and commit. The **Build gallery** GitHub Action rebuilds
`gallery-albums.json` and the thumbnails automatically — no code changes.
(First time only: Settings → Actions → General → Workflow permissions →
"Read and write permissions", so the Action can commit its output back.)

Not using Actions? Run `node scripts/build-gallery.mjs` and commit the
result, or edit `assets/pictures/gallery-albums.json` by hand.

Keep album photos web-sized (~1500px, ~300 KB) — they are committed to the
repo as-is.

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
- Still to replace: `YOURDOMAIN.com` in the `<link rel="canonical">`,
  Open Graph tags, and JSON-LD block of each `.html` file — swap for the
  real domain once it's set.

## Running locally

Because the site uses JavaScript includes, open it through a local server
rather than double-clicking the file:

```
python -m http.server 8000
```

then visit <http://localhost:8000>.
