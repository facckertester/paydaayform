document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header-controls');
    if (!header) return;

    // Ползунок темы
    const themeToggle = document.createElement('label');
    themeToggle.classList.add('switch');
    themeToggle.innerHTML = '<input type="checkbox" id="themeSwitcher"><span class="slider round"></span>';
    header.appendChild(themeToggle);

    // Кнопка назад
    if (!window.location.pathname.endsWith('index.html')) {
        const backBtn = document.createElement('button');
        backBtn.textContent = 'Назад';
        backBtn.onclick = () => history.back();
        header.appendChild(backBtn);
    }

    const switcher = document.getElementById('themeSwitcher');
    switcher.checked = localStorage.getItem('theme') === 'dark';

    function applyTheme(isDark) {
        document.body.classList.toggle('dark', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    applyTheme(switcher.checked);

    switcher.addEventListener('change', () => {
        applyTheme(switcher.checked);
    });
});