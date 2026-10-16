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

// Pause the banner fades when the banner or browser tab is hidden.
const hero = document.querySelector('.hero');
const heroMotion = matchMedia('(prefers-reduced-motion: reduce)');
let heroVisible = true;
function updateHeroMotion() {
  hero.classList.toggle('is-animating', heroVisible && !document.hidden && !heroMotion.matches);
}
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => {
    heroVisible = entries[0].isIntersecting;
    updateHeroMotion();
  }).observe(hero);
}
document.addEventListener('visibilitychange', updateHeroMotion);
heroMotion.addEventListener('change', updateHeroMotion);
updateHeroMotion();

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

// Advance one partner, then pause. Section navigation and pointer hover must not stop autoplay.
const partners = document.querySelector('.partners');
const viewport = document.querySelector('.partner-logos');
const track = document.querySelector('.partner-track');
const group = document.querySelector('.partner-group');
const partnerMotion = matchMedia('(prefers-reduced-motion: reduce)');
let partnerIndex = 0;
let partnerTimer;
let partnerVisible = false;
let partnerBusy = false;
function partnerStep() { return group.children[1].offsetLeft - group.children[0].offsetLeft; }
function movePartner(direction) {
  if (partnerBusy) return;
  partnerBusy = true;
  const count = group.children.length;
  if (direction < 0 && partnerIndex === 0) {
    partnerIndex = count;
    track.style.transition = 'none';
    track.style.transform = `translateX(${-partnerIndex * partnerStep()}px)`;
    track.getBoundingClientRect();
  }
  partnerIndex += direction;
  track.style.transition = partnerMotion.matches ? 'none' : 'transform 275ms ease-in-out';
  track.style.transform = `translateX(${-partnerIndex * partnerStep()}px)`;
  setTimeout(() => {
    if (partnerIndex >= count) {
      partnerIndex = 0;
      track.style.transition = 'none';
      track.style.transform = 'translateX(0)';
    }
    partnerBusy = false;
  }, partnerMotion.matches ? 0 : 285);
}
function schedulePartners() {
  clearInterval(partnerTimer);
  if (partnerVisible && !document.hidden && !partnerMotion.matches && !document.activeElement.closest('.partner-carousel')) {
    partnerTimer = setInterval(() => movePartner(1), 1600);
  }
}
new IntersectionObserver(entries => { partnerVisible = entries[0].isIntersecting; schedulePartners(); }).observe(partners);
['focusin', 'focusout'].forEach(type => partners.addEventListener(type, () => queueMicrotask(schedulePartners)));
document.addEventListener('visibilitychange', schedulePartners);
partnerMotion.addEventListener('change', schedulePartners);
window.addEventListener('resize', () => {
  track.style.transition = 'none';
  track.style.transform = `translateX(${-partnerIndex * partnerStep()}px)`;
});

document.querySelectorAll('.partner-arrow').forEach(button => {
  button.addEventListener('click', () => {
    movePartner(Number(button.dataset.direction));
    schedulePartners();
  });
});
