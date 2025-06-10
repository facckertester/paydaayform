
const apiUrl = "https://script.google.com/macros/s/AKfycbw9xPPV685HZ92yHUpX9ht0fTXt4jWOwx10rak6ncvE7QDgzovxQmaxoDVqvz7td1Dv/exec";

document.querySelectorAll('.theme-button').forEach(btn=>{
  btn.onclick = () => {
    document.body.className = btn.dataset.theme;
    localStorage.theme = btn.dataset.theme;
  };
});
document.querySelectorAll('.font-button').forEach(btn=>{
  btn.onclick = () => {
    document.body.classList.remove('font-xs','font-sm','font-md','font-lg','font-xl');
    document.body.classList.add('font-'+btn.dataset.size);
    localStorage.font = btn.dataset.size;
    document.querySelectorAll('.font-button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  };
});
window.addEventListener('load', ()=>{
  if (localStorage.theme) document.body.className = localStorage.theme;
  if (localStorage.font){
    document.body.classList.add('font-'+localStorage.font);
    document.querySelector(`.font-button[data-size="${localStorage.font}"]`).classList.add('active');
  } else {
    document.body.classList.add('font-md');
  }
});

document.getElementById('loadBtn').onclick = async ()=>{
  const name = document.getElementById('name').value.trim();
  const id = document.getElementById('id').value.trim();
  if (!name||!id) return alert('Введите и имя, и ID');

  let res = await fetch(`${apiUrl}?name=${encodeURIComponent(name)}&id=${encodeURIComponent(id)}`);
  let d = await res.json();

  let sum = d.totalHours, sal = d.totalSalary, pts=d.pointSummary||{}, ach=d.achievements||[];

  document.querySelector('.summary').innerHTML =
    `<div>⏱ Часы: ${sum}</div>
     <div>💰 Касса: ${sal} ₽</div>`;

  let pTab = document.querySelector('.points-table tbody');
  pTab.innerHTML = '';
  Object.entries(pts).map(([k,v])=>{
    let r = document.createElement('tr');
    r.innerHTML=`<td>${k}</td><td>${v}</td>`;
    pTab.appendChild(r);
  });

  let dTab = document.querySelector('.dates-table tbody');
  dTab.innerHTML = '';
  (d.byDates||[]).forEach(rarr=>{
    let r = document.createElement('tr');
    r.innerHTML = rarr.map(x=>`<td>${x}</td>`).join('');
    dTab.appendChild(r);
  });

  let achDiv = document.getElementById('achievements');
  achDiv.innerHTML = '';
  ach.forEach(a=>{
    let el = document.createElement('div');
    el.className='ach-item';
    el.innerText=a.title;
    el.dataset.desc=a.description;
    achDiv.appendChild(el);
  });
};
