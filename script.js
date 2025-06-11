
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

function navigate(path) {
    window.location.href = path;
}

function checkAdminAccess() {
    const pass = document.getElementById('admin-password').value;
    if (pass === '2808') {
        document.getElementById('admin-blur').classList.add('active');
        document.getElementById('admin-panel').style.display = 'flex';
    } else {
        alert('Неверный пароль');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
    }
});
