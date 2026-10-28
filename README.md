# ✨ OmniTutor IA — Agente Inteligente de Matemáticas e Idiomas

Un asistente pedagógico integral impulsado por Inteligencia Artificial diseñado con **enfoque socrático, visión multimodal, simulador de conversación y gamificación**.

---

## 🌟 Características Principales

### 1. 📐 Tutor Socrático de Matemáticas
- **Nunca te da la respuesta directa de golpe:** Formula preguntas guía paso a paso para que el estudiante desarrolle su pensamiento lógico.
- **Botones de asistencia inmediata:** *💡 Dame una pista*, *🧐 ¿Voy por buen camino?* y *📖 Explícamelo paso a paso*.
- **Renderizado de fórmulas:** Integración de **KaTeX** para visualización limpia de álgebra, fracciones, raíces y geometría ($x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$).
- **📸 Visión por Computadora (Fotos de cuadernos):** Sube o arrastra fotos de tus ejercicios escritos a mano para que la IA los analice y te enseñe a resolverlos.

### 2. 🌍 Simulador de Idiomas (Inmersión & Roleplay)
- **Escenarios de la vida real:**
  - ☕ Café en Londres (Pedir comida y bebidas)
  - ✈️ Aeropuerto y control de aduana
  - 💼 Entrevista de trabajo internacional
  - 🏨 Check-in en un hotel
  - 🗣️ Charla informal con un amigo
- **Panel de Feedback Pedagógico en Vivo:**
  - Analiza cada turno de conversación en tiempo real.
  - Señala errores gramaticales amigablemente.
  - Recomienda alternativas con lenguaje nativo y natural.
  - Tips culturales y de pronunciación.

### 3. 🎮 Sistema de Gamificación
- **Puntos de Experiencia (XP):** Gana XP por cada ejercicio resuelto, frase en otro idioma y quiz completado.
- **Niveles de Progreso:** *Novato 🥉 ➔ Aprendiz 🥈 ➔ Aventurero 🏹 ➔ Experto 🥇 ➔ Maestro 👑*.
- **Contador de Racha diaria:** Registra días consecutivos de estudio.
- **🏆 Vitrina de Medallas:** Desbloquea logros como *Primer Paso*, *Mente Lógica*, *Políglota Activo*, *Ojo de Águila* y *Perfeccionista*.

### 4. 📝 Generador de Mini-Quizzes Interactivos
- Elige cualquier tema (ej. *Ecuaciones cuadráticas*, *Present Perfect*, *Trigonometría*, *Phrasal Verbs*).
- Genera al instante un test interactivo de 4 preguntas de opción múltiple con explicación paso a paso y suma de XP.

---

## 🎨 Diseño

Estilo claro y amable inspirado en Gliglish y Praktika: fondo blanco, índigo, Inter, tutores con avatar, banderas para elegir idioma. Sistema en [DESIGN.md](DESIGN.md); reglas para agentes (Antigravity, Claude) en [AGENTS.md](AGENTS.md).

---

## 🚀 Cómo Iniciar el Proyecto

### Opción 1: Con un clic
Haz doble clic sobre el archivo `iniciar.bat`.

### Opción 2: Desde la terminal
Ejecuta:
```bash
node server.js
```

Luego abre en tu navegador:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🔑 Configuración de la API de Gemini (Opcional)

El sistema viene con un **Modo Demostración integrado** que permite probar todas las pantallas y simulaciones sin necesidad de claves.

Para conectarlo a la IA en vivo de Google:
1. Obtén tu clave gratuita en [Google AI Studio](https://aistudio.google.com/app/apikey).
2. En la aplicación, haz clic en el botón superior **⚙️ Configuración**.
3. Pega tu clave y haz clic en **Guardar y Activar**.

