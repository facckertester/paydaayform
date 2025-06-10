
const webAppUrl = "https://script.google.com/macros/s/AKfycbzJwiw833DGXjiS7gH3vfLR4VIN3u1m1-qPpLP_LS3jPFaQ8qYNXSIqLFBK4z9UHVCC/exec";

// Пример функции для загрузки зарплаты
async function loadSalaryData(name, id) {
  const url = `${webAppUrl}?action=salary&name=${encodeURIComponent(name)}&id=${encodeURIComponent(id)}`;
  const response = await fetch(url);
  const data = await response.json();
  displaySalary(data);
}

function displaySalary(data) {
  const container = document.getElementById("salary-data");
  container.innerHTML = "";

  if (!data || data.length === 0) {
    container.innerHTML = "<p>Нет данных</p>";
    return;
  }

  data.forEach(entry => {
    const div = document.createElement("div");
    div.className = "salary-entry";
    div.innerHTML = `
      <p><strong>Дата:</strong> ${entry.date}</p>
      <p><strong>Точка:</strong> ${entry.point}</p>
      <p><strong>Часы:</strong> ${entry.hours}</p>
      <p><strong>Зарплата:</strong> ${entry.salary}</p>
      <hr>
    `;
    container.appendChild(div);
  });
}

async function loadEmployees() {
  const url = `${webAppUrl}?action=employees`;
  const response = await fetch(url);
  const data = await response.json();
  displayEmployees(data);
}

function displayEmployees(data) {
  const container = document.getElementById("employee-list");
  container.innerHTML = "";

  const grouped = { Челябинск: [], Озерск: [] };

  data.forEach(entry => {
    if (entry.id.endsWith("Ч")) {
      grouped["Челябинск"].push(entry);
    } else if (entry.id.endsWith("О")) {
      grouped["Озерск"].push(entry);
    }
  });

  for (const city in grouped) {
    const groupDiv = document.createElement("div");
    groupDiv.className = "employee-group";
    groupDiv.innerHTML = `<h3>${city}</h3>`;

    grouped[city].forEach(emp => {
      const p = document.createElement("p");
      p.textContent = `${emp.name} (${emp.id})`;
      groupDiv.appendChild(p);
    });

    container.appendChild(groupDiv);
  }
}
