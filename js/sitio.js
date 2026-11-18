/* Chrome compartido (header + nav + footer), i18n ES/EN, menú móvil y reveal.
   Cada página define window.PAGINA = "inicio" | "proyectos" | ... antes de cargar este archivo. */
(function () {
  var NAV = [
    { k: "inicio", href: "index.html", es: "Inicio", en: "Home" },
    { k: "perfil", href: "perfil.html", es: "Acerca de mí", en: "About me" },
    { k: "learning", href: "https://estudio.irvingsoriano.com", es: "Learning Zone", en: "Learning Zone" },
    { k: "cursos", href: "cursos.html", es: "Comunidad", en: "Community" }
  ];
  var CHROME = {
    es: { foot: "Hecho con la estética de mi tablero · fake it till you make it", menu: "Menú" },
    en: { foot: "Built with my board's aesthetic · fake it till you make it", menu: "Menu" }
  };
  var lang = "es";
  try { lang = localStorage.getItem("irvin.lang") === "en" ? "en" : "es"; } catch (e) {}
  window.LANG = lang;
  var active = window.PAGINA || "inicio";

  // ----- tema claro/oscuro -----
  var tema = "oscuro";
  try {
    var saved = localStorage.getItem("irvin.tema");
    if (saved === "claro" || saved === "oscuro") tema = saved;
    else if (window.matchMedia && matchMedia("(prefers-color-scheme: light)").matches) tema = "claro";
  } catch (e) {}
  function aplicarTema(t) {
    document.documentElement.setAttribute("data-tema", t === "claro" ? "claro" : "oscuro");
    var li = document.getElementById("logoImg");
    if (li) li.src = (t === "claro") ? "assets/logo-brand-light.png" : "assets/logo-brand.png";
    window.TEMA = t;
    try { window.dispatchEvent(new CustomEvent("temachange", { detail: t })); } catch (_) {}
  }
  aplicarTema(tema);

  function navHTML() {
    return NAV.map(function (n) {
      return '<a href="' + n.href + '"' + (n.k === active ? ' aria-current="page"' : '') + ' data-nav="' + n.k + '">' + n[lang] + '</a>';
    }).join("");
  }
  function mountChrome() {
    var header = document.createElement("header");
    header.className = "top wrap";
    header.innerHTML =
      '<a class="brand" href="index.html" aria-label="Irving Soriano · Inicio">' +
        '<img id="logoImg" class="logo-full" src="' + (tema === "claro" ? "assets/logo-brand-light.png" : "assets/logo-brand.png") + '" alt="Irving Soriano">' +
      '</a>' +
      '<nav class="nav"><div class="seg2" id="segnav">' + navHTML() + '</div></nav>' +
      '<div class="head-right">' +
        '<button class="theme-tog" id="themeTog" aria-label="' + (lang === "es" ? "Cambiar tema" : "Toggle theme") + '">' +
          '<svg class="ico-moon" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
          '<svg class="ico-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8L6 18M18 6l1.8-1.8"/></svg>' +
        '</button>' +
        '<span class="lang" role="group" aria-label="Idioma"><button data-lang="es" aria-pressed="' + (lang === "es") + '">ES</button><button data-lang="en" aria-pressed="' + (lang === "en") + '">EN</button></span>' +
        '<button class="burger" id="burger" aria-label="' + CHROME[lang].menu + '" aria-expanded="false"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>' +
      '</div>';
    document.body.insertBefore(header, document.body.firstChild.nextSibling);

    // footer
    var foot = document.createElement("div");
    foot.className = "wrap";
    foot.innerHTML = '<div class="foot"><span>© 2026 Irvin Jair Soriano Rosales</span></div>';
    document.body.appendChild(foot);

    // eventos
    header.querySelector(".lang").addEventListener("click", function (e) {
      var b = e.target.closest("[data-lang]"); if (!b) return;
      try { localStorage.setItem("irvin.lang", b.dataset.lang); } catch (_) {}
      location.reload();
    });
    var burger = header.querySelector("#burger"), seg = header.querySelector("#segnav");
    burger.addEventListener("click", function () {
      var open = seg.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
    var tog = header.querySelector("#themeTog");
    if (tog) tog.addEventListener("click", function () {
      tema = (window.TEMA === "claro") ? "oscuro" : "claro";
      try { localStorage.setItem("irvin.tema", tema); } catch (_) {}
      aplicarTema(tema);
    });
  }

  // i18n de contenido: aplica textos marcados con data-i18n usando window.I18N de la página
  window.aplicarI18n = function () {
    var dic = window.I18N && window.I18N[lang]; if (!dic) return;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n"); if (dic[k] != null) el.innerHTML = dic[k];
    });
  };
  window.T = function (k) { var d = window.I18N && window.I18N[lang]; return (d && d[k]) || k; };

  // reveal on scroll
  function initReveal() {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
    }, { threshold: .1 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  }

  document.documentElement.lang = lang;
  mountChrome();
  window.aplicarI18n();
  if (typeof window.render === "function") window.render(lang);
  initReveal();
})();
