// Botón volver
document.getElementById("volver").addEventListener("click", () => {
  window.location.href = "../Pantalladeinicio/HTMLPANTALLADEINICIO.html";
});

// Teclas WASD + freno "X"
document.addEventListener("keydown", (e) => {
  const t = e.key.toLowerCase();
  if (t === "w") postEvent("movimiento", "adelante");
  if (t === "s") postEvent("movimiento", "atras");
  if (t === "a") postEvent("movimiento", "izquierda");
  if (t === "d") postEvent("movimiento", "derecha");
  if (t === "x") postEvent("movimiento", "frenar");
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
  if (!activo) return alert("Seleccioná un sensor primero");

  switch (activo.id) {
    case "Sonido":
      postEvent("medir", "sonido"); 
      break;
    case "TemperaturayHumedad":
      postEvent("medir", "temperatura"); 
      break;
    case "Presion":
      postEvent("medir", "presion"); 
      break;
    case "Luz":
      postEvent("medir", "luz"); 
      break;
  }
});

// Botón volver al inicio via SoqueTIC
document.getElementById("inicio").addEventListener("click", () => {
  postEvent("volverInicio", {});
});

// Conexión SoqueTIC
connect2Server();
