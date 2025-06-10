
// Переключение темы
const switcher = document.getElementById('themeSwitcher');
switcher.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

// Авто-сохранение темы
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  switcher.checked = true;
}
switcher.addEventListener('change', () => {
  const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});
