// Guiones de la videollamada sin IA: cada situación avanza por preguntas.
// q: lo que dice el personaje · es: traducción · opts: respuestas sugeridas [frase, traducción]
// keys: palabras (o raíces) que cuentan como respuesta a esa pregunta; las palabras largas de opts también cuentan.
// end: despedida del personaje cuando termina la conversación.
window.CALL_SCRIPTS = {
  'Inglés': {
    'Café': {
      steps: [
        { q: "Hi there! Welcome to The London Roast. What can I get started for you today?", es: "¡Hola! Bienvenido a The London Roast. ¿Qué te sirvo hoy?",
          opts: [["Could I have a latte, please?", "¿Me das un latte, por favor?"], ["A cappuccino, please.", "Un capuchino, por favor."], ["What do you recommend?", "¿Qué me recomiendas?"]],
          keys: ['coffee', 'latte', 'cappuccino', 'tea', 'espresso', 'americano', 'mocha', 'chocolate', 'water', 'juice', 'recommend', 'have', 'get', 'like', 'want', 'please'] },
        { q: "Great choice! What size would you like: small, medium or large?", es: "¡Buena elección! ¿De qué tamaño lo quieres: pequeño, mediano o grande?",
          opts: [["A medium one, please.", "Uno mediano, por favor."], ["Large, please.", "Grande, por favor."], ["Small is fine, thanks.", "Pequeño está bien, gracias."]],
          keys: ['small', 'medium', 'large', 'big', 'regular', 'size', 'tall', 'grande'] },
        { q: "Is that for here or to take away?", es: "¿Es para tomar aquí o para llevar?",
          opts: [["For here, please.", "Para tomar aquí, por favor."], ["To take away, please.", "Para llevar, por favor."], ["To go, thanks.", "Para llevar, gracias."]],
          keys: ['here', 'take', 'away', 'go', 'stay', 'out'] },
        { q: "Perfect. That's four pounds fifty. Will you pay by card or cash?", es: "Perfecto. Son cuatro libras con cincuenta. ¿Pagas con tarjeta o en efectivo?",
          opts: [["By card, please.", "Con tarjeta, por favor."], ["Cash, here you go.", "En efectivo, aquí tienes."], ["Can I pay with my phone?", "¿Puedo pagar con el celular?"]],
          keys: ['card', 'cash', 'pay', 'phone', 'money', 'here', 'contactless'] }
      ],
      end: ["Here you go! Enjoy your coffee and have a lovely day!", "¡Aquí tienes! Disfruta tu café y que tengas un lindo día."]
    },
    'Aeropuerto': {
      steps: [
        { q: "Good afternoon. May I see your passport and boarding pass, please?", es: "Buenas tardes. ¿Me muestra su pasaporte y su pase de abordar, por favor?",
          opts: [["Sure, here you are.", "Claro, aquí tiene."], ["Here is my passport.", "Aquí está mi pasaporte."], ["Of course, one moment.", "Por supuesto, un momento."]],
          keys: ['here', 'sure', 'passport', 'boarding', 'course', 'yes', 'moment', 'okay', 'ok'] },
        { q: "What is the purpose of your visit?", es: "¿Cuál es el motivo de su visita?",
          opts: [["I'm here on vacation.", "Vengo de vacaciones."], ["I'm here for work.", "Vengo por trabajo."], ["I'm visiting my family.", "Vengo a visitar a mi familia."]],
          keys: ['vacation', 'holiday', 'tourism', 'tourist', 'work', 'business', 'visit', 'family', 'friend', 'study', 'conference', 'trip'] },
        { q: "How long are you planning to stay?", es: "¿Cuánto tiempo piensa quedarse?",
          opts: [["For two weeks.", "Por dos semanas."], ["Just ten days.", "Solo diez días."], ["About a month.", "Más o menos un mes."]],
          keys: ['day', 'week', 'month', 'year', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'fifteen', 'until', 'stay'] },
        { q: "Where will you be staying during your visit?", es: "¿Dónde se va a hospedar durante su visita?",
          opts: [["At a hotel downtown.", "En un hotel del centro."], ["With my family.", "Con mi familia."], ["In a rented apartment.", "En un apartamento alquilado."]],
          keys: ['hotel', 'hostel', 'apartment', 'airbnb', 'house', 'family', 'friend', 'stay', 'downtown', 'center', 'centre'] }
      ],
      end: ["Thank you. Everything is in order. Welcome, and enjoy your stay!", "Gracias. Todo está en orden. ¡Bienvenido y disfrute su estadía!"]
    },
    'Entrevista': {
      steps: [
        { q: "Thanks for coming in today. Could you tell me a little about yourself?", es: "Gracias por venir hoy. ¿Podrías contarme un poco sobre ti?",
          opts: [["Sure. I'm a designer with five years of experience.", "Claro. Soy diseñadora con cinco años de experiencia."], ["I'm a student and I love learning new things.", "Soy estudiante y me encanta aprender cosas nuevas."], ["I have experience in customer service.", "Tengo experiencia en atención al cliente."]],
          keys: ['name', 'experience', 'work', 'year', 'student', 'study', 'job', 'designer', 'engineer', 'teacher', 'manager', 'love', 'like', 'from'] },
        { q: "Why do you want to work with us?", es: "¿Por qué quieres trabajar con nosotros?",
          opts: [["Because I admire your company's values.", "Porque admiro los valores de su empresa."], ["I want to grow professionally here.", "Quiero crecer profesionalmente aquí."], ["I think my skills are a great fit.", "Creo que mis habilidades encajan muy bien."]],
          keys: ['because', 'company', 'grow', 'learn', 'value', 'team', 'skill', 'fit', 'passion', 'admire', 'opportunity', 'want'] },
        { q: "What would you say is your greatest strength?", es: "¿Cuál dirías que es tu mayor fortaleza?",
          opts: [["I'm very organized.", "Soy muy organizada."], ["I learn quickly.", "Aprendo rápido."], ["I work well in a team.", "Trabajo bien en equipo."]],
          keys: ['organized', 'learn', 'quick', 'fast', 'team', 'creative', 'responsible', 'hard', 'patient', 'communication', 'strength', 'good'] },
        { q: "Do you have any questions for us?", es: "¿Tienes alguna pregunta para nosotros?",
          opts: [["What does a typical day look like?", "¿Cómo es un día típico?"], ["When can I expect an answer?", "¿Cuándo puedo esperar una respuesta?"], ["No, thank you. Everything is clear.", "No, gracias. Todo está claro."]],
          keys: ['what', 'when', 'how', 'day', 'team', 'answer', 'salary', 'start', 'thank', 'clear', 'question', 'yes'] }
      ],
      end: ["Thank you so much for your time. We'll be in touch very soon!", "Muchas gracias por tu tiempo. ¡Te contactaremos muy pronto!"]
    },
    'Hotel': {
      steps: [
        { q: "Good evening and welcome! Do you have a reservation with us?", es: "¡Buenas noches y bienvenido! ¿Tiene una reserva con nosotros?",
          opts: [["Yes, I have a reservation under my name.", "Sí, tengo una reserva a mi nombre."], ["Yes, it's under García.", "Sí, está a nombre de García."], ["No, do you have a room available?", "No, ¿tienen una habitación disponible?"]],
          keys: ['yes', 'reservation', 'booking', 'booked', 'name', 'under', 'room', 'available', 'have'] },
        { q: "Could I see your ID or passport, please?", es: "¿Me permite su documento o pasaporte, por favor?",
          opts: [["Sure, here it is.", "Claro, aquí está."], ["Here is my passport.", "Aquí tiene mi pasaporte."], ["Of course, one second.", "Por supuesto, un segundo."]],
          keys: ['here', 'sure', 'passport', 'course', 'card', 'second', 'moment', 'yes'] },
        { q: "Would you like a room with a city view or a garden view?", es: "¿Prefiere una habitación con vista a la ciudad o al jardín?",
          opts: [["A city view, please.", "Con vista a la ciudad, por favor."], ["The garden view sounds nice.", "La vista al jardín suena bien."], ["Whichever is quieter.", "La que sea más tranquila."]],
          keys: ['city', 'garden', 'view', 'quiet', 'either', 'whichever', 'any', 'prefer'] },
        { q: "Breakfast is from seven to ten. Do you need anything else?", es: "El desayuno es de siete a diez. ¿Necesita algo más?",
          opts: [["What's the Wi-Fi password?", "¿Cuál es la clave del wifi?"], ["Could I get a late checkout?", "¿Podría salir más tarde?"], ["No, that's all. Thank you!", "No, es todo. ¡Gracias!"]],
          keys: ['wifi', 'password', 'checkout', 'late', 'thank', 'all', 'towel', 'taxi', 'yes', 'need'] }
      ],
      end: ["Your room is 304. Have a wonderful stay!", "Su habitación es la 304. ¡Que tenga una estadía maravillosa!"]
    },
    'amigo': {
      steps: [
        { q: "Hey! Long time no see. How have you been?", es: "¡Hola! ¡Cuánto tiempo sin vernos! ¿Cómo has estado?",
          opts: [["I'm doing great, and you?", "Muy bien, ¿y tú?"], ["Pretty busy, but good!", "Bastante ocupado, ¡pero bien!"], ["Not bad, thanks for asking.", "Nada mal, gracias por preguntar."]],
          keys: ['good', 'great', 'fine', 'well', 'busy', 'bad', 'tired', 'okay', 'ok', 'doing', 'thanks', 'you'] },
        { q: "Glad to hear that! What have you been up to lately?", es: "¡Qué bueno! ¿Qué has estado haciendo últimamente?",
          opts: [["I've been working a lot.", "He estado trabajando mucho."], ["I started learning English!", "¡Empecé a aprender inglés!"], ["I traveled to the beach.", "Viajé a la playa."]],
          keys: ['work', 'study', 'learn', 'travel', 'english', 'beach', 'family', 'read', 'gym', 'nothing', 'much', 'been', 'started'] },
        { q: "That's awesome. Do you have any plans for the weekend?", es: "¡Genial! ¿Tienes planes para el fin de semana?",
          opts: [["I might go to the movies.", "Tal vez vaya al cine."], ["Nothing yet. Any ideas?", "Nada todavía. ¿Alguna idea?"], ["I'm visiting my family.", "Voy a visitar a mi familia."]],
          keys: ['movie', 'cinema', 'family', 'nothing', 'idea', 'rest', 'party', 'park', 'beach', 'visit', 'going', 'plan', 'might', 'maybe'] },
        { q: "We should grab a coffee soon. What do you think?", es: "Deberíamos tomarnos un café pronto. ¿Qué dices?",
          opts: [["Sounds great! Let's do it.", "¡Suena genial! Hagámoslo."], ["Sure, how about Saturday?", "Claro, ¿qué tal el sábado?"], ["I'd love to!", "¡Me encantaría!"]],
          keys: ['sure', 'yes', 'great', 'love', 'sound', 'saturday', 'sunday', 'friday', 'tomorrow', 'let', 'okay', 'ok', 'good'] }
      ],
      end: ["Perfect! It was great catching up. Talk soon!", "¡Perfecto! Qué bueno ponernos al día. ¡Hablamos pronto!"]
    }
  },

  'Francés': {
    'Café': {
      steps: [
        { q: "Bonjour ! Bienvenue au Café de Paris. Que puis-je vous servir ?", es: "¡Hola! Bienvenido al Café de París. ¿Qué le sirvo?",
          opts: [["Un café crème, s'il vous plaît.", "Un café con leche, por favor."], ["Un croissant et un café, s'il vous plaît.", "Un croissant y un café, por favor."], ["Qu'est-ce que vous me conseillez ?", "¿Qué me recomienda?"]],
          keys: ['cafe', 'creme', 'the', 'croissant', 'chocolat', 'eau', 'jus', 'conseill', 'voudrais', 'prendre', 'plait'] },
        { q: "Très bien. Sur place ou à emporter ?", es: "Muy bien. ¿Para tomar aquí o para llevar?",
          opts: [["Sur place, merci.", "Aquí, gracias."], ["À emporter, s'il vous plaît.", "Para llevar, por favor."], ["Sur place, en terrasse.", "Aquí, en la terraza."]],
          keys: ['place', 'emporter', 'terrasse', 'ici'] },
        { q: "Vous voulez autre chose avec ça ?", es: "¿Quiere algo más con eso?",
          opts: [["Non, c'est tout, merci.", "No, es todo, gracias."], ["Oui, un verre d'eau.", "Sí, un vaso de agua."], ["Un pain au chocolat aussi.", "Un pan de chocolate también."]],
          keys: ['non', 'oui', 'tout', 'eau', 'pain', 'aussi', 'merci', 'gateau'] },
        { q: "Ça fait quatre euros cinquante. Vous payez par carte ?", es: "Son cuatro euros con cincuenta. ¿Paga con tarjeta?",
          opts: [["Oui, par carte.", "Sí, con tarjeta."], ["Non, en espèces.", "No, en efectivo."], ["Je peux payer avec mon téléphone ?", "¿Puedo pagar con el celular?"]],
          keys: ['carte', 'especes', 'payer', 'telephone', 'oui', 'non', 'voici'] }
      ],
      end: ["Voilà ! Bonne journée et à bientôt !", "¡Aquí tiene! ¡Buen día y hasta pronto!"]
    },
    'Aeropuerto': {
      steps: [
        { q: "Bonjour. Puis-je voir votre passeport et votre billet d'avion ?", es: "Buenos días. ¿Puedo ver su pasaporte y su boleto de avión?",
          opts: [["Voici mon passeport.", "Aquí está mi pasaporte."], ["Bien sûr, tenez.", "Claro, tenga."], ["Oui, un instant.", "Sí, un momento."]],
          keys: ['voici', 'passeport', 'bien', 'sur', 'tenez', 'oui', 'instant', 'billet'] },
        { q: "Quel est le motif de votre voyage ?", es: "¿Cuál es el motivo de su viaje?",
          opts: [["Je viens pour les vacances.", "Vengo de vacaciones."], ["Je viens pour le travail.", "Vengo por trabajo."], ["Je rends visite à ma famille.", "Vengo a visitar a mi familia."]],
          keys: ['vacance', 'tourisme', 'travail', 'famille', 'visite', 'etude', 'affaire', 'voyage'] },
        { q: "Combien de temps allez-vous rester ?", es: "¿Cuánto tiempo se va a quedar?",
          opts: [["Deux semaines.", "Dos semanas."], ["Dix jours.", "Diez días."], ["Un mois environ.", "Más o menos un mes."]],
          keys: ['jour', 'semaine', 'mois', 'an', 'deux', 'trois', 'dix', 'quinze', 'environ', 'rester'] },
        { q: "Où allez-vous loger ?", es: "¿Dónde se va a hospedar?",
          opts: [["Dans un hôtel à Paris.", "En un hotel en París."], ["Chez ma famille.", "En casa de mi familia."], ["Dans un appartement loué.", "En un apartamento alquilado."]],
          keys: ['hotel', 'chez', 'famille', 'appartement', 'ami', 'loger', 'paris'] }
      ],
      end: ["Merci, tout est en ordre. Bon séjour en France !", "Gracias, todo está en orden. ¡Buena estadía en Francia!"]
    },
    'Entrevista': {
      steps: [
        { q: "Bonjour et bienvenue. Pourriez-vous vous présenter brièvement ?", es: "Buenos días y bienvenido. ¿Podría presentarse brevemente?",
          opts: [["Je m'appelle Ana et je suis designer.", "Me llamo Ana y soy diseñadora."], ["J'ai cinq ans d'expérience.", "Tengo cinco años de experiencia."], ["Je suis étudiante en commerce.", "Soy estudiante de comercio."]],
          keys: ['appelle', 'suis', 'experience', 'travaille', 'etudi', 'ans', 'designer', 'ingenieur', 'professeur'] },
        { q: "Pourquoi voulez-vous travailler chez nous ?", es: "¿Por qué quiere trabajar con nosotros?",
          opts: [["J'admire les valeurs de votre entreprise.", "Admiro los valores de su empresa."], ["Je veux apprendre et progresser.", "Quiero aprender y progresar."], ["Mon profil correspond au poste.", "Mi perfil encaja con el puesto."]],
          keys: ['parce', 'entreprise', 'valeur', 'apprendre', 'progresser', 'equipe', 'profil', 'poste', 'veux'] },
        { q: "Quel est votre principal point fort ?", es: "¿Cuál es su principal fortaleza?",
          opts: [["Je suis très organisée.", "Soy muy organizada."], ["J'apprends vite.", "Aprendo rápido."], ["J'aime le travail en équipe.", "Me gusta el trabajo en equipo."]],
          keys: ['organis', 'apprend', 'vite', 'equipe', 'creati', 'serieu', 'patient', 'responsable'] },
        { q: "Avez-vous des questions pour nous ?", es: "¿Tiene alguna pregunta para nosotros?",
          opts: [["Comment se passe une journée type ?", "¿Cómo es un día típico?"], ["Quand aurai-je une réponse ?", "¿Cuándo tendré una respuesta?"], ["Non, merci, tout est clair.", "No, gracias, todo está claro."]],
          keys: ['comment', 'quand', 'journee', 'reponse', 'non', 'oui', 'merci', 'clair', 'salaire'] }
      ],
      end: ["Merci beaucoup pour votre temps. Nous vous recontacterons bientôt !", "Muchas gracias por su tiempo. ¡Lo contactaremos pronto!"]
    },
    'Hotel': {
      steps: [
        { q: "Bonsoir et bienvenue ! Avez-vous une réservation chez nous ?", es: "¡Buenas noches y bienvenido! ¿Tiene una reserva con nosotros?",
          opts: [["Oui, j'ai une réservation à mon nom.", "Sí, tengo una reserva a mi nombre."], ["Oui, au nom de García.", "Sí, a nombre de García."], ["Non, avez-vous une chambre libre ?", "No, ¿tienen una habitación libre?"]],
          keys: ['oui', 'non', 'reservation', 'reserve', 'nom', 'chambre', 'libre'] },
        { q: "Puis-je voir une pièce d'identité, s'il vous plaît ?", es: "¿Puedo ver un documento de identidad, por favor?",
          opts: [["Voici mon passeport.", "Aquí tiene mi pasaporte."], ["Bien sûr, tenez.", "Claro, tenga."], ["Oui, un instant.", "Sí, un momento."]],
          keys: ['voici', 'passeport', 'bien', 'tenez', 'oui', 'instant', 'carte'] },
        { q: "Vous préférez une chambre côté rue ou côté jardin ?", es: "¿Prefiere una habitación hacia la calle o hacia el jardín?",
          opts: [["Côté jardin, s'il vous plaît.", "Hacia el jardín, por favor."], ["Côté rue, ça va.", "Hacia la calle está bien."], ["La plus calme, s'il vous plaît.", "La más tranquila, por favor."]],
          keys: ['jardin', 'rue', 'calme', 'importe', 'prefere', 'cote'] },
        { q: "Le petit-déjeuner est servi de sept à dix heures. Autre chose ?", es: "El desayuno se sirve de siete a diez. ¿Algo más?",
          opts: [["Quel est le mot de passe du wifi ?", "¿Cuál es la clave del wifi?"], ["Non, c'est tout, merci.", "No, es todo, gracias."], ["Je peux partir plus tard demain ?", "¿Puedo salir más tarde mañana?"]],
          keys: ['wifi', 'passe', 'non', 'merci', 'tout', 'tard', 'taxi', 'oui'] }
      ],
      end: ["Votre chambre est la 304. Bonne nuit et bon séjour !", "Su habitación es la 304. ¡Buenas noches y buena estadía!"]
    },
    'amigo': {
      steps: [
        { q: "Salut ! Ça fait un bail ! Comment vas-tu ?", es: "¡Hola! ¡Cuánto tiempo! ¿Cómo estás?",
          opts: [["Ça va super bien, et toi ?", "Súper bien, ¿y tú?"], ["Un peu fatigué, mais ça va.", "Un poco cansado, pero bien."], ["Très bien, merci !", "¡Muy bien, gracias!"]],
          keys: ['bien', 'super', 'fatigu', 'toi', 'merci', 'pas', 'mal', 'occupe'] },
        { q: "Qu'est-ce que tu fais de beau en ce moment ?", es: "¿Qué andas haciendo de bueno estos días?",
          opts: [["Je travaille beaucoup.", "Trabajo mucho."], ["J'apprends le français !", "¡Estoy aprendiendo francés!"], ["Je voyage un peu.", "Viajo un poco."]],
          keys: ['travaille', 'apprend', 'francais', 'voyage', 'etudie', 'rien', 'sport', 'lis', 'famille'] },
        { q: "Tu as des projets pour le week-end ?", es: "¿Tienes planes para el fin de semana?",
          opts: [["Je vais au cinéma.", "Voy al cine."], ["Pas encore, une idée ?", "Todavía no, ¿alguna idea?"], ["Je vois ma famille.", "Veo a mi familia."]],
          keys: ['cinema', 'famille', 'rien', 'idee', 'encore', 'repos', 'parc', 'plage', 'vais', 'amis'] },
        { q: "On devrait prendre un café ensemble cette semaine !", es: "¡Deberíamos tomar un café juntos esta semana!",
          opts: [["Avec plaisir !", "¡Con gusto!"], ["Bonne idée, samedi ?", "Buena idea, ¿el sábado?"], ["Oui, on s'appelle !", "¡Sí, nos llamamos!"]],
          keys: ['plaisir', 'oui', 'idee', 'samedi', 'dimanche', 'demain', 'appelle', 'volontiers', 'super'] }
      ],
      end: ["Génial ! Ça m'a fait plaisir de te voir. À bientôt !", "¡Genial! Me dio gusto verte. ¡Hasta pronto!"]
    }
  },

  'Alemán': {
    'Café': {
      steps: [
        { q: "Guten Tag! Willkommen im Kaffeehaus. Was darf ich Ihnen bringen?", es: "¡Buenos días! Bienvenido a la cafetería. ¿Qué le traigo?",
          opts: [["Einen Kaffee, bitte.", "Un café, por favor."], ["Einen Cappuccino und ein Stück Kuchen.", "Un capuchino y un pedazo de pastel."], ["Was empfehlen Sie?", "¿Qué me recomienda?"]],
          keys: ['kaffee', 'cappuccino', 'tee', 'kuchen', 'wasser', 'bitte', 'empfehlen', 'mochte', 'hatte', 'latte'] },
        { q: "Gerne! Zum Hiertrinken oder zum Mitnehmen?", es: "¡Con gusto! ¿Para tomar aquí o para llevar?",
          opts: [["Zum Hiertrinken, bitte.", "Para tomar aquí, por favor."], ["Zum Mitnehmen, bitte.", "Para llevar, por favor."], ["Hier, danke.", "Aquí, gracias."]],
          keys: ['hier', 'mitnehmen', 'trinken', 'danke'] },
        { q: "Möchten Sie sonst noch etwas?", es: "¿Desea algo más?",
          opts: [["Nein, danke. Das ist alles.", "No, gracias. Es todo."], ["Ja, ein Glas Wasser, bitte.", "Sí, un vaso de agua, por favor."], ["Ein Croissant, bitte.", "Un croissant, por favor."]],
          keys: ['nein', 'ja', 'alles', 'wasser', 'croissant', 'danke', 'kuchen'] },
        { q: "Das macht vier Euro fünfzig. Zahlen Sie bar oder mit Karte?", es: "Son cuatro euros con cincuenta. ¿Paga en efectivo o con tarjeta?",
          opts: [["Mit Karte, bitte.", "Con tarjeta, por favor."], ["Bar, bitte.", "En efectivo, por favor."], ["Kann ich mit dem Handy zahlen?", "¿Puedo pagar con el celular?"]],
          keys: ['karte', 'bar', 'zahlen', 'handy', 'bitte'] }
      ],
      end: ["Bitte schön! Einen schönen Tag noch!", "¡Aquí tiene! ¡Que tenga un lindo día!"]
    },
    'Aeropuerto': {
      steps: [
        { q: "Guten Tag. Ihren Reisepass und Ihre Bordkarte, bitte.", es: "Buenos días. Su pasaporte y su pase de abordar, por favor.",
          opts: [["Hier, bitte.", "Aquí tiene."], ["Hier ist mein Reisepass.", "Aquí está mi pasaporte."], ["Einen Moment, bitte.", "Un momento, por favor."]],
          keys: ['hier', 'bitte', 'reisepass', 'pass', 'moment', 'ja', 'bordkarte'] },
        { q: "Was ist der Zweck Ihrer Reise?", es: "¿Cuál es el propósito de su viaje?",
          opts: [["Ich mache Urlaub.", "Estoy de vacaciones."], ["Ich bin geschäftlich hier.", "Estoy aquí por negocios."], ["Ich besuche meine Familie.", "Visito a mi familia."]],
          keys: ['urlaub', 'geschaft', 'arbeit', 'familie', 'besuch', 'tourist', 'studium', 'reise'] },
        { q: "Wie lange bleiben Sie in Deutschland?", es: "¿Cuánto tiempo se queda en Alemania?",
          opts: [["Zwei Wochen.", "Dos semanas."], ["Zehn Tage.", "Diez días."], ["Ungefähr einen Monat.", "Más o menos un mes."]],
          keys: ['woche', 'tag', 'monat', 'jahr', 'zwei', 'drei', 'zehn', 'ungefahr', 'bleibe'] },
        { q: "Wo werden Sie übernachten?", es: "¿Dónde se va a hospedar?",
          opts: [["In einem Hotel in Berlin.", "En un hotel en Berlín."], ["Bei meiner Familie.", "Donde mi familia."], ["In einer Ferienwohnung.", "En un apartamento vacacional."]],
          keys: ['hotel', 'familie', 'wohnung', 'freund', 'berlin', 'bei'] }
      ],
      end: ["Danke, alles in Ordnung. Willkommen in Deutschland!", "Gracias, todo en orden. ¡Bienvenido a Alemania!"]
    },
    'Entrevista': {
      steps: [
        { q: "Guten Tag. Schön, dass Sie da sind. Erzählen Sie etwas über sich.", es: "Buenos días. Qué bueno que vino. Cuénteme algo sobre usted.",
          opts: [["Ich heiße Ana und bin Designerin.", "Me llamo Ana y soy diseñadora."], ["Ich habe fünf Jahre Erfahrung.", "Tengo cinco años de experiencia."], ["Ich studiere Wirtschaft.", "Estudio economía."]],
          keys: ['heisse', 'bin', 'erfahrung', 'arbeite', 'studiere', 'jahre', 'komme', 'name'] },
        { q: "Warum möchten Sie bei uns arbeiten?", es: "¿Por qué quiere trabajar con nosotros?",
          opts: [["Weil ich Ihre Firma sehr schätze.", "Porque aprecio mucho su empresa."], ["Ich möchte hier lernen und wachsen.", "Quiero aprender y crecer aquí."], ["Meine Erfahrung passt gut zur Stelle.", "Mi experiencia encaja bien con el puesto."]],
          keys: ['weil', 'firma', 'unternehmen', 'lernen', 'wachsen', 'team', 'passt', 'stelle', 'mochte'] },
        { q: "Was sind Ihre größten Stärken?", es: "¿Cuáles son sus mayores fortalezas?",
          opts: [["Ich bin sehr zuverlässig.", "Soy muy confiable."], ["Ich lerne schnell.", "Aprendo rápido."], ["Ich arbeite gern im Team.", "Me gusta trabajar en equipo."]],
          keys: ['zuverlassig', 'lerne', 'schnell', 'team', 'kreativ', 'organisiert', 'geduldig', 'starke'] },
        { q: "Haben Sie noch Fragen an uns?", es: "¿Tiene alguna pregunta para nosotros?",
          opts: [["Wie sieht ein typischer Tag aus?", "¿Cómo es un día típico?"], ["Wann bekomme ich eine Antwort?", "¿Cuándo recibo una respuesta?"], ["Nein, danke. Alles ist klar.", "No, gracias. Todo está claro."]],
          keys: ['wie', 'wann', 'tag', 'antwort', 'nein', 'ja', 'danke', 'klar', 'gehalt'] }
      ],
      end: ["Vielen Dank für Ihre Zeit. Wir melden uns bald!", "Muchas gracias por su tiempo. ¡Pronto nos comunicamos!"]
    },
    'Hotel': {
      steps: [
        { q: "Guten Abend! Herzlich willkommen. Haben Sie eine Reservierung?", es: "¡Buenas noches! Bienvenido. ¿Tiene una reserva?",
          opts: [["Ja, auf den Namen García.", "Sí, a nombre de García."], ["Ja, ich habe reserviert.", "Sí, hice una reserva."], ["Nein, haben Sie ein Zimmer frei?", "No, ¿tienen una habitación libre?"]],
          keys: ['ja', 'nein', 'reserv', 'name', 'zimmer', 'frei'] },
        { q: "Darf ich kurz Ihren Ausweis sehen?", es: "¿Puedo ver un momento su documento?",
          opts: [["Hier, bitte.", "Aquí tiene."], ["Hier ist mein Reisepass.", "Aquí está mi pasaporte."], ["Natürlich, einen Moment.", "Claro, un momento."]],
          keys: ['hier', 'bitte', 'ausweis', 'reisepass', 'naturlich', 'moment', 'ja'] },
        { q: "Möchten Sie ein Zimmer mit Blick auf die Stadt oder auf den Garten?", es: "¿Quiere una habitación con vista a la ciudad o al jardín?",
          opts: [["Mit Blick auf die Stadt, bitte.", "Con vista a la ciudad, por favor."], ["Auf den Garten, bitte.", "Al jardín, por favor."], ["Das ruhigere, bitte.", "La más tranquila, por favor."]],
          keys: ['stadt', 'garten', 'ruhig', 'egal', 'blick'] },
        { q: "Frühstück gibt es von sieben bis zehn Uhr. Brauchen Sie noch etwas?", es: "El desayuno es de siete a diez. ¿Necesita algo más?",
          opts: [["Wie ist das WLAN-Passwort?", "¿Cuál es la clave del wifi?"], ["Nein, danke. Das ist alles.", "No, gracias. Es todo."], ["Kann ich später auschecken?", "¿Puedo salir más tarde?"]],
          keys: ['wlan', 'passwort', 'nein', 'danke', 'alles', 'spater', 'taxi', 'ja'] }
      ],
      end: ["Ihr Zimmer ist die 304. Einen angenehmen Aufenthalt!", "Su habitación es la 304. ¡Que tenga una agradable estadía!"]
    },
    'amigo': {
      steps: [
        { q: "Hallo! Lange nicht gesehen! Wie geht's dir?", es: "¡Hola! ¡Cuánto tiempo! ¿Cómo estás?",
          opts: [["Mir geht's super, und dir?", "Súper bien, ¿y tú?"], ["Ganz gut, danke!", "¡Bastante bien, gracias!"], ["Ein bisschen müde, aber gut.", "Un poco cansado, pero bien."]],
          keys: ['gut', 'super', 'mude', 'dir', 'danke', 'geht', 'schlecht'] },
        { q: "Was machst du so in letzter Zeit?", es: "¿Qué has estado haciendo últimamente?",
          opts: [["Ich arbeite viel.", "Trabajo mucho."], ["Ich lerne Deutsch!", "¡Estoy aprendiendo alemán!"], ["Ich reise ein bisschen.", "Viajo un poco."]],
          keys: ['arbeite', 'lerne', 'deutsch', 'reise', 'studiere', 'nichts', 'sport', 'familie'] },
        { q: "Hast du am Wochenende schon etwas vor?", es: "¿Ya tienes planes para el fin de semana?",
          opts: [["Ich gehe ins Kino.", "Voy al cine."], ["Noch nicht. Hast du eine Idee?", "Todavía no. ¿Tienes alguna idea?"], ["Ich besuche meine Familie.", "Visito a mi familia."]],
          keys: ['kino', 'familie', 'nichts', 'idee', 'noch', 'park', 'freunde', 'gehe', 'besuche'] },
        { q: "Lass uns bald mal einen Kaffee trinken!", es: "¡Tomémonos un café pronto!",
          opts: [["Sehr gerne!", "¡Con mucho gusto!"], ["Gute Idee, am Samstag?", "Buena idea, ¿el sábado?"], ["Ja, wir schreiben uns!", "¡Sí, nos escribimos!"]],
          keys: ['gerne', 'ja', 'idee', 'samstag', 'sonntag', 'morgen', 'schreiben', 'super', 'klar'] }
      ],
      end: ["Super! Schön, dich zu sehen. Bis bald!", "¡Genial! Qué bueno verte. ¡Hasta pronto!"]
    }
  },

  'Italiano': {
    'Café': {
      steps: [
        { q: "Ciao! Benvenuto al nostro caffè. Cosa ti preparo oggi?", es: "¡Hola! Bienvenido a nuestro café. ¿Qué te preparo hoy?",
          opts: [["Un cappuccino, per favore.", "Un capuchino, por favor."], ["Un caffè e un cornetto.", "Un café y un croissant."], ["Cosa mi consigli?", "¿Qué me recomiendas?"]],
          keys: ['caffe', 'cappuccino', 'cornetto', 'te', 'acqua', 'succo', 'consigli', 'vorrei', 'prendo', 'favore', 'espresso'] },
        { q: "Ottima scelta! Lo prendi qui o da portare via?", es: "¡Excelente elección! ¿Lo tomas aquí o para llevar?",
          opts: [["Qui, grazie.", "Aquí, gracias."], ["Da portare via, per favore.", "Para llevar, por favor."], ["Al banco, grazie.", "En la barra, gracias."]],
          keys: ['qui', 'portare', 'via', 'banco', 'tavolo', 'grazie'] },
        { q: "Vuoi qualcos'altro?", es: "¿Quieres algo más?",
          opts: [["No, grazie. È tutto.", "No, gracias. Es todo."], ["Sì, un bicchiere d'acqua.", "Sí, un vaso de agua."], ["Anche un cornetto, per favore.", "También un croissant, por favor."]],
          keys: ['grazie', 'tutto', 'acqua', 'anche', 'cornetto', 'dolce'] },
        { q: "Sono quattro euro. Paghi con carta o contanti?", es: "Son cuatro euros. ¿Pagas con tarjeta o en efectivo?",
          opts: [["Con la carta, grazie.", "Con tarjeta, gracias."], ["In contanti.", "En efectivo."], ["Posso pagare con il telefono?", "¿Puedo pagar con el celular?"]],
          keys: ['carta', 'contanti', 'pagare', 'telefono', 'ecco'] }
      ],
      end: ["Ecco a te! Buona giornata!", "¡Aquí tienes! ¡Buen día!"]
    },
    'Aeropuerto': {
      steps: [
        { q: "Buongiorno. Posso vedere il suo passaporto e la carta d'imbarco?", es: "Buenos días. ¿Puedo ver su pasaporte y su pase de abordar?",
          opts: [["Ecco il mio passaporto.", "Aquí está mi pasaporte."], ["Certo, ecco a lei.", "Claro, aquí tiene."], ["Sì, un attimo.", "Sí, un momento."]],
          keys: ['ecco', 'passaporto', 'certo', 'attimo', 'carta'] },
        { q: "Qual è il motivo del suo viaggio?", es: "¿Cuál es el motivo de su viaje?",
          opts: [["Sono qui in vacanza.", "Estoy aquí de vacaciones."], ["Sono qui per lavoro.", "Estoy aquí por trabajo."], ["Vengo a trovare la mia famiglia.", "Vengo a visitar a mi familia."]],
          keys: ['vacanza', 'turismo', 'lavoro', 'famiglia', 'trovare', 'studio', 'viaggio'] },
        { q: "Per quanto tempo si ferma?", es: "¿Por cuánto tiempo se queda?",
          opts: [["Due settimane.", "Dos semanas."], ["Dieci giorni.", "Diez días."], ["Circa un mese.", "Más o menos un mes."]],
          keys: ['giorn', 'settiman', 'mese', 'anno', 'due', 'tre', 'dieci', 'circa', 'fermo'] },
        { q: "Dove alloggerà?", es: "¿Dónde se va a hospedar?",
          opts: [["In un hotel a Roma.", "En un hotel en Roma."], ["Da mia famiglia.", "Con mi familia."], ["In un appartamento in affitto.", "En un apartamento alquilado."]],
          keys: ['hotel', 'famiglia', 'appartamento', 'amic', 'roma', 'affitto'] }
      ],
      end: ["Grazie, è tutto in regola. Buon soggiorno in Italia!", "Gracias, todo está en regla. ¡Buena estadía en Italia!"]
    },
    'Entrevista': {
      steps: [
        { q: "Buongiorno e benvenuto. Ci racconti qualcosa di lei.", es: "Buenos días y bienvenido. Cuéntenos algo de usted.",
          opts: [["Mi chiamo Ana e sono designer.", "Me llamo Ana y soy diseñadora."], ["Ho cinque anni di esperienza.", "Tengo cinco años de experiencia."], ["Sono una studentessa di economia.", "Soy estudiante de economía."]],
          keys: ['chiamo', 'sono', 'esperienza', 'lavoro', 'studi', 'anni', 'designer'] },
        { q: "Perché vuole lavorare con noi?", es: "¿Por qué quiere trabajar con nosotros?",
          opts: [["Ammiro molto la vostra azienda.", "Admiro mucho su empresa."], ["Voglio imparare e crescere.", "Quiero aprender y crecer."], ["Il mio profilo è adatto al ruolo.", "Mi perfil es adecuado para el puesto."]],
          keys: ['perche', 'azienda', 'imparare', 'crescere', 'squadra', 'profilo', 'ruolo', 'voglio', 'ammiro'] },
        { q: "Qual è il suo punto di forza?", es: "¿Cuál es su punto fuerte?",
          opts: [["Sono molto organizzata.", "Soy muy organizada."], ["Imparo in fretta.", "Aprendo rápido."], ["Lavoro bene in squadra.", "Trabajo bien en equipo."]],
          keys: ['organizz', 'imparo', 'fretta', 'squadra', 'creativ', 'precis', 'pazien', 'responsabil'] },
        { q: "Ha qualche domanda per noi?", es: "¿Tiene alguna pregunta para nosotros?",
          opts: [["Com'è una giornata tipo?", "¿Cómo es un día típico?"], ["Quando avrò una risposta?", "¿Cuándo tendré una respuesta?"], ["No, grazie. È tutto chiaro.", "No, gracias. Todo está claro."]],
          keys: ['come', 'quando', 'giornata', 'risposta', 'grazie', 'chiaro', 'stipendio'] }
      ],
      end: ["Grazie mille per il suo tempo. La contatteremo presto!", "Mil gracias por su tiempo. ¡Lo contactaremos pronto!"]
    },
    'Hotel': {
      steps: [
        { q: "Buonasera e benvenuto! Ha una prenotazione a suo nome?", es: "¡Buenas noches y bienvenido! ¿Tiene una reserva a su nombre?",
          opts: [["Sì, ho una prenotazione a mio nome.", "Sí, tengo una reserva a mi nombre."], ["Sì, a nome García.", "Sí, a nombre de García."], ["No, avete una camera libera?", "No, ¿tienen una habitación libre?"]],
          keys: ['prenot', 'nome', 'camera', 'libera'] },
        { q: "Mi mostra un documento, per favore?", es: "¿Me muestra un documento, por favor?",
          opts: [["Ecco il mio passaporto.", "Aquí tiene mi pasaporte."], ["Certo, ecco a lei.", "Claro, aquí tiene."], ["Sì, un attimo.", "Sí, un momento."]],
          keys: ['ecco', 'passaporto', 'certo', 'attimo', 'documento', 'carta'] },
        { q: "Preferisce una camera con vista sulla città o sul giardino?", es: "¿Prefiere una habitación con vista a la ciudad o al jardín?",
          opts: [["Vista sulla città, per favore.", "Vista a la ciudad, por favor."], ["Sul giardino, grazie.", "Al jardín, gracias."], ["La più tranquilla, per favore.", "La más tranquila, por favor."]],
          keys: ['citta', 'giardino', 'tranquill', 'vista', 'indifferente'] },
        { q: "La colazione è dalle sette alle dieci. Le serve altro?", es: "El desayuno es de siete a diez. ¿Necesita algo más?",
          opts: [["Qual è la password del wifi?", "¿Cuál es la clave del wifi?"], ["No, grazie. È tutto.", "No, gracias. Es todo."], ["Posso lasciare la camera più tardi?", "¿Puedo dejar la habitación más tarde?"]],
          keys: ['wifi', 'password', 'grazie', 'tutto', 'tardi', 'taxi'] }
      ],
      end: ["La sua camera è la 304. Buon soggiorno!", "Su habitación es la 304. ¡Buena estadía!"]
    },
    'amigo': {
      steps: [
        { q: "Ciao! Che piacere rivederti! Come stai?", es: "¡Hola! ¡Qué gusto verte! ¿Cómo estás?",
          opts: [["Tutto bene, grazie! E tu?", "¡Todo bien, gracias! ¿Y tú?"], ["Benissimo!", "¡Muy bien!"], ["Un po' stanco, ma bene.", "Un poco cansado, pero bien."]],
          keys: ['bene', 'benissimo', 'stanc', 'grazie', 'male', 'cosi'] },
        { q: "Cosa fai di bello ultimamente?", es: "¿Qué haces de bueno últimamente?",
          opts: [["Lavoro tanto.", "Trabajo mucho."], ["Sto imparando l'italiano!", "¡Estoy aprendiendo italiano!"], ["Viaggio un po'.", "Viajo un poco."]],
          keys: ['lavoro', 'imparando', 'italiano', 'viaggio', 'studio', 'niente', 'sport', 'famiglia'] },
        { q: "Hai programmi per il fine settimana?", es: "¿Tienes planes para el fin de semana?",
          opts: [["Vado al cinema.", "Voy al cine."], ["Non ancora. Hai un'idea?", "Todavía no. ¿Tienes alguna idea?"], ["Vado a trovare la mia famiglia.", "Voy a visitar a mi familia."]],
          keys: ['cinema', 'famiglia', 'niente', 'idea', 'ancora', 'mare', 'amici', 'vado', 'parco'] },
        { q: "Dobbiamo vederci per una pizza!", es: "¡Tenemos que vernos para una pizza!",
          opts: [["Volentieri!", "¡Con gusto!"], ["Buona idea, sabato?", "Buena idea, ¿el sábado?"], ["Sì, ci sentiamo!", "¡Sí, hablamos!"]],
          keys: ['volentieri', 'idea', 'sabato', 'domenica', 'domani', 'sentiamo', 'certo', 'perfetto'] }
      ],
      end: ["Perfetto! Che bello rivederti. A presto!", "¡Perfecto! Qué lindo verte. ¡Hasta pronto!"]
    }
  },

  'Portugués': {
    'Café': {
      steps: [
        { q: "Olá! Bem-vindo ao nosso café. O que vai querer hoje?", es: "¡Hola! Bienvenido a nuestro café. ¿Qué va a querer hoy?",
          opts: [["Um café e um pastel de nata, por favor.", "Un café y un pastel de nata, por favor."], ["Um galão, por favor.", "Un café con leche, por favor."], ["O que você recomenda?", "¿Qué me recomienda?"]],
          keys: ['cafe', 'pastel', 'nata', 'galao', 'cha', 'agua', 'suco', 'sumo', 'recomenda', 'queria', 'quero', 'favor'] },
        { q: "Com certeza! É para tomar aqui ou para levar?", es: "¡Claro! ¿Es para tomar aquí o para llevar?",
          opts: [["Para tomar aqui, obrigado.", "Para tomar aquí, gracias."], ["Para levar, por favor.", "Para llevar, por favor."], ["Aqui mesmo.", "Aquí mismo."]],
          keys: ['aqui', 'levar', 'tomar', 'mesmo', 'obrigad'] },
        { q: "Deseja mais alguma coisa?", es: "¿Desea algo más?",
          opts: [["Não, obrigado. É só isso.", "No, gracias. Es todo."], ["Sim, uma água, por favor.", "Sí, un agua, por favor."], ["Mais um pastel de nata!", "¡Otro pastel de nata!"]],
          keys: ['nao', 'sim', 'agua', 'pastel', 'obrigad', 'isso', 'mais'] },
        { q: "São três euros e cinquenta. Paga com cartão ou dinheiro?", es: "Son tres euros con cincuenta. ¿Paga con tarjeta o en efectivo?",
          opts: [["Com cartão, por favor.", "Con tarjeta, por favor."], ["Em dinheiro.", "En efectivo."], ["Posso pagar com o celular?", "¿Puedo pagar con el celular?"]],
          keys: ['cartao', 'dinheiro', 'pagar', 'celular', 'telemovel', 'aqui'] }
      ],
      end: ["Aqui está! Tenha um ótimo dia!", "¡Aquí tiene! ¡Que tenga un excelente día!"]
    },
    'Aeropuerto': {
      steps: [
        { q: "Boa tarde. Pode mostrar o seu passaporte e o cartão de embarque?", es: "Buenas tardes. ¿Puede mostrar su pasaporte y su pase de abordar?",
          opts: [["Claro, aqui está.", "Claro, aquí está."], ["Aqui está o meu passaporte.", "Aquí está mi pasaporte."], ["Sim, um momento.", "Sí, un momento."]],
          keys: ['aqui', 'claro', 'passaporte', 'sim', 'momento', 'certeza'] },
        { q: "Qual é o motivo da sua viagem?", es: "¿Cuál es el motivo de su viaje?",
          opts: [["Venho de férias.", "Vengo de vacaciones."], ["Venho a trabalho.", "Vengo por trabajo."], ["Vou visitar a minha família.", "Voy a visitar a mi familia."]],
          keys: ['ferias', 'turismo', 'trabalho', 'familia', 'visitar', 'estudo', 'negocio', 'passear'] },
        { q: "Quanto tempo vai ficar?", es: "¿Cuánto tiempo se va a quedar?",
          opts: [["Duas semanas.", "Dos semanas."], ["Dez dias.", "Diez días."], ["Mais ou menos um mês.", "Más o menos un mes."]],
          keys: ['dia', 'semana', 'mes', 'ano', 'duas', 'dois', 'tres', 'dez', 'ficar'] },
        { q: "Onde vai se hospedar?", es: "¿Dónde se va a hospedar?",
          opts: [["Num hotel no centro.", "En un hotel en el centro."], ["Na casa da minha família.", "En la casa de mi familia."], ["Num apartamento alugado.", "En un apartamento alquilado."]],
          keys: ['hotel', 'casa', 'familia', 'apartamento', 'amig', 'centro', 'alugado'] }
      ],
      end: ["Obrigado, está tudo certo. Boa estadia!", "Gracias, todo está en orden. ¡Buena estadía!"]
    },
    'Entrevista': {
      steps: [
        { q: "Olá e bem-vindo. Pode falar um pouco sobre você?", es: "Hola y bienvenido. ¿Puede hablar un poco de usted?",
          opts: [["Meu nome é Ana e sou designer.", "Me llamo Ana y soy diseñadora."], ["Tenho cinco anos de experiência.", "Tengo cinco años de experiencia."], ["Sou estudante de administração.", "Soy estudiante de administración."]],
          keys: ['nome', 'sou', 'experiencia', 'trabalho', 'estud', 'anos', 'chamo'] },
        { q: "Por que você quer trabalhar conosco?", es: "¿Por qué quiere trabajar con nosotros?",
          opts: [["Admiro muito a empresa.", "Admiro mucho la empresa."], ["Quero aprender e crescer.", "Quiero aprender y crecer."], ["Meu perfil combina com a vaga.", "Mi perfil encaja con el puesto."]],
          keys: ['porque', 'empresa', 'aprender', 'crescer', 'equipe', 'perfil', 'vaga', 'quero', 'admiro'] },
        { q: "Qual é o seu maior ponto forte?", es: "¿Cuál es su mayor fortaleza?",
          opts: [["Sou muito organizada.", "Soy muy organizada."], ["Aprendo rápido.", "Aprendo rápido."], ["Trabalho bem em equipe.", "Trabajo bien en equipo."]],
          keys: ['organizad', 'aprendo', 'rapido', 'equipe', 'criativ', 'dedicad', 'pacien', 'responsav'] },
        { q: "Você tem alguma pergunta para nós?", es: "¿Tiene alguna pregunta para nosotros?",
          opts: [["Como é um dia típico?", "¿Cómo es un día típico?"], ["Quando terei uma resposta?", "¿Cuándo tendré una respuesta?"], ["Não, obrigado. Está tudo claro.", "No, gracias. Todo está claro."]],
          keys: ['como', 'quando', 'dia', 'resposta', 'nao', 'obrigad', 'claro', 'salario'] }
      ],
      end: ["Muito obrigado pelo seu tempo. Entraremos em contato em breve!", "Muchas gracias por su tiempo. ¡Lo contactaremos pronto!"]
    },
    'Hotel': {
      steps: [
        { q: "Boa noite e bem-vindo! Tem uma reserva conosco?", es: "¡Buenas noches y bienvenido! ¿Tiene una reserva con nosotros?",
          opts: [["Sim, tenho uma reserva no meu nome.", "Sí, tengo una reserva a mi nombre."], ["Sim, em nome de García.", "Sí, a nombre de García."], ["Não, tem um quarto livre?", "No, ¿tiene una habitación libre?"]],
          keys: ['sim', 'nao', 'reserva', 'nome', 'quarto', 'livre'] },
        { q: "Pode me mostrar um documento, por favor?", es: "¿Me puede mostrar un documento, por favor?",
          opts: [["Aqui está o meu passaporte.", "Aquí está mi pasaporte."], ["Claro, aqui está.", "Claro, aquí está."], ["Sim, um momento.", "Sí, un momento."]],
          keys: ['aqui', 'passaporte', 'claro', 'sim', 'momento', 'documento'] },
        { q: "Prefere um quarto com vista para a cidade ou para o jardim?", es: "¿Prefiere una habitación con vista a la ciudad o al jardín?",
          opts: [["Para a cidade, por favor.", "A la ciudad, por favor."], ["Para o jardim, obrigado.", "Al jardín, gracias."], ["O mais tranquilo, por favor.", "La más tranquila, por favor."]],
          keys: ['cidade', 'jardim', 'tranquil', 'vista', 'tanto'] },
        { q: "O café da manhã é das sete às dez. Precisa de mais alguma coisa?", es: "El desayuno es de siete a diez. ¿Necesita algo más?",
          opts: [["Qual é a senha do wi-fi?", "¿Cuál es la clave del wifi?"], ["Não, obrigado. É só isso.", "No, gracias. Es todo."], ["Posso sair mais tarde amanhã?", "¿Puedo salir más tarde mañana?"]],
          keys: ['wifi', 'senha', 'nao', 'obrigad', 'tarde', 'taxi', 'isso'] }
      ],
      end: ["O seu quarto é o 304. Boa estadia!", "Su habitación es la 304. ¡Buena estadía!"]
    },
    'amigo': {
      steps: [
        { q: "Olá! Há quanto tempo! Como você está?", es: "¡Hola! ¡Cuánto tiempo! ¿Cómo estás?",
          opts: [["Tudo ótimo, e você?", "Todo genial, ¿y tú?"], ["Bem, obrigado!", "¡Bien, gracias!"], ["Um pouco cansado, mas bem.", "Un poco cansado, pero bien."]],
          keys: ['bem', 'otimo', 'tudo', 'cansad', 'obrigad', 'voce', 'mal'] },
        { q: "O que você tem feito ultimamente?", es: "¿Qué has estado haciendo últimamente?",
          opts: [["Tenho trabalhado muito.", "He trabajado mucho."], ["Estou aprendendo português!", "¡Estoy aprendiendo portugués!"], ["Viajei para a praia.", "Viajé a la playa."]],
          keys: ['trabalh', 'aprend', 'portugues', 'viaj', 'praia', 'estud', 'nada', 'familia'] },
        { q: "Tem planos para o fim de semana?", es: "¿Tienes planes para el fin de semana?",
          opts: [["Vou ao cinema.", "Voy al cine."], ["Ainda não. Alguma ideia?", "Todavía no. ¿Alguna idea?"], ["Vou visitar a minha família.", "Voy a visitar a mi familia."]],
          keys: ['cinema', 'familia', 'nada', 'ideia', 'ainda', 'praia', 'amigos', 'vou', 'descansar'] },
        { q: "Vamos marcar um almoço juntos em breve!", es: "¡Organicemos un almuerzo juntos pronto!",
          opts: [["Claro, vamos sim!", "¡Claro que sí!"], ["Boa ideia, no sábado?", "Buena idea, ¿el sábado?"], ["Combinado!", "¡Hecho!"]],
          keys: ['claro', 'sim', 'ideia', 'sabado', 'domingo', 'amanha', 'combinado', 'vamos', 'otimo'] }
      ],
      end: ["Ótimo! Foi muito bom te ver. Até logo!", "¡Genial! Fue muy bueno verte. ¡Hasta luego!"]
    }
  },

  'Japonés': {
    'Café': {
      steps: [
        { q: "いらっしゃいませ！ご注文はお決まりですか？", es: "¡Bienvenido! ¿Ya sabe qué va a pedir?",
          opts: [["コーヒーをお願いします。", "Un café, por favor. (kōhī o onegaishimasu)"], ["カフェラテをください。", "Un café latte, por favor. (kafe rate o kudasai)"], ["おすすめは何ですか？", "¿Qué me recomienda? (osusume wa nan desu ka)"]],
          keys: ['コーヒー', 'ラテ', '紅茶', 'お茶', '水', 'ジュース', 'おすすめ', 'お願い', 'ください'] },
        { q: "サイズはどうなさいますか？", es: "¿De qué tamaño lo quiere?",
          opts: [["Mサイズでお願いします。", "Mediano, por favor. (emu saizu de onegaishimasu)"], ["小さいのでいいです。", "Pequeño está bien. (chiisai no de ii desu)"], ["大きいのをください。", "Uno grande, por favor. (ōkii no o kudasai)"]],
          keys: ['サイズ', 'M', 'S', 'L', '小さい', '大きい', '普通', 'お願い', 'ください'] },
        { q: "店内でお召し上がりですか、お持ち帰りですか？", es: "¿Para tomar aquí o para llevar?",
          opts: [["店内でお願いします。", "Para tomar aquí, por favor. (tennai de onegaishimasu)"], ["持ち帰りでお願いします。", "Para llevar, por favor. (mochikaeri de onegaishimasu)"], ["ここで飲みます。", "Me lo tomo aquí. (koko de nomimasu)"]],
          keys: ['店内', '持ち帰り', 'ここ', 'テイクアウト'] },
        { q: "お会計は五百円です。お支払いはどうなさいますか？", es: "Son quinientos yenes. ¿Cómo va a pagar?",
          opts: [["カードでお願いします。", "Con tarjeta, por favor. (kādo de onegaishimasu)"], ["現金で払います。", "Pago en efectivo. (genkin de haraimasu)"], ["スマホで払えますか？", "¿Puedo pagar con el celular? (sumaho de haraemasu ka)"]],
          keys: ['カード', '現金', 'スマホ', '払', 'はい'] }
      ],
      end: ["ありがとうございました！良い一日を！", "¡Muchas gracias! ¡Que tenga un buen día!"]
    },
    'Aeropuerto': {
      steps: [
        { q: "こんにちは。パスポートを見せていただけますか？", es: "Buenas tardes. ¿Me muestra su pasaporte?",
          opts: [["はい、どうぞ。", "Sí, aquí tiene. (hai, dōzo)"], ["これが私のパスポートです。", "Este es mi pasaporte. (kore ga watashi no pasupōto desu)"], ["少々お待ちください。", "Un momento, por favor. (shōshō omachi kudasai)"]],
          keys: ['はい', 'どうぞ', 'パスポート', '待'] },
        { q: "入国の目的は何ですか？", es: "¿Cuál es el motivo de su entrada al país?",
          opts: [["観光です。", "Turismo. (kankō desu)"], ["仕事です。", "Trabajo. (shigoto desu)"], ["家族に会いに来ました。", "Vine a ver a mi familia. (kazoku ni ai ni kimashita)"]],
          keys: ['観光', '仕事', '家族', '留学', '旅行', 'ビジネス', '友達'] },
        { q: "どのくらい滞在しますか？", es: "¿Cuánto tiempo se va a quedar?",
          opts: [["二週間です。", "Dos semanas. (ni-shūkan desu)"], ["十日間です。", "Diez días. (tōkakan desu)"], ["一か月ぐらいです。", "Más o menos un mes. (ikkagetsu gurai desu)"]],
          keys: ['週間', '日', '月', '年', 'ぐらい', '二', '三', '十'] },
        { q: "どこに泊まりますか？", es: "¿Dónde se va a hospedar?",
          opts: [["東京のホテルです。", "En un hotel de Tokio. (Tōkyō no hoteru desu)"], ["友達の家です。", "En casa de un amigo. (tomodachi no ie desu)"], ["アパートを借りています。", "Alquilé un apartamento. (apāto o karite imasu)"]],
          keys: ['ホテル', '家', 'アパート', '友達', '東京', '旅館'] }
      ],
      end: ["ありがとうございます。日本へようこそ！", "Gracias. ¡Bienvenido a Japón!"]
    },
    'Entrevista': {
      steps: [
        { q: "本日はありがとうございます。簡単に自己紹介をお願いします。", es: "Gracias por venir hoy. Preséntese brevemente, por favor.",
          opts: [["はじめまして、アナと申します。", "Mucho gusto, me llamo Ana. (hajimemashite, Ana to mōshimasu)"], ["デザイナーとして五年働いています。", "Trabajo hace cinco años como diseñadora. (dezainā to shite go-nen hataraite imasu)"], ["学生です。よろしくお願いします。", "Soy estudiante. Encantada. (gakusei desu. yoroshiku onegaishimasu)"]],
          keys: ['はじめまして', '申します', '名前', '学生', '働', '経験', 'よろしく', 'です'] },
        { q: "なぜ弊社で働きたいのですか？", es: "¿Por qué quiere trabajar en nuestra empresa?",
          opts: [["御社の理念に共感しました。", "Me identifico con la filosofía de su empresa. (onsha no rinen ni kyōkan shimashita)"], ["ここで成長したいです。", "Quiero crecer aquí. (koko de seichō shitai desu)"], ["私の経験を活かしたいです。", "Quiero aprovechar mi experiencia. (watashi no keiken o ikashitai desu)"]],
          keys: ['御社', '理念', '成長', '経験', '活か', 'したい', 'から', '興味'] },
        { q: "あなたの強みは何ですか？", es: "¿Cuál es su fortaleza?",
          opts: [["責任感が強いです。", "Soy muy responsable. (sekininkan ga tsuyoi desu)"], ["覚えるのが早いです。", "Aprendo rápido. (oboeru no ga hayai desu)"], ["チームワークが得意です。", "Soy buena en trabajo en equipo. (chīmuwāku ga tokui desu)"]],
          keys: ['責任', '早い', 'チーム', '得意', '強み', '真面目', 'コミュニケーション'] },
        { q: "何か質問はありますか？", es: "¿Tiene alguna pregunta?",
          opts: [["一日の流れを教えてください。", "Cuénteme cómo es un día típico. (ichinichi no nagare o oshiete kudasai)"], ["結果はいつ分かりますか？", "¿Cuándo sabré el resultado? (kekka wa itsu wakarimasu ka)"], ["いいえ、大丈夫です。", "No, está bien así. (iie, daijōbu desu)"]],
          keys: ['一日', 'いつ', '結果', 'いいえ', '大丈夫', '質問', '教えて'] }
      ],
      end: ["本日はありがとうございました。結果は後日ご連絡します。", "Muchas gracias por hoy. Le avisaremos el resultado más adelante."]
    },
    'Hotel': {
      steps: [
        { q: "いらっしゃいませ。ご予約はございますか？", es: "Bienvenido. ¿Tiene reserva?",
          opts: [["はい、予約しています。", "Sí, tengo reserva. (hai, yoyaku shite imasu)"], ["ガルシアの名前で予約しました。", "Reservé a nombre de García. (Garushia no namae de yoyaku shimashita)"], ["いいえ、空いている部屋はありますか？", "No, ¿tienen una habitación libre? (iie, aite iru heya wa arimasu ka)"]],
          keys: ['予約', 'はい', 'いいえ', '名前', '部屋'] },
        { q: "パスポートを拝見してもよろしいですか？", es: "¿Puedo ver su pasaporte?",
          opts: [["はい、どうぞ。", "Sí, aquí tiene. (hai, dōzo)"], ["パスポートはこちらです。", "Aquí está mi pasaporte. (pasupōto wa kochira desu)"], ["少々お待ちください。", "Un momento, por favor. (shōshō omachi kudasai)"]],
          keys: ['はい', 'どうぞ', 'パスポート', 'こちら', '待'] },
        { q: "禁煙のお部屋でよろしいですか？", es: "¿Le parece bien una habitación de no fumadores?",
          opts: [["はい、お願いします。", "Sí, por favor. (hai, onegaishimasu)"], ["静かな部屋がいいです。", "Prefiero una habitación tranquila. (shizuka na heya ga ii desu)"], ["大丈夫です。", "Está bien. (daijōbu desu)"]],
          keys: ['はい', 'お願い', '静か', '大丈夫', '禁煙', 'いい'] },
        { q: "朝食は七時から十時までです。他に何かございますか？", es: "El desayuno es de siete a diez. ¿Necesita algo más?",
          opts: [["Wi-Fiのパスワードは何ですか？", "¿Cuál es la clave del wifi? (waifai no pasuwādo wa nan desu ka)"], ["いいえ、ありがとうございます。", "No, muchas gracias. (iie, arigatō gozaimasu)"], ["タクシーを呼んでもらえますか？", "¿Me puede llamar un taxi? (takushī o yonde moraemasu ka)"]],
          keys: ['Wi-Fi', 'パスワード', 'いいえ', 'ありがとう', 'タクシー', 'チェックアウト'] }
      ],
      end: ["お部屋は302号室です。ごゆっくりどうぞ。", "Su habitación es la 302. Que descanse."]
    },
    'amigo': {
      steps: [
        { q: "久しぶり！元気だった？", es: "¡Cuánto tiempo! ¿Cómo has estado?",
          opts: [["うん、元気だよ！そっちは？", "¡Sí, bien! ¿Y tú? (un, genki da yo! sotchi wa?)"], ["ちょっと忙しかったけど、元気！", "Un poco ocupado, ¡pero bien! (chotto isogashikatta kedo, genki!)"], ["まあまあかな。", "Más o menos. (māmā kana)"]],
          keys: ['元気', '忙し', 'まあまあ', 'そっち', 'うん', '疲れ'] },
        { q: "最近、何してるの？", es: "¿Qué andas haciendo últimamente?",
          opts: [["仕事が忙しいよ。", "El trabajo está pesado. (shigoto ga isogashii yo)"], ["日本語を勉強してる！", "¡Estoy estudiando japonés! (nihongo o benkyō shiteru)"], ["旅行に行ってきたよ。", "Me fui de viaje. (ryokō ni itte kita yo)"]],
          keys: ['仕事', '日本語', '勉強', '旅行', '特に', '何も', '家族'] },
        { q: "週末は何か予定ある？", es: "¿Tienes algún plan para el fin de semana?",
          opts: [["映画を見に行くよ。", "Voy a ver una película. (eiga o mi ni iku yo)"], ["まだないよ。何かある？", "Todavía no. ¿Tienes algo? (mada nai yo. nanika aru?)"], ["家族に会うよ。", "Voy a ver a mi familia. (kazoku ni au yo)"]],
          keys: ['映画', 'まだ', '家族', '特に', '買い物', '行く', 'ない'] },
        { q: "今度一緒にご飯行こうよ！", es: "¡Vamos a comer juntos un día de estos!",
          opts: [["いいね！行こう！", "¡Buena idea! ¡Vamos! (ii ne! ikō!)"], ["土曜日はどう？", "¿Qué tal el sábado? (doyōbi wa dō?)"], ["ぜひ！", "¡Claro que sí! (zehi!)"]],
          keys: ['いいね', '行こう', '土曜', '日曜', 'ぜひ', 'うん', 'もちろん'] }
      ],
      end: ["よかった！会えて嬉しかったよ。またね！", "¡Qué bien! Me alegró verte. ¡Nos vemos!"]
    }
  }
};
