/* NURE ASMIR - shared behaviour: layout, bag, search, favourites, page modules. No dependencies. */
(function () {
  "use strict";
  var NA = window.NA, P = NA.products;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var page = document.body.getAttribute("data-page") || "";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- helpers ---------- */
  function money(n) { return "Rs. " + Number(n).toLocaleString("en-US"); }
  function byId(id) { return P.filter(function (p) { return p.id === id; })[0]; }
  function store(key, val) { try { if (val === undefined) return JSON.parse(localStorage.getItem(key)); localStorage.setItem(key, JSON.stringify(val)); } catch (e) { return null; } }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  var catName = {}; NA.categories.forEach(function (c) { catName[c.id] = c.name; });

  var I = {
    bag: '<path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 5 5"/>',
    menu: '<path d="M3 8h18M3 16h18"/>',
    close: '<path d="M5 5l14 14M19 5 5 19"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>',
    arrow: '<path d="M4 12h16M14 6l6 6-6 6"/>',
    arrowL: '<path d="M20 12H4M10 6l-6 6 6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    truck: '<path d="M2 6h11v10H2zM13 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/>',
    ret: '<path d="M4 9h11a5 5 0 1 1 0 10H8"/><path d="M8 5 4 9l4 4"/>',
    stitch: '<path d="M4 20 20 4M6 14l4 4M12 8l4 4"/>',
    home: '<path d="M4 11 12 4l8 7v9H4z"/>',
    grid: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>'
  };
  function icon(n, cls) { return '<svg class="icon ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true">' + I[n] + "</svg>"; }

  /* ---------- favourites & bag ---------- */
  var favs = store("na-fav") || [];
  var cart = store("na-cart") || [];
  function saveCart() { store("na-cart", cart); paintBadge(); paintDrawer(); }
  function cartCount() { return cart.reduce(function (n, l) { return n + l.qty; }, 0); }
  function cartTotal() { return cart.reduce(function (n, l) { var p = byId(l.id); return n + (p ? p.price * l.qty : 0); }, 0); }
  function addToCart(id, size, colour, qty) {
    var f = cart.filter(function (l) { return l.id === id && l.size === size && l.colour === colour; })[0];
    if (f) f.qty += (qty || 1); else cart.push({ id: id, size: size, colour: colour, qty: qty || 1 });
    saveCart();
  }

  /* ---------- toast ---------- */
  var toastEl, toastT;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("is-on");
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove("is-on"); }, 2600);
  }

  /* ---------- layout ---------- */
  var NAV = [
    { id: "shirts", label: "Shirts", href: "shop.html?cat=shirts" },
    { id: "pants", label: "Pants", href: "shop.html?cat=pants" },
    { id: "shalwar-kameez", label: "Shalwar Kameez", href: "shop.html?cat=shalwar-kameez" },
    { id: "accessories", label: "Accessories", href: "shop.html?cat=accessories" }
  ];
  var qs = new URLSearchParams(location.search);
  var curCat = page === "shop" ? qs.get("cat") : (page === "product" && byId(qs.get("id")) ? byId(qs.get("id")).cat : null);

  function buildLayout() {
    var nav = NAV.map(function (n) { return '<a href="' + n.href + '"' + (curCat === n.id ? ' aria-current="page"' : "") + ">" + n.label + "</a>"; }).join("");
    var head =
      '<a class="skip" href="#main">Skip to content</a>' +
      '<div class="announce">Complimentary delivery above Rs. 15,000<span class="sep"> &nbsp;&middot;&nbsp; </span><a class="more" href="shop.html">Shop the new season</a></div>' +
      '<header class="header" id="header"><div class="container header__bar">' +
        '<div class="header__left">' +
          '<button class="icon-btn menu-btn" data-open="menu" aria-label="Open menu" aria-expanded="false" aria-controls="menu">' + icon("menu") + "</button>" +
          '<nav class="header__nav" aria-label="Primary">' + nav + "</nav>" +
        "</div>" +
        '<a class="header__logo" href="index.html" aria-label="Nure Asmir, home"><b>Nure Asmir</b><small>Men’s Wear</small></a>' +
        '<div class="header__right">' +
          '<button class="icon-btn" data-open="search" aria-label="Search">' + icon("search") + "</button>" +
          '<button class="icon-btn" data-open="drawer" aria-label="Open bag">' + icon("bag") + '<span class="count" data-count>0</span></button>' +
        "</div>" +
      "</div></header>" +
      '<div class="menu" id="menu" data-theme="espresso" aria-hidden="true" role="dialog" aria-label="Menu">' +
        '<div class="menu__top"><b class="blackletter" style="font-size:26px">Nure Asmir</b><button class="icon-btn" data-close aria-label="Close menu">' + icon("close") + "</button></div>" +
        '<nav class="menu__nav" aria-label="Mobile">' +
          NAV.map(function (n, i) { return '<a href="' + n.href + '">' + n.label + "<span>0" + (i + 1) + "</span></a>"; }).join("") +
          '<a href="lookbook.html">Lookbook<span>05</span></a><a href="about.html">Our Story<span>06</span></a><a href="contact.html">Visit Us<span>07</span></a>' +
        "</nav>" +
        '<div class="menu__foot"><p class="tagline">Tradition in a modern form</p><div class="menu__sub"><a href="contact.html">Contact</a><a href="#">Instagram</a><a href="#">Facebook</a></div></div>' +
      "</div>" +
      '<div class="scrim" id="scrim"></div>' +
      '<aside class="drawer" id="drawer" aria-hidden="true" aria-label="Shopping bag"><div class="drawer__head"><h2 class="drawer__title">Your bag</h2><button class="icon-btn" data-close aria-label="Close bag">' + icon("close") + '</button></div><div class="drawer__body" id="drawerBody"></div><div class="drawer__foot" id="drawerFoot"></div></aside>' +
      '<div class="search" id="search" aria-hidden="true" role="dialog" aria-label="Search"><div class="container"><div class="search__bar"><span aria-hidden="true">' + icon("search") + '</span><input id="q" type="search" placeholder="Search shirts, pants, kameez…" autocomplete="off" aria-label="Search products"><button class="icon-btn" data-close aria-label="Close search">' + icon("close") + '</button></div><div class="search__results" id="results"></div></div></div>';
    document.body.insertAdjacentHTML("afterbegin", head);

    var foot =
      '<footer class="footer" data-theme="espresso"><div class="container"><div class="footer__top">' +
        '<div class="footer__brand"><span class="wm">Nure Asmir</span><p>Men’s wear rooted in South Asian craft, cut for the way you live now. Tradition in a modern form.</p><a class="link" href="contact.html">Visit the atelier ' + icon("arrow") + "</a></div>" +
        '<div class="footer__cols">' +
          '<div><h4>Shop</h4><ul>' + NAV.map(function (n) { return '<li><a href="' + n.href + '">' + n.label + "</a></li>"; }).join("") + '<li><a href="shop.html">All products</a></li></ul></div>' +
          '<div><h4>The House</h4><ul><li><a href="about.html">Our Story</a></li><li><a href="lookbook.html">Lookbook</a></li><li><a href="contact.html">Visit Us</a></li></ul></div>' +
          '<div><h4>Help</h4><ul><li><a href="contact.html">Contact</a></li><li><a href="#">Delivery</a></li><li><a href="#">Returns</a></li><li><a href="#">Size guide</a></li></ul></div>' +
        "</div></div>" +
        '<div class="footer__base"><span>&copy; 2026 Nure Asmir. All rights reserved.</span><span>Design preview &middot; sample content and prices</span></div></div>' +
        '<div class="footer__wm" aria-hidden="true"><span>Nure Asmir</span></div></footer>' +
      '<nav class="dock" id="dock" aria-label="Quick"><a href="index.html">' + icon("home") + 'Home</a><a href="shop.html">' + icon("grid") + 'Shop</a><button class="b" data-open="drawer" aria-label="Open bag">' + icon("bag") + 'Bag<span class="count" data-count>0</span></button></nav>';
    document.body.insertAdjacentHTML("beforeend", foot);
  }

  /* ---------- overlays ---------- */
  var openEl = null, lastFocus = null;
  function overlay(id) { return document.getElementById(id); }
  function openOverlay(name) {
    closeOverlay(true);
    var el = overlay(name); if (!el) return;
    lastFocus = document.activeElement;
    el.classList.add("is-open"); el.setAttribute("aria-hidden", "false");
    if (name === "drawer" || name === "menu" || name === "search") { if (name !== "menu") overlay("scrim").classList.add("is-open"); }
    document.body.classList.add("is-locked"); openEl = el;
    $$("[data-open=menu]").forEach(function (b) { b.setAttribute("aria-expanded", name === "menu"); });
    if (name === "search") { setTimeout(function () { overlay("q").focus(); }, 300); renderSearch(""); }
    else { var c = $("[data-close]", el); if (c) setTimeout(function () { c.focus(); }, 50); }
  }
  function closeOverlay(silent) {
    if (!openEl) return;
    openEl.classList.remove("is-open"); openEl.setAttribute("aria-hidden", "true");
    overlay("scrim").classList.remove("is-open"); document.body.classList.remove("is-locked");
    $$("[data-open=menu]").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
    openEl = null; if (!silent && lastFocus) lastFocus.focus();
  }
  function bindOverlays() {
    document.addEventListener("click", function (e) {
      var o = e.target.closest("[data-open]"); if (o) { e.preventDefault(); openOverlay(o.getAttribute("data-open")); return; }
      if (e.target.closest("[data-close]") || e.target.id === "scrim") closeOverlay();
      var a = e.target.closest("#menu a"); if (a) closeOverlay(true);
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeOverlay(); closeLightbox(); } });
    var q = overlay("q"); q.addEventListener("input", function () { renderSearch(q.value); });
    q.addEventListener("keydown", function (e) { if (e.key === "Enter" && q.value.trim()) location.href = "shop.html?q=" + encodeURIComponent(q.value.trim()); });
  }

  function renderSearch(term) {
    var t = term.trim().toLowerCase(), list;
    if (!t) { list = P.filter(function (p) { return p.tag === "New"; }).slice(0, 5); }
    else { list = P.filter(function (p) { return (p.name + " " + p.colour + " " + catName[p.cat]).toLowerCase().indexOf(t) > -1; }).slice(0, 8); }
    var html = '<div class="search__hint">' + (t ? list.length + " result" + (list.length === 1 ? "" : "s") : "New arrivals") + "</div>";
    if (!list.length) html += '<p class="muted">Nothing matched “' + esc(term) + '”. Try “tee”, “cargo” or “leather”.</p>';
    html += list.map(function (p) {
      return '<a class="sr" href="product.html?id=' + p.id + '"><span class="sr__img">' + (p.ph ? '<div class="pph tone-' + p.tone + '"><span class="pph__n" style="font-size:22px;margin:0">N</span></div>' : '<img src="' + p.images[0] + '" alt="" loading="lazy">') + '</span><span><b>' + esc(p.name) + "</b><small>" + catName[p.cat] + " &middot; " + p.colour + '</small></span><span class="price">' + money(p.price) + "</span></a>";
    }).join("");
    overlay("results").innerHTML = html;
  }

  /* ---------- bag drawer ---------- */
  var FREE = 15000;
  function paintBadge() { var n = cartCount(); $$("[data-count]").forEach(function (c) { c.textContent = n; c.classList.toggle("has", n > 0); }); }
  function paintDrawer() {
    var body = overlay("drawerBody"), foot = overlay("drawerFoot"); if (!body) return;
    if (!cart.length) {
      body.innerHTML = '<div class="empty"><p class="h3">Your bag is empty</p><p>Start with something from the new season.</p><a class="btn btn--primary" href="shop.html">Shop now</a></div>'; foot.style.display = "none"; return;
    }
    foot.style.display = "";
    var total = cartTotal(), left = Math.max(0, FREE - total);
    body.innerHTML = '<div class="drawer__free">' + (left ? "You are " + money(left) + " away from complimentary delivery" : "You have unlocked complimentary delivery") + '<div class="meter"><i style="width:' + Math.min(100, total / FREE * 100) + '%"></i></div></div>' +
      cart.map(function (l, i) {
        var p = byId(l.id); if (!p) return "";
        return '<div class="line"><a class="line__img" href="product.html?id=' + p.id + '">' + (p.ph ? '<div class="pph tone-' + p.tone + '"><span class="pph__n" style="font-size:30px;margin:0">N</span></div>' : '<img src="' + p.images[0] + '" alt="' + esc(p.name) + '">') + '</a><div><div class="line__name">' + esc(p.name) + '</div><div class="line__meta">' + esc(l.colour) + " &middot; " + esc(l.size) + " &middot; " + money(p.price) + '</div><div class="line__ctl"><div class="qty"><button data-q="-1" data-i="' + i + '" aria-label="Decrease">' + icon("minus") + '</button><output>' + l.qty + '</output><button data-q="1" data-i="' + i + '" aria-label="Increase">' + icon("plus") + '</button></div><button class="remove" data-rm="' + i + '">Remove</button></div></div></div>';
      }).join("");
    foot.innerHTML = '<div class="drawer__row"><span>Subtotal</span><b style="font-weight:500">' + money(total) + '</b></div><p class="drawer__note">Taxes included. Delivery calculated at checkout.</p><button class="btn btn--primary btn--block" data-checkout>Checkout</button>';
  }
  function bindDrawer() {
    document.addEventListener("click", function (e) {
      var q = e.target.closest("[data-q]"), r = e.target.closest("[data-rm]");
      if (q) { var l = cart[+q.dataset.i]; l.qty += +q.dataset.q; if (l.qty < 1) cart.splice(+q.dataset.i, 1); saveCart(); }
      if (r) { cart.splice(+r.dataset.rm, 1); saveCart(); }
      if (e.target.closest("[data-checkout]")) toast("Design preview: checkout is not connected");
    });
  }

  /* ---------- cards ---------- */
  function placeholder(p, lab) { return '<div class="pph tone-' + p.tone + '"><div class="pph__arch"><span class="pph__n">N</span></div><span class="pph__lab">' + (lab || "Photography to follow") + "</span></div>"; }
  function card(p, i) {
    var media = p.ph ? placeholder(p) : '<img src="' + p.images[0] + '" alt="' + esc(p.name) + ', ' + esc(p.colour) + '" loading="lazy">' + (p.images[1] ? '<img src="' + p.images[1] + '" alt="" loading="lazy">' : "");
    var on = favs.indexOf(p.id) > -1;
    return '<article class="pcard" data-reveal style="--d:' + ((i % 4) * .08) + 's"><a class="pcard__media" href="product.html?id=' + p.id + '" aria-label="' + esc(p.name) + '">' + media + (p.tag ? '<span class="pcard__tag">' + p.tag + "</span>" : "") + '</a><button class="pcard__fav" data-fav="' + p.id + '" aria-pressed="' + on + '" aria-label="Save ' + esc(p.name) + '">' + icon("heart") + '</button><a class="pcard__body" href="product.html?id=' + p.id + '"><h3 class="pcard__name">' + esc(p.name) + '</h3><div class="pcard__row"><span>' + p.colour + '</span><span class="price">' + money(p.price) + "</span></div></a></article>";
  }
  function bindFavs() {
    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-fav]"); if (!b) return; e.preventDefault();
      var id = b.getAttribute("data-fav"), i = favs.indexOf(id);
      if (i > -1) favs.splice(i, 1); else favs.push(id);
      store("na-fav", favs);
      $$('[data-fav="' + id + '"]').forEach(function (x) { x.setAttribute("aria-pressed", favs.indexOf(id) > -1); });
      toast(i > -1 ? "Removed from saved" : "Saved to your list");
    });
  }

  /* ---------- reveal & parallax ---------- */
  var io;
  function observe() {
    if (!("IntersectionObserver" in window)) { $$("[data-reveal]").forEach(function (e) { e.classList.add("is-in"); }); return; }
    if (!io) io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("is-in"); io.unobserve(x.target); } }); }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    $$("[data-reveal]:not(.is-in)").forEach(function (e) { io.observe(e); });
  }
  function parallax() {
    var els = $$("[data-parallax]"); if (!els.length || reduce) return;
    var tick = false;
    function run() {
      var vh = window.innerHeight;
      els.forEach(function (el) {
        var host = el.parentElement.getBoundingClientRect();
        if (host.bottom < -100 || host.top > vh + 100) return;
        var k = parseFloat(el.getAttribute("data-parallax")) || .08;
        var lim = el.offsetHeight * .07;
        var off = (host.top + host.height / 2 - vh / 2) * -k;
        el.style.transform = "translate3d(0," + Math.max(-lim, Math.min(lim, off)).toFixed(1) + "px,0)";
      });
      tick = false;
    }
    window.addEventListener("scroll", function () { if (!tick) { tick = true; requestAnimationFrame(run); } }, { passive: true });
    window.addEventListener("resize", run); run();
  }
  function headerScroll() {
    var h = overlay("header"), d = overlay("dock");
    function s() { h.classList.toggle("is-scrolled", window.scrollY > 8); d.classList.toggle("is-on", window.scrollY > 320 && !openEl); }
    window.addEventListener("scroll", s, { passive: true }); s();
  }

  /* ---------- forms ---------- */
  function forms() {
    $$(".js-news").forEach(function (f) {
      f.addEventListener("submit", function (e) {
        e.preventDefault(); var em = $("input", f), note = $(".form-note", f.parentElement) || $(".form-note");
        if (!em.value || em.value.indexOf("@") < 1) { note.textContent = "Please enter a valid email address."; em.focus(); return; }
        note.textContent = "Thank you. You are on the list."; f.reset(); toast("You are on the list");
      });
    });
    var c = $("#contactForm");
    if (c) c.addEventListener("submit", function (e) { e.preventDefault(); $(".form-note", c).textContent = "Thank you. Our team will reply within one working day."; c.reset(); toast("Message sent (preview)"); });
  }

  /* ---------- page: home ---------- */
  function home() {
    var rail = $("#newRail");
    if (rail) {
      var list = P.filter(function (p) { return p.tag === "New"; }).concat(P.filter(function (p) { return p.tag !== "New" && !p.ph; })).slice(0, 8);
      rail.innerHTML = list.map(card).join("");
      var step = function (d) { rail.scrollBy({ left: d * rail.clientWidth * .8, behavior: "smooth" }); };
      var pv = $("#railPrev"), nx = $("#railNext"); if (pv) pv.onclick = function () { step(-1); }; if (nx) nx.onclick = function () { step(1); };
    }
    var cats = $("#cats");
    if (cats) cats.innerHTML = NA.categories.map(function (c, i) {
      var n = P.filter(function (p) { return p.cat === c.id; }).length;
      return '<a class="cat" href="shop.html?cat=' + c.id + '" data-reveal style="--d:' + i * .1 + 's"><div class="cat__img"><img src="' + c.img + '" alt="' + c.name + '" loading="lazy" style="object-position:' + c.pos + '"></div><div class="cat__label"><b>' + c.name + "</b><span>" + n + " pieces</span></div></a>";
    }).join("");
    var mq = $("#marquee");
    if (mq) { var items = ["Tradition in a modern form", "Good clothes, better days", "Rooted in culture, worn for today", "Same sky, different perspective", "Discipline creates freedom", "Same roads, new horizons"]; var one = items.map(function (t) { return '<span class="marquee__item">' + t + "<i></i></span>"; }).join(""); mq.innerHTML = one + one; }
  }

  /* ---------- page: shop ---------- */
  function shop() {
    var grid = $("#grid"), note = $("#note"), sort = $("#sort"), chips = $("#chips");
    var state = { cat: qs.get("cat") || "all", sort: "featured", q: (qs.get("q") || "").toLowerCase() };
    var copy = {
      all: ["The Collection", "Every piece in the house, from tees stitched by hand to tailored kameez."],
      shirts: ["Shirts", "Tees and camp collars carrying paisley, sashiko and hand embroidery."],
      pants: ["Pants", "Wide cargos and pleated trousers, cut for ease."],
      "shalwar-kameez": ["Shalwar Kameez", "Tradition, tailored. Made to measure in store."],
      accessories: ["Accessories", "Leather and brass, finished by hand."]
    };
    chips.innerHTML = '<button class="chip" data-c="all" aria-pressed="false">All</button>' + NA.categories.map(function (c) { return '<button class="chip" data-c="' + c.id + '" aria-pressed="false">' + c.name + "</button>"; }).join("");
    function render() {
      var l = P.filter(function (p) { return (state.cat === "all" || p.cat === state.cat) && (!state.q || (p.name + " " + p.colour + " " + catName[p.cat]).toLowerCase().indexOf(state.q) > -1); });
      if (state.sort === "low") l.sort(function (a, b) { return a.price - b.price; });
      if (state.sort === "high") l.sort(function (a, b) { return b.price - a.price; });
      if (state.sort === "az") l.sort(function (a, b) { return a.name.localeCompare(b.name); });
      if (state.sort === "featured") l.sort(function (a, b) { return (a.ph ? 1 : 0) - (b.ph ? 1 : 0); });
      var c = copy[state.cat] || copy.all;
      $("#title").textContent = state.q ? "Results for “" + qs.get("q") + "”" : c[0];
      $("#lead").textContent = state.q ? "" : c[1];
      $$(".chip", chips).forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.c === state.cat); });
      note.textContent = l.length + " piece" + (l.length === 1 ? "" : "s");
      grid.innerHTML = l.length ? l.map(card).join("") : '<p class="muted" style="grid-column:1/-1">No pieces match. <a class="link" href="shop.html">Clear filters</a></p>';
      observe();
      document.title = (state.q ? "Search" : c[0]) + " | Nure Asmir";
    }
    chips.addEventListener("click", function (e) { var b = e.target.closest(".chip"); if (!b) return; state.cat = b.dataset.c; state.q = ""; history.replaceState(null, "", state.cat === "all" ? "shop.html" : "shop.html?cat=" + state.cat); render(); });
    sort.addEventListener("change", function () { state.sort = sort.value; render(); });
    render();
  }

  /* ---------- page: product ---------- */
  function product() {
    var p = byId(qs.get("id")) || P[0];
    document.title = p.name + " | Nure Asmir";
    var st = { size: null, colour: p.swatches[0].n };
    $("#crumbs").innerHTML = '<a href="index.html">Home</a><span>/</span><a href="shop.html?cat=' + p.cat + '">' + catName[p.cat] + "</a><span>/</span><span aria-current=\"page\">" + esc(p.name) + "</span>";
    var slides = p.ph ? [placeholder(p, "Front view to follow"), placeholder(p, "Back view to follow"), placeholder(p, "Detail to follow")] : p.images.map(function (s, i) { return '<img src="' + s + '" alt="' + esc(p.name) + " view " + (i + 1) + '"' + (i ? ' loading="lazy"' : "") + ">"; });
    $("#track").innerHTML = slides.map(function (s) { return '<div class="gal__slide">' + s + "</div>"; }).join("");
    $("#stack").innerHTML = slides.map(function (s, i) { return '<div class="gal__slide' + (slides.length === 2 && i === 1 ? " only" : "") + '">' + s + "</div>"; }).join("");
    $("#dots").innerHTML = slides.map(function (_, i) { return "<i" + (i ? "" : ' class="on"') + "></i>"; }).join("");
    var tr = $("#track"); tr.addEventListener("scroll", function () { var i = Math.round(tr.scrollLeft / tr.clientWidth); $$("#dots i").forEach(function (d, j) { d.classList.toggle("on", i === j); }); }, { passive: true });

    $("#pTitle").textContent = p.name;
    $("#pTag").textContent = p.tag && p.tag !== "Soon" ? p.tag : catName[p.cat];
    $("#pPrice").innerHTML = money(p.price) + "<small>Taxes included</small>";
    $("#pBlurb").textContent = p.blurb;
    $("#swatches").innerHTML = p.swatches.map(function (s, i) { return '<button class="sw" data-c="' + s.n + '" aria-pressed="' + (i === 0) + '" aria-label="' + s.n + '"><i style="background:' + s.c + '"></i></button>'; }).join("");
    $("#colourName").textContent = st.colour;
    $("#sizes").innerHTML = p.sizes.map(function (s, i) { return '<button class="size" data-s="' + s + '" aria-pressed="false"' + (p.sizes.length > 3 && i === p.sizes.length - 1 && p.cat === "shirts" ? " disabled" : "") + ">" + s + "</button>"; }).join("");
    if (p.sizes.length === 1) $("#sizes").style.gridTemplateColumns = "1fr";
    $("#acc").innerHTML =
      '<details class="acc" open><summary>Details</summary><div class="acc__body"><ul>' + p.details.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") + "</ul></div></details>" +
      '<details class="acc"><summary>Fabric &amp; care</summary><div class="acc__body"><ul>' + p.fabric.concat(p.care).map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") + "</ul></div></details>" +
      '<details class="acc"><summary>Delivery &amp; returns</summary><div class="acc__body"><p>Complimentary delivery above Rs. 15,000. Easy 14-day returns on unworn pieces with tags. Made-to-measure pieces are final sale.</p></div></details>';
    if (p.ph) $("#phNote").hidden = false;

    document.addEventListener("click", function (e) {
      var s = e.target.closest(".size"), c = e.target.closest(".sw");
      if (s && !s.disabled) { st.size = s.dataset.s; $$(".size").forEach(function (b) { b.setAttribute("aria-pressed", b === s); }); $("#sizeName").textContent = st.size; }
      if (c) { st.colour = c.dataset.c; $$(".sw").forEach(function (b) { b.setAttribute("aria-pressed", b === c); }); $("#colourName").textContent = st.colour; }
    });
    $("#add").addEventListener("click", function () {
      if (!st.size) { $("#sizes").scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" }); toast("Please choose a size"); return; }
      addToCart(p.id, st.size, st.colour, 1); toast("Added to your bag"); setTimeout(function () { openOverlay("drawer"); }, 350);
    });
    var f = $("#pFav"); f.setAttribute("data-fav", p.id); f.setAttribute("aria-pressed", favs.indexOf(p.id) > -1);

    var rel = P.filter(function (x) { return x.id !== p.id && x.cat === p.cat; });
    P.filter(function (x) { return x.id !== p.id && x.cat !== p.cat && !x.ph; }).forEach(function (x) { if (rel.length < 4) rel.push(x); });
    $("#related").innerHTML = rel.slice(0, 4).map(card).join("");
  }

  /* ---------- page: lookbook ---------- */
  var lbIndex = 0, lbList = [];
  function closeLightbox() { var l = $("#lightbox"); if (l) { l.classList.remove("is-open"); document.body.classList.remove("is-locked"); } }
  function showLb(i) { lbIndex = (i + lbList.length) % lbList.length; var it = lbList[lbIndex]; $("#lbImg").src = it.src; $("#lbImg").alt = it.cap; $("#lbCap").textContent = it.cap; }
  function lookbook() {
    var host = $("#mosaic"), chips = $("#lbChips"), cur = "all";
    function render() {
      lbList = NA.lookbook.filter(function (x) { return cur === "all" || x.cat === cur; });
      host.innerHTML = lbList.map(function (x, i) {
        var cls = "tile" + (x.size === "tall" ? " tile--tall" : "") + (x.size === "wide" ? " tile--wide" : "");
        return '<button class="' + cls + '" data-lb="' + i + '" data-reveal style="--d:' + (i % 4) * .06 + 's" aria-label="Open: ' + esc(x.cap) + '"><img src="' + x.src + '" alt="' + esc(x.cap) + '" loading="lazy"><span class="tile__cap">' + esc(x.cap) + "</span></button>";
      }).join("");
      $$(".chip", chips).forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.f === cur); });
      observe();
    }
    chips.addEventListener("click", function (e) { var b = e.target.closest(".chip"); if (b) { cur = b.dataset.f; render(); } });
    host.addEventListener("click", function (e) { var t = e.target.closest("[data-lb]"); if (!t) return; showLb(+t.dataset.lb); var l = $("#lightbox"); l.classList.add("is-open"); document.body.classList.add("is-locked"); $(".lb-x", l).focus(); });
    $(".lb-x").onclick = closeLightbox; $(".lb-p").onclick = function () { showLb(lbIndex - 1); }; $(".lb-n").onclick = function () { showLb(lbIndex + 1); };
    $("#lightbox").addEventListener("click", function (e) { if (e.target.id === "lightbox") closeLightbox(); });
    document.addEventListener("keydown", function (e) { if (!$("#lightbox").classList.contains("is-open")) return; if (e.key === "ArrowLeft") showLb(lbIndex - 1); if (e.key === "ArrowRight") showLb(lbIndex + 1); });
    var sx = 0; $("#lightbox").addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    $("#lightbox").addEventListener("touchend", function (e) { var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) showLb(lbIndex + (dx < 0 ? 1 : -1)); }, { passive: true });
    render();
  }

  /* ---------- splash (home, first visit per session) ---------- */
  function splash() {
    document.documentElement.classList.remove("splash-on");
    var d = document.createElement("div"); d.className = "splash"; d.innerHTML = '<img src="public/assets/web/nure-asmir-lockup-ink.png" alt="Nure Asmir. Tradition in a modern form.">';
    document.body.appendChild(d); document.body.classList.add("is-locked");
    setTimeout(function () { d.classList.add("is-done"); document.body.classList.remove("is-locked"); setTimeout(function () { d.remove(); }, 900); }, reduce ? 300 : 1900);
  }

  /* ---------- init ---------- */
  buildLayout(); bindOverlays(); bindDrawer(); bindFavs();
  paintBadge(); paintDrawer(); headerScroll();
  if (page === "home") home();
  if (page === "shop") shop();
  if (page === "product") product();
  if (page === "lookbook") lookbook();
  forms(); observe(); parallax();
  if (document.documentElement.classList.contains("splash-on")) splash();
  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();
})();
