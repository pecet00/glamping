const img = (n) => `img/_MG_${n}-HDR.jpg`;

const IMG = {
  nawlosc: img("0546"),
  brzoza: img("0980"),
  jaskolka: img("0737"),
  poranek: img("0413"),
  lawenda: img("0952"),
  zywica: img("0779"),
  dining: img("0455"),
  kitchen: img("0497"),
  bath: img("0870"),
  exterior: img("0980"),
  row: img("0959"),
  porch: img("0987"),
  entrance: img("0938"),
  family: img("1001"),
  ac: img("0835")
};

const units = [
  {
    id: "nawlosc",
    name: "Nawłoć",
    type: "rodzina",
    guests: 4,
    tags: ["rodzina", "taras", "łazienka", "4 os."],
    img: IMG.nawlosc,
    text: "Dwie sypialnie: dwuosobowa i dwa pojedyncze. Aneks, stół na cztery i taras. W pakiecie biznesu i jako model do zamówienia."
  },
  {
    id: "brzoza",
    name: "Brzoza",
    type: "rodzina",
    guests: 4,
    tags: ["rodzina", "taras", "klimatyzacja", "4 os."],
    img: IMG.brzoza,
    text: "Safari na podwyższonym tarasie. Jadalnia na zewnątrz, klimatyzacja, wejście z alei. Wzorcowa sztuka na terenie."
  },
  {
    id: "jaskolka",
    name: "Jaskółka",
    type: "para",
    guests: 2,
    tags: ["para", "taras", "łazienka", "2 os."],
    img: IMG.jaskolka,
    text: "Sypialnia z dużym łóżkiem i oknem na zieleń. Kompaktowy model dla par — ten sam układ stawiamy na Twojej działce."
  },
  {
    id: "poranek",
    name: "Poranek",
    type: "para",
    guests: 2,
    tags: ["para", "taras", "2 os."],
    img: IMG.poranek,
    text: "Dwa pojedyncze łóżka i okienko na łąkę. Lekki układ, który dobrze schodzi w konfiguratorze jako druga sypialnia parku."
  },
  {
    id: "lawenda",
    name: "Lawenda",
    type: "para",
    guests: 2,
    tags: ["para", "taras", "łazienka", "2 os."],
    img: IMG.lawenda,
    text: "Wejście z zasłon, stół na środku, sypialnia w głębi. Standard wykończenia identyczny z tym, co sprzedajemy."
  },
  {
    id: "zywica",
    name: "Żywica",
    type: "rodzina",
    guests: 4,
    tags: ["rodzina", "aneks", "łazienka", "4 os."],
    img: IMG.zywica,
    text: "Aneks z lodówką i czajnikiem, pełna zastawa, sypialnia z tyłu. Rodzinny moduł w pakiecie pod klucz."
  }
];

const products = [
  {
    id: "safari",
    name: "Safari 28 m²",
    lead: "8–10 tygodni",
    price: 89000,
    img: IMG.exterior,
    text: "Namiot safari na drewnianym tarasie: płótno, szkielet, jadalnia i sypialnia. Klimatyzacja w opcji."
  },
  {
    id: "family",
    name: "Rodzinna 36 m²",
    lead: "10–12 tygodni",
    price: 118000,
    img: IMG.family,
    text: "Dwie sypialnie, aneks i łazienka. Ten sam model, który stoi w Grabysówce — na Twoją działkę."
  },
  {
    id: "suite",
    name: "Suite z łazienką",
    lead: "10–12 tygodni",
    price: 132000,
    img: IMG.bath,
    text: "Pełna łazienka, sklejka i czarne armatury. Gotowe pod cztery pory roku, także w zestawie kilku sztuk."
  }
];

const models = [
  { id: "safari", label: "Safari", img: IMG.exterior, base: 82000 },
  { id: "family", label: "Rodzinna", img: IMG.family, base: 98000 },
  { id: "suite", label: "Suite", img: IMG.bath, base: 108000 }
];

const sizes = [
  { id: "s", label: "28 m²", add: 0 },
  { id: "m", label: "36 m²", add: 16000 },
  { id: "l", label: "48 m²", add: 32000 }
];

