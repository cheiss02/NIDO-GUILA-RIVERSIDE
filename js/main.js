/* Mobile menu, sticky-header state, back-to-top button and the fade-in
   that runs as each section scrolls into view. The header and footer
   markup is injected by layout.js, which runs first. */

(function () {
  var header = document.querySelector("[data-header]");
  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector("[data-menu-toggle]");
  var backdrop = document.querySelector(".nav-backdrop");
  var toTop = document.querySelector("[data-to-top]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- mobile menu ---- */
  function menuLabel(which) {
    try {
      return window.NidoI18n.data[window.NidoI18n.get()].menu[which];
    } catch (e) {
      return which === "close" ? "Close menu" : "Open menu";
    }
  }

  function openMenu() {
    nav.classList.add("is-open");
    document.body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", menuLabel("close"));
  }

  function closeMenu() {
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", menuLabel("open"));
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }
  if (backdrop) backdrop.addEventListener("click", closeMenu);

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1280) closeMenu();
  });

  document.addEventListener("languagechange", function () {
    var open = nav.classList.contains("is-open");
    toggle.setAttribute("aria-label", menuLabel(open ? "close" : "open"));
  });

  /* ---- sticky-header shadow + back-to-top visibility ---- */
  var ticking = false;

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 700);
  }

  function requestScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      onScroll();
      ticking = false;
    });
  }

  onScroll();
  window.addEventListener("scroll", requestScroll, { passive: true });

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---- smooth scroll for in-page anchors ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });

  /* ---- fade sections in as they scroll into view ----
     Only elements that start below the fold are primed, so content is never
     hidden on load. Two safety nets guarantee nothing stays invisible. */
  var revealTargets = Array.prototype.slice.call(
    document.querySelectorAll(
      ".split, .section-head, .card-grid, .callout, .band-content, .map-frame, .league-row, .explore-grid, .home-intro-inner"
    )
  );

  function revealAll() {
    revealTargets.forEach(function (el) {
      el.classList.add("is-revealed");
    });
  }

  if ("IntersectionObserver" in window) {
    var primed = revealTargets.filter(function (el) {
      return el.getBoundingClientRect().top > window.innerHeight * 0.85;
    });
    primed.forEach(function (el) {
      el.classList.add("will-reveal");
    });

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    primed.forEach(function (el) {
      observer.observe(el);
    });

    window.setTimeout(revealAll, 1800);
    window.addEventListener("load", function () {
      window.setTimeout(revealAll, 300);
    });
  }
})();
