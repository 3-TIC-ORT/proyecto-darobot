import { ReadlineParser, SerialPort } from 'serialport';
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";

// Create a port
const port = new SerialPort({
  path: 'COM5',
  baudRate: 9600,
})
 
port.on("open",()=>{
    console.log("Hola")
   setInterval(() => enviarAArduino(1),1000) //Borrar el setInterval-Lo unico importante es la funcion
})
//Conexion con Hardware
function enviarAArduino(mandar){
    port.write(mandar.toString() + "\n")
} // Enviar info al arduino

subscribeGETEvent("medir",(data) => {
  if(data === true){
    medir()
  }
})

const lectura = port.pipe(new ReadlineParser({ delimiter: '\r\n' })) //Leer info de arduino
lectura.on('data', (data) => console.log(data));



//subscribePOSTEvent("grafico", medir)
startServer()



