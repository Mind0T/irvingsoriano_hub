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
          live:"Abrir en vivo", repo:"Código", loading:"Cargando vista en vivo…",
          role:"Mi rol", preview:"Vista", about:"De qué va", high:"Lo que hice", tech:"Herramientas",
          nolive:"Visualización del análisis" },
    en: { titulo:"Irving Soriano", subtitulo:"Data Scientist", hint:"Open project",
          open:"View project",
          live:"Open live", repo:"Code", loading:"Loading live view…",
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
        '<div class="eiv-core" id="eivCore" role="button" tabindex="0" aria-label="'+tx.open+'">'+
          '<canvas id="eivCanvas"></canvas>'+
          '<span class="eiv-hint">'+tx.hint+'</span>'+
        '</div>'+
        '<div class="eiv-cta">'+
          '<button class="eiv-open" id="eivOpen">'+tx.open+' <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>'+
        '</div>'+
      '</section>'+
      '<nav class="eiv-menu" aria-label="Proyectos">'+
        '<button class="eiv-arrow" data-dir="-1" aria-label="Anterior"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button>'+
        '<div class="eiv-track-wrap"><ul class="eiv-track" id="eivTrack"></ul></div>'+
        '<button class="eiv-arrow" data-dir="1" aria-label="Siguiente"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>'+
      '</nav>'+
      '<div class="eiv-dial" id="eivDial" aria-hidden="true">'+
        '<svg class="eiv-dial-arc" viewBox="0 0 340 140" aria-hidden="true"><path id="eivDialArc" d=""/></svg>'+
        '<div class="eiv-dial-items" id="eivDialItems"></div>'+
        '<p class="eiv-dial-hint">'+(lang==="en"?"Swipe ← → · tap to open":"Desliza ← → · toca para abrir")+'</p>'+
      '</div>';

    var canvas = document.getElementById("eivCanvas");
    var idn = new Identity(canvas); idn.start();

    var core=document.getElementById("eivCore"), track=document.getElementById("eivTrack");

    // ---- menú infinito (3 juegos clonados) ----
    function chipHTML(p, idx) {
      return '<li class="eiv-item"><button class="eiv-chip" data-idx="'+idx+'" style="--c:'+areaColor(p.area)+'">'+
        '<span class="ic"><svg viewBox="0 0 24 24">'+(ICON[p.icon]||"")+'</svg></span>'+
        '<span class="nm">'+(p.sub?p.sub[lang]:p.nombre[lang])+'</span></button></li>';
    }
    var sets=3, html="";
    for (var s=0;s<sets;s++) for (var i=0;i<P.length;i++) html+=chipHTML(P[i], i);
    track.innerHTML = html;

    // ---- menú de media luna (vista de celular, estilo ORBI) ----
    var DCX=170, DCY=255, DR=205, dslots=[];
    function dialArc(){ var a=2.45*0.34, x1=(DCX-DR*Math.sin(a)).toFixed(1), x2=(DCX+DR*Math.sin(a)).toFixed(1), y=(DCY-DR*Math.cos(a)).toFixed(1); var p=mount.querySelector("#eivDialArc"); if(p) p.setAttribute("d","M"+x1+" "+y+" A"+DR+" "+DR+" 0 0 1 "+x2+" "+y); }
    function buildDial(){
      var host=mount.querySelector("#eivDialItems"); if(!host) return; host.innerHTML=""; dslots=[];
      for (var i=0;i<5;i++){ var b=document.createElement("button"); b.className="eiv-dslot"; b.type="button"; b.innerHTML='<span class="ic"><svg viewBox="0 0 24 24"></svg></span><span class="dl"></span>'; host.appendChild(b); dslots.push(b); }
      dialArc();
    }
    function updateDial(){
      if (!dslots.length || sel<0) return;
      for (var s2=0;s2<5;s2++){ var off=s2-2, idx=(((sel+off)%P.length)+P.length)%P.length, p=P[idx], th=off*0.34,
          x=DCX+DR*Math.sin(th), y=DCY-DR*Math.cos(th), b=dslots[s2];
        b.style.left=x.toFixed(1)+"px"; b.style.top=y.toFixed(1)+"px"; b.style.setProperty("--c", areaColor(p.area));
        b.dataset.idx=idx; b.classList.toggle("on", off===0); b.style.opacity = Math.abs(off)===2 ? ".5" : "1";
        b.querySelector(".ic svg").innerHTML = ICON[p.icon]||""; b.querySelector(".dl").textContent = off===0 ? (p.sub?p.sub[lang]:p.nombre[lang]) : "";
      }
    }

    var segW=0, pos=0, auto=!reduce, dragging=false, dragX=0, dragPos=0, moved=false;
    function measure(){
      var items=track.children, one=P.length;
      segW=0; for (var i=0;i<one;i++) segW += items[i].getBoundingClientRect().width + 12;
      wrap();
    }
    function wrap(){ if (segW>0) pos = ((pos % segW) + segW) % segW; }
    function applyTrack(){ track.style.transform = "translateX("+(-(segW+pos)).toFixed(1)+"px)"; }

    // ---- selección ----
    var sel=-1, paused=false, cycle=null;
    function markCurrent(idx){
      var chips=track.querySelectorAll(".eiv-chip");
      chips.forEach(function(c){ c.setAttribute("aria-current", String(+c.dataset.idx===idx)); });
    }
    function setSel(idx){
      if (idx<0||idx>=P.length) return;
      sel=idx; var p=P[idx], c=areaColor(p.area);
      document.documentElement.style.setProperty("--acc", c);
      mount.style.setProperty("--acc", c);
      idn.setColor(c); idn.pulse();
      markCurrent(idx); updateDial();
    }

    // ---- hoja de detalle ----
    var sheet=document.getElementById("eivSheet");
    function links(p) {
      var out="";
      var repos = p.repos || (p.repo?[{t:tx.repo,u:p.repo}]:[]);
      if (p.live) out+='<a class="eiv-link live" href="'+p.live+'" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>'+tx.live+'</a>';
      repos.forEach(function(r){
        out+='<a class="eiv-link" href="'+r.u+'" target="_blank" rel="noopener"><svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6A4.6 4.6 0 0 0 19 7.5 4.3 4.3 0 0 0 18.9 4S17.7 3.6 15 5.3a13 13 0 0 0-6 0C6.3 3.6 5.1 4 5.1 4A4.3 4.3 0 0 0 5 7.5 4.6 4.6 0 0 0 3.5 11c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V23"/></svg>'+(repos.length>1?r.t:tx.repo)+'</a>';
      });
      return out;
    }
    function preview(p) {
      if (p.preview.type==="live") {
        return '<div class="eiv-frame"><div class="load">'+tx.loading+'</div>'+
               '<iframe loading="lazy" src="'+p.preview.url+'" title="preview" sandbox="allow-scripts allow-same-origin allow-popups"></iframe></div>';
      }
      if (p.preview.type==="gallery") {
        return '<div class="eiv-shots">'+p.preview.shots.map(function(sh){
          return '<figure class="eiv-shot"><img src="'+sh.src+'" alt="" loading="lazy"><figcaption class="cap">'+sh.cap[lang]+'</figcaption></figure>';
        }).join("")+'</div>';
      }
      return '<div class="eiv-viz" style="color:'+areaColor(p.area)+'">'+viz(p.preview.viz, lang)+'</div>';
    }
    function openDetail(idx) {
      var p=P[idx], c=areaColor(p.area);
      sheet.style.setProperty("--c", c);
      sheet.querySelector(".eiv-panel").scrollTop=0;
      sheet.querySelector("#eivPanelInner").innerHTML =
        '<div class="eiv-ph">'+
          '<button class="eiv-close" id="eivClose" aria-label="Cerrar"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>'+
          '<span class="eiv-area"><span class="dot"></span>'+p.area.toUpperCase()+' · '+(p.lang||"")+'</span>'+
          '<h2>'+p.nombre[lang]+'</h2>'+
          '<p class="pf">“'+p.frase[lang]+'”</p>'+
          (p.rol?'<span class="eiv-rol"><span>'+tx.role+'</span> '+p.rol[lang]+'</span>':'')+
        '</div>'+
        '<div class="eiv-body">'+
          '<div class="eiv-sec"><h3>'+tx.preview+'</h3>'+preview(p)+'</div>'+
          '<div class="eiv-sec"><h3>'+tx.about+'</h3><p class="lead">'+p.resumen[lang]+'</p></div>'+
          '<div class="eiv-sec"><h3>'+tx.high+'</h3><ul class="eiv-hl">'+p.highlights[lang].map(function(h){return '<li>'+h+'</li>';}).join("")+'</ul></div>'+
          '<div class="eiv-sec"><h3>'+tx.tech+'</h3><div class="eiv-tech">'+p.tech.map(function(t){return '<span>'+t+'</span>';}).join("")+'</div></div>'+
          '<div class="eiv-links">'+links(p)+'</div>'+
        '</div>';
      // lazy iframe load indicator
      var fr=sheet.querySelector(".eiv-frame iframe");
      if (fr) fr.addEventListener("load", function(){ var l=sheet.querySelector(".eiv-frame .load"); if(l) l.style.display="none"; });
      sheet.classList.add("open"); document.body.style.overflow="hidden";
      paused=true;
      sheet.querySelector("#eivClose").addEventListener("click", closeDetail);
    }
    function closeDetail(){
      sheet.classList.remove("open"); document.body.style.overflow="";
      paused=false;
      setTimeout(function(){ var pi=sheet.querySelector("#eivPanelInner"); if(pi) pi.innerHTML=""; }, 300);
    }
    sheet.querySelector(".eiv-scrim").addEventListener("click", closeDetail);
    document.addEventListener("keydown", function(e){ if(e.key==="Escape" && sheet.classList.contains("open")) closeDetail(); });

    // ---- eventos del menú ----
    track.addEventListener("pointerdown", function(e){ dragging=true; moved=false; dragX=e.clientX; dragPos=pos; track.classList.add("drag"); track.setPointerCapture(e.pointerId); });
    track.addEventListener("pointermove", function(e){ if(!dragging) return; var dx=e.clientX-dragX; if(Math.abs(dx)>4) moved=true; pos=dragPos-dx; wrap(); applyTrack(); });
    track.addEventListener("pointerup", function(e){ dragging=false; track.classList.remove("drag"); });
    track.addEventListener("pointercancel", function(){ dragging=false; track.classList.remove("drag"); });
    track.addEventListener("click", function(e){
      var b=e.target.closest(".eiv-chip"); if(!b) return;
      if (moved){ e.preventDefault(); return; }
      var idx=+b.dataset.idx; setSel(idx, true); openDetail(idx);
    });
    track.addEventListener("pointerover", function(e){
      var b=e.target.closest(".eiv-chip"); if(!b) return;
      var idx=+b.dataset.idx; if(idx!==sel) setSel(idx, true);
    });
    track.addEventListener("focusin", function(e){
      var b=e.target.closest(".eiv-chip"); if(!b) return; setSel(+b.dataset.idx, true);
    });

    mount.querySelectorAll(".eiv-arrow").forEach(function(a){
      a.addEventListener("click", function(){
        var dir=+a.dataset.dir; var n=P.length;
        setSel((sel+dir+n)%n, true);
        pos += dir*(segW/P.length); wrap(); applyTrack();
      });
    });

    // ---- interacción del dial de media luna (móvil) ----
    buildDial();
    var dial=mount.querySelector("#eivDial"), ddx=null, dmoved=false;
    if (dial){
      dial.addEventListener("pointerdown", function(e){ ddx=e.clientX; dmoved=false; paused=true; });
      dial.addEventListener("pointermove", function(e){ if(ddx==null) return; var dx=e.clientX-ddx; if(Math.abs(dx)>42){ setSel((sel+(dx<0?1:-1)+P.length)%P.length, true); ddx=e.clientX; dmoved=true; } });
      dial.addEventListener("pointerup", function(){ ddx=null; setTimeout(function(){ if(!sheet.classList.contains("open")) paused=false; }, 3500); });
      dial.addEventListener("pointercancel", function(){ ddx=null; });
      dial.addEventListener("click", function(e){ var b=e.target.closest(".eiv-dslot"); if(!b) return; if(dmoved){ dmoved=false; return; } var idx=+b.dataset.idx; if(idx===sel) openDetail(idx); else setSel(idx, true); });
    }

    // identidad / CTA
    function openCurrent(){ if(sel<0) setSel(0,true); openDetail(sel<0?0:sel); }
    core.addEventListener("click", openCurrent);
    core.addEventListener("keydown", function(e){ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); openCurrent(); } });
    document.getElementById("eivOpen").addEventListener("click", openCurrent);

    // arranque (el menú NO avanza solo: lo recorre el usuario)
    function boot(){
      measure(); applyTrack(); setSel(0);
    }
    // esperar layout de fuentes/anchos
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ setTimeout(boot,30); }); else setTimeout(boot,60);

    // resize + tema
    var rt; window.addEventListener("resize", function(){ clearTimeout(rt); rt=setTimeout(function(){ idn.resize(); measure(); applyTrack(); }, 200); });
    window.addEventListener("temachange", function(){
      if (sel>=0){ var c=areaColor(P[sel].area); idn.refreshColor(c); document.documentElement.style.setProperty("--acc",c); mount.style.setProperty("--acc",c);
        // recolorear chips
        track.querySelectorAll(".eiv-chip").forEach(function(c2){ c2.style.setProperty("--c", areaColor(P[+c2.dataset.idx].area)); });
      }
    });
  }

  window.render = function(lang){ init(lang); };
})();
