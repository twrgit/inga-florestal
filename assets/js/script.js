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
document.querySelectorAll('.gallery-wrap').forEach(wrap => {
  const gallery = wrap.querySelector('.gallery');
  wrap.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    const forward = button.classList.contains('next');
    const step = gallery.querySelector('img').getBoundingClientRect().width + 10;
    const max = gallery.scrollWidth - gallery.clientWidth;
    const next = forward ? (gallery.scrollLeft >= max - 5 ? 0 : gallery.scrollLeft + step) : (gallery.scrollLeft <= 5 ? max : gallery.scrollLeft - step);
    gallery.scrollTo({ left: next, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }));
});

// Avoid exposing controls that cannot move a gallery at the current viewport.
function updateGalleryControls() {
  document.querySelectorAll('.gallery-wrap').forEach(wrap => {
    const gallery = wrap.querySelector('.gallery');
    const hasOverflow = gallery.scrollWidth > gallery.clientWidth + 2;
    wrap.querySelectorAll('button').forEach(button => { button.disabled = !hasOverflow; });
  });
}
window.addEventListener('resize', updateGalleryControls);
window.addEventListener('load', updateGalleryControls);
updateGalleryControls();
