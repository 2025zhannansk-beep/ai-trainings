'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('is-open'); menuButton.setAttribute('aria-expanded', String(open)); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('is-open')) { closeMenu(); menuButton.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('header')) closeMenu(); });
// Each package has its own explicit price; no format switch is needed.
document.querySelectorAll('.booking').forEach(link => {
  const price = new Intl.NumberFormat('ru-RU').format(Number(link.dataset.price));
  const message = `Жанна, здравствуйте! Интересует онлайн-курс «AI-помощники для бизнеса»: 4 занятия по 2,5 часа, пакет ${link.dataset.package}, ${price} ₽ за участника. Подскажите условия записи. Моя деятельность: `;
  link.href = 'https://t.me/Zhanna_Bulgakova_AI?text=' + encodeURIComponent(message);
});
