
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    const currentTheme = localStorage.getItem("theme") || "light";
    document.body.classList.toggle("dark-theme", currentTheme === "dark");
    toggle.checked = currentTheme === "dark";
    toggle.addEventListener("change", () => {
      const newTheme = toggle.checked ? "dark" : "light";
      document.body.classList.toggle("dark-theme", newTheme === "dark");
      localStorage.setItem("theme", newTheme);
    });
  }
});

function goBack() {
  window.history.back();
}
