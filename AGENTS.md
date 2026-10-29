# Reglas del proyecto: OmniTutor

Este archivo lo leen los agentes que trabajan en el proyecto (Antigravity, Claude Code u otros). Léelo antes de cambiar cualquier cosa.

## Qué es

Tutor con IA para practicar idiomas (uso principal) y matemáticas. Servidor Node sin dependencias (`server.js`) que sirve `public/` y llama a Gemini 2.5 Flash; sin clave funciona en modo demostración. Producto y público en [PRODUCT.md](PRODUCT.md).

- Se inicia con `iniciar.bat` o `node server.js` → http://localhost:3000
- Sin compilación: HTML, CSS y JavaScript tal cual. No agregues npm, bundlers ni frameworks sin que el dueño lo pida.

## Dónde está cada cosa

| Archivo | Qué contiene |
|---|---|
| `server.js` | Servidor, rutas `/api/chat`, `/api/quiz`, `/api/status`, prompts del sistema y respuestas de demostración. |
| `public/index.html` | Estructura: riel lateral (pestañas + racha/XP + Conexión), las 4 secciones y el modal de conexión. Íconos SVG como `<symbol>` al inicio del `<body>`. |
| `public/style.css` | Todo el diseño. Colores y tamaños en variables de `:root`. |
| `public/app.js` | Lógica: chat, escenarios y matasellos, correcciones, quizzes, logros, XP y racha. |
| `PRODUCT.md` | Para quién es y qué hace. |
| `.impeccable/surfaces/public-index-html.md` | Contrato de diseño "Correo aéreo". |

## Diseño: premium claro (no "de escuela")

El dueño pidió que la app se vea de calidad, no escolar. Las referencias de partida fueron https://gliglish.com/intl/es y https://start.praktika.ai/. Detalles en [DESIGN.md](DESIGN.md). El bloque "Premium claro" al final de `style.css` manda sobre lo anterior. Respeta:

