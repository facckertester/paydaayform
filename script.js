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


// URL веб-приложения
const apiUrl = "https://script.google.com/macros/s/AKfycby1WOUCAWi50AMwLiuzL5o1tRNfQzpqfO6N8odlolNiba1b7Qy8i736cwS7IbQ6KlE/exec";

// Расчёт ЗП
async function calculateSalary() {
    const name = document.getElementById("salary-name").value.trim();
    const id = document.getElementById("salary-id").value.trim();
    const resultBlock = document.getElementById("salary-result");

    if (!name || !id) {
        resultBlock.innerHTML = "<p class='error'>Введите имя и ID</p>";
        return;
    }

    resultBlock.innerHTML = "<p>Загрузка...</p>";

    try {
        const res = await fetch(`${apiUrl}?action=salary&name=${encodeURIComponent(name)}&id=${encodeURIComponent(id)}`);
        const data = await res.json();

        if (!data || !data.length) {
            resultBlock.innerHTML = "<p class='error'>Данные не найдены</p>";
            return;
        }

        let totalHours = 0;
        let totalSalary = 0;

        let rows = data.map(row => {
            const date = row[0];
            const point = row[1];
            const hours = parseFloat(row[2]);
            const salary = parseFloat(row[3]);

            totalHours += hours;
            totalSalary += salary;

            return `<tr>
                <td>${date}</td>
                <td>${point}</td>
                <td>${hours}</td>
                <td>${salary}₽</td>
            </tr>`;
        }).join("");

        resultBlock.innerHTML = `
            <table class="ios-table">
              <thead>
                <tr><th>Дата</th><th>Точка</th><th>Часы</th><th>ЗП</th></tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
            <div class="summary">
              <strong>Итого:</strong><br/>
              Часы: ${totalHours}<br/>
              Зарплата: ${totalSalary}₽
            </div>
        `;
    } catch (error) {
        resultBlock.innerHTML = "<p class='error'>Ошибка при загрузке данных</p>";
    }
}

// Список сотрудников
async function loadEmployees() {
    const listBlock = document.getElementById("employee-list");
    if (!listBlock) return;

    try {
        const res = await fetch(`${apiUrl}?action=employees`);
        const data = await res.json();

        if (!data || !data.length) {
            listBlock.innerHTML = "<p class='error'>Нет данных</p>";
            return;
        }

        listBlock.innerHTML = data.map(([id, name], index) => `
            <div class="employee-item">
              <strong>${index + 1}.</strong> ${name} (ID: ${id})
            </div>
        `).join("");
    } catch (e) {
        listBlock.innerHTML = "<p class='error'>Ошибка загрузки списка</p>";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadEmployees();
});
