document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
        document.body.classList.add("dark");
        themeToggle.checked = true;
    }

    themeToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    });
});

function getSalary() {
    const name = document.getElementById("name").value.trim();
    const id = document.getElementById("id").value.trim();

    if (!name || !id) {
        alert("Введите имя и ID");
        return;
    }

    fetch("https://script.google.com/macros/s/AKfycbzJwiw833DGXjiS7gH3vfLR4VIN3u1m1-qPpLP_LS3jPFaQ8qYNXSIqLFBK4z9UHVCC/exec", {
        method: "POST",
        body: JSON.stringify({ name, id }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerHTML = data.html || "Нет данных";
    })
    .catch(error => {
        console.error("Ошибка:", error);
        document.getElementById("result").innerText = "Произошла ошибка при получении данных.";
    });
}