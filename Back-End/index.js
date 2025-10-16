import { SerialPort } from 'serialport';
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";

// Create a port
const port = new SerialPort({
  path: 'COM5',
  baudRate: 9600,
})
 
port.on("open",()=>{
    console.log("Hola")
})
//Conexion con Hardware
function enviarAArduino(mandar){
    port.write(mandar.toString())
} // Enviar info al arduino
enviarAArduino(1)
subscribeGETEvent("medir",(data) => {
  if(data === true){
    medir()
  }
})

function medir(){
const lectura = port.pipe(new ReadlineParser({ delimiter: '\r\n' })) //Leer info de arduino
const recibirdatos = lectura.on('data', console.log);
return recibirdatos
}

startServer()



