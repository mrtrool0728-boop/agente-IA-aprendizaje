const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// Cargar variables de entorno sencillas si existe un .env local
if (fs.existsSync(path.join(__dirname, '.env'))) {
  const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [k, ...v] = trimmed.split('=');
      if (k && v) process.env[k.trim()] = v.join('=').trim().replace(/^["']|["']$/g, '');
    }
  });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.glb': 'model/gltf-binary',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function serveStatic(req, res, pathname) {
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') safePath = '/index.html';
  const filePath = path.join(PUBLIC_DIR, safePath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('Acceso denegado');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 No encontrado');
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
}

// ---- Voz natural con Azure Speech (las mismas voces de Microsoft Edge) ----
const escXml = (s) => String(s).replace(/[<>&'"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));

// Devuelve el MP3 de la frase. data: { text, lang ('es-MX'), voice, rate (1 = normal), key, region }
async function handleAzureTts(data) {
  const key = data.key || process.env.AZURE_SPEECH_KEY;
  const region = (data.region || process.env.AZURE_SPEECH_REGION || '').trim();
  if (!key || !region) return { status: 400, error: 'Falta la clave o la región de Azure Speech.' };
  const text = String(data.text || '').slice(0, 1500);
  if (!text.trim()) return { status: 400, error: 'Texto vacío.' };
  const lang = /^[a-z]{2}-[A-Z]{2}$/.test(data.lang) ? data.lang : 'es-MX';
  const voice = /^[a-z]{2}-[A-Z]{2}-[A-Za-z]+Neural$/.test(data.voice) ? data.voice : 'es-MX-DaliaNeural';
  const pct = Math.round(((Number(data.rate) || 1) - 1) * 100);
  // <lang> hace que una voz multilingüe hable el idioma pedido con su propio timbre
  const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${lang}">` +
    `<voice name="${voice}"><lang xml:lang="${lang}"><prosody rate="${pct}%">${escXml(text)}</prosody></lang></voice></speak>`;

  const res = await fetch(`https://${encodeURIComponent(region)}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
      'User-Agent': 'OmniTutor'
    },
    body: ssml
  });
  if (!res.ok) {
    const detail = res.status === 401 ? 'La clave de Azure no es válida o no corresponde a esa región.' : (await res.text()).slice(0, 200);
    return { status: res.status, error: detail || `Azure respondió ${res.status}` };
  }
  return { status: 200, audio: Buffer.from(await res.arrayBuffer()) };
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 20 * 1024 * 1024) { // límite 20MB para fotos
        reject(new Error('Payload demasiado grande'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

// System prompts según el modo
function buildSystemInstruction(mode, scenario, targetLanguage) {
  if (mode === 'math') {
    return `Eres Yeison, un Tutor Experto y Socrático de Matemáticas de la plataforma 'Con Yeison Aprendes'.
Tu objetivo principal es hacer que el estudiante piense y descubra la solución por sí mismo.
REGLAS OBLIGATORIAS:
1. NUNCA des la respuesta final o la solución completa de golpe, a menos que el estudiante use el comando o pida explícitamente "explícamelo todo" o "me rindo".
2. Guía paso a paso: analiza el problema y haz una sola pregunta clave o dale una pista inicial para que dé el primer paso.
3. Si el estudiante comete un error, señala amablemente en qué parte del razonamiento ocurrió la confusión y pídele que revise esa operación.
4. Escribe todas las fórmulas matemáticas en notación LaTeX delimitadas por $...$ para fórmulas inline o $$...$$ para fórmulas en bloque.
5. Sé motivador, paciente y felicítalo cuando avance en la dirección correcta.
6. Si recibes una imagen de un cuaderno o libro, transcribe primero lo que ves del problema con precisión y luego haz la primera pregunta socrática.
7. No uses emojis.`;
  } else if (mode === 'language') {
    const lang = targetLanguage || 'Inglés';
    const scen = scenario || 'Conversación cotidiana';
    return `Eres un Tutor de Idiomas y Compañero de Inmersión Lingüística.
Estás practicando el idioma: ${lang}.
Escenario o rol actual: "${scen}".

REGLAS OBLIGATORIAS:
1. Responde interpretando tu personaje dentro del escenario de forma natural y atractiva en el idioma meta (${lang}).
2. Al final de tu mensaje, incluye SIEMPRE el delimitador exacto "---FEEDBACK---" seguido de estas cuatro líneas, en español, sobre la ÚLTIMA frase del estudiante:
ERROR: <parte incorrecta tal como la escribió> → <forma correcta>   (si no hay errores escribe: ERROR: ninguno)
POR QUÉ: <explicación corta y amable del error, o un elogio si no hubo error>
NATIVO: <cómo lo diría un hablante nativo en esa situación>
TIP: <un consejo cultural, de pronunciación o una frase útil para seguir>
3. No uses emojis. Mantén la inmersión viva y amena.`;
  } else {
    return `Eres un tutor educativo de apoyo escolar integral. Explica conceptos claramente con ejemplos cotidianos.`;
  }
}

// Handler de la API de Gemini
async function handleGeminiChat(data) {
  const apiKey = data.apiKey || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Modo simulación inteligente si no se ha configurado la API Key
    return generateDemoResponse(data);
  }

  const { message, imageBase64, imageMimeType, mode, scenario, targetLanguage, history = [] } = data;
  const systemInstruction = buildSystemInstruction(mode, scenario, targetLanguage);

  // Formatear historial para la API de Gemini
  const contents = [];

  // Agregar turnos previos si existen
  for (const h of history) {
    contents.push({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.content }]
    });
  }

  // Turno actual
  const currentParts = [];
  if (imageBase64) {
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    currentParts.push({
      inlineData: {
        data: cleanBase64,
        mimeType: imageMimeType || 'image/jpeg'
      }
    });
  }
  if (message) {
    currentParts.push({ text: message });
  }

  contents.push({
    role: 'user',
    parts: currentParts
  });

  const payload = {
    contents,
    systemInstruction: {
      parts: [{ text: systemInstruction }]
    },
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1500
    }
  };

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error en Gemini API (${response.status}): ${errorText}`);
  }

  const result = await response.json();
  const textResponse = result.candidates?.[0]?.parts?.[0]?.text || 'No se recibió respuesta del modelo.';
  return { reply: textResponse, isLive: true };
}

// Generador de Quizzes interactivos
async function handleGenerateQuiz(data) {
  const apiKey = data.apiKey || process.env.GEMINI_API_KEY;
  const { topic = 'Álgebra básica', subject = 'math', difficulty = 'intermedio' } = data;

  if (!apiKey) {
    return generateDemoQuiz(topic, subject);
  }

  const prompt = `Genera un mini-quiz educativo interactivo de exactamente 4 preguntas de opción múltiple sobre el tema: "${topic}" (Materia: ${subject}, Nivel: ${difficulty}).
Responde ÚNICAMENTE con un objeto JSON válido, sin bloques markdown de código adicionales fuera de JSON, con este formato exacto:
{
  "topic": "${topic}",
  "subject": "${subject}",
  "questions": [
    {
      "id": 1,
      "question": "Enunciado claro de la pregunta (usa LaTeX con $...$ si es matemática)",
      "options": ["Opción A", "Opción B", "Opción C", "Opción D"],
      "correctIndex": 0,
      "explanation": "Explicación detallada y pedagógica de por qué esta es la respuesta correcta.",
      "xp": 25
    }
  ]
}`;

  const payload = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.3
    }
  };

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    return generateDemoQuiz(topic, subject);
  }

  const result = await response.json();
  const text = result.candidates?.[0]?.parts?.[0]?.text;
  try {
    return JSON.parse(text);
  } catch (e) {
    return generateDemoQuiz(topic, subject);
  }
}

