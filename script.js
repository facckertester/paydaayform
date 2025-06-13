
document.getElementById("workForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    timestamp: new Date().toLocaleString(),
    date: document.getElementById("date").value,
    name: document.getElementById("name").value.trim(),
    id: document.getElementById("personalId").value.trim(),
    point: document.getElementById("point").value,
    city: document.getElementById("city").value,
    hours: document.getElementById("hours").value,
    cashProfit: document.getElementById("cashProfit").value,
    cash: document.getElementById("cash").value,
    purchaseType: document.getElementById("productPurchase").value,
    purchaseAmount: document.getElementById("purchaseAmount").value,
    paymentType: document.getElementById("paymentType").value,
    comment: document.getElementById("comment").value.trim()
  };

  // Проверка обязательных полей
  for (let key in data) {
    if (key !== "comment" && !data[key]) {
      alert("Заполните все поля!");
      return;
    }
  }

  fetch("https://script.google.com/macros/s/AKfycbxzGyHsNQcFCH28DX4Q-R3XpiSo89LM24ECSmpiPUnJXoO4UI5mQfXVkh-nKl1vYriU/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });

  alert("Форма отправлена!");
  document.getElementById("workForm").reset();
  document.getElementById("formFields").style.display = "none";
});

// Пароль доступа
document.getElementById("formPassword").addEventListener("change", function () {
  if (this.value === "1234") {
    document.getElementById("formFields").style.display = "block";
  } else {
    alert("Неверный пароль!");
    this.value = "";
  }
});
