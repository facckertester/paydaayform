document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  const isDark = localStorage.getItem("theme") === "dark";
  document.body.classList.toggle("dark-theme", isDark);
  if (toggle) toggle.checked = isDark;

  if (toggle) {
    toggle.addEventListener("change", () => {
      document.body.classList.toggle("dark-theme");
      localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
    });
  }
});

function showSalary() {
  const name = document.getElementById("name").value.trim();
  const id = document.getElementById("id").value.trim();
  const resultDiv = document.getElementById("salary-result");
  if (!name || !id) {
    resultDiv.innerHTML = "Пожалуйста, введите имя и ID.";
    return;
  }
  fetch(`https://script.google.com/macros/s/AKfycbzJwiw833DGXjiS7gH3vfLR4VIN3u1m1-qPpLP_LS3jPFaQ8qYNXSIqLFBK4z9UHVCC/exec?name=${name}&id=${id}`)
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        resultDiv.innerHTML = "Запись не найдена.";
        return;
      }
      let totalHours = 0;
      let totalSalary = 0;
      const rows = data.map(row => {
        totalHours += parseFloat(row.hours);
        totalSalary += parseFloat(row.salary);
        return `<tr><td>${row.date}</td><td>${row.point}</td><td>${row.hours}</td><td>${row.salary}</td></tr>`;
      }).join("");
      resultDiv.innerHTML = `
        <table border="1" cellpadding="5">
          <tr><th>Дата</th><th>Точка</th><th>Часы</th><th>ЗП</th></tr>
          ${rows}
        </table>
        <p><strong>Всего часов:</strong> ${totalHours}</p>
        <p><strong>Итого ЗП:</strong> ${totalSalary} ₽</p>
      `;
    })
    .catch(() => {
      resultDiv.innerHTML = "Ошибка при получении данных.";
    });
}

if (document.getElementById("employee-list")) {
  fetch("https://script.google.com/macros/s/AKfycbzJwiw833DGXjiS7gH3vfLR4VIN3u1m1-qPpLP_LS3jPFaQ8qYNXSIqLFBK4z9UHVCC/exec?employees=1")
    .then(res => res.json())
    .then(data => {
      const ch = data.filter(e => e.id.endsWith("Ч"));
      const oz = data.filter(e => e.id.endsWith("О"));
      const html = `
        <h3>Челябинск</h3><ul>${ch.map(e => `<li>${e.name} (${e.id})</li>`).join("")}</ul>
        <h3>Озёрск</h3><ul>${oz.map(e => `<li>${e.name} (${e.id})</li>`).join("")}</ul>
      `;
      document.getElementById("employee-list").innerHTML = html;
    })
    .catch(() => {
      document.getElementById("employee-list").innerHTML = "Ошибка загрузки сотрудников.";
    });
}