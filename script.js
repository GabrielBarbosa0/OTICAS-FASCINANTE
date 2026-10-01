const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

const refreshIcons = () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

refreshIcons();

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const filterButtons = document.querySelectorAll(".filter-button");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    productCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const quizRoot = document.querySelector("#style-quiz");
const whatsappNumber = "5581998940165";
const assetPath = "./assets/warby parker/";

const quizSteps = [
  {
    id: "interesse",
    title: "O que você está buscando?",
    helper: "Comece pelo uso principal. Isso ajuda a orientar lente, armação e proteção.",
    layout: "image",
    options: [
      {
        label: "Óculos de grau",
        value: "óculos de grau",
        image: `${assetPath}HTOQuiz_OpticalOnly.png`,
        alt: "Armações de grau sobre fundo claro",
        description: "Para leitura, trabalho, estudo e rotina."
      },
      {
        label: "Grau e solar",
        value: "óculos de grau e solar",
        image: `${assetPath}HTOQuiz_SunPlusOptical.png`,
        alt: "Armações de grau e solares sobre fundo verde",
        description: "Para alternar entre ambientes internos e externos."
      }
    ],
    skipLabel: "Ainda não sei"
  },
  {
    id: "estilo",
    title: "Qual referência combina mais?",
    helper: "Pode escolher pela imagem que parece mais próxima do visual desejado.",
    layout: "image",
    options: [
      {
        label: "Linhas femininas",
        value: "linhas femininas",
        image: `${assetPath}Optical-Female-e96126b0bd93424d860650ca83a9da32.png`,
        alt: "Mulher sorrindo com óculos de grau"
      },
      {
        label: "Linhas masculinas",
        value: "linhas masculinas",
        image: `${assetPath}Optical-Male-5962991f645648039f120bc65213e266.png`,
        alt: "Homem sorrindo com óculos de grau"
      }
    ],
    skipLabel: "Sem preferência"
  },
  {
    id: "formatos",
    title: "Quais formatos chamam sua atenção?",
    helper: "Escolha quantos quiser. Se preferir, a gente vê isso junto no atendimento.",
    layout: "compact",
    carousel: true,
    multiple: true,
    options: [
      {
        label: "Quadrado",
        value: "quadrado",
        image: `${assetPath}shape-square.png`,
        alt: "Armação quadrada"
      },
      {
        label: "Retangular",
        value: "retangular",
        image: `${assetPath}shape-rectangle.png`,
        alt: "Armação retangular"
      },
      {
        label: "Redondo",
        value: "redondo",
        image: `${assetPath}shape-round.png`,
        alt: "Armação redonda"
      },
      {
        label: "Gatinho",
        value: "gatinho",
        image: `${assetPath}shape-cat-eye.png`,
        alt: "Armação gatinho"
      },
      {
        label: "Aviador",
        value: "aviador",
        image: `${assetPath}shape-aviator.png`,
        alt: "Armação aviador"
      }
    ],
    skipLabel: "Sem preferência"
  },
  {
    id: "cores",
    title: "Quais cores combinam com você?",
    helper: "Essa escolha ajuda a separar modelos discretos, marcantes ou mais versáteis.",
    layout: "swatch",
    multiple: true,
    options: [
      { label: "Coloridas", value: "coloridas", swatch: "linear-gradient(135deg, #0ea5e9, #22c55e 45%, #ef4444)" },
      { label: "Neutras", value: "neutras", swatch: "linear-gradient(135deg, #3f3f46, #d4d4d8)" },
      { label: "Preto", value: "preto", swatch: "#050505" },
      { label: "Marrom", value: "marrom", swatch: "linear-gradient(135deg, #9a5c2e, #4a2a18)" },
      { label: "Duas cores", value: "duas cores", swatch: "linear-gradient(180deg, #111827 0 48%, #f8fafc 50%)" },
      { label: "Azul", value: "azul", swatch: "linear-gradient(135deg, #38bdf8, #02306e)" },
      { label: "Dourado", value: "dourado", swatch: "linear-gradient(135deg, #facc15, #b7791f)" },
      { label: "Prata", value: "prata", swatch: "linear-gradient(135deg, #f8fafc, #9ca3af)" }
    ],
    skipLabel: "Sem preferência"
  },
  {
    id: "materiais",
    title: "Qual material você prefere?",
    helper: "O material muda presença, peso e sensação no rosto.",
    layout: "image",
    columns: 3,
    options: [
      {
        label: "Acetato",
        value: "acetato",
        image: `${assetPath}material-acetate.png`,
        alt: "Armação em acetato"
      },
      {
        label: "Metal",
        value: "metal",
        image: `${assetPath}material-metal.png`,
        alt: "Armação em metal"
      },
      {
        label: "Misto",
        value: "misto",
        image: `${assetPath}material-mixed.png`,
        alt: "Armação com material misto"
      }
    ],
    skipLabel: "Sem preferência"
  },
  {
    id: "tamanho",
    title: "Qual encaixe parece mais próximo?",
    helper: "Não precisa ser exato. É só uma referência inicial para orientar a escolha.",
    layout: "compact",
    options: [
      {
        label: "Estreito",
        value: "rosto estreito",
        image: `${assetPath}width-narrow.png`,
        alt: "Rosto estreito com linha de medida"
      },
      {
        label: "Médio",
        value: "rosto médio",
        image: `${assetPath}width-medium.png`,
        alt: "Rosto médio com linha de medida"
      },
      {
        label: "Largo",
        value: "rosto largo",
        image: `${assetPath}width-wide.png`,
        alt: "Rosto largo com linha de medida"
      }
    ],
    skipLabel: "Não tenho certeza"
  },
  {
    id: "receita",
    title: "Você já tem receita?",
    helper: "Essa informação ajuda a saber se o próximo passo é escolher, ajustar ou atualizar o grau.",
    layout: "text",
    options: [
      { label: "Sim, já tenho", value: "já tenho receita", description: "Posso levar ou enviar a receita para conferir." },
      { label: "Ainda não", value: "ainda não tenho receita", description: "Quero entender qual é o melhor caminho." },
      { label: "Quero atualizar", value: "quero atualizar meu grau", description: "Sinto que minha visão mudou ou quero revisar." }
    ],
    skipLabel: "Depois vejo isso"
  }
];

