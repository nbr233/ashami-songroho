const openFormBtn = document.getElementById('openForm');
const popup = document.getElementById('popupForm');
const closeForm = document.getElementById('closeForm');
const form = document.getElementById('ashamiForm');
const gridList = document.getElementById('gridList');

function toBanglaNumber(num) {
  const banglaDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  return num.toString().split('').map(d => banglaDigits[parseInt(d)]).join('');
}

window.onload = function () {
  const saved = JSON.parse(localStorage.getItem('ashamiList')) || [];
  saved.forEach(data => addCard(data.name, data.batch, data.photo, data.number));
};

let lastNumber = JSON.parse(localStorage.getItem('lastNumber')) || 0;

openFormBtn.addEventListener('click', () => popup.classList.add('show'));
closeForm.addEventListener('click', () => popup.classList.remove('show'));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const batch = document.getElementById('batch').value.trim();
  const photo = document.getElementById('photo').files[0];

  const oldData = JSON.parse(localStorage.getItem('ashamiList')) || [];
  const duplicate = oldData.find(item => item.name.toLowerCase() === name.toLowerCase());
  if (duplicate) { alert("এই নাম আগে থেকেই আছে! 😅"); return; }

  const reader = new FileReader();
  reader.onload = function (e) {
    lastNumber++;
    localStorage.setItem('lastNumber', lastNumber);
    const photoURL = e.target.result;

    addCard(name, batch, photoURL, lastNumber);

    oldData.push({ name, batch, photo: photoURL, number: lastNumber });
    localStorage.setItem('ashamiList', JSON.stringify(oldData));

    form.reset();
    popup.classList.remove('show');
  };
  reader.readAsDataURL(photo);
});

function addCard(name, batch, photo, number) {
  const card = document.createElement('div');
  card.className = 'student-card';
  card.innerHTML = `
    <img src="${photo}" alt="Pasami">
    <div class="student-info">
      <h3>নামঃ ${name}</h3>
      <p>ব্যাচঃ ${batch}</p>
    </div>
    <div class="ashami-num-container">
      <div class="ashami-num-label">পাসামী নম্বর</div>
      <div class="ashami-num">${toBanglaNumber(number)}</div>
    </div>
  `;
  gridList.appendChild(card);
}