- **Fondo** casi blanco (`--bg` #fafafa), tarjetas blancas, bordes grises de 1 px y sombras muy suaves.
- **Tinta (`--ink`, #0a0a0b)** para la pestaña activa, los botones principales y el botón de enviar. El **índigo (`--brand`)** queda solo para acentos (logo, mensajes del estudiante).
- **Bandas de bienvenida en blanco** con texto en tinta, sin degradados de color. La portada (`#landing`) sí conserva su morado.
- **Verde y rojo solo para bien / mal** (corrección y quiz).
- **Tipografía:** Inter, con pesos 500–650; nada de 800 en la app.
- **Forma:** esquinas redondeadas (10–16 px), chips y botón de enviar redondos.
- **Tutores con personas reales:** `public/tutors.js` (`TUTOR_MEDIA`) dice qué video y foto de `public/tutors/` usa cada personaje, y dónde está su cara (`fx`, `fy`, `z`).
  - Por cada persona hay `nombre.mp4` (video corto), `nombre.jpg` (foto) y `nombre-cara.jpg` (cara recortada, 256 px).
  - Son videos de Pexels, de licencia libre (pexels.com/license); el número `pexels` es el id del video.
  - Los personajes de las situaciones nuevas reutilizan la cara de un tutor de otro idioma (`SAME_AS`), pero nunca se repite una cara dentro del mismo idioma.
  - `avatarUrl()` devuelve la foto de la cara y `createFace()` la foto con su video al hablar. Si un personaje no tiene foto, se usa el dibujo de DiceBear.
  - El Profe Yeison usa fuera de la llamada la foto del dueño (`photo: 'yeison-foto'`, clase `.face-photo`, que respira y asiente). Dentro de la llamada sigue con su video.
  - Para agregar una persona: baja la versión `sd_960_540` (o `sd_540_960`) de Pexels a `public/tutors/` y saca la foto y la cara.
- **Banderas de tela:** las banderas de `flag-icons` (`flagUrl()`) van dentro de `.flag-cloth`, que les da pliegues, brillo y movimiento.
- **Idiomas en dos pasos:** primero banderas + situaciones (`#lang-picker`), luego el chat (`#lang-chat`). Los `<select>` ocultos `#lang-select` y `#scenario-select` guardan la elección; no los borres.
- **La corrección va debajo de la frase del estudiante** (`renderLiveFeedback`).
- **Videollamada:**
  - Por defecto se ve el video de la persona real (`mountLiveAvatar` con `.live-real`). Corre mientras el tutor habla y se queda quieto mientras escucha (`setTalking`). Funciona en cualquier equipo.
    - Si un personaje no tiene video, se usa el dibujo animado de DiceBear (`avatarTraits()` usa peinados de mujer o de hombre según `FEMALE_NAMES`).
  - El 3D es opcional (Configuración, clave `omni_tutor_avatar3d`), porque en algunas tarjetas de video se ve incompleto.
  - El avatar 3D usa [TalkingHead](https://github.com/met4citizen/TalkingHead) 1.7.0 y three.js, y vive en `public/avatar3d.js`.
    - Los modelos están en `public/avatars/` (`avaturn.glb` para mujeres y `avatarsdk.glb` para hombres). Su licencia es de uso no comercial: si el proyecto se vuelve comercial, hay que reemplazarlos.
    - Los labios se mueven palabra por palabra con la voz del navegador (`lipSync` en `app.js`).
    - Si el 3D no carga, se ve el avatar 2D de respaldo.
    - `avatar3d.js` y three.js solo se descargan cuando el 3D está activado (`mountTutor` los agrega; la ruta con versión está en `<meta name="avatar3d-src">`). El importmap va en el `<head>`, antes de cualquier módulo.
  - Sin IA conectada, la llamada sigue guiones con 3 respuestas sugeridas por pregunta:
    - El nivel 1 está en `public/dialogues.js` y los niveles 2 y 3 en `public/dialogues-levels.js`.
    - Las situaciones restaurante, farmacia, tienda y transporte (con sus 3 niveles y sus tarjetas) están en `public/dialogues-more.js` (`MORE_SCENES`). Ese archivo se mezcla solo en `CALL_SCRIPTS` y `CALL_SCRIPTS_LEVELS`, y `app.js` las agrega al selector con su clave (`MORE_KEYS`).
    - En los niveles 2 y 3 la traducción y las respuestas solo aparecen si la persona toca "Sugerir respuestas".
    - Al terminar una situación se ofrece la siguiente sin colgar. Al completar 5 situaciones cualquiera de un nivel se sube de nivel (`LEVEL_GOAL`).
    - El progreso se guarda en `omni_tutor_call_progress`.
  - **Lecciones sin IA:** `public/lessons.js` (`LESSONS`) tiene 10 lecciones por idioma (5 de vocabulario y 5 de gramática), con frases para escuchar y un quiz de 4 preguntas.
    - Salen en el bloque "3. Lecciones" de Idiomas y se abren en `#lesson-modal`.
    - El mejor puntaje se guarda en `omni_tutor_lessons_done`.
  - Pronunciación: si lo que dice por micrófono se parece a una respuesta pero no lo suficiente, el tutor dice qué palabra no se entendió y la hace repetir hasta que se parezca. Está en `startDrill` y `handleDrill`, con umbral `PRONUNCIATION_OK`.
  - Matemáticas sin IA: `public/math-coach.js` tiene los ejercicios por pasos en 6 niveles: primaria, secundaria, geometría y lógica, y universidad (cálculo, estadística, álgebra lineal).
    - Las tarjetas de los niveles 1 a 3 están en `index.html`. Las de universidad las crea `app.js` y se ven con el filtro "Universidad".
    - Revisa el número o la idea de cada respuesta. Si falla, da una pista; si vuelve a fallar, explica y avanza.
    - Lo usan el chat de Matemáticas y la videollamada. El progreso se guarda en `omni_tutor_math_progress`.
    - Si la respuesta no corresponde, el tutor lo dice y da opciones. Al segundo intento muestra cómo se dice y avanza.
    - Nunca repite la misma pregunta en bucle.
  - Voz:
    - Si hay clave de Azure Speech (Configuración, o `AZURE_SPEECH_KEY` y `AZURE_SPEECH_REGION` en `.env`), `server.js` pide el audio en `/api/tts` y `app.js` lo reproduce (`speakAzure`).
      - Las voces son las mismas de Edge: tabla `AZURE_VOICES`, mujer o hombre según el personaje.
      - Las voces "Multilingual" también dicen el español con el mismo timbre.
      - Si Azure falla, la app vuelve sola a la voz del navegador.
    - Sin Azure, las voces del navegador se eligen en `pickVoice`:
      - Para el idioma del personaje: primero el mismo género que el personaje, después las "Natural", "Online" o "Multilingual".
      - Para el español: la voz que eligió la persona en Configuración y, si no eligió, **"Google español"** (decisión del dueño). A esa voz no se le cambia el tono.
    - El profe de matemáticas es hombre (modelo `M`).
    - En `avatar3d.js`, `fixDepth()` evita que el pelo se dibuje sobre la cara en algunas tarjetas de video.
    - Para callar cualquier voz se usa siempre `stopSpeech()`.
  - El avatar 2D de respaldo se anima alternando cuadros del mismo personaje (`avatarFrameUrl`, `mountLiveAvatar`, `setTalking`).
  - La voz va con `speakSequence`: el español se dice con voz en español y las frases del idioma meta con su voz. Nunca mezcles las dos en una sola frase.
  - Los subtítulos y las respuestas sugeridas van en filas separadas, sin `position: absolute` encima del video.
  - En la clase de matemáticas (`.videocall-stage.is-math`) la pizarra va arriba a la derecha, donde estaba la cámara del estudiante, y esa cámara pasa pequeña abajo, dentro del video del profe. En idiomas todo queda como antes.
  - El tutor guarda su propia historia (`callHistory`) para que la conversación avance.
- **Portada:** `#landing` en `index.html` con `landing.js` (tutores animados, aparición al hacer scroll y paso a la app).
  - Se muestra al abrir. Al entrar se guarda `omni_tutor_entered` en `sessionStorage`, y el logo de la app vuelve a la portada.
  - Las caras animadas salen de `createFace()` en `app.js` (`window.OmniFaces`).
  - Arriba hay un robot 3D de Spline que sigue el cursor (también en la bienvenida de Idiomas: `landing.js` mueve el mismo `<spline-viewer>` a `#app-robot-slot`, sin volver a descargarlo; se pausa cuando no se ve y dibuja a máximo 1.25 de resolución): `<spline-viewer>` (visor `@splinetool/viewer` 2.0.64 desde jsDelivr, sin React ni npm). La escena es `prod.spline.design/kZDDjO5HuC9GJUM2`, de una cuenta ajena: si deja de cargar, hay que cambiarla.
  - Al mover el cursor (o tocar en celular) salen banderitas que suben y se desvanecen (`#lp-trail`, `dropFlag` en `landing.js`). Con "reducir movimiento" no salen.
- **Versión de archivos:** los `?v=dev` de `index.html` los cambia el workflow de Pages por el commit, para que el navegador no use copias viejas. No los quites.
- **Acceso por invitación:** `public/gate.js` muestra la pantalla de código si `public/gate-config.js` tiene la URL del Apps Script (`acceso-gmail/`). El código llega al Gmail del dueño. Con la URL vacía, la página se abre sin código.
  - El equipo del administrador no pide código: abre una vez la página con `?llave=...` y queda guardada en `omni_tutor_owner_key`. En `gate-config.js` solo está la huella SHA-256 (`ACCESS_OWNER_HASH`); nunca subas la llave.
- **Íconos:** solo los SVG de `index.html` (`<svg class="ico"><use href="#i-…"/></svg>`).

**Prohibido:** emojis como íconos, fondos oscuros con neón, degradados en texto, efecto vidrio, bordes gruesos de color a un lado de tarjetas.

## Reglas al cambiar código

1. No cambies los `id` del HTML: `app.js` depende de ellos.
2. No cambies las claves de `localStorage` (`omni_tutor_*`): se perdería el progreso.
3. Textos en español, tuteo, frases cortas. Los botones dicen lo que hacen.
4. Texto que venga del usuario va con `esc()` antes de meterlo en HTML.
5. Revisa en computador (1440 px) y en celular (390 px). En celular las pestañas van abajo y la corrección queda debajo del chat.
6. Respeta "reducir movimiento": las animaciones ya se apagan con `prefers-reduced-motion`.

## Rendimiento y celular

- **Modo liviano:** `public/perf.js` se carga primero y decide si el equipo va en modo completo o liviano (clase `lite` en `<html>`).
  - La preferencia se elige en Configuración y se guarda en `omni_tutor_perf` (`auto`, `full` o `lite`).
  - En `auto` mira la memoria del equipo y el ahorro de datos. Si eso no basta, mide los cuadros por segundo al cargar (menos de 30 es liviano) y guarda el resultado en `sessionStorage`.
  - En modo liviano no se carga el robot 3D, las caras de las tarjetas no ponen video (solo asienten) y no salen banderas tras el cursor.
- **Acceso por invitación:** mientras se ve la pantalla del código no se dibuja la página (`.gate-locked`) ni se descarga el robot. El visor de Spline se carga desde `landing.js` (`<meta name="spline-viewer-src">`) después de `gate-open`.
- **Celular:** como no hay mouse, cada 3,5 s habla una de las caras que se ven en pantalla.
- **Voz en iPhone:**
  - El primer toque desbloquea la voz (`unlockSpeech`).
  - `cancelSynth` no cancela si no hay nada sonando.
  - Si la primera frase no arranca en 2,5 s, se repite con la voz del sistema.
  - El español nunca cambia de tono, porque suena a robot.
  - "Google español" no existe en iPhone; allá se usa la mejor voz instalada.
- **Voz del tutor en iPhone (audio normal):** en algunos iPhone la voz del navegador (`speechSynthesis`) dice que habla, pero no suena.
  - Por eso en iPhone el tutor habla con audio normal: `speakPhone` reproduce la voz de Google Traductor (`translate.googleapis.com/translate_tts?client=gtx`, sin clave) en un solo `<audio>` (`phoneAudio`).
  - Ese `<audio>` se desbloquea con el primer toque (`unlockSpeech`). Si falla, la app vuelve sola a `speakBrowser`.
  - Google solo responde si el pedido no lleva "Referer": por eso `index.html` tiene `<meta name="referrer" content="no-referrer">`. No lo quites.
  - El servicio acepta frases cortas: `phoneChunks` las parte en trozos de hasta 180 letras.
- **Micrófono en iPhone:** solo funciona en Safari, porque Apple no lo permite en Chrome. Si el dictado se corta con "aborted", se reintenta una vez.
  - La sesión de audio pasa a `play-and-record` mientras escucha y vuelve a `playback` al terminar, para que el tutor no suene por el auricular de llamadas.
- **Prueba de audio y micrófono:** está en Configuración. Con `?diagnostico` en la dirección se abre directo y muestra en pantalla qué responde el navegador.