// Diálogos pedagógicos nativos por idioma y escenario (con traducción en español para principiantes)
const MULTILANG_SCENARIOS = {
  'Inglés': {
    'Café': [
      { text: "Lovely! Would you like that with regular milk or oat milk?", es: "¿Te gustaría con leche normal o leche de avena?", tip: "Puedes responder: 'Regular milk, please' (Leche normal, por favor) o 'Oat milk, please'." },
      { text: "Perfect. Is that to have here or to take away?", es: "Perfecto. ¿Es para tomar aquí o para llevar?", tip: "Responde: 'To have here' (Para tomar aquí) o 'To take away' (Para llevar)." },
      { text: "That'll be four pounds fifty. Card or cash?", es: "Serían cuatro libras con cincuenta. ¿Tarjeta o efectivo?", tip: "Responde: 'By card, please' (Con tarjeta, por favor)." }
    ],
    'Aeropuerto': [
      { text: "Good afternoon. May I see your passport and boarding pass, please?", es: "Buenas tardes. ¿Podría ver su pasaporte y tarjeta de embarque, por favor?", tip: "Responde: 'Here you go, officer' (Aquí tiene, oficial)." },
      { text: "What is the primary purpose of your visit to the country?", es: "¿Cuál es el motivo principal de su visita al país?", tip: "Responde: 'I am here for tourism/vacation' (Estoy aquí por turismo/vacaciones)." },
      { text: "How long are you planning to stay?", es: "¿Cuánto tiempo planea quedarse?", tip: "Responde: 'For two weeks' (Por dos semanas)." }
    ],
    'Entrevista': [
      { text: "Thanks for coming in today. Could you tell me a little about your experience?", es: "Gracias por venir hoy. ¿Podrías contarme un poco sobre tu experiencia?", tip: "Responde: 'Sure, I have experience working in customer service and team projects'." },
      { text: "Why are you interested in working with our international team?", es: "¿Por qué te interesa trabajar con nuestro equipo internacional?", tip: "Responde: 'Because I want to grow professionally in a dynamic environment'." },
      { text: "What would you say is your greatest professional strength?", es: "¿Cuál dirías que es tu mayor fortaleza profesional?", tip: "Responde: 'My greatest strength is solving problems efficiently under pressure'." }
    ],
    'Hotel': [
      { text: "Welcome to our hotel! Do you have a reservation with us?", es: "¡Bienvenido a nuestro hotel! ¿Tiene una reserva con nosotros?", tip: "Responde: 'Yes, I have a reservation under my name' (Sí, tengo una reserva a mi nombre)." },
      { text: "Could I have your photo ID and a credit card for the deposit?", es: "¿Me permite una identificación con foto y una tarjeta de crédito para el depósito?", tip: "Responde: 'Sure, here is my passport' (Claro, aquí está mi pasaporte)." },
      { text: "You are in room 412. Breakfast is served from 7 to 10 AM. Enjoy your stay!", es: "Está en la habitación 412. El desayuno es de 7 a 10 AM. ¡Que disfrute su estadía!", tip: "Responde: 'Thank you very much! Have a great day'." }
    ],
    'amigo': [
      { text: "Hey! Long time no see. How have you been lately?", es: "¡Hola! ¡Cuánto tiempo sin vernos! ¿Cómo has estado últimamente?", tip: "Responde: 'I have been doing great, and you?' (¡He estado muy bien, ¿y tú?)." },
      { text: "I'm so glad to hear that! What are your plans for this weekend?", es: "¡Me alegra mucho oír eso! ¿Qué planes tienes para este fin de semana?", tip: "Responde: 'I might go for a walk in the park or watch a movie'." },
      { text: "That sounds awesome. We should definitely hang out soon!", es: "Eso suena genial. ¡Definitivamente deberíamos salir pronto!", tip: "Responde: 'Yes, let's keep in touch!' (¡Sí, mantengámonos en contacto!)." }
    ]
  },
  'Francés': {
    'Café': [
      { text: "Bonjour ! Bienvenue au Café de Paris. Que puis-je vous servir aujourd'hui ?", es: "¡Buenos días! Bienvenido al Café de París. ¿Qué le puedo servir hoy?", tip: "Responde: 'Un café au lait et un croissant, s'il vous plaît' (Un café con leche y un croissant, por favor)." },
      { text: "Très bien ! C'est pour consommer sur place ou à emporter ?", es: "¡Muy bien! ¿Es para tomar aquí o para llevar?", tip: "Responde: 'Sur place, s'il vous plaît' (Para tomar aquí, por favor)." },
      { text: "Ça fera quatre euros cinquante. Vous réglez par carte ou en espèces ?", es: "Serán cuatro euros con cincuenta. ¿Paga con tarjeta o en efectivo?", tip: "Responde: 'Par carte, s'il vous plaît' (Con tarjeta, por favor)." }
    ],
    'Aeropuerto': [
      { text: "Bonjour. Puis-je voir votre passeport et votre carte d'embarquement, s'il vous plaît ?", es: "Buenos días. ¿Podría ver su pasaporte y tarjeta de embarque, por favor?", tip: "Responde: 'Voilà mon passeport, monsieur' (Aquí está mi pasaporte, señor)." },
      { text: "Quel est le motif de votre séjour en France ?", es: "¿Cuál es el motivo de su estancia en Francia?", tip: "Responde: 'Je viens pour des vacances en famille' (Vengo de vacaciones con mi familia)." },
      { text: "Combien de temps comptez-vous rester parmi nous ?", es: "¿Cuánto tiempo tiene previsto quedarse con nosotros?", tip: "Responde: 'Je reste ici pendant dix jours' (Me quedo aquí por diez días)." }
    ],
    'Entrevista': [
      { text: "Bonjour et bienvenue. Pourriez-vous vous présenter brièvement ?", es: "Buenos días y bienvenido. ¿Podría presentarse brevemente?", tip: "Responde: 'Bonjour, je m'appelle... et je suis passionné par ce domaine'." },
      { text: "Qu'est-ce qui vous motive à rejoindre notre équipe à Paris ?", es: "¿Qué le motiva a unirse a nuestro equipo en París?", tip: "Responde: 'Votre entreprise a une excellente réputation internationale'." },
      { text: "Quelle est votre plus grande force dans le travail d'équipe ?", es: "¿Cuál es su mayor fortaleza en el trabajo en equipo?", tip: "Responde: 'Je communique facilement et je sais écouter les autres'." }
    ],
    'Hotel': [
      { text: "Bonsoir et bienvenue à l'Hôtel de la Paix. Avez-vous une réservation ?", es: "Buenas noches y bienvenido al Hotel de la Paix. ¿Tiene una reserva?", tip: "Responde: 'Oui, j'ai une réservation au nom de...' (Sí, tengo una reserva a nombre de...)." },
      { text: "Parfait. Puis-je avoir une pièce d'identité pour enregistrer votre arrivée ?", es: "Perfecto. ¿Puedo ver un documento de identidad para registrar su llegada?", tip: "Responde: 'Bien sûr, voici mon passeport' (Por supuesto, aquí tiene mi pasaporte)." },
      { text: "Vous êtes à la chambre 304. Le petit-déjeuner est servi dès sept heures.", es: "Está en la habitación 304. El desayuno se sirve desde las siete.", tip: "Responde: 'Merci beaucoup pour votre accueil' (Muchas gracias por su recibimiento)." }
    ],
    'amigo': [
      { text: "Salut ! Ça fait un bail ! Comment vas-tu depuis la dernière fois ?", es: "¡Hola! ¡Cuánto tiempo! ¿Cómo te va desde la última vez?", tip: "Responde: 'Ça va super bien, et toi ?' (¡Me va súper bien, ¿y a ti?)." },
      { text: "Ça va très bien ! Qu'as-tu prévu de beau ce week-end ?", es: "¡Me va muy bien! ¿Qué tienes planeado de bueno este fin de semana?", tip: "Responde: 'Je vais peut-être me balader ou voir des amis' (Quizás dé un paseo o vea a unos amigos)." },
      { text: "On devrait absolument prendre un café ensemble cette semaine !", es: "¡Deberíamos tomar un café juntos esta semana sin falta!", tip: "Responde: 'Avec grand plaisir ! On s'appelle' (¡Con mucho gusto! Nos llamamos)." }
    ]
  },
  'Alemán': {
    'Café': [
      { text: "Guten Tag! Willkommen im Kaffeehaus. Was darf ich Ihnen heute bringen?", es: "¡Buenos días! Bienvenido a la cafetería. ¿Qué le puedo traer hoy?", tip: "Responde: 'Einen Kaffee und ein Croissant, bitte' (Un café y un croissant, por favor)." },
      { text: "Gerne! Möchten Sie hier trinken oder zum Mitnehmen?", es: "¡Con gusto! ¿Desea tomar aquí o para llevar?", tip: "Responde: 'Hier trinken, bitte' (Tomar aquí, por favor) o 'Zum Mitnehmen'." },
      { text: "Das macht vier Euro fünfzig. Zahlen Sie bar oder mit Karte?", es: "Son cuatro euros con cincuenta. ¿Paga en efectivo o con tarjeta?", tip: "Responde: 'Mit Karte, bitte' (Con tarjeta, por favor)." }
    ],
    'Aeropuerto': [
      { text: "Guten Tag. Ihren Reisepass und Ihre Bordkarte, bitte.", es: "Buenos días. Su pasaporte y tarjeta de embarque, por favor.", tip: "Responde: 'Hier bitte, mein Reisepass' (Aquí tiene, mi pasaporte)." },
      { text: "Was ist der Zweck Ihrer Reise nach Deutschland?", es: "¿Cuál es el propósito de su viaje a Alemania?", tip: "Responde: 'Ich bin hier für Urlaub' (Estoy aquí por vacaciones)." },
      { text: "Wie lange planen Sie in Deutschland zu bleiben?", es: "¿Cuánto tiempo planea quedarse en Alemania?", tip: "Responde: 'Für zwei Wochen' (Por dos semanas)." }
    ],
    'Entrevista': [
      { text: "Guten Tag. Schön, dass Sie da sind. Erzählen Sie etwas über sich.", es: "Buenos días. Qué bueno que esté aquí. Cuénteme algo sobre usted.", tip: "Responde: 'Guten Tag, ich habe Erfahrung im Bereich Kundenservice'." },
      { text: "Warum möchten Sie genau bei unserem Unternehmen arbeiten?", es: "¿Por qué le gustaría trabajar exactamente en nuestra empresa?", tip: "Responde: 'Weil Ihr Unternehmen sehr innovativ und zukunftsorientiert ist'." },
      { text: "Was sind Ihre größten Stärken bei der Arbeit?", es: "¿Cuáles son sus mayores fortalezas en el trabajo?", tip: "Responde: 'Ich bin sehr zuverlässig und lerne schnell'." }
    ],
    'Hotel': [
      { text: "Guten Abend! Herzlich willkommen. Haben Sie eine Reservierung bei uns?", es: "¡Buenas noches! Cordialmente bienvenido. ¿Tiene una reserva con nosotros?", tip: "Responde: 'Ja, ich habe eine Reservierung auf den Namen...' (Sí, tengo una reserva a nombre de...)." },
      { text: "Darf ich Ihren Ausweis kurz sehen, bitte?", es: "¿Puedo ver su identificación un momento, por favor?", tip: "Responde: 'Gerne, hier ist mein Ausweis' (Con gusto, aquí está mi documento)." },
      { text: "Ihr Zimmer ist die Nummer 205. Das Frühstück gibt es ab sieben Uhr morgens.", es: "Su habitación es la número 205. El desayuno está listo desde las siete de la mañana.", tip: "Responde: 'Vielen Dank und einen schönen Abend' (Muchas gracias y que pase buena noche)." }
    ],
    'amigo': [
      { text: "Hallo! Lange nicht gesehen! Wie geht es dir denn so?", es: "¡Hola! ¡Cuánto tiempo sin vernos! ¿Cómo te va?", tip: "Responde: 'Mir geht es gut, danke! Und dir?' (¡Me va bien, gracias! ¿Y a ti?)." },
      { text: "Bei mir ist alles super! Hast du am Wochenende schon etwas vor?", es: "¡Todo genial por aquí! ¿Tienes ya planes para el fin de semana?", tip: "Responde: 'Ich treffe mich vielleicht mit Freunden' (Quizás me reúna con amigos)." },
      { text: "Wir sollten bald mal wieder zusammen einen Kaffee trinken!", es: "¡Deberíamos tomarnos un café juntos pronto otra vez!", tip: "Responde: 'Ja, sehr gerne! Lass uns schreiben' (¡Sí, con mucho gusto! Escribámonos)." }
    ]
  },
  'Italiano': {
    'Café': [
      { text: "Ciao! Benvenuto al nostro caffè. Cosa posso prepararti oggi?", es: "¡Hola! Bienvenido a nuestro café. ¿Qué te puedo preparar hoy?", tip: "Responde: 'Un cappuccino e un cornetto, per favore' (Un capuchino y un croissant, por favor)." },
      { text: "Ottima scelta! Da consumare qui o da asporto?", es: "¡Excelente elección! ¿Para tomar aquí o para llevar?", tip: "Responde: 'Da consumare qui, grazie' (Para tomar aquí, gracias)." },
      { text: "Sono quattro euro in tutto. Paghi con carta o contanti?", es: "Son cuatro euros en total. ¿Pagas con tarjeta o en efectivo?", tip: "Responde: 'Pago con la carta, grazie' (Pago con tarjeta, gracias)." }
    ],
    'Aeropuerto': [
      { text: "Buongiorno. Posso vedere il suo passaporto e la carta d'imbarco?", es: "Buenos días. ¿Puedo ver su pasaporte y la tarjeta de embarque?", tip: "Responde: 'Ecco il mio passaporto' (Aquí está mi pasaporte)." },
      { text: "Qual è il motivo del suo viaggio in Italia?", es: "¿Cuál es el motivo de su viaje a Italia?", tip: "Responde: 'Sono qui per vacanza e turismo' (Estoy aquí por vacaciones y turismo)." },
      { text: "Per quanti giorni si fermerà qui?", es: "¿Por cuántos días se quedará aquí?", tip: "Responde: 'Mi fermo per dieci giorni' (Me quedo por diez días)." }
    ],
    'Entrevista': [
      { text: "Buongiorno. Grazie per essere qui oggi. Ci parli un po' di lei.", es: "Buenos días. Gracias por estar aquí hoy. Háblenos un poco de usted.", tip: "Responde: 'Buongiorno, ho lavorato in diversi progetti di squadra con successo'." },
      { text: "Cosa la spinge a voler lavorare con la nostra azienda a Roma?", es: "¿Qué le motiva a querer trabajar con nuestra empresa en Roma?", tip: "Responde: 'Ammiro molto la qualità del vostro lavoro e la vostra cultura'." },
      { text: "Qual è il suo punto di forza principale sul lavoro?", es: "¿Cuál es su principal fortaleza en el trabajo?", tip: "Responde: 'Sono una persona molto organizzata e precisa'." }
    ],
    'Hotel': [
      { text: "Buonasera e benvenuto all'Hotel Roma. Ha una prenotazione con noi?", es: "Buenas noches y bienvenido al Hotel Roma. ¿Tiene una reserva con nosotros?", tip: "Responde: 'Sì, ho una prenotazione a nome di...' (Sí, tengo una reserva a nombre de...)." },
      { text: "Perfetto. Mi mostra un documento d'identità per il check-in, per favore?", es: "Perfecto. ¿Me muestra un documento de identidad para el check-in, por favor?", tip: "Responde: 'Certamente, ecco il documento' (Ciertamente, aquí tiene el documento)." },
      { text: "La sua camera è la 112. La colazione è servita dalle sette e mezza.", es: "Su habitación es la 112. El desayuno se sirve desde las siete y media.", tip: "Responde: 'Grazie mille per l'aiuto!' (¡Muchas gracias por la ayuda!)." }
    ],
    'amigo': [
      { text: "Ciao! Che piacere rivederti! Come vanno le cose ultimamente?", es: "¡Hola! ¡Qué alegría verte otra vez! ¿Cómo van las cosas últimamente?", tip: "Responde: 'Tutto bene, grazie! E tu come stai?' (¡Todo bien, gracias! ¿Y tú cómo estás?)." },
      { text: "Alla grande! Hai programmi interessanti per questo fine settimana?", es: "¡Genial! ¿Tienes planes interesantes para este fin de semana?", tip: "Responde: 'Penso di fare una gita fuori porta' (Pienso hacer una excursión)." },
      { text: "Che bello! Dobbiamo assolutamente vederci più spesso per una pizza!", es: "¡Qué bien! ¡Tenemos que vernos más seguido para una pizza!", tip: "Responde: 'Assolutamente sì, organizziamo presto!' (¡Sin duda, organicemos pronto!)." }
    ]
  },
  'Portugués': {
    'Café': [
      { text: "Olá! Bem-vindo ao nosso café em Lisboa. O que vai desejar hoje?", es: "¡Hola! Bienvenido a nuestro café en Lisboa. ¿Qué va a desear hoy?", tip: "Responde: 'Um café e um pastel de nata, por favor' (Un café y un pastel de nata, por favor)." },
      { text: "Com certeza! É para tomar cá ou para levar?", es: "¡Con certeza! ¿Es para tomar aquí o para llevar?", tip: "Responde: 'Para tomar cá, obrigado' (Para tomar aquí, gracias)." },
      { text: "São três euros e cinquenta cêntimos. Paga com cartão ou dinheiro?", es: "Son tres euros y cincuenta céntimos. ¿Paga con tarjeta o dinero?", tip: "Responde: 'Com cartão, se faz favor' (Con tarjeta, por favor)." }
    ],
    'Aeropuerto': [
      { text: "Boa tarde. Pode mostrar-me o seu passaporte e o cartão de embarque?", es: "Buenas tardes. ¿Puede mostrarme su pasaporte y la tarjeta de embarque?", tip: "Responde: 'Com certeza, aqui tem' (Con certeza, aquí tiene)." },
      { text: "Qual é o objetivo principal da sua visita?", es: "¿Cuál es el objetivo principal de su visita?", tip: "Responde: 'Venho de férias para passear' (Vengo de vacaciones para pasear)." },
      { text: "Durante quanto tempo pretende ficar no país?", es: "¿Durante cuánto tiempo tiene planeado quedarse en el país?", tip: "Responde: 'Vou ficar durante duas semanas' (Me voy a quedar durante dos semanas)." }
    ],
    'Entrevista': [
      { text: "Olá e bem-vindo. Poderia falar-nos um pouco sobre a sua trajetória?", es: "Hola y bienvenido. ¿Podría hablarnos un poco sobre su trayectoria?", tip: "Responde: 'Com certeza. Tenho experiência em atendimento e projetos criativos'." },
      { text: "O que mais o motiva a fazer parte da nossa equipa internacional?", es: "¿Qué es lo que más le motiva a formar parte de nuestro equipo internacional?", tip: "Responde: 'Identifico-me muito com a vossa visão de inovação'." },
      { text: "Qual considera ser o seu maior ponto forte profissional?", es: "¿Cuál considera que es su mayor punto fuerte profesional?", tip: "Responde: 'A minha dedicação e facilidade para aprender coisas novas'." }
    ],
    'Hotel': [
      { text: "Boa noite e bem-vindo ao hotel! Tem uma reserva connosco?", es: "¡Buenas noches y bienvenido al hotel! ¿Tiene una reserva con nosotros?", tip: "Responde: 'Sim, tenho uma reserva em nome de...' (Sí, tengo una reserva a nombre de...)." },
      { text: "Perfeito. Preciso apenas de um documento com foto para o registo.", es: "Perfecto. Necesito solo un documento con foto para el registro.", tip: "Responde: 'Aqui tem o meu passaporte' (Aquí tiene mi pasaporte)." },
      { text: "O seu quarto é o 204. O pequeno-almoço é servido a partir das sete.", es: "Su habitación es la 204. El desayuno se sirve a partir de las siete.", tip: "Responde: 'Muito obrigado pela atenção' (Muchas gracias por la atención)." }
    ],
    'amigo': [
      { text: "Olá amigo! Há quanto tempo! Como é que tens passado?", es: "¡Hola amigo! ¡Cuánto tiempo! ¿Cómo has estado?", tip: "Responde: 'Tem corrido tudo bem, e contigo?' (¡Ha ido todo bien, ¿y contigo?)." },
      { text: "Tudo ótimo! Já tens planos combinados para este fim de semana?", es: "¡Todo genial! ¿Ya tienes planes combinados para este fin de semana?", tip: "Responde: 'Talvez vá passear à praia ou descansar' (Tal vez vaya a pasear a la playa o a descansar)." },
      { text: "Combinado! Temos de marcar um almoço juntos em breve!", es: "¡Hecho! ¡Tenemos que organizar un almuerzo juntos pronto!", tip: "Responde: 'Sim, vamos combinar isso mesmo!' (¡Sí, combinemos eso mismo!)." }
    ]
  },
  'Japonés': {
    'Café': [
      { text: "いらっしゃいませ！東京カフェへようこそ。ご注文はお決まりですか？", es: "¡Bienvenido a Tokyo Café! ¿Tiene listo su pedido?", tip: "Responde: 'アイスコーヒーを一つお願いします' (Aisu kōhī o hitotsu onegaishimasu - Un café helado, por favor)." },
      { text: "かしこまりました。店内でお召し上がりですか、お持ち帰りですか？", es: "Entendido. ¿Para tomar aquí o para llevar?", tip: "Responde: '店内でお願いします' (Tennai de onegaishimasu - Para tomar aquí, por favor)." },
      { text: "お会計は五百円になります。現金ですか、カードですか？", es: "La cuenta son quinientos yenes. ¿En efectivo o tarjeta?", tip: "Responde: 'カードでお願いします' (Kādo de onegaishimasu - Con tarjeta, por favor)." }
    ],
    'Aeropuerto': [
      { text: "こんにちは。パスポートと搭乗券を見せていただけますか？", es: "Buenas tardes. ¿Me permite ver su pasaporte y tarjeta de embarque?", tip: "Responde: 'はい、どうぞ' (Hai, dōzo - Sí, aquí tiene)." },
      { text: "日本への入国の目的は何ですか？", es: "¿Cuál es el motivo de su entrada a Japón?", tip: "Responde: '観光です' (Kankō desu - Es turismo)." },
      { text: "日本にはどのくらい滞在する予定ですか？", es: "¿Cuánto tiempo planea permanecer en Japón?", tip: "Responde: '二週間の予定です' (Ni-shūkan no yotei desu - Dos semanas)." }
    ],
    'Entrevista': [
      { text: "本日はお越しいただきありがとうございます。簡単に自己紹介をお願いします。", es: "Gracias por venir hoy. Por favor, preséntese brevemente.", tip: "Responde: '初めまして、よろしくお願いします' (Hajimemashite, yoroshiku onegaishimasu)." },
      { text: "弊社のどのような点に興味を持たれましたか？", es: "¿Qué aspecto de nuestra empresa le interesó?", tip: "Responde: '御社の技術力と文化に惹かれました' (Onsha no gijutsuryoku ni hikaremashita)." },
      { text: "あなたの強みについて教えていただけますか？", es: "¿Podría hablarnos sobre su mayor fortaleza?", tip: "Responde: '私の強みは粘り強さと協調性です' (Watashi no tsuyomi wa nebari-zuyosa to kyōchōsei desu)." }
    ],
    'Hotel': [
      { text: "いらっしゃいませ。ご宿泊の予約はお持ちでしょうか？", es: "Bienvenido. ¿Cuenta con una reserva de hospedaje?", tip: "Responde: 'はい、予約しています' (Hai, yoyaku shite imasu - Sí, tengo reserva)." },
      { text: "お名前と身分証明書のご提示をお願いいたします。", es: "Por favor muestre su nombre y documento de identificación.", tip: "Responde: 'パスポートはこちらです' (Pasupōto wa kochira desu - Aquí está el pasaporte)." },
      { text: "お部屋は302号室です。ごゆっくりお過ごしください。", es: "Su habitación es la número 302. Que disfrute su estadía.", tip: "Responde: 'ありがとうございます' (Arigatō gozaimasu - Muchas gracias)." }
    ],
    'amigo': [
      { text: "久しぶり！元気にしてた？", es: "¡Cuánto tiempo! ¿Cómo has estado?", tip: "Responde: 'うん、元気だったよ！そっちは？' (Un, genki datta yo! Sotchi wa? - ¡Sí, muy bien! ¿Y tú?)." },
      { text: "今週末、何か予定ある？", es: "¿Tienes algún plan para este fin de semana?", tip: "Responde: '特にないよ、買い物に行くかも' (Tokuni nai yo - No en particular, quizás vaya de compras)." },
      { text: "じゃあ、今度一緒にご飯でも食べに行こう！", es: "¡Entonces vayamos a comer juntos pronto!", tip: "Responde: 'いいね！ぜひ行こう' (Ii ne! Zehi ikō - ¡Me parece genial! Vayamos sin falta)." }
    ]
  }
};

