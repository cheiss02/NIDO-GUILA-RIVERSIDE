/* Photo gallery with a click-to-enlarge lightbox.
   Runs only on pages that have a [data-gallery] block. */

(function () {
  var gallery = document.querySelector("[data-gallery]");
  if (!gallery) return;

  var items = Array.prototype.slice.call(gallery.querySelectorAll(".gallery-item"));
  if (!items.length) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function label(key, fallback) {
    try {
      return window.NidoI18n.data[window.NidoI18n.get()].gallery[key];
    } catch (e) {
      return fallback;
    }
  }

  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Photo viewer");
  box.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="Close">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
    "</button>" +
    '<button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous photo">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>' +
    "</button>" +
    '<figure class="lightbox-figure"><img alt=""><figcaption></figcaption></figure>' +
    '<button type="button" class="lightbox-nav lightbox-next" aria-label="Next photo">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>' +
    "</button>";
  document.body.appendChild(box);

  var img = box.querySelector("img");
  var caption = box.querySelector("figcaption");
  var closeBtn = box.querySelector(".lightbox-close");
  var prevBtn = box.querySelector(".lightbox-prev");
  var nextBtn = box.querySelector(".lightbox-next");
  var index = 0;
  var lastFocus = null;

  function render() {
    var trigger = items[index];
    var thumb = trigger.querySelector("img");
    img.src = trigger.getAttribute("data-full");
    img.alt = thumb ? thumb.alt : "";
    caption.textContent = thumb ? thumb.alt : "";
  }

  function open(i) {
    index = i;
    lastFocus = document.activeElement;
    render();
    box.classList.add("is-open");
    document.body.classList.add("lightbox-open");
    closeBtn.focus();
  }

  function close() {
    box.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function step(delta) {
    index = (index + delta + items.length) % items.length;
    render();
  }

  function syncLabels() {
    closeBtn.setAttribute("aria-label", label("close", "Close"));
    prevBtn.setAttribute("aria-label", label("prev", "Previous photo"));
    nextBtn.setAttribute("aria-label", label("next", "Next photo"));
    items.forEach(function (it) {
      it.setAttribute("aria-label", label("open", "Open photo"));
    });
  }

  items.forEach(function (it, i) {
    it.addEventListener("click", function () {
      open(i);
    });
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", function () {
    step(-1);
  });
  nextBtn.addEventListener("click", function () {
    step(1);
  });
  box.addEventListener("click", function (e) {
    if (e.target === box || e.target.classList.contains("lightbox-figure")) close();
  });

  document.addEventListener("keydown", function (e) {
    if (!box.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });

  var touchX = null;
  box.addEventListener("touchstart", function (e) {
    touchX = e.changedTouches[0].clientX;
  }, { passive: true });
  box.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1);
    touchX = null;
  }, { passive: true });

  syncLabels();
  document.addEventListener("languagechange", syncLabels);
  void reduceMotion;
})();
