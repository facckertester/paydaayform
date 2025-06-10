function fetchData() {
  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = 'Загрузка...';

  fetch('https://script.google.com/macros/s/AKfycbw9xPPV685HZ92yHUpX9ht0fTXt4jWOwx10rak6ncvE7QDgzovxQmaxoDVqvz7td1Dv/exec?name=' + name + '&id=' + id)
    .then(response => response.text())
    .then(data => {
      resultDiv.innerHTML = data;
    })
    .catch(err => {
      resultDiv.innerHTML = 'Ошибка загрузки';
      console.error(err);
    });
}
