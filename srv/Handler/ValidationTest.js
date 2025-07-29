const cds = require('@sap/cds');

const { MandatoryFields, setValue, LoggError, prepareDataTypeArray, checkMandatory } =  require('./common')

async function CreateValidationReport(req, TemplateName) {
    try {
        tx = cds.transaction(req);

        var query = 'SELECT * FROM "' + TemplateName + '";';
        var data = await tx.run(query);

        var getINCDTDType = 'SELECT COLUMN_NAME, DATA_TYPE_NAME FROM TABLE_COLUMNS WHERE TABLE_NAME LIKE ?;';
        var dType = await tx.run(getINCDTDType, TemplateName);

        const DataType = prepareDataTypeArray(dType)

        const Mandatory = MandatoryFields[TemplateName];
        for(let i = 0; i < data.length; i++){
            var obj = data[i];
            var temp = [];
            for(let key in obj){
                if(Mandatory.includes(key)){
                    if(DataType[key] === 'DATE' && (obj[key] === '' || obj[key] === undefined || obj[key] === null)){
                        temp.push(obj.SR_NO);
                    }
                }
            }
        }
        return temp;

    } catch (error) {
        return req.error({
            code: 500, 
            message: error.toString() 
        });
    }
}

module.exports = {
    CreateValidationReport,
};