// Portada: tutores animados, aparición al hacer scroll y paso a la app con transición.
// Usa las caras animadas de app.js (window.OmniFaces). Se carga después de app.js.
document.addEventListener('DOMContentLoaded', () => {
  const landing = document.getElementById('landing');
  if (!landing || !window.OmniFaces) return;
  const { createFace, flagUrl } = window.OmniFaces;
  const root = document.documentElement;
  const ENTERED = 'omni_tutor_entered';
  const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Videollamada de muestra: un tutor por idioma, se turnan para saludar ----
  const HERO = [
    { name: 'Emma', bg: 'fde68a', flag: 'gb', lang: 'Inglés', say: 'Hi! Ready to practice?', es: '¡Hola! ¿Empezamos a practicar?' },
    { name: 'Moreau', bg: 'bfdbfe', flag: 'fr', lang: 'Francés', say: 'Bonjour ! On commence ?', es: '¡Buenos días! ¿Empezamos?' },
    { name: 'Claudia', bg: 'ddd6fe', flag: 'de', lang: 'Alemán', say: 'Hallo! Wollen wir anfangen?', es: '¡Hola! ¿Empezamos?' },
    { name: 'Marco', bg: 'bbf7d0', flag: 'it', lang: 'Italiano', say: 'Ciao! Pronti a parlare?', es: '¡Hola! ¿Listos para hablar?' },
    { name: 'Sofia', bg: 'fecaca', flag: 'br', lang: 'Portugués', say: 'Olá! Vamos conversar?', es: '¡Hola! ¿Conversamos?' },
    { name: 'Kenta', bg: 'c7d2fe', flag: 'jp', lang: 'Japonés', say: 'こんにちは！はじめましょう！', es: '¡Hola! ¡Empecemos!' }
  ];
  const stage = document.getElementById('lp-call-stage');
  const strip = document.getElementById('lp-strip');
  const bubble = document.getElementById('lp-bubble');
  const callName = document.getElementById('lp-call-name');
  const bigFaces = HERO.map(t => {
    const f = createFace(t.name, t.bg, 'face-hero');
    stage.appendChild(f);
    return f;
  });
  HERO.forEach((t, i) => {
    const b = document.createElement('button');
    b.className = 'lp-strip-item';
    b.setAttribute('role', 'listitem');
    b.setAttribute('aria-label', `${t.name}, ${t.lang}`);
    b.appendChild(createFace(t.name, t.bg, 'face-sm'));
    b.insertAdjacentHTML('beforeend', `<img class="lp-flag" src="${flagUrl(t.flag)}" alt="">`);
    b.addEventListener('click', () => { show(i); pauseUntil = Date.now() + 9000; });
    strip.appendChild(b);
  });

  let current = -1;
  let pauseUntil = 0;
  function show(i) {
    current = i;
    const t = HERO[i];
    bigFaces.forEach((f, k) => f.classList.toggle('is-on', k === i));
    strip.querySelectorAll('.lp-strip-item').forEach((b, k) => b.classList.toggle('is-on', k === i));
    callName.textContent = `${t.name} · ${t.lang}`;
    bubble.classList.remove('pop');
    void bubble.offsetWidth; // reinicia la animación del globo
    document.getElementById('lp-bubble-text').textContent = t.say;
    document.getElementById('lp-bubble-es').textContent = t.es;
    bubble.classList.add('pop');
    setTimeout(() => bigFaces[i].talk(1800), 250);
  }
  show(0);
  setInterval(() => {
    if (root.classList.contains('app-open') || Date.now() < pauseUntil || document.hidden) return;
    show((current + 1) % HERO.length);
  }, 3800);

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
      window.scrollTo(0, 0);
    };
    if (reduce()) { finish(); return; }
    landing.classList.add('is-leaving');
    setTimeout(finish, 450);
  }
  function showLanding() {
    try { sessionStorage.removeItem(ENTERED); } catch (e) { /* sin almacenamiento */ }
    root.classList.remove('app-open');
    window.scrollTo(0, 0);
  }
  landing.querySelectorAll('[data-enter]').forEach(b => b.addEventListener('click', enterApp));
  document.querySelector('.topbar .logo')?.addEventListener('click', (e) => { e.preventDefault(); showLanding(); });
});