const woods = [
  { id: "spruce", label: "Świerk + płótno", add: 0 },
  { id: "thermo", label: "Thermo + PVC", add: 9000 },
  { id: "oak", label: "Sklejka premium", add: 14000 }
];

const quantities = [
  { id: "1", label: "1 szt.", mul: 1 },
  { id: "2", label: "2 szt.", mul: 2 },
  { id: "4", label: "4 szt.", mul: 4 },
  { id: "6", label: "6 szt. · park", mul: 6 }
];

const extras = [
  { id: "ac", label: "Klimatyzacja", add: 9000 },
  { id: "deck", label: "Taras XL", add: 8000 },
  { id: "bath", label: "Łazienka", add: 16000 },
  { id: "kitchen", label: "Aneks", add: 7000 },
  { id: "install", label: "Montaż na działce", add: 12000 }
];

const bizItems = [
  { label: "Działka z aleją i mediami", value: "w cenie" },
  { label: "6 namiotów safari", value: "wyposażone" },
  { label: "Tarasy, klima, aneksy", value: "w standardzie" },
  { label: "Łazienki i meble", value: "gotowe" },
  { label: "Przekazanie obiektu", value: "pod klucz" }
];

const gallery = [
  IMG.exterior,
  IMG.dining,
  IMG.jaskolka,
  IMG.bath,
  IMG.row,
  IMG.entrance,
  IMG.kitchen,
  IMG.ac
];

const state = {
  mode: "build",
  filter: "all",
  config: { model: "safari", size: "m", wood: "spruce", qty: "1", extras: ["deck", "ac", "install"] }
};

const money = (n) => new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 0 }).format(n);

function setMode(mode, scrollTo) {
  state.mode = mode;
  document.body.dataset.mode = mode;
  document.querySelectorAll(".mode-btn").forEach((btn) => {
    const on = btn.dataset.setMode === mode;
    btn.classList.toggle("is-active", on);
    btn.setAttribute("aria-selected", String(on));
  });
  const intent = document.querySelector(`input[name="intent"][value="${mode}"]`);
  if (intent) intent.checked = true;
  if (scrollTo) document.querySelector(scrollTo)?.scrollIntoView({ behavior: "smooth" });
}

function unitPrice() {
  const model = models.find((m) => m.id === state.config.model);
  const size = sizes.find((s) => s.id === state.config.size);
  const wood = woods.find((w) => w.id === state.config.wood);
  const extraSum = extras.filter((e) => state.config.extras.includes(e.id)).reduce((sum, e) => sum + e.add, 0);
  return model.base + size.add + wood.add + extraSum;
}

function renderUnits() {
  const cards = units.filter((item) => (
    state.filter === "all" || item.type === state.filter || item.tags.includes(state.filter)
  ));
  document.querySelector("#unitGrid").innerHTML = cards.map((item) => `
    <article class="stay-card" data-open="${item.id}">
      <img src="${item.img}" alt="${item.name}">
      <div class="body">
        <h3>${item.name}</h3>
        <div class="meta">
          <span>do ${item.guests} os.</span>
          <span class="price">moduł w ofercie</span>
        </div>
        <div class="tags">${item.tags.map((t) => `<span>${t}</span>`).join("")}</div>
      </div>
    </article>
  `).join("");
}

function renderProducts() {
  document.querySelector("#productGrid").innerHTML = products.map((item) => `
    <article class="product-card" data-product="${item.id}">
      <img src="${item.img}" alt="${item.name}">
      <div class="body">
        <h3>${item.name}</h3>
        <div class="meta">
          <span>${item.lead}</span>
          <span class="price">od ${money(item.price)}</span>
        </div>
        <p>${item.text}</p>
      </div>
    </article>
  `).join("");
}

function renderOptions() {
  const fill = (id, items, key) => {
    document.querySelector(id).innerHTML = items.map((item) => `
      <button type="button" class="opt ${state.config[key] === item.id ? "is-on" : ""}" data-config="${key}" data-id="${item.id}">
        ${item.label}
      </button>
    `).join("");
  };
  fill("#optModel", models, "model");
  fill("#optSize", sizes, "size");
  fill("#optWood", woods, "wood");
  fill("#optQty", quantities, "qty");
  document.querySelector("#optExtras").innerHTML = extras.map((item) => `
    <button type="button" class="check ${state.config.extras.includes(item.id) ? "is-on" : ""}" data-extra="${item.id}">
      ${item.label} · +${money(item.add)}
    </button>
  `).join("");
  updateConfigPrice();
}