const quizLabels = {
  interesse: "Interesse",
  estilo: "Referência",
  formatos: "Formatos",
  cores: "Cores",
  materiais: "Material",
  tamanho: "Encaixe",
  receita: "Receita"
};

const quizState = {
  step: 0,
  answers: {}
};

const getStepValue = (step) => quizState.answers[step.id] || (step.multiple ? [] : "");

const hasAnswer = (step) => {
  const value = getStepValue(step);
  return Array.isArray(value) ? value.length > 0 : Boolean(value);
};

const formatAnswer = (value) => {
  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "sem preferência";
  }

  return value || "sem preferência";
};

const buildWhatsAppMessage = () => {
  const lines = [
    "Olá, fiz o quiz da Óticas Fascinante e gostaria de uma orientação.",
    "",
    ...quizSteps.map((step) => `${quizLabels[step.id]}: ${formatAnswer(quizState.answers[step.id])}`),
    "",
    "Pode me ajudar a escolher a opção que faz mais sentido?"
  ];

  return lines.join("\n");
};

const saveQuizLead = () => {
  const lead = {
    createdAt: new Date().toISOString(),
    source: "landing_page_quiz_whatsapp",
    answers: { ...quizState.answers },
    whatsappMessage: buildWhatsAppMessage()
  };
  const storedLeads = JSON.parse(localStorage.getItem("oticasFascinanteQuizLeads") || "[]");
  storedLeads.push(lead);
  localStorage.setItem("oticasFascinanteQuizLeads", JSON.stringify(storedLeads));
};

const optionClasses = (step, option) => {
  const value = getStepValue(step);
  const selected = Array.isArray(value) ? value.includes(option.value) : value === option.value;
  return `quiz-option${selected ? " is-selected" : ""}`;
};

const renderOptionMedia = (step, option) => {
  if (step.layout === "swatch") {
    return `<span class="quiz-swatch" style="background: ${option.swatch}" aria-hidden="true"></span>`;
  }

  if (option.image) {
    return `<img src="${option.image}" alt="${option.alt || ""}" loading="lazy" />`;
  }

  return "";
};

const renderOptions = (step) => {
  const layoutClass = [
    step.layout === "compact" ? "is-compact" : "",
    step.layout === "swatch" ? "is-swatch" : "",
    step.carousel ? "is-carousel" : "",
    step.columns === 3 ? "is-three-up" : ""
  ]
    .filter(Boolean)
    .join(" ");

  const optionsMarkup = `
    <div class="quiz-options${layoutClass ? ` ${layoutClass}` : ""}" role="${step.multiple ? "group" : "radiogroup"}" aria-label="${step.title}">
      ${step.options
        .map(
          (option) => `
            <button class="${optionClasses(step, option)}" type="button" data-quiz-option="${option.value}" aria-pressed="${
              optionClasses(step, option).includes("is-selected") ? "true" : "false"
            }">
              ${renderOptionMedia(step, option)}
              <span class="quiz-option-content">
                <strong>${option.label}</strong>
                ${option.description ? `<small>${option.description}</small>` : ""}
              </span>
            </button>
          `
        )
        .join("")}
    </div>
  `;

  if (!step.carousel) {
    return optionsMarkup;
  }

  return `
    <div class="quiz-carousel">
      <button class="quiz-carousel-button" type="button" data-carousel-prev aria-label="Ver formatos anteriores">
        <i data-lucide="chevron-left"></i>
      </button>
      ${optionsMarkup}
      <button class="quiz-carousel-button" type="button" data-carousel-next aria-label="Ver próximos formatos">
        <i data-lucide="chevron-right"></i>
      </button>
    </div>
  `;
};

