const descriptions = [
  "Tan potente como un remate de Messi al angulo.",
  "Ideal para preparar la previa antes de cada partido.",
  "Rendimiento digno de un Campeon del Mundo.",
  "La compra que entra al area y define sin dudar.",
  "Tecnologia titular para jugar todos los dias en casa.",
  "Listo para aguantar alargue, penales y festejo.",
  "Una jugada simple para mejorar tu hogar sin vueltas.",
  "Mas confiable que un equipo que sabe a que juega."
];

const products = [
  {
    name: "Smart TV 55 pulgadas 4K Ultra HD",
    category: "Televisores",
    tag: "15% OFF",
    tagStyle: "gold",
    price: 1299999,
    image: "../img/television.avif"
  },
  {
    name: "Celular Pro 256 GB Pantalla AMOLED",
    category: "Celulares",
    tag: "12 cuotas",
    tagStyle: "sky",
    price: 899999,
    image: "../img/celular.avif"
  },
  {
    name: "Heladera No Frost 420 L Inverter",
    category: "Cocina",
    tag: "Envio gratis",
    tagStyle: "sky",
    price: 1589999,
    image: "../img/heladera.avif"
  },
  {
    name: "Calefactor Tiro Balanceado 5000 kcal",
    category: "Climatizacion",
    tag: "Oferta gol",
    tagStyle: "gold",
    price: 429999,
    image: "../img/estufa.avif"
  },
  {
    name: "Aire Acondicionado Split 3500 W Frio/Calor",
    category: "Climatizacion",
    tag: "18% OFF",
    tagStyle: "gold",
    price: 1129999,
    image: "../img/aire-acondicionado.avif"
  },
  {
    name: "Air Fryer Digital 6 L Familiar",
    category: "Cocina",
    tag: "Mas vendido",
    tagStyle: "sky",
    price: 219999,
    image: "../img/air-fryer.avif"
  },
  {
    name: "Cocina Multigas 56 cm con Grill",
    category: "Cocina",
    tag: "Precio final",
    tagStyle: "sky",
    price: 649999,
    image: "../img/cocina.avif"
  },
  {
    name: "Notebook Ryzen 7 16 GB SSD 512 GB",
    category: "Computacion",
    tag: "Upgrade",
    tagStyle: "gold",
    price: 1399999,
    image: "../img/computadora.avif"
  }
];

const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0
});

const productGrid = document.querySelector("#product-grid");

function getRandomDescription() {
  const index = Math.floor(Math.random() * descriptions.length);
  return descriptions[index];
}

function createProductCard(product, index) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.index = String(index);

  const initialDescription = getRandomDescription();
  const tagClass = product.tagStyle === "gold" ? "tag gold" : "tag";

  card.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
    </div>
    <div class="product-content">
      <div class="product-topline">
        <span class="${tagClass}">${product.tag}</span>
        <span class="tag">${product.category}</span>
      </div>
      <h3>${product.name}</h3>
      <p class="price">${currencyFormatter.format(product.price)}</p>
      <p class="description">${initialDescription}</p>
      <div class="product-actions">
        <button class="buy-button" type="button">Comprar</button>
      </div>
    </div>
  `;

  return card;
}

function renderProducts() {
  const fragment = document.createDocumentFragment();
  products.forEach((product, index) => {
    fragment.appendChild(createProductCard(product, index));
  });
  productGrid.appendChild(fragment);
}

document.querySelector(".search").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#catalogo").scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  event.currentTarget.reset();
});

renderProducts();
