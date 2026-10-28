# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

La dueña (adulta) y una persona en edad escolar de su entorno. Estudian por su cuenta: practican un idioma conversando en escenarios de la vida real y resuelven ejercicios de matemáticas con guía, a veces a partir de una foto del cuaderno. Lo abren tanto en el computador como en el celular. Más adelante podría compartirse con otras personas.

## Product Purpose

Un tutor con IA que enseña en vez de resolver: en idiomas, conversa dentro de un escenario y corrige cada turno; en matemáticas, guía con preguntas hasta que el estudiante llega solo a la respuesta. El éxito es practicar seguido y notar que se equivoca menos.

## Positioning

Idiomas es el uso principal. Lo que lo distingue: cada respuesta del personaje llega acompañada de corrección pedagógica en español (error, forma nativa, tip), y en matemáticas el método socrático es obligatorio (no da la respuesta salvo que el estudiante se rinda).

## Operating Context

- Se inicia en local con `iniciar.bat` o `node server.js` (http://localhost:3000).
- Usa Gemini 2.5 Flash con la clave de la persona (guardada en su navegador); sin clave funciona un modo demostración con respuestas fijas.
- Sesiones cortas: una conversación de roleplay, un ejercicio, un quiz de 4 preguntas.

## Capabilities and Constraints

- Cuatro secciones: Matemáticas (socrático, KaTeX, fotos), Idiomas (6 idiomas, 5 escenarios, panel de feedback), Quizzes (4 preguntas generadas), Logros (XP, rangos, racha, medallas).
- Servidor Node sin dependencias; frontend en HTML/CSS/JS sin compilación. Progreso en `localStorage` (claves `omni_tutor_*`), no se deben cambiar.
- Publicarlo para otros requerirá un host con Node (no GitHub Pages); sin decidir.

## Brand Commitments

- Nombre actual: OmniTutor IA.
- Referencias visuales elegidas por la dueña: Gliglish (https://gliglish.com/intl/es) y Praktika (https://start.praktika.ai/). Rechazó el estilo "correo aéreo" y el oscuro con neón original.
- Textos en español; tuteo.

## Evidence on Hand

- No hay usuarios reales, testimonios ni cifras. No se deben inventar.

## Product Principles

1. Enseñar, no resolver.
2. Corregir con amabilidad y en español claro.
3. Sirve a un adulto y a un escolar sin infantilizar al primero ni aburrir al segundo.
4. Funciona igual de bien en celular y en computador.
