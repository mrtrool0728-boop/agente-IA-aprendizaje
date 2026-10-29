// Portada: tutores animados, aparición al hacer scroll y paso a la app con transición.
// Usa las caras animadas de app.js (window.OmniFaces). Se carga después de app.js.
document.addEventListener('DOMContentLoaded', () => {
  const landing = document.getElementById('landing');
  if (!landing || !window.OmniFaces) return;
  const { createFace, flagUrl } = window.OmniFaces;
  const root = document.documentElement;
  const ENTERED = 'omni_tutor_entered';
  const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Robot 3D: uno solo, se muda entre la portada y la bienvenida de Idiomas (no se vuelve a descargar) ----
  const robot = landing.querySelector('.lp-robot-scene');
  const heroSlot = landing.querySelector('.lp-robot');
  const appSlot = document.getElementById('app-robot-slot');
  function placeRobot() {
    if (!robot) return;
    const slot = root.classList.contains('app-open') && appSlot ? appSlot : heroSlot;
    if (robot.parentElement !== slot) slot.appendChild(robot);
  }
  placeRobot();
  if (robot) {
    // Menos píxeles = menos trabajo para la tarjeta de video; se ve igual de nítido en pantallas normales
    robot.addEventListener('load-complete', () => {
      try { robot._spline?._renderer?.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25)); } catch (e) { /* versión distinta del visor */ }
      syncRobot();
    });
    // Si el robot no se ve (otra pestaña, scroll), deja de dibujarse
    let robotVisible = true;
    function syncRobot() {
      const app = robot._spline;
      if (!app?.stop) return;
      if (robotVisible && !document.hidden) app.play(); else app.stop();
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => { robotVisible = e.isIntersecting; syncRobot(); }).observe(robot);
    }
    document.addEventListener('visibilitychange', syncRobot);
  }

  // ---- Estela de banderas tras el cursor (o el dedo), en la portada y en la bienvenida ----
  const FLAGS = ['gb', 'fr', 'de', 'it', 'br', 'jp', 'us', 'es'];
  const hint = document.getElementById('lp-robot-hint');
  if ('ontouchstart' in window && !window.matchMedia('(hover: hover)').matches) hint.textContent = 'Toca la pantalla: el robot te mira y suelta banderas';
  let flagIndex = 0;
  let lastX = -999, lastY = -999, lastAt = 0;
  function dropFlag(trail, x, y) {
    if (trail.childElementCount > 18) trail.firstElementChild.remove();
    const img = document.createElement('img');
    img.className = 'lp-trail-flag';
    img.src = flagUrl(FLAGS[flagIndex++ % FLAGS.length]);
    img.alt = '';
    img.style.left = x + 'px';
    img.style.top = y + 'px';
    img.style.setProperty('--dx', (Math.random() * 60 - 30).toFixed(0) + 'px');
    img.style.setProperty('--rot', (Math.random() * 50 - 25).toFixed(0) + 'deg');
    img.addEventListener('animationend', () => img.remove());
    trail.appendChild(img);
  }
  function flagTrail(area) {
    if (!area) return;
    const trail = document.createElement('div');
    trail.className = 'lp-trail';
    trail.setAttribute('aria-hidden', 'true');
    area.appendChild(trail);
    const spot = (e) => {
      const r = area.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    area.addEventListener('pointermove', (e) => {
      if (reduce() || e.pointerType !== 'mouse') return;
      const now = performance.now();
      if (now - lastAt < 70) return;
      const { x, y } = spot(e);
      if (Math.hypot(x - lastX, y - lastY) < 56) return;
      lastX = x; lastY = y; lastAt = now;
      dropFlag(trail, x, y);
    }, { passive: true });
    area.addEventListener('pointerdown', (e) => {
      if (reduce() || e.pointerType === 'mouse') return;
      const { x, y } = spot(e);
      for (let i = 0; i < 4; i++) setTimeout(() => dropFlag(trail, x + (Math.random() * 40 - 20), y), i * 70);
    }, { passive: true });
  }
  flagTrail(landing.querySelector('.lp-hero'));
  flagTrail(appSlot?.closest('.welcome-card'));

  // ---- Tutores de cada situación ----
  const TUTORS = [
    { name: 'Emma', bg: 'fde68a', role: 'Barista', place: 'Café en Londres' },
    { name: 'Officer Grant', bg: 'bfdbfe', role: 'Agente de inmigración', place: 'Aeropuerto y aduana' },
    { name: 'Sarah', bg: 'ddd6fe', role: 'Entrevistadora', place: 'Entrevista de trabajo' },
    { name: 'Daniel', bg: 'bbf7d0', role: 'Recepción', place: 'Check-in en un hotel' },
    { name: 'Leo', bg: 'fecaca', role: 'Amigo', place: 'Charla en el parque' },
    { name: 'Yeison', bg: 'c7d2fe', role: 'Profe de matemáticas', place: 'Clase paso a paso' }
  ];
  const tutorsBox = document.getElementById('lp-tutors');
  TUTORS.forEach((t, i) => {
    const card = document.createElement('article');
    card.className = 'lp-tutor';
    card.dataset.reveal = '';
    card.style.setProperty('--i', i);
    const face = createFace(t.name, t.bg, 'face-tutor');
    card.appendChild(face);
    card.insertAdjacentHTML('beforeend', `<h3>${t.name === 'Yeison' ? 'Profe Yeison' : t.name}</h3><p>${t.role}</p><small>${t.place}</small>`);
    card.addEventListener('mouseenter', () => face.talk(1400));
    tutorsBox.appendChild(card);
  });

  // ---- Aparición al hacer scroll ----
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }) : null;
  landing.querySelectorAll('[data-reveal]').forEach(el => (io ? io.observe(el) : el.classList.add('is-visible')));

  // ---- Entrar a la app y volver a la portada ----
  function enterApp() {
    try { sessionStorage.setItem(ENTERED, '1'); } catch (e) { /* sin almacenamiento */ }
    const finish = () => {
      root.classList.add('app-open');
      landing.classList.remove('is-leaving');
      placeRobot();
      window.scrollTo(0, 0);
    };
    if (reduce()) { finish(); return; }
    landing.classList.add('is-leaving');
    setTimeout(finish, 450);
  }
  function showLanding() {
    try { sessionStorage.removeItem(ENTERED); } catch (e) { /* sin almacenamiento */ }
    root.classList.remove('app-open');
    placeRobot();
    window.scrollTo(0, 0);
  }
  landing.querySelectorAll('[data-enter]').forEach(b => b.addEventListener('click', enterApp));
  document.querySelector('.topbar .logo')?.addEventListener('click', (e) => { e.preventDefault(); showLanding(); });
});