function updateConfigPrice() {
  const model = models.find((m) => m.id === state.config.model);
  const size = sizes.find((s) => s.id === state.config.size);
  const qty = quantities.find((q) => q.id === state.config.qty);
  const per = unitPrice();
  const raw = per * qty.mul;
  const discount = qty.mul >= 4 ? 0.05 : 0;
  const total = Math.round(raw * (1 - discount));
  document.querySelector("#configPrice").textContent = money(total);
  document.querySelector("#configUnit").textContent = money(Math.round(total / qty.mul));
  document.querySelector("#configImg").src = model.img;
  document.querySelector("#configBadge").textContent = `${qty.label} · ${model.label} ${size.label}`;
  const weeks = qty.mul >= 4 ? "10–14" : state.config.model === "safari" ? "8–10" : "10–12";
  const note = discount ? " Rabat 5% przy 4 i 6 sztukach." : "";
  document.querySelector("#configLead").textContent = `Realizacja ${weeks} tygodni od akceptacji projektu.${note}`;
}

function renderBiz() {
  document.querySelector("#bizList").innerHTML = bizItems.map((item) => `
    <li><span>${item.label}</span><b>${item.value}</b></li>
  `).join("");
}

function openModal(item, kicker) {
  const modal = document.querySelector("#modal");
  document.querySelector("#modalImg").src = item.img;
  document.querySelector("#modalImg").alt = item.name;
  document.querySelector("#modalKicker").textContent = kicker;
  document.querySelector("#modalTitle").textContent = item.name;
  document.querySelector("#modalText").textContent = item.text;
  document.querySelector("#modalTags").innerHTML = (item.tags || []).map((t) => `<li>${t}</li>`).join("");
  modal.hidden = false;
  modal.dataset.pick = item.id || "";
}

function closeModal() {
  document.querySelector("#modal").hidden = true;
}

function renderGallery() {
  document.querySelector("#galleryGrid").innerHTML = gallery.map((src, i) => `
    <button type="button" data-light="${src}">
      <img src="${src}" alt="Galeria Grabysówka ${i + 1}">
    </button>
  `).join("");
}

function initVoices() {
  const slides = [...document.querySelectorAll(".voice")];
  const dots = document.querySelector("#voiceDots");
  dots.innerHTML = slides.map((_, i) => `<button type="button" data-voice="${i}" aria-label="Opinia ${i + 1}"></button>`).join("");
  let index = 0;
  const show = (i) => {
    index = i;
    slides.forEach((s, n) => s.classList.toggle("is-on", n === i));
    [...dots.children].forEach((d, n) => d.classList.toggle("is-on", n === i));
  };
  show(0);
  dots.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-voice]");
    if (btn) show(Number(btn.dataset.voice));
  });
  setInterval(() => show((index + 1) % slides.length), 7000);
}

function initNav() {
  const nav = document.querySelector("#nav");
  const burger = document.querySelector("#navBurger");
  window.addEventListener("scroll", () => nav.classList.toggle("is-solid", window.scrollY > 20), { passive: true });
  burger.addEventListener("click", () => nav.classList.toggle("is-open"));
  document.querySelector("#navLinks").addEventListener("click", () => nav.classList.remove("is-open"));
}

function initHeroSlideshow() {
  const slides = [...document.querySelectorAll(".hero-slide")];
  const dots = document.querySelector("#heroDots");
  const caption = document.querySelector("#heroCaption");
  if (!slides.length) return;

  dots.innerHTML = slides.map((_, i) => `<button type="button" aria-label="Zdjęcie ${i + 1}"></button>`).join("");
  let index = 0;
  let timer;

  const show = (next) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("is-on", i === index));
    [...dots.children].forEach((dot, i) => dot.classList.toggle("is-on", i === index));
    caption.textContent = slides[index].dataset.caption || "";
  };

  const play = () => {
    clearInterval(timer);
    timer = setInterval(() => show(index + 1), 6200);
  };

  dots.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    show([...dots.children].indexOf(btn));
    play();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) clearInterval(timer);
    else play();
  });

  show(0);
  play();
}

