/**
 * Abb Mapa de memoria */
const memory_map = [
    "3-PHASE SYSTEM VOLTAGE",
    "PHASE VOLTAGE L1-N",
    "PHASE VOLTAGE L2-N",
    "PHASE VOLTAGE L3-N",
    "LINE VOLTAGE L1-2",
    "LINE VOLTAGE L2-3",
    "LINE VOLTAGE L3-1",
    "3-PHASE SYSTEM CURRENT",
    "LINE CURRENT L1",
    "LINE CURRENT L2",
    "LINE CURRENT L3",
    "3-PHASE SYS. POWER FACTOR",
    "POWER FACTOR L1",
    "POWER FACTOR L2",
    "POWER FACTOR L3",
    "3-PHASE SYSTEM COS",
    "PHASE COS 1",
    "PHASE COS 2",
    "PHASE COS 3",
    "3-PHASE S. APPARENT POWER",
    "APPARENT POWER L1",
    "APPARENT POWER L2",
    "APPARENT POWER L3",
    "3-PHASE SYS. ACTIVE POWER",
    "ACTIVE POWER L1",
    "ACTIVE POWER L2",
    "ACTIVE POWER L3",
    "3-PHASE S. REACTIVE POWER",
    "REACTIVE POWER L1",
    "REACTIVE POWER L2",
    "REACTIVE POWER L3",
    "3-PHASE SYS. ACTIVE ENERGY",
    "3-PHASE S. REACTIVE ENERGY",
    "FREQUENCY",
    "MAX LINE CURRENT L1",
    "MAX LINE CURRENT L2",
    "MAX LINE CURRENT L3",
    "MAX 3-PHASE SYS. ACTIVE POWER",
    "MAX 3-PHASE S. APPARENT POWER",
    "3-PHASE SYS. ACTIVE POWER 15’ AVER",
    "3-PHASE SYS. APPARENT POWER 15’ AVER",
    "ACTIVE ENERGY L1",
    "ACTIVE ENERGY L2",
    "ACTIVE ENERGY L3",
    "REACTIVE ENERGY L1",
    "REACTIVE ENERGY L2",
    "REACTIVE ENERGY L3",
    "MAX 3-PHASE SYS. ACTIVE POWER 15’ AVER ",
    "VOLTAGE THD% L1 (NORMAL VISUALISATION) IV",
    "VOLTAGE THD% L2 (NORMAL VISUALISATION) IV",
    "VOLTAGE THD% L3 (NORMAL VISUALISATION) IV",
    "CURRENT THD% L1 (NORMAL VISUALISATION) IV",
    "CURRENT THD% L2 (NORMAL VISUALISATION) IV",
    "CURRENT THD% L3 (NORMAL VISUALISATION) IV",
    "MAX ACTIVE POWER 15’ AVER L1",
    "MAX ACTIVE POWER 15’ AVER L2",
    "MAX ACTIVE POWER 15’ AVER L3",
    "MAX 3-PHASE SYS. APPARENT POWER 15’ AVER",
    "MAX APPARERENT POWER 15’ AVER L1",
    "MAX APPARERENT POWER 15’ AVER L2",
    "MAX APPARERENT POWER 15’ AVER L3",
    "AVER. ACTIVE POWER from PULSES INPUT (CH1)",
    "AVER. ACTIVE POWER from PULSES INPUT (CH2)",
    "ACTIVE ENERGY from PULSES INPUT (CH1)",
    "REACTIVE ENERGY from PULSES INPUT (CH2)",
    "CURRENT THRESHOLD for TIMER-2 ACTIVATION",
    "3-PHASE SYS. APPARENT ENERGY",
    "APPARENT ENERGY L1",
    "APPARENT ENERGY L2",
    "APPARENT ENERGY L3",
    "3-PHASE SYS. GENERATED ACTIVE ENERGY",
    "GENERATED ACTIVE ENERGY L1",
    "GENERATED ACTIVE ENERGY L2",
    "GENERATED ACTIVE ENERGY L3",
    "3-PHASE S. GENERATED REACTIVE ENERGY",
    "GENERATED REACTIVE ENERGY L1",
    "GENERATED REACTIVE ENERGY L2",
    "GENERATED REACTIVE ENERGY L3",
    "3-PHASE S. GENERATED APPARENT ENERGY",
    "GENERATED APPARENT ENERGY L1",
    "GENERATED APPARENT ENERGY L2",
    "GENERATED APPARENT ENERGY L3",
    "CURRENT TRANSFORM RATIO (CT)",
    "VOLTAGE TRANSFORM RATIO (VT)",
    "PULSE ENERGY WEIGHT"
];
const use_memory_map = false;
module.exports = {
    getData: function(data, device_data, init, end){
        let c = 0;
        let arrayResult = [];
        if(init === undefined && end === undefined) {
            for (let i = 0; i < data.length; i++) {
                if (data[i] !== 0 && data[i] !== undefined) {
                    let subdata = {
                        interfaz: (use_memory_map)?memory_map[c]:device_data[c].interfaz,
                        valor: data[i]
                    };
                    arrayResult.push(subdata);
                    c++;
                }
            }
            return arrayResult;
        }else{
            let tmpArr = [];
            let sendData = [];
            for(let i= 0; i<data.length; i++){

                if(data[i]!==0) {
                    if(device_data[c] === undefined) break;
                    let subdata = {
                        interfaz: (use_memory_map)?memory_map[c]:device_data[c].interfaz,
                        valor: data[i]
                    };

                    tmpArr.push(subdata);
                    subdata = {};
                    c++;
                }
            }
            for(let j = init; j <= end; j++){
                sendData.push(tmpArr[j-1]);
            }
            return sendData;
        }
    },

    getArrayData : function (data, init, end) {
        let rv = {};
        let c = 0;
        if (init === undefined && end === undefined) {
            for (let i = 0; i < data.length; i++) {
                if (data[i] !== 0) {
                    rv[memory_map[c]] = data[i];
                    c++;
                }
            }
            return rv;
        }else{
            let tmpArr = {};
            let sendData = {};
            for(let i= 0; i<data.length; i++){
                if(data[i]!==0) {
                    tmpArr[c] = data[i];
                    c++;
                }
            }
            for(let j = init; j <= end; j++){
                sendData[memory_map[j-1]] = tmpArr[j-1];
            }
            return sendData;
        }
    },

    createArrayData: function (data, mac, init, end){
        let arrResult = {
            "id_paquete": (init===undefined)?1:init,
            "mac": mac,
            "fecha": new Date().toLocaleString(),
            "datos": {}
        };

        if(init === undefined && end === undefined) {
            arrResult["datos"] = this.getArrayData(data);
            return arrResult;
        }
        else{
            if(init > data.length || end > data.length){
                console.log("#Bad Config, El inicio o fin no puede ser mayor al # de registros");
                return null;
            }else{
                arrResult["datos"] = this.getArrayData(data, init, end);
                return arrResult;
            }
        }
    },

    createObjectData: function (data, device, divider) {
        let tmpArray = [];

        let a = this.getArrayData(data);
        let s = this.objectSize(a);

        let div = s/divider;
        let ant = 1;
        let ult = 0;

        for(let i=1; i<=div; i++){
            ult = i*divider;

            let arrResult = {
                "id_paquete": 0,
                "mac": device.mac,
                "fecha": new Date().toLocaleString(),
                "datos": this.getData(data, device.datos,ant, ult)
            };
            tmpArray.push(arrResult);
            arrResult["id_paquete"] = i;
            ant = i * divider + 1;
            arrResult = {};
        }
        if(s>ult){
            let arrResult = {
                "id_paquete": parseInt(div)+1,
                "mac": device.mac,
                "fecha": new Date().toLocaleString(),
                "datos": {}
            }
            ;
            if((ult+1) === s){
                arrResult["datos"] = this.getData(data,device.datos ,s, s);
                tmpArray.push(arrResult);
            }else{
                arrResult["datos"] = this.getData(data, device.datos,(ult+1), s);
                tmpArray.push(arrResult);
            }
        }
        /*console.log("* * * División de datos * * *");
        console.log("total divisiones: "+parseInt(div));
        console.log("tamaño del array: "+s);
        console.log("Sobrantes: "+(s-ult));*/
        return tmpArray;
    },

    objectSize: function (obj) {
        let size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    }
};


/*

[ 0,
  221,
  0,
  126,
  0,
  129,
  0,
  127,
  0,
  222,
  0,
  222,
  0,
  220,
  0,
  22800,
  0,
  34400,
  0,
  17600,
  0,
  17200,
  65535,
  64602,
  65535,
  64544,
  0,
  874,
  65535,
  64662,
  65535,
  64602,
  65535,
  64544,
  0,
  874,
  65535,
  64662,
  0,
  8760,
  0,
  4320,
  0,
  2240,
  0,
  2160,
  0,
  8200,
  0,
  4280,
  0,
  1960,
  0,
  1880,
  65535,
  65016,
  65535,
  64936,
  0,
  1080,
  65535,
  64456,
  3,
  24324,
  1,
  23120 ]



* */