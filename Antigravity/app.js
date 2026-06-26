// ==========================================================================
// BASE DE DATOS DE PRODUCTOS Y FRASES MUNDIALISTAS
// ==========================================================================

// 8 productos de alta calidad con precios reales y enlaces de imágenes estables
const baseProducts = [
  {
    id: 1,
    name: "Smart TV 75\" 4K UHD UltraSlim Campeones",
    category: "televisores",
    image: "../img/television.avif",
    price: 1899999,
    originalPrice: 2235290,
    promo: "¡15% OFF!"
  },
  {
    id: 2,
    name: "Smartphone Galaxy S26 Golden Edition (Habilitado AFA)",
    category: "celulares",
    image: "../img/celular.avif",
    price: 949999,
    originalPrice: 1117645,
    promo: "3 ESTRELLAS"
  },
  {
    id: 3,
    name: "Heladera No Frost Inverter 450L Celeste y Plata",
    category: "cocina",
    image: "../img/heladera.avif",
    price: 1499999,
    originalPrice: 1764700,
    promo: "¡ENVÍO GRATIS!"
  },
  {
    id: 4,
    name: "Calefactor Estufa Tiro Balanceado de Alto Rendimiento",
    category: "climatizacion",
    image: "../img/estufa.avif",
    price: 249999,
    originalPrice: 294115,
    promo: "15% OFF"
  },
  {
    id: 5,
    name: "Aire Acondicionado Split Frío/Calor 3500W Scaloneta",
    category: "climatizacion",
    image: "../img/aire-acondicionado.avif",
    price: 899999,
    originalPrice: 1058820,
    promo: "12 CUOTAS"
  },
  {
    id: 6,
    name: "Freidora de Aire Air Fryer Digital 5.5L Acero",
    category: "cocina",
    image: "../img/air-fryer.avif",
    price: 189999,
    originalPrice: 223528,
    promo: "CAMPEÓN"
  },
  {
    id: 7,
    name: "Cocina Multigas 4 Hornallas Autolimpiante Acero",
    category: "cocina",
    image: "../img/cocina.avif",
    price: 679999,
    originalPrice: 799999,
    promo: "RECOMENDADO"
  },
  {
    id: 8,
    name: "Notebook Gamer Pro 15.6\" Intel i7 Albiceleste",
    category: "computacion",
    image: "../img/computadora.avif",
    price: 1249999,
    originalPrice: 1470585,
    promo: "¡15% OFF!"
  }
];

// Frases humorísticas y mundialistas relacionadas con la Selección Argentina
const mundialFrases = [
  "¡Tan potente como un remate de Messi al ángulo en la final del mundo!",
  "Ideal para enfriar las bebidas antes del partido y gritar los goles de la Scaloneta.",
  "Rendimiento digno de un Campeón del Mundo. ¡Te banca el alargue y los penales!",
  "Más rápido y seguro en lo suyo que el Dibu Martínez atajando en el minuto 123.",
  "Un lujo total, comparable con la asistencia de Messi a Molina contra Países Bajos.",
  "Tan confiable y sólido como la zaga central del Cuti Romero y Nicolás Otamendi.",
  "El electrodoméstico que le traería la tercera estrella a la comodidad de tu hogar.",
  "Preparado para jugar en las ligas mayores con la magia y precisión del Fideo Di María.",
  "Eficiencia energética de nivel Selección. Corre los 90 minutos con la entrega de De Paul.",
  "La tecnología que necesitás para volver a sentir la gloria de los campeones."
];

// ==========================================================================
// ESTADO DE LA APLICACIÓN
// ==========================================================================
let products = [];
let cart = [];
let activeCategory = "todos";
let searchQuery = "";

// ==========================================================================
// ELEMENTOS DEL DOM
// ==========================================================================
const productsGrid = document.getElementById("productsGrid");
const categoriesList = document.getElementById("categoriesList");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const resetSearchBtn = document.getElementById("resetSearchBtn");
const noResults = document.getElementById("noResults");
const resultsCount = document.getElementById("resultsCount");
const currentCategoryText = document.getElementById("currentCategoryText");

