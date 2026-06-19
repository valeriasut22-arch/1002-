/* ================================================
   GameVault — app.js
   - Catálogo de juegos
   - Filtros por género
   - Búsqueda en tiempo real
   - Carrito de compras
   - Modo oscuro / claro
   - Wishlist
   ================================================ */

// ===== DATOS DE JUEGOS =====
const games = [
  {
    id: 1, title: "Shadow Realms: Genesis", genre: "rpg",
    desc: "RPG de mundo abierto con decisiones que cambian civilizaciones.",
    price: 59.99, oldPrice: null, rating: 5,
    icon: "bi-lightning-charge-fill", color: "#7c3aed",
    bg: "linear-gradient(135deg,#1e0048,#3b0082)",
    badge: "NUEVO", badgeColor: "#7c3aed"
  },
  {
    id: 2, title: "Neon Drift Racing", genre: "carreras",
    desc: "Velocidad extrema en pistas futuristas. 60 vehículos únicos.",
    price: 29.99, oldPrice: 49.99, rating: 4,
    icon: "bi-speedometer2", color: "#22c55e",
    bg: "linear-gradient(135deg,#001a0a,#003d1a)",
    badge: "OFERTA", badgeColor: "#16a34a"
  },
  {
    id: 3, title: "Crimson Tactics", genre: "estrategia",
    desc: "Estrategia por turnos. Lidera ejércitos en batallas épicas.",
    price: 23.99, oldPrice: 39.99, rating: 4,
    icon: "bi-shield-fill-exclamation", color: "#ef4444",
    bg: "linear-gradient(135deg,#1a0000,#3d0000)",
    badge: "OFERTA", badgeColor: "#16a34a"
  },
  {
    id: 4, title: "VoidHunter 3", genre: "accion",
    desc: "FPS espacial con combate frenético contra aliens interdimensionales.",
    price: 44.99, oldPrice: null, rating: 5,
    icon: "bi-rocket-takeoff-fill", color: "#0ea5e9",
    bg: "linear-gradient(135deg,#001220,#001f3d)",
    badge: null, badgeColor: null
  },
  {
    id: 5, title: "Whispers of Arkh", genre: "terror",
    desc: "Horror psicológico. Cada rincón esconde una verdad aterradora.",
    price: 19.99, oldPrice: null, rating: 4,
    icon: "bi-eye-fill", color: "#6b7280",
    bg: "linear-gradient(135deg,#0a0a0a,#1a1a1a)",
    badge: "POPULAR", badgeColor: "#6b21a8"
  },
  {
    id: 6, title: "Terra Builder", genre: "estrategia",
    desc: "Construye civilizaciones desde cero. Gestiona recursos y diplomacia.",
    price: 34.99, oldPrice: null, rating: 4,
    icon: "bi-building-fill", color: "#f59e0b",
    bg: "linear-gradient(135deg,#1a1000,#332200)",
    badge: null, badgeColor: null
  },
  {
    id: 7, title: "BioShift Origins", genre: "accion",
    desc: "Acción en tercera persona. Transforma tu cuerpo para superar obstáculos.",
    price: 49.99, oldPrice: 64.99, rating: 5,
    icon: "bi-person-fill-slash", color: "#10b981",
    bg: "linear-gradient(135deg,#001a14,#003328)",
    badge: "OFERTA", badgeColor: "#16a34a"
  },
  {
    id: 8, title: "Dungeon Lords", genre: "rpg",
    desc: "RPG clásico con mazmorras procedurales y más de 100 horas de contenido.",
    price: 27.99, oldPrice: null, rating: 4,
    icon: "bi-gem", color: "#a855f7",
    bg: "linear-gradient(135deg,#0d0020,#1a0040)",
    badge: null, badgeColor: null
  },
  {
    id: 9, title: "Midnight Drift", genre: "carreras",
    desc: "Carreras nocturnas por las calles de una megalópolis cyberpunk.",
    price: 22.99, oldPrice: 34.99, rating: 3,
    icon: "bi-car-front-fill", color: "#f472b6",
    bg: "linear-gradient(135deg,#1a0020,#300040)",
    badge: "OFERTA", badgeColor: "#16a34a"
  },
  {
    id: 10, title: "Iron Overlord", genre: "accion",
    desc: "Beat 'em up con más de 50 arenas y sistema de combate por físicas.",
    price: 15.99, oldPrice: null, rating: 4,
    icon: "bi-robot", color: "#f97316",
    bg: "linear-gradient(135deg,#1a0800,#331500)",
    badge: "INDIE", badgeColor: "#92400e"
  },
  {
    id: 11, title: "Project Abyss", genre: "terror",
    desc: "Sobrevive a las profundidades del océano. Batería incluida no.",
    price: 17.99, oldPrice: null, rating: 5,
    icon: "bi-water", color: "#1d4ed8",
    bg: "linear-gradient(135deg,#000d1a,#001433)",
    badge: "INDIE", badgeColor: "#92400e"
  },
  {
    id: 12, title: "StarForge: War", genre: "estrategia",
    desc: "RTS épico en el espacio. Conquista galaxias con millones de unidades.",
    price: 54.99, oldPrice: null, rating: 5,
    icon: "bi-stars", color: "#fbbf24",
    bg: "linear-gradient(135deg,#0a0a00,#1a1a00)",
    badge: "NUEVO", badgeColor: "#7c3aed"
  },
];

