
function checkPassword() {
    const pw = document.getElementById('password').value;
    if (pw === "1234") {
        document.getElementById('main-form').style.display = 'block';
        document.getElementById('password-section').style.display = 'none';
    } else {
        alert("Неверный пароль");
    }
}

function toggleTooltip(id) {
    const tooltip = document.getElementById(id);
    if (tooltip.style.display === 'block') {
        tooltip.style.display = 'none';
    } else {
        tooltip.style.display = 'block';
    }
}
