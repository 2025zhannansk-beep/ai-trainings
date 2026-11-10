'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('is-open'); menuButton.setAttribute('aria-expanded', String(open)); });
// Close the panel for in-page links only; external registration navigates normally.
navigation.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('is-open')) { closeMenu(); menuButton.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('header')) closeMenu(); });

// Reveal lesson details when arriving from a programme card or a direct link.
function revealLesson() {
  if (!/^#lesson-[1-4]$/.test(location.hash)) return;
  const lesson = document.querySelector(location.hash);
  if (lesson) lesson.open = true;
}
window.addEventListener('hashchange', revealLesson);
revealLesson();
