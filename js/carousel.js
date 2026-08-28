/* Hero image carousel: auto-advance, dots, arrows, swipe on touch.
   Pauses on hover, on keyboard focus, and when the tab is hidden. */

(function () {
  var root = document.querySelector("[data-carousel]");
  if (!root) return;

  var slides = Array.prototype.slice.call(root.querySelectorAll(".hero-slide"));
  if (slides.length < 2) return;

  var dotsWrap = root.querySelector("[data-carousel-dots]");
  var prevBtn = root.querySelector("[data-carousel-prev]");
  var nextBtn = root.querySelector("[data-carousel-next]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var index = 0;
  var timer = null;
  var DELAY = 6000;

  var dots = slides.map(function (_, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", "Go to slide " + (i + 1));
    b.addEventListener("click", function () {
      show(i);
      restart();
    });
    dotsWrap.appendChild(b);
    return b;
  });

  function show(next) {
    index = (next + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      slide.classList.toggle("is-active", i === index);
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === index);
      if (i === index) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  }

  function next() {
    show(index + 1);
  }

  function prev() {
    show(index - 1);
  }

  function start() {
    if (reduceMotion || timer) return;
    timer = window.setInterval(next, DELAY);
  }

  function stop() {
    window.clearInterval(timer);
    timer = null;
  }

  function restart() {
    stop();
    start();
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      prev();
      restart();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      next();
      restart();
    });
  }

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", start);

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  var touchX = null;
  root.addEventListener("touchstart", function (e) {
    touchX = e.changedTouches[0].clientX;
  }, { passive: true });

  root.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 45) {
      if (dx < 0) {
        next();
      } else {
        prev();
      }
      restart();
    }
    touchX = null;
  }, { passive: true });

  show(0);
  start();
})();
