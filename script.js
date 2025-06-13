
function checkPassword() {
  const pw = document.getElementById('password').value;
  if (pw === "1234") {
    document.getElementById('main-form').style.display = 'block';
  } else {
    alert("Неверный пароль");
  }
}

function submitForm(e) {
  e.preventDefault();
  const form = e.target;
  const data = {
    timestamp: new Date().toLocaleString("ru-RU"),
    date: form.date.value,
    name: form.name.value.trim(),
    id: form.id.value.trim(),
    point: form.point.value,
    city: form.city.value,
    hours: form.hours.value,
    profit: form.profit.value,
    cash: form.cash.value,
    purchase: form.purchase.value,
    purchase_sum: form.purchase_sum.value,
    payment: form.payment.value,
    comment: form.comment.value || ""
  };

  fetch("https://script.google.com/macros/s/AKfycbxzGyHsNQcFCH28DX4Q-R3XpiSo89LM24ECSmpiPUnJXoO4UI5mQfXVkh-nKl1vYriU/exec", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  alert("Форма отправлена!");
  form.reset();
  form.style.display = "none";
}
