// Modo liviano para equipos de poca capacidad: sin robot 3D, sin videos en las tarjetas y con menos animaciones.
// Se elige en Configuración (omni_tutor_perf: auto | lite | full). En "auto" se decide por la memoria del equipo,
// el ahorro de datos y, si no basta, midiendo cuántos cuadros por segundo logra dibujar al cargar.
(function () {
  const root = document.documentElement;
  let pref = 'auto';
  try { pref = localStorage.getItem('omni_tutor_perf') || 'auto'; } catch (e) { /* sin almacenamiento */ }
  const conn = navigator.connection || {};
  const weak = (navigator.deviceMemory && navigator.deviceMemory < 4)
    || conn.saveData === true
    || /(^|-)2g$|^3g$/.test(conn.effectiveType || '');
  let measured = null;
  try { measured = sessionStorage.getItem('omni_tutor_perf_measured'); } catch (e) { /* sin almacenamiento */ }

  let lite = pref === 'lite' || (pref === 'auto' && (weak || measured === 'lite'));
  const apply = (v) => { lite = v; root.classList.toggle('lite', v); };
  apply(lite);

  const ready = new Promise((resolve) => {
    if (pref !== 'auto' || lite || measured === 'full') { resolve(lite); return; }
    let settled = false;
    const done = (v) => { if (settled) return; settled = true; apply(v); resolve(v); };
    // Si la pestaña está oculta no hay cuadros que medir: se queda en completo
    setTimeout(() => done(lite), 4000);
    const measure = () => {
      let frames = 0;
      let start = 0;
      const tick = (t) => {
        if (!start) start = t;
        frames++;
        if (t - start < 1000) { requestAnimationFrame(tick); return; }
        const fps = (frames * 1000) / (t - start);
        const slow = fps < 30;
        try { sessionStorage.setItem('omni_tutor_perf_measured', slow ? 'lite' : 'full'); } catch (e) { /* sin almacenamiento */ }
        done(slow);
      };
      requestAnimationFrame(tick);
    };
    // Se mide cuando la página ya cargó, para no confundir la carga con un equipo lento
    if (document.readyState === 'complete') setTimeout(measure, 300);
    else window.addEventListener('load', () => setTimeout(measure, 300), { once: true });
  });

  window.OMNI_PERF = { get lite() { return lite; }, pref, ready };
})();
