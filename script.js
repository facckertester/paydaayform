
async function fetchData() {
  const name = document.getElementById("name").value;
  const id = document.getElementById("id").value;

  if (!name || !id) {
    alert("Пожалуйста, введите имя и ID.");
    return;
  }

  const response = await fetch("https://script.google.com/macros/s/AKfycbw9xPPV685HZ92yHUpX9ht0fTXt4jWOwx10rak6ncvE7QDgzovxQmaxoDVqvz7td1Dv/exec", {
    method: "POST",
    body: JSON.stringify({ name, id }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await response.text();
  document.getElementById("result").innerHTML = data;
}