function specText() {
  const model = models.find((m) => m.id === state.config.model).label;
  const size = sizes.find((s) => s.id === state.config.size).label;
  const wood = woods.find((w) => w.id === state.config.wood).label;
  const qty = quantities.find((q) => q.id === state.config.qty).label;
  const extra = extras.filter((e) => state.config.extras.includes(e.id)).map((e) => e.label).join(", ") || "brak";
  return `Chcę wycenę konstrukcji: ${qty}, ${model}, ${size}, ${wood}, dodatki: ${extra}. Wycena orientacyjna: ${document.querySelector("#configPrice").textContent}.`;
}

function fillMessageFromConfig() {
  document.querySelector("#contactForm [name=message]").value = specText();
  setMode("build", "#kontakt");
}

function fillMessageFromBiz() {
  document.querySelector("#contactForm [name=message]").value =
    "Proszę o ofertę gotowego biznesu Grabysówka: działka, 6 namiotów safari, infrastruktura i wyposażenie pod klucz. Chcę umówić oględziny.";
  setMode("biz", "#kontakt");
}

function bind() {
  document.body.addEventListener("click", (e) => {
    const modeBtn = e.target.closest("[data-set-mode]");
    if (modeBtn) {
      setMode(
        modeBtn.dataset.setMode,
        modeBtn.dataset.scroll || (modeBtn.dataset.setMode === "biz" ? "#biznes" : "#sprzedaz")
      );
    }

    const chip = e.target.closest("#unitChips .chip");
    if (chip) {
      state.filter = chip.dataset.filter;
      document.querySelectorAll("#unitChips .chip").forEach((c) => c.classList.toggle("is-on", c === chip));
      renderUnits();
    }

    const stay = e.target.closest("[data-open]");
    if (stay) {
      const item = units.find((r) => r.id === stay.dataset.open);
      openModal(item, "Moduł na terenie");
    }

    const product = e.target.closest("[data-product]");
    if (product) {
      state.config.model = product.dataset.product;
      renderOptions();
      document.querySelector("#konfigurator").scrollIntoView({ behavior: "smooth" });
      setMode("build");
    }

    const opt = e.target.closest("[data-config]");
    if (opt) {
      state.config[opt.dataset.config] = opt.dataset.id;
      renderOptions();
    }

    const extra = e.target.closest("[data-extra]");
    if (extra) {
      const id = extra.dataset.extra;
      state.config.extras = state.config.extras.includes(id)
        ? state.config.extras.filter((x) => x !== id)
        : [...state.config.extras, id];
      renderOptions();
    }

    const light = e.target.closest("[data-light]");
    if (light) {
      document.querySelector("#lightImg").src = light.dataset.light;
      document.querySelector("#lightbox").hidden = false;
    }
  });

  document.querySelector("#modalClose").addEventListener("click", closeModal);
  document.querySelector("#modal").addEventListener("click", (e) => {
    if (e.target.id === "modal") closeModal();
  });
  document.querySelector("#modalCta").addEventListener("click", () => {
    closeModal();
    setMode("build", "#konfigurator");
  });
  document.querySelector("#configCta").addEventListener("click", fillMessageFromConfig);
  document.querySelector("#bizCta").addEventListener("click", fillMessageFromBiz);
  document.querySelector("#lightClose").addEventListener("click", () => {
    document.querySelector("#lightbox").hidden = true;
  });
  document.querySelector("#lightbox").addEventListener("click", (e) => {
    if (e.target.id === "lightbox") e.currentTarget.hidden = true;
  });
  document.querySelector("#contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;

  const formData = new FormData(form);

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    intent: formData.get("intent"),
    message: formData.get("message"),
  };

  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Nie udało się wysłać formularza");
    }

    document.querySelector("#formOk").hidden = false;

    form.reset();
  } catch (error) {
    console.error(error);

    alert("Nie udało się wysłać formularza. Spróbuj ponownie.");
  }
});
}

function boot() {
  renderUnits();
  renderProducts();
  renderOptions();
  renderBiz();
  renderGallery();
  initVoices();
  initNav();
  initHeroSlideshow();
  bind();
}

boot();