// ===== OFERTAS ESPECIALES =====
const offers = [
  { title: "Shadow Realms: Genesis", desc: "RPG épico de mundo abierto", discount: 30, price: 41.99, oldPrice: 59.99, icon: "bi-lightning-charge-fill", color: "#7c3aed", bg: "rgba(124,58,237,0.12)" },
  { title: "VoidHunter 3", desc: "FPS espacial multijugador", discount: 25, price: 33.74, oldPrice: 44.99, icon: "bi-rocket-takeoff-fill", color: "#0ea5e9", bg: "rgba(14,165,233,0.12)" },
  { title: "Terra Builder", desc: "Estrategia y construcción", discount: 20, price: 27.99, oldPrice: 34.99, icon: "bi-building-fill", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  { title: "Dungeon Lords", desc: "RPG con mazmorras infinitas", discount: 35, price: 18.19, oldPrice: 27.99, icon: "bi-gem", color: "#a855f7", bg: "rgba(168,85,247,0.12)" },
];

// ===== ESTADO =====
let cart = [];
let wishlist = new Set();
let currentFilter = 'all';
let currentSearch = '';

// ===== RENDER CATÁLOGO =====
function renderGames() {
  const grid = document.getElementById('gamesGrid');
  const noResults = document.getElementById('noResults');

  const filtered = games.filter(g => {
    const matchFilter = currentFilter === 'all' || g.genre === currentFilter;
    const matchSearch = g.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
      g.desc.toLowerCase().includes(currentSearch.toLowerCase());
    return matchFilter && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';

  grid.innerHTML = filtered.map((g, i) => `
    <div class="col-sm-6 col-md-4 col-xl-3 gv-fade-in" style="animation-delay:${i * 0.05}s">
      <div class="gv-game-card">
        <div class="gv-card-thumb" style="background:${g.bg}">
          <i class="bi ${g.icon} gv-card-icon" style="color:${g.color}"></i>
          <span class="gv-card-genre">${genreLabel(g.genre)}</span>
          ${g.badge ? `<span class="gv-card-badge" style="background:${g.badgeColor}; color:white">${g.badge}</span>` : ''}
        </div>
        <div class="gv-card-body">
          <div class="gv-card-title">${g.title}</div>
          <div class="gv-card-desc">${g.desc}</div>
          <div class="gv-stars">${'★'.repeat(g.rating)}${'☆'.repeat(5 - g.rating)} <span class="gv-muted ms-1" style="font-size:0.75rem">${g.rating}.0</span></div>
          <div class="gv-card-meta">
            <div>
              ${g.oldPrice ? `<span class="gv-price-old">$${g.oldPrice}</span>` : ''}
              <span class="gv-price-tag">$${g.price.toFixed(2)}</span>
            </div>
            <div class="gv-card-actions">
              <button class="gv-btn-wish ${wishlist.has(g.id) ? 'wished' : ''}" onclick="toggleWish(${g.id}, this)" title="Wishlist">
                <i class="bi ${wishlist.has(g.id) ? 'bi-heart-fill' : 'bi-heart'}"></i>
              </button>
              <button class="gv-btn-add" onclick="addToCart('${g.title}', ${g.price})">
                <i class="bi bi-bag-plus me-1"></i>Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function genreLabel(genre) {
  const labels = { accion: 'Acción', rpg: 'RPG', estrategia: 'Estrategia', carreras: 'Carreras', terror: 'Terror' };
  return labels[genre] || genre;
}

// ===== RENDER OFERTAS =====
function renderOffers() {
  const grid = document.getElementById('offersGrid');
  grid.innerHTML = offers.map(o => `
    <div class="col-md-6 col-lg-3">
      <div class="gv-offer-card">
        <div class="gv-offer-thumb" style="background:${o.bg}">
          <i class="bi ${o.icon}" style="color:${o.color}"></i>
        </div>
        <div class="gv-offer-info">
          <div class="gv-offer-title">${o.title}</div>
          <div class="gv-offer-desc">${o.desc}</div>
          <div class="d-flex align-items-center gap-2 mb-1">
            <span class="gv-discount-badge">-${o.discount}%</span>
            <span class="gv-price-old" style="font-size:0.8rem">$${o.oldPrice}</span>
            <span class="gv-price-tag" style="font-size:0.95rem">$${o.price}</span>
          </div>
          <button class="gv-btn-add mt-1 w-100" onclick="addToCart('${o.title}', ${o.price})">
            <i class="bi bi-bag-plus me-1"></i>Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== CARRITO =====
function addToCart(title, price) {
  const existing = cart.find(i => i.title === title);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ title, price, qty: 1 });
  }
  updateCartUI();
  showToast(`🎮 <strong>${title}</strong> agregado al carrito`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
  renderCartModal();
}

function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('cartCount').textContent = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
}

function renderCartModal() {
  const body = document.getElementById('cartBody');
  if (cart.length === 0) {
    body.innerHTML = '<p class="gv-muted text-center py-4">Tu carrito está vacío 🎮</p>';
    return;
  }
  body.innerHTML = cart.map((item, i) => `
    <div class="gv-cart-item">
      <div>
        <div class="gv-cart-name">${item.title}</div>
        <div class="gv-muted" style="font-size:0.78rem">Cant: ${item.qty}</div>
      </div>
      <div class="d-flex align-items-center gap-2">
        <span class="gv-cart-price">$${(item.price * item.qty).toFixed(2)}</span>
        <button class="gv-cart-remove" onclick="removeFromCart(${i})"><i class="bi bi-x-lg"></i></button>
      </div>
    </div>
  `).join('');
}

function checkout() {
  if (cart.length === 0) return;
  showToast('✅ ¡Compra realizada con éxito! Gracias por tu compra 🎮');
  cart = [];
  updateCartUI();
  renderCartModal();
  bootstrap.Modal.getInstance(document.getElementById('cartModal')).hide();
}

// ===== WISHLIST =====
function toggleWish(id, btn) {
  if (wishlist.has(id)) {
    wishlist.delete(id);
    btn.classList.remove('wished');
    btn.querySelector('i').className = 'bi bi-heart';
  } else {
    wishlist.add(id);
    btn.classList.add('wished');
    btn.querySelector('i').className = 'bi bi-heart-fill';
    showToast('❤️ Agregado a tu wishlist');
  }
}

// ===== TOAST =====
function showToast(msg) {
  document.getElementById('toastMsg').innerHTML = msg;
  const toast = new bootstrap.Toast(document.getElementById('gvToast'), { delay: 2500 });
  toast.show();
}

// ===== NEWSLETTER =====
function subscribeNewsletter() {
  const input = document.querySelector('.gv-newsletter-input');
  if (input.value && input.value.includes('@')) {
    showToast('📧 ¡Suscripción exitosa! Revisa tu correo.');
    input.value = '';
  } else {
    showToast('⚠️ Ingresa un correo válido.');
  }
}

// ===== MODO OSCURO =====
function initTheme() {
  const saved = localStorage.getItem('gv-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('gv-theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  icon.className = theme === 'dark' ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
}

// ===== FILTROS =====
document.getElementById('filterBtns').addEventListener('click', e => {
  if (!e.target.matches('.gv-filter-btn')) return;
  document.querySelectorAll('.gv-filter-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  currentFilter = e.target.dataset.filter;
  renderGames();
});

// ===== BÚSQUEDA =====
document.getElementById('searchInput').addEventListener('input', e => {
  currentSearch = e.target.value;
  renderGames();
});

// ===== CARRITO MODAL =====
document.getElementById('cartBtn').addEventListener('click', () => {
  renderCartModal();
  new bootstrap.Modal(document.getElementById('cartModal')).show();
});

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.gv-navbar');
  nav.style.boxShadow = window.scrollY > 20
    ? '0 4px 24px rgba(0,0,0,0.3)'
    : 'none';
});

// ===== INIT =====
document.getElementById('themeToggle').addEventListener('click', toggleTheme);
initTheme();
renderGames();
renderOffers();