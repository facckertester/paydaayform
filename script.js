
function applyTheme() {
  const darkMode = localStorage.getItem('theme') === 'dark';
  document.body.classList.toggle('dark-mode', darkMode);
  const themeCheckbox = document.getElementById("themeCheckbox");
  if (themeCheckbox) themeCheckbox.checked = darkMode;
}

function toggleTheme() {
  const dark = document.getElementById("themeCheckbox").checked;
  localStorage.setItem("theme", dark ? "dark" : "light");
  applyTheme();
}

document.addEventListener("DOMContentLoaded", () => {
  applyTheme();
});
