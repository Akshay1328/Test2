// const { tx } = require('@sap/cds');
const cds = require('@sap/cds');

const { MandatoryFields, setValue, LoggError, prepareDataTypeArray, checkMandatory } =  require('./common')

async function createIncidentDetails(req) {
    try {
        tx = cds.transaction(req);

        var query = 'SELECT SR_NO, NAME, JOBID, DOB FROM "MIG_INC_T_INCDT" WHERE SR_NO = \'1\';';
        var data = await tx.run(query);

        var getINCDTDType = 'SELECT COLUMN_NAME, DATA_TYPE_NAME FROM TABLE_COLUMNS WHERE TABLE_NAME LIKE ?;';
        var dType = await tx.run(getINCDTDType, 'INC_T_INCDT');

        const DataType = prepareDataTypeArray(dType)
        console.log(DataType);
        var DataArray = [];
        const TemplateName = 'MIG_INC_T_INCDT';

        // const Mandatory = MandatoryFields.MIG_INC_T_INCDT;
        for(let i = 0; i < data.length; i++){
            DataArray.push(await checkMandatory(tx, 'SR_NO', data[i], TemplateName, DataType['SR_NO']));
            DataArray.push(await checkMandatory(tx, 'NAME', data[i], TemplateName, DataType['NAME']));
            DataArray.push(await checkMandatory(tx, 'JOBID', data[i], TemplateName, DataType['JOBID']));
            DataArray.push(await checkMandatory(tx, 'DOB', data[i], TemplateName, DataType['DOB']));

            await cds.tx(async tx => {
                await tx.run(`CALL "MIG_INCprLoadIncidentRecords" (?, ?, ?, ?);`, DataArray);
            });
            
            DataArray = [];
        }
        // console.log("working");
        // await tx.commit();
        // await tx.close();
        console.log(DataArray);
        // return JSON.stringify(data);
        return data;

    } catch (error) {
        try{
            tx1 = cds.transaction(req);
            await tx1.commit();
        }catch (logError) {
            console.error('Error logging failed:', logError);
        }
        if (tx) {
            await tx.rollback();
        }
        return req.error({
            code: 500, 
            message: error.toString() 
        });
        await tx.rollback();
        return req.error({
            code: 500,
            message: error.toString()
        });

    }
}

module.exports = {
    createIncidentDetails,
};