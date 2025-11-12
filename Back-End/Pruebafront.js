// 1. Iniciar la conexión al servidor (necesario en todo Frontend que use SoqueTIC)
connect2Server();

// --- FUNCIONES PARA ENVIAR COMANDOS (POST) ---

/**
 * Envía un comando de movimiento al Backend.
 * @param {string} direccion - 'adelante', 'atras', 'derecha', 'izquierda', 'frenar'.
 */
function enviarMovimiento(direccion) {
    // Usamos postEvent para enviar la dirección. El backend está suscrito a "movimiento".
    // El backend espera el objeto {direccion: ...}
    postEvent("movimiento", { direccion: direccion }, (response) => {
        // Opcional: Manejar la respuesta del Backend si retorna algo, aunque
        // en este caso el Backend no retorna nada explícito en esa función.
        console.log(`Comando de movimiento ${direccion} enviado.`);
    });
}

/**
 * Solicita una medición específica al Backend.
 * @param {string} tipo - 'temperatura', 'humedad', 'luz', 'sonido'.
 */
function solicitarMedicion(tipo) {
    // Usamos postEvent para solicitar la medición. El backend está suscrito a "medir".
    // El backend espera el objeto {Tipo: ...}
    postEvent("medir", { Tipo: tipo }, (response) => {
        console.log(`Solicitud de medición de ${tipo} enviada.`);
    });
}


// --- FUNCIÓN PARA RECIBIR DATOS EN TIEMPO REAL (REALTIME) ---

/**
 * Maneja el evento RealTime "grafico" y actualiza el valor en el DOM.
 *
 * El Backend envía: { tipo: 'RT' | 'RH' | 'RL' | 'RM', valor: 25.5 }
 * El Frontend debe buscar el elemento HTML cuyo ID coincide con el 'tipo' recibido.
 *
 * @param {Object} data - Objeto recibido del Backend con el tipo y el valor.
 */
function recibirDatosGrafico(data) {
    const { tipo, valor } = data; // Desestructura el objeto {tipo, valor}

    // El 'tipo' (ej: 'RT') coincide directamente con el ID del elemento <span> en el HTML.
    const elemento = document.getElementById(tipo);

    if (elemento) {
        elemento.innerText = valor;
        console.log(`Dato recibido: ${tipo} = ${valor}`);

        // Opcional: Añadir alguna unidad si el tipo lo requiere
        // if (tipo === 'RT') { elemento.innerText += ' °C'; }
    } else {
        console.warn(`Tipo de medición desconocida recibida: ${tipo}`);
    }
}

// 2. Suscribirse al evento de tiempo real que emite el Backend
// El Backend emite realTimeEvent("grafico", {...}), por lo tanto, el Frontend se suscribe a "grafico".
subscribeRealTimeEvent("grafico", recibirDatosGrafico);
