// 1. CONECTAR AL SERVIDOR
connect2Server();

// 2. BOTONES DE NAVEGACIÓN
document.getElementById("volver").addEventListener("click", () => {
  window.location.href = "../Pantalladeinicio/HTMLPANTALLADEINICIO.html";
});

document.getElementById("como-funciona").addEventListener("click", () => {
  window.location.href = "../tutorial/tutorial.html";
});

// 3. MOVIMIENTOS CON TECLADO - USANDO postEvent
document.addEventListener("keydown", (e) => {
  const tecla = e.key.toLowerCase();
  
  if (tecla === "w") {
    postEvent("movimiento", { direccion: "adelante" });
  }
  if (tecla === "s") {
    postEvent("movimiento", { direccion: "atras" });
  }
  if (tecla === "a") {
    postEvent("movimiento", { direccion: "izquierda" });
  }
  if (tecla === "d") {
    postEvent("movimiento", { direccion: "derecha" });
  }
  if (tecla === "x") {
    postEvent("movimiento", { direccion: "frenar" });
  }
});

// 4. MOVIMIENTOS CON CLICK - USANDO postEvent
document.querySelectorAll(".key, .btn-stop").forEach(boton => {
  boton.addEventListener("click", () => {
    const tecla = boton.getAttribute("data-key");
    
    if (tecla === "w") {
      postEvent("movimiento", { direccion: "adelante" });
    }
    if (tecla === "s") {
      postEvent("movimiento", { direccion: "atras" });
    }
    if (tecla === "a") {
      postEvent("movimiento", { direccion: "izquierda" });
    }
    if (tecla === "d") {
      postEvent("movimiento", { direccion: "derecha" });
    }
    if (tecla === "x") {
      postEvent("movimiento", { direccion: "frenar" });
    }
    
    // Efecto visual
    boton.classList.add("active");
    setTimeout(() => boton.classList.remove("active"), 200);
  });
});

// 5. EFECTOS VISUALES TECLADO
document.addEventListener("keydown", (e) => {
  const tecla = e.key.toLowerCase();
  const boton = document.querySelector(`[data-key="${tecla}"]`);
  if (boton) {
    boton.classList.add("active");
  }
});

document.addEventListener("keyup", (e) => {
  const tecla = e.key.toLowerCase();
  const boton = document.querySelector(`[data-key="${tecla}"]`);
  if (boton) {
    boton.classList.remove("active");
  }
});

// 6. SELECCIÓN DE SENSORES
const botonesSensores = document.querySelectorAll(".botonera button");
botonesSensores.forEach(boton => {
  boton.addEventListener("click", () => {
    // Quitar activo de todos
    botonesSensores.forEach(b => b.classList.remove("activo"));
    // Activar el clickeado
    boton.classList.add("activo");
  });
});

// 7. BOTÓN MEDIR - USANDO postEvent
document.getElementById("medir").addEventListener("click", () => {
  const sensorActivo = document.querySelector(".botonera button.activo");
  
  if (!sensorActivo) {
    alert("Por favor, seleccioná un sensor primero");
    return;
  }
  
  // Mapear ID del botón al tipo que espera el backend
  let tipoMedicion;
  const idBoton = sensorActivo.id;
  
  if (idBoton === "Sonido") {
    tipoMedicion = "sonido";
  } else if (idBoton === "TemperaturayHumedad") {
    tipoMedicion = "temperatura";
  } else if (idBoton === "Presion") {
    tipoMedicion = "presion";
  } else if (idBoton === "Luz") {
    tipoMedicion = "luz";
  }
  
  console.log("Enviando medición:", tipoMedicion);
  
  // ENVIAR AL BACKEND usando postEvent
  postEvent("medir", { Tipo: tipoMedicion }, (respuesta) => {
    console.log("Respuesta del backend:", respuesta);
  });
  
  // Desactivar el sensor después de medir
  sensorActivo.classList.remove("activo");
});