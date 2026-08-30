/* ==========================================================
   TD GARDENS RESORT — site behaviour
   ========================================================== */
(function () {
  "use strict";

  /* ---- header scroll state ---- */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- mobile nav toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- reveal-on-scroll ---- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- footer year ---- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- minimum date on date fields ---- */
  var today = new Date().toISOString().split("T")[0];
  document.querySelectorAll('input[type="date"]').forEach(function (input) {
    input.setAttribute("min", today);
  });

  /* ==========================================================
     FORM HANDLING — table & event enquiries

     Static site, no server of its own — pick ONE option below.
     Full instructions are in README.md.

     OPTION A — Netlify Forms: deploy this folder to Netlify.
     Every <form> already has data-netlify="true" plus a hidden
     "form-name" field, so no code change is needed.

     OPTION B — Formspree: create a form at https://formspree.io,
     paste your endpoint below, and set USE_FORMSPREE to true.
     ========================================================== */
  var USE_FORMSPREE = false;
  var FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id"; // <-- replace after signing up

  document.querySelectorAll("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (evt) {
      var statusEl = form.querySelector(".form-status");
      var submitBtn = form.querySelector('button[type="submit"]');

      var honeypot = form.querySelector('input[name="_gotcha"]');
      if (honeypot && honeypot.value) {
        evt.preventDefault();
        return;
      }

      if (USE_FORMSPREE) {
        evt.preventDefault();
        if (submitBtn) submitBtn.disabled = true;
        var data = new FormData(form);
        fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        })
          .then(function (response) {
            if (response.ok) {
              showStatus(statusEl, "success", form.dataset.successMessage || "Thank you — we've received your message and will get back to you shortly.");
              form.reset();
            } else {
              showStatus(statusEl, "error", "Something went wrong sending that. Please call or WhatsApp us directly instead.");
            }
          })
          .catch(function () {
            showStatus(statusEl, "error", "Something went wrong sending that. Please call or WhatsApp us directly instead.");
          })
          .finally(function () {
            if (submitBtn) submitBtn.disabled = false;
          });
      }
      // If USE_FORMSPREE is false and the page is hosted on Netlify,
      // the browser submits the form natively and data-netlify handles it.
    });
  });

  function showStatus(el, type, message) {
    if (!el) return;
    el.textContent = message;
    el.classList.remove("is-success", "is-error");
    el.classList.add(type === "success" ? "is-success" : "is-error");
    el.setAttribute("role", "status");
  }

  /* ==========================================================
     PAY ONLINE — IntaSend (currently PAUSED)

     The "Send a payment" section was removed from contact.html
     for now, so this whole block is inert — it guards on
     #pay-form existing, which it no longer does. Nothing here
     runs or errors. To switch it back on, restore the pay-block
     section in contact.html (see the HTML comment marking where
     it was) and the IntaSend script tag above main.js.

     BEFORE THIS CAN TAKE A REAL PAYMENT:
     1. Create an account at https://intasend.com and complete
        their business verification (KYC) — this is required
        before any live money can move, and only you can do it.
     2. Copy your PUBLISHABLE key from the IntaSend dashboard
        (Settings > API Keys) and paste it in place of
        "REPLACE-WITH-YOUR-PUBLISHABLE-KEY" below.
     3. Leave PAY_LIVE as false and test a payment in sandbox
        mode first. Only set it to true once a real test payment
        has gone through and settled correctly.
     Nothing here ever touches a secret/private key — only the
     publishable key is used, which is safe to have in this
     public, client-side file.
     ========================================================== */
  var PAY_PUBLIC_KEY = "REPLACE-WITH-YOUR-PUBLISHABLE-KEY";
  var PAY_LIVE = false;

  var payForm = document.getElementById("pay-form");
  if (payForm && window.IntaSend) {
    var payAmountInput = document.getElementById("pay-amount");
    var payStatusEl = document.getElementById("pay-status");
    var paySubmitBtn = document.getElementById("pay-submit");

    var intaSend = new window.IntaSend({
      publicAPIKey: PAY_PUBLIC_KEY,
      live: PAY_LIVE,
    })
      .on("COMPLETE", function () {
        showStatus(payStatusEl, "success", "Payment received — thank you! We'll follow up shortly.");
        if (paySubmitBtn) paySubmitBtn.disabled = false;
      })
      .on("FAILED", function () {
        showStatus(payStatusEl, "error", "That payment didn't go through. Please try again, or call/WhatsApp us on 0705 126 101.");
        if (paySubmitBtn) paySubmitBtn.disabled = false;
      })
      .on("IN-PROGRESS", function () {
        showStatus(payStatusEl, "success", "Processing your payment…");
      });

    payForm.addEventListener("submit", function (evt) {
      evt.preventDefault();

      if (PAY_PUBLIC_KEY === "REPLACE-WITH-YOUR-PUBLISHABLE-KEY") {
        showStatus(payStatusEl, "error", "Online payment isn't set up yet — please call or WhatsApp us on 0705 126 101 instead.");
        return;
      }

      var amount = Number(payAmountInput.value);
      if (!amount || amount <= 0) {
        showStatus(payStatusEl, "error", "Please enter an amount greater than zero.");
        return;
      }

      if (paySubmitBtn) paySubmitBtn.disabled = true;
      showStatus(payStatusEl, "success", "Opening secure payment window…");

      intaSend.run({
        amount: amount,
        currency: "KES",
        api_ref: "td-gardens-" + Date.now(),
      });
    });
  }

  /* ==========================================================
     MENU RENDERING — reads MENU_DATA from menu-data.js
     Only runs on menu.html (where #menu-panels exists).
     ========================================================== */
  var panelsRoot = document.getElementById("menu-panels");
  if (panelsRoot && typeof MENU_DATA !== "undefined") {
    var tabs = document.querySelectorAll(".menu-tab");
    var searchInput = document.getElementById("menu-search-input");

    function formatPrice(price) {
      if (price === null || price === undefined) return "ask";
      var n = Number(price);
      if (isNaN(n)) return "ask";
      return n.toLocaleString("en-KE") + "/-";
    }

    function buildDishCard(item) {
      var card = document.createElement("article");
      card.className = "dish-card";
      card.dataset.searchText = item.name.toLowerCase();

      var media = document.createElement("div");
      media.className = "dish-card-media";
      if (typeof item.img === "string") {
        var photo = document.createElement("img");
        photo.src = item.img;
        photo.alt = item.name;
        photo.loading = "lazy";
        photo.onerror = function () {
          /* Wrong filename or wrong case (Linux hosts are
             case-sensitive even though your computer isn't) —
             fall back to the placeholder instead of a broken icon. */
          media.classList.add("is-placeholder");
          media.innerHTML =
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v6M5 3v6a2 2 0 002 2v10M17 3c-1.7 0-3 2-3 5.5S15.3 13 17 13s3-2 3-5.5S18.7 3 17 3zm0 10v9" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>' +
            "<span>Photo coming soon</span>";
          console.warn('[menu] Image failed to load for "' + item.name + '": ' + item.img + " — check the filename and capitalization in assets/img/menu/.");
        };
        media.appendChild(photo);
      } else {
        media.classList.add("is-placeholder");
        media.innerHTML =
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v6M5 3v6a2 2 0 002 2v10M17 3c-1.7 0-3 2-3 5.5S15.3 13 17 13s3-2 3-5.5S18.7 3 17 3zm0 10v9" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>' +
          '<span>Photo coming soon</span>';
      }
      card.appendChild(media);

      var body = document.createElement("div");
      body.className = "dish-card-body";
      var h4 = document.createElement("h4");
      h4.textContent = item.name;
      body.appendChild(h4);
      if (item.desc) {
        var desc = document.createElement("p");
        desc.className = "desc";
        desc.textContent = item.desc;
        body.appendChild(desc);
      }
      var ribbon = document.createElement("span");
      ribbon.className = "ribbon ribbon-sm";
      ribbon.textContent = formatPrice(item.price);
      body.appendChild(ribbon);
      card.appendChild(body);

      return card;
    }

    function renderCategory(key) {
      var groups = MENU_DATA[key] || [];
      var panel = document.createElement("div");
      panel.className = "menu-panel";
      panel.dataset.panel = key;

      /* ---- Pass 1: every item with a photo, from every section in this
         tab, shown together as one grid right at the top — so the foods
         with pictures are always what a visitor sees first. ---- */
      var allFeatured = [];
      groups.forEach(function (group) {
        if (!group || typeof group !== "object" || !Array.isArray(group.items)) return;
        group.items.forEach(function (item) {
          var ok = item && typeof item === "object" && typeof item.name === "string" && item.name.trim().length > 0;
          if (ok && item.img) allFeatured.push(item);
        });
      });

      if (allFeatured.length) {
        var featuredWrap = document.createElement("div");
        featuredWrap.className = "menu-group menu-group-featured";
        var featuredGrid = document.createElement("div");
        featuredGrid.className = "dish-grid";
        allFeatured.forEach(function (item) {
          featuredGrid.appendChild(buildDishCard(item));
        });
        featuredWrap.appendChild(featuredGrid);
        panel.appendChild(featuredWrap);
      }

      /* ---- Pass 2: the normal, grouped list — photo items are left out
         here since they've already appeared in the grid above. ---- */
      groups.forEach(function (group, idx) {
        /* Defensive: skip a malformed group rather than letting one bad
           entry in menu-data.js take down every group after it. */
        if (!group || typeof group !== "object" || !Array.isArray(group.items)) {
          console.warn("[menu] Skipped a malformed group in MENU_DATA." + key + "[" + idx + "] — check menu-data.js for a missing `items` array.", group);
          return;
        }

        var groupEl = document.createElement("div");
        groupEl.className = "menu-group";

        var head = document.createElement("div");
        head.className = "menu-group-head";
        var h3 = document.createElement("h3");
        h3.textContent = group.group || "Untitled section";
        head.appendChild(h3);
        if (group.sub) {
          var sub = document.createElement("span");
          sub.className = "menu-group-sub";
          sub.textContent = group.sub;
          head.appendChild(sub);
        }
        groupEl.appendChild(head);

        if (group.note) {
          var note = document.createElement("p");
          note.className = "menu-group-note";
          note.textContent = group.note;
          groupEl.appendChild(note);
        }

        var validItems = group.items.filter(function (item, i) {
          var ok = item && typeof item === "object" && typeof item.name === "string" && item.name.trim().length > 0;
          if (!ok) console.warn("[menu] Skipped a malformed item in \"" + (group.group || "?") + "\" at position " + i + " — every item needs at least a `name`.", item);
          return ok;
        });

        var plainItems = validItems.filter(function (item) { return !item.img; });

        var rows = document.createElement("div");
        rows.className = "menu-rows";
        plainItems.forEach(function (item) {
          var row = document.createElement("div");
          row.className = "menu-row";
          row.dataset.searchText = item.name.toLowerCase();

          var name = document.createElement("span");
          name.className = "name";
          name.textContent = item.name;

          var ribbon = document.createElement("span");
          ribbon.className = "ribbon ribbon-sm";
          ribbon.textContent = formatPrice(item.price);

          row.appendChild(name);
          row.appendChild(ribbon);
          rows.appendChild(row);
        });
        groupEl.appendChild(rows);
        panel.appendChild(groupEl);
      });

      var empty = document.createElement("p");
      empty.className = "menu-empty";
      empty.textContent = "Nothing on this list matches your search.";
      panel.appendChild(empty);

      return panel;
    }

    /* Tabs and search are wired up FIRST and don't depend on rendering
       having succeeded — so even in the worst case, the page still
       responds instead of looking totally dead. */
    function setActiveTab(key) {
      tabs.forEach(function (tab) {
        tab.classList.toggle("is-active", tab.dataset.tab === key);
      });
      panelsRoot.querySelectorAll(".menu-panel").forEach(function (panel) {
        panel.classList.toggle("is-active", panel.dataset.panel === key);
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        setActiveTab(tab.dataset.tab);
        if (searchInput) {
          searchInput.value = "";
          filterMenu("");
        }
      });
    });

    function filterMenu(query) {
      var q = query.trim().toLowerCase();
      panelsRoot.querySelectorAll(".menu-row, .dish-card").forEach(function (row) {
        var match = !q || row.dataset.searchText.indexOf(q) !== -1;
        row.classList.toggle("is-hidden", !match);
      });
      panelsRoot.querySelectorAll(".menu-group").forEach(function (group) {
        var anyVisible = group.querySelectorAll(".menu-row:not(.is-hidden), .dish-card:not(.is-hidden)").length > 0;
        group.style.display = anyVisible ? "" : "none";
      });
      panelsRoot.querySelectorAll(".menu-panel").forEach(function (panel) {
        if (!panel.classList.contains("is-active")) return;
        var anyVisible = panel.querySelectorAll(".menu-row:not(.is-hidden), .dish-card:not(.is-hidden)").length > 0;
        var emptyEl = panel.querySelector(".menu-empty");
        if (emptyEl) emptyEl.classList.toggle("is-visible", q.length > 0 && !anyVisible);
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        filterMenu(searchInput.value);
      });
    }

    /* Render each category independently: if one category has a data
       problem that still slips through the checks above and throws,
       it's caught here and shown as a clear on-page message instead
       of silently leaving the whole menu page blank. The other
       category keeps working normally. */
    Object.keys(MENU_DATA).forEach(function (key) {
      try {
        panelsRoot.appendChild(renderCategory(key));
      } catch (err) {
        console.error('[menu] Failed to render "' + key + '" — check menu-data.js for a syntax or structure problem near that section.', err);
        var fallback = document.createElement("div");
        fallback.className = "menu-panel";
        fallback.dataset.panel = key;
        var msg = document.createElement("p");
        msg.className = "menu-group-note";
        msg.textContent = "This section couldn't load right now. Please call or WhatsApp us on 0705 126 101 for the full " + key + " list, and we'll get this fixed.";
        fallback.appendChild(msg);
        panelsRoot.appendChild(fallback);
      }
    });

    if (tabs.length) setActiveTab(tabs[0].dataset.tab);
  }
})();