const renderQuiz = () => {
  if (!quizRoot) {
    return;
  }

  const step = quizSteps[quizState.step];
  const current = quizState.step + 1;
  const total = quizSteps.length;
  const progress = Math.round((current / total) * 100);

  quizRoot.innerHTML = `
    <div class="quiz-pane${step.carousel ? " is-carousel-step" : ""}">
      <div class="quiz-topbar">
        <p class="quiz-progress-text">${current} de ${total}</p>
        <div class="quiz-progress" aria-hidden="true"><span style="width: ${progress}%"></span></div>
      </div>

      <div class="quiz-question">
        <h3>${step.title}</h3>
        <p>${step.helper}</p>
      </div>

      ${renderOptions(step)}

      <div class="quiz-controls">
        <button class="quiz-control" type="button" data-quiz-back ${quizState.step === 0 ? "disabled" : ""}>Voltar</button>
        <button class="quiz-control" type="button" data-quiz-skip>${step.skipLabel || "Pular"}</button>
        <button class="quiz-control primary" type="button" data-quiz-next ${!hasAnswer(step) ? "disabled" : ""}>Continuar</button>
      </div>
    </div>
  `;

  refreshIcons();
};

const renderResult = () => {
  const summary = quizSteps
    .map(
      (step) => `
        <div>
          <strong>${quizLabels[step.id]}</strong>
          <span>${formatAnswer(quizState.answers[step.id])}</span>
        </div>
      `
    )
    .join("");

  const message = buildWhatsAppMessage();
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  quizRoot.innerHTML = `
    <div class="quiz-result">
      <div class="quiz-question">
        <h3>Pronto, montamos seu resumo.</h3>
        <p>Agora é só enviar para a Óticas Fascinante e continuar pelo WhatsApp com uma orientação mais certeira.</p>
      </div>
      <div class="quiz-summary" aria-label="Resumo das preferências escolhidas">
        ${summary}
      </div>
      <div class="quiz-controls">
        <button class="quiz-control" type="button" data-quiz-restart>Refazer escolhas</button>
        <a class="button primary quiz-whatsapp" href="${whatsappUrl}" target="_blank" rel="noreferrer" data-quiz-whatsapp>
          <i data-lucide="message-circle"></i>
          Enviar no WhatsApp
        </a>
      </div>
    </div>
  `;

  saveQuizLead();
  refreshIcons();
};

const goNext = () => {
  if (quizState.step >= quizSteps.length - 1) {
    renderResult();
    return;
  }

  quizState.step += 1;
  renderQuiz();
};

quizRoot?.addEventListener("click", (event) => {
  const optionButton = event.target.closest("[data-quiz-option]");
  const backButton = event.target.closest("[data-quiz-back]");
  const skipButton = event.target.closest("[data-quiz-skip]");
  const nextButton = event.target.closest("[data-quiz-next]");
  const restartButton = event.target.closest("[data-quiz-restart]");
  const carouselPrev = event.target.closest("[data-carousel-prev]");
  const carouselNext = event.target.closest("[data-carousel-next]");

  if (carouselPrev || carouselNext) {
    const carousel = quizRoot.querySelector(".quiz-options.is-carousel");
    if (carousel) {
      const direction = carouselNext ? 1 : -1;
      carousel.scrollBy({ left: direction * carousel.clientWidth, behavior: "smooth" });
    }
    return;
  }

  if (optionButton) {
    const step = quizSteps[quizState.step];
    const value = optionButton.dataset.quizOption;

    if (step.multiple) {
      const currentValues = Array.isArray(quizState.answers[step.id]) ? [...quizState.answers[step.id]] : [];
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      quizState.answers[step.id] = nextValues;
      renderQuiz();
      return;
    }

    quizState.answers[step.id] = value;
    renderQuiz();
    return;
  }

  if (backButton && quizState.step > 0) {
    quizState.step -= 1;
    renderQuiz();
    return;
  }

  if (skipButton) {
    const step = quizSteps[quizState.step];
    quizState.answers[step.id] = step.multiple ? [] : "";
    goNext();
    return;
  }

  if (nextButton && !nextButton.disabled) {
    goNext();
    return;
  }

  if (restartButton) {
    quizState.step = 0;
    quizState.answers = {};
    renderQuiz();
  }
});

renderQuiz();
