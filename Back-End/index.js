import { SerialPort } from 'serialport'

// Create a port
const port = new SerialPort({
  path: 'COM5',
  baudRate: 9600,
})
 
port.on("open",()=>{
    console.log("Hola")
})

function enviarAArduino(mandar){
    port.write(mandar.toString())

} // Enviar info al arduino

enviarAArduino(1)

function medir(medir){
const lectura = port.pipe(new ReadlineParser({ delimiter: '\r\n' })) //Leer info de arduino
return lectura.on('data', console.log);
}

subscribeGETEvent("", )
subscribePOSTEvent("medir", medir );
startServer(3000, true);