// Generador de respuestas inteligentes y pedagógicas por defecto
function generateDemoResponse(data) {
  const { mode, message = '', scenario = '', targetLanguage = 'Inglés', history = [] } = data;
  const lower = message.toLowerCase();

  if (mode === 'math') {
    if (lower.includes('pista')) {
      return {
        reply: `**Pista socrática de Yeison:**
Recuerda que una igualdad funciona como una balanza: todo lo que hagas a un lado, debes aplicarlo exactamente igual al otro.
Si tienes un número sumando (como $+12$), ¿qué operación contraria deberías hacer en ambos miembros para dejar el término con la incógnita completamente solo?`,
        isDemo: true
      };
    }
    if (lower.includes('rindo') || lower.includes('explícame') || lower.includes('explicame') || lower.includes('paso a paso')) {
      return {
        reply: `**Explicación guiada paso a paso:**
Tomemos la ecuación planteada:
$$3x + 12 = 30$$

1. **Paso 1 (Despejar el término con la variable):**
   Restamos $12$ en ambos miembros para eliminar el $+12$:
   $$3x = 30 - 12 \\implies 3x = 18$$

2. **Paso 2 (Aislar la incógnita $x$):**
   Como el $3$ está multiplicando a la $x$, dividimos ambos miembros entre $3$:
   $$x = \\frac{18}{3} \\implies x = 6$$

3. **Comprobación:**
   $$3(6) + 12 = 18 + 12 = 30 \\quad \\text{¡Correcto!}$$

¿Te gustaría intentar ahora con otro problema similar para comprobar que lo dominas?`,
        isDemo: true
      };
    }
    return {
      reply: `¡Excelente ejercicio! Vamos a razonarlo juntos paso a paso:
**${message || 'Tu ejercicio'}**

💡 **Primera pregunta para pensar:**
Antes de operar, analiza la estructura: ¿cuál es la incógnita principal que debemos despejar y qué operaciones están afectando a esa variable?

*(Escribe tu idea de cuál sería tu primer paso o presiona "Dame una pista").*`,
      isDemo: true
    };
  }

  // MÓDULO IDIOMAS NATIVO
  const langKey = targetLanguage || 'Inglés';
  const langData = MULTILANG_SCENARIOS[langKey] || MULTILANG_SCENARIOS['Inglés'];
  
  let sceneKey = 'amigo';
  if (scenario.includes('Café') || scenario.includes('Londres')) sceneKey = 'Café';
  else if (scenario.includes('Aeropuerto') || scenario.includes('aduana') || scenario.includes('Aéroport')) sceneKey = 'Aeropuerto';
  else if (scenario.includes('Entrevista') || scenario.includes('trabajo') || scenario.includes('Entretien')) sceneKey = 'Entrevista';
  else if (scenario.includes('Hotel') || scenario.includes('Hôtel')) sceneKey = 'Hotel';

  const sceneDialogues = langData[sceneKey] || langData['amigo'];
  // La línea 0 es el saludo: cada respuesta del alumno avanza a la siguiente pregunta
  const userTurns = history.filter(h => h.role === 'user').length;
  const step = userTurns <= 0 ? 0 : 1 + ((userTurns - 1) % (sceneDialogues.length - 1));
  const currentStep = sceneDialogues[step];

  return {
    reply: `${currentStep.text}

*(Traducción en español: "${currentStep.es}")*

---FEEDBACK---
ERROR: ninguno (¡Muy buen intento!)
POR QUÉ: Tu frase se entiende con claridad y demuestras buena disposición para comunicarte.
NATIVO: ${currentStep.tip}
TIP: ${currentStep.tip}`,
    isDemo: true,
    translation: currentStep.es
  };
}

