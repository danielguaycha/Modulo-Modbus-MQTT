let express = require('express');
let app = express();

let fn = require('./functions');
let dev = require('./device');
let mqtt = require('./mqtt');
let modbus = require('node-modbus');
let medidas = [];

mqtt.connectToMqtt("mqtt://m11.cloudmqtt.com:12044","etneidhu","jyCxSAYejZQx");
//mqtt.connectToMqtt("mqtt://localhost","","");
mqtt.installDevices(dev.MqttDevices);

const client_mac_lab = modbus.client.tcp.complete(dev.ModBusDevices[0]);
client_mac_lab.connect();
client_mac_lab.on('connect', function () {
    setInterval( function () {
        client_mac_lab.readHoldingRegisters(0x1000, 66).then((response) => {
            if(response.register.length>0 || response.register!== undefined) {
                let objmqtt = fn.createObjectData(response.register, dev.MqttDevices["0"], 5);
                mqtt.sendMqttObject(objmqtt);
                medidas[0] = objmqtt;
            }
        });
    }, 1000);
});



//let array = [ 0, 221, 0, 126, 0, 129, 0, 127, 0, 222, 0, 222, 0, 220, 0, 22800, 0, 34400, 0, 17600, 0, 17200, 65535, 64602, 65535, 64544, 0, 874, 65535, 64662, 65535, 64602, 65535, 64544, 0, 874, 65535, 64662, 0, 8760, 0, 4320, 0, 2240, 0, 2160, 0, 8200, 0, 4280, 0, 1960, 0, 1880, 65535, 65016, 65535, 64936, 0, 1080, 65535, 64456, 3, 24324, 1, 23120 ];
//let arr = fn.createObjectData(array,dev.MqttDevices["0"],5);
//mqtt.sendMqttObject(arr);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    setTimeout(() => {
        //res.send(JSON.stringify(medidas[0]));
        res.send(JSON.stringify(medidas));
    }, 100);
});