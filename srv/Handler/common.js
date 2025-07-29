const cds = require('@sap/cds');

function setValue(value){
    if(value !== undefined && value !== null && value !== ''){
        return value;
    }else{
        return null;
    }
}

async function setMandatoryValue(tx, columnName, payload, dType, srvName){
    if(payload[columnName] !== undefined && payload[columnName] !== null && payload[columnName] !== '' && payload[columnName] !== '1900-01-01'){
        return payload[columnName];
    }else{
        var error = columnName + ': value is Mandatory and should be ' + dType;
        await LoggError(tx, payload.SR_NO, payload, srvName, error);
        return null;
    }
}

async function LoggError(tx, sr_no, payload, srvName, error){
    if(sr_no !== null){
        sr_no = sr_no.toString();
    }
    payload = JSON.stringify(payload);
    await tx.run(`CALL "Mig_prGenerateErrorlog" (?, ?, ?, ?);`, [
        sr_no, payload, srvName, error 
 ]);
}


const MandatoryFields = {
    "MIG_INC_T_INCDT" : ['SR_NO', 'NAME', 'DOB']
};

async function checkMandatory(tx, FieldName, payload, TemplateName, dType){
    const Mandatory = MandatoryFields[TemplateName];

    if(Mandatory.includes(FieldName)){
        return await setMandatoryValue(tx, FieldName, payload, dType, TemplateName);
    }else{
        return await setValue(payload[FieldName]);
    }
}

function prepareDataTypeArray(data){
    var DataType = {};
    for(let i = 0; i < data.length; i++){
        DataType[data[i].COLUMN_NAME] = data[i].DATA_TYPE_NAME;
    }
    return DataType;
}


module.exports = {
    setValue,
    MandatoryFields,
    LoggError,
    prepareDataTypeArray,
    checkMandatory
  };