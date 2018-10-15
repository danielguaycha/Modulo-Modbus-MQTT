const mqtt = require('mqtt');
let clientMQTT  = null;

module.exports = {
    /**
     * @url-example: mqtt://m11.cloudmqtt.com:12044
     * @user-example: etneidhu
     * @password-example: jyCxSAYejZQx
     * **/

    connectToMqtt: function(url, user, password){
        clientMQTT = mqtt.connect(url, {username: user, password: password })
    },
    installDevices :function (devices) {
        for (let xa in devices){
            clientMQTT.publish("/iotmach/configuracion/", JSON.stringify(devices[xa]));
        }
    },
    sendMqttData: function (arrayData) {
        setTimeout(() => {
            clientMQTT.publish("/iotmach/lecturas/", JSON.stringify(arrayData));
        }, 500);
    },
    sendMqttObject: function (objectData) {
        for(let a in objectData){
            clientMQTT.publish("/iotmach/lecturas/", JSON.stringify(objectData[a]));
        }
    }
};