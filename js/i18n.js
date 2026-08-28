/* Bilingual copy for Nido Águila Riverside.
   Every visible string lives here, keyed by section, with an "en" and "es"
   value. The toggle in the nav swaps languages in place and remembers the
   choice in localStorage. Default is English. */

const translations = {
  en: {
    nav: {
      about: "About",
      mission: "Mission",
      development: "Development",
      competition: "Competition",
      coaching: "Coaching",
      community: "Community",
      locations: "Locations",
      join: "Join Nido Águila Riverside"
    },

    hero: {
      eyebrow: "Youth Soccer Academy · Riverside, CA",
      title: "Train with purpose. Compete with pride. Grow with a vision.",
      body: "Nido Águila Riverside is a youth soccer academy committed to developing players through high-quality training, competitive experiences, and meaningful opportunities for growth and player projection — while building the values and character that prepare young people for life beyond the field.",
      cta: "Join Nido Águila Riverside"
    },

    about: {
      eyebrow: "Who We Are",
      title: "A local academy with a bigger vision.",
      p1: "Nido Águila Riverside is a youth development academy built around the identity, values, and football tradition of Club América.",
      p2: "We provide young players with a competitive and professional environment where development comes first. Through purposeful training, high-level competition, and consistent guidance, we help players develop the tools they need to continue growing both on and off the field.",
      p3: "As part of the Nido Águila network, our players become part of a football community connected by a shared commitment to development, discipline, teamwork, and excellence."
    },

    mission: {
      eyebrow: "Our Mission",
      title: "Develop the player. Build the person. Prepare the future.",
      p1: "Our mission is to provide every player with the training, experiences, and guidance needed to reach their potential.",
      p2: "We develop technical ability, tactical understanding, physical qualities, decision-making, confidence, discipline, and character. Every session is designed with purpose, challenging players to learn, compete, and improve.",
      p3: "Beyond soccer, we use the game as a tool to develop responsible, respectful, disciplined, and committed young people who can make a positive impact on their families, teams, schools, and communities."
    },

    standard: {
      eyebrow: "The Nido Standard",
      title: "How we train. How we compete. How we grow.",
      items: [
        {
          title: "Development",
          body: "Purposeful, age-appropriate training develops strong fundamentals, game intelligence, decision-making, and a deeper understanding of the game."
        },
        {
          title: "Discipline",
          body: "Preparation, consistency, responsibility, and commitment turn potential into habits that help players succeed on and off the field."
        },
        {
          title: "Competition",
          body: "Players are challenged to compete, embrace adversity, learn from every experience, and continually raise their level."
        },
        {
          title: "Opportunity",
          body: "We create meaningful opportunities for players to challenge themselves, participate in important competitions, gain valuable experiences, and pursue their next step in development."
        },
        {
          title: "Character",
          body: "Respect, humility, teamwork, accountability, and perseverance are essential parts of becoming not only a better player, but a better person."
        },
        {
          title: "Community",
          body: "Players, families, and coaches grow together while representing Nido Águila Riverside and Club América with pride."
        }
      ]
    },

    development: {
      eyebrow: "Player Development",
      title: "Development that goes beyond the game.",
      p1: "Our training environment focuses on the technical, tactical, physical, cognitive, and emotional development of each player. We want players to understand the game, make decisions with confidence, and develop the ability to adapt to different situations on the field.",
      p2: "Every player has a different path. Our responsibility is to provide the environment, guidance, and challenges that allow each one to continue moving forward."
    },

    competition: {
      eyebrow: "Competition & Player Projection",
      title: "Compete at a higher level. Dream bigger.",
      p1: "At Nido Águila Riverside, we believe that meaningful competition is an essential part of player development. Our teams have opportunities to participate in competitive tournaments, special events, and high-level experiences that challenge players to perform in different environments.",
      p2: "Through these experiences, players can develop confidence, resilience, adaptability, and a stronger understanding of what it means to compete.",
      p3: "For players who demonstrate the commitment and potential to pursue the next level, these experiences can also provide opportunities for exposure, scouting, and continued development within the broader Nido Águila and Club América network.",
      callout: "We don't promise a destination. We build the path to get there."
    },

    coaching: {
      eyebrow: "Player-Centered Coaching",
      title: "Guidance that helps every player move forward.",
      p1: "Our coaches are committed to creating a challenging, supportive, and positive environment where players can develop with purpose.",
      p2: "Coaching at Nido Águila Riverside goes beyond teaching soccer. Our coaches guide players through the demands of training and competition while helping them develop confidence, discipline, responsibility, and respect."
    },

    coachingStandard: {
      eyebrow: "Our Coaching Standard",
      title: "How our coaches help players move forward.",
      items: [
        {
          title: "Technical Development",
          body: "Sessions emphasize ball mastery, technique, movement, decision-making, and the ability to apply skills in real game situations."
        },
        {
          title: "Game Intelligence",
          body: "Players are encouraged to understand the game, recognize situations, solve problems, and make effective decisions under pressure."
        },
        {
          title: "Character & Confidence",
          body: "Coaches set high standards while providing encouragement, constructive feedback, and the support players need to grow."
        },
        {
          title: "Age-Appropriate Development",
          body: "Training is adapted to each stage of development, creating appropriate challenges while supporting long-term player growth."
        },
        {
          title: "Team Culture",
          body: "We build an environment based on respect, communication, teamwork, accountability, and a shared commitment to improvement."
        }
      ]
    },

    community: {
      eyebrow: "Community",
      title: "More than a team. A football community.",
      p1: "Nido Águila Riverside is a community built around players, families, coaches, and a shared passion for the game. Together, we are building a football community in Riverside that develops players, creates opportunities, and makes a positive impact beyond the field."
    },

    locations: {
      eyebrow: "Training Locations",
      title: "Find your field.",
      place: "Nichols Park, Riverside, California",
      daysLabel: "Training Days",
      days: "Tuesday and Thursday",
      timeLabel: "Training Time",
      time: "6:00–8:00 PM",
      cta: "Get Directions",
      note: "Schedules and field information will be updated as academy assignments are confirmed."
    },

    vision: {
      eyebrow: "Our Vision",
      title: "Building the next generation.",
      p1: "Our vision is to build a leading youth development academy in Riverside and the Inland Empire — an environment where young players can train, compete, learn, and dream bigger.",
      closing: "We are building the people and players of tomorrow."
    },

    join: {
      eyebrow: "Get Started",
      title: "Your journey starts here. Ready to take the next step?",
      body: "Join a football community committed to helping young players train with purpose, compete with confidence, develop their potential, and grow into people of character.",
      cta: "Join Nido Águila Riverside"
    },

    footer: {
      tagline: "A youth soccer academy in Riverside, developing players and people through the identity and values of Club América.",
      contact: "Contact us",
      nav: "Explore",
      follow: "Follow",
      rights: "All rights reserved.",
      network: "Part of the Nido Águila network."
    },

    carousel: {
      prev: "Previous slide",
      next: "Next slide",
      goto: "Go to slide"
    },
    menu: {
      open: "Open menu",
      close: "Close menu"
    },
    backToTop: "Back to top"
  },

  es: {
    nav: {
      about: "Nosotros",
      mission: "Misión",
      development: "Desarrollo",
      competition: "Competencia",
      coaching: "Coaching",
      community: "Comunidad",
      locations: "Sedes",
      join: "Únete a Nido Águila Riverside"
    },

    hero: {
      eyebrow: "Academia de Fútbol Juvenil · Riverside, CA",
      title: "Entrena con propósito. Compite con orgullo. Crece con una visión.",
      body: "Nido Águila Riverside es una academia de fútbol juvenil comprometida con el desarrollo de jugadores a través de entrenamiento de alta calidad, experiencias competitivas y oportunidades significativas de crecimiento y proyección deportiva — mientras construye los valores y el carácter que preparan a los jóvenes para la vida más allá de la cancha.",
      cta: "Únete a Nido Águila Riverside"
    },

    about: {
      eyebrow: "Quiénes Somos",
      title: "Una academia local con una visión más grande.",
      p1: "Nido Águila Riverside es una academia de desarrollo juvenil construida alrededor de la identidad, los valores y la tradición futbolística del Club América.",
      p2: "Ofrecemos a los jóvenes jugadores un ambiente competitivo y profesional donde el desarrollo es lo primero. A través de entrenamiento con propósito, competencia de alto nivel y guía constante, ayudamos a los jugadores a desarrollar las herramientas que necesitan para seguir creciendo dentro y fuera de la cancha.",
      p3: "Como parte de la red Nido Águila, nuestros jugadores forman parte de una comunidad futbolística conectada por un compromiso compartido con el desarrollo, la disciplina, el trabajo en equipo y la excelencia."
    },

    mission: {
      eyebrow: "Nuestra Misión",
      title: "Desarrollar al jugador. Formar a la persona. Preparar el futuro.",
      p1: "Nuestra misión es brindar a cada jugador el entrenamiento, las experiencias y la guía necesarios para alcanzar su potencial.",
      p2: "Desarrollamos la capacidad técnica, la comprensión táctica, las cualidades físicas, la toma de decisiones, la confianza, la disciplina y el carácter. Cada sesión está diseñada con un propósito, retando a los jugadores a aprender, competir y mejorar.",
      p3: "Más allá del fútbol, usamos el juego como herramienta para formar jóvenes responsables, respetuosos, disciplinados y comprometidos que puedan generar un impacto positivo en sus familias, equipos, escuelas y comunidades."
    },

    standard: {
      eyebrow: "El Estándar Nido",
      title: "Cómo entrenamos. Cómo competimos. Cómo crecemos.",
      items: [
        {
          title: "Desarrollo",
          body: "Un entrenamiento con propósito y apropiado para la edad desarrolla fundamentos sólidos, inteligencia de juego, toma de decisiones y una comprensión más profunda del juego."
        },
        {
          title: "Disciplina",
          body: "La preparación, la constancia, la responsabilidad y el compromiso convierten el potencial en hábitos que ayudan a los jugadores a tener éxito dentro y fuera de la cancha."
        },
        {
          title: "Competencia",
          body: "Se reta a los jugadores a competir, enfrentar la adversidad, aprender de cada experiencia y elevar continuamente su nivel."
        },
        {
          title: "Oportunidad",
          body: "Creamos oportunidades significativas para que los jugadores se desafíen a sí mismos, participen en competencias importantes, ganen experiencias valiosas y busquen su siguiente paso en el desarrollo."
        },
        {
          title: "Carácter",
          body: "El respeto, la humildad, el trabajo en equipo, la responsabilidad y la perseverancia son partes esenciales para convertirse no solo en un mejor jugador, sino en una mejor persona."
        },
        {
          title: "Comunidad",
          body: "Jugadores, familias y entrenadores crecen juntos mientras representan con orgullo a Nido Águila Riverside y al Club América."
        }
      ]
    },

    development: {
      eyebrow: "Desarrollo del Jugador",
      title: "Un desarrollo que va más allá del juego.",
      p1: "Nuestro ambiente de entrenamiento se enfoca en el desarrollo técnico, táctico, físico, cognitivo y emocional de cada jugador. Queremos que los jugadores entiendan el juego, tomen decisiones con confianza y desarrollen la capacidad de adaptarse a diferentes situaciones en la cancha.",
      p2: "Cada jugador tiene un camino diferente. Nuestra responsabilidad es brindar el ambiente, la guía y los desafíos que permitan a cada uno seguir avanzando."
    },

    competition: {
      eyebrow: "Competencia y Proyección del Jugador",
      title: "Compite a un nivel más alto. Sueña más grande.",
      p1: "En Nido Águila Riverside creemos que la competencia significativa es una parte esencial del desarrollo del jugador. Nuestros equipos tienen oportunidades de participar en torneos competitivos, eventos especiales y experiencias de alto nivel que retan a los jugadores a rendir en diferentes ambientes.",
      p2: "A través de estas experiencias, los jugadores pueden desarrollar confianza, resiliencia, adaptabilidad y una comprensión más sólida de lo que significa competir.",
      p3: "Para los jugadores que demuestran el compromiso y el potencial para buscar el siguiente nivel, estas experiencias también pueden ofrecer oportunidades de exposición, observación (scouting) y desarrollo continuo dentro de la red más amplia de Nido Águila y Club América.",
      callout: "No prometemos un destino. Construimos el camino para llegar ahí."
    },

    coaching: {
      eyebrow: "Coaching Centrado en el Jugador",
      title: "Una guía que ayuda a cada jugador a avanzar.",
      p1: "Nuestros entrenadores están comprometidos a crear un ambiente desafiante, solidario y positivo donde los jugadores puedan desarrollarse con propósito.",
      p2: "El coaching en Nido Águila Riverside va más allá de enseñar fútbol. Nuestros entrenadores guían a los jugadores a través de las exigencias del entrenamiento y la competencia, mientras los ayudan a desarrollar confianza, disciplina, responsabilidad y respeto."
    },

    coachingStandard: {
      eyebrow: "Nuestro Estándar de Coaching",
      title: "Cómo nuestros entrenadores ayudan a los jugadores a avanzar.",
      items: [
        {
          title: "Desarrollo Técnico",
          body: "Las sesiones enfatizan el dominio del balón, la técnica, el movimiento, la toma de decisiones y la capacidad de aplicar habilidades en situaciones reales de juego."
        },
        {
          title: "Inteligencia de Juego",
          body: "Se anima a los jugadores a entender el juego, reconocer situaciones, resolver problemas y tomar decisiones efectivas bajo presión."
        },
        {
          title: "Carácter y Confianza",
          body: "Los entrenadores establecen estándares altos mientras brindan aliento, retroalimentación constructiva y el apoyo que los jugadores necesitan para crecer."
        },
        {
          title: "Desarrollo Apropiado para la Edad",
          body: "El entrenamiento se adapta a cada etapa del desarrollo, creando desafíos apropiados mientras apoya el crecimiento del jugador a largo plazo."
        },
        {
          title: "Cultura de Equipo",
          body: "Construimos un ambiente basado en el respeto, la comunicación, el trabajo en equipo, la responsabilidad y un compromiso compartido con la mejora."
        }
      ]
    },

    community: {
      eyebrow: "Comunidad",
      title: "Más que un equipo. Una comunidad futbolística.",
      p1: "Nido Águila Riverside es una comunidad construida alrededor de jugadores, familias, entrenadores y una pasión compartida por el juego. Juntos, estamos construyendo una comunidad futbolística en Riverside que desarrolla jugadores, crea oportunidades y genera un impacto positivo más allá de la cancha."
    },

    locations: {
      eyebrow: "Sedes de Entrenamiento",
      title: "Encuentra tu cancha.",
      place: "Nichols Park, Riverside, California",
      daysLabel: "Días de entrenamiento",
      days: "Martes y jueves",
      timeLabel: "Horario de entrenamiento",
      time: "6:00–8:00 PM",
      cta: "Cómo llegar",
      note: "Los horarios e información de las canchas se actualizarán conforme se confirmen las asignaciones de la academia."
    },

    vision: {
      eyebrow: "Nuestra Visión",
      title: "Construyendo la próxima generación.",
      p1: "Nuestra visión es construir una academia de desarrollo juvenil líder en Riverside y el Inland Empire — un ambiente donde los jóvenes jugadores puedan entrenar, competir, aprender y soñar más grande.",
      closing: "Estamos formando a las personas y jugadores del mañana."
    },

    join: {
      eyebrow: "Comienza Hoy",
      title: "Tu camino empieza aquí. ¿Listo para dar el siguiente paso?",
      body: "Únete a una comunidad futbolística comprometida a ayudar a los jóvenes jugadores a entrenar con propósito, competir con confianza, desarrollar su potencial y crecer como personas de carácter.",
      cta: "Únete a Nido Águila Riverside"
    },

    footer: {
      tagline: "Una academia de fútbol juvenil en Riverside, que desarrolla jugadores y personas a través de la identidad y los valores del Club América.",
      contact: "Contáctanos",
      nav: "Explorar",
      follow: "Síguenos",
      rights: "Todos los derechos reservados.",
      network: "Parte de la red Nido Águila."
    },

    carousel: {
      prev: "Imagen anterior",
      next: "Imagen siguiente",
      goto: "Ir a la imagen"
    },
    menu: {
      open: "Abrir menú",
      close: "Cerrar menú"
    },
    backToTop: "Volver arriba"
  }
};

