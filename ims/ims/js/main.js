/* IMS COMPANY - main.js v2 */

// LOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    const l = document.getElementById('loader');
    if (l) l.classList.add('hidden');
  }, 1500);
});

// NAVBAR
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
});

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});

// REVEAL ON SCROLL
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ANIMATED COUNTER
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();
  const isDecimal = target % 1 !== 0;
  function update(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (isDecimal ? (target * eased).toFixed(1) : Math.floor(target * eased)) + suffix;
    if (p < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.animated) {
      e.target.dataset.animated = true;
      animateCounter(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

// FAQ
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// PAYMENT METHOD SELECTION
document.querySelectorAll('.pm-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.pm-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});

// PLAN SELECTION + ORDER SUMMARY
const planOptions = document.querySelectorAll('.plan-opt');
const osSummary = document.getElementById('osSummary');
const plans = {
  starter:   { name: 'Starter (3 Users)',   price: 155000, yearly: '155,000 RWF/year' },
  standard:  { name: 'Standard (4 Users)',  price: 215000, yearly: '215,000 RWF/year' },
  unlimited: { name: 'Unlimited Users',     price: 301000, yearly: '301,000 RWF/year' }
};

function updateOrderSummary() {
  if (!osSummary) return;
  const selected = document.querySelector('.plan-opt.selected');
  const plan = selected ? plans[selected.dataset.plan] : null;
  if (plan) {
    osSummary.innerHTML = `
      <div class="os-row"><span class="os-label">Plan</span><span class="os-value">${plan.name}</span></div>
      <div class="os-row"><span class="os-label">Subscription</span><span class="os-value">${plan.yearly}</span></div>
      <div class="os-row"><span class="os-label">Installation Fee</span><span class="os-value">50,000 RWF</span></div>
      <div class="os-row"><span class="os-label">Setup</span><span class="os-value" style="color:var(--green)">FREE</span></div>
      <div class="os-total"><span class="os-total-lbl">First Year Total</span><span class="os-total-val">${(plan.price + 50000).toLocaleString()} RWF</span></div>`;
  } else {
    osSummary.innerHTML = `
      <div class="os-row"><span class="os-label">Plan</span><span class="os-value" style="color:var(--text-muted)">Not selected</span></div>
      <div class="os-row"><span class="os-label">Installation Fee</span><span class="os-value">50,000 RWF</span></div>
      <div class="os-total"><span class="os-total-lbl">First Year Total</span><span class="os-total-val" style="color:var(--text-muted)">—</span></div>`;
  }
}
planOptions.forEach(opt => {
  opt.addEventListener('click', () => {
    planOptions.forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    updateOrderSummary();
  });
});
updateOrderSummary();

// CONTACT FORM
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '✓ Message Sent!';
    btn.style.background = 'var(--green)';
    btn.disabled = true;
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.disabled = false; contactForm.reset(); }, 3500);
  });
}

// PURCHASE FORM
const purchaseForm = document.getElementById('purchaseForm');
if (purchaseForm) {
  purchaseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = purchaseForm.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '✓ Order Submitted! We\'ll contact you within 24hrs';
    btn.style.background = 'var(--green)';
    btn.disabled = true;
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.disabled = false; }, 4500);
  });
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});
