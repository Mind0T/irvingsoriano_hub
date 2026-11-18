/* ============================================================
   Eivind — home reactivo: identidad animada (no esfera de puntos),
   menú infinito de proyectos, voz cálida y hoja de detalle.
   Depende de js/proyectos-data.js (window.EIVIND_PROY / EIVIND_ICON).
   ============================================================ */
(function () {
  var P = window.EIVIND_PROY || [], ICON = window.EIVIND_ICON || {};
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  var UI = {
    es: { titulo:"Irving Soriano", subtitulo:"Científico de datos", hint:"Abrir proyecto",
          open:"Ver proyecto",
          live:"Abrir en vivo", repo:"Código", video:"Video", loading:"Cargando vista en vivo…",
          role:"Mi rol", preview:"Vista", about:"De qué va", high:"Lo que hice", tech:"Herramientas",
          nolive:"Visualización del análisis" },
    en: { titulo:"Irving Soriano", subtitulo:"Data Scientist", hint:"Open project",
          open:"View project",
          live:"Open live", repo:"Code", video:"Video", loading:"Loading live view…",
          role:"My role", preview:"Preview", about:"What it is", high:"What I did", tech:"Tools",
          nolive:"Analysis visualization" }
  };

  function cvar(name, fb) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fb;
  }
  function areaColor(area) { return cvar("--" + area, "#D4D4D4"); }
  function hex2rgb(h) {
    h = (h || "").replace("#", "");
    if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    var n = parseInt(h || "d4d4d4", 16);
    return { r:(n>>16)&255, g:(n>>8)&255, b:n&255 };
  }

  /* Identidad "Eivind" — esfera de NODOS INTERCONECTADOS + núcleo.
     Solo puntos y conexiones (sin anillos, ticks ni barrido). El aura
     se desvanece antes del borde para no verse "en recuadro". Al navegar
     el menú, reacciona con un pulso de brillo. */
  function Identity(canvas) {
    var ctx = canvas.getContext("2d"), dpr = 1, S = 300, t = 0, en = 0, enT = 0, pulse = 0, raf = 0;
    var cur = hex2rgb("#5B8DEF"), tgt = hex2rgb("#5B8DEF");
    var N = 118, nodes = [];
    for (var i = 0; i < N; i++) {
      var y = 1 - 2 * (i + .5) / N, rr = Math.sqrt(Math.max(0, 1 - y * y)), ph = i * 2.399963;
      nodes.push({ x: Math.cos(ph) * rr, y: y, z: Math.sin(ph) * rr, tw: Math.random() * 6.28, sp: .6 + Math.random() * .9 });
    }
    var edges = [];
    for (var a = 0; a < N; a++) {
      var ds = [];
      for (var b = 0; b < N; b++) { if (a === b) continue; var dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y, dz = nodes[a].z - nodes[b].z; ds.push([dx * dx + dy * dy + dz * dz, b]); }
      ds.sort(function (p, q) { return p[0] - q[0]; });
      for (var k = 0; k < 3; k++) { var bb = ds[k][1]; if (bb > a) edges.push([a, bb, Math.random() * 6.28]); }
    }
    function size() { dpr = Math.min(2, window.devicePixelRatio || 1); var box = canvas.getBoundingClientRect(); S = Math.max(180, box.width || 300); canvas.width = S * dpr; canvas.height = S * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    function col(a) { return "rgba(" + Math.round(cur.r) + "," + Math.round(cur.g) + "," + Math.round(cur.b) + "," + a + ")"; }
    function draw() {
      ctx.clearRect(0, 0, S, S);
      var cx = S / 2, cy = S / 2, R = S * .175;
      cur.r += (tgt.r - cur.r) * .08; cur.g += (tgt.g - cur.g) * .08; cur.b += (tgt.b - cur.b) * .08;
      en += (enT - en) * .1; if (pulse > 0) pulse *= .93;
      var energy = Math.min(1, en + pulse), br = .5 + .5 * Math.sin(t * 1.2);
      var ry = t * .33, rx = .44, ca = Math.cos(ry), sa = Math.sin(ry), cb = Math.cos(rx), sb = Math.sin(rx), pr = [];
      for (var i = 0; i < N; i++) { var n = nodes[i];
        var x = n.x * ca - n.z * sa, z = n.x * sa + n.z * ca, yy = n.y * cb - z * sb, z2 = n.y * sb + z * cb;
        pr.push({ sx: cx + x * R, sy: cy + yy * R, d: (z2 + 1) / 2 }); }
      // aura libre: se desvanece a 0 antes de tocar el borde (sin recuadro)
      var hg = ctx.createRadialGradient(cx, cy, R * .2, cx, cy, S * .42);
      hg.addColorStop(0, col(.16 + energy * .14)); hg.addColorStop(.55, col(.04)); hg.addColorStop(1, col(0));
      ctx.fillStyle = hg; ctx.fillRect(0, 0, S, S);
      ctx.lineWidth = 1;
      for (var e = 0; e < edges.length; e++) { var ea = pr[edges[e][0]], eb = pr[edges[e][1]], da = (ea.d + eb.d) / 2, fl = .6 + .4 * Math.sin(t * 2 + edges[e][2]);
        ctx.strokeStyle = col((.04 + .28 * da) * (.6 + energy * .7) * fl); ctx.beginPath(); ctx.moveTo(ea.sx, ea.sy); ctx.lineTo(eb.sx, eb.sy); ctx.stroke(); }
      for (var i2 = 0; i2 < N; i2++) { var p = pr[i2], n2 = nodes[i2], tw = .6 + .4 * Math.sin(n2.tw + t * n2.sp), rad = (.5 + 1.7 * p.d) * (1 + energy * .3);
        ctx.fillStyle = col((.25 + .6 * p.d) * tw); ctx.beginPath(); ctx.arc(p.sx, p.sy, rad, 0, 6.283); ctx.fill();
        if (p.d > .82) { ctx.fillStyle = "rgba(255,255,255," + (.5 * tw).toFixed(3) + ")"; ctx.beginPath(); ctx.arc(p.sx, p.sy, rad * .5, 0, 6.283); ctx.fill(); } }
      var coreR = R * (.26 + br * .04 + energy * .16), cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      cg.addColorStop(0, "rgba(255,255,255,.95)"); cg.addColorStop(.4, col(.8)); cg.addColorStop(1, col(0));
      ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(cx, cy, coreR, 0, 6.283); ctx.fill();
      t += reduce ? 0 : .016;
    }
    function loop() { draw(); raf = requestAnimationFrame(loop); }
    this.setColor = function (h) { tgt = hex2rgb(h); };
    this.refreshColor = function (h) { cur = hex2rgb(h); tgt = hex2rgb(h); };
    this.setSpeaking = function (b) { enT = b ? .6 : 0; };
    this.pulse = function () { pulse = .7; };
    this.resize = size;
    this.start = function () { size(); if (reduce) draw(); else loop(); };
    this.stop = function () { cancelAnimationFrame(raf); };
  }


  /* =========================================================
     Visualizaciones para proyectos de datos (SVG inline)
     ========================================================= */
  function viz(kind, lang) {
    var L = lang==="en";
    if (kind==="store") {
      var vals=[1150,1095,1065,1010], names=["Tienda 1","Tienda 2","Tienda 3","Tienda 4"], max=1200;
      var bars=vals.map(function(v,i){
        var h=Math.round(v/max*120), x=28+i*62, y=150-h, low=(i===3);
        return '<rect class="vbar" x="'+x+'" y="'+y+'" width="40" height="'+h+'" rx="4" fill="currentColor" opacity="'+(low?1:0.4)+'" style="animation-delay:'+(i*0.12)+'s"/>'+
               '<text x="'+(x+20)+'" y="165" text-anchor="middle" font-size="9" fill="currentColor" opacity=".7">'+names[i]+'</text>'+
               (low?'<text x="'+(x+20)+'" y="'+(y-6)+'" text-anchor="middle" font-size="9" font-weight="700" fill="currentColor">'+(L?"sell":"vender")+'</text>':'');
      }).join("");
      return '<svg viewBox="0 0 300 172" role="img" aria-label="'+(L?"Revenue by store":"Ingresos por tienda")+'"><line x1="20" y1="150" x2="290" y2="150" stroke="currentColor" opacity=".3"/>'+bars+'</svg>';
    }
    if (kind==="churn") {
      var pct=26.5, C=2*Math.PI*52, keep=C*(1-pct/100);
      return '<svg viewBox="0 0 300 172" role="img" aria-label="Churn"><g transform="translate(86,86)">'+
        '<circle r="52" fill="none" stroke="currentColor" stroke-width="18" opacity=".18"/>'+
        '<circle class="vdash" r="52" fill="none" stroke="currentColor" stroke-width="18" stroke-linecap="round" stroke-dasharray="'+(C*pct/100).toFixed(1)+' '+C.toFixed(1)+'" transform="rotate(-90)" style="--len:'+(C*pct/100).toFixed(1)+'"/>'+
        '<text y="-2" text-anchor="middle" font-size="26" font-weight="800" fill="currentColor">'+pct+'%</text>'+
        '<text y="16" text-anchor="middle" font-size="9" fill="currentColor" opacity=".7">'+(L?"churn":"evasión")+'</text></g>'+
        '<g transform="translate(176,40)" font-size="10" fill="currentColor">'+
        ['Contrato mensual','Cargos altos','Poca antigüedad'].map(function(t,i){
          return '<text x="0" y="'+(i*34)+'" opacity=".75">'+(L?["Monthly contract","High charges","Low tenure"][i]:t)+'</text>'+
                 '<rect class="vbar" x="0" y="'+(i*34+6)+'" height="9" rx="4" width="'+(96-i*20)+'" fill="currentColor" opacity="'+(0.8-i*0.2)+'" style="animation-delay:'+(i*0.15)+'s"/>';
        }).join("")+'</g></svg>';
    }
    // ml
    var models=[{n:"Reg. Logística",v:0.80},{n:"Random Forest",v:0.85}];
    var mb=models.map(function(m,i){
      var w=Math.round(m.v*180), y=28+i*40;
      return '<text x="0" y="'+(y-6)+'" font-size="10" fill="currentColor" opacity=".8">'+m.n+'</text>'+
             '<rect x="0" y="'+y+'" width="180" height="16" rx="8" fill="currentColor" opacity=".16"/>'+
             '<rect class="vbar" x="0" y="'+y+'" width="'+w+'" height="16" rx="8" fill="currentColor" opacity="'+(i?1:0.55)+'" style="animation-delay:'+(i*0.15)+'s;transform-origin:left"/>'+
             '<text x="'+(w+8)+'" y="'+(y+12)+'" font-size="10" font-weight="700" fill="currentColor">'+Math.round(m.v*100)+'%</text>';
    }).join("");
    return '<svg viewBox="0 0 300 160" role="img" aria-label="'+(L?"Model accuracy":"Precisión de modelos")+'"><g transform="translate(26,14)">'+
      '<text x="0" y="0" font-size="9" fill="currentColor" opacity=".55" letter-spacing="1">'+(L?"ACCURACY":"PRECISIÓN")+'</text>'+mb+
      '<text x="0" y="132" font-size="9.5" fill="currentColor" opacity=".7">'+(L?"Random Forest wins — top driver: tenure":"Gana Random Forest — factor clave: antigüedad")+'</text></g></svg>';
  }

  /* =========================================================
     INIT
     ========================================================= */
  function init(lang) {
    lang = (lang==="en")?"en":"es";
    var tx = UI[lang];
    var mount = document.getElementById("eivMount");
    if (!mount || !P.length) return;

    // ---- markup del escenario + menú ----
    mount.innerHTML =
      '<section class="eiv-stage">'+
        '<h1 class="eiv-name">'+tx.titulo+'</h1>'+
        '<p class="eiv-sub eiv-role">'+tx.subtitulo+'</p>'+
        '<p class="eiv-current" id="eivCurrent" aria-live="polite"></p>'+
        '<div class="eiv-core" id="eivCore" role="button" tabindex="0" aria-label="'+tx.open+'">'+
          '<canvas id="eivCanvas"></canvas>'+
          '<span class="eiv-hint">'+tx.hint+'</span>'+
        '</div>'+
      '</section>'+
      '<div class="eiv-dial" id="eivDial" aria-label="'+(lang==="en"?"Projects":"Proyectos")+'">'+
        '<div class="eiv-dial-stage" id="eivDialStage">'+
          '<svg class="eiv-dial-arc" id="eivDialSvg" aria-hidden="true"><path id="eivDialArc" d=""/></svg>'+
          '<div class="eiv-dial-items" id="eivDialItems"></div>'+
        '</div>'+
        '<p class="eiv-dial-hint">'+(lang==="en"?"Swipe · tap a project to browse · the center one opens":"Desliza · toca un proyecto para recorrer · el del centro abre")+'</p>'+
      '</div>';

    var canvas = document.getElementById("eivCanvas");
    var idn = new Identity(canvas); idn.start();
    var core = document.getElementById("eivCore");

    // ---- selección (posición fraccional continua, giro fluido e infinito) ----
    var sel = 0, selF = 0, dialRAF = 0, lastBase = null, vel = 0;
    var curEl = mount.querySelector("#eivCurrent");
    function idxOf(u){ return ((u % P.length)+P.length)%P.length; }
    function applyAccent(ix){
      var c = areaColor(P[ix].area);
      document.documentElement.style.setProperty("--acc", c); mount.style.setProperty("--acc", c);
      idn.setColor(c); idn.pulse();
    }
    function updateCurrent(ix){ if(curEl) curEl.textContent = P[ix].nombre[lang]; }

    // ---- menú de media luna ----
    var DN = 7, SP = 0.30, center = (DN-1)/2, dslots = [];
    var dialStage = mount.querySelector("#eivDialStage"),
        dialSvg   = mount.querySelector("#eivDialSvg"),
        dialPath  = mount.querySelector("#eivDialArc"),
        dialItems = mount.querySelector("#eivDialItems");
    function buildDial(){
      dialItems.innerHTML = ""; dslots = [];
      for (var i=0;i<DN;i++){ var b=document.createElement("button"); b.className="eiv-dslot"; b.type="button";
        b.innerHTML='<span class="ic"><svg viewBox="0 0 24 24"></svg></span><span class="dl"></span>'; dialItems.appendChild(b); dslots.push(b); }
    }
    function renderDial(){
      if (!dslots.length) return;
      var W = dialStage.clientWidth || 340, H = dialStage.clientHeight || 150, R = W*0.58, cx = W/2, cy = R + 16;
      if (dialSvg) dialSvg.setAttribute("viewBox","0 0 "+W+" "+H);
      if (dialPath){ var am=2*SP, x1=(cx-R*Math.sin(am)).toFixed(1), x2=(cx+R*Math.sin(am)).toFixed(1), ay=(cy-R*Math.cos(am)).toFixed(1);
        dialPath.setAttribute("d","M"+x1+" "+ay+" A"+R.toFixed(1)+" "+R.toFixed(1)+" 0 0 1 "+x2+" "+ay); }
      var base = Math.round(selF), nearest = -1, nearestAbs = 1e9;
      for (var s2=0;s2<DN;s2++){
        var off=s2-center, u=base+off, ix=idxOf(u), p=P[ix], b=dslots[s2];
        var ang=(off+(base-selF))*SP, aa=Math.abs(ang);
        b.style.left=(cx+R*Math.sin(ang)).toFixed(1)+"px";
        b.style.top=(cy-R*Math.cos(ang)).toFixed(1)+"px";
        b.style.opacity=Math.max(0,1-Math.pow(aa/(SP*2.4),1.5)).toFixed(3);
        if(aa<nearestAbs){nearestAbs=aa;nearest=s2;}
        if(b._ix!==ix){ b._ix=ix; b.dataset.idx=ix; b.style.setProperty("--c", areaColor(p.area));
          b.querySelector(".ic svg").innerHTML = ICON[p.icon]||""; }
        b.dataset.off=off;
      }
      for (var s3=0;s3<DN;s3++) dslots[s3].classList.toggle("on", s3===nearest);
      if (base!==lastBase){ lastBase=base; applyAccent(idxOf(base)); updateCurrent(idxOf(base)); }
    }
    var updateDial = renderDial;
    function stepDial(){
      vel=(vel+(sel-selF)*0.20)*0.62;
      selF+=vel;
      if(Math.abs(sel-selF)<0.0012 && Math.abs(vel)<0.0012){ selF=sel; vel=0; renderDial(); dialRAF=0; return; }
      renderDial(); dialRAF=requestAnimationFrame(stepDial);
    }
    function startDialAnim(){ if(!dialRAF) dialRAF=requestAnimationFrame(stepDial); }
    function setSel(u){ sel=u; if(reduce){ selF=u; vel=0; renderDial(); } else startDialAnim(); }
    function rotate(step){ setSel(Math.round(selF)+step); }

    // ---- hoja de detalle (ventana flotante centrada) ----
    var sheet=document.getElementById("eivSheet");
    function L(v){ return (v && typeof v==="object") ? (v[lang]||v.es) : v; }
    function links(p) {
      var out="";
      var repos = p.repos || (p.repo?[{t:tx.repo,u:p.repo}]:[]);
      if (p.live) out+='<a class="eiv-link live" href="'+p.live+'" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>'+(p.liveLabel?L(p.liveLabel):tx.live)+'</a>';
      (p.deploys||[]).forEach(function(d){
        out+='<a class="eiv-link" href="'+d.u+'" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/></svg>'+L(d.t)+'</a>';
      });
      if (p.video) out+='<a class="eiv-link" href="'+p.video+'" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M10 8l6 4-6 4V8z"/><rect x="2.5" y="4" width="19" height="16" rx="3"/></svg>'+tx.video+'</a>';
      repos.forEach(function(r){
        out+='<a class="eiv-link" href="'+r.u+'" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6A4.6 4.6 0 0 0 19 7.5 4.3 4.3 0 0 0 18.9 4S17.7 3.6 15 5.3a13 13 0 0 0-6 0C6.3 3.6 5.1 4 5.1 4A4.3 4.3 0 0 0 5 7.5 4.6 4.6 0 0 0 3.5 11c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V23"/></svg>'+(repos.length>1?L(r.t):tx.repo)+'</a>';
      });
      return out;
    }
    var OPEN_SVG='<svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></svg>';
    function preview(p) {
      if (p.preview.type==="live") {
        // iframe en vivo (vista real de la página) + póster de respaldo que se
        // desvanece al cargar. Si la página no se puede incrustar o 'noembed',
        // se queda el póster clicable.
        var embed = p.preview.noembed ? "" :
          '<iframe class="eiv-live" src="'+p.preview.url+'" loading="lazy" tabindex="-1" aria-hidden="true" scrolling="no" referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-popups allow-forms"></iframe>';
        return '<a class="eiv-frame'+(p.preview.noembed?"":" has-live")+'" href="'+p.preview.url+'" target="_blank" rel="noopener" style="--c:'+areaColor(p.area)+'" aria-label="'+tx.live+'">'+
          embed+
          '<span class="eiv-poster"><span class="pic"><svg viewBox="0 0 24 24">'+(ICON[p.icon]||"")+'</svg></span><span class="pnm">'+p.nombre[lang]+'</span><span class="popen">'+tx.live+' '+OPEN_SVG+'</span></span>'+
          '<span class="eiv-frame-badge">'+tx.live+' '+OPEN_SVG+'</span>'+
          '</a>';
      }
      if (p.preview.type==="gallery") {
        return '<div class="eiv-shots">'+p.preview.shots.map(function(sh){
          var o = sh.url ? (' href="'+sh.url+'" target="_blank" rel="noopener"') : "";
          var tag = sh.url ? "a" : "figure";
          return '<'+tag+' class="eiv-shot'+(sh.url?" link":"")+'"'+o+'><img src="'+sh.src+'" alt="" loading="lazy">'+
            (sh.url?'<span class="eiv-frame-badge">'+tx.live+' '+OPEN_SVG+'</span>':'')+
            '<span class="cap">'+sh.cap[lang]+'</span></'+tag+'>';
        }).join("")+'</div>';
      }
      return '<div class="eiv-viz" style="color:'+areaColor(p.area)+'">'+viz(p.preview.viz, lang)+'</div>';
    }
    function wireGrab(panel, grab){
      if(!grab) return; var sy=null, dy=0;
      grab.addEventListener("pointerdown", function(e){ sy=e.clientY; dy=0; panel.style.transition="none"; try{grab.setPointerCapture(e.pointerId);}catch(_){ } });
      grab.addEventListener("pointermove", function(e){ if(sy==null) return; dy=Math.max(0, e.clientY-sy); panel.style.transform="translateY("+dy+"px)"; });
      grab.addEventListener("pointerup", function(){ if(sy==null) return; sy=null; panel.style.transition=""; if(dy>120) closeDetail(); else panel.style.transform=""; });
      grab.addEventListener("pointercancel", function(){ sy=null; panel.style.transition=""; panel.style.transform=""; });
    }
    function openDetail(idx) {
      var p=P[idx], c=areaColor(p.area), panel=sheet.querySelector(".eiv-panel");
      sheet.style.setProperty("--c", c);
      panel.scrollTop=0; panel.style.transform="";
      sheet.querySelector("#eivPanelInner").innerHTML =
        '<div class="eiv-grab" id="eivGrab"><span></span></div>'+
        '<div class="eiv-ph">'+
          '<button class="eiv-close" id="eivClose" aria-label="Cerrar"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>'+
          '<span class="eiv-area"><span class="dot"></span>'+p.area.toUpperCase()+' · '+(p.lang||"")+'</span>'+
          '<h2>'+p.nombre[lang]+'</h2>'+
          '<p class="pf">“'+p.frase[lang]+'”</p>'+
          (p.rol?'<span class="eiv-rol"><span>'+tx.role+'</span> '+p.rol[lang]+'</span>':'')+
        '</div>'+
        '<div class="eiv-body">'+
          '<div class="eiv-col-media"><div class="eiv-sec"><h3>'+tx.preview+'</h3>'+preview(p)+'</div></div>'+
          '<div class="eiv-col-text">'+
            '<div class="eiv-sec"><h3>'+tx.about+'</h3><p class="lead">'+p.resumen[lang]+'</p></div>'+
            '<div class="eiv-sec"><h3>'+tx.high+'</h3><ul class="eiv-hl">'+p.highlights[lang].map(function(h){return '<li>'+h+'</li>';}).join("")+'</ul></div>'+
            '<div class="eiv-sec"><h3>'+tx.tech+'</h3><div class="eiv-tech">'+p.tech.map(function(t){return '<span>'+t+'</span>';}).join("")+'</div></div>'+
            '<div class="eiv-links">'+links(p)+'</div>'+
          '</div>'+
        '</div>';
      sheet.classList.add("open"); document.body.style.overflow="hidden";
      sheet.querySelector("#eivClose").addEventListener("click", closeDetail);
      wireGrab(panel, sheet.querySelector("#eivGrab"));
      // vista en vivo: al cargar el iframe, desvanece el póster para mostrar la página
      sheet.querySelectorAll(".eiv-frame.has-live .eiv-live").forEach(function(fr){
        var frame=fr.closest(".eiv-frame"), done=false;
        fr.addEventListener("load", function(){ if(done)return; done=true; frame.classList.add("live-on"); });
      });
      fitLiveFrames(sheet);
    }
    // el iframe se renderiza a ancho de LAPTOP (1440×810, 16:9) y se escala al
    // recuadro: así la página muestra su layout de escritorio, no el móvil.
    var LIVE_W=1440, LIVE_H=810;
    function fitLiveFrames(root){
      (root||document).querySelectorAll(".eiv-frame.has-live .eiv-live").forEach(function(fr){
        var frame=fr.closest(".eiv-frame"); if(!frame)return;
        var w=frame.clientWidth||1;
        fr.style.width=LIVE_W+"px"; fr.style.height=LIVE_H+"px";
        fr.style.transform="scale("+(w/LIVE_W).toFixed(4)+")";
      });
    }
    var frt; window.addEventListener("resize", function(){ clearTimeout(frt); frt=setTimeout(function(){ fitLiveFrames(document); }, 160); });
    function closeDetail(){
      sheet.classList.remove("open"); document.body.style.overflow="";
      setTimeout(function(){ var pi=sheet.querySelector("#eivPanelInner"); if(pi) pi.innerHTML=""; var pp=sheet.querySelector(".eiv-panel"); if(pp){ pp.style.transform=""; pp.style.transition=""; } }, 300);
    }
    sheet.querySelector(".eiv-scrim").addEventListener("click", closeDetail);
    document.addEventListener("keydown", function(e){ if(e.key==="Escape" && sheet.classList.contains("open")) closeDetail(); });

    // ---- interacción del dial (arrastre continuo con inercia) ----
    buildDial();
    var dial=mount.querySelector("#eivDial"), dragX=null, dragSelF=0, dragMoved=false, dragStep=1, lastSelF=0, lastT=0;
    dialStage.addEventListener("pointerdown", function(e){
      dragX=e.clientX; dragSelF=selF; dragMoved=false; vel=0;
      dragStep=(dialStage.clientWidth||340)*0.16;
      lastSelF=selF; lastT=performance.now();
      if(dialRAF){cancelAnimationFrame(dialRAF);dialRAF=0;}
      try{dialStage.setPointerCapture(e.pointerId);}catch(_){}
    });
    dialStage.addEventListener("pointermove", function(e){
      if(dragX==null) return; var dx=e.clientX-dragX; if(Math.abs(dx)>4)dragMoved=true;
      selF=dragSelF-dx/dragStep;
      var now=performance.now(), dt=now-lastT;
      if(dt>0){ var inst=(selF-lastSelF)/(dt/16); vel=vel*0.6+inst*0.4; lastSelF=selF; lastT=now; }
      renderDial();
    });
    function endDrag(){
      if(dragX==null) return; dragX=null;
      if(reduce){ sel=Math.round(selF); selF=sel; vel=0; renderDial(); return; }
      var v=Math.max(-1.2,Math.min(1.2,vel)), base=Math.round(selF);
      var tgt=Math.round(selF+v*6); tgt=Math.max(base-4,Math.min(base+4,tgt));
      sel=tgt; startDialAnim();
    }
    dialStage.addEventListener("pointerup", endDrag);
    dialStage.addEventListener("pointercancel", endDrag);
    dialStage.addEventListener("click", function(e){
      var b=e.target.closest(".eiv-dslot"); if(!b) return;
      if(dragMoved){ dragMoved=false; return; }
      var off=+b.dataset.off, tgt=Math.round(selF)+off;
      if(off===0 && Math.abs(selF-Math.round(selF))<0.08) openDetail(idxOf(tgt)); else setSel(tgt);
    });
    dial.addEventListener("wheel", function(e){ if(Math.abs(e.deltaX)>Math.abs(e.deltaY) && Math.abs(e.deltaX)>4){ e.preventDefault(); rotate(e.deltaX>0?1:-1); } }, {passive:false});

    // identidad
    function openCurrent(){ openDetail(idxOf(Math.round(selF))); }
    core.addEventListener("click", openCurrent);
    core.addEventListener("keydown", function(e){ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); openCurrent(); } });

    // arranque (el menú NO avanza solo: lo recorre el usuario)
    function boot(){ selF=0; sel=0; lastBase=null; renderDial(); }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ setTimeout(boot,30); }); else setTimeout(boot,60);

    var rt; window.addEventListener("resize", function(){ clearTimeout(rt); rt=setTimeout(function(){ idn.resize(); renderDial(); }, 150); });
    window.addEventListener("temachange", function(){
      var c=areaColor(P[idxOf(Math.round(selF))].area); idn.refreshColor(c);
      document.documentElement.style.setProperty("--acc",c); mount.style.setProperty("--acc",c); renderDial();
    });
  }

  window.render = function(lang){ init(lang); };
})();
