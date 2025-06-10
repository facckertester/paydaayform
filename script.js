
document.getElementById('loadData')?.addEventListener('click', async () => {
  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;
  const output = document.getElementById('output');

  if (!name || !id) {
    output.textContent = 'Введите имя и ID.';
    return;
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbw9xPPV685HZ92yHUpX9ht0fTXt4jWOwx10rak6ncvE7QDgzovxQmaxoDVqvz7td1Dv/exec?name=' + encodeURIComponent(name) + '&id=' + encodeURIComponent(id));
    const data = await response.json();
    output.textContent = JSON.stringify(data, null, 2);
  } catch (e) {
    output.textContent = 'Ошибка при загрузке данных.';
  }
});
