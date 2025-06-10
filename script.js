
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

function applyStoredTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

function createHeader(pageTitle, isMainPage) {
    const header = document.createElement('header');
    const title = document.createElement('h1');
    title.textContent = pageTitle;
    header.appendChild(title);

    const toggle = document.createElement('label');
    toggle.innerHTML = '<input type="checkbox" onchange="toggleTheme()"> Тема';
    header.appendChild(toggle);

    if (!isMainPage) {
        const back = document.createElement('button');
        back.textContent = 'Назад';
        back.className = 'back-button';
        back.onclick = () => history.back();
        header.appendChild(back);
    }

    document.body.prepend(header);
}

document.addEventListener('DOMContentLoaded', () => {
    applyStoredTheme();
});
