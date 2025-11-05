import { ReadlineParser, SerialPort } from 'serialport';
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
import fs from "fs";
// Create a port
const port = new SerialPort({
  path: 'COM3',
  baudRate: 9600,
});
 
// Levanta todos los elementos del DOM que se van a usar
const form = document.getElementById("form");
const input = document.getElementById("input");
const a = document.getElementById("a"); // El párrafo donde se mostrará la respuesta

// 1. Conecta al servidor (IMPORTANTE: Esto debe hacerse primero)
connect2Server(); // Usa el puerto 3000 por defecto (Source 3)

/**
 * Función manejadora que se llama cuando el backend responde al postEvent.
 *
 * @param {Object} data - El objeto de datos retornado por el backend.
 * @param {string} data.msg - El mensaje de confirmación que devuelve el backend.
 */
function messageResponseHandler(data) {
    // Actualiza el contenido del párrafo (id="a") con el texto recibido.
    a.innerHTML = data.msg;
}

// 2. Define el manejador para el envío del formulario (al presionar el botón)
form.addEventListener("submit", (e) => {
    // Previene el comportamiento por defecto del formulario (evita la recarga de la página)
    e.preventDefault();

    // Verifica si hay algo escrito en el input
    if (input.value) {

        // Ejecuta postEvent para enviar la información al backend.
        // TIPO: "message" (Debe coincidir con la suscripción del backend)
        // DATA: { msg: input.value } (El contenido del input)
        // CALLBACK: messageResponseHandler (La función que maneja la respuesta)
        postEvent("message", { msg: input.value }, messageResponseHandler);

        // Limpia el campo de entrada después del envío
        input.value = "";
    }
});