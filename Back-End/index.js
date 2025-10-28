import { ReadlineParser, SerialPort } from 'serialport';
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
import fs from "fs";
// Create a port
const port = new SerialPort({
  path: 'COM5',
  baudRate: 9600,
})
 
port.on("open",()=>{
    console.log("Hola")
    //Borrar el setInterval-Lo unico importante es la funcion
})

//Conexion con Hardware
function enviarAArduino(mandar){
    port.write(mandar.toString() + "\n")
} // Enviar info al arduino
 function medicion(Tipo){
  if (Tipo === "humedad") {
    enviarAArduino("RH")
  };
  if (Tipo === "temperatura") {
    enviarAArduino("RT")
  };

  if (Tipo === "luz") {
    enviarAArduino("RL")
  };
  if (Tipo === "sonido") {
    enviarAArduino("RM")
  };
 };
subscribePOSTEvent("medir", medicion)

const lectura = port.pipe(new ReadlineParser({ delimiter: '\r\n' })) //Leer info de arduino
lectura.on('data', (data) => {
  // Aca va todo el HW
  let ledOn = data.trim() === "on";
  let tipo = substring(0 <= 2) 
  let valor = substring(2 <= 1000)
  realTimeEvent("boton", {tipo,valor});
    let devolucion = JSON.stringify(data, null, 2);
    fs.writeFileSync("Back-End/datos.json", devolucion);
    return {ok:true};
});


startServer()



