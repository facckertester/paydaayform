document.getElementById("checkPassword").onclick = function () {
    const pwd = document.getElementById("formPassword").value;
    if (pwd === "1234") {
        document.getElementById("formPassword").parentElement.style.display = "none";
        document.getElementById("formFields").classList.remove("hidden");
    } else {
        alert("Неверный пароль");
    }
};

document.getElementById("reportForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const submitButton = document.querySelector("#reportForm button[type='submit']");
    if (!submitButton) return;

    const data = {
        timestamp: new Date().toLocaleString(),
        date: document.getElementById("date").value,
        name: document.getElementById("name").value,
        id: document.getElementById("id").value,
        location: document.getElementById("location").value,
        city: document.getElementById("city").value,
        hours: document.getElementById("hours").value,
        profit: document.getElementById("profit").value,
        cash: document.getElementById("cash").value,
        purchase: document.getElementById("purchase").value,
        purchaseAmount: document.getElementById("purchaseAmount").value,
        paytype: document.getElementById("paytype").value,
        comment: document.getElementById("comment").value,
    };
console.log("ETO PERED RETURN");
    for (let key in data) {
        if (key !== "comment" && (!data[key] || data[key] === "")) {
            alert("Заполните все поля");
            return;
        }
    }
console.log("ETO PERED BLOKOM KNOPKI");
    // Блокируем кнопку
    submitButton.disabled = true;
    const originalText = submitButton.textContent;
    submitButton.textContent = "Отправка...";

    fetch("https://script.google.com/macros/s/AKfycbyf6mg8jktMkiDubYhfLrTNInV0XWF3Kph-0i2G7yj8uu7z-uKjXK378h4RfexV3O8W/exec", {
        method: "POST",
        body: JSON.stringify(data),
    })
    .then((res) => res.text())
    .then(() => {
        alert("Форма успешно отправлена!");
        document.getElementById("reportForm").reset();
    })
    .catch((err) => {
        alert("Ошибка отправки: " + err);
    })
    .finally(() => {
        // Разблокируем кнопку
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    });
});

// Подсказки (!)
document.querySelectorAll('.tooltip-icon').forEach((icon) => {
    icon.setAttribute('tabindex', '-1');

    icon.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();

        document.querySelectorAll('.tooltip-icon').forEach((el) => {
            if (el !== icon) el.classList.remove('show-tooltip');
        });

        icon.classList.toggle('show-tooltip');
    });
});

document.addEventListener('click', () => {
    document.querySelectorAll('.tooltip-icon').forEach((icon) => {
        icon.classList.remove('show-tooltip');
    });
});