// Carrito
const cartBtn = document.getElementById("cartBtn");
const cartBadge = document.getElementById("cartBadge");
const cartModal = document.getElementById("cartModal");
const closeCartModal = document.getElementById("closeCartModal");
const cartExploreBtn = document.getElementById("cartExploreBtn");
const emptyCartState = document.getElementById("emptyCartState");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartModalFooter = document.getElementById("cartModalFooter");
const cartTotalPrice = document.getElementById("cartTotalPrice");
const clearCartBtn = document.getElementById("clearCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");

// Contacto
const contactForm = document.getElementById("contactForm");
const contactSuccess = document.getElementById("contactSuccess");
const resetContactFormBtn = document.getElementById("resetContactFormBtn");

// ==========================================================================
// FUNCIONES AUXILIARES
// ==========================================================================

// Formatear precios como Pesos Argentinos (ARS) de forma local
function formatCurrency(val) {
  return "$" + val.toLocaleString("es-AR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

// Obtener una frase aleatoria sin repetir si es posible
function getRandomDescription() {
  const randomIndex = Math.floor(Math.random() * mundialFrases.length);
  return mundialFrases[randomIndex];
}

// ==========================================================================
// LÓGICA DE INICIALIZACIÓN
// ==========================================================================
function initApp() {
  // Asignar descripciones aleatorias a los productos al cargar por primera vez
  products = baseProducts.map(prod => ({
    ...prod,
    description: getRandomDescription()
  }));

  renderProducts();
  setupEventListeners();
}

// ==========================================================================
// RENDERIZADO DE COMPONENTES
// ==========================================================================

// Renderizar la grilla de productos
function renderProducts() {
  // Filtrar productos por categoría y buscador
  const filtered = products.filter(prod => {
    const matchesCategory = activeCategory === "todos" || prod.category === activeCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Limpiar grilla
  productsGrid.innerHTML = "";

  // Mostrar mensaje si no hay resultados
  if (filtered.length === 0) {
    noResults.style.display = "block";
    productsGrid.style.display = "none";
  } else {
    noResults.style.display = "none";
    productsGrid.style.display = "grid";

    filtered.forEach(prod => {
      const card = document.createElement("div");
      card.className = "product-card animate-scale-up";
      card.setAttribute("data-id", prod.id);

      card.innerHTML = `
        <span class="product-promo-tag">${prod.promo}</span>
        <div class="product-image-container">
          <img src="${prod.image}" alt="${prod.name}">
        </div>
        <div class="product-details">
          <span class="product-category">${prod.category}</span>
          <h3 class="product-title" title="${prod.name}">${prod.name}</h3>
          
          <div class="product-price-block">
            <span class="product-original-price">${formatCurrency(prod.originalPrice)}</span>
            <div class="product-price">${formatCurrency(prod.price)}</div>
            <span class="product-installments">
              <i class="fas fa-credit-card"></i> 12 cuotas sin interés
            </span>
          </div>

          <div class="product-desc-wrapper" id="desc-wrapper-${prod.id}">
            <p class="product-desc" id="desc-text-${prod.id}">${prod.description}</p>
          </div>
        </div>
        <button class="btn-buy" onclick="addToCart(${prod.id})">
          <i class="fas fa-cart-plus"></i> Comprar
        </button>
      `;

      productsGrid.appendChild(card);
    });
  }

  // Actualizar metadatos de resultados
  resultsCount.textContent = filtered.length;
  currentCategoryText.textContent = activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);
}

// ==========================================================================
// SISTEMA DEL CARRITO DE COMPRAS (SIMULACIÓN INTERACTIVA)
// ==========================================================================

// Agregar producto al carrito
window.addToCart = function(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.product.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  updateCartUI();
  animateCartBadge();
};

// Quitar un elemento completo del carrito
window.removeFromCart = function(productId) {
  cart = cart.filter(item => item.product.id !== productId);
  updateCartUI();
};

// Modificar cantidad (+ o -) de un producto
window.changeQuantity = function(productId, change) {
  const cartItem = cart.find(item => item.product.id === productId);
  if (!cartItem) return;

  cartItem.quantity += change;

  if (cartItem.quantity <= 0) {
    removeFromCart(productId);
  } else {
    updateCartUI();
  }
};

// Limpiar todo el carrito
function clearCart() {
  cart = [];
  updateCartUI();
}

// Actualizar la interfaz del Carrito (Modal y Badge)
function updateCartUI() {
  // 1. Calcular total de productos
  const totalQty = cart.reduce((total, item) => total + item.quantity, 0);
  cartBadge.textContent = totalQty;

  // 2. Renderizar contenido del modal
  if (cart.length === 0) {
    emptyCartState.style.display = "block";
    cartItemsContainer.style.display = "none";
    cartModalFooter.style.display = "none";
  } else {
    emptyCartState.style.display = "none";
    cartItemsContainer.style.display = "flex";
    cartModalFooter.style.display = "block";

    cartItemsContainer.innerHTML = "";
    let totalMoney = 0;

    cart.forEach(item => {
      const itemSubtotal = item.product.price * item.quantity;
      totalMoney += itemSubtotal;

      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
        <div class="cart-item-img">
          <img src="${item.product.image}" alt="${item.product.name}">
        </div>
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.product.name}</h4>
          <span class="cart-item-price">${formatCurrency(item.product.price)} c/u</span>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQuantity(${item.product.id}, -1)">-</button>
            <span class="cart-item-qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="changeQuantity(${item.product.id}, 1)">+</button>
          </div>
        </div>
        <button class="remove-item-btn" onclick="removeFromCart(${item.product.id})" aria-label="Eliminar artículo">
          <i class="fas fa-trash-can"></i>
        </button>
      `;

      cartItemsContainer.appendChild(itemEl);
    });

    cartTotalPrice.textContent = formatCurrency(totalMoney);
  }
}

// Animar badge del carrito al agregar productos
function animateCartBadge() {
  cartBadge.classList.remove("pulse");
  void cartBadge.offsetWidth; // Dispara reflujo para reiniciar animación
  cartBadge.classList.add("pulse");
}

// Abrir/Cerrar Modal
function openCart() {
  cartModal.classList.add("active");
  document.body.style.overflow = "hidden"; // Evita scroll de fondo
}

function closeCart() {
  cartModal.classList.remove("active");
  document.body.style.overflow = "";
}

// Simular la compra final
function checkoutCart() {
  if (cart.length === 0) return;
  
  alert("¡GOLAAAAZO! ⚽ Tu pedido ya fue procesado.\nEn breve te enviaremos el comprobante digital de Campeón por mail.\n¡Gracias por elegir La Scaloneta del Hogar! ⭐⭐⭐");
  clearCart();
  closeCart();
}

// ==========================================================================
// CONFIGURACIÓN DE EVENTOS (EVENT LISTENERS)
// ==========================================================================
function setupEventListeners() {
  // Filtro de categorías por botones del Menú
  categoriesList.addEventListener("click", (e) => {
    const btn = e.target.closest(".category-btn");
    if (!btn) return;

    // Cambiar clase activa
    document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Filtrar y renderizar
    activeCategory = btn.getAttribute("data-category");
    renderProducts();
  });

  // Búsqueda en formulario del header
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = searchInput.value.trim();
    renderProducts();
    // Scroll suave hacia la sección de catálogo
    document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
  });

  // Búsqueda en tiempo real
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    renderProducts();
  });

  // Botón de re-búsqueda cuando no hay resultados
  resetSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchQuery = "";
    activeCategory = "todos";
    // Restaurar clase activa en menú
    document.querySelectorAll(".category-btn").forEach(b => {
      b.classList.remove("active");
      if (b.getAttribute("data-category") === "todos") b.classList.add("active");
    });
    renderProducts();
  });

  // Eventos de apertura/cierre de modal del carrito
  cartBtn.addEventListener("click", openCart);
  closeCartModal.addEventListener("click", closeCart);
  cartExploreBtn.addEventListener("click", () => {
    closeCart();
    document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
  });

  // Cerrar modal al hacer clic en el overlay (fuera del modal)
  cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) closeCart();
  });

  clearCartBtn.addEventListener("click", clearCart);
  checkoutBtn.addEventListener("click", checkoutCart);

  // CTA del Hero que desplaza suave al catálogo
  document.getElementById("heroCTA").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
  });

  // Manejo de envío del Formulario de Contacto
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Simulación de validación y envío exitoso
    contactForm.style.display = "none";
    contactSuccess.style.display = "block";
  });

  // Restablecer formulario de contacto
  resetContactFormBtn.addEventListener("click", () => {
    contactForm.reset();
    contactForm.style.display = "flex";
    contactSuccess.style.display = "none";
  });
}

// Inicializar la app cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", initApp);
