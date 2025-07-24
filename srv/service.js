const cds = require("@sap/cds");

let { createIncidentDetails } = require("./Handler/Load");


// module.exports = (srv) => {

// srv.on("createIncidentDetails", async (req) => {

// try {

// const result = await createIncidentDetails(cds);

// if (result.status === "error") throw result.message;

// return {

// status: "success",
// data : result,
// };

// } catch (error) {

// return req.error(error.toString());

// }

// });

// };

module.exports = cds.service.impl(function (){
    
        this.on('createIncidentDetails', async (req) => {
            try{
                const result = await createIncidentDetails(cds);
    
                // if (result.status === "error") throw result.message;
                
                return {
                    status: "success",
                    data : result,
                }
            }catch(error){
                return req.error(error.toString());
            }
        });
});