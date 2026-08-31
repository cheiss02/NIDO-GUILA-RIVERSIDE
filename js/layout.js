/* Shared header and footer for every page.
   Each page sets <body data-page="…"> so the matching nav link is marked
   current. Runs before i18n.js so the injected markup gets translated. */

(function () {
  var current = document.body.getAttribute("data-page") || "home";

  var navItems = [
    ["index.html", "nav.home", "home"],
    ["about.html", "nav.about", "about"],
    ["program.html", "nav.program", "program"],
    ["competition.html", "nav.competition", "competition"],
    ["coaching.html", "nav.coaching", "coaching"],
    ["community.html", "nav.community", "community"],
    ["locations.html", "nav.locations", "locations"]
  ];

  var navLinks = navItems
    .map(function (item) {
      var aria = item[2] === current ? ' aria-current="page"' : "";
      var cls = item[2] === current ? ' class="is-current"' : "";
      return (
        '<li><a href="' + item[0] + '"' + cls + aria + ' data-i18n="' + item[1] + '">' +
        item[1] +
        "</a></li>"
      );
    })
    .join("");

  var header = document.createElement("header");
  header.className = "site-header";
  header.setAttribute("data-header", "");
  header.innerHTML =
    '<div class="wrap header-inner">' +
      '<a class="brand" href="index.html" aria-label="Nido Águila Riverside — home">' +
        '<img src="assets/logos/nido-riverside-crest.png" alt="" width="46" height="46">' +
        '<span class="brand-text">Nido Águila <strong>Riverside</strong></span>' +
      "</a>" +
      '<nav class="site-nav" id="site-nav" aria-label="Primary">' +
        "<ul>" + navLinks + "</ul>" +
        '<a class="btn btn-primary nav-cta" href="join.html" data-i18n="nav.join">Join Nido Águila Riverside</a>' +
      "</nav>" +
      '<div class="header-tools">' +
        '<div class="lang-switch" role="group" aria-label="Language / Idioma">' +
          '<button type="button" data-lang="en">EN</button>' +
          '<span aria-hidden="true">/</span>' +
          '<button type="button" data-lang="es">ES</button>' +
        "</div>" +
        '<button type="button" class="menu-toggle" data-menu-toggle aria-controls="site-nav" aria-expanded="false" data-i18n-aria-label="menu.open">' +
          '<span class="menu-icon"></span>' +
        "</button>" +
      "</div>" +
    "</div>";

  var backdrop = document.createElement("div");
  backdrop.className = "nav-backdrop";
  backdrop.hidden = true;

  var skip = document.querySelector(".skip-link");
  if (skip) {
    skip.insertAdjacentElement("afterend", header);
  } else {
    document.body.insertBefore(header, document.body.firstChild);
  }
  header.insertAdjacentElement("afterend", backdrop);

  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML =
    '<div class="wrap footer-grid">' +
      '<div class="footer-brand">' +
        '<img src="assets/logos/nido-riverside-crest-light.png" alt="Nido Águila Riverside" width="72" height="72">' +
        '<p data-i18n="footer.tagline"></p>' +
        '<p class="footer-network" data-i18n="footer.network"></p>' +
      "</div>" +
      '<nav class="footer-col" aria-label="Footer">' +
        '<p class="footer-label" data-i18n="footer.nav">Explore</p>' +
        "<ul>" +
          navItems
            .map(function (item) {
              return '<li><a href="' + item[0] + '" data-i18n="' + item[1] + '">' + item[1] + "</a></li>";
            })
            .join("") +
          '<li><a href="join.html" data-i18n="nav.join">Join Nido Águila Riverside</a></li>' +
        "</ul>" +
      "</nav>" +
      '<div class="footer-col">' +
        '<p class="footer-label" data-i18n="footer.follow">Follow</p>' +
        '<ul class="social">' +
          '<li><a href="https://instagram.com/" target="_blank" rel="noopener" aria-label="Instagram">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.05 15.58 2.04 15.2 2.04 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 2.16c-3.14 0-3.51.01-4.75.07-1.15.05-1.77.24-2.19.4-.55.22-.94.47-1.35.88-.41.41-.66.8-.88 1.35-.16.42-.35 1.04-.4 2.19-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.05 1.15.24 1.77.4 2.19.22.55.47.94.88 1.35.41.41.8.66 1.35.88.42.16 1.04.35 2.19.4 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c1.15-.05 1.77-.24 2.19-.4.55-.22.94-.47 1.35-.88.41-.41.66-.8.88-1.35.16-.42.35-1.04.4-2.19.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.05-1.15-.24-1.77-.4-2.19a3.64 3.64 0 0 0-.88-1.35 3.64 3.64 0 0 0-1.35-.88c-.42-.16-1.04-.35-2.19-.4-1.24-.06-1.61-.07-4.75-.07zm0 3.68a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 2.16a3.84 3.84 0 1 0 0 7.68 3.84 3.84 0 0 0 0-7.68zm6.24-.66a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/></svg>' +
          "</a></li>" +
          '<li><a href="https://facebook.com/" target="_blank" rel="noopener" aria-label="Facebook">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V7.05c0-1.03.29-1.73 1.76-1.73z"/></svg>' +
          "</a></li>" +
          '<li><a href="mailto:info@nidoaguilariverside.com" aria-label="Email">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>' +
          "</a></li>" +
        "</ul>" +
        '<a class="footer-contact" href="mailto:info@nidoaguilariverside.com" data-i18n="footer.contact">Contact us</a>' +
      "</div>" +
    "</div>" +
    '<div class="wrap footer-bottom">' +
      "<p>&copy; <span data-year>2026</span> Nido Águila Riverside. <span data-i18n=\"footer.rights\">All rights reserved.</span></p>" +
    "</div>";
  document.body.appendChild(footer);

  var toTop = document.createElement("button");
  toTop.type = "button";
  toTop.className = "to-top";
  toTop.setAttribute("data-to-top", "");
  toTop.setAttribute("aria-label", "Back to top");
  toTop.setAttribute("data-i18n-aria-label", "backToTop");
  toTop.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(toTop);

  var yearEl = footer.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
