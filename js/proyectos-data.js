/* ============================================================
   Modelo de datos del home "Eivind" — todos los proyectos.
   Cada proyecto trae: identidad, frase hablada, descripción rica,
   highlights, tech, enlaces (repo/live) e info de preview.
   Iconos SVG custom por proyecto (trazo, hereda currentColor).
   ============================================================ */
(function () {
  var GH = "https://github.com/";

  // --- iconos: contenido interno de un <svg viewBox="0 0 24 24"> ---
  var ICON = {
    tablero: '<rect x="3" y="4" width="5" height="16" rx="1.2"/><rect x="9.5" y="4" width="5" height="11" rx="1.2"/><rect x="16" y="4" width="5" height="14" rx="1.2"/>',
    estudio: '<path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4z"/><path d="M6 10.5V15c0 1.4 2.7 2.8 6 2.8s6-1.4 6-2.8v-4.5"/><path d="M21.5 8.5v5"/>',
    orbital: '<circle cx="12" cy="9.5" r="3.4"/><path d="M8.6 12.3C6.5 13 5 14.2 5 15.7 5 17.9 8.1 19.5 12 19.5s7-1.6 7-3.8c0-1.5-1.5-2.7-3.6-3.4"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(28 12 12)" opacity=".5"/>',
    timeline: '<path d="M3 12h18"/><circle cx="6.5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="17.5" cy="12" r="2"/><path d="M6.5 10V6M12 14v4M17.5 10V7"/>',
    uiux: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M3 8h18"/><path d="m13 13 3.5 5.5 1.3-2.4 2.6-.5L13 13z"/>',
    board: '<rect x="3.5" y="4" width="17" height="16" rx="2"/><path d="M3.5 9h17"/><circle cx="7" cy="6.5" r="0.6"/><path d="M7 12.5h4M7 15.5h7"/>',
    ml: '<circle cx="6" cy="7" r="2"/><circle cx="6" cy="17" r="2"/><circle cx="18" cy="12" r="2.3"/><path d="M8 7.6 15.7 11M8 16.4 15.7 13M12 5.5c2.4-1.8 4-1 4-1M12 18.5c2.4 1.8 4 1 4 1"/>',
    eda: '<path d="M4 20V5"/><path d="M4 20h16"/><path d="M7 16l3.5-4 3 2.5L20 7"/><circle cx="20" cy="7" r="1.4"/>',
    store: '<path d="M5 8h14l-1 11.5a1 1 0 0 1-1 .9H7a1 1 0 0 1-1-.9L5 8z"/><path d="M8.5 8V6.3a3.5 3.5 0 0 1 7 0V8"/>',
    street: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7l1.4-2.3a1 1 0 0 1 .9-.5h3.4a1 1 0 0 1 .9.5L16 7"/><circle cx="12" cy="13.3" r="3.3"/>',
    aperture: '<circle cx="12" cy="12" r="8.4"/><path d="M12 3.6 8.3 9.8M20 9.3 12.8 9.4M18.3 18 14.7 11.7M6 20.1 11.2 14.6M3.1 10.5l6.9 1.3M8.9 3.9l3.5 6"/>',
    popcorn: '<path d="M7 9h10l-1 11H8L7 9z"/><path d="M6.6 9a2.1 2.1 0 1 1 1.3-3.6A2.3 2.3 0 0 1 12 4.3a2.3 2.3 0 0 1 4.1 1.1A2.1 2.1 0 1 1 17.4 9"/><path d="M10.2 9l.5 11M13.8 9l-.5 11"/>'
  };

  var P = [
    {
      id:"tablero-irvin", area:"tool", icon:"tablero",
      nombre:{es:"Gestor de actividades y productividad", en:"Activity & productivity manager"},
      sub:{es:"Mi tablero de escuela y vida", en:"My school-and-life board"},
      objetivo:{es:"Centralizar en un solo lugar todo lo que tengo que hacer —escuela, certificaciones, hábitos y vida— para no depender de la memoria ni de varias apps sueltas.",
                en:"Bring everything I have to do —school, certifications, habits and life— into a single place, so I don't rely on memory or a handful of scattered apps."},
      necesidad:{es:"Como estudiante con muchos frentes a la vez, necesitaba dejar de perder entregas y hábitos entre herramientas dispersas. El tablero junta tareas, calendario y recordatorios, se sincroniza con Google Calendar y me avisa por WhatsApp antes de que algo se me pase.",
                 en:"As a student juggling many fronts at once, I needed to stop losing deadlines and habits across scattered tools. The board unifies tasks, calendar and reminders, syncs with Google Calendar and pings me on WhatsApp before anything slips."},
      lang:"HTML", repo:GH+"Mind0T/tablero-irvin", live:"https://tablero.irvingsoriano.com",
      frase:{es:"El tablero con el que le gano el pulso a la escuela y a la vida.",
             en:"The board I use to stay on top of school and life."},
      resumen:{es:"Un tablero personal que junta kanban, calendario, recordatorios por WhatsApp y sincronización con Google Calendar; además, una vista de caminos que mide mi progreso por materia, certificación y hábito.",
               en:"A personal board that brings together kanban, calendar, WhatsApp reminders and Google Calendar sync — plus a roads view that tracks my progress by subject, certification and habit."},
      highlights:{es:["Kanban + calendario + recordatorios en un solo lugar","Sync real con Google Calendar y avisos por WhatsApp","Vista de 'caminos' con progreso por materia y hábito"],
                  en:["Kanban + calendar + reminders in one place","Real Google Calendar sync and WhatsApp alerts","A 'roads' view with progress by subject and habit"]},
      tech:["HTML","JavaScript","Google Sheets","Apps Script","Vercel"],
      // tablero real (privado por contraseña); se muestra como carrusel de capturas
      preview:{type:"carousel", shots:[
        {src:"assets/proyectos/tablero-calendario.jpg", cap:{es:"Vista semanal del calendario: clases, deporte, hábitos y pagos.", en:"Weekly calendar view: classes, sport, habits and payments."}},
        {src:"assets/proyectos/tablero-kanban.jpg", cap:{es:"Tablero kanban de desarrollo profesional, con progreso por tarjeta.", en:"Professional-development kanban board, with progress per card."}}
      ]}
    },
    {
      id:"estudio", area:"tool", icon:"estudio",
      nombre:{es:"Plataforma de Estudio · Learning Zone", en:"Study Platform · Learning Zone"},
      sub:{es:"Algoritmos que cobran vida", en:"Algorithms that come alive"},
      objetivo:{es:"Ofrecer una plataforma de estudio tipo W3Schools con lectura centrada, celdas de código ejecutables en el navegador y un quiz por tema, para aprender practicando sin instalar nada.",
                en:"Offer a W3Schools-style study platform with focused reading, code cells you run right in the browser and a quiz per topic, so you learn by doing without installing anything."},
      necesidad:{es:"Los recursos de programación suelen separar la teoría de la práctica. La Learning Zone resuelve eso: el código corre en la misma página y cada tema se refuerza con un quiz, reproduciendo los notebooks del curso completos, celda por celda.",
                 en:"Programming resources usually split theory from practice. The Learning Zone fixes that: code runs on the same page and every topic is reinforced with a quiz, reproducing the course notebooks in full, cell by cell."},
      lang:"JavaScript", repo:GH+"Mind0T/Entreno-code", live:"https://estudio.irvingsoriano.com",
      frase:{es:"Mi salón hecho a mano: algoritmos que cobran vida con animaciones.",
             en:"My handmade classroom: algorithms that come alive with animations."},
      resumen:{es:"Un sitio para estudiar algoritmos y estructuras de datos con animaciones SVG y pruebas de escritorio que siguen el código C línea por línea: pila, heap y apuntadores. Diseñado como una zona de aprendizaje que irá creciendo a más lenguajes.",
               en:"A site to study algorithms and data structures with SVG animations and desktop traces that follow C code line by line: stack, heap and pointers. Built as a learning zone that will grow to more languages."},
      highlights:{es:["Animaciones SVG paso a paso de cada estructura","Prueba de escritorio que sigue el código C línea por línea","Menú reactivo por categorías: Programación, Diseño y Nube"],
                  en:["Step-by-step SVG animations for each structure","Desktop trace following C code line by line","Reactive menu by category: Programming, Design and Cloud"]},
      tech:["JavaScript","SVG","Canvas","Vercel"],
      preview:{type:"live", url:"https://estudio.irvingsoriano.com"}
    },
    {
      id:"orbital", area:"ux", icon:"orbital", destacado:true,
      nombre:{es:"ORBITAL · NASA Space Apps", en:"ORBITAL · NASA Space Apps"},
      sub:{es:"Monitoreo de salud de astronautas", en:"Astronaut health monitoring"},
      objetivo:{es:"Diseñar un software local de monitoreo de salud para astronautas que se entienda de un vistazo y solo alerte cuando algo cambia, dentro del reto 'Health Monitoring Software for Astronauts' del NASA Space Apps.",
                en:"Design a local astronaut health-monitoring software you grasp at a glance that only alerts when something changes, within the NASA Space Apps 'Health Monitoring Software for Astronauts' challenge."},
      necesidad:{es:"En una misión, la sobrecarga de datos puede ocultar lo importante. ORBI reduce el ruido a una identidad calmada que comunica el estado de salud sin saturar a la tripulación, y funciona sin internet.",
                 en:"On a mission, data overload can hide what matters. ORBI cuts the noise down to a calm identity that conveys health status without overwhelming the crew, and works with no internet."},
      lang:"UX/UI · Design Thinking",
      repos:[
        {t:{es:"Repositorio frontend", en:"Frontend repo"}, u:GH+"Mind0T/Space-Challenge-Front"},
        {t:{es:"Repositorio backend", en:"Backend repo"}, u:GH+"Taquit/Space-Challenge"},
        {t:{es:"Design kit", en:"Design kit"}, u:GH+"Mind0T/Space_app_design"}
      ],
      live:"https://spaceappdesign.vercel.app/proyecto.html",
      liveLabel:{es:"Proyecto en vivo (ideación)", en:"Live project (ideation)"},
      deploys:[{t:{es:"Front en vivo (ORBI)", en:"Live front (ORBI)"}, u:"https://space-challenge-front.vercel.app"}],
      rol:{es:"UX/UI Designer & Design Thinker", en:"UX/UI Designer & Design Thinker"},
      frase:{es:"En el reto de la NASA diseñé la calma: salud de astronautas que se entiende de un vistazo.",
             en:"At the NASA challenge I designed calm: astronaut health you grasp at a glance."},
      resumen:{es:"Reto 'Health Monitoring Software for Astronauts' del NASA Space Apps Challenge CDMX 2026, con el equipo Tacos de Asada. Mi rol fue UX/UI designer y design thinker: corrí las fases de empatizar y definir, construí el persona de la astronauta Katya, el journey map y la figura humana clicable, y diseñé ORBI — una identidad calmada que solo habla cuando algo cambia. Software local, sin internet.",
               en:"The 'Health Monitoring Software for Astronauts' challenge at NASA Space Apps Challenge CDMX 2026, with team Tacos de Asada. My role was UX/UI designer and design thinker: I ran the empathize and define phases, built astronaut Katya's persona, the journey map and the clickable human figure, and designed ORBI — a calm identity that only speaks when something changes. Local software, no internet."},
      highlights:{es:["Reframe del reto: de monitorear indicadores a la autoevaluación del astronauta","Persona, empathy map y journey map (antes / durante / después)","ORBI: identidad que cambia de color y solo avisa cuando algo importa","Diseño de UI/UX y frontend, conectado al backend real"],
                  en:["Reframed the challenge: from tracking metrics to astronaut self-assessment","Persona, empathy map and journey map (before / during / after)","ORBI: an identity that shifts color and speaks only when it matters","UI/UX and frontend design, wired to the real backend"]},
      tech:["Figma","Claude Design","Design Thinking","React","UX Research"],
      preview:{type:"live", frames:[
        {url:"https://spaceappdesign.vercel.app/proyecto.html", cap:{es:"Ideación: aterrizar el problema, la solución y el mapa de empatía.", en:"Ideation: framing the problem, the solution and the empathy map."}},
        {url:"https://space-challenge-front.vercel.app", cap:{es:"El frontend en vivo: la interfaz ORBI.", en:"The live frontend: the ORBI interface."}}
      ]}
    },
    {
      id:"linea-tiempo", area:"ux", icon:"timeline",
      nombre:{es:"Línea de tiempo · Computación", en:"Timeline · Computing"},
      sub:{es:"La historia, hito por hito", en:"History, milestone by milestone"},
      objetivo:{es:"Contar la evolución de la computación como un recorrido visual e interactivo, hito por hito, por generaciones, hardware, arquitectura y programación.",
                en:"Tell the evolution of computing as a visual, interactive journey —milestone by milestone— across generations, hardware, architecture and programming."},
      necesidad:{es:"La historia de la computación suele enseñarse como una lista de fechas. Esta línea de tiempo la vuelve navegable, con contexto en cada hito, y sirve de material de apoyo para estudiantes.",
                 en:"Computing history is usually taught as a list of dates. This timeline makes it navigable, with context at each milestone, and works as support material for students."},
      lang:"JavaScript", repo:GH+"Mind0T/linea_tiempo_computacion-1am1", live:"https://linea-tiempo-computacion-1am1.vercel.app/",
      frase:{es:"Un paseo por la historia de la computación, hito por hito.",
             en:"A walk through the history of computing, milestone by milestone."},
      resumen:{es:"Línea de tiempo interactiva de la evolución de la computación: un camino con hitos por generación, hardware, arquitectura y programación. Es la raíz visual de los 'caminos' que hoy uso en mi tablero.",
               en:"An interactive timeline of computing's evolution: a path with milestones by generation, hardware, architecture and programming. It's the visual root of the 'roads' I now use in my board."},
      highlights:{es:["Recorrido visual por generaciones y arquitecturas","Hitos clicables con contexto histórico","Origen del lenguaje de 'caminos' del tablero"],
                  en:["A visual journey through generations and architectures","Clickable milestones with historical context","Origin of the board's 'roads' language"]},
      tech:["JavaScript","CSS","Vercel"],
      preview:{type:"live", url:"https://linea-tiempo-computacion-1am1.vercel.app/"}
    },
    {
      id:"awsscd-ui", area:"ux", icon:"uiux",
      nombre:{es:"AWS Student Community Day · UI/UX", en:"AWS Student Community Day · UI/UX"},
      sub:{es:"La cara del evento", en:"The face of the event"},
      objetivo:{es:"Diseñar la identidad visual y la experiencia de la web oficial del AWS Student Community Day CDMX 2026, de principio a fin.",
                en:"Design the visual identity and experience of the official AWS Student Community Day CDMX 2026 website, end to end."},
      necesidad:{es:"Un evento de comunidad necesita un sitio donde los asistentes encuentren agenda, ponentes y registro sin fricción. Resolví esa experiencia con una arquitectura de información clara y un maquetado responsivo.",
                 en:"A community event needs a site where attendees find the agenda, speakers and registration without friction. I solved that experience with clear information architecture and a responsive layout."},
      lang:"Python", repo:GH+"Mind0T/awsscd_page_UI_UX", live:"https://studentcommunitydaymexico.com",
      frase:{es:"La cara del AWS Student Community Day: identidad y experiencia de principio a fin.",
             en:"The face of AWS Student Community Day: identity and experience end to end."},
      resumen:{es:"Interfaz y experiencia de la web oficial del AWS Student Community Day CDMX 2026: identidad visual, UX/UI y maquetado del evento, pensados para que la comunidad encuentre todo sin fricción.",
               en:"UI and experience for the official AWS Student Community Day CDMX 2026 website: visual identity, UX/UI and layout, built so the community finds everything without friction."},
      highlights:{es:["Identidad visual del evento de principio a fin","Diseño de UI/UX y arquitectura de información para asistentes","Maquetado y frontend responsivo del sitio oficial"],
                  en:["End-to-end visual identity for the event","UI/UX design and information architecture for attendees","Responsive layout and frontend of the official site"]},
      tech:["UX/UI","HTML","CSS","Python"],
      preview:{type:"live", url:"https://studentcommunitydaymexico.com"}
    },
    {
      id:"creativity-board-scd", area:"tool", icon:"board",
      nombre:{es:"Creativity Board · SCD + SBG", en:"Creativity Board · SCD + SBG"},
      sub:{es:"El origen de mi tablero", en:"Where my board began"},
      objetivo:{es:"Construir un kanban reutilizable que sirviera a dos comunidades (AWS SCD CDMX y SBG IPN) con branding propio para cada una, usando Google Sheets como backend sin servidor.",
                en:"Build a reusable kanban serving two communities (AWS SCD CDMX and SBG IPN), each with its own branding, using Google Sheets as a serverless backend."},
      necesidad:{es:"Dos equipos necesitaban organizar actividades sin pagar herramientas de gestión. Un mismo motor con dos marcas resolvió ambos casos y se volvió la semilla de mi tablero personal.",
                 en:"Two teams needed to organize activities without paying for management tools. One engine with two brands solved both cases and became the seed of my personal board."},
      lang:"HTML", repo:GH+"Mind0T/creativity-board-scd", live:"https://creativity-sbg-ipn.vercel.app/",
      frase:{es:"Dos comunidades, un mismo tablero: el origen de todo esto.",
             en:"Two communities, one board: where all of this began."},
      resumen:{es:"Un kanban que sirve dos tableros (AWS Student Community Day CDMX y SBG IPN) con branding distinto para cada uno, sobre Google Sheets + Apps Script + Vercel. Es la base del tablero personal que uso hoy.",
               en:"A kanban serving two boards (AWS Student Community Day CDMX and SBG IPN), each with its own branding, on Google Sheets + Apps Script + Vercel. It's the base of the personal board I use today."},
      highlights:{es:["Un mismo motor, dos marcas distintas","Google Sheets como backend sin servidor","Semilla del Gestor de actividades"],
                  en:["One engine, two distinct brands","Google Sheets as a serverless backend","The seed of the activity manager"]},
      tech:["HTML","JavaScript","Google Sheets","Apps Script"],
      // tablero del SBG/SCD (privado por contraseña); se muestra como carrusel de capturas
      preview:{type:"carousel", shots:[
        {src:"assets/proyectos/sbg-creativity.jpg", cap:{es:"Tablero del área de Creativity del AWS SBG IPN.", en:"Creativity area board of the AWS SBG IPN."}},
        {src:"assets/proyectos/scd-diseno.jpg", cap:{es:"Tablero de diseño del AWS Student Community Day CDMX 2026.", en:"Design board for AWS Student Community Day CDMX 2026."}}
      ]}
    },
    {
      id:"alura-telecom2", area:"data", icon:"ml",
      nombre:{es:"Telecom X · Predicción de churn (ML)", en:"Telecom X · Churn prediction (ML)"},
      sub:{es:"Enseñarle a predecir quién se va", en:"Teaching a model who will leave"},
      objetivo:{es:"Entrenar y comparar modelos que predigan la fuga de clientes (churn) y traducir sus resultados en acciones de retención.",
                en:"Train and compare models that predict customer churn and turn their results into retention actions."},
      necesidad:{es:"Retener a un cliente cuesta menos que captar uno nuevo. El modelo le permite a la empresa anticipar quién está por irse y actuar antes, priorizando por los factores que más pesan en la decisión.",
                 en:"Keeping a customer costs less than winning a new one. The model lets the company anticipate who is about to leave and act earlier, prioritizing by the factors that weigh most in the decision."},
      lang:"Jupyter Notebook", repo:GH+"Mind0T/challenge-aluraTelecom2-IrvinSoriano", live:"",
      frase:{es:"Aquí le enseño a una máquina a predecir quién se va a ir.",
             en:"Here I teach a machine to predict who's going to churn."},
      resumen:{es:"Un pipeline de machine learning para predecir la fuga de clientes: One-Hot Encoding, balanceo con SMOTE, Regresión Logística frente a Random Forest y una lectura de feature importance traducida a acciones de negocio.",
               en:"A machine-learning pipeline to predict customer churn: One-Hot Encoding, SMOTE balancing, Logistic Regression vs Random Forest, and feature importance turned into business actions."},
      highlights:{es:["Regresión Logística vs Random Forest comparadas","Balanceo de clases con SMOTE","Feature importance convertida en decisiones"],
                  en:["Logistic Regression vs Random Forest compared","Class balancing with SMOTE","Feature importance turned into decisions"]},
      tech:["Python","scikit-learn","pandas","SMOTE"],
      preview:{type:"data", viz:"ml"}
    },
    {
      id:"alura-telecom1", area:"data", icon:"eda",
      nombre:{es:"Telecom X · Churn (EDA)", en:"Telecom X · Churn (EDA)"},
      sub:{es:"Por qué los clientes dicen adiós", en:"Why customers say goodbye"},
      objetivo:{es:"Hacer el ETL y el análisis exploratorio del churn de una telecom para entender qué impulsa las cancelaciones, antes de modelar.",
                en:"Run the ETL and exploratory analysis of a telecom's churn to understand what drives cancellations, before modeling."},
      necesidad:{es:"Sin entender los datos no se puede modelar bien. Este análisis aplana y limpia el JSON crudo, construye variables útiles y deja hallazgos claros sobre los factores de cancelación que alimentan el modelo.",
                 en:"You can't model well without understanding the data. This analysis flattens and cleans the raw JSON, builds useful variables and leaves clear findings on the cancellation drivers that feed the model."},
      lang:"Jupyter Notebook", repo:GH+"Mind0T/challenge-aluraTelecom1-IrvinSoriano", live:"",
      frase:{es:"Detective de datos: encuentro por qué los clientes dicen adiós.",
             en:"A data detective: finding why customers say goodbye."},
      resumen:{es:"ETL y análisis exploratorio de la evasión de clientes de una telecom: aplanado de JSON anidado, limpieza, variables calculadas y hallazgos claros sobre qué impulsa las cancelaciones.",
               en:"ETL and exploratory analysis of telecom customer churn: flattening nested JSON, cleaning, derived variables and clear findings on what drives cancellations."},
      highlights:{es:["Aplanado de JSON anidado y limpieza","Variables calculadas para el análisis","Hallazgos sobre los factores de cancelación"],
                  en:["Nested-JSON flattening and cleaning","Derived variables for the analysis","Findings on the drivers of cancellation"]},
      tech:["Python","pandas","matplotlib","seaborn"],
      preview:{type:"data", viz:"churn"}
    },
    {
      id:"alura-store", area:"data", icon:"store",
      nombre:{es:"Challenge Alura · Store", en:"Alura Challenge · Store"},
      sub:{es:"Cuatro tiendas, una decisión", en:"Four stores, one decision"},
      objetivo:{es:"Analizar cuatro sucursales con datos de ventas y reseñas para recomendar, con evidencia, cuál conviene vender.",
                en:"Analyze four stores using sales and review data to recommend, with evidence, which one to sell."},
      necesidad:{es:"Una decisión de negocio con dinero de por medio no debería tomarse por corazonada. El análisis la sostiene con métricas comparables y visualizaciones que hacen evidente la respuesta.",
                 en:"A business decision with money on the line shouldn't be made on a hunch. The analysis backs it with comparable metrics and visuals that make the answer obvious."},
      lang:"Jupyter Notebook", repo:GH+"Mind0T/challenge-aluraStore-IrvinSoriano", live:"",
      frase:{es:"Cuatro tiendas, una decisión: los números cuentan la historia.",
             en:"Four stores, one decision: the numbers tell the story."},
      resumen:{es:"Reto de Alura LATAM: analizar cuatro sucursales para recomendar cuál vender. pandas, matplotlib y seaborn sobre datos de ventas, con métricas e insights que sostienen la decisión.",
               en:"An Alura LATAM challenge: analyze four stores to recommend which one to sell. pandas, matplotlib and seaborn over sales data, with metrics and insights backing the decision."},
      highlights:{es:["Comparativa de ingresos y reseñas por tienda","Visualizaciones para sostener la recomendación","Decisión final basada en evidencia"],
                  en:["Revenue and review comparison by store","Visuals that back the recommendation","A final, evidence-based decision"]},
      tech:["Python","pandas","matplotlib","seaborn"],
      preview:{type:"data", viz:"store"}
    },
    {
      id:"eivind-street", area:"web", icon:"street",
      nombre:{es:"Eivind Street", en:"Eivind Street"},
      sub:{es:"Mi mirada urbana", en:"My urban eye"},
      objetivo:{es:"Publicar un portafolio de fotografía documental y urbana de la CDMX bajo mi seudónimo Eivind, que cargue rápido y esté bien posicionado.",
                en:"Publish a documentary and urban photography portfolio of Mexico City under my pseudonym Eivind — fast-loading and well ranked."},
      necesidad:{es:"Un fotógrafo necesita una vitrina propia, no una red social: que cargue rápido y aparezca en buscadores. Lo resolví con vanilla JS optimizado para rendimiento (WPO) y SEO.",
                 en:"A photographer needs a storefront of their own, not a social network: one that loads fast and shows up in search. I solved it with vanilla JS tuned for performance (WPO) and SEO."},
      lang:"HTML", repo:GH+"Mind0T/eivindstreet", live:"https://www.eivindstreet.com/",
      frase:{es:"Mi mirada urbana: la Ciudad de México en fotografías.",
             en:"My urban eye: Mexico City in photographs."},
      resumen:{es:"Portafolio de fotografía documental y urbana de la CDMX (Iztapalapa, Jamaica, el Metro) y videografía, bajo mi seudónimo Eivind. Vanilla JS con foco en rendimiento y SEO.",
               en:"A portfolio of documentary and urban photography from Mexico City (Iztapalapa, Jamaica, the Metro) and videography, under my pseudonym Eivind. Vanilla JS focused on performance and SEO."},
      highlights:{es:["Fotografía documental y urbana de la CDMX","Vanilla JS optimizado para rendimiento y SEO","Mi seudónimo artístico: Eivind"],
                  en:["Documentary and urban photography of Mexico City","Vanilla JS optimized for performance and SEO","My artistic pseudonym: Eivind"]},
      tech:["HTML","JavaScript","SEO","WPO"],
      preview:{type:"live", url:"https://www.eivindstreet.com/"}
    },
    {
      id:"eivind-leso", area:"web", icon:"aperture",
      nombre:{es:"Eivind Leso", en:"Eivind Leso"},
      sub:{es:"Fotografía que vende", en:"Photography that sells"},
      objetivo:{es:"Mostrar mi trabajo de fotografía comercial, de producto, retrato y editorial en un portafolio pensado para atraer clientes.",
                en:"Showcase my commercial, product, portrait and editorial photography in a portfolio built to attract clients."},
      necesidad:{es:"El trabajo comercial se vende por la imagen. El sitio prioriza que las fotos se vean nítidas y carguen rápido en cualquier dispositivo, con lazy loading, imágenes responsivas y optimización de carga (WPO).",
                 en:"Commercial work sells on the image. The site prioritizes sharp photos that load fast on any device, with lazy loading, responsive images and load optimization (WPO)."},
      lang:"HTML", repo:GH+"Mind0T/EivindLeso", live:"https://www.eivindleso.com/",
      frase:{es:"Fotografía que vende: producto, retrato y editorial.",
             en:"Photography that sells: product, portrait and editorial."},
      resumen:{es:"Portafolio de fotografía comercial, editorial, de producto y retrato. Vanilla JS con lazy loading, imágenes responsivas y optimización de carga (WPO).",
               en:"A commercial, editorial, product and portrait photography portfolio. Vanilla JS with lazy loading, responsive images and load optimization (WPO)."},
      highlights:{es:["Producto, retrato y editorial","Lazy loading e imágenes responsivas","Optimización de carga (WPO)"],
                  en:["Product, portrait and editorial","Lazy loading and responsive images","Load optimization (WPO)"]},
      tech:["HTML","JavaScript","WPO"],
      preview:{type:"live", url:"https://www.eivindleso.com/"}
    },
    {
      id:"misspalomitas", area:"web", icon:"popcorn",
      nombre:{es:"MissPalomitas", en:"MissPalomitas"},
      sub:{es:"Palomitas gourmet", en:"Gourmet popcorn"},
      objetivo:{es:"Darle presencia web a la marca de palomitas gourmet Miss Palomitas, con un catálogo de sabores y la vitrina de la marca.",
                en:"Give the Miss Palomitas gourmet popcorn brand a web presence, with a flavor catalog and the brand's storefront."},
      necesidad:{es:"Una marca pequeña necesita un escaparate propio donde la gente vea los sabores y su identidad. El sitio de Miss Palomitas cumple esa función de catálogo y presentación.",
                 en:"A small brand needs a storefront of its own where people can see the flavors and its identity. The Miss Palomitas site serves that catalog-and-presentation role."},
      lang:"JavaScript", repo:GH+"Mind0T/MissPalomitas", live:"https://www.misspalomitas.com/",
      frase:{es:"Hasta las palomitas tienen su sitio: dulce, salado y picosito.",
             en:"Even popcorn gets its own site: sweet, salty and spicy."},
      resumen:{es:"Sitio web de la marca de palomitas gourmet Miss Palomitas: catálogo de sabores salados, dulces y picositos, y vitrina de la marca.",
               en:"Website for the Miss Palomitas gourmet popcorn brand: a catalog of savory, sweet and spicy flavors and the brand's storefront."},
      highlights:{es:["Catálogo de sabores por categoría","Vitrina de marca propia","Un proyecto con sabor"],
                  en:["Flavor catalog by category","A storefront for my own brand","A project with flavor"]},
      tech:["JavaScript","HTML","CSS"],
      preview:{type:"live", url:"https://www.misspalomitas.com/"}
    }
  ];

  window.EIVIND_ICON = ICON;
  window.EIVIND_PROY = P;
})();
