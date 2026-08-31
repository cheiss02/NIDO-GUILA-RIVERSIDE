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
| `community.html` | Community + Our Vision |
| `locations.html` | Training Locations (map) |
| `join.html` | Join / tryout contact |

Every interior page has a **Back to home** link near the top and a button
at the bottom.

## How the shared parts work

The header (logo + nav + language toggle) and the footer are the **same on
every page**, so they are built once in `js/layout.js` and inserted into
each page automatically. To change a nav link, the footer, or the social
links, edit `js/layout.js` — not every HTML file.

Each page tells the layout which nav item to highlight with
`<body data-page="about">` (etc.).

```
css/style.css      styles — theme variables are at the very top
js/layout.js        shared header + footer, injected on every page
js/i18n.js          English + Spanish copy and the EN/ES toggle
js/carousel.js      home-page hero carousel
js/main.js          mobile menu, back-to-top, scroll animations
assets/logos/       crest logos + social share image
assets/pictures/    hero and section photos
assets/favicon.ico  browser tab icon (generated from the crest)
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

## The leagues section (home page)

Right now it shows placeholder badges (the academy crest) and a
"to be announced" note. When league placements are confirmed:

1. Drop each league's logo into `assets/logos/` (e.g. `league-ecnl.png`).
2. In `index.html`, replace the `src` / `alt` of each `.league-badge`
   image with the real logo. Add or remove badges as needed.
3. Update `leagues.note` in `js/i18n.js` (both `en` and `es`).

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
| Join | `0v1a9546` (banner) |

Spare shots in the folder: `dsc_0394`, `dsc_0487`, `dsc_0600`, `dsc_0639`,
`hjn04418`, `hjn05391`, `2n0a7604`.

The originals were large camera JPEGs; they were resized (~1600px wide,
1920px for the hero) and compressed for the web. Shrink any new full-size
photo before adding it — a ~300–500 KB JPEG is plenty.

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

## Contact details to fill in

- Footer + Join email links: `info@nidoaguilariverside.com` (in `js/layout.js`
  and `join.html`)
- Instagram / Facebook links: `https://instagram.com/`, `https://facebook.com/`
  (in `js/layout.js`)
- `YOURDOMAIN.com` in the `<link rel="canonical">`, Open Graph tags, and the
  JSON-LD block of each `.html` file — replace with the real domain.

## Running locally

Because the site uses JavaScript includes, open it through a local server
rather than double-clicking the file:

```
python -m http.server 8000
```

then visit <http://localhost:8000>.
