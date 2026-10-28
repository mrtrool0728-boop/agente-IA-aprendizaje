// Avatar 3D de la videollamada con TalkingHead (MIT, github.com/met4citizen/TalkingHead).
// La voz la pone el navegador (speechSynthesis); aquí solo se mueven labios, ojos y cabeza.
// app.js lo usa a través de window.Avatar3D. Si algo falla, app.js sigue con el avatar 2D.
import { TalkingHead } from 'talkinghead';

// Modelos en public/avatars (licencias de uso no comercial, ver AGENTS.md)
const MODELS = {
  F: { url: 'avatars/avaturn.glb', body: 'F' },
  M: { url: 'avatars/avatarsdk.glb', body: 'M', top: '#334155' }
};

const REMOTE = 'https://raw.githubusercontent.com/met4citizen/TalkingHead/main/avatars/';

// Idiomas con reglas de labios propias; el resto usa las del inglés
const LIPSYNC = { 'Inglés': 'en', 'Francés': 'fr', 'Alemán': 'de' };

let head = null;
let node = null;
let currentUrl = '';

// En algunas tarjetas de video el pelo se dibujaba encima de la cara. Dos arreglos:
// 1) la cámara solo mira hasta 30 m (antes 2000 m), así la profundidad tiene más precisión;
// 2) pelo, cejas y pestañas se dibujan recortados (alphaTest) en vez de transparentes.
function fixDepth() {
  head.camera.far = 30;
  head.camera.updateProjectionMatrix();
  head.scene.traverse(o => {
    if (!o.isMesh) return;
    [].concat(o.material).forEach(mat => {
      if (mat.transparent && /hair|lash|brow|eyelash/i.test(`${o.name} ${mat.name}`)) {
        mat.transparent = false;
        mat.alphaTest = 0.5;
        mat.depthWrite = true;
        mat.needsUpdate = true;
      }
    });
  });
}

// Pinta la camiseta de un color liso (el modelo de hombre trae un logo estampado)
function paintTop(color) {
  if (!color) return;
  head.scene.traverse(o => {
    if (o.isMesh && /outfit_top/i.test(o.name)) {
      [].concat(o.material).forEach(mat => {
        mat.map = null;
        mat.color.set(color);
        mat.needsUpdate = true;
      });
    }
  });
}

async function mount(el, model = 'F', top = '') {
  const m = MODELS[model] || MODELS.F;
  if (!head || node !== el) {
    el.innerHTML = '';
    node = el;
    currentUrl = '';
    head = new TalkingHead(el, {
      // (las opciones de mirada están abajo)
      lipsyncModules: ['en', 'fr', 'de'],
      lipsyncLang: 'en',
      cameraView: 'head',
      cameraRotateEnable: false,
      avatarMood: 'happy',
      // Como en una videollamada: casi siempre mirando a la cámara
      avatarIdleEyeContact: 0.85,
      avatarSpeakingEyeContact: 0.95,
      avatarListeningEyeContact: 0.9,
      modelFPS: 30
    });
    // En videollamada el avatar debe mirar a la cámara: sin párpados caídos y sin inclinarse hacia adelante
    Object.values(head.animMoods).forEach(mood => {
      if (mood.baseline) mood.baseline.eyesLookDown = 0;
      mood.anims?.forEach(a => {
        if (a.name !== 'head') return;
        if (a.idle?.vs?.bodyRotateX) a.idle.vs.bodyRotateX = [[-0.04, 0.02]];
        if (a.speaking?.vs?.bodyRotateX) a.speaking.vs.bodyRotateX = [[-0.04, 0.03, 1, 2]];
      });
    });
  }
  if (currentUrl !== m.url) {
    const opts = { body: m.body, avatarMood: 'happy', lipsyncLang: 'en', ...(m.baseline ? { baseline: m.baseline } : {}) };
    try {
      await head.showAvatar({ url: m.url, ...opts });
    } catch (e) {
      // Sin copia local (no se sube a GitHub por su licencia): se carga desde el repositorio de TalkingHead
      await head.showAvatar({ url: REMOTE + m.url.split('/').pop(), ...opts });
    }
    currentUrl = m.url;
    // Al cambiar de modelo, three.js a veces deja de dibujar la cabeza (cálculo de visibilidad con
    // la forma vieja). Se dibujan siempre todas las partes y se reencuadra la cámara.
    head.scene.traverse(o => { if (o.isMesh) o.frustumCulled = false; });
    head.setView('head');
    fixDepth();
  }
  paintTop(top || m.top);
  head.start();
  head.lookAtCamera(800);
}

// Mueve la boca para una palabra durante durMs milisegundos (aprox.)
function word(text, langName, durMs) {
  if (!head?.armature) return;
  const lang = LIPSYNC[langName] || 'en';
  let w = String(text || '').replace(/[^\p{L}\p{N}'-]/gu, '');
  if (!w) return;
  // Japonés: una sílaba aproximada por cada dos caracteres
  if (/[぀-ヿ一-龯]/.test(w)) w = 'ka'.repeat(Math.max(1, Math.round(w.length / 2)));
  if (lang === 'en') w = w.normalize('NFD').replace(/[̀-ͯ]/g, '');
  try {
    const val = head.lipsyncWordsToVisemes(head.lipsyncPreProcessText(w, lang), lang);
    if (!val?.visemes?.length) return;
    const n = val.visemes.length;
    const total = val.times[n - 1] + val.durations[n - 1];
    const duration = Math.min(durMs, n * 190);
    const t0 = head.animClock + 20;
    for (let j = 0; j < n; j++) {
      const t = t0 + (val.times[j] / total) * duration;
      const d = (val.durations[j] / total) * duration;
      const v = val.visemes[j];
      head.animQueue.push({
        template: { name: 'viseme' },
        ts: [t - Math.min(60, 2 * d / 3), t + Math.min(25, d / 2), t + d + Math.min(60, d / 2)],
        vs: { ['viseme_' + v]: [null, (v === 'PP' || v === 'FF') ? 0.9 : 0.7, 0] }
      });
    }
  } catch (e) {
    // Módulo de labios aún cargando: se omite esta palabra
  }
}

function talkStart() {
  if (!head?.armature) return;
  // Sin gestos de manos: en el encuadre de videollamada no se ven y hacen que el avatar se incline hacia abajo
  head.lookAtCamera(600);
}

function talkStop() {
  head?.stopSpeaking();
}

function setMood(mood) {
  try { head?.setMood(mood); } catch (e) { /* estado no soportado */ }
}

function pause() { head?.stop(); }

window.Avatar3D = { mount, word, talkStart, talkStop, setMood, pause };
window.dispatchEvent(new Event('avatar3d-ready'));
