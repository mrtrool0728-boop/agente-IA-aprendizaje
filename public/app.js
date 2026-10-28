// Con Yesion Aprendes - Lógica del Frontend, Motor de Gamificación y Videollamada Interactiva

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. ESTADO GLOBAL & GAMIFICACIÓN
  // ==========================================
  const BADGES_CONFIG = [
    {
      id: 'first_step',
      name: 'Primer paso',
      icon: 'i-send',
      color: '--c-lang',
      desc: 'Envía tu primer mensaje a cualquier tutor.',
      xpReward: 20
    },
    {
      id: 'math_mind',
      name: 'Mente lógica',
      icon: 'i-math',
      color: '--c-math',
      desc: 'Avanza 3 pasos resolviendo un ejercicio.',
      xpReward: 50
    },
    {
      id: 'polyglot',
      name: 'Políglota',
      icon: 'i-lang',
      color: '--c-lang',
      desc: 'Escribe 5 frases en un escenario de idiomas.',
      xpReward: 50
    },
    {
      id: 'eagle_eye',
      name: 'Ojo de águila',
      icon: 'i-camera',
      color: '--c-math',
      desc: 'Sube una foto de tu cuaderno o libro.',
      xpReward: 50
    },
    {
      id: 'quiz_master',
      name: 'Perfeccionista',
      icon: 'i-quiz',
      color: '--c-quiz',
      desc: 'Termina un quiz con todas las respuestas correctas.',
      xpReward: 80
    },
    {
      id: 'unstoppable',
      name: 'Imparable',
      icon: 'i-flame',
      color: '--c-badge',
      desc: 'Llega a 300 XP.',
      xpReward: 100
    }
  ];

  // Base de datos de idiomas y escenarios auténticos en su idioma nativo
  const LANG_SCENARIOS_DATA = {
    'Inglés': {
      'Café': { title: 'Café en Londres', sub: 'Pide comida y bebida', role: 'Barista', name: 'Emma', bg: 'fde68a', greet: "Hi there! Welcome to The London Roast. What can I get started for you today?", greetEs: "¡Hola! Bienvenido al Café. ¿Qué te gustaría pedir hoy?", cardWord: '"Could I please have an iced latte?"', cardMeaning: '"¿Me podría dar un latte helado, por favor?"', quickReplies: ['Could I have a coffee, please?', 'What do you recommend?', 'An iced latte to take away, please.'] },
      'Aeropuerto': { title: 'Aeropuerto y aduana', sub: 'Pasa el control de inmigración', role: 'Agente de inmigración', name: 'Officer Grant', bg: 'bfdbfe', greet: 'Good afternoon. May I see your passport and boarding pass, please?', greetEs: 'Buenas tardes. ¿Podría ver su pasaporte y tarjeta de embarque, por favor?', cardWord: '"I am staying for two weeks on vacation."', cardMeaning: '"Me quedaré dos semanas de vacaciones."', quickReplies: ['Here is my passport, officer.', 'I am here for vacation.', 'I will stay for two weeks.'] },
      'Entrevista': { title: 'Entrevista de trabajo', sub: 'Consigue un puesto en el exterior', role: 'Entrevistadora', name: 'Sarah', bg: 'ddd6fe', greet: 'Thanks for coming in today. Could you tell me a little about yourself?', greetEs: 'Gracias por venir hoy. ¿Podrías contarme un poco sobre ti?', cardWord: '"I have strong problem-solving skills."', cardMeaning: '"Tengo gran habilidad para resolver problemas."', quickReplies: ['I have experience in teamwork.', 'I am excited about this role.', 'I enjoy learning new skills.'] },
      'Hotel': { title: 'Check-in en un hotel', sub: 'Llega a tu hotel en Nueva York', role: 'Recepción', name: 'Daniel', bg: 'bbf7d0', greet: 'Good evening and welcome! Do you have a reservation with us?', greetEs: '¡Buenas noches y bienvenido! ¿Tiene una reserva con nosotros?', cardWord: '"I have a reservation under my name."', cardMeaning: '"Tengo una reserva a mi nombre."', quickReplies: ['Yes, I have a reservation.', 'Here is my ID card.', 'What time is breakfast?'] },
      'amigo': { title: 'Charla con un amigo', sub: 'Ponte al día en un parque', role: 'Amigo', name: 'Leo', bg: 'fecaca', greet: 'Hey! Long time no see. How have you been?', greetEs: '¡Hola! ¡Cuánto tiempo sin vernos! ¿Cómo has estado?', cardWord: '"It is great catching up with you!"', cardMeaning: '"¡Qué bueno es ponernos al día!"', quickReplies: ['I am doing great, and you?', 'Working hard lately!', 'Let us grab some coffee!'] }
    },
    'Francés': {
      'Café': { title: 'Café de Paris', sub: 'Commande café et croissants', role: 'Bariste', name: 'Amélie', bg: 'fde68a', greet: "Bonjour ! Bienvenue au Café de Paris. Que puis-je vous servir aujourd'hui ?", greetEs: "¡Buenos días! Bienvenido al Café de París. ¿Qué le sirvo hoy?", cardWord: '"Un café au lait, s\'il vous plaît."', cardMeaning: '"Un café con leche, por favor."', quickReplies: ['Un café au lait, s\'il vous plaît.', 'Qu\'est-ce que vous recommandez ?', 'Un croissant et un thé, merci !'] },
      'Aeropuerto': { title: 'Aéroport Charles de Gaulle', sub: 'Contrôle des passeports', role: 'Douanier', name: 'Moreau', bg: 'bfdbfe', greet: "Bonjour. Puis-je voir votre passeport et votre billet d'avion ?", greetEs: "Buenos días. ¿Puedo ver su pasaporte y boleto de avión?", cardWord: '"Je viens pour des vacances."', cardMeaning: '"Vengo por vacaciones."', quickReplies: ['Voici mon passeport, monsieur.', 'Je viens pour faire du tourisme.', 'Je reste ici dix jours.'] },
      'Entrevista': { title: 'Entretien d\'embauche', sub: 'Poste international à Paris', role: 'Recruteuse', name: 'Chloé', bg: 'ddd6fe', greet: "Bonjour et bienvenue. Pourriez-vous vous présenter brièvement ?", greetEs: "Buenos días y bienvenido. ¿Podría presentarse brevemente?", cardWord: '"J\'ai de l\'expérience en équipe."', cardMeaning: '"Tengo experiencia en trabajo de equipo."', quickReplies: ['Bonjour, enchanté de vous rencontrer.', 'J\'ai de l\'expérience professionnelle.', 'Ce poste me motive beaucoup.'] },
      'Hotel': { title: 'Hôtel de la Paix', sub: 'Enregistrement à Paris', role: 'Réception', name: 'Julien', bg: 'bbf7d0', greet: "Bonsoir et bienvenue ! Avez-vous une réservation chez nous ?", greetEs: "¡Buenas noches y bienvenido! ¿Tiene una reserva con nosotros?", cardWord: '"J\'ai réservé une chambre."', cardMeaning: '"He reservado una habitación."', quickReplies: ['Oui, j\'ai une réservation à mon nom.', 'Voici mon passeport.', 'À quelle heure est le petit-déjeuner ?'] },
      'amigo': { title: 'Retrouvailles entre amis', sub: 'Café aux Champs-Élysées', role: 'Ami', name: 'Antoine', bg: 'fecaca', greet: "Salut ! Ça fait un bail ! Comment vas-tu depuis la dernière fois ?", greetEs: "¡Hola! ¡Cuánto tiempo! ¿Cómo te va desde la última vez?", cardWord: '"Ça fait plaisir de te voir !"', cardMeaning: '"¡Qué gusto verte!"', quickReplies: ['Ça va super bien, et toi ?', 'Très occupé cette semaine !', 'Prenons un café ensemble !'] }
    },
    'Alemán': {
      'Café': { title: 'Berliner Kaffeehaus', sub: 'Kaffee und Kuchen bestellen', role: 'Barista', name: 'Lukas', bg: 'fde68a', greet: "Guten Tag! Willkommen im Kaffeehaus. Was darf ich Ihnen heute bringen?", greetEs: "¡Buenos días! Bienvenido a la cafetería. ¿Qué le traigo hoy?", cardWord: '"Einen Kaffee bitte."', cardMeaning: '"Un café por favor."', quickReplies: ['Einen Kaffee bitte.', 'Was empfehlen Sie?', 'Einen Tee zum Mitnehmen, danke!'] },
      'Aeropuerto': { title: 'Flughafen Frankfurt', sub: 'Passkontrolle und Zoll', role: 'Grenzbeamter', name: 'Weber', bg: 'bfdbfe', greet: "Guten Tag. Ihren Reisepass und Ihre Bordkarte bitte.", greetEs: "Buenos días. Su pasaporte y pase de abordar por favor.", cardWord: '"Ich bin für Urlaub hier."', cardMeaning: '"Estoy aquí de vacaciones."', quickReplies: ['Hier ist mein Reisepass.', 'Ich bin für Urlaub hier.', 'Ich bleibe für zwei Wochen.'] },
      'Entrevista': { title: 'Bewerbungsgespräch', sub: 'Jobinterview in München', role: 'Personalleiterin', name: 'Claudia', bg: 'ddd6fe', greet: "Guten Tag. Schön, dass Sie da sind. Erzählen Sie etwas über sich.", greetEs: "Buenos días. Qué bueno que esté aquí. Cuénteme sobre usted.", cardWord: '"Ich arbeite sehr gerne im Team."', cardMeaning: '"Me gusta mucho trabajar en equipo."', quickReplies: ['Guten Tag, freut mich sehr.', 'Ich habe Erfahrung im Fachbereich.', 'Ich lerne sehr gerne Neues.'] },
      'Hotel': { title: 'Hotel Berlin Mitte', sub: 'Einchecken an der Rezeption', role: 'Empfang', name: 'Felix', bg: 'bbf7d0', greet: "Guten Abend! Herzlich willkommen. Haben Sie eine Reservierung bei uns?", greetEs: "¡Buenas noches! Bienvenido. ¿Tiene una reserva con nosotros?", cardWord: '"Ich habe reserviert."', cardMeaning: '"He reservado."', quickReplies: ['Ja, ich habe reserviert.', 'Hier ist mein Ausweis.', 'Wann gibt es Frühstück?'] },
      'amigo': { title: 'Treffen mit einem Freund', sub: 'Gespräch im Park', role: 'Freund', name: 'Jonas', bg: 'fecaca', greet: "Hallo! Lange nicht gesehen! Wie geht es dir denn so?", greetEs: "¡Hola! ¡Cuánto tiempo sin vernos! ¿Cómo te va?", cardWord: '"Schön dich zu sehen!"', cardMeaning: '"¡Qué bueno verte!"', quickReplies: ['Mir geht es super, und dir?', 'Viel zu tun in letzter Zeit!', 'Lass uns einen Kaffee trinken!'] }
    },
    'Italiano': {
      'Café': { title: 'Caffè a Roma', sub: 'Ordina caffè e cornetto', role: 'Barista', name: 'Matteo', bg: 'fde68a', greet: "Ciao! Benvenuto al nostro caffè. Cosa posso prepararti oggi?", greetEs: "¡Hola! Bienvenido a nuestro café. ¿Qué te preparo hoy?", cardWord: '"Un cappuccino, per favore."', cardMeaning: '"Un capuchino, por favor."', quickReplies: ['Un cappuccino e un cornetto, grazie.', 'Cosa mi consigli?', 'Un caffè espresso al banco.'] },
      'Aeropuerto': { title: 'Aeroporto di Roma', sub: 'Controllo passaporti', role: 'Ufficiale', name: 'Rossi', bg: 'bfdbfe', greet: "Buongiorno. Posso vedere il suo passaporto e la carta d'imbarco?", greetEs: "Buenos días. ¿Puedo ver su pasaporte y pase de abordar?", cardWord: '"Sono qui per vacanza."', cardMeaning: '"Estoy aquí de vacaciones."', quickReplies: ['Ecco il mio passaporto.', 'Sono qui per turismo e vacanza.', 'Mi fermo per dieci giorni.'] },
      'Entrevista': { title: 'Colloquio di lavoro', sub: 'Azienda a Milano', role: 'Selezionatrice', name: 'Giulia', bg: 'ddd6fe', greet: "Buongiorno e benvenuto. Ci racconti qualcosa sul suo percorso.", greetEs: "Buenos días y bienvenido. Cuéntenos sobre su trayectoria.", cardWord: '"Ho ottime capacità di squadra."', cardMeaning: '"Tengo gran capacidad para trabajar en equipo."', quickReplies: ['Buongiorno, molto lieto di essere qui.', 'Ho esperienza nel settore.', 'Sono pronto per nuove sfide.'] },
      'Hotel': { title: 'Hotel a Firenze', sub: 'Check-in alla reception', role: 'Ricezione', name: 'Marco', bg: 'bbf7d0', greet: "Buonasera e benvenuto all'hotel! Ha una prenotazione a suo nome?", greetEs: "¡Buenas noches y bienvenido! ¿Tiene una reserva a su nombre?", cardWord: '"Ho una prenotazione."', cardMeaning: '"Tengo una reserva."', quickReplies: ['Sì, ho una prenotazione a mio nome.', 'Ecco il mio documento.', 'A che ora è la colazione?'] },
      'amigo': { title: 'Incontro con un amico', sub: 'Due chiacchiere in piazza', role: 'Amico', name: 'Luca', bg: 'fecaca', greet: "Ciao! Che piacere rivederti! Come vanno le cose ultimamente?", greetEs: "¡Hola! ¡Qué placer verte! ¿Cómo van las cosas?", cardWord: '"Che bello rivederti!"', cardMeaning: '"¡Qué lindo verte otra vez!"', quickReplies: ['Tutto benissimo, grazie! E tu?', 'Molto da fare ultimamente!', 'Prendiamoci una pizza insieme!'] }
    },
    'Portugués': {
      'Café': { title: 'Café em Lisboa', sub: 'Pede café e pastel de nata', role: 'Barista', name: 'Tiago', bg: 'fde68a', greet: "Olá! Bem-vindo ao nosso café em Lisboa. O que vai desejar hoje?", greetEs: "¡Hola! Bienvenido a nuestro café en Lisboa. ¿Qué va a desear hoy?", cardWord: '"Um café e um pastel de nata."', cardMeaning: '"Un café y un pastel de nata."', quickReplies: ['Um café e um pastel de nata, por favor.', 'O que você me recomenda?', 'Apenas uma água com gás, obrigado.'] },
      'Aeropuerto': { title: 'Aeroporto de Lisboa', sub: 'Controlo de imigração', role: 'Agente', name: 'Silva', bg: 'bfdbfe', greet: "Boa tarde. Pode mostrar-me o seu passaporte e o cartão de embarque?", greetEs: "Buenas tardes. ¿Puede mostrarme su pasaporte y pase de abordar?", cardWord: '"Venho passar férias."', cardMeaning: '"Vengo a pasar vacaciones."', quickReplies: ['Com certeza, aqui está.', 'Venho passar férias e passear.', 'Vou ficar por duas semanas.'] },
      'Entrevista': { title: 'Entrevista de emprego', sub: 'Oportunidade internacional', role: 'Entrevistadora', name: 'Sofia', bg: 'ddd6fe', greet: "Olá e bem-vindo. Poderia falar-nos um pouco sobre a sua trajetória?", greetEs: "Hola y bienvenido. ¿Podría hablarnos un poco sobre su trayectoria?", cardWord: '"Gosto muito de colaborar em equipa."', cardMeaning: '"Me gusta mucho colaborar en equipo."', quickReplies: ['Olá, muito prazer em estar aqui.', 'Tenho boa experiência profissional.', 'Esta vaga motiva-me muito.'] },
      'Hotel': { title: 'Hotel no Porto', sub: 'Check-in na receção', role: 'Receção', name: 'Rodrigo', bg: 'bbf7d0', greet: "Boa noite e bem-vindo! Tem uma reserva connosco?", greetEs: "¡Buenas noches y bienvenido! ¿Tiene una reserva con nosotros?", cardWord: '"Tenho uma reserva."', cardMeaning: '"Tengo una reserva."', quickReplies: ['Sim, tenho uma reserva em meu nome.', 'Aqui tem o meu passaporte.', 'A que horas servem o pequeno-almoço?'] },
      'amigo': { title: 'Conversa com um amigo', sub: 'Passeio no miradouro', role: 'Amigo', name: 'Bruno', bg: 'fecaca', greet: "Olá amigo! Há quanto tempo! Como é que tens passado?", greetEs: "¡Hola amigo! ¡Cuánto tiempo! ¿Cómo has estado?", cardWord: '"É tão bom encontrar-te!"', cardMeaning: '"¡Es tan bueno encontrarte!"', quickReplies: ['Tem corrido tudo bem, e contigo?', 'Bastante ocupado, mas feliz!', 'Vamos marcar um almoço!'] }
    },
    'Japonés': {
      'Café': { title: '東京カフェ (Tokyo Café)', sub: 'カフェの注文', role: '店員 (Camarera)', name: 'Sakura', bg: 'fde68a', greet: "いらっしゃいませ！東京カフェへようこそ。ご注文はお決まりですか？", greetEs: "¡Bienvenido a Tokyo Café! ¿Tiene listo su pedido?", cardWord: '"アイスコーヒーをお願いします。"', cardMeaning: '"Un café helado por favor."', quickReplies: ['アイスコーヒーをお願いします。', 'おすすめは何ですか？', 'お水をください。'] },
      'Aeropuerto': { title: '成田空港 (Aeropuerto Narita)', sub: '入国審査 (Inmigración)', role: '審査官 (Oficial)', name: 'Tanaka', bg: 'bfdbfe', greet: "こんにちは。パスポートと搭乗券を見せていただけますか？", greetEs: "Buenas tardes. ¿Me muestra su pasaporte y pase de abordar?", cardWord: '"観光で来ました。"', cardMeaning: '"Vine de turismo."', quickReplies: ['はい、どうぞ。', '観光で来ました。', '二週間滞在します。'] },
      'Entrevista': { title: '採用面接 (Entrevista)', sub: '東京オフィスでの面接', role: '面接官 (Entrevistador)', name: 'Takahashi', bg: 'ddd6fe', greet: "本日はお越しいただきありがとうございます。簡単に自己紹介をお願いします。", greetEs: "Gracias por venir hoy. Por favor preséntese brevemente.", cardWord: '"チームワークが得意です。"', cardMeaning: '"Soy bueno en trabajo de equipo."', quickReplies: ['初めまして、よろしくお願いします。', '私の経験についてお話しします。', 'この仕事にとても興味があります。'] },
      'Hotel': { title: '京都の旅館 (Hotel en Kioto)', sub: 'チェックイン (Check-in)', role: 'フロント (Recepción)', name: 'Sato', bg: 'bbf7d0', greet: "いらっしゃいませ。ご宿泊の予約はお持ちでしょうか？", greetEs: "Bienvenido. ¿Cuenta con una reserva?", cardWord: '"予約しています。"', cardMeaning: '"Tengo una reserva."', quickReplies: ['はい、予約しています。', 'パスポートはこちらです。', '朝食は何時ですか？'] },
      'amigo': { title: '友達とのおしゃべり (Amigo)', sub: '上野公園での会話', role: '友人 (Amigo)', name: 'Kenta', bg: 'fecaca', greet: "久しぶり！最近元気にしてた？", greetEs: "¡Cuánto tiempo! ¿Cómo has estado?", cardWord: '"会えて嬉しいよ！"', cardMeaning: '"¡Qué bueno verte!"', quickReplies: ['うん、元気だったよ！そっちは？', '最近忙しかったよ。', '今度ご飯食べに行こう！'] }
    }
  };

  const LANGS = [
    { value: 'Inglés', native: 'English', flag: 'gb' },
    { value: 'Francés', native: 'Français', flag: 'fr' },
    { value: 'Alemán', native: 'Deutsch', flag: 'de' },
    { value: 'Italiano', native: 'Italiano', flag: 'it' },
    { value: 'Portugués', native: 'Português', flag: 'br' },
    { value: 'Japonés', native: '日本語', flag: 'jp' }
  ];

  const flagUrl = (code) => `https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/flags/4x3/${code}.svg`;
  const avatarUrl = (seed, bg) => `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=${bg}&radius=50&mouth=smile,default&eyes=happy,default&eyebrows=default,raisedExcited&facialHairProbability=0&accessoriesProbability=20&clothing=collarAndSweater,shirtCrewNeck,blazerAndShirt`;
  const MATH_AVATAR = avatarUrl('Yesion', 'c7d2fe');
  // Un cuadro del mismo personaje con boca y ojos fijos; la videollamada alterna cuadros para animarlo
  const avatarFrameUrl = (seed, mouth, eyes) => `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed)}&mouth=${mouth}&eyes=${eyes}&eyebrows=default&facialHairProbability=0&accessoriesProbability=20&clothing=collarAndSweater,shirtCrewNeck,blazerAndShirt`;

  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const noEmoji = (s) => String(s || '').replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}]️?\s?/gu, '');
  const icon = (id) => `<svg class="ico"><use href="#${id}"/></svg>`;

  let state = {
    apiKey: localStorage.getItem('omni_tutor_api_key') || '',
    xp: parseInt(localStorage.getItem('omni_tutor_xp') || '0', 10),
    streak: parseInt(localStorage.getItem('omni_tutor_streak') || '1', 10),
    lastDate: localStorage.getItem('omni_tutor_last_date') || '',
    badges: JSON.parse(localStorage.getItem('omni_tutor_badges') || '[]'),
    mathCount: parseInt(localStorage.getItem('omni_tutor_math_count') || '0', 10),
    langCount: parseInt(localStorage.getItem('omni_tutor_lang_count') || '0', 10),
    photoCount: parseInt(localStorage.getItem('omni_tutor_photo_count') || '0', 10),
    
    mathHistory: [],
    langHistory: [],

    mathImageBase64: null,
    mathImageMime: null,

    currentQuiz: null,
    currentQuestionIndex: 0,
    quizScore: 0
  };

  checkStreak();
  updateGamificationUI();
  renderAchievements();
  checkApiStatus();

  // ==========================================
  // SERVICIO INTELIGENTE (Sin obligación de Gemini)
  // ==========================================
  async function callChatService(payload) {
    if (window.location.protocol !== 'file:') {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          return await response.json();
        }
      } catch (e) {
        console.warn('Servidor local no disponible, ejecutando respuesta pedagógica local...', e);
      }
    }

    if (payload.apiKey) {
      try {
        return await callGeminiDirectly(payload);
      } catch (err) {
        console.error('Error al llamar a Gemini directamente:', err);
      }
    }

    // Respuesta inteligente local (nunca molesta pidiendo claves)
    return generateClientDemoResponse(payload);
  }

  async function callGeminiDirectly(payload) {
    const { message, imageBase64, imageMimeType, mode, scenario, targetLanguage, history = [], apiKey } = payload;
    let systemInstruction = '';

    if (mode === 'math') {
      systemInstruction = `Eres Yesion, el Profesor Socrático de Matemáticas de 'Con Yesion Aprendes'.
Guía al estudiante paso a paso haciéndole preguntas clave para que descubra la solución por sí mismo.
Escribe fórmulas en notación LaTeX ($...$). Si el alumno comete un error, explícale amablemente por qué ocurre y dale una pista.`;
    } else {
      const lang = targetLanguage || 'Inglés';
      const scen = scenario || 'Café';
      systemInstruction = `Eres un Tutor Nativo de Idiomas de 'Con Yesion Aprendes'.
Estás conversando en el idioma: ${lang} dentro de la situación: "${scen}".
1. Responde de forma natural y atractiva en el idioma meta (${lang}).
2. Si el alumno es principiante o se equivoca, añade una línea con la traducción al español.
3. Añade siempre "---FEEDBACK---" con correcciones amables en español, cómo lo diría un nativo y un tip útil.`;
    }

    const contents = [];
    for (const h of history) {
      contents.push({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }]
      });
    }

    const currentParts = [];
    if (imageBase64) {
      currentParts.push({
        inlineData: {
          data: imageBase64.replace(/^data:image\/\w+;base64,/, ''),
          mimeType: imageMimeType || 'image/jpeg'
        }
      });
    }
    if (message) {
      currentParts.push({ text: message });
    }

    contents.push({ role: 'user', parts: currentParts });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: { temperature: 0.7, maxOutputTokens: 1200 }
      })
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }

    const data = await res.json();
    const replyText = data.candidates?.[0]?.parts?.[0]?.text || 'Sin respuesta';
    return { reply: replyText, isLive: true };
  }

  // Motor pedagógico local (funciona al 100% sin clave de API)
  function generateClientDemoResponse(payload) {
    const { mode, message = '', targetLanguage = 'Inglés', scenario = '', history = [] } = payload;
    const lower = message.toLowerCase();
    const turn = Math.max(0, Math.floor((history.length - 1) / 2));

    if (mode === 'math') {
      if (lower.includes('pista')) {
        return {
          reply: `**Pista socrática de Yesion:**
Recuerda que una ecuación es como una balanza: todo lo que hagas a la izquierda debes hacerlo exactamente igual a la derecha.
Si tenemos una suma como $+12$, ¿qué operación contraria podemos aplicar a ambos lados para despejar la incógnita?`,
          isDemo: true
        };
      }
      if (lower.includes('rindo') || lower.includes('explícame') || lower.includes('explicame') || lower.includes('paso a paso')) {
        return {
          reply: `**Explicación paso a paso del Profe Yesion:**
Resolvamos la ecuación:
$$3x + 12 = 30$$

1. **Paso 1:** Restamos $12$ en ambos miembros para aislar el término con la variable:
   $$3x = 30 - 12 \\implies 3x = 18$$

2. **Paso 2:** Como el $3$ está multiplicando a la $x$, dividimos ambos miembros entre $3$:
   $$x = \\frac{18}{3} \\implies x = 6$$

3. **Comprobación:** Sustituimos $x = 6$:
   $$3(6) + 12 = 18 + 12 = 30 \\quad \\text{¡Correcto!}$$

¿Quieres intentar otro ejercicio de las tarjetas de la derecha para ponerlo en práctica?`,
          isDemo: true
        };
      }
      return {
        reply: `¡Excelente ejercicio! Vamos a razonarlo juntos paso a paso:
**${message || 'Tu ejercicio'}**

💡 **Pregunta del Profe Yesion para empezar:**
¿Cuál es la incógnita que queremos calcular y qué operaciones matemáticas la están acompañando ahora mismo?`,
        isDemo: true
      };
    }

    // MÓDULO IDIOMAS LOCAL MULTILINGÜE
    const langKey = targetLanguage || 'Inglés';
    const langDict = LANG_SCENARIOS_DATA[langKey] || LANG_SCENARIOS_DATA['Inglés'];
    
    let scKey = 'amigo';
    if (scenario.includes('Café') || scenario.includes('Kaffee') || scenario.includes('Caffè')) scKey = 'Café';
    else if (scenario.includes('Aeropuerto') || scenario.includes('Aéroport') || scenario.includes('Flughafen') || scenario.includes('Aeroporto')) scKey = 'Aeropuerto';
    else if (scenario.includes('Entrevista') || scenario.includes('Entretien') || scenario.includes('Bewerbungsgespräch') || scenario.includes('Colloquio')) scKey = 'Entrevista';
    else if (scenario.includes('Hotel') || scenario.includes('Hôtel')) scKey = 'Hotel';

    const scData = langDict[scKey] || langDict['amigo'];
    const currentTurn = scData;

    return {
      reply: `${currentTurn.greet}

*(Español: "${currentTurn.greetEs}")*

---FEEDBACK---
ERROR: ninguno (¡Excelente pronunciación y ritmo!)
POR QUÉ: Te has comunicado con claridad y naturalidad.
NATIVO: ${currentTurn.cardWord}
TIP: Puedes responder usando una de las opciones rápidas de abajo para sonar como un nativo.`,
      isDemo: true,
      translation: currentTurn.greetEs,
      quickReplies: currentTurn.quickReplies
    };
  }

  async function callQuizService(payload) {
    if (window.location.protocol !== 'file:') {
      try {
        const response = await fetch('/api/quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (response.ok) return await response.json();
      } catch (e) {
        console.warn('Servidor local no disponible para quiz, usando fallback...', e);
      }
    }
    return generateClientDemoQuiz(payload.topic, payload.subject);
  }

  function generateClientDemoQuiz(topic, subject) {
    if (subject === 'math') {
      return {
        topic: topic || "Ecuaciones y Álgebra",
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
            question: "¿Qué representa la pendiente $m$ en la recta $y = mx + b$?",
            options: ["El corte con el eje Y", "La inclinación o tasa de cambio de la recta", "El área del triángulo", "El punto medio"],
            correctIndex: 1,
            explanation: "La pendiente $m$ mide la inclinación y la tasa de variación de $y$ respecto a $x$.",
            xp: 25
          },
          {
            id: 3,
            question: "¿Cuál es el resultado de simplificar $\\frac{x^2 - 9}{x - 3}$ para $x \\neq 3$?",
            options: ["$x - 3$", "$x + 3$", "$x^2 - 3$", "$3x$"],
            correctIndex: 1,
            explanation: "Factorizamos la diferencia de cuadrados: $x^2 - 9 = (x - 3)(x + 3)$. Simplificando queda $x + 3$.",
            xp: 25
          },
          {
            id: 4,
            question: "En un triángulo rectángulo de catetos 3 y 4, ¿cuánto mide la hipotenusa?",
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
            question: "Elige la opción correcta para: 'Yo he vivido en esta ciudad por 5 años.'",
            options: [
              "I live in this city for 5 years.",
              "I have lived in this city for 5 years.",
              "I had live in this city since 5 years.",
              "I am living in this city for 5 years ago."
            ],
            correctIndex: 1,
            explanation: "Se usa el Present Perfect ('have lived') con 'for' para acciones que empezaron en el pasado y continúan.",
            xp: 25
          },
          {
            id: 2,
            question: "¿Qué significa el phrasal verb 'give up'?",
            options: ["Regalar algo", "Rendirse o abandonar un hábito", "Subir el volumen", "Pedir un favor"],
            correctIndex: 1,
            explanation: "'To give up' significa rendirse o desistir (ej. 'Never give up!').",
            xp: 25
          },
          {
            id: 3,
            question: "¿Cuál es la forma más natural y educada de pedir la cuenta en un restaurante?",
            options: [
              "Give me the paper now.",
              "Could we please have the bill / check?",
              "I need my price.",
              "Pay me please."
            ],
            correctIndex: 1,
            explanation: "'Could we please have the bill?' (UK) o 'check' (US) es la fórmula estándar de cortesía.",
            xp: 25
          },
          {
            id: 4,
            question: "¿Cuál de estas palabras es un 'falso amigo' (false friend)?",
            options: [
              "'Actually' (significa 'en realidad', no 'actualmente')",
              "'Hospital' (significa hospital)",
              "'Doctor' (significa doctor)",
              "'Music' (significa música)"
            ],
            correctIndex: 0,
            explanation: "'Actually' significa 'en realidad'. Para decir 'actualmente' se usa 'currently'.",
            xp: 25
          }
        ]
      };
    }
  }

  // ==========================================
  // 2. NAVEGACIÓN POR PESTAÑAS
  // ==========================================
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabPanes = document.querySelectorAll('.tab-pane');

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');
      navTabs.forEach(t => t.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(targetId)?.classList.add('active');
    });
  });

  // ==========================================
  // 3. MÓDULO MATEMÁTICAS REFORMULADO
  // ==========================================
  const mathMessages = document.getElementById('math-messages');
  const mathInput = document.getElementById('math-input');
  const btnSendMath = document.getElementById('btn-send-math');
  const mathFileInput = document.getElementById('math-file-input');
  const mathImagePreview = document.getElementById('math-image-preview');
  const mathPreviewImg = document.getElementById('math-preview-img');
  const btnRemoveMathImg = document.getElementById('btn-remove-math-img');
  const mathQuickHints = document.getElementById('math-quick-hints');
  const mathLevelsSelector = document.getElementById('math-levels-selector');

  document.querySelectorAll('#math-avatar, [data-avatar="math"]').forEach(img => { img.src = MATH_AVATAR; });

  // Selector de niveles educativos (Primaria, Secundaria, Geometría, Lógica)
  if (mathLevelsSelector) {
    mathLevelsSelector.addEventListener('click', (e) => {
      const btn = e.target.closest('.level-pill');
      if (!btn) return;
      mathLevelsSelector.querySelectorAll('.level-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const level = btn.getAttribute('data-level');

      document.querySelectorAll('#math-cards-catalog .math-card-item').forEach(card => {
        const cardLevel = card.getAttribute('data-level-tag');
        if (level === 'all' || cardLevel === level) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // ---- Profe sin IA (math-coach.js): ejercicios por niveles que revisan cada respuesta ----
  const MATH_PROGRESS_KEY = 'omni_tutor_math_progress';
  let mathSession = null;

  function mathProgress() {
    try { return JSON.parse(localStorage.getItem(MATH_PROGRESS_KEY)) || { level: 1, done: [] }; }
    catch (e) { return { level: 1, done: [] }; }
  }
  function saveMathProgress(p) {
    try { localStorage.setItem(MATH_PROGRESS_KEY, JSON.stringify(p)); } catch (e) { /* sin almacenamiento */ }
  }

  // Siguiente ejercicio pendiente del nivel; al terminar el nivel sube al siguiente
  function nextMathExercise() {
    const MC = window.MathCoach;
    const p = mathProgress();
    let pending = MC.ofLevel(p.level).filter(e => !p.done.includes(e.id));
    if (!pending.length && p.level < 3) {
      p.level++;
      saveMathProgress(p);
      pending = MC.ofLevel(p.level).filter(e => !p.done.includes(e.id));
    }
    if (!pending.length) {
      // Nivel 3 completo: se vuelve a practicar desde el principio del nivel
      p.done = p.done.filter(id => MC.byId(id)?.level !== 3);
      saveMathProgress(p);
      pending = MC.ofLevel(3);
    }
    return pending[0];
  }

  function showExerciseOnBoards(ex) {
    const tex = `$$${ex.tex}$$`;
    const levelText = `Nivel ${ex.level} · ${window.MathCoach.LEVEL_NAMES[ex.level]}`;
    const set = (id, text, math) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.textContent = text;
      if (math) renderMathInElement(el);
    };
    set('math-board-title', ex.title);
    set('math-board-formula', tex, true);
    set('math-board-desc', ex.desc);
    set('math-board-level', levelText);
    set('call-math-content', tex, true);
    set('call-math-step', `${levelText} · ${ex.title}`);
  }

  function startMathExercise(ex) {
    mathSession = window.MathCoach.createSession(ex);
    showExerciseOnBoards(ex);
    return mathSession;
  }

  // Aplica un turno: si el ejercicio terminó, lo guarda, da XP y arranca el siguiente
  function mathAdvance(result) {
    if (!result.done) return { say: result.say, next: '' };
    const p = mathProgress();
    if (!p.done.includes(mathSession.exercise.id)) p.done.push(mathSession.exercise.id);
    const levelBefore = p.level;
    saveMathProgress(p);
    state.mathCount++;
    localStorage.setItem('omni_tutor_math_count', state.mathCount);
    unlockBadge('first_step');
    if (state.mathCount >= 3) unlockBadge('math_mind');
    addXP(20, 'Ejercicio resuelto');
    const ex = nextMathExercise();
    const leveled = ex.level > levelBefore;
    startMathExercise(ex);
    const up = leveled ? ` ¡Subiste al nivel ${ex.level}: ${window.MathCoach.LEVEL_NAMES[ex.level]}!` : '';
    return { say: `${result.say}${up} Sigamos con el siguiente.`, next: mathSession.intro() };
  }

  // Chat de Matemáticas sin IA
  function localMathChat(text) {
    if (!mathSession) {
      startMathExercise(nextMathExercise());
      appendMessage(mathMessages, 'assistant', `Sin la IA conectada te guío con ejercicios por niveles y reviso cada respuesta. ${mathSession.intro()}`, 'Profe Yesion');
      return;
    }
    const out = mathAdvance(mathSession.answer(text));
    appendMessage(mathMessages, 'assistant', out.say, 'Profe Yesion');
    if (out.next) appendMessage(mathMessages, 'assistant', out.next, 'Profe Yesion');
  }

  // Clic en tarjetas de ejercicios de matemáticas
  document.querySelectorAll('.examples .chip, .math-card-item').forEach(elem => {
    elem.addEventListener('click', () => {
      // Sin IA: la tarjeta abre ese ejercicio guiado
      if (!state.hasLiveAI && elem.dataset.exercise && window.MathCoach?.byId(elem.dataset.exercise)) {
        startMathExercise(window.MathCoach.byId(elem.dataset.exercise));
        appendMessage(mathMessages, 'assistant', mathSession.intro(), 'Profe Yesion');
        document.querySelector('.math-chat-card')?.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      const prompt = elem.getAttribute('data-math-prompt') || elem.getAttribute('data-input');
      const title = elem.querySelector('h3')?.textContent || 'Ejercicio';
      const formulaEl = elem.querySelector('.math-card-formula');
      const formula = formulaEl ? (formulaEl.dataset.tex || formulaEl.textContent) : '';
      const desc = elem.querySelector('p')?.textContent || '';

      // Actualizar tarjeta activa del profesor
      const boardTitle = document.getElementById('math-board-title');
      const boardFormula = document.getElementById('math-board-formula');
      const boardDesc = document.getElementById('math-board-desc');
      if (boardTitle) boardTitle.textContent = title;
      if (boardFormula) {
        boardFormula.textContent = formula;
        renderMathInElement(boardFormula);
      }
      if (boardDesc) boardDesc.textContent = desc;

      // Sincronizar también la pizarra de la videollamada
      const callMathContent = document.getElementById('call-math-content');
      const callMathStep = document.getElementById('call-math-step');
      if (callMathContent) {
        callMathContent.textContent = formula;
        renderMathInElement(callMathContent);
      }
      if (callMathStep) callMathStep.textContent = `Analizando: ${title}. ${desc}`;

      if (prompt) {
        mathInput.value = prompt;
        sendMathMessage();
        document.querySelector('.math-chat-card')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Acciones socráticas rápidas
  mathQuickHints.querySelectorAll('.btn-hint, .card-action-hint, .chip-action').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      if (!state.hasLiveAI && window.MathCoach) {
        if (!mathSession) { localMathChat(''); return; }
        if (action === 'check') {
          appendMessage(mathMessages, 'assistant', `Escríbeme tu respuesta y te digo si está bien. La pregunta es: ${mathSession.step.ask}`, 'Profe Yesion');
          return;
        }
        const out = mathAdvance(action === 'hint' ? mathSession.hint() : mathSession.explain());
        appendMessage(mathMessages, 'assistant', out.say, 'Profe Yesion');
        if (out.next) appendMessage(mathMessages, 'assistant', out.next, 'Profe Yesion');
        return;
      }
      if (action === 'hint') {
        mathInput.value = 'Dame una pequeña pista para el siguiente paso, por favor.';
      } else if (action === 'check') {
        mathInput.value = '¿Voy por buen camino? Revisa lo que he planteado.';
      } else if (action === 'explain') {
        mathInput.value = 'Me rindo con este paso, por favor explícame la solución completa detallada.';
      }
      sendMathMessage();
    });
  });

  mathInput.addEventListener('input', () => {
    mathInput.style.height = 'auto';
    mathInput.style.height = Math.min(mathInput.scrollHeight, 120) + 'px';
  });

  mathInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMathMessage();
    }
  });

  btnSendMath.addEventListener('click', sendMathMessage);

  mathFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      state.mathImageBase64 = event.target.result;
      state.mathImageMime = file.type || 'image/jpeg';
      mathPreviewImg.src = state.mathImageBase64;
      mathImagePreview.style.display = 'flex';

      state.photoCount++;
      localStorage.setItem('omni_tutor_photo_count', state.photoCount);
      unlockBadge('eagle_eye');
      addXP(15, '¡Foto de libreta cargada!');
    };
    reader.readAsDataURL(file);
  });

  btnRemoveMathImg.addEventListener('click', () => {
    state.mathImageBase64 = null;
    state.mathImageMime = null;
    mathFileInput.value = '';
    mathImagePreview.style.display = 'none';
  });

  async function sendMathMessage() {
    const text = mathInput.value.trim();
    if (!text && !state.mathImageBase64) return;

    appendMessage(mathMessages, 'user', text, 'Tú', state.mathImageBase64);
    
    const imageToSend = state.mathImageBase64;
    const mimeToSend = state.mathImageMime;
    mathInput.value = '';
    mathInput.style.height = 'auto';
    btnRemoveMathImg.click();

    // Sin IA: el profe local revisa la respuesta del ejercicio en curso
    if (!state.hasLiveAI && window.MathCoach) {
      if (imageToSend) {
        appendMessage(mathMessages, 'assistant', 'Para leer fotos del cuaderno necesito la IA conectada (Gemini). Mientras tanto, te guío con los ejercicios de la biblioteca.', 'Profe Yesion');
        if (!mathSession) localMathChat('');
        return;
      }
      localMathChat(text);
      return;
    }

    state.mathHistory.push({ role: 'user', content: text || 'Revisa este problema de la imagen' });
    const loadingElem = showLoadingBubble(mathMessages, 'Profe Yesion');

    try {
      const data = await callChatService({
        message: text,
        imageBase64: imageToSend,
        imageMimeType: mimeToSend,
        mode: 'math',
        history: state.mathHistory.slice(-6),
        apiKey: state.apiKey
      });

      loadingElem.remove();

      if (data.error) {
        appendMessage(mathMessages, 'assistant error', `No pude responder: ${data.error}`, 'Aviso');
        return;
      }

      state.mathHistory.push({ role: 'assistant', content: data.reply });
      appendMessage(mathMessages, 'assistant', data.reply, 'Profe Yesion');

      state.mathCount++;
      localStorage.setItem('omni_tutor_math_count', state.mathCount);
      unlockBadge('first_step');
      if (state.mathCount >= 3) unlockBadge('math_mind');
      addXP(10, '+10 XP Paso matemático');

    } catch (err) {
      loadingElem.remove();
      appendMessage(mathMessages, 'assistant error', 'No se pudo procesar tu mensaje. Revisa tu conexión e inténtalo otra vez.', 'Aviso');
    }
  }

  // ==========================================
  // 4. MÓDULO IDIOMAS (100% Nativo y para Principiantes)
  // ==========================================
  const langMessages = document.getElementById('lang-messages');
  const langInput = document.getElementById('lang-input');
  const btnSendLang = document.getElementById('btn-send-lang');
  const langSelect = document.getElementById('lang-select');
  const scenarioSelect = document.getElementById('scenario-select');
  const btnResetScenario = document.getElementById('btn-reset-scenario');
  const liveFeedback = document.getElementById('live-feedback');
  const beginnerChipsGroup = document.getElementById('beginner-chips-group');

  const langPicker = document.getElementById('lang-picker');
  const langChat = document.getElementById('lang-chat');
  const flagGrid = document.getElementById('flag-grid');
  const sceneGrid = document.getElementById('scene-grid');

  function getScenarioKey(scName) {
    if (scName.includes('Café') || scName.includes('Kaffee') || scName.includes('Caffè') || scName.includes('Paris')) return 'Café';
    if (scName.includes('Aeropuerto') || scName.includes('Aéroport') || scName.includes('Flughafen') || scName.includes('Aeroporto') || scName.includes('Narita')) return 'Aeropuerto';
    if (scName.includes('Entrevista') || scName.includes('Entretien') || scName.includes('Bewerbungsgespräch') || scName.includes('Colloquio')) return 'Entrevista';
    if (scName.includes('Hotel') || scName.includes('Hôtel')) return 'Hotel';
    return 'amigo';
  }

  function currentScenario() {
    const lang = langSelect.value;
    const langScenarios = LANG_SCENARIOS_DATA[lang] || LANG_SCENARIOS_DATA['Inglés'];
    const key = getScenarioKey(scenarioSelect.value);
    return langScenarios[key] || langScenarios['Café'];
  }

  const currentLang = () => LANGS.find(l => l.value === langSelect.value) || LANGS[0];
  const scenarioAvatar = () => avatarUrl(currentScenario().name, currentScenario().bg);

  // Renderizar banderas y tarjetas de situaciones auténticas en el idioma elegido
  function renderPicker() {
    const lang = langSelect.value;
    const langScenarios = LANG_SCENARIOS_DATA[lang] || LANG_SCENARIOS_DATA['Inglés'];

    flagGrid.innerHTML = LANGS.map(l => `
      <button class="flag-tile ${l.value === langSelect.value ? 'selected' : ''}" role="radio" aria-checked="${l.value === langSelect.value}" data-lang="${l.value}">
        <img src="${flagUrl(l.flag)}" alt="">
        <b>${l.native}</b><small>${l.value}</small>
      </button>`).join('');

    sceneGrid.innerHTML = Object.entries(langScenarios).map(([key, sc]) => `
      <button class="scene-card" data-scene-key="${key}" data-scene="${esc(sc.title)}">
        <img class="avatar avatar-xl" src="${avatarUrl(sc.name, sc.bg)}" alt="">
        <span class="scene-text">
          <b>${sc.title}</b>
          <small>${sc.sub}</small>
          <em>${sc.name} · ${sc.role}</em>
        </span>
        <span class="scene-go">${icon('i-arrow')}</span>
      </button>`).join('');
  }

  flagGrid.addEventListener('click', (e) => {
    const tile = e.target.closest('.flag-tile');
    if (!tile) return;
    langSelect.value = tile.dataset.lang;
    renderPicker();
  });

  sceneGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.scene-card');
    if (!card) return;
    // El select guarda el valor original de la opción; se busca la que corresponde a la situación
    const opt = [...scenarioSelect.options].find(o => getScenarioKey(o.value) === card.dataset.sceneKey);
    if (opt) scenarioSelect.value = opt.value;
    langPicker.hidden = true;
    langChat.hidden = false;
    startScenario();
    langInput.focus();
  });

  document.getElementById('btn-back-picker').addEventListener('click', () => {
    langChat.hidden = true;
    langPicker.hidden = false;
    renderPicker();
  });

  function updateScenarioHeader() {
    const sc = currentScenario();
    document.getElementById('scenario-title').textContent = sc.title;
    document.getElementById('scenario-sub').textContent = `${langSelect.value} · ${sc.name}, ${sc.role}`;
    document.getElementById('scenario-flag').src = flagUrl(currentLang().flag);
    document.getElementById('tutor-avatar').src = scenarioAvatar();
  }

  function renderBeginnerQuickReplies(replies) {
    if (!beginnerChipsGroup) return;
    beginnerChipsGroup.innerHTML = '';
    (replies || []).forEach(replyText => {
      const btn = document.createElement('button');
      btn.className = 'chip-beginner';
      btn.textContent = replyText;
      btn.addEventListener('click', () => {
        langInput.value = replyText;
        sendLangMessage();
      });
      beginnerChipsGroup.appendChild(btn);
    });
  }

  function startScenario() {
    state.langHistory = [];
    langMessages.innerHTML = '';
    updateScenarioHeader();
    const sc = currentScenario();

    const flashWord = document.getElementById('flashcard-word');
    const flashMeaning = document.getElementById('flashcard-meaning');
    if (flashWord && sc.cardWord) flashWord.textContent = sc.cardWord;
    if (flashMeaning && sc.cardMeaning) flashMeaning.textContent = sc.cardMeaning;
    document.getElementById('flashcard-toggle')?.classList.remove('flipped');

    // Mensaje inicial en idioma nativo + traducción en español para principiantes
    const opening = `${sc.greet}\n\n*(Español: "${sc.greetEs}")*`;
    appendMessage(langMessages, 'assistant', opening, sc.name, null, scenarioAvatar());

    // Renderizar opciones de respuesta para principiantes
    renderBeginnerQuickReplies(sc.quickReplies);
  }

  renderPicker();
  btnResetScenario.addEventListener('click', startScenario);

  const flashcardToggle = document.getElementById('flashcard-toggle');
  if (flashcardToggle) {
    flashcardToggle.addEventListener('click', () => {
      flashcardToggle.classList.toggle('flipped');
    });
  }

  langInput.addEventListener('input', () => {
    langInput.style.height = 'auto';
    langInput.style.height = Math.min(langInput.scrollHeight, 120) + 'px';
  });

  langInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendLangMessage();
    }
  });

  btnSendLang.addEventListener('click', sendLangMessage);

  async function sendLangMessage() {
    const text = langInput.value.trim();
    if (!text) return;

    const role = currentScenario().name;
    const userMsg = appendMessage(langMessages, 'user', text, 'Tú');
    langInput.value = '';
    langInput.style.height = 'auto';

    state.langHistory.push({ role: 'user', content: text });
    const loadingElem = showLoadingBubble(langMessages, role, scenarioAvatar());

    try {
      const data = await callChatService({
        message: text,
        mode: 'language',
        targetLanguage: langSelect.value,
        scenario: scenarioSelect.value,
        history: state.langHistory.slice(-6),
        apiKey: state.apiKey
      });

      loadingElem.remove();

      if (data.error) {
        appendMessage(langMessages, 'assistant error', `No pude responder: ${data.error}`, 'Aviso');
        return;
      }

      const replyRaw = data.reply || '';
      let roleplayText = replyRaw;
      let feedbackText = '';

      if (replyRaw.includes('---FEEDBACK---')) {
        const parts = replyRaw.split('---FEEDBACK---');
        roleplayText = parts[0].trim();
        feedbackText = parts[1].trim();
      }

      state.langHistory.push({ role: 'assistant', content: roleplayText });
      appendMessage(langMessages, 'assistant', roleplayText, role, null, scenarioAvatar());

      if (feedbackText) {
        renderLiveFeedback(feedbackText, userMsg);
      }

      // Si hay respuestas sugeridas, actualizar la barra
      if (data.quickReplies) {
        renderBeginnerQuickReplies(data.quickReplies);
      }

      state.langCount++;
      localStorage.setItem('omni_tutor_lang_count', state.langCount);
      unlockBadge('first_step');
      if (state.langCount >= 5) unlockBadge('polyglot');
      addXP(10, '+10 XP Práctica conversacional');

    } catch (err) {
      loadingElem.remove();
      appendMessage(langMessages, 'assistant error', 'Error de comunicación. Revisa tu conexión e inténtalo otra vez.', 'Aviso');
    }
  }

  function renderLiveFeedback(raw, targetMessageElem) {
    const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
    const get = (prefix) => {
      const line = lines.find(l => l.toUpperCase().startsWith(prefix));
      return line ? line.slice(prefix.length).trim() : '';
    };

    const err = get('ERROR:');
    const why = get('POR QUÉ:');
    const nat = get('NATIVO:');
    const tip = get('TIP:');

    const hasError = err && !err.toLowerCase().includes('ninguno');
    let errHtml = '';
    if (hasError) {
      if (err.includes('→')) {
        const [wrong, right] = err.split('→').map(s => s.trim());
        errHtml = `<p class="fb-fix"><s>${esc(noEmoji(wrong))}</s> → <b>${esc(noEmoji(right))}</b></p>`;
      } else {
        errHtml = `<p class="fb-fix"><b>${esc(noEmoji(err))}</b></p>`;
      }
    }

    const cardHtml = `
      <div class="fb card">
        ${hasError ? `
          <div class="fb-block fb-error">
            <h3>${icon('i-x')} Corrección amigable</h3>
            ${errHtml}
            ${why ? `<p>${esc(noEmoji(why))}</p>` : ''}
          </div>` : `
          <div class="fb-block fb-ok">
            <h3>${icon('i-check')} ¡Frase perfecta!</h3>
            ${why ? `<p>${esc(noEmoji(why))}</p>` : '<p>Te has expresado de forma muy clara y natural.</p>'}
          </div>`}
        ${nat ? `
          <div class="fb-block">
            <h3>${icon('i-bulb')} Cómo lo diría un nativo</h3>
            <p>${esc(noEmoji(nat))}</p>
          </div>` : ''}
        ${tip ? `
          <div class="fb-block">
            <h3>${icon('i-book')} Consejo para principiantes</h3>
            <p>${esc(noEmoji(tip))}</p>
          </div>` : ''}
      </div>`;

    if (targetMessageElem) {
      const existing = targetMessageElem.querySelector('.fb');
      if (existing) existing.remove();
      targetMessageElem.querySelector('.msg-col')?.insertAdjacentHTML('beforeend', cardHtml);
      targetMessageElem.classList.remove('is-ok', 'is-fix');
      targetMessageElem.classList.add(hasError ? 'is-fix' : 'is-ok');
    }
  }

  // ==========================================
  // 5. MÓDULO DE QUIZZES Y TRIVIA
  // ==========================================
  const quizSubject = document.getElementById('quiz-subject');
  const quizTopicInput = document.getElementById('quiz-topic-input');
  const btnGenerateQuiz = document.getElementById('btn-generate-quiz');
  const quizActiveArea = document.getElementById('quiz-active-area');
  const quizSummaryArea = document.getElementById('quiz-summary-area');
  const quizProgressFill = document.getElementById('quiz-progress-fill');
  const quizTagTopic = document.getElementById('quiz-tag-topic');
  const quizCounter = document.getElementById('quiz-counter');
  const quizQuestionText = document.getElementById('quiz-question-text');
  const quizOptionsList = document.getElementById('quiz-options-list');
  const quizExplanationBox = document.getElementById('quiz-explanation-box');
  const quizExplanationText = document.getElementById('quiz-explanation-text');
  const btnNextQuestion = document.getElementById('btn-next-question');
  const btnRestartQuiz = document.getElementById('btn-restart-quiz');

  document.querySelectorAll('.topic-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      quizSubject.value = tag.getAttribute('data-subj');
      quizTopicInput.value = tag.getAttribute('data-top');
      startQuizGeneration();
    });
  });

  btnGenerateQuiz.addEventListener('click', startQuizGeneration);
  btnRestartQuiz.addEventListener('click', () => {
    quizSummaryArea.style.display = 'none';
    quizActiveArea.style.display = 'none';
  });

  async function startQuizGeneration() {
    const topic = quizTopicInput.value.trim() || 'Ecuaciones Lineales';
    const subject = quizSubject.value;

    btnGenerateQuiz.disabled = true;
    btnGenerateQuiz.innerHTML = `${icon('i-refresh')} <span>Generando...</span>`;
    quizSummaryArea.style.display = 'none';

    try {
      const data = await callQuizService({ topic, subject, apiKey: state.apiKey });
      state.currentQuiz = data;
      state.currentQuestionIndex = 0;
      state.quizScore = 0;

      btnGenerateQuiz.disabled = false;
      btnGenerateQuiz.innerHTML = `${icon('i-sparkles')} <span>Crear quiz</span>`;

      if (data && data.questions && data.questions.length > 0) {
        showQuestion(0);
      }
    } catch (err) {
      btnGenerateQuiz.disabled = false;
      btnGenerateQuiz.innerHTML = `${icon('i-sparkles')} <span>Crear quiz</span>`;
      alert('Error al generar el quiz.');
    }
  }

  function showQuestion(index) {
    const q = state.currentQuiz.questions[index];
    const total = state.currentQuiz.questions.length;

    quizActiveArea.style.display = 'block';
    quizExplanationBox.style.display = 'none';

    quizTagTopic.textContent = `Tema: ${state.currentQuiz.topic}`;
    quizCounter.textContent = `Pregunta ${index + 1} de ${total}`;
    quizProgressFill.style.width = `${((index + 1) / total) * 100}%`;

    quizQuestionText.innerHTML = marked.parse(q.question);
    quizOptionsList.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `
        <span class="opt-letter">${letters[optIdx] || optIdx + 1}</span>
        <span class="opt-text">${marked.parseInline(optText)}</span>
        <span class="mark"></span>`;
      btn.addEventListener('click', () => handleOptionClick(optIdx, q.correctIndex, q.explanation, q.xp || 25));
      quizOptionsList.appendChild(btn);
    });

    renderMathInElement(quizActiveArea);
  }

  function handleOptionClick(selectedIdx, correctIdx, explanation, xpReward) {
    const buttons = quizOptionsList.querySelectorAll('.quiz-option-btn');
    buttons.forEach((b, i) => {
      b.disabled = true;
      const mark = b.querySelector('.mark');
      if (i === correctIdx) {
        b.classList.add('correct');
        if (mark) mark.innerHTML = `${icon('i-check')} Correcto`;
      } else if (i === selectedIdx) {
        b.classList.add('wrong');
        if (mark) mark.innerHTML = `${icon('i-x')} Incorrecto`;
      }
    });

    if (selectedIdx === correctIdx) {
      state.quizScore++;
      addXP(xpReward, '¡Respuesta correcta!');
    }

    quizExplanationText.innerHTML = marked.parse(explanation);
    renderMathInElement(quizExplanationBox);
    quizExplanationBox.style.display = 'block';
  }

  btnNextQuestion.addEventListener('click', () => {
    state.currentQuestionIndex++;
    if (state.currentQuestionIndex < state.currentQuiz.questions.length) {
      showQuestion(state.currentQuestionIndex);
    } else {
      finishQuiz();
    }
  });

  function finishQuiz() {
    quizActiveArea.style.display = 'none';
    quizSummaryArea.style.display = 'flex';

    const total = state.currentQuiz.questions.length;
    document.getElementById('quiz-summary-title').textContent = 
      state.quizScore === total ? '¡Puntaje perfecto!' : 'Quiz terminado';
    document.getElementById('quiz-summary-score').textContent = 
      `${state.quizScore} de ${total} correctas`;
    document.getElementById('quiz-summary-xp').textContent = 
      `+${state.quizScore * 25} XP`;

    if (state.quizScore === total) {
      unlockBadge('quiz_master');
    }
  }

  // ==========================================
  // 6. RENDERIZADO DE MENSAJES Y FÓRMULAS
  // ==========================================
  function appendMessage(container, role, text, whoLabel, imageUrl, avatar) {
    const msgDiv = document.createElement('div');
    const isUser = role.includes('user');
    msgDiv.className = `message ${role}`;

    let imageHtml = '';
    if (imageUrl) {
      imageHtml = `<img src="${imageUrl}" class="attached-image" alt="Foto adjunta">`;
    }

    const clean = noEmoji(text || '');
    const parsedContent = marked.parse(clean);

    msgDiv.innerHTML = `
      ${isUser ? '' : `<img class="avatar" src="${avatar || MATH_AVATAR}" alt="">`}
      <div class="msg-col">
        ${whoLabel ? `<span class="who">${whoLabel}</span>` : ''}
        <div class="bubble">
          ${imageHtml}
          ${parsedContent}
        </div>
      </div>
      ${isUser ? `<img class="avatar" src="https://api.dicebear.com/9.x/avataaars/svg?seed=Tu&backgroundColor=bbf7d0&radius=50" alt="">` : ''}
    `;

    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;

    renderMathInElement(msgDiv);
    return msgDiv;
  }

  function showLoadingBubble(container, whoLabel, avatar) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message assistant loading';
    msgDiv.innerHTML = `
      <img class="avatar" src="${avatar || MATH_AVATAR}" alt="">
      <div class="msg-col">
        <span class="who">${whoLabel || 'Tutor'}</span>
        <div class="bubble">
          <span class="dots" aria-label="Escribiendo"><i></i><i></i><i></i></span>
        </div>
      </div>
    `;
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
    return msgDiv;
  }

  function renderMathInElement(element) {
    if (window.renderMathInElement) {
      window.renderMathInElement(element, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false
      });
    }
  }

  // ==========================================
  // 7. SISTEMA DE GAMIFICACIÓN & LOGROS
  // ==========================================
  function addXP(amount, reason) {
    state.xp += amount;
    localStorage.setItem('omni_tutor_xp', state.xp);
    updateGamificationUI();

    if (state.xp >= 300) {
      unlockBadge('unstoppable');
    }

    showXpToast(`+${amount} XP ${reason ? `· ${reason}` : ''}`);
  }

  function updateGamificationUI() {
    document.getElementById('user-xp').textContent = `${state.xp} XP`;
    document.getElementById('user-streak').textContent = `${state.streak} ${state.streak === 1 ? 'día' : 'días'}`;

    let rank = 'Novato';
    let iconLetter = 'I';
    let nextThreshold = 100;

    if (state.xp >= 1500) {
      rank = 'Maestro';
      iconLetter = 'V';
      nextThreshold = 3000;
    } else if (state.xp >= 700) {
      rank = 'Experto';
      iconLetter = 'IV';
      nextThreshold = 1500;
    } else if (state.xp >= 300) {
      rank = 'Aventurero';
      iconLetter = 'III';
      nextThreshold = 700;
    } else if (state.xp >= 100) {
      rank = 'Aprendiz';
      iconLetter = 'II';
      nextThreshold = 300;
    }

    document.getElementById('user-rank').textContent = rank;
    const iconElem = document.getElementById('user-rank-icon');
    if (iconElem) {
      iconElem.textContent = iconLetter;
      iconElem.hidden = false;
    }

    const levelCard = document.getElementById('level-card');
    if (levelCard) {
      const pct = Math.min(100, Math.round((state.xp / nextThreshold) * 100));
      levelCard.innerHTML = `
        <div class="level-top">
          <div>
            <small>Tu progreso con Yesion</small>
            <b>Nivel ${rank}</b>
          </div>
          <div class="level-stats">
            <span>Racha: <b>${state.streak} días</b></span>
            <span>Total: <b>${state.xp} XP</b></span>
          </div>
        </div>
        <div class="level-track"><div style="width: ${pct}%;"></div></div>
        <p>Te faltan <b>${Math.max(0, nextThreshold - state.xp)} XP</b> para alcanzar el siguiente nivel.</p>
      `;
    }
  }

  function unlockBadge(badgeId) {
    if (state.badges.includes(badgeId)) return;
    state.badges.push(badgeId);
    localStorage.setItem('omni_tutor_badges', JSON.stringify(state.badges));

    const badge = BADGES_CONFIG.find(b => b.id === badgeId);
    if (badge) {
      addXP(badge.xpReward, `Medalla: ${badge.name}`);
      showXpToast(`Logro desbloqueado: ${badge.name}`);
    }
    renderAchievements();
  }

  function renderAchievements() {
    const grid = document.getElementById('badges-grid');
    if (!grid) return;
    grid.innerHTML = '';

    BADGES_CONFIG.forEach(b => {
      const isUnlocked = state.badges.includes(b.id);
      const card = document.createElement('div');
      card.className = `badge card ${isUnlocked ? 'unlocked' : 'locked'}`;
      card.style.setProperty('--tone', `var(${b.color || '--c-badge'})`);
      card.innerHTML = `
        <div class="medal"><svg class="ico"><use href="#${b.icon}"/></svg></div>
        <div class="badge-text">
          <h2>${b.name}</h2>
          <p>${b.desc}</p>
        </div>
        <span class="badge-state">
          ${isUnlocked ? `${icon('i-check')} Desbloqueado` : `${icon('i-lock')} Por desbloquear`}
        </span>
      `;
      grid.appendChild(card);
    });
  }

  function checkStreak() {
    const today = new Date().toISOString().slice(0, 10);
    if (!state.lastDate) {
      state.lastDate = today;
      state.streak = 1;
    } else if (state.lastDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      if (state.lastDate === yesterday) {
        state.streak += 1;
      } else {
        state.streak = 1;
      }
      state.lastDate = today;
    }
    localStorage.setItem('omni_tutor_streak', state.streak);
    localStorage.setItem('omni_tutor_last_date', state.lastDate);
  }

  function showXpToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-mark">XP</span><span>${esc(noEmoji(message))}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('out');
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  }

  // ==========================================
  // 8. MODAL DE CONFIGURACIÓN DE IA
  // ==========================================
  const btnOpenSettings = document.getElementById('btn-open-settings');
  const btnCloseSettings = document.getElementById('btn-close-settings');
  const settingsModal = document.getElementById('settings-modal');
  const apiKeyInput = document.getElementById('gemini-api-key-input');
  const btnSaveKey = document.getElementById('btn-save-key');
  const btnClearKey = document.getElementById('btn-clear-key');
  const apiStatusBadge = document.getElementById('api-status-badge');
  const keyStatusInfo = document.getElementById('key-status-info');

  // Azure Speech: voces naturales de Edge en cualquier navegador (clave guardada solo en este navegador)
  const azureKeyInput = document.getElementById('azure-key-input');
  const azureRegionInput = document.getElementById('azure-region-input');
  state.azureKey = localStorage.getItem('omni_tutor_azure_key') || '';
  state.azureRegion = localStorage.getItem('omni_tutor_azure_region') || '';

  btnOpenSettings.addEventListener('click', () => {
    apiKeyInput.value = state.apiKey;
    azureKeyInput.value = state.azureKey;
    azureRegionInput.value = state.azureRegion;
    settingsModal.style.display = 'flex';
  });

  btnCloseSettings.addEventListener('click', () => {
    settingsModal.style.display = 'none';
  });

  btnSaveKey.addEventListener('click', () => {
    state.apiKey = apiKeyInput.value.trim();
    localStorage.setItem('omni_tutor_api_key', state.apiKey);
    state.azureKey = azureKeyInput.value.trim();
    state.azureRegion = azureRegionInput.value.trim().toLowerCase().replace(/\s+/g, '');
    localStorage.setItem('omni_tutor_azure_key', state.azureKey);
    localStorage.setItem('omni_tutor_azure_region', state.azureRegion);
    azureFailed = false;
    settingsModal.style.display = 'none';
    checkApiStatus();
  });

  btnClearKey.addEventListener('click', () => {
    state.apiKey = '';
    apiKeyInput.value = '';
    localStorage.removeItem('omni_tutor_api_key');
    checkApiStatus();
  });

  async function checkApiStatus() {
    let hasLive = Boolean(state.apiKey);
    if (window.location.protocol !== 'file:') {
      try {
        const res = await fetch('/api/status');
        const d = await res.json();
        if (d.hasEnvApiKey) hasLive = true;
        state.hasEnvAzure = Boolean(d.hasEnvAzure);
      } catch (e) {}
    }
    state.hasLiveAI = hasLive;

    if (hasLive) {
      apiStatusBadge.className = 'badge-live';
      apiStatusBadge.textContent = 'En vivo';
      keyStatusInfo.innerHTML = 'Estado: <strong>conectado a Gemini</strong>';
    } else {
      apiStatusBadge.className = 'badge-demo';
      apiStatusBadge.textContent = 'Demo';
      keyStatusInfo.innerHTML = 'Estado: <strong>modo activo</strong> (respuestas pedagógicas completas)';
    }
  }

  // ==========================================
  // 9. VIDEOLLAMADA EN VIVO (IDIOMAS & MATEMÁTICAS)
  // ==========================================
  const btnStartCall = document.getElementById('btn-start-call');
  const btnStartMathCall = document.getElementById('btn-start-math-call');
  const videocallOverlay = document.getElementById('videocall-overlay');
  const btnEndCallTop = document.getElementById('btn-end-call-top');
  const btnCallHangup = document.getElementById('btn-call-hangup');
  const btnCallMic = document.getElementById('btn-call-mic');
  const btnCallMicLabel = document.getElementById('btn-call-mic-label');
  const btnCallExplainEs = document.getElementById('btn-call-explain-es');
  const btnCallCam = document.getElementById('btn-call-cam');
  const btnCallCamLabel = document.getElementById('btn-call-cam-label');
  const btnCallHint = document.getElementById('btn-call-hint');
  const callHintPill = document.getElementById('call-hint-pill');
  const callHintText = document.getElementById('call-hint-text');
  const callQuickChips = document.getElementById('call-quick-chips');

  const callMathBoard = document.getElementById('call-math-board');
  const callScenarioTitle = document.getElementById('call-scenario-title');
  const callTutorName = document.getElementById('call-tutor-name');
  const avatarLiveStage = document.getElementById('avatar-live-stage');
  const avatar3dNode = document.getElementById('avatar-3d');
  const captionsCoach = document.getElementById('captions-coach');
  const tutorVideoCard = document.getElementById('tutor-video-card');
  const callTutorFlag = document.getElementById('call-tutor-flag');
  const callTutorLabel = document.getElementById('call-tutor-label');
  const callTimer = document.getElementById('call-timer');
  const callSpeechWaves = document.getElementById('call-speech-waves');
  const tutorSpeakingRing = document.getElementById('tutor-speaking-ring');
  const captionsSpeaker = document.getElementById('captions-speaker');
  const captionsText = document.getElementById('captions-text');
  const captionsTranslation = document.getElementById('captions-translation');
  const btnReplayCaption = document.getElementById('btn-replay-caption');

  const studentWebcam = document.getElementById('student-webcam');
  const studentAvatarFallback = document.getElementById('student-avatar-fallback');
  const studentCamStatus = document.getElementById('student-cam-status');

  const callSummaryModal = document.getElementById('call-summary-modal');
  const summaryCallTime = document.getElementById('summary-call-time');
  const summaryCallTurns = document.getElementById('summary-call-turns');
  const summaryCallXp = document.getElementById('summary-call-xp');
  const btnCloseCallSummary = document.getElementById('btn-close-call-summary');

  let callActive = false;
  let callMode = 'language'; // 'language' o 'math'
  let callSeconds = 0;
  let callTimerInterval = null;
  let callTurnsCount = 0;
  let webcamStream = null;
  let isListening = false;
  let recognitionInstance = null;
  let lastTutorPhrase = '';
  let lastTutorTranslation = '';
  let lastSuggestion = '';
  let callHistory = [];
  let mouthTimer = null;
  let blinkTimer = null;

  let use3D = false;
  let mountToken = 0;
  let script = null;      // guion de la llamada sin IA (dialogues.js)
  let stepIdx = 0;
  let attempts = 0;

  // Felicitaciones cortas en el idioma meta; se alternan para que no suene repetido
  const PRAISE = {
    'Inglés': ['Great!', 'Perfect!', 'Nice!', 'Awesome!'],
    'Francés': ['Très bien !', 'Parfait !', 'Super !'],
    'Alemán': ['Super!', 'Sehr gut!', 'Perfekt!'],
    'Italiano': ['Perfetto!', 'Benissimo!', 'Ottimo!'],
    'Portugués': ['Ótimo!', 'Perfeito!', 'Muito bem!'],
    'Japonés': ['いいですね！', 'すばらしい！', 'かしこまりました。']
  };
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const SPANISH_HINT = /(?:^|[^\p{L}])(hola|quiero|quisiera|tengo|gracias|cómo|estoy|sí|me llamo|vengo|puedo|tienes|usted|vacaciones|trabajo|familia)(?=$|[^\p{L}])/iu;

  // Personajes: mujer u hombre, y qué modelo 3D usan (F mujer, M hombre)
  const FEMALE = ['Emma', 'Sarah', 'Amélie', 'Chloé', 'Claudia', 'Giulia', 'Sofia', 'Sakura'];
  const SHIRT = { 'Café': '#7c2d12', 'Aeropuerto': '#1e3a5f', 'Entrevista': '#1f2937', 'Hotel': '#111827', 'amigo': '#166534' };
  function characterProfile(sc, sceneKey) {
    const female = FEMALE.includes(sc.name);
    return {
      gender: female ? 'F' : 'M',
      model: female ? 'F' : 'M',
      top: female ? '' : SHIRT[sceneKey]
    };
  }
  let tutorGender = 'F';

  const LANG_VOICE_CODES = {
    'Inglés': 'en-US',
    'Francés': 'fr-FR',
    'Alemán': 'de-DE',
    'Italiano': 'it-IT',
    'Portugués': 'pt-BR',
    'Japonés': 'ja-JP'
  };

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (btnStartCall) {
    btnStartCall.addEventListener('click', () => startVideocall('language'));
  }
  if (btnStartMathCall) {
    btnStartMathCall.addEventListener('click', () => startVideocall('math'));
  }

  // Cada opción es un texto, un par [frase, traducción] o { label, sub, action }
  function renderCallQuickChips(chipsList) {
    if (!callQuickChips) return;
    callQuickChips.innerHTML = '';
    (chipsList || []).forEach(item => {
      const o = typeof item === 'string' ? { label: item }
        : Array.isArray(item) ? { label: item[0], sub: item[1] } : item;
      const b = document.createElement('button');
      b.className = 'btn-call-quick-chip';
      b.innerHTML = `${esc(o.label)}${o.sub ? `<small>${esc(o.sub)}</small>` : ''}`;
      b.addEventListener('click', () => (o.action ? o.action() : handleUserSpeechTurn(o.label)));
      callQuickChips.appendChild(b);
    });
  }

  // ---- Avatar animado: cuadros del personaje que se alternan (boca al hablar, parpadeo) ----
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function mountLiveAvatar(seed, bg) {
    const frame = (mouth, eyes) => avatarFrameUrl(seed, mouth, eyes);
    avatarLiveStage.innerHTML = `
      <div class="live-avatar" data-mouth="rest">
        <img class="la-frame" data-frame="rest" src="${frame('smile', 'default')}" alt="">
        <img class="la-frame" data-frame="mid" src="${frame('default', 'default')}" alt="">
        <img class="la-frame" data-frame="open" src="${frame('disbelief', 'default')}" alt="">
        <img class="la-frame" data-frame="blink" src="${frame('smile', 'closed')}" alt="">
      </div>`;
    tutorVideoCard.style.setProperty('--scene-bg', `#${bg}`);
    clearTimeout(blinkTimer);
    scheduleBlink();
  }

  function scheduleBlink() {
    blinkTimer = setTimeout(() => {
      const face = avatarLiveStage.querySelector('.live-avatar');
      if (!callActive || !face) return;
      if (!reduceMotion.matches) {
        face.classList.add('blink');
        setTimeout(() => face.classList.remove('blink'), 140);
      }
      scheduleBlink();
    }, 2500 + Math.random() * 3000);
  }

  // Muestra el avatar 2D enseguida y lo cambia por el 3D cuando termina de cargar
  async function mountTutor(seed, bg, profile) {
    mountLiveAvatar(seed, bg);
    tutorGender = profile.gender;
    use3D = false;
    tutorVideoCard.classList.remove('is-3d');
    const token = ++mountToken;
    try {
      if (!window.Avatar3D) {
        await new Promise((resolve, reject) => {
          window.addEventListener('avatar3d-ready', resolve, { once: true });
          setTimeout(() => reject(new Error('avatar3d.js no cargó')), 8000);
        });
      }
      await window.Avatar3D.mount(avatar3dNode, profile.model, profile.top);
      if (token !== mountToken || !callActive) return;
      use3D = true;
      tutorVideoCard.classList.add('is-3d');
    } catch (e) {
      console.warn('Avatar 3D no disponible; sigue el 2D.', e);
    }
  }

  function setTalking(on) {
    const face = avatarLiveStage.querySelector('.live-avatar');
    clearInterval(mouthTimer);
    callSpeechWaves.style.display = on ? 'inline-flex' : 'none';
    tutorSpeakingRing.classList.toggle('active', on);
    tutorVideoCard.classList.toggle('speaking', on);
    if (!on && use3D) window.Avatar3D?.talkStop();
    if (!face || use3D) return;
    face.dataset.mouth = 'rest';
    if (on && !reduceMotion.matches) {
      const shapes = ['open', 'mid', 'open', 'rest', 'mid'];
      let i = 0;
      mouthTimer = setInterval(() => { face.dataset.mouth = shapes[i++ % shapes.length]; }, 120);
    }
  }

  // Subtítulo del turno actual (texto plano; en matemáticas se convierten las fórmulas)
  function setCaption(speaker, text, translation = '', coach = '', coachOk = false) {
    captionsCoach.textContent = coach;
    captionsCoach.hidden = !coach;
    captionsCoach.classList.toggle('is-ok', coachOk);
    captionsSpeaker.textContent = speaker;
    captionsText.textContent = text;
    if (callMode === 'math') renderMathInElement(captionsText);
    captionsTranslation.textContent = translation ? `En español: ${translation}` : '';
    captionsTranslation.hidden = !translation;
  }

  // Separa lo que dice el personaje, su traducción y la corrección
  function splitTutorReply(raw) {
    const [main, fbRaw = ''] = String(raw || '').split('---FEEDBACK---');
    let translation = '';
    const text = main
      .replace(/\*?\((?:Traducción en español|Traducción|Español)\s*:\s*"?([^)]*?)"?\s*\)\*?/i, (_, t) => { translation = t.trim(); return ''; })
      .replace(/^\s*\*\(.*\)\*\s*$/gm, '')
      .replace(/\*\*/g, '')
      .trim();
    const get = (prefix) => {
      const line = fbRaw.split('\n').map(l => l.trim()).find(l => l.toUpperCase().startsWith(prefix));
      return line ? line.slice(prefix.length).trim() : '';
    };
    const err = get('ERROR:');
    return {
      text: noEmoji(text),
      translation,
      error: err && !/ninguno|\(demo\)/i.test(err) ? err : '',
      why: get('POR QUÉ:'),
      native: get('NATIVO:')
    };
  }

  // Frase sugerida dentro de "Responde: 'Frase' (traducción)"
  const suggestionFrom = (s) => (String(s || '').match(/'(.+?)'(?=\s*\(|\s*[.,]?\s*$)/) || [])[1] || '';

  function setSuggestions(main, extras = []) {
    const list = [main, ...extras].filter((v, i, a) => v && a.indexOf(v) === i).slice(0, 3);
    lastSuggestion = list[0] || '';
    callHintText.textContent = lastSuggestion ? `"${lastSuggestion}"` : '';
    renderCallQuickChips(list);
  }

  // ---- Llamada guiada sin IA: el tutor revisa cada respuesta y la conversación siempre avanza ----
  const STOP = new Set(['the', 'and', 'you', 'your', 'please', 'with', 'for', 'that', 'this', 'are', 'une', 'des', 'les', 'pour', 'avec', 'vous', 'der', 'die', 'das', 'und', 'ich', 'sie', 'per', 'con', 'che', 'una', 'para', 'com', 'uma', 'por', 'que', 'est', 'ist', 'sono', 'sou', 'mon', 'mio', 'meu', 'mein', 'favore', 'favor', 'bitte', 'plait']);
  const fold = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const words = (s) => fold(s).split(/[^a-z0-9ß]+/).filter(Boolean);

  // 'ok' si responde a la pregunta, 'spanish' si contestó en español, 'wrong' si no tiene que ver
  function judgeAnswer(answers, step, lang) {
    const keys = [
      ...(step.keys || []).map(fold),
      ...step.opts.flatMap(o => words(o[0]).filter(w => w.length >= 4 && !STOP.has(w)))
    ];
    const hits = (text) => {
      if (lang === 'Japonés') return keys.some(k => k.length > 1 && fold(text).includes(k));
      const ws = words(text);
      return keys.some(k => ws.some(w => w === k || (k.length >= 4 && w.startsWith(k)) || (w.length >= 5 && k.startsWith(w))));
    };
    if (answers.some(hits) && !SPANISH_HINT.test(answers[0])) return 'ok';
    if (lang !== 'Español' && SPANISH_HINT.test(answers[0])) return 'spanish';
    return 'wrong';
  }

  // El profe de matemáticas habla en la llamada (sin IA) y ofrece ayuda
  function sayMath(text) {
    lastTutorPhrase = text;
    lastTutorTranslation = '';
    setCaption('Profe Yesion', text);
    renderCallQuickChips([
      'Dame una pista',
      'Explícamelo paso a paso',
      { label: 'Repetir la pregunta', action: () => sayMath(mathSession.step.ask) }
    ]);
    speakSequence([{ text, lang: 'Español' }]);
  }

  // ---- Niveles por idioma: nivel actual y situaciones terminadas en cada nivel ----
  const CALL_PROGRESS_KEY = 'omni_tutor_call_progress';
  const SCENE_ORDER = ['Café', 'Aeropuerto', 'Entrevista', 'Hotel', 'amigo'];
  const LEVEL_LABEL = { 1: 'Nivel 1 · Principiante', 2: 'Nivel 2 · Intermedio', 3: 'Nivel 3 · Avanzado' };
  const PRONUNCIATION_OK = 0.8;
  let callLevel = 1;
  let optionsShown = false;   // en nivel 2 y 3 las respuestas solo aparecen si las pide
  let drill = null;           // práctica de pronunciación en curso
  let lowConfidenceAsked = false;

  function readProgress() {
    try { return JSON.parse(localStorage.getItem(CALL_PROGRESS_KEY)) || {}; } catch (e) { return {}; }
  }
  function langProgress(lang) {
    const lp = readProgress()[lang] || {};
    return { level: lp.level || 1, done: lp.done || {} };
  }
  function saveLangProgress(lang, lp) {
    const all = readProgress();
    all[lang] = lp;
    try { localStorage.setItem(CALL_PROGRESS_KEY, JSON.stringify(all)); } catch (e) { /* sin almacenamiento */ }
  }
  function getScript(lang, sceneKey, level) {
    return level === 1
      ? window.CALL_SCRIPTS?.[lang]?.[sceneKey]
      : window.CALL_SCRIPTS_LEVELS?.[lang]?.[level]?.[sceneKey];
  }

  // Siguiente situación sin terminar en el nivel actual
  function nextSceneKey(lp, current) {
    const done = lp.done[lp.level] || [];
    const order = [...SCENE_ORDER.slice(SCENE_ORDER.indexOf(current) + 1), ...SCENE_ORDER];
    const key = order.find(k => !done.includes(k) && k !== current) || order[0];
    const title = (LANG_SCENARIOS_DATA[langSelect.value] || LANG_SCENARIOS_DATA['Inglés'])[key]?.title || key;
    return { key, label: `${title} · ${LEVEL_LABEL[lp.level]}` };
  }

  // Cambia de situación sin colgar: la llamada sigue con otro personaje
  function continueWithScene(key) {
    const opt = [...scenarioSelect.options].find(o => getScenarioKey(o.value) === key);
    if (opt) scenarioSelect.value = opt.value;
    updateScenarioHeader();
    startVideocall('language', false);
  }

  // ---- Pronunciación: compara lo que oyó el micrófono con la frase ----
  function editRatio(a, b) {
    if (a === b) return 1;
    const m = a.length, n = b.length;
    if (!m || !n) return 0;
    const d = Array.from({ length: m + 1 }, (_, i) => [i]);
    for (let j = 1; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
    }
    return 1 - d[m][n] / Math.max(m, n);
  }

  // 0 a 1: qué tanto se parece lo que dijo a la frase (palabra por palabra; en japonés, por sílabas)
  function similarity(said, target, lang, lenient = false) {
    if (lang === 'Japonés') {
      const clean = (s) => fold(s).replace(/[\s。、！？!?.,]/g, '');
      const grams = (s) => Array.from({ length: Math.max(0, s.length - 1) }, (_, i) => s.slice(i, i + 2));
      const A = grams(clean(said)), B = grams(clean(target));
      if (!A.length || !B.length) return 0;
      const pool = [...A];
      let hit = 0;
      B.forEach(g => { const i = pool.indexOf(g); if (i >= 0) { hit++; pool.splice(i, 1); } });
      return (2 * hit) / (A.length + B.length);
    }
    const A = words(said), B = words(target);
    if (!A.length || !B.length) return 0;
    const used = new Set();
    let matched = 0;
    B.forEach(b => {
      const i = A.findIndex((a, k) => !used.has(k) && (a === b || editRatio(a, b) >= 0.75));
      if (i >= 0) { used.add(i); matched++; }
    });
    const byWords = (2 * matched) / (A.length + B.length);
    if (!lenient) return byWords;
    // Al repetir también cuenta letra por letra: el reconocedor a veces parte o junta palabras ("voie si" por "voici")
    return Math.max(byWords, editRatio(A.join(''), B.join('')));
  }

  // Qué parte de lo que dijo está en la frase (1 = todas sus palabras son de la frase, aunque haya dicho menos)
  function wordsInPhrase(said, target, lang) {
    if (lang === 'Japonés') return similarity(said, target, lang);
    const A = words(said), B = words(target);
    if (!A.length) return 0;
    return A.filter(a => B.some(b => a === b || editRatio(a, b) >= 0.75)).length / A.length;
  }

  function missingWords(said, target, lang) {
    if (lang === 'Japonés') return [];
    const A = words(said);
    return target.split(/\s+/)
      .map(w => w.replace(/[^\p{L}\p{N}'-]/gu, ''))
      .filter(w => w && !A.some(a => editRatio(a, fold(w)) >= 0.75))
      .slice(0, 4);
  }

  function bestOption(answers, opts, lang) {
    let best = { opt: opts[0], sim: 0 };
    opts.forEach(o => answers.forEach(a => {
      const s = similarity(a, o[0], lang);
      if (s > best.sim) best = { opt: o, sim: s };
    }));
    return best;
  }

  function startDrill(opt, heard, onPass) {
    drill = { phrase: opt[0], es: opt[1], tries: 0, onPass };
    const missing = missingWords(heard, opt[0], langSelect.value);
    showDrill(`Casi. Escuché: "${heard}".${missing.length ? ` No se entendió bien: ${missing.join(', ')}.` : ''} Repite conmigo, despacio:`);
  }

  function showDrill(msg) {
    const lang = langSelect.value;
    setCaption(`${currentScenario().name} · pronunciación`, drill.phrase, drill.es, msg);
    renderCallQuickChips([
      { label: 'Escuchar otra vez', sub: 'Más despacio', action: () => speakSequence([{ text: drill.phrase, lang, rate: 0.75 }]) },
      { label: 'Saltar', sub: 'Seguir con la conversación', action: () => { const go = drill.onPass; drill = null; go(); } }
    ]);
    speakSequence([
      { text: msg.replace(/"[^"]*"/, ''), lang: 'Español' },
      { text: drill.phrase, lang, rate: 0.75 },
      { text: 'Ahora tú. Presiona Hablar.', lang: 'Español' }
    ]);
  }

  // Durante la práctica solo cuenta lo que dice por el micrófono; se repite hasta que suene parecido
  function handleDrill(answers, meta) {
    if (!meta.spoken) return;
    const lang = langSelect.value;
    const sim = Math.max(...answers.map(a => similarity(a, drill.phrase, lang, true)));
    if (sim >= PRONUNCIATION_OK) {
      const go = drill.onPass;
      drill = null;
      go('¡Ahora sí! Sonó muy bien.');
      return;
    }
    drill.tries++;
    const missing = missingWords(answers[0], drill.phrase, lang);
    const cheer = drill.tries >= 3 ? ' Vas mejorando, no te rindas.' : '';
    showDrill(`Escuché: "${answers[0]}". Todavía no suena claro${missing.length ? `: practica ${missing.join(', ')}` : ''}.${cheer} Escucha y repite:`);
  }

  function askStep(prefixParts, coach = '', coachOk = false) {
    const sc = currentScenario();
    const lang = langSelect.value;
    const step = script.steps[stepIdx];
    optionsShown = callLevel === 1;
    lowConfidenceAsked = false;
    lastTutorPhrase = step.q;
    lastTutorTranslation = step.es;
    callHistory.push({ role: 'assistant', content: step.q });
    setCaption(sc.name, step.q, optionsShown ? step.es : '', coach, coachOk);
    showStepHelp(step);
    speakSequence([...prefixParts, { text: step.q, lang }]);
  }

  // Nivel 1: respuestas a la vista. Nivel 2 y 3: solo si toca "Sugerir respuestas"
  function showStepHelp(step) {
    lastSuggestion = step.opts[0][0];
    callHintText.textContent = `"${step.opts[0][0]}" (${step.opts[0][1]})`;
    if (optionsShown) { renderCallQuickChips(step.opts); return; }
    renderCallQuickChips([
      { label: 'Sugerir respuestas', sub: 'Ver opciones con traducción', action: () => revealOptions(step) },
      { label: 'Traducir pregunta', sub: 'Verla en español', action: () => { captionsTranslation.textContent = `En español: ${step.es}`; captionsTranslation.hidden = false; } }
    ]);
  }

  function revealOptions(step) {
    optionsShown = true;
    captionsTranslation.textContent = `En español: ${step.es}`;
    captionsTranslation.hidden = false;
    renderCallQuickChips(step.opts);
  }

  function finishScript(prefixParts, coach) {
    const sc = currentScenario();
    const lang = langSelect.value;
    const sceneKey = getScenarioKey(scenarioSelect.value);
    const [bye, byeEs] = script.end;
    stepIdx = script.steps.length;
    lastTutorPhrase = bye;
    lastTutorTranslation = byeEs;

    // Guarda la situación terminada; al completar las 5 del nivel, sube de nivel
    const lp = langProgress(lang);
    const done = new Set(lp.done[callLevel] || []);
    done.add(sceneKey);
    lp.done[callLevel] = [...done];
    let wrap = '¡Lo hiciste muy bien! Terminamos esta conversación.';
    let levelUp = false;
    if (done.size >= SCENE_ORDER.length && callLevel < 3 && lp.level === callLevel) {
      lp.level = callLevel + 1;
      levelUp = true;
      wrap = `¡Felicitaciones! Completaste todas las situaciones y subiste al nivel ${lp.level}. Desde ahora la traducción y las respuestas quedan ocultas: pídelas con Sugerir respuestas.`;
    } else if (lp.level === callLevel) {
      wrap += ` Llevas ${done.size} de ${SCENE_ORDER.length} situaciones de este nivel.`;
    }
    saveLangProgress(lang, lp);
    addXP(levelUp ? 100 : 30, levelUp ? `¡Subiste al nivel ${lp.level}!` : 'Conversación completada');

    setCaption(sc.name, bye, callLevel === 1 ? byeEs : '', coach ? `${coach} ${wrap}` : wrap, true);
    const next = nextSceneKey(lp, sceneKey);
    renderCallQuickChips([
      { label: 'Siguiente conversación', sub: next.label, action: () => continueWithScene(next.key) },
      { label: 'Practicar otra vez', sub: 'Repite esta conversación', action: () => startVideocall('language', false) },
      { label: 'Colgar y ver mi resumen', sub: 'Termina la llamada', action: endVideocall }
    ]);
    speakSequence([...prefixParts, { text: bye, lang }, { text: wrap, lang: 'Español' }]);
  }

  function passStep(coach = '¡Bien dicho! Respondiste justo lo que te preguntó.') {
    const lang = langSelect.value;
    attempts = 0;
    stepIdx++;
    const praise = pick(PRAISE[lang] || ['¡Muy bien!']);
    (stepIdx < script.steps.length ? askStep : finishScript)([{ text: praise, lang }], coach, true);
  }

  // meta.spoken: lo dijo por micrófono (se revisa la pronunciación); meta.confidence: seguridad del reconocedor
  function handleScriptTurn(answers, meta = {}) {
    const lang = langSelect.value;
    const step = script.steps[stepIdx];
    if (!step) return;
    if (drill) { handleDrill(answers, meta); return; }

    const name = currentScenario().name;
    const verdict = judgeAnswer(answers, step, lang);
    const best = bestOption(answers, step.opts, lang);

    // Intentó decir una de las frases, pero no se entendió del todo: practica la pronunciación
    // Solo si dijo palabras que no están en la frase (las cambió al pronunciar), no si la dijo más corta
    const swapped = Math.max(...answers.map(a => wordsInPhrase(a, best.opt[0], lang))) < 0.85;
    const nearlyOption = swapped && (verdict === 'ok' ? best.sim >= 0.6 && best.sim < PRONUNCIATION_OK : best.sim >= 0.45);
    if (meta.spoken && nearlyOption) {
      startDrill(best.opt, answers[0], (c) => passStep(c));
      return;
    }

    if (verdict === 'ok') {
      // Respondió con sus palabras pero el micrófono no lo oyó claro: pide repetir una vez
      if (meta.spoken && meta.confidence > 0 && meta.confidence < 0.5 && !lowConfidenceAsked) {
        lowConfidenceAsked = true;
        const msg = 'Te entendí a medias. Repítelo un poco más despacio y claro.';
        setCaption(name, step.q, optionsShown ? step.es : '', msg);
        speakSequence([{ text: msg, lang: 'Español' }]);
        return;
      }
      passStep();
      return;
    }

    if (attempts === 0) {
      // Primer intento fallido: lo nota y ayuda (en nivel 1 con opciones; en 2 y 3 solo si las pide)
      attempts = 1;
      const why = verdict === 'spanish'
        ? `Te entendí, pero intenta responderme en ${lang.toLowerCase()}.`
        : 'Mmm, creo que eso no responde a lo que te pregunté.';
      if (callLevel === 1) {
        setCaption(name, step.q, step.es, `${why} Elige una opción o dilo con tus palabras.`);
        renderCallQuickChips(step.opts);
        speakSequence([
          { text: `${why} Te pregunté: ${step.es} Elige una de las opciones o dila con tus palabras.`, lang: 'Español' },
          { text: step.q, lang }
        ]);
      } else {
        setCaption(name, step.q, optionsShown ? step.es : '', `${why} Inténtalo otra vez o toca Sugerir respuestas.`);
        showStepHelp(step);
        speakSequence([{ text: `${why} Inténtalo otra vez.`, lang: 'Español' }, { text: step.q, lang }]);
      }
      return;
    }

    // Segundo intento: le muestra cómo se dice y siguen conversando
    attempts = 0;
    stepIdx++;
    const [model, modelEs] = step.opts[0];
    const coach = `No pasa nada. Podías decir: "${model}" (${modelEs}).`;
    (stepIdx < script.steps.length ? askStep : finishScript)([
      { text: 'No pasa nada. Podías decir:', lang: 'Español' },
      { text: model, lang },
      { text: 'Sigamos.', lang: 'Español' }
    ], coach);
  }

  // fresh = false: sigue la misma llamada (otra conversación) sin reiniciar el reloj ni el conteo
  function startVideocall(mode = 'language', fresh = true) {
    callActive = true;
    callMode = mode;
    callHistory = [];
    script = null;
    drill = null;
    callHintPill.style.display = 'none';

    if (fresh) {
      callSeconds = 0;
      callTurnsCount = 0;
      clearInterval(callTimerInterval);
      callTimerInterval = setInterval(() => {
        callSeconds++;
        const mins = String(Math.floor(callSeconds / 60)).padStart(2, '0');
        const secs = String(callSeconds % 60).padStart(2, '0');
        callTimer.textContent = `${mins}:${secs}`;
      }, 1000);
    }

    videocallOverlay.style.display = 'flex';

    if (mode === 'math') {
      // Clase de matemáticas: todo en español
      callMathBoard.style.display = 'block';
      callScenarioTitle.textContent = 'Clase de matemáticas';
      callTutorName.textContent = 'Profe Yesion';
      callTutorLabel.textContent = 'Profe Yesion';
      callTutorFlag.removeAttribute('src');
      mountTutor('Yesion', 'c7d2fe', { gender: 'F', model: 'F' });

      if (!state.hasLiveAI && window.MathCoach) {
        // Sin IA: ejercicios por niveles que revisan cada respuesta
        if (!mathSession) startMathExercise(nextMathExercise());
        else showExerciseOnBoards(mathSession.exercise);
        sayMath(`¡Hola! Qué bueno verte. ${mathSession.intro()}`);
        return;
      }

      const mathGreeting = '¡Hola! Qué bueno verte. Hoy resolvemos juntos el ejercicio de la pizarra, paso a paso y con calma. Míralo bien: ¿qué crees que deberíamos hacer primero?';
      lastTutorPhrase = mathGreeting;
      lastTutorTranslation = '';
      callHistory.push({ role: 'assistant', content: mathGreeting });
      setCaption('Profe Yesion', mathGreeting);
      setSuggestions('¿Cuál es el primer paso?', ['Dame una pista', 'Explícamelo paso a paso']);

      speakSequence([{ text: mathGreeting, lang: 'Español' }]);

    } else {
      // Idiomas: el personaje habla en su idioma y el subtítulo trae la traducción
      callMathBoard.style.display = 'none';
      const sc = currentScenario();

      callScenarioTitle.textContent = sc.title;
      callTutorName.textContent = `${sc.name} · ${sc.role}`;
      callTutorLabel.textContent = sc.name;
      callTutorFlag.src = flagUrl(currentLang().flag);
      const sceneKey = getScenarioKey(scenarioSelect.value);
      mountTutor(sc.name, sc.bg, characterProfile(sc, sceneKey));

      // Sin IA conectada se usa el guion del nivel: revisa cada respuesta y avanza pregunta por pregunta
      callLevel = langProgress(langSelect.value).level;
      script = state.hasLiveAI ? null
        : (getScript(langSelect.value, sceneKey, callLevel) || getScript(langSelect.value, sceneKey, 1) || null);
      if (script) callTutorName.textContent = `${sc.name} · ${sc.role} · ${LEVEL_LABEL[callLevel]}`;
      stepIdx = 0;
      attempts = 0;
      if (script) {
        askStep([]);
      } else {
        lastTutorPhrase = sc.greet;
        lastTutorTranslation = sc.greetEs;
        callHistory.push({ role: 'assistant', content: sc.greet });
        setCaption(sc.name, sc.greet, sc.greetEs);
        setSuggestions(sc.quickReplies?.[0], sc.quickReplies?.slice(1));
        speakSequence([{ text: sc.greet, lang: langSelect.value }]);
      }
    }
  }

  // Texto apto para leer en voz alta: sin Markdown ni comandos de LaTeX
  function speechText(s) {
    return noEmoji(s)
      // Muletillas que la voz deletrea ("eme, eme, eme")
      .replace(/(^|[\s"'¡¿(])(m{2,}|hmm+|mmh+|ehh+)[,.!…]*\s*/giu, '$1')
      .replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '$1 sobre $2')
      .replace(/\\sqrt\{([^}]*)\}/g, 'raíz de $1')
      .replace(/\^2/g, ' al cuadrado').replace(/\^3/g, ' al cubo')
      .replace(/\\(cdot|times)/g, ' por ').replace(/\\implies/g, ', entonces, ')
      .replace(/\\pi/g, ' pi ').replace(/\\text\{([^}]*)\}/g, '$1')
      .replace(/\\[a-zA-Z]+/g, ' ')
      .replace(/[$*_#`{}\\]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function voiceCode(langName) {
    return langName === 'Español' ? 'es-MX' : (LANG_VOICE_CODES[langName] || 'en-US');
  }

  // Elige la voz más humana disponible: primero las "Natural"/"Online" (Edge) y las de Google,
  // del mismo género que el personaje; para español prefiere acento latinoamericano
  const NATURAL_VOICE = /natural|online|neural|premium|enhanced|google/i;
  const FEMALE_VOICE = /female|mujer|dalia|elvira|paloma|salome|ximena|larissa|camila|jenny|aria|michelle|ava|emma|sonia|libby|denise|eloise|vivienne|katja|amala|seraphina|elsa|isabella|francisca|raquel|thalita|nanami|sabina|helena|zira|hazel|monica|paulina|lucia|samantha|karen|google español|google us english|google français|google deutsch|google italiano|google português/i;
  const MALE_VOICE = /\bmale\b|hombre|jorge|alvaro|gerardo|tomas|guy|eric|christopher|davis|andrew|brian|roger|ryan|thomas|henri|remy|conrad|killian|diego|giuseppe|antonio|duarte|keita|pablo|raul|david|mark|george|daniel|stefan|paul/i;
  let voiceCache = [];
  const loadVoices = () => { voiceCache = window.speechSynthesis?.getVoices() || []; };
  if ('speechSynthesis' in window) {
    loadVoices();
    window.speechSynthesis.addEventListener?.('voiceschanged', loadVoices);
  }

  // Voces "Multilingual" (Edge): son las mismas voces naturales del inglés, pero hablan cualquier idioma
  const MULTILINGUAL_VOICE = /multilingual|multilingüe/i;
  const VOICE_ES_KEY = 'omni_tutor_voice_es';
  let characterVoice = null;   // voz con la que habla el personaje en su idioma

  function pickVoice(code, gender) {
    if (!voiceCache.length) loadVoices();
    const base = code.slice(0, 2);

    if (base === 'es') {
      // 1) La que eligió la persona en Configuración
      const chosen = localStorage.getItem(VOICE_ES_KEY);
      const saved = chosen && voiceCache.find(v => v.name === chosen);
      if (saved) return saved;
      // 2) Si el personaje habla con una voz multilingüe, la misma voz dice el español
      if (characterVoice && MULTILINGUAL_VOICE.test(characterVoice.name)) return characterVoice;
    }

    let best = null;
    let bestScore = -Infinity;
    voiceCache.forEach(v => {
      const lang = v.lang.replace('_', '-');
      const multi = MULTILINGUAL_VOICE.test(v.name);
      if (!lang.toLowerCase().startsWith(base) && !(multi && base === 'es')) return;
      let score = 0;
      if (lang === code) score += 3;
      if (base === 'es' && /^es-(MX|US|CO|419|AR|CL|PE)/i.test(lang)) score += 2;
      // Que suene humana pesa más que el acento o el género
      if (NATURAL_VOICE.test(v.name)) score += 10;
      // Una voz multilingüe natural suena mucho mejor que una voz básica en español
      if (multi && base === 'es' && !lang.toLowerCase().startsWith('es')) score += 2;
      // En el idioma del personaje también se prefiere la multilingüe: así su español suena con la misma voz
      if (multi) score += 1;
      const isF = FEMALE_VOICE.test(v.name);
      const isM = MALE_VOICE.test(v.name) && !/female/i.test(v.name);
      // Mujer habla con voz de mujer y hombre con voz de hombre: el género pesa más que todo lo demás
      if ((gender === 'F' && isF) || (gender === 'M' && isM)) score += 20;
      if ((gender === 'F' && isM) || (gender === 'M' && isF)) score -= 20;
      if (score > bestScore) { bestScore = score; best = v; }
    });
    return best;
  }

  // ---- Selector de voz en español (Configuración) ----
  const voiceEsSelect = document.getElementById('voice-es-select');
  const btnTestVoiceEs = document.getElementById('btn-test-voice-es');

  function fillVoiceSelect() {
    if (!voiceEsSelect) return;
    loadVoices();
    const chosen = localStorage.getItem(VOICE_ES_KEY) || '';
    // Primero las naturales y multilingües, luego las básicas
    const usable = voiceCache
      .filter(v => v.lang.toLowerCase().startsWith('es') || MULTILINGUAL_VOICE.test(v.name))
      .sort((a, b) => Number(NATURAL_VOICE.test(b.name)) - Number(NATURAL_VOICE.test(a.name)));
    voiceEsSelect.innerHTML = '<option value="">Automática (la más natural)</option>' + usable.map(v => {
      const tag = NATURAL_VOICE.test(v.name) ? ' · natural' : ' · básica';
      return `<option value="${esc(v.name)}"${v.name === chosen ? ' selected' : ''}>${esc(v.name)}${tag}</option>`;
    }).join('');
  }

  if (voiceEsSelect) {
    fillVoiceSelect();
    window.speechSynthesis?.addEventListener?.('voiceschanged', fillVoiceSelect);
    voiceEsSelect.addEventListener('change', () => {
      try {
        if (voiceEsSelect.value) localStorage.setItem(VOICE_ES_KEY, voiceEsSelect.value);
        else localStorage.removeItem(VOICE_ES_KEY);
      } catch (e) { /* sin almacenamiento */ }
    });
    btnTestVoiceEs.addEventListener('click', () => {
      speakSequence([{ text: '¡Hola! Así sueno cuando te explico algo en español. ¿Te gusta esta voz?', lang: 'Español' }]);
    });
  }

  // Mueve los labios del avatar 3D palabra por palabra mientras suena la voz.
  // Si el navegador avisa cada palabra (boundary) se sincroniza con eso; si no, usa tiempos estimados.
  function lipSync(utter, text, lang) {
    if (!use3D || !window.Avatar3D) return;
    const chunks = lang === 'Japonés' ? (text.match(/.{1,3}/gu) || []) : text.split(/\s+/).filter(Boolean);
    const msPerChar = (lang === 'Japonés' ? 140 : 66) / (utter.rate || 1);
    const timers = [];
    let live = false;
    utter.addEventListener('start', () => {
      window.Avatar3D.talkStart();
      let t = 0;
      chunks.forEach(w => {
        const d = Math.max(160, w.length * msPerChar);
        timers.push(setTimeout(() => { if (!live) window.Avatar3D.word(w, lang, d); }, t));
        t += d + (/[.,!?;:。、！？]$/.test(w) ? 260 : 40);
      });
    });
    utter.addEventListener('boundary', (e) => {
      if (e.name && e.name !== 'word') return;
      if (!live) { live = true; timers.forEach(clearTimeout); }
      const w = (text.slice(e.charIndex).match(/^\S+/) || [''])[0];
      window.Avatar3D.word(w, lang, Math.max(160, (e.charLength || w.length) * msPerChar));
    });
    const stop = () => timers.forEach(clearTimeout);
    utter.addEventListener('end', stop);
    utter.addEventListener('error', stop);
  }

  // ---- Voz natural con Azure Speech: las mismas voces de Edge en cualquier navegador ----
  // Mujer = voz de mujer, hombre = voz de hombre. Las "Multilingual" también dicen el español con el mismo timbre.
  const AZURE_VOICES = {
    'Inglés': { F: 'en-US-AvaMultilingualNeural', M: 'en-US-AndrewMultilingualNeural', code: 'en-US' },
    'Francés': { F: 'fr-FR-VivienneMultilingualNeural', M: 'fr-FR-RemyMultilingualNeural', code: 'fr-FR' },
    'Alemán': { F: 'de-DE-SeraphinaMultilingualNeural', M: 'de-DE-FlorianMultilingualNeural', code: 'de-DE' },
    'Italiano': { F: 'it-IT-ElsaNeural', M: 'it-IT-DiegoNeural', code: 'it-IT' },
    'Portugués': { F: 'pt-BR-FranciscaNeural', M: 'pt-BR-AntonioNeural', code: 'pt-BR' },
    'Japonés': { F: 'ja-JP-NanamiNeural', M: 'ja-JP-KeitaNeural', code: 'ja-JP' },
    'Español': { F: 'es-MX-DaliaNeural', M: 'es-MX-JorgeNeural', code: 'es-MX' }
  };
  // Si una voz multilingüe no está en la región, se usa la clásica del mismo idioma y género
  const AZURE_SAFE = {
    'Inglés': { F: 'en-US-JennyNeural', M: 'en-US-GuyNeural' },
    'Francés': { F: 'fr-FR-DeniseNeural', M: 'fr-FR-HenriNeural' },
    'Alemán': { F: 'de-DE-KatjaNeural', M: 'de-DE-ConradNeural' }
  };
  const ttsCache = new Map();
  let azureFailed = false;
  let azureCharacterVoice = '';
  let azureAudio = null;
  let azureTimers = [];
  let speakToken = 0;

  const azureReady = () => !azureFailed && window.location.protocol !== 'file:'
    && Boolean((state.azureKey && state.azureRegion) || state.hasEnvAzure);

  async function azureClip(text, langName, rate) {
    const set = AZURE_VOICES[langName] || AZURE_VOICES['Español'];
    let voice = set[tutorGender] || set.F;
    // El español sale con la misma voz del personaje si es multilingüe (y del mismo género)
    if (langName === 'Español' && /Multilingual/.test(azureCharacterVoice)) voice = azureCharacterVoice;
    if (langName !== 'Español') azureCharacterVoice = voice;
    const cacheKey = `${voice}|${set.code}|${rate || 1}|${text}`;
    if (ttsCache.has(cacheKey)) return ttsCache.get(cacheKey);
    const ask = (v) => fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, lang: set.code, voice: v, rate: rate || 1, key: state.azureKey, region: state.azureRegion })
    });
    let res = await ask(voice);
    const safe = AZURE_SAFE[langName]?.[tutorGender];
    if (!res.ok && res.status !== 401 && safe) {
      res = await ask(safe);
      if (res.ok && langName !== 'Español') azureCharacterVoice = safe;
    }
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Azure respondió ${res.status}`);
    }
    const url = URL.createObjectURL(await res.blob());
    ttsCache.set(cacheKey, url);
    return url;
  }

  // Reparte las palabras a lo largo del audio para mover los labios del avatar 3D
  function scheduleLips(part, seconds) {
    if (!use3D || !window.Avatar3D) return;
    window.Avatar3D.talkStart();
    const chunks = part.lang === 'Japonés' ? (part.text.match(/.{1,3}/gu) || []) : part.text.split(/\s+/).filter(Boolean);
    const total = chunks.reduce((s, w) => s + w.length + 1, 0) || 1;
    const ms = (Number.isFinite(seconds) && seconds > 0 ? seconds * 1000 : total * 66) * 0.95;
    let t = 0;
    chunks.forEach(w => {
      const d = ((w.length + 1) / total) * ms;
      azureTimers.push(setTimeout(() => window.Avatar3D.word(w, part.lang, d), t));
      t += d;
    });
  }

  function playClip(url, part, token) {
    return new Promise(resolve => {
      const audio = new Audio(url);
      azureAudio = audio;
      audio.onplay = () => { if (token === speakToken) { setTalking(true); scheduleLips(part, audio.duration); } };
      audio.onended = resolve;
      audio.onerror = resolve;
      audio.play().catch(resolve);
    });
  }

  async function speakAzure(queue, onDone) {
    const token = speakToken;
    // Pide todos los audios a la vez y los reproduce en orden
    const clips = queue.map(p => azureClip(p.text, p.lang, p.rate).catch(e => e));
    for (let i = 0; i < queue.length; i++) {
      const url = await clips[i];
      if (token !== speakToken) return;
      if (url instanceof Error) {
        azureFailed = true;
        console.warn('Azure Speech no disponible; sigue la voz del navegador.', url);
        showXpToast(`Voz de Azure no disponible: ${url.message} Uso la voz del navegador.`);
        speakBrowser(queue.slice(i), onDone);
        return;
      }
      await playClip(url, queue[i], token);
      if (token !== speakToken) return;
    }
    setTalking(false);
    onDone?.();
  }

  // Detiene cualquier voz en curso (Azure o navegador)
  function stopSpeech() {
    speakToken++;
    window.speechSynthesis?.cancel();
    if (azureAudio) { azureAudio.pause(); azureAudio = null; }
    azureTimers.forEach(clearTimeout);
    azureTimers = [];
  }

  // Dice varias frases seguidas, cada una con la voz de su idioma, y mueve la boca del avatar
  function speakSequence(parts, onDone) {
    stopSpeech();
    // Frase por frase: Chrome corta las locuciones largas
    const queue = parts.filter(p => p && p.text).flatMap(p =>
      (speechText(p.text).match(/[^.!?。！？]+[.!?。！？]*/gu) || [])
        .map(t => ({ text: t.trim(), lang: p.lang, rate: p.rate }))
        .filter(x => /[\p{L}\p{N}]/u.test(x.text)));
    if (!queue.length) { onDone?.(); return; }
    if (azureReady()) speakAzure(queue, onDone);
    else speakBrowser(queue, onDone);
  }

  function speakBrowser(queue, onDone) {
    if (!('speechSynthesis' in window)) { setTalking(false); onDone?.(); return; }
    window.speechSynthesis.cancel();
    queue.forEach((p, i) => {
      const text = speechText(p.text);
      const utter = new SpeechSynthesisUtterance(text);
      const code = voiceCode(p.lang);
      utter.lang = code;
      const voice = pickVoice(code, tutorGender);
      if (voice) utter.voice = voice;
      if (voice && p.lang !== 'Español') characterVoice = voice;
      // Las voces naturales ya suenan bien a velocidad normal; las básicas, un poco más lentas
      const natural = voice && NATURAL_VOICE.test(voice.name);
      utter.rate = p.rate || (natural ? 1 : (p.lang === 'Español' ? 0.95 : 0.9));
      utter.pitch = natural ? 1 : 1.05;
      // Si el navegador no tiene voz del género del personaje en ese idioma, se ajusta el tono
      const voiceIsMale = voice && MALE_VOICE.test(voice.name) && !/female/i.test(voice.name);
      if (tutorGender === 'M' && !voiceIsMale) utter.pitch = 0.6;
      if (tutorGender === 'F' && voiceIsMale) utter.pitch = 1.35;
      lipSync(utter, text, p.lang);
      utter.onstart = () => setTalking(true);
      const finish = () => {
        if (i === queue.length - 1) { setTalking(false); onDone?.(); }
      };
      utter.onend = finish;
      utter.onerror = finish;
      window.speechSynthesis.speak(utter);
    });
  }

  function speakTutorResponse(text, langName) {
    speakSequence([{ text, lang: langName }]);
  }

  // Botón "Repetir audio" en el subtítulo
  if (btnReplayCaption) {
    btnReplayCaption.addEventListener('click', () => {
      if (lastTutorPhrase) {
        speakTutorResponse(lastTutorPhrase, callMode === 'math' ? 'Español' : langSelect.value);
      }
    });
  }

  // Botón "No entendí / Explicar en español"
  if (btnCallExplainEs) {
    btnCallExplainEs.addEventListener('click', () => {
      explainInSpanish();
    });
  }

  function explainInSpanish() {
    stopSpeech();
    stopListening();

    if (callMode === 'math') {
      const msg = 'No te preocupes, vamos más despacio. Te doy una pista y lo vemos juntos.';
      setCaption('Profe Yesion', msg);
      speakSequence([{ text: msg, lang: 'Español' }], () => handleUserSpeechTurn('Dame una pista, por favor'));
      return;
    }

    // Explicación en español natural; la frase de ejemplo se dice con la voz del idioma que practica
    const sc = currentScenario();
    const meaning = lastTutorTranslation || sc.greetEs;
    const example = lastSuggestion || sc.quickReplies?.[0] || '';
    const intro = `No te preocupes, te lo explico en español. Te dije: ${meaning}`;
    const outro = '¡Ahora inténtalo tú!';

    setCaption(`${sc.name} · en español`, `${intro} Puedes contestarme: "${example}". ${outro}`);
    speakSequence([
      { text: `${intro}. Puedes contestarme así:`, lang: 'Español' },
      { text: example, lang: langSelect.value },
      { text: outro, lang: 'Español' }
    ]);
  }

  // Control de Micrófono (Hablar en vivo)
  btnCallMic.addEventListener('click', () => {
    if (!SpeechRecognition) {
      alert('Tu navegador no soporta reconocimiento de voz nativo. Te recomendamos usar Google Chrome o Microsoft Edge.');
      return;
    }

    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  });

  function startListening() {
    try {
      stopSpeech();
      recognitionInstance = new SpeechRecognition();

      let langCode = 'es-ES';
      if (callMode === 'language') {
        langCode = LANG_VOICE_CODES[langSelect.value] || 'en-US';
      }
      recognitionInstance.lang = langCode;
      recognitionInstance.interimResults = false;
      recognitionInstance.maxAlternatives = 3;

      recognitionInstance.onstart = () => {
        isListening = true;
        btnCallMic.classList.add('listening');
        btnCallMicLabel.textContent = 'Escuchando...';
        setCaption('Tú', 'Te escucho… di tu respuesta.');
      };

      const rec = recognitionInstance;
      let gotResult = false;

      rec.onresult = (event) => {
        // El reconocedor puede oír varias versiones; todas cuentan al revisar la respuesta
        gotResult = true;
        const heard = Array.from(event.results[0]).map(r => r.transcript).filter(Boolean);
        const confidence = event.results[0][0].confidence || 0;
        stopListening();
        if (!heard.length) { setCaption('Aviso', MIC_ERRORS['no-speech']); return; }
        handleUserSpeechTurn(heard[0], heard.slice(1), { spoken: true, confidence });
      };

      rec.onerror = (e) => {
        console.warn('Error en SpeechRecognition:', e.error, e);
        gotResult = true;
        stopListening();
        setCaption('Aviso', MIC_ERRORS[e.error] || `El micrófono falló (${e.error}). Toca Hablar de nuevo o elige una respuesta.`);
      };

      rec.onend = () => {
        // Solo apaga si sigue siendo la misma escucha (no una nueva que ya empezó)
        if (recognitionInstance === rec) stopListening();
        if (!gotResult) setCaption('Aviso', MIC_ERRORS['no-speech']);
      };

      rec.start();
    } catch (err) {
      console.error('No se pudo iniciar SpeechRecognition:', err);
      stopListening();
      setCaption('Aviso', `No se pudo encender el micrófono: ${err.message}`);
    }
  }

  // Qué decirle a la persona según el motivo por el que el micrófono no funcionó
  const MIC_ERRORS = {
    'not-allowed': 'El navegador bloqueó el micrófono. Toca el candado junto a la dirección (localhost:3000), permite el micrófono y recarga la página.',
    'service-not-allowed': 'El navegador no deja usar el reconocimiento de voz en esta página. Prueba en Google Chrome.',
    'audio-capture': 'No encuentro un micrófono. Revisa que esté conectado y que Windows le dé permiso al navegador.',
    'network': 'El reconocimiento de voz necesita internet y no pudo conectarse. Revisa tu conexión o prueba en Google Chrome.',
    'no-speech': 'No escuché nada. Toca Hablar y habla apenas se ponga rojo el botón.',
    'aborted': 'Se cortó la escucha. Toca Hablar de nuevo.',
    'language-not-supported': 'Este navegador no reconoce voz en ese idioma. Prueba en Google Chrome.'
  };

  function stopListening() {
    isListening = false;
    btnCallMic.classList.remove('listening');
    btnCallMicLabel.textContent = 'Hablar';
    if (recognitionInstance) {
      try { recognitionInstance.stop(); } catch(e) {}
      recognitionInstance = null;
    }
  }

  // Procesar turno hablado por el alumno
  async function handleUserSpeechTurn(userText, alternatives = [], meta = {}) {
    if (!userText || !callActive) return;

    callTurnsCount++;
    stopSpeech();
    setCaption('Tú', `"${userText}"`);

    // Si dice que no entiende, el tutor explica en español
    const lower = userText.toLowerCase();
    if (callMode === 'language' && /(^|[\s¿¡,])(no entiendo|no entendí|no sé|no se|en español|qué dijiste|que dijiste|help)([\s.,!?]|$)/.test(lower)) {
      explainInSpanish();
      return;
    }

    if (callMode === 'language' && script) {
      callHistory.push({ role: 'user', content: userText });
      handleScriptTurn([userText, ...alternatives], meta);
      return;
    }

    if (callMode === 'math' && !state.hasLiveAI && mathSession) {
      const r = mathSession.answer([userText, ...alternatives].find(t => window.MathCoach.numbersIn(t).length) || userText);
      const out = mathAdvance(r);
      sayMath(out.next ? `${out.say} ${out.next}` : out.say);
      return;
    }

    callHistory.push({ role: 'user', content: userText });
    const tutorName = callMode === 'math' ? 'Profe Yesion' : currentScenario().name;
    const thinking = setTimeout(() => {
      if (callActive) setCaption(tutorName, 'Pensando…');
    }, 900);

    try {
      const data = await callChatService({
        message: userText,
        mode: callMode,
        targetLanguage: langSelect.value,
        scenario: scenarioSelect.value,
        history: callHistory.slice(-8),
        apiKey: state.apiKey
      });
      clearTimeout(thinking);
      if (!callActive) return;

      const reply = splitTutorReply(data.reply);
      callHistory.push({ role: 'assistant', content: reply.text });
      lastTutorPhrase = reply.text;
      lastTutorTranslation = data.translation || reply.translation;

      if (callMode === 'math') {
        setCaption(tutorName, reply.text);
        speakSequence([{ text: reply.text, lang: 'Español' }]);
        const callMathStep = document.getElementById('call-math-step');
        const firstLine = reply.text.split('\n').map(l => l.trim()).find(l => l.length > 12) || reply.text;
        if (callMathStep) {
          callMathStep.textContent = firstLine.length > 140 ? firstLine.slice(0, 140) + '…' : firstLine;
          renderMathInElement(callMathStep);
        }
        setSuggestions('Dame una pista', ['¿Voy bien?', 'Explícamelo paso a paso']);
      } else {
        // El tutor siempre sigue la conversación: primero reacciona a lo que dijiste (bien o mal) y luego pregunta lo siguiente
        const sc = currentScenario();
        const lang = langSelect.value;
        const answeredInSpanish = lang !== 'Español' && SPANISH_HINT.test(userText);
        const parts = [];
        let note = '';

        if (reply.error) {
          const right = reply.error.includes('→') ? reply.error.split('→')[1].trim() : reply.error;
          note = `Casi. Se dice: "${right}".${reply.why ? ' ' + reply.why : ''}`;
          parts.push({ text: 'Casi. Se dice así:', lang: 'Español' }, { text: right, lang });
        } else if (answeredInSpanish) {
          const example = lastSuggestion || sc.quickReplies?.[0] || '';
          note = `Te entendí, pero intenta decirlo en ${lang.toLowerCase()}. Por ejemplo: "${example}".`;
          parts.push({ text: `Te entendí, pero intenta decirlo en ${lang.toLowerCase()}. Por ejemplo:`, lang: 'Español' }, { text: example, lang });
        } else if (data.isDemo && PRAISE[lang]) {
          parts.push({ text: pick(PRAISE[lang]), lang });
        }
        parts.push({ text: reply.text, lang });

        setCaption(sc.name, reply.text, lastTutorTranslation);
        if (note) {
          captionsTranslation.hidden = false;
          captionsTranslation.textContent = `${note}${lastTutorTranslation ? ` · Ahora te pregunta: ${lastTutorTranslation}` : ''}`;
        }
        speakSequence(parts);

        const next = suggestionFrom(reply.native) || suggestionFrom(data.reply);
        setSuggestions(next, sc.quickReplies);
      }

      if (callMode === 'language') {
        state.langCount++;
        localStorage.setItem('omni_tutor_lang_count', state.langCount);
        unlockBadge('first_step');
        if (state.langCount >= 5) unlockBadge('polyglot');
      } else {
        state.mathCount++;
        localStorage.setItem('omni_tutor_math_count', state.mathCount);
        unlockBadge('first_step');
        if (state.mathCount >= 3) unlockBadge('math_mind');
      }

    } catch (e) {
      clearTimeout(thinking);
      if (!callActive) return;
      setCaption(tutorName, 'Se cortó la conexión con el tutor. Toca Hablar para intentarlo otra vez.');
    }
  }

  // Control de Cámara Web
  btnCallCam.addEventListener('click', async () => {
    if (webcamStream) {
      webcamStream.getTracks().forEach(t => t.stop());
      webcamStream = null;
      studentWebcam.style.display = 'none';
      studentAvatarFallback.style.display = 'flex';
      studentCamStatus.textContent = 'Cámara apagada';
      btnCallCam.classList.remove('active');
      btnCallCamLabel.textContent = 'Cámara';
    } else {
      try {
        webcamStream = await navigator.mediaDevices.getUserMedia({ video: { width: 400, height: 300 } });
        studentWebcam.srcObject = webcamStream;
        studentWebcam.style.display = 'block';
        studentAvatarFallback.style.display = 'none';
        studentCamStatus.textContent = 'En vivo';
        btnCallCam.classList.add('active');
        btnCallCamLabel.textContent = 'Apagar Cam';
      } catch (err) {
        alert('No se pudo acceder a tu cámara web. Revisa que tu navegador tenga los permisos activos.');
      }
    }
  });

  // Mostrar pista durante la videollamada
  btnCallHint.addEventListener('click', () => {
    const isShown = callHintPill.style.display !== 'none';
    callHintPill.style.display = isShown ? 'none' : 'block';
  });

  // Colgar llamada
  btnEndCallTop.addEventListener('click', endVideocall);
  btnCallHangup.addEventListener('click', endVideocall);

  function endVideocall() {
    if (!callActive) return;
    callActive = false;

    stopSpeech();
    stopListening();
    clearTimeout(blinkTimer);
    setTalking(false);

    if (webcamStream) {
      webcamStream.getTracks().forEach(t => t.stop());
      webcamStream = null;
    }
    studentWebcam.style.display = 'none';
    studentAvatarFallback.style.display = 'flex';
    studentCamStatus.textContent = 'Cámara apagada';
    btnCallCam.classList.remove('active');

    clearInterval(callTimerInterval);
    const finalMins = String(Math.floor(callSeconds / 60)).padStart(2, '0');
    const finalSecs = String(callSeconds % 60).padStart(2, '0');

    videocallOverlay.style.display = 'none';

    addXP(50, callMode === 'math' ? 'Clase de matemáticas en vivo' : 'Videollamada de idiomas');

    summaryCallTime.textContent = `${finalMins}:${finalSecs}`;
    summaryCallTurns.textContent = String(callTurnsCount);
    summaryCallXp.textContent = '+50 XP';
    callSummaryModal.style.display = 'flex';
  }

  btnCloseCallSummary.addEventListener('click', () => {
    callSummaryModal.style.display = 'none';
  });
});
