# Reglas del proyecto: OmniTutor

Este archivo lo leen los agentes que trabajan en el proyecto (Antigravity, Claude Code u otros). Léelo antes de cambiar cualquier cosa.

## Qué es

Tutor con IA para practicar idiomas (uso principal) y matemáticas. Servidor Node sin dependencias (`server.js`) que sirve `public/` y llama a Gemini 2.5 Flash; sin clave funciona en modo demostración. Producto y público en [PRODUCT.md](PRODUCT.md).

- Se inicia con `iniciar.bat` o `node server.js` → http://localhost:3000
- Sin compilación: HTML, CSS y JavaScript tal cual. No agregues npm, bundlers ni frameworks sin que la dueña lo pida.

## Dónde está cada cosa

| Archivo | Qué contiene |
|---|---|
| `server.js` | Servidor, rutas `/api/chat`, `/api/quiz`, `/api/status`, prompts del sistema y respuestas de demostración. |
| `public/index.html` | Estructura: riel lateral (pestañas + racha/XP + Conexión), las 4 secciones y el modal de conexión. Íconos SVG como `<symbol>` al inicio del `<body>`. |
| `public/style.css` | Todo el diseño. Colores y tamaños en variables de `:root`. |
| `public/app.js` | Lógica: chat, escenarios y matasellos, correcciones, quizzes, logros, XP y racha. |
| `PRODUCT.md` | Para quién es y qué hace. |
| `.impeccable/surfaces/public-index-html.md` | Contrato de diseño "Correo aéreo". |

## Diseño: claro y amable, como Gliglish y Praktika

La dueña eligió como referencia https://gliglish.com/intl/es y https://start.praktika.ai/. Detalles en [DESIGN.md](DESIGN.md). Respeta:

- **Fondo** gris muy claro (`--bg`), tarjetas y burbujas blancas, bordes grises de 1 px.
- **Índigo (`--brand`, #4f46e5)** para marca, pestaña activa, mensajes del estudiante y botones.
- **Verde y rojo solo para bien / mal** (corrección y quiz).
- **Tipografía:** Inter (Google Fonts).
- **Forma:** esquinas redondeadas (10–20 px), chips y botón de enviar redondos.
- **Tutores con cara:** cada personaje tiene avatar de DiceBear (`avatarUrl()` en `app.js`). Banderas de `flag-icons` (`flagUrl()`).
- **Idiomas en dos pasos:** primero banderas + situaciones (`#lang-picker`), luego el chat (`#lang-chat`). Los `<select>` ocultos `#lang-select` y `#scenario-select` guardan la elección; no los borres.
- **La corrección va debajo de la frase del estudiante** (`renderLiveFeedback`).
- **Videollamada:**
  - El avatar es 3D, con [TalkingHead](https://github.com/met4citizen/TalkingHead) 1.7.0 y three.js, y vive en `public/avatar3d.js`.
    - Los modelos están en `public/avatars/` (`avaturn.glb` para mujeres y `avatarsdk.glb` para hombres). Su licencia es de uso no comercial: si el proyecto se vuelve comercial, hay que reemplazarlos.
    - Los labios se mueven palabra por palabra con la voz del navegador (`lipSync` en `app.js`).
    - Si el 3D no carga, se ve el avatar 2D de respaldo.
  - Sin IA conectada, la llamada sigue guiones con 3 respuestas sugeridas por pregunta:
    - El nivel 1 está en `public/dialogues.js` y los niveles 2 y 3 en `public/dialogues-levels.js`.
    - En los niveles 2 y 3 la traducción y las respuestas solo aparecen si la persona toca "Sugerir respuestas".
    - Al terminar una situación se ofrece la siguiente sin colgar. Al completar las 5 situaciones se sube de nivel.
    - El progreso se guarda en `omni_tutor_call_progress`.
  - Pronunciación: si lo que dice por micrófono se parece a una respuesta pero no lo suficiente, el tutor dice qué palabra no se entendió y la hace repetir hasta que se parezca. Está en `startDrill` y `handleDrill`, con umbral `PRONUNCIATION_OK`.
  - Matemáticas sin IA: `public/math-coach.js` tiene los ejercicios por pasos en 3 niveles.
    - Revisa el número o la idea de cada respuesta. Si falla, da una pista; si vuelve a fallar, explica y avanza.
    - Lo usan el chat de Matemáticas y la videollamada. El progreso se guarda en `omni_tutor_math_progress`.
    - Si la respuesta no corresponde, el tutor lo dice y da opciones. Al segundo intento muestra cómo se dice y avanza.
    - Nunca repite la misma pregunta en bucle.
  - Voz:
    - Si hay clave de Azure Speech (Configuración, o `AZURE_SPEECH_KEY` y `AZURE_SPEECH_REGION` en `.env`), `server.js` pide el audio en `/api/tts` y `app.js` lo reproduce (`speakAzure`).
      - Las voces son las mismas de Edge: tabla `AZURE_VOICES`, mujer o hombre según el personaje.
      - Las voces "Multilingual" también dicen el español con el mismo timbre.
      - Si Azure falla, la app vuelve sola a la voz del navegador.
    - Sin Azure, las voces del navegador se eligen en `pickVoice`: primero el mismo género que el personaje, después las "Natural", "Online" o "Multilingual".
    - Para callar cualquier voz se usa siempre `stopSpeech()`.
  - El avatar 2D de respaldo se anima alternando cuadros del mismo personaje (`avatarFrameUrl`, `mountLiveAvatar`, `setTalking`).
  - La voz va con `speakSequence`: el español se dice con voz en español y las frases del idioma meta con su voz. Nunca mezcles las dos en una sola frase.
  - Los subtítulos y las respuestas sugeridas van en filas separadas, sin `position: absolute` encima del video.
  - El tutor guarda su propia historia (`callHistory`) para que la conversación avance.
- **Íconos:** solo los SVG de `index.html` (`<svg class="ico"><use href="#i-…"/></svg>`).

**Prohibido:** emojis como íconos, fondos oscuros con neón, degradados en texto, efecto vidrio, bordes gruesos de color a un lado de tarjetas.

## Reglas al cambiar código

1. No cambies los `id` del HTML: `app.js` depende de ellos.
2. No cambies las claves de `localStorage` (`omni_tutor_*`): se perdería el progreso.
3. Textos en español, tuteo, frases cortas. Los botones dicen lo que hacen.
4. Texto que venga del usuario va con `esc()` antes de meterlo en HTML.
5. Revisa en computador (1440 px) y en celular (390 px). En celular las pestañas van abajo y la corrección queda debajo del chat.
6. Respeta "reducir movimiento": las animaciones ya se apagan con `prefers-reduced-motion`.
