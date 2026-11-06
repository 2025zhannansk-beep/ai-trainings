'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('is-open'); menuButton.setAttribute('aria-expanded', String(open)); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('is-open')) { closeMenu(); menuButton.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('header')) closeMenu(); });
const formatButtons = document.querySelectorAll('[data-format]');
const modeButtons = document.querySelectorAll('[data-mode]');
let selectedFormat = 'online';
let selectedMode = 'group';
const number = value => new Intl.NumberFormat('ru-RU').format(value);
function setFormat(format) {
  selectedFormat = format;
  const multiplier = selectedMode === 'vip' ? 1.2 : 1;
  formatButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.format === format)));
  modeButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === selectedMode)));
  document.querySelector('#vip-description').hidden = selectedMode !== 'vip';
  document.querySelectorAll('.price').forEach(element => { element.replaceChildren(document.createTextNode(number(Math.round(Number(element.dataset[format]) * multiplier)) + ' ')); const currency = document.createElement('span'); currency.textContent = '₽'; element.append(currency); });
  document.querySelectorAll('.per-person').forEach(element => { if (!element.dataset.base) element.dataset.base = element.textContent; element.textContent = element.dataset.base + (selectedMode === 'vip' ? ' · VIP' : ''); element.classList.toggle('vip-active', selectedMode === 'vip'); });
  document.querySelector('#saving').textContent = `На ${number(Math.round((format === 'online' ? 3000 : 3600) * multiplier))} ₽ выгоднее, чем по отдельности${selectedMode === 'vip' ? ' с VIP' : ''}`;
  document.querySelector('#format-caption').innerHTML = format === 'online' ? '<strong>Онлайн:</strong><span><u>Тренинг 01</u> — 22 и 25 ноября 2026</span><span><u>Тренинг 02</u> — 29 ноября и 2 декабря 2026</span><span>Занятия — с 10:00 до 15:00 по Москве</span><span>Онлайн-консультация — 28 ноября, с 12:00 до 14:00 по Москве</span>' : '<strong>Офлайн — Севастополь</strong><span><u>Тренинг 01</u> — 24 и 26 ноября 2026</span><span><u>Тренинг 02</u> — 1 и 3 декабря 2026</span><span>Занятия — с 10:00 до 15:00 по Москве</span><span>Онлайн-консультация — 28 ноября, с 12:00 до 14:00 по Москве</span>';
  document.querySelectorAll('.booking').forEach(link => {
    const priceElement = link.closest('.price-card').querySelector('.price');
    const message = `Жанна, здравствуйте! Интересует ${link.dataset.course}, формат ${format === 'online' ? 'онлайн' : 'офлайн'}, режим ${selectedMode === 'vip' ? 'VIP — индивидуальная проработка ассистентов' : 'групповой'}, ${number(Math.round(Number(priceElement.dataset[format]) * multiplier))} ₽ за участника. Подскажите, пожалуйста, условия записи. Моя деятельность: `;
    link.href = 'https://t.me/Zhanna_Bulgakova_AI?text=' + encodeURIComponent(message);
  });
}
formatButtons.forEach(button => button.addEventListener('click', () => setFormat(button.dataset.format)));
modeButtons.forEach(button => button.addEventListener('click', () => { selectedMode = button.dataset.mode; setFormat(selectedFormat); }));
setFormat('online');

document.querySelectorAll('[data-select-format]').forEach(link => link.addEventListener('click', () => setFormat(link.dataset.selectFormat)));


