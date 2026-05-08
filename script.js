// ============================
// PRELOADER
// ============================
const preFill = document.getElementById('preFill');
const preloader = document.getElementById('preloader');

document.body.style.overflow = 'hidden';

let pct = 0;

const tick = () => {
  const inc = pct < 70 ? Math.random() * 14 + 4 : Math.random() * 5 + 1;
  pct = Math.min(pct + inc, 100);
  preFill.style.width = pct + '%';

  if (pct < 100) {
    setTimeout(tick, 130);
  } else {
    setTimeout(() => {
      preloader.classList.add('hide');
      document.body.style.overflow = 'auto';
    }, 600);
  }
};

setTimeout(tick, 250);

// ============================
// CUSTOM CURSOR
// ============================
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .dish-row, .gallery-item, .tab').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
});

// ============================
// NAVBAR
// ============================
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ============================
// MOBILE MENU
// ============================
const navBurger = document.getElementById('navBurger');
const mobNav = document.getElementById('mobNav');
const mobLinks = document.querySelectorAll('.mob-nav-link');
let mobOpen = false;

navBurger.addEventListener('click', () => {
  mobOpen = !mobOpen;
  mobNav.classList.toggle('open', mobOpen);
  const spans = navBurger.querySelectorAll('span');
  if (mobOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.transform = '';
  }
});

mobLinks.forEach(l => {
  l.addEventListener('click', () => {
    mobOpen = false;
    mobNav.classList.remove('open');
    navBurger.querySelectorAll('span').forEach(s => s.style.transform = '');
  });
});

// ============================
// MENU TABS
// ============================
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.menu-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// ============================
// GALLERY DRAG SCROLL
// ============================
const track = document.getElementById('galleryTrack');
let isDragging = false;
let startX = 0;
let scrollStart = 0;

track.addEventListener('mousedown', e => {
  isDragging = true;
  track.classList.add('dragging');
  startX = e.pageX - track.offsetLeft;
  scrollStart = track.scrollLeft;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  track.classList.remove('dragging');
});

document.addEventListener('mousemove', e => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - track.offsetLeft;
  track.scrollLeft = scrollStart - (x - startX);
});

track.addEventListener('touchstart', e => {
  startX = e.touches[0].pageX;
  scrollStart = track.scrollLeft;
}, { passive: true });

track.addEventListener('touchmove', e => {
  const x = e.touches[0].pageX;
  track.scrollLeft = scrollStart - (x - startX);
}, { passive: true });

// ============================
// SCROLL REVEAL
// ============================
const revealEls = document.querySelectorAll(
  '.story-left, .story-right, .menu-header, .dish-row, .chef-inner, .reserve-inner, .contact-block, .gallery-item'
);

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((el, i) => {
    if (el.isIntersecting) {
      setTimeout(() => {
        el.target.style.opacity = '1';
        el.target.style.transform = 'translateY(0)';
      }, i * 90);
      revealObs.unobserve(el.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  revealObs.observe(el);
});

// ============================
// RESERVATION FORM
// ============================
const reserveForm = document.getElementById('reserveForm');
const formConfirm = document.getElementById('formConfirm');

reserveForm.addEventListener('submit', e => {
  e.preventDefault();
  const btn = reserveForm.querySelector('.reserve-submit');
  btn.textContent = 'Reservation Confirmed ✓';
  btn.style.background = 'var(--olive)';
  formConfirm.textContent = 'We look forward to welcoming you. A confirmation will be sent shortly.';

  setTimeout(() => {
    btn.textContent = 'Confirm Reservation';
    btn.style.background = '';
    formConfirm.textContent = '';
    reserveForm.reset();
  }, 5000);
});

// ============================
// ACTIVE NAV
// ============================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-center-links a');

const navObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.style.color = isActive ? 'var(--cream)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObs.observe(s));