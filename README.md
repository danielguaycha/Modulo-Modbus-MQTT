# Modbus TCP Module

Cliente Modbus TCP, usando Node.js, proyecto iniciado y destinado a la aplicación en (IOT) Internet de las cosas, incluye un modulo de MQTT para envio de datos a un broker (Mosquitto).

## Servidor Modbus
El servidor modbus empleado en este módulo es un dispositivo de la Empresa [ABB](http://www.abb.com.ec/), espeficamente el analizador de red [M2M NetWork Analyser](https://new.abb.com/products/2CSG299893R4052/m2m-modbus-network-analyser),  mediante el cual se puede obtener la información, darle un formato especifico (JSON) para el envio a un servidor (VPS, Servidor dedicado) con un Broker MQTT (Mosquitto) en una red LAN.

## Integración
Las dependencias del proyecto las puedes encontrar en el `package.json`, sin embargo no todas se usó, se incluyerón unas para pruebas, a continuación te listo las que están activas.

* Node.js
    * Express
    * Mqtt
    * Node-modbus

## Función del proyecto
1. Leer los datos del servidor modbus, como se dijo del dispositivo ABB.
2. Formatear los datos a JSON.
3. Enviar por Mqtt al servidor (Mosquitto Broker).

## Especificaciones
* `device.js`: Se configuran los dispositivos tanto modbus como el cliente mqtt.
* `functions.js`: Incluye funciones para formatear el mensaje que viene del servidor modbus.
* `modbus.js`: Es el archivo principal, alli se encuentran las conecciones tanto a MQTT Broker como Modbus
* `mqtt.js`: Esta la lógica para la conexión al servidor mosquitto u otro broker. 
    * Aqui se evidencia dos topics a los cuales se publica, es asi debido a que al topic `.../configuracion/` se envia una configuración del dispositivo modbus inicial, que posteriormente es procesado por el Broker, además un topic `.../lecturas/` donde se envian las lecturas que se toma desde el dispositivo modbus.

## Ejemplo de lectura Modbus
Array que se extrae desde el dispositivo ABB, este se puede interpretar con el mapa de memoria que se encuentra en la [documentación](https://search-ext.abb.com/library/Download.aspx?DocumentID=9AKK107045A7748&LanguageCode=en&DocumentPartId=&Action=Launch) oficial.

````js
let lectura_modbus = [ 0, 221, 0, 126, 0, 129, 0, 127, 0, 222, 0, 222, 0, 220, 0, 22800, 0, 34400, 0, 17600, 0, 17200, 65535, 64602, 65535, 64544, 0, 874, 65535, 64662, 65535, 64602, 65535, 64544, 0, 874, 65535, 64662, 0, 8760, 0, 4320, 0, 2240, 0, 2160, 0, 8200, 0, 4280, 0, 1960, 0, 1880, 65535, 65016, 65535, 64936, 0, 1080, 65535, 64456, 3, 24324, 1, 23120 ];
````