const LANG_KEY = "nido-lang";
const SUPPORTED = ["en", "es"];

function getStoredLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
  } catch (e) {
    /* localStorage blocked — fall back to default */
  }
  return "en";
}

function storeLang(lang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (e) {
    /* ignore */
  }
}

function lookup(lang, path) {
  return path.split(".").reduce(function (obj, key) {
    return obj == null ? undefined : obj[key];
  }, translations[lang]);
}

function applyLanguage(lang) {
  if (!SUPPORTED.includes(lang)) lang = "en";

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    const value = lookup(lang, el.getAttribute("data-i18n"));
    if (typeof value === "string") el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
    const value = lookup(lang, el.getAttribute("data-i18n-aria-label"));
    if (typeof value === "string") el.setAttribute("aria-label", value);
  });

  document.querySelectorAll(".lang-switch [data-lang]").forEach(function (btn) {
    const active = btn.getAttribute("data-lang") === lang;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });

  document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang: lang } }));
}

function initLanguage() {
  const current = getStoredLang();
  applyLanguage(current);

  document.querySelectorAll(".lang-switch [data-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const lang = btn.getAttribute("data-lang");
      storeLang(lang);
      applyLanguage(lang);
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLanguage);
} else {
  initLanguage();
}

window.NidoI18n = { apply: applyLanguage, get: getStoredLang, data: translations };
