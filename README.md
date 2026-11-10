# irvingsoriano.com · hub

Sitio personal de **Irvin Jair Soriano Rosales**: portafolio + herramientas en uso + cursos (próximamente).
Nace de la estética del tablero **Dame la Vida**: negros profundos, plata, Montserrat, fondo de partículas y el "camino" como elemento firma.

HTML + CSS + JavaScript puro, **sin build**. Multipágina.

## Estructura

```
index.html        Inicio (hero + herramientas + destacados)
proyectos.html    Proyectos (se arman desde data/proyectos.json, filtrables)
perfil.html       Perfil / sobre mí
formacion.html    Formación (camino) + certificaciones
herramientas.html Tablero y plataforma de estudio, en uso
cursos.html       Cursos y contenido · próximamente
css/sistema.css   Sistema de diseño (tokens y componentes del tablero)
js/fondo.js       Fondo animado (partículas + cometas). Reutilizable en el estudio.
js/sitio.js       Header + nav + footer compartidos, idioma ES/EN, menú móvil
data/proyectos.json   Lista de proyectos (tú curas el texto; la Action refresca lo demás)
scripts/sync_repos.mjs   Lee la API de GitHub y actualiza proyectos.json
.github/workflows/repos.yml   Corre el script a diario
```

## Dominio y subdominios (Vercel)

- `irvingsoriano.com` → este repo.
- `tablero.irvingsoriano.com` → repo `tablero-irvin`.
- `estudio.irvingsoriano.com` → la plataforma de estudio.

Cada uno es su propio proyecto en Vercel; los subdominios se agregan en **Project → Settings → Domains**.

## Agregar o editar un proyecto

Edita `data/proyectos.json`. Tú controlas `nombre`, `area` (`tool`/`data`/`ux`/`web`/`foto`),
`es`, `en`, `destacado` (sale en Inicio) y `estado` (`wip` = en construcción).
El `lenguaje` y la `fecha` los refresca sola la GitHub Action desde tus repos.

Para refrescar a mano: `node scripts/sync_repos.mjs`.

## Idioma

ES por defecto, con interruptor ES/EN en el encabezado (se recuerda en el navegador).

## Correr en local

```bash
python3 -m http.server 8000   # y abre http://localhost:8000
```
