
gsap.registerPlugin(ScrollTrigger);

/* ---- Navbar scroll ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.style.cssText = `
        background: rgba(2,11,24,0.96);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        border-bottom: 1px solid rgba(0,212,255,0.1);
      `;
    } else {
        navbar.style.cssText = '';
    }
});

/* ---- Mobile menu ---- */
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

/* ---- Hero entrance GSAP ---- */
const heroTl = gsap.timeline({ delay: 0.15 });
heroTl
    .from('#hero-tag', { opacity: 0, y: 22, duration: 0.7, ease: 'power3.out' })
    .from('#hero-name', { opacity: 0, y: 50, duration: 0.9, ease: 'power3.out' }, '-=0.4')
    .from('#hero-desc', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out' }, '-=0.45')
    .from('#hero-stats > *',
        { opacity: 0, y: 18, duration: 0.55, stagger: 0.12, ease: 'power3.out' }, '-=0.3')
    .from('#hero-avatar', { opacity: 0, scale: 0.88, duration: 0.9, ease: 'back.out(1.5)' }, '-=0.9');

/* ---- Scroll fade-up animations ---- */
gsap.utils.toArray('.fade-up').forEach(el => {
    gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
            opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%', once: true }
        }
    );
});

/* ---- Staggered card groups ---- */
document.querySelectorAll('#skills .grid, #projects .grid').forEach(grid => {
    const cards = grid.querySelectorAll('.card');
    cards.forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0, duration: 0.65, delay: i * 0.08, ease: 'power3.out',
                scrollTrigger: { trigger: card, start: 'top 90%', once: true }
            }
        );
    });
});

/* ---- Particles ---- */
(function createParticles() {
    const container = document.getElementById('particles-container');
    const palette = ['rgba(0,212,255,0.45)', 'rgba(124,58,237,0.45)', 'rgba(16,185,129,0.35)'];
    for (let i = 0; i < 18; i++) {
        const el = document.createElement('div');
        el.className = 'particle';
        const size = Math.random() * 4 + 1;
        el.style.cssText = `
        width:${size}px; height:${size}px;
        background:${palette[Math.floor(Math.random() * palette.length)]};
        left:${Math.random() * 100}%;
        animation-duration:${Math.random() * 18 + 10}s;
        animation-delay:${Math.random() * 12}s;
      `;
        container.appendChild(el);
    }
})();

/* ---- Smooth anchor scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});
