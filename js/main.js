/* Navigation, mobile menu, sticky-header state, scroll-spy and the
   fade-in that runs as each section comes into view. */

(function () {
  var header = document.querySelector("[data-header]");
  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector("[data-menu-toggle]");
  var backdrop = document.querySelector(".nav-backdrop");
  var navLinks = Array.prototype.slice.call(nav.querySelectorAll('ul a[href^="#"]'));
  var closeOnClick = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  var toTop = document.querySelector("[data-to-top]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* current year in the footer */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---- mobile menu ---- */
  function openMenu() {
    nav.classList.add("is-open");
    document.body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    if (window.NidoI18n) {
      toggle.setAttribute("aria-label", lookupMenuLabel("close"));
    }
  }

  function closeMenu() {
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    if (window.NidoI18n) {
      toggle.setAttribute("aria-label", lookupMenuLabel("open"));
    }
  }

  function lookupMenuLabel(which) {
    try {
      return window.NidoI18n.data[window.NidoI18n.get()].menu[which];
    } catch (e) {
      return which === "close" ? "Close menu" : "Open menu";
    }
  }

  function toggleMenu() {
    if (nav.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (toggle) toggle.addEventListener("click", toggleMenu);
  if (backdrop) backdrop.addEventListener("click", closeMenu);

  closeOnClick.forEach(function (link) {
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

  /* keep the toggle label in sync when the language changes */
  document.addEventListener("languagechange", function () {
    var open = nav.classList.contains("is-open");
    toggle.setAttribute("aria-label", lookupMenuLabel(open ? "close" : "open"));
  });

  /* ---- sticky header shadow + scroll-spy ---- */
  var allSections = Array.prototype.slice.call(document.querySelectorAll("main > section[id]"));
  var linkHrefs = navLinks.map(function (l) { return l.getAttribute("href"); });
  var ticking = false;

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 700);

    var line = window.scrollY + 130;
    var currentId = null;
    allSections.forEach(function (sec) {
      if (sec.getBoundingClientRect().top + window.scrollY <= line) currentId = sec.id;
    });
    var target = currentId ? "#" + currentId : null;
    var matched = linkHrefs.indexOf(target) !== -1;
    navLinks.forEach(function (link) {
      link.classList.toggle("is-active", matched && link.getAttribute("href") === target);
    });
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
  window.addEventListener("resize", requestScroll);

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---- fade sections in as they scroll into view ----
     Only elements that start below the fold are primed, so content is never
     hidden on load. Two safety nets make sure nothing can stay invisible. */
  var revealTargets = Array.prototype.slice.call(
    document.querySelectorAll(".split, .section-head, .card-grid, .callout, .band-content, .map-frame")
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

    var reveal = new IntersectionObserver(
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
      reveal.observe(el);
    });

    window.setTimeout(revealAll, 1800);
    window.addEventListener("load", function () {
      window.setTimeout(revealAll, 300);
    });
  }
})();
