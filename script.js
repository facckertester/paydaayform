
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

function navigate(path) {
    window.location.href = path;
}

function checkAdminAccess() {
    const pass = document.getElementById('admin-password').value;
    const panel = document.getElementById('admin-panel');
    const errorMessage = document.getElementById('error-message');

    if (pass === '2808') {
        panel.classList.add('active');
        errorMessage.textContent = '';
    } else {
        errorMessage.textContent = 'Неверный пароль. Попробуйте снова.';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }
});
