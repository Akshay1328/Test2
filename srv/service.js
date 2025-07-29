const cds = require("@sap/cds");

let { createIncidentDetails } = require("./Handler/Load");
let { scheduleIncidentJob } = require("./Handler/JobSchedular");
let { CreateValidationReport } = require("./Handler/ValidationTest");

module.exports = cds.service.impl(function () {

    this.on('createIncidentDetails', async (req) => {
        try {
            const result = await createIncidentDetails(cds);

            if (result.status === "error") throw result.message;

            return {
                status: "success",
                data: result,
            }
        } catch (error) {
            return req.error(error.toString());
        }
    });


    this.on('JobScheduleIncident', async (req) => {
        try {
            const result = await scheduleIncidentJob(cds);
            if (result.status === "error") throw result.message;

            return {
                status: "success",
                data: result,
            }
        } catch (error) {
            return req.error(error.toString());
        }
    });


    this.on('CreateValidationReport', async (req) => {
        try {
            const result = await CreateValidationReport(cds, 'MIG_INC_T_INCDT');
            if (result.status === "error") throw result.message;

            return {
                status: "success",
                data: result,
            }
        } catch (error) {
            return req.error(error.toString());
        }
    });
});



// module.exports = cds.service.impl(function () {

//     this.on('JobScheduleIncident', async (req) => {
//         try {
//             const result = await scheduleIncidentJob(cds);
//             if (result.status === "error") throw result.message;

//             return {
//                 status: "success",
//                 data: result,
//             }
//         } catch (error) {
//             return req.error(error.toString());
//         }
//     });

// });