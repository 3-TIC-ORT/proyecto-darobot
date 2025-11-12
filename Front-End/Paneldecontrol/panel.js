// Botón volver
document.getElementById("volver").addEventListener("click", () => {
  window.location.href = "../Pantalladeinicio/HTMLPANTALLADEINICIO.html";
});

document.getElementById("como-funciona").addEventListener("click", () => {
  window.location.href = "../tutorial/tutorial.html";
});

// Teclas WASD + freno "X"
document.addEventListener("keydown", (e) => {
  const t = e.key.toLowerCase();
  if (t === "w") console.log("Adelante");
  if (t === "s") console.log("Atrás");
  if (t === "a") console.log("Izquierda");
  if (t === "d") console.log("Derecha");
  if (t === "x") console.log("Frenar");
});

// Colorear teclas al presionar
document.addEventListener("keydown", (e) => {
  const t = e.key.toLowerCase();
  const keyDiv = document.querySelector(`.key[data-key="${t}"], .btn-stop[data-key="${t}"]`);
  if (keyDiv && !keyDiv.classList.contains("active")) {
    keyDiv.classList.add("active");
  }
});

// Sacar color al soltar
document.addEventListener("keyup", (e) => {
  const t = e.key.toLowerCase();
  const keyDiv = document.querySelector(`.key[data-key="${t}"], .btn-stop[data-key="${t}"]`);
  if (keyDiv) keyDiv.classList.remove("active");
});

// Click en teclas
document.querySelectorAll(".key, .btn-stop").forEach(key => {
  key.addEventListener("click", () => {
    const tecla = key.getAttribute("data-key");
    console.log("Click en tecla:", tecla);
    key.classList.add("active");
    setTimeout(() => key.classList.remove("active"), 200);
  });
});

// Selección de sensores (solo uno activo)
const sensores = document.querySelectorAll(".botonera button");
sensores.forEach(btn => {
  btn.addEventListener("click", () => {
    sensores.forEach(b => b.classList.remove("activo"));
    btn.classList.add("activo");
  });
});

// Enviar sensor al backend al medir
document.getElementById("medir").addEventListener("click", () => {
  const activo = document.querySelector(".botonera button.activo");
  if (!activo) {
    alert("Seleccioná un sensor primero");
    return;
  }

  console.log("Midiendo con sensor:", activo.id);

  // Desmarcar el botón
  activo.classList.remove("activo");
  activo.blur();
});
