const button = document.getElementById("volver");
button.addEventListener("click", () => {
  window.location.href = "../Pantalladeinicio/HTMLPANTALLADEINICIO.html";
});

const keys = document.querySelectorAll('.key');

window.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  keys.forEach(k => {
    if (k.dataset.key === key) k.classList.add('active');
  });
});

window.addEventListener('keyup', (e) => {
  const key = e.key.toLowerCase();
  keys.forEach(k => {
    if (k.dataset.key === key) k.classList.remove('active');
  });
});


const button2 = document.getElementById("medir");
button2.addEventListener("click", () => {

});
