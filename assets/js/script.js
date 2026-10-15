const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-open'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); menu.classList.toggle('is-open', open); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); } });
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (!target || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); closeMenu();
    const top = target.getBoundingClientRect().top + window.scrollY - document.querySelector('.header').offsetHeight;
    window.scrollTo({ top, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true });
  });
});

// Independent timings keep the opening artwork from pulsing in a fixed sequence.
const hero = document.querySelector('.hero');
if (hero) {
  hero.querySelectorAll('.hero-glyph').forEach(glyph => {
    glyph.style.setProperty('--pulse-duration', `${12 + Math.random() * 9}s`);
    glyph.style.setProperty('--pulse-offset', `${-Math.random() * 18}s`);
  });
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  let heroVisible = false;
  const updateHeroAnimation = () => hero.classList.toggle('is-animating', heroVisible && !document.hidden && !motionPreference.matches);
  const heroObserver = new IntersectionObserver(entries => {
    heroVisible = entries[0].isIntersecting;
    updateHeroAnimation();
  });
  heroObserver.observe(hero);
  document.addEventListener('visibilitychange', updateHeroAnimation);
  motionPreference.addEventListener('change', updateHeroAnimation);
}

// Keep final values in HTML for indexing and assistive technology.
const counters = [...document.querySelectorAll('[data-count-to]')];
const counterMotion = matchMedia('(prefers-reduced-motion: reduce)');
const runningCounters = new Map();
function finishCounter(counter) {
  const frame = runningCounters.get(counter);
  if (frame !== undefined) cancelAnimationFrame(frame);
  runningCounters.delete(counter);
  counter.textContent = counter.dataset.countTo;
  counter.style.minWidth = '';
}
if (counters.length && 'IntersectionObserver' in window) {
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const counter = entry.target;
      counterObserver.unobserve(counter);
      if (counterMotion.matches) { finishCounter(counter); return; }
      const target = Number(counter.dataset.countTo);
      const duration = 1800;
      counter.style.minWidth = `${counter.getBoundingClientRect().width}px`;
      counter.textContent = '0';
      let started;
      const tick = now => {
        if (counterMotion.matches) { finishCounter(counter); return; }
        started ??= now;
        const progress = Math.min((now - started) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = String(Math.round(target * eased));
        if (progress < 1) runningCounters.set(counter, requestAnimationFrame(tick));
        else finishCounter(counter);
      };
      runningCounters.set(counter, requestAnimationFrame(tick));
    });
  }, { threshold: 0.6 });
  counters.forEach(counter => counterObserver.observe(counter));
  counterMotion.addEventListener('change', () => {
    if (!counterMotion.matches) return;
    counterObserver.disconnect();
    counters.forEach(finishCounter);
  });
}

const partners = document.querySelector('.partners');
if (partners && 'IntersectionObserver' in window) {
  let partnersVisible = false;
  const updatePartnersMotion = () => partners.classList.toggle('is-moving', partnersVisible && !document.hidden);
  new IntersectionObserver(entries => {
    partnersVisible = entries[0].isIntersecting;
    updatePartnersMotion();
  }).observe(partners);
  document.addEventListener('visibilitychange', updatePartnersMotion);
}
