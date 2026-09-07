/* Community photo gallery.

   Photos live in folders under  assets/pictures/gallery/ , one folder per
   album. The folder name ends with a number that sets the order, e.g.
   "Community 1", "Game with Colorado 2". The title shown on the page is the
   name without that number.

   The page shows one cover tile per folder; clicking it opens a carousel of
   that folder's photos.

   assets/pictures/gallery-albums.json lists the folders and their photos.
   That file is rebuilt automatically by the "Build gallery" GitHub Action
   whenever a folder is added or changed — so adding an album needs no code
   edits. (It can also be edited by hand.) */

(function () {
  var mount = document.querySelector("[data-gallery-folders]");
  if (!mount) return;

  var MANIFEST = "assets/pictures/gallery-albums.json";
  var GALLERY_DIR = ["assets", "pictures", "gallery"];
  var THUMBS_DIR = ["assets", "pictures", "gallery-thumbs"];

  function txt(key, fallback) {
    try {
      return key.split(".").reduce(function (o, k) { return o[k]; },
        window.NidoI18n.data[window.NidoI18n.get()]);
    } catch (e) {
      return fallback;
    }
  }

  function urlFor(parts) {
    return parts.map(encodeURIComponent).join("/");
  }

  function setState(cls, message) {
    mount.textContent = "";
    var p = document.createElement("p");
    p.className = cls;
    p.textContent = message;
    mount.appendChild(p);
  }

  setState("gallery-loading", txt("community.galleryLoading", "Loading photos…"));

  fetch(MANIFEST, { cache: "no-cache" })
    .then(function (r) {
      if (!r.ok) throw new Error("manifest " + r.status);
      return r.json();
    })
    .then(function (data) {
      var albums = (data && data.albums ? data.albums : []).slice().sort(function (a, b) {
        return (a.order || 0) - (b.order || 0);
      }).filter(function (a) {
        return a.photos && a.photos.length;
      });
      if (!albums.length) {
        setState("gallery-empty", txt("community.galleryEmpty", "Photo albums are on the way."));
        return;
      }
      render(albums);
    })
    .catch(function () {
      setState("gallery-empty", txt("community.galleryEmpty", "Photo albums are on the way."));
    });

  var viewer = null;

  function render(albums) {
    mount.innerHTML = "";
    var grid = document.createElement("div");
    grid.className = "album-grid";

    albums.forEach(function (album) {
      var photos = album.photos;
      var count = photos.length;
      var word = txt(count === 1 ? "community.photo" : "community.photos", count === 1 ? "photo" : "photos");

      var card = document.createElement("button");
      card.type = "button";
      card.className = "album-card";
      card.setAttribute("aria-label", (album.title || album.folder) + " — " + txt("community.viewAlbum", "View album"));

      var cover = document.createElement("img");
      cover.className = "album-card-cover";
      cover.src = urlFor(THUMBS_DIR.concat([album.folder, photos[0]]));
      cover.alt = "";
      cover.loading = "lazy";
      cover.decoding = "async";
      cover.addEventListener("error", function once() {
        cover.removeEventListener("error", once);
        cover.src = urlFor(GALLERY_DIR.concat([album.folder, photos[0]]));
      });

      var meta = document.createElement("span");
      meta.className = "album-card-meta";
      meta.innerHTML =
        '<span class="album-card-title"></span>' +
        '<span class="album-card-count"></span>';
      meta.querySelector(".album-card-title").textContent = album.title || album.folder;
      meta.querySelector(".album-card-count").textContent = count + " " + word;

      card.appendChild(cover);
      card.appendChild(meta);
      card.addEventListener("click", function () { openAlbum(album); });
      grid.appendChild(card);
    });

    mount.appendChild(grid);
    viewer = buildViewer();
  }

  function openAlbum(album) {
    var slides = album.photos.map(function (photo, i) {
      return {
        full: urlFor(GALLERY_DIR.concat([album.folder, photo])),
        alt: (album.title || "") + " — " + (i + 1)
      };
    });
    viewer.open(slides, 0, album.title || "");
  }

  /* ---------- carousel / lightbox ---------- */
  function buildViewer() {
    var existing = document.querySelector(".lightbox");
    if (existing) existing.remove();

    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Photo viewer");
    box.innerHTML =
      '<button type="button" class="lightbox-close">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
      "</button>" +
      '<button type="button" class="lightbox-nav lightbox-prev">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>' +
      "</button>" +
      '<figure class="lightbox-figure"><img alt=""><figcaption></figcaption></figure>' +
      '<button type="button" class="lightbox-nav lightbox-next">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>' +
      "</button>";
    document.body.appendChild(box);

    var img = box.querySelector("img");
    var caption = box.querySelector("figcaption");
    var closeBtn = box.querySelector(".lightbox-close");
    var prevBtn = box.querySelector(".lightbox-prev");
    var nextBtn = box.querySelector(".lightbox-next");

    var slides = [];
    var index = 0;
    var title = "";
    var lastFocus = null;

    function draw() {
      var s = slides[index];
      img.src = s.full;
      img.alt = s.alt;
      var label = (title ? title + "  ·  " : "") + (index + 1) + " / " + slides.length;
      caption.textContent = label;
    }
    function open(list, start, albumTitle) {
      slides = list;
      index = start || 0;
      title = albumTitle || "";
      lastFocus = document.activeElement;
      draw();
      box.classList.add("is-open");
      document.body.classList.add("lightbox-open");
      closeBtn.focus();
    }
    function close() {
      box.classList.remove("is-open");
      document.body.classList.remove("lightbox-open");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function step(d) {
      index = (index + d + slides.length) % slides.length;
      draw();
    }

    function syncLabels() {
      closeBtn.setAttribute("aria-label", txt("gallery.close", "Close"));
      prevBtn.setAttribute("aria-label", txt("gallery.prev", "Previous photo"));
      nextBtn.setAttribute("aria-label", txt("gallery.next", "Next photo"));
    }
    syncLabels();
    document.addEventListener("languagechange", syncLabels);

    closeBtn.onclick = close;
    prevBtn.onclick = function () { step(-1); };
    nextBtn.onclick = function () { step(1); };
    box.onclick = function (e) {
      if (e.target === box || e.target.classList.contains("lightbox-figure")) close();
    };
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    });

    var touchX = null;
    box.addEventListener("touchstart", function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1);
      touchX = null;
    }, { passive: true });

    return { open: open };
  }
})();
