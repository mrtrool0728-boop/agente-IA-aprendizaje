// Tutores con personas reales: un video corto y una foto de cada uno en public/tutors/.
// Videos de Pexels (licencia libre, pexels.com/license): el número es el id del video en pexels.com/video/<id>.
// fx, fy: dónde está la cara en el cuadro (en %); z: cuánto acercar para que la cara llene el círculo.
window.TUTOR_MEDIA = {
  'Emma':          { file: 'emma',      pexels: 6586287, fx: 50, fy: 30, z: 1.15 },
  'Officer Grant': { file: 'grant',     pexels: 5941016, fx: 50, fy: 24, z: 2.1 },
  'Sarah':         { file: 'sarah',     pexels: 5940726, fx: 50, fy: 24, z: 2.2 },
  'Daniel':        { file: 'daniel',    pexels: 8685433, fx: 50, fy: 30, z: 1.25 },
  'Leo':           { file: 'leo',       pexels: 4701500, fx: 42, fy: 34, z: 1.2 },
  'Amélie':        { file: 'amelie',    pexels: 6104318, fx: 50, fy: 30, z: 1.15 },
  'Moreau':        { file: 'moreau',    pexels: 7583601, fx: 41, fy: 28, z: 2.0 },
  'Chloé':         { file: 'chloe',     pexels: 7413704, fx: 50, fy: 30, z: 1.25 },
  'Julien':        { file: 'julien',    pexels: 6682448, fx: 45, fy: 32, z: 1.3 },
  'Antoine':       { file: 'antoine',   pexels: 6104321, fx: 50, fy: 28, z: 1.15 },
  'Lukas':         { file: 'lukas',     pexels: 4928298, fx: 50, fy: 30, z: 1.3 },
  'Weber':         { file: 'weber',     pexels: 7261920, fx: 48, fy: 36, z: 1.4 },
  'Claudia':       { file: 'claudia',   pexels: 7224322, fx: 50, fy: 28, z: 1.4 },
  'Felix':         { file: 'felix',     pexels: 5990879, fx: 50, fy: 24, z: 1.4 },
  'Jonas':         { file: 'jonas',     pexels: 8627668, fx: 50, fy: 26, z: 1.4 },
  'Matteo':        { file: 'matteo',    pexels: 8135343, fx: 50, fy: 30, z: 1.2 },
  'Rossi':         { file: 'rossi',     pexels: 7514462, fx: 45, fy: 25, z: 1.9 },
  'Giulia':        { file: 'giulia',    pexels: 7557643, fx: 50, fy: 25, z: 1.15 },
  'Marco':         { file: 'marco',     pexels: 7572023, fx: 40, fy: 30, z: 1.5 },
  'Luca':          { file: 'luca',      pexels: 5528003, fx: 33, fy: 22, z: 2.0 },
  'Tiago':         { file: 'tiago',     pexels: 8496455, fx: 50, fy: 26, z: 1.3 },
  'Silva':         { file: 'silva',     pexels: 9710163, fx: 50, fy: 22, z: 1.6 },
  'Sofia':         { file: 'sofia',     pexels: 5941020, fx: 52, fy: 30, z: 2.1 },
  'Rodrigo':       { file: 'rodrigo',   pexels: 8135338, fx: 50, fy: 32, z: 1.15 },
  'Bruno':         { file: 'bruno',     pexels: 5935580, fx: 50, fy: 24, z: 1.6 },
  'Sakura':        { file: 'sakura',    pexels: 8814086, fx: 50, fy: 32, z: 1.3 },
  'Tanaka':        { file: 'tanaka',    pexels: 8048492, fx: 50, fy: 20, z: 1.3 },
  'Takahashi':     { file: 'takahashi', pexels: 8048476, fx: 50, fy: 18, z: 1.5 },
  'Sato':          { file: 'sato',      pexels: 7845250, fx: 56, fy: 26, z: 2.2 },
  'Kenta':         { file: 'kenta',     pexels: 8136210, fx: 50, fy: 22, z: 1.3 },
  // photo: foto propia del profe fuera de la llamada (tarjetas, chat, portada); en la llamada se usa el video
  'Yeison':        { file: 'yeison',    pexels: 6324572, fx: 27, fy: 27, z: 1.7, photo: 'yeison-foto' },
  'Yuki':          { file: 'yuki',      pexels: 8048249, fx: 50, fy: 30, z: 1.4 },
  'Mori':          { file: 'mori',      pexels: 8135999, fx: 52, fy: 31, z: 1.5 },
  'Haruto':        { file: 'haruto',    pexels: 4701496, fx: 40, fy: 33, z: 1.5 },
  'Suzuki':        { file: 'suzuki',    pexels: 8048247, fx: 50, fy: 30, z: 1.4 }
};

// Personajes de las situaciones nuevas (dialogues-more.js) que usan la misma persona que otro tutor
// de otro idioma; dentro de un mismo idioma nunca se repite una cara.
(function () {
  const SAME_AS = {
    'Olivia': 'Giulia', 'Mr. Brooks': 'Tiago', 'Zoe': 'Sofia', 'Mike': 'Lukas',
    'Hugo': 'Rodrigo', 'Mme Laurent': 'Claudia', 'Léa': 'Emma', 'Karim': 'Daniel',
    'Anna': 'Amélie', 'Herr Becker': 'Officer Grant', 'Lena': 'Chloé', 'Murat': 'Silva',
    'Paolo': 'Julien', 'Dott.ssa Bianchi': 'Sarah', 'Andrea': 'Antoine', 'Gino': 'Bruno',
    'Pedro': 'Leo', 'Dra. Helena': 'Chloé', 'Camila': 'Giulia', 'Carlos': 'Moreau'
  };
  Object.entries(SAME_AS).forEach(([name, base]) => { window.TUTOR_MEDIA[name] = window.TUTOR_MEDIA[base]; });
})();
