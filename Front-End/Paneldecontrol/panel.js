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


const botones = document.querySelectorAll(".botonera button");

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    if (boton.classList.contains("activo")) {
      boton.classList.remove("activo");
    } else {
      botones.forEach(b => b.classList.remove("activo"));
      boton.classList.add("activo");
    }
  });
});


let port;
let writer;

const validKeys = ["w", "a", "s", "d"];

// Conectar Arduino
document.getElementById("connect").addEventListener("click", async () => {
  try {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    writer = port.writable.getWriter();
    alert("✅ Arduino conectado correctamente");
  } catch (err) {
    alert("❌ Error al conectar: " + err);
  }
});

// Enviar comando al Arduino
async function sendCommand(key) {
  if (!writer) {
    console.warn("⚠️ Arduino no conectado");
    return;
  }

  if (validKeys.includes(key)) {
    await writer.write(new TextEncoder().encode(key));
    console.log("Enviado:", key);
  }
}

// Detectar teclas del teclado
document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const button = document.querySelector(`.key[data-key="${key}"]`);

  if (validKeys.includes(key)) {
    sendCommand(key);
    if (button) button.classList.add("active");
  }
});

document.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  const button = document.querySelector(`.key[data-key="${key}"]`);
  if (button) button.classList.remove("active");
});

// Detectar clics en los botones visuales
document.querySelectorAll(".key").forEach((btn) => {
  btn.addEventListener("mousedown", () => {
    const key = btn.dataset.key;
    sendCommand(key);
    btn.classList.add("active");
  });

  btn.addEventListener("mouseup", () => {
    btn.classList.remove("active");
  });
});