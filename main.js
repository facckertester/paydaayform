document.getElementById('loadBtn').addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const id = document.getElementById('id').value.trim();
  if (!name || !id) {
    alert('Введите имя и ID');
    return;
  }

  fetch(`https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbzTrHMUEFzi5n_ONfDjj40GWo3VNmbKwxJK0eEqpNloYPWwTvDYOkGHGH83Zza67Ekk/exec/exec?name=${encodeURIComponent(name)}&id=${encodeURIComponent(id)}`)
    .then(res => res.json())
    .then(data => {
      if (!data.totalHours) throw new Error('Данные не найдены');
      renderSummary(data);
      renderTable('byPointsTable', data.byPoints);
      renderTable('byDatesTable', data.byDates);
      renderAchievements(data.achievements);
    })
    .catch(err => alert(err.message));
});

function renderSummary(d) {
  document.getElementById('summary').innerHTML = `
    <div>⏱ Часы: ${d.totalHours}</div>
    <div>💰 Зарплата: ${d.totalSalary} ₽</div>
    <div>📉 Штрафы: ${d.totalPenalty} ₽</div>
    <div>🟢 Итого: ${d.totalNet} ₽</div>
  `;
}

function renderTable(id, rows) {
  const tbody = document.querySelector(`#${id} tbody`);
  tbody.innerHTML = '';
  rows.forEach(r => {
    const tr = document.createElement('tr');
    r.forEach(c => tr.appendChild(Object.assign(document.createElement('td'), { textContent: c })));
    tbody.appendChild(tr);
  });
}

function renderAchievements(list) {
  const div = document.getElementById('achievements');
  div.innerHTML = '';
  list.forEach(a => {
    const el = document.createElement('div');
    el.className = 'achievement-icon active';
    el.textContent = a.title;
    el.title = a.description;
    div.appendChild(el);
  });
}
