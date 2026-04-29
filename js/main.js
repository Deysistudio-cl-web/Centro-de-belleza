// Mobile menu
const toggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const overlay = document.getElementById('nav-overlay');
const closeBtn = document.getElementById('nav-close');

function openMenu() {
  mobileNav.classList.add('open');
  overlay.style.display = 'block';
  setTimeout(() => overlay.classList.add('open'), 10);
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileNav.classList.remove('open');
  overlay.classList.remove('open');
  setTimeout(() => { overlay.style.display = 'none'; }, 300);
  document.body.style.overflow = '';
}

if (toggle) toggle.addEventListener('click', openMenu);
if (overlay) overlay.addEventListener('click', closeMenu);
if (closeBtn) closeBtn.addEventListener('click', closeMenu);

// Header compact on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    header.classList.add('compact');
    header.style.boxShadow = '0 2px 30px rgba(0,0,0,0.12)';
  } else {
    header.classList.remove('compact');
    header.style.boxShadow = '0 1px 20px rgba(0,0,0,0.07)';
  }
});

// Header search
(function() {
  const isSubpage = window.location.pathname.replace(/\\/g, '/').includes('/servicios/');
  const r = isSubpage ? '../' : '';
  const pages = [
    { title: 'Inicio', url: r + 'index.html', cat: 'Página' },
    { title: 'Todos los Servicios', url: r + 'servicios/index.html', cat: 'Servicios' },
    { title: 'Evaluación Online Gratis', url: r + 'servicios/evaluacion-online.html', cat: 'Servicio' },
    { title: 'Brushing Profesional', url: r + 'servicios/brushing.html', cat: 'Servicio' },
    { title: 'Extensiones de Cabello', url: r + 'servicios/extensiones-cabello.html', cat: 'Servicio', kw: 'extensiones pelo largo volumen' },
    { title: 'Balayage & Babylights', url: r + 'servicios/balayage-babylights.html', cat: 'Servicio', kw: 'balayage babylights mechas color' },
    { title: 'Coloración', url: r + 'servicios/coloracion.html', cat: 'Servicio', kw: 'color tinte coloracion' },
    { title: 'Corte de Cabello', url: r + 'servicios/corte-cabello.html', cat: 'Servicio', kw: 'corte pelo cabello' },
    { title: 'Masajes Capilares', url: r + 'servicios/masajes-capilares.html', cat: 'Servicio', kw: 'masaje tratamiento capilar' },
    { title: 'Alisados Permanentes', url: r + 'servicios/alisados-permanentes.html', cat: 'Servicio', kw: 'alisado liso keratina' },
    { title: 'Extensiones de Pestañas', url: r + 'servicios/extensiones-pestanas.html', cat: 'Servicio', kw: 'pestanas lash extensiones' },
    { title: 'Peinados y Maquillajes', url: r + 'servicios/peinados-maquillajes.html', cat: 'Servicio', kw: 'peinado maquillaje novia evento' },
    { title: 'Planchado de Cejas', url: r + 'servicios/planchado-cejas.html', cat: 'Servicio', kw: 'cejas planchado depilacion' },
    { title: 'Microblading y Micropigmentación', url: r + 'servicios/microblading.html', cat: 'Servicio', kw: 'microblading micropigmentacion cejas tatuaje' },
    { title: 'Manicure y Pedicure', url: r + 'servicios/manicure-pedicure.html', cat: 'Servicio', kw: 'manicure pedicure unas' },
    { title: 'Psicografología', url: r + 'servicios/psicografologia.html', cat: 'Servicio' },
    { title: 'Promociones', url: r + 'promociones.html', cat: 'Página', kw: 'ofertas descuentos promo' },
    { title: 'Portafolio', url: r + 'portafolio.html', cat: 'Página', kw: 'galeria fotos trabajos resultados' },
    { title: 'Nosotras', url: r + 'nosotras.html', cat: 'Página', kw: 'equipo historia quienes somos' },
    { title: 'Blog', url: r + 'blog.html', cat: 'Página', kw: 'articulos consejos tendencias belleza' },
    { title: 'Gift Card — Tarjeta de Regalo', url: r + 'gift-card.html', cat: 'Página', kw: 'regalo gift card tarjeta mama' },
    { title: 'Trabaja con Nosotras', url: r + 'trabaja-con-nosotras.html', cat: 'Página', kw: 'trabajo empleo postular' },
    { title: 'Contacto', url: r + 'contacto.html', cat: 'Página', kw: 'ubicacion direccion telefono reserva' },
  ];

  const input = document.getElementById('header-search-input');
  const results = document.getElementById('header-search-results');
  if (!input || !results) return;

  function search(q) {
    q = q.trim().toLowerCase();
    if (!q) { results.classList.remove('open'); return; }
    const hits = pages.filter(p => {
      const text = (p.title + ' ' + (p.kw || '') + ' ' + p.cat).toLowerCase();
      return q.split(' ').every(w => text.includes(w));
    }).slice(0, 8);
    if (hits.length === 0) {
      results.innerHTML = '<p class="search-no-results">Sin resultados para "' + q + '"</p>';
    } else {
      results.innerHTML = hits.map(p =>
        '<a class="search-result-item" href="' + p.url + '">' + p.title + '<span>' + p.cat + '</span></a>'
      ).join('');
    }
    results.classList.add('open');
  }

  input.addEventListener('input', () => search(input.value));
  input.addEventListener('keydown', e => { if (e.key === 'Escape') { results.classList.remove('open'); input.blur(); } });
  document.addEventListener('click', e => { if (!input.contains(e.target) && !results.contains(e.target)) results.classList.remove('open'); });
  document.getElementById('header-search-btn').addEventListener('click', () => { if (input.value) search(input.value); else input.focus(); });
})();

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Promo popup — shows once per visitor (localStorage)
const promoOverlay = document.getElementById('promo-overlay');
if (promoOverlay && !localStorage.getItem('promoShown')) {
  setTimeout(() => promoOverlay.classList.add('active'), 1000);
}
function closePromo() {
  if (promoOverlay) promoOverlay.classList.remove('active');
  localStorage.setItem('promoShown', '1');
}
if (promoOverlay) {
  promoOverlay.addEventListener('click', (e) => {
    if (e.target === promoOverlay) closePromo();
  });
}

// Cookie banner
(function() {
  if (localStorage.getItem('cookiesAccepted')) return;
  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.id = 'cookie-banner';
  banner.innerHTML = `
    <p>Utilizamos cookies propias y de terceros para mejorar tu experiencia y analizar el tráfico. Al continuar navegando aceptas su uso. <a href="#">Más información</a></p>
    <div class="cookie-banner-actions">
      <button class="cookie-btn-accept" onclick="acceptCookies()">Aceptar</button>
      <button class="cookie-btn-reject" onclick="rejectCookies()">Rechazar</button>
    </div>`;
  document.body.appendChild(banner);
  setTimeout(() => banner.classList.add('visible'), 600);
})();

function acceptCookies() {
  localStorage.setItem('cookiesAccepted', '1');
  const b = document.getElementById('cookie-banner');
  if (b) { b.classList.remove('visible'); setTimeout(() => b.remove(), 400); }
}
function rejectCookies() {
  const b = document.getElementById('cookie-banner');
  if (b) { b.classList.remove('visible'); setTimeout(() => b.remove(), 400); }
}
