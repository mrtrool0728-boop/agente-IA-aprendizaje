// Código de acceso por Gmail para "Con Yesion Aprendes".
// Se pega en script.google.com y se implementa como "Aplicación web" (pasos en LEEME.md).
// Envía los códigos a la cuenta de Google que implementa el script; no hace falta escribir el correo aquí.

const CODE_MINUTES = 10;        // cuánto dura un código
const MIN_SECONDS_BETWEEN = 30; // espera mínima entre pedidos (evita que alguien llene tu correo)
const MAX_PER_DAY = 40;         // máximo de códigos por día
const MAX_TRIES = 5;            // intentos para escribir un código antes de anularlo

function doGet(e) {
  const p = (e && e.parameter) || {};
  let out;
  try {
    if (p.action === 'request') out = requestCode_(p);
    else if (p.action === 'verify') out = verifyCode_(p);
    else out = { ok: false, error: 'Acción no válida.' };
  } catch (err) {
    out = { ok: false, error: 'No se pudo procesar. Intenta de nuevo.' };
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}

// Crea un código, lo guarda con su vencimiento y te lo envía por Gmail
function requestCode_(p) {
  const lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    const props = PropertiesService.getScriptProperties();
    const now = Date.now();
    const last = Number(props.getProperty('last') || 0);
    if (now - last < MIN_SECONDS_BETWEEN * 1000) {
      return { ok: false, error: 'Espera unos segundos antes de pedir otro código.' };
    }
    const day = new Date().toDateString();
    const count = props.getProperty('day') === day ? Number(props.getProperty('count') || 0) : 0;
    if (count >= MAX_PER_DAY) {
      return { ok: false, error: 'Se alcanzó el límite de códigos por hoy. Intenta mañana.' };
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const id = Utilities.getUuid();
    props.setProperty('code_' + id, JSON.stringify({ code: code, exp: now + CODE_MINUTES * 60000, tries: 0 }));
    props.setProperties({ last: String(now), day: day, count: String(count + 1) });

    const who = String(p.name || 'Alguien sin nombre').replace(/[\r\n]/g, ' ').slice(0, 60);
    MailApp.sendEmail(
      Session.getEffectiveUser().getEmail(),
      'Código de acceso: ' + code + ' (' + who + ')',
      who + ' quiere entrar a Con Yesion Aprendes.\n\n' +
      'Código: ' + code + '\n' +
      'Vence en ' + CODE_MINUTES + ' minutos y sirve una sola vez.\n\n' +
      'Si no conoces a esta persona, no compartas el código.'
    );
    cleanup_(props, now);
    return { ok: true, id: id };
  } finally {
    lock.releaseLock();
  }
}

// Revisa el código; si es correcto lo anula para que no se pueda volver a usar
function verifyCode_(p) {
  const props = PropertiesService.getScriptProperties();
  const key = 'code_' + String(p.id || '');
  const raw = props.getProperty(key);
  if (!raw) return { ok: false, error: 'El código venció. Pide uno nuevo.' };
  const data = JSON.parse(raw);
  if (Date.now() > data.exp) {
    props.deleteProperty(key);
    return { ok: false, error: 'El código venció. Pide uno nuevo.' };
  }
  if (String(p.code || '').trim() !== data.code) {
    data.tries++;
    if (data.tries >= MAX_TRIES) {
      props.deleteProperty(key);
      return { ok: false, error: 'Demasiados intentos. Pide un código nuevo.' };
    }
    props.setProperty(key, JSON.stringify(data));
    return { ok: false, error: 'Código incorrecto. Revísalo e intenta de nuevo.' };
  }
  props.deleteProperty(key);
  return { ok: true };
}

// Borra los códigos vencidos
function cleanup_(props, now) {
  const all = props.getProperties();
  Object.keys(all).forEach(function (k) {
    if (k.indexOf('code_') !== 0) return;
    try {
      if (JSON.parse(all[k]).exp < now) props.deleteProperty(k);
    } catch (e) {
      props.deleteProperty(k);
    }
  });
}
