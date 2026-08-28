# Nido Águila Riverside

Single-page site for the academy. Plain HTML, CSS, and vanilla JavaScript —
no build step, no dependencies. Hosted on GitHub Pages.

```
index.html            all the markup
css/style.css          styles (theme variables are at the very top)
js/i18n.js             English + Spanish copy and the EN/ES toggle
js/carousel.js         hero image carousel
js/main.js             nav, mobile menu, smooth scroll, scroll animations
assets/logos/          crest logos + social share image
assets/pictures/       hero and section photos
assets/favicon.ico     browser tab icon (generated from the crest)
```

## Editing content

All visible text lives in `js/i18n.js` as one object with `en` and `es`
values, grouped by section (`hero`, `about`, `mission`, …). Change the text
in both languages and it updates everywhere. The markup in `index.html`
only holds `data-i18n="section.key"` hooks, not the words themselves.

The two numbered lists — **The Nido Standard** (6) and **Our Coaching
Standard** (5) — are the `items` arrays inside `standard` and
`coachingStandard`. Keep the array length in sync with the cards in
`index.html` (`data-i18n="standard.items.0.title"` etc.).

Training days/times and the map are in the `locations` block plus the
`<iframe>` and "Get Directions" link in the Training Locations section of
`index.html`.

## Swapping photos

Drop new images into `assets/pictures/` and point the `src` (and `srcset`
for the hero) at them in `index.html`. Photos are referenced by filename.

Currently used:

| Where | File |
|---|---|
| Hero carousel | `0v1a9546.jpg`, `dsc08009.jpg`, `dsc_0457.jpg`, `dsc_0538.jpg`, `dsc_0633.jpg`, `hjn06328.jpg` (each has a `-1024.jpg` smaller copy for phones) |
| Who We Are | `dsc_0513.jpg` |
| Our Mission | `dsc_0603.jpg` |
| Player Development | `dsc_0432.jpg` |
| Competition & Player Projection | `2n0a7606.jpg` |
| Player-Centered Coaching | `dsc_0499.jpg` |
| Community | `dsc_6318.jpg` |
| Our Vision | `dsc_0606.jpg` |
| Final call to action | `dsc_0639.jpg` |

The other files in the folder (`dsc_0394.jpg`, `dsc_0401.jpg`,
`dsc_0487.jpg`, `dsc_0600.jpg`, `dsc_0627.jpg`, `hjn04418.jpg`,
`hjn05391.jpg`, `2n0a7604.jpg`) are spare shots you can rotate in.

The originals were large camera JPEGs; they were resized to ~1600px wide
(1920px for hero) and compressed for the web. If you add a new full-size
photo, shrink it first (a ~300–500 KB JPEG is plenty).

## Colours and fonts

Top of `css/style.css`:

```css
--color-primary: #003c71;   /* navy  */
--color-accent:  #f9e547;   /* gold  */
--color-red:     #e03c31;   /* red   */
--font-heading:  "Manrope", …;
--font-body:     "DM Sans", …;
```

Change those and the whole site reskins. Fonts load from Google Fonts in
`index.html`.

## Contact details to fill in

Placeholders currently in `index.html`:

- Footer email + "Join" links: `info@nidoaguilariverside.com`
- Instagram link: `https://instagram.com/`
- Facebook link: `https://facebook.com/`
- `YOURDOMAIN.com` in the `<link rel="canonical">`, Open Graph tags and
  the JSON-LD block — replace with the real domain once it's set.

## Running locally

Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8000
```

then visit <http://localhost:8000>.
