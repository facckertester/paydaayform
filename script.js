
function checkPassword() {
  const password = document.getElementById('password').value;
  if (password === '1234') {
    document.getElementById('form-container').style.display = 'block';
  } else {
    alert('Неверный пароль');
  }
}