function generateDemoQuiz(topic, subject) {
  if (subject === 'math') {
    return {
      topic: topic || "Ecuaciones Lineales",
      subject: "math",
      questions: [
        {
          id: 1,
          question: "¿Cuál es el valor de $x$ en la ecuación $3x - 5 = 10$?",
          options: ["$x = 3$", "$x = 5$", "$x = 15$", "$x = 2$"],
          correctIndex: 1,
          explanation: "Sumamos $5$ a ambos lados: $3x = 15$. Luego dividimos entre $3$: $x = 15/3 = 5$.",
          xp: 25
        },
        {
          id: 2,
          question: "¿Qué representa la pendiente $m$ en la ecuación de la recta $y = mx + b$?",
          options: ["El punto donde corta al eje Y", "La inclinación o tasa de cambio de la recta", "El área bajo la curva", "La longitud de la recta"],
          correctIndex: 1,
          explanation: "La pendiente $m$ mide la inclinación de la recta y cómo cambia $y$ respecto a $x$.",
          xp: 25
        },
        {
          id: 3,
          question: "¿Cuál es el resultado de simplificar $\\frac{x^2 - 9}{x - 3}$ cuando $x \\neq 3$?",
          options: ["$x - 3$", "$x + 3$", "$x^2 - 3$", "$3x$"],
          correctIndex: 1,
          explanation: "Factorizamos la diferencia de cuadrados: $x^2 - 9 = (x - 3)(x + 3)$. Al dividir por $(x - 3)$ queda $x + 3$.",
          xp: 25
        },
        {
          id: 4,
          question: "Si un triángulo rectángulo tiene catetos de longitud 3 y 4, ¿cuánto mide la hipotenusa?",
          options: ["5", "7", "12", "6"],
          correctIndex: 0,
          explanation: "Por el Teorema de Pitágoras: $c = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.",
          xp: 25
        }
      ]
    };
  } else {
    return {
      topic: topic || "Present Perfect & Conversación",
      subject: "language",
      questions: [
        {
          id: 1,
          question: "Elige la opción gramaticalmente correcta para: 'Yo he vivido en esta ciudad por 5 años.'",
          options: [
            "I live in this city for 5 years.",
            "I have lived in this city for 5 years.",
            "I had live in this city since 5 years.",
            "I am living in this city for 5 years ago."
          ],
          correctIndex: 1,
          explanation: "Se usa el Present Perfect ('have lived') con 'for' para indicar una acción que comenzó en el pasado y continúa en el presente.",
          xp: 25
        },
        {
          id: 2,
          question: "¿Cuál es el significado correcto del phrasal verb 'give up'?",
          options: ["Regalar algo", "Rendirse o abandonar un hábito", "Subir el volumen", "Pedir perdón"],
          correctIndex: 1,
          explanation: "'To give up' significa rendirse o dejar de hacer algo (ej. 'Never give up!').",
          xp: 25
        },
        {
          id: 3,
          question: "En un restaurante en inglés, ¿cuál es la forma más cortés de pedir la cuenta?",
          options: [
            "Give me the paper now.",
            "Could we please have the bill / check?",
            "I need my price.",
            "Pay me please."
          ],
          correctIndex: 1,
          explanation: "'Could we please have the bill?' (UK) o 'check' (US) es la fórmula educada estándar.",
          xp: 25
        },
        {
          id: 4,
          question: "¿Cuál palabra es un 'false friend' (falso amigo) que NO significa lo que parece?",
          options: [
            "'Actually' (no significa actualmente, significa 'en realidad')",
            "'Hospital' (significa hospital)",
            "'Doctor' (significa doctor)",
            "'Family' (significa familia)"
          ],
          correctIndex: 0,
          explanation: "'Actually' significa 'en realidad' o 'de hecho'. Para decir 'actualmente' se usa 'currently'.",
          xp: 25
        }
      ]
    };
  }
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // Habilitar CORS para desarrollo local
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // Rutas API
  if (pathname === '/api/chat' && req.method === 'POST') {
    try {
      const data = await parseBody(req);
      const result = await handleGeminiChat(data);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify(result));
    } catch (err) {
      console.error('Error en /api/chat:', err);
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ error: err.message }));
    }
  }

  if (pathname === '/api/quiz' && req.method === 'POST') {
    try {
      const data = await parseBody(req);
      const result = await handleGenerateQuiz(data);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify(result));
    } catch (err) {
      console.error('Error en /api/quiz:', err);
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ error: err.message }));
    }
  }

  if (pathname === '/api/tts' && req.method === 'POST') {
    try {
      const data = await parseBody(req);
      const out = await handleAzureTts(data);
      if (out.audio) {
        res.writeHead(200, { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'no-store' });
        return res.end(out.audio);
      }
      res.writeHead(out.status, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ error: out.error }));
    } catch (err) {
      console.error('Error en /api/tts:', err);
      res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
      return res.end(JSON.stringify({ error: 'No se pudo conectar con Azure Speech.' }));
    }
  }

  if (pathname === '/api/status' && req.method === 'GET') {
    const hasKey = Boolean(process.env.GEMINI_API_KEY);
    const hasAzure = Boolean(process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION);
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({ hasEnvApiKey: hasKey, hasEnvAzure: hasAzure }));
  }

  // Servir archivos estáticos
  if (req.method === 'GET') {
    return serveStatic(req, res, pathname);
  }

  res.writeHead(405);
  res.end('Method Not Allowed');
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Tutor IA corriendo en: http://localhost:${PORT}`);
  console.log(`👉 Abre esa dirección en tu navegador para interactuar`);
  console.log(`====================================================`);
});

