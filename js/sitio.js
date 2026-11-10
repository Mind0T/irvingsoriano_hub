/* Chrome compartido (header + nav + footer), i18n ES/EN, menú móvil y reveal.
   Cada página define window.PAGINA = "inicio" | "proyectos" | ... antes de cargar este archivo. */
(function () {
  var NAV = [
    { k: "inicio", href: "index.html", es: "Inicio", en: "Home" },
    { k: "proyectos", href: "proyectos.html", es: "Proyectos", en: "Projects" },
    { k: "perfil", href: "perfil.html", es: "Perfil", en: "About" },
    { k: "formacion", href: "formacion.html", es: "Formación", en: "Education" },
    { k: "herramientas", href: "herramientas.html", es: "Herramientas", en: "Tools" },
    { k: "cursos", href: "cursos.html", es: "Cursos", en: "Courses" }
  ];
  var CHROME = {
    es: { foot: "Hecho con la estética de mi tablero · fake it till you make it", menu: "Menú" },
    en: { foot: "Built with my board's aesthetic · fake it till you make it", menu: "Menu" }
  };
  var lang = "es";
  try { lang = localStorage.getItem("irvin.lang") === "en" ? "en" : "es"; } catch (e) {}
  window.LANG = lang;
  var active = window.PAGINA || "inicio";

  function navHTML() {
    return NAV.map(function (n) {
      return '<a href="' + n.href + '"' + (n.k === active ? ' aria-current="page"' : '') + ' data-nav="' + n.k + '">' + n[lang] + '</a>';
    }).join("");
  }
  function mountChrome() {
    var header = document.createElement("header");
    header.className = "top wrap";
    header.innerHTML =
      '<div class="brand">' +
        '<img class="logo" src="assets/logo.png" width="46" alt="">' +
        '<div><p class="eyebrow">Irvin · ESCOM IPN</p><h1>Irvin Soriano</h1><p class="motto">fake it till you make it</p></div>' +
      '</div>' +
      '<div></div>' +
      '<div class="head-right">' +
        '<button class="burger" id="burger" aria-label="' + CHROME[lang].menu + '"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>' +
        '<span class="lang" role="group" aria-label="Idioma"><button data-lang="es" aria-pressed="' + (lang === "es") + '">ES</button><button data-lang="en" aria-pressed="' + (lang === "en") + '">EN</button></span>' +
      '</div>' +
      '<nav class="nav"><div class="seg2" id="segnav">' + navHTML() + '</div></nav>';
    document.body.insertBefore(header, document.body.firstChild.nextSibling);

    // footer
    var foot = document.createElement("div");
    foot.className = "wrap";
    foot.innerHTML = '<div class="foot"><span>© 2026 Irvin Jair Soriano Rosales</span><span data-chrome="foot">' + CHROME[lang].foot + '</span></div>';
    document.body.appendChild(foot);

    // eventos
    header.querySelector(".lang").addEventListener("click", function (e) {
      var b = e.target.closest("[data-lang]"); if (!b) return;
      try { localStorage.setItem("irvin.lang", b.dataset.lang); } catch (_) {}
      location.reload();
    });
    var burger = header.querySelector("#burger"), seg = header.querySelector("#segnav");
    burger.addEventListener("click", function () { seg.classList.toggle("open"); });
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
