// Profe de matemáticas sin IA: ejercicios paso a paso que revisan de verdad la respuesta.
// Cada paso pide un número (ans) o una idea (keys). Si te equivocas, primero da una pista;
// al segundo error explica y sigue. Lo usan el chat de Matemáticas y la videollamada (app.js).
(function () {
  // ans: respuestas válidas (números, fracciones 'a/b' o textos). keys: raíces de palabras que cuentan.
  const EXERCISES = [
    // ---------- Nivel 1 · Primaria ----------
    { id: 'pct20', level: 1, title: 'Calcular porcentajes', tex: '20\\% \\text{ de } \\$150', desc: 'Descuento del 20 % sobre 150 dólares.',
      steps: [
        { ask: 'Para sacar el 20 %, empecemos por el 10 %. ¿Cuánto es el 10 % de 150?', ans: [15], hint: 'El 10 % es dividir entre 10.', explain: '150 entre 10 da 15.' },
        { ask: 'Si el 10 % es 15, ¿cuánto es el 20 %?', ans: [30], hint: 'El 20 % es el doble del 10 %.', explain: '15 por 2 da 30.' },
        { ask: 'El descuento es de 30 dólares. ¿Cuánto pagas al final por algo que costaba 150?', ans: [120], hint: 'Resta el descuento al precio original.', explain: '150 menos 30 da 120.' }
      ], done: 'Pagas 120 dólares. El 20 % de 150 es 30.' },
    { id: 'regla3', level: 1, title: 'Regla de tres simple', tex: '\\frac{3 \\text{ lápices}}{\\$15} = \\frac{7 \\text{ lápices}}{x}', desc: 'Si 3 lápices cuestan 15 dólares, ¿cuánto cuestan 7?',
      steps: [
        { ask: 'Primero averigüemos el precio de uno. ¿Cuánto cuesta un solo lápiz?', ans: [5], hint: 'Reparte los 15 dólares entre los 3 lápices.', explain: '15 entre 3 da 5.' },
        { ask: 'Si un lápiz cuesta 5, ¿cuánto cuestan 7 lápices?', ans: [35], hint: 'Multiplica el precio de uno por 7.', explain: '5 por 7 da 35.' }
      ], done: 'Los 7 lápices cuestan 35 dólares.' },
    { id: 'fracsame', level: 1, title: 'Suma de fracciones con igual denominador', tex: '\\frac{2}{5} + \\frac{1}{5}', desc: 'Sumar fracciones que tienen el mismo denominador.',
      steps: [
        { ask: 'Cuando el denominador es igual, ¿qué hacemos con los numeradores, el 2 y el 1?', keys: ['sum', 'junt', 'mas', 'agreg'], hint: 'Piensa en pedazos de una pizza cortada en 5: tienes 2 y te dan 1 más.', explain: 'Los numeradores se suman y el denominador se queda igual.' },
        { ask: 'Entonces, ¿cuánto da dos quintos más un quinto?', ans: ['3/5'], hint: 'Suma 2 más 1 arriba y deja el 5 abajo.', explain: 'Da 3 quintos.' }
      ], done: 'Dos quintos más un quinto es tres quintos.' },
    { id: 'rect', level: 1, title: 'Área de un rectángulo', tex: 'A = b \\times h \\quad b = 8,\\ h = 6', desc: 'Un rectángulo de 8 de base y 6 de altura.',
      steps: [
        { ask: '¿Qué operación usamos para calcular el área de un rectángulo?', keys: ['multipl', 'por', 'base', 'producto', 'veces'], hint: 'Es base ... altura. ¿Sumar o multiplicar?', explain: 'El área es base por altura: se multiplican.' },
        { ask: '¿Cuánto es 8 por 6?', ans: [48], hint: 'Cuenta de 8 en 8 seis veces: 8, 16, 24…', explain: '8 por 6 da 48.' }
      ], done: 'El área es 48 unidades cuadradas.' },

    // ---------- Nivel 2 · Secundaria ----------
    { id: 'eq3x', level: 2, title: 'Ecuación de primer grado', tex: '3x + 12 = 30', desc: 'Despeja la incógnita x.',
      steps: [
        { ask: 'Queremos dejar sola la x. ¿Qué hacemos con el más 12?', keys: ['rest', 'quit', 'menos', 'pas', '-12'], hint: 'Lo contrario de sumar 12 es…', explain: 'Restamos 12 en los dos lados de la ecuación.' },
        { ask: 'Si restamos 12 a los dos lados, ¿cuánto vale 3x?', ans: [18], hint: 'Calcula 30 menos 12.', explain: '30 menos 12 da 18, entonces 3x = 18.' },
        { ask: '¿Cuánto vale x?', ans: [6], hint: 'El 3 está multiplicando: divide 18 entre 3.', explain: '18 entre 3 da 6.' }
      ], done: 'x vale 6. Comprobación: 3 por 6 más 12 da 30.' },
    { id: 'frac2314', level: 2, title: 'Suma de fracciones', tex: '\\frac{2}{3} + \\frac{1}{4}', desc: 'Fracciones con distinto denominador.',
      steps: [
        { ask: '¿Cuál es el mínimo común denominador de 3 y 4?', ans: [12], hint: 'Busca el número más pequeño que esté en la tabla del 3 y del 4.', explain: '12 está en las dos tablas.' },
        { ask: '¿Cuántos doceavos son dos tercios?', ans: [8, '8/12'], hint: 'Si multiplicas el 3 por 4 para llegar a 12, multiplica también el 2 por 4.', explain: '2 tercios son 8 doceavos.' },
        { ask: '¿Y cuántos doceavos es un cuarto?', ans: [3, '3/12'], hint: 'El 4 por 3 da 12; haz lo mismo con el 1.', explain: '1 cuarto son 3 doceavos.' },
        { ask: 'Ahora suma: ¿cuánto da en total?', ans: ['11/12'], hint: 'Suma 8 más 3 arriba y deja el 12 abajo.', explain: '8 doceavos más 3 doceavos son 11 doceavos.' }
      ], done: 'Dos tercios más un cuarto es once doceavos.' },
    { id: 'eq2x', level: 2, title: 'Ecuación con resta', tex: '2x - 5 = 11', desc: 'Otra ecuación de primer grado.',
      steps: [
        { ask: '¿Qué hacemos con el menos 5 para dejar sola la x?', keys: ['sum', 'agreg', 'mas', '+5', 'pas'], hint: 'Lo contrario de restar 5 es…', explain: 'Sumamos 5 en los dos lados.' },
        { ask: 'Después de sumar 5, ¿cuánto vale 2x?', ans: [16], hint: 'Calcula 11 más 5.', explain: '11 más 5 da 16.' },
        { ask: '¿Cuánto vale x?', ans: [8], hint: 'Divide 16 entre 2.', explain: '16 entre 2 da 8.' }
      ], done: 'x vale 8. Comprobación: 2 por 8 menos 5 da 11.' },
    { id: 'pct15', level: 2, title: 'Porcentaje mental', tex: '15\\% \\text{ de } 200', desc: 'Calcular un porcentaje sin calculadora.',
      steps: [
        { ask: '¿Cuánto es el 10 % de 200?', ans: [20], hint: 'Divide entre 10.', explain: '200 entre 10 da 20.' },
        { ask: '¿Y el 5 % de 200?', ans: [10], hint: 'El 5 % es la mitad del 10 %.', explain: 'La mitad de 20 es 10.' },
        { ask: 'Entonces, ¿cuánto es el 15 %?', ans: [30], hint: '15 % es 10 % más 5 %.', explain: '20 más 10 da 30.' }
      ], done: 'El 15 % de 200 es 30.' },

    // ---------- Nivel 3 · Geometría y lógica ----------
    { id: 'pita', level: 3, title: 'Teorema de Pitágoras', tex: 'a^2 + b^2 = c^2 \\quad a = 3,\\ b = 4', desc: 'Hipotenusa de un triángulo rectángulo.',
      steps: [
        { ask: '¿Cuánto es 3 al cuadrado más 4 al cuadrado?', ans: [25], hint: '3 al cuadrado es 9 y 4 al cuadrado es 16.', explain: '9 más 16 da 25.' },
        { ask: 'Si c al cuadrado es 25, ¿cuánto mide c?', ans: [5], hint: '¿Qué número multiplicado por sí mismo da 25?', explain: 'La raíz de 25 es 5.' }
      ], done: 'La hipotenusa mide 5.' },
    { id: 'circle', level: 3, title: 'Área de un círculo', tex: 'A = \\pi r^2 \\quad r = 5', desc: 'Círculo de radio 5 centímetros.',
      steps: [
        { ask: '¿Cuál es la fórmula del área de un círculo?', keys: ['pi', 'radio', 'cuadrado', 'r2', 'πr'], hint: 'Lleva el número pi y el radio.', explain: 'Área es pi por radio al cuadrado.' },
        { ask: '¿Cuánto es el radio, 5, al cuadrado?', ans: [25], hint: '5 por 5.', explain: '5 por 5 da 25.' },
        { ask: 'Usa pi como 3,14. ¿Cuánto da 25 por 3,14?', ans: [78.5], hint: '25 por 3 es 75, y 25 por 0,14 es 3,5.', explain: '75 más 3,5 da 78,5.' }
      ], done: 'El área es unos 78,5 centímetros cuadrados.' },
    { id: 'system', level: 3, title: 'Sistema de ecuaciones', tex: 'x + y = 10 \\quad x - y = 2', desc: 'Dos ecuaciones, dos incógnitas.',
      steps: [
        { ask: 'Si sumamos las dos ecuaciones, la y se cancela. ¿Cuánto vale 2x?', ans: [12], hint: 'Suma los lados derechos: 10 más 2.', explain: '10 más 2 da 12, entonces 2x = 12.' },
        { ask: '¿Cuánto vale x?', ans: [6], hint: 'Divide 12 entre 2.', explain: '12 entre 2 da 6.' },
        { ask: 'Si x vale 6 y x más y es 10, ¿cuánto vale y?', ans: [4], hint: '¿Qué le sumas a 6 para llegar a 10?', explain: '10 menos 6 da 4.' }
      ], done: 'x vale 6 y y vale 4.' },
    { id: 'riddle', level: 3, title: 'Acertijo de patrones', tex: '2,\\ 4,\\ 8,\\ 16,\\ \\dots', desc: 'Encuentra la regla de la serie.',
      steps: [
        { ask: '¿Qué número sigue después del 16?', ans: [32], hint: 'Mira cómo pasas de 2 a 4 y de 4 a 8.', explain: 'Cada número es el doble del anterior: 16 por 2 da 32.' },
        { ask: '¿Y el siguiente?', ans: [64], hint: 'Sigue duplicando.', explain: '32 por 2 da 64.' }
      ], done: 'La regla es multiplicar por 2 cada vez.' }
  ];

  const LEVEL_NAMES = { 1: 'Primaria', 2: 'Secundaria', 3: 'Geometría y lógica' };

  // Números en palabras que el micrófono a veces devuelve
  const UNITS = { cero: 0, uno: 1, una: 1, un: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10, once: 11, doce: 12, trece: 13, catorce: 14, quince: 15, dieciseis: 16, diecisiete: 17, dieciocho: 18, diecinueve: 19, veinte: 20, veintiuno: 21, veintidos: 22, veintitres: 23, veinticuatro: 24, veinticinco: 25, veintiseis: 26, veintisiete: 27, veintiocho: 28, veintinueve: 29 };
  const TENS = { treinta: 30, cuarenta: 40, cincuenta: 50, sesenta: 60, setenta: 70, ochenta: 80, noventa: 90, cien: 100, ciento: 100 };
  const DENOMS = { medio: 2, medios: 2, tercio: 3, tercios: 3, cuarto: 4, cuartos: 4, quinto: 5, quintos: 5, sexto: 6, sextos: 6, septimo: 7, septimos: 7, octavo: 8, octavos: 8, noveno: 9, novenos: 9, decimo: 10, decimos: 10, onceavo: 11, onceavos: 11, doceavo: 12, doceavos: 12 };
  const fold = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  // Pasa "treinta y cinco" → "35" y "tres quintos" → "3/5"
  function wordsToDigits(text) {
    let t = ' ' + fold(text) + ' ';
    Object.entries(TENS).forEach(([w, v]) => {
      t = t.replace(new RegExp(`\\b${w} y (${Object.keys(UNITS).join('|')})\\b`, 'g'), (_, u) => ` ${v + UNITS[u]} `);
      t = t.replace(new RegExp(`\\b${w}\\b`, 'g'), ` ${v} `);
    });
    Object.entries(UNITS).forEach(([w, v]) => { t = t.replace(new RegExp(`\\b${w}\\b`, 'g'), ` ${v} `); });
    t = t.replace(/(\d+)\s+(medios?|tercios?|cuartos?|quintos?|sextos?|septimos?|octavos?|novenos?|decimos?|onceavos?|doceavos?)\b/g, (_, n, d) => `${n}/${DENOMS[d]}`);
    return t;
  }

  function numbersIn(text) {
    const t = wordsToDigits(text).replace(/(\d),(\d)/g, '$1.$2');
    return (t.match(/-?\d+(?:\.\d+)?(?:\s*\/\s*\d+)?/g) || []).map(s => s.replace(/\s/g, ''));
  }

  const valueOf = (s) => {
    if (typeof s === 'number') return s;
    const [a, b] = String(s).split('/');
    return b ? Number(a) / Number(b) : Number(a);
  };

  // 'ok' | 'wrong' (dio otra cosa) | 'empty' (no dio número ni idea)
  function judge(step, text) {
    const nums = numbersIn(text);
    if (step.ans) {
      const hit = nums.some(n => step.ans.some(a =>
        (typeof a === 'string' && a.includes('/') && n === a) || Math.abs(valueOf(n) - valueOf(a)) < 0.01));
      if (hit) return 'ok';
    }
    if (step.keys) {
      const t = fold(text);
      if (step.keys.some(k => t.includes(fold(k)))) return 'ok';
    }
    return nums.length || (step.keys && hasWords(text)) ? 'wrong' : 'empty';
  }
  const hasWords = (text) => fold(text).replace(/[^a-z]/g, '').length > 3;

  const isHelp = (text) => /pista|ayuda|no se\b|no entiendo|como empiezo/.test(fold(text));
  const isGiveUp = (text) => /me rindo|explica|paso a paso/.test(fold(text));

  // Una sesión: avanza paso a paso y devuelve qué decir
  function createSession(exercise) {
    let stepIdx = 0;
    let attempts = 0;
    const current = () => exercise.steps[stepIdx];
    const advance = (lead) => {
      stepIdx++;
      attempts = 0;
      if (stepIdx >= exercise.steps.length) {
        return { verdict: 'done', say: `${lead} ${exercise.done}`, done: true };
      }
      return { verdict: 'next', say: `${lead} ${current().ask}`, done: false };
    };
    return {
      exercise,
      get step() { return current(); },
      get stepNumber() { return stepIdx + 1; },
      intro() { return `Vamos con: ${exercise.title}. ${exercise.desc} ${current().ask}`; },
      hint() { attempts = Math.max(attempts, 1); return { verdict: 'hint', say: `Pista: ${current().hint}`, done: false }; },
      explain() { const s = current(); return advance(`Te lo explico: ${s.explain}`); },
      answer(text) {
        if (isGiveUp(text)) return this.explain();
        if (isHelp(text)) return this.hint();
        const v = judge(current(), text);
        if (v === 'ok') return advance(`¡Correcto! ${current().explain}`);
        if (attempts === 0) {
          attempts = 1;
          const lead = v === 'empty' ? 'No escuché tu respuesta.' : 'Mmm, no es correcto.';
          return { verdict: 'wrong', say: `${lead} Pista: ${current().hint} Inténtalo otra vez.`, done: false };
        }
        return advance(`Casi. ${current().explain}`);
      }
    };
  }

  window.MathCoach = {
    EXERCISES,
    LEVEL_NAMES,
    byId: (id) => EXERCISES.find(e => e.id === id),
    ofLevel: (lv) => EXERCISES.filter(e => e.level === lv),
    createSession,
    numbersIn
  };
})();
