module.exports = {
    /**
     * Array de Configuración para los dispositivos que enviarán datos por mqtt
     * @Intrucciones:
     *    - Numerar en orden ascendente los dispositivos.
     * */
    MqttDevices: {
        "0" : {
            "nombre":"Lab. Mac Edificio 1",
            "mac":"00:1E:C0:CC:9C:BD",
            "empresa":"070000000001",
            "localizacion":"(00,-00)",
            "descripcion":"ABB Network Analyser - Modbus",	//fabricante, tecnologia, etc
            "datos":[
                {
                    "categoria":"s",		//s=sensor o a=actuador
                    "senial":"d",			//a=analogico o d=digital
                    "ted_id":"40.1",		//ted de plantilla sensor-fabricante
                    "interfaz":"outd1"		//ubicacion del sensor-actuador(in/out) en el mote
                },
                { "categoria": 's', "senial": 'd', "ted_id": '40.2', "interfaz": 'outd2' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.3', "interfaz": 'outd3' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.4', "interfaz": 'outd4' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.5', "interfaz": 'outd5' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.6', "interfaz": 'outd6' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.7', "interfaz": 'outd7' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.8', "interfaz": 'outd8' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.9', "interfaz": 'outd9' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.10', "interfaz": 'outd10' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.11', "interfaz": 'outd11' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.12', "interfaz": 'outd12' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.13', "interfaz": 'outd13' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.14', "interfaz": 'outd14' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.15', "interfaz": 'outd15' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.16', "interfaz": 'outd16' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.17', "interfaz": 'outd17' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.18', "interfaz": 'outd18' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.19', "interfaz": 'outd19' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.20', "interfaz": 'outd20' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.21', "interfaz": 'outd21' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.22', "interfaz": 'outd22' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.23', "interfaz": 'outd23' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.24', "interfaz": 'outd24' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.25', "interfaz": 'outd25' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.26', "interfaz": 'outd26' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.27', "interfaz": 'outd27' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.28', "interfaz": 'outd28' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.29', "interfaz": 'outd29' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.30', "interfaz": 'outd30' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.31', "interfaz": 'outd31' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.32', "interfaz": 'outd32' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.33', "interfaz": 'outd33' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.34', "interfaz": 'outd34' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.35', "interfaz": 'outd35' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.36', "interfaz": 'outd36' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.37', "interfaz": 'outd37' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.38', "interfaz": 'outd38' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.39', "interfaz": 'outd39' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.40', "interfaz": 'outd40' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.41', "interfaz": 'outd41' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.42', "interfaz": 'outd42' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.43', "interfaz": 'outd43' },
                { "categoria": 's', "senial": 'd', "ted_id": '40.44', "interfaz": 'outd44' },
            ]
        },
        /*
        "1": {

        },
        "2": {

        }
        */
    },

    /**
     * Array de configuracion de los dispositivos ABB
     * @unidId: codigo desde 30 en adelante
     **/
    ModBusDevices: {
        "0": {
            'host': '192.168.0.102', /* IP or name of server host */
            'mac': '00:1E:C0:CC:9C:BD',
            'port': 502,
            'unitId': 31,
            'timeout': 2000, /* 2 sec */
            'autoReconnect': true, /* reconnect on connection is lost */
            'reconnectTimeout': 15000, /* wait 15 sec if auto reconnect fails to often */
            'logLabel' : 'Lab Mac Edificio 1', /* label to identify in log files */
            'logLevel': 'debug', /* for less log use: info, warn or error */
            'logEnabled': false,
        },
        /*
        "1":{

        },
        "2":{

        }*/
    }
};
