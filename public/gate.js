// Pantalla de "Acceso por invitación" mientras la página está en lanzamiento.
// Quien entra pide un código; el código le llega a la dueña por Gmail (acceso-gmail/Codigo.gs) y ella lo comparte.
// El acceso dura mientras la pestaña esté abierta (sessionStorage). En el computador local no se pide.
(function () {
  const GATE_URL = window.ACCESS_GATE_URL;
  const isLocal = location.protocol === 'file:' || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  const KEY = 'omni_tutor_access';
  if (!GATE_URL || isLocal) return;
  try { if (sessionStorage.getItem(KEY) === 'ok') return; } catch (e) { /* sin almacenamiento */ }

  const overlay = document.createElement('div');
  overlay.className = 'gate';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'gate-title');
  overlay.innerHTML = `
    <div class="gate-card">
      <div class="gate-logo">Con <span>Yesion</span> Aprendes</div>
      <h1 id="gate-title">Acceso por invitación</h1>
      <p class="gate-text">La página está en lanzamiento. Pide un código: le llega al administrador y él te lo comparte.</p>

      <form class="gate-step" id="gate-ask">
        <label class="gate-field">
          <span>Tu nombre</span>
          <input type="text" id="gate-name" maxlength="60" autocomplete="name" placeholder="Para saber quién pide el acceso" required>
        </label>
        <button type="submit" class="gate-btn" id="gate-ask-btn">Pedir código</button>
      </form>

      <form class="gate-step" id="gate-enter" hidden>
        <label class="gate-field">
          <span>Código de 6 dígitos</span>
          <input type="text" id="gate-code" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" autocomplete="one-time-code" placeholder="000000" required>
        </label>
        <button type="submit" class="gate-btn" id="gate-enter-btn">Entrar</button>
        <button type="button" class="gate-link" id="gate-again">Pedir otro código</button>
      </form>

      <p class="gate-status" id="gate-status" role="status" aria-live="polite"></p>
    </div>`;
  document.body.appendChild(overlay);
  document.documentElement.classList.add('gate-locked');

  const $ = (id) => overlay.querySelector('#' + id);
  const status = (msg, ok) => {
    const el = $('gate-status');
    el.textContent = msg;
    el.classList.toggle('is-ok', Boolean(ok));
  };
  let requestId = '';

  async function call(params) {
    const url = GATE_URL + (GATE_URL.includes('?') ? '&' : '?') + new URLSearchParams(params).toString();
    const res = await fetch(url, { method: 'GET', redirect: 'follow' });
    return res.json();
  }

  $('gate-ask').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = $('gate-ask-btn');
    btn.disabled = true;
    status('Enviando…');
    try {
      const r = await call({ action: 'request', name: $('gate-name').value.trim() });
      if (!r.ok) { status(r.error || 'No se pudo pedir el código.'); return; }
      requestId = r.id;
      $('gate-ask').hidden = true;
      $('gate-enter').hidden = false;
      $('gate-code').focus();
      status('Listo. Pídele el código al administrador; vence en 10 minutos.', true);
    } catch (err) {
      status('No hay conexión con el servicio de códigos. Revisa tu internet e intenta de nuevo.');
    } finally {
      btn.disabled = false;
    }
  });

  $('gate-enter').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = $('gate-enter-btn');
    btn.disabled = true;
    status('Revisando…');
    try {
      const r = await call({ action: 'verify', id: requestId, code: $('gate-code').value.trim() });
      if (!r.ok) { status(r.error || 'Código incorrecto.'); return; }
      try { sessionStorage.setItem(KEY, 'ok'); } catch (err) { /* sin almacenamiento */ }
      overlay.remove();
      document.documentElement.classList.remove('gate-locked');
    } catch (err) {
      status('No hay conexión con el servicio de códigos. Revisa tu internet e intenta de nuevo.');
    } finally {
      btn.disabled = false;
    }
  });

  $('gate-again').addEventListener('click', () => {
    $('gate-enter').hidden = true;
    $('gate-ask').hidden = false;
    $('gate-code').value = '';
    status('');
  });
})();
