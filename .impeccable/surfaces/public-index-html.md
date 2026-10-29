---
version: 1
slug: "public-index-html"
primary_target: "public/index.html"
related_targets: ["public/style.css","public/app.js"]
---

# OmniTutor — app (public/index.html)

Scope: toda la app de una página (Idiomas, Matemáticas, Quizzes, Logros, ajustes). Modo: Operate.
Audiencia: el dueño (adulto) y una persona en edad escolar; computador y celular. Tarea principal: conversar en un escenario de idioma y leer la corrección de cada turno. Restricciones: mismos IDs y comportamiento de app.js, claves `omni_tutor_*` intactas, sin compilación.

## Direction contract

THESIS: Practicar un idioma como cartearse con alguien de otro país; cada sesión queda sellada. Rechaza el tablero oscuro con degradados neón y emojis que trae toda app de "tutor IA".

OWN-WORLD: Fondo azul aerograma pálido (#e3ebf4), riel lateral azul correo (#1d3b8f) con borde de chevrones rojo/azul de sobre por avión, tinta azul noche (#13213f), rojo correo (#c42f27) solo para correcciones, colores de estampilla por sección: Idiomas azul (#1d3b8f), Matemáticas verde (#2b7148), Quizzes mostaza (#8a5d06), Logros ciruela (#6a3a8c). Archivo (ancho variable) para todo; números de estampilla en ancho condensado. Esquinas de 4 px, filetes de 1 px, íconos SVG de trazo propio.

STORY: Entras, ves en qué escenario estás y quién te habla, escribes, y a la derecha aparece la corrección en tres bloques: error (tachado en rojo → forma correcta), cómo lo diría un nativo, consejo. Cada logro es una estampilla perforada con su valor en XP.

FIRST VIEWPORT: Escritorio: riel izquierdo (240 px) con marca, 4 secciones con su color de estampilla y la racha/XP abajo; centro el chat del escenario con matasellos circular (ciudad + fecha) en el encabezado y los selectores de idioma y escenario; derecha panel blanco de corrección. Celular: barra superior compacta, pestañas abajo, corrección bajo el último mensaje.

FORM: Correo aéreo (aerogramas, estampillas y matasellos), candidato 7 de 7. seed:58ebd3cbe2431b94
Raises: color pleno por sección (de acetato); escala tipográfica de cuatro tamaños (de líneas de emisión); rojo solo para correcciones (de orientación); retícula única de 8 px (de Crouwel).
Signature move: el matasellos del escenario que se re-estampa (rotación + tinta) al cambiar de escenario, y las medallas como estampillas perforadas.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
