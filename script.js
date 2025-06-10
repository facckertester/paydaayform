
document.addEventListener("DOMContentLoaded", () => {
  const switcher = document.getElementById("themeSwitcher");
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    if (switcher) switcher.checked = true;
  }
  if (switcher) {
    switcher.addEventListener("change", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    });
  }
});
