const schedule = require('node-schedule');

let { createIncidentDetails } = require("./Load");



async function scheduleIncidentJob(req) {
    try {
        // Run job once, 1 min from now
        const runAt = new Date(Date.now() + 1 * 60 * 1000);

        console.log("Scheduling Job after 5 min");
        const job = schedule.scheduleJob(runAt, async () => {
            await createIncidentDetails(cds);
        });

        // console.log('Start wait');
        // await delay(35 * 60 * 1000); // 600000 ms
        // console.log("Wait over");

        return returnObj = {
            'Status' : "200ok",
            'Message' : "Job is successfully Scheduled"
        }
    } catch (e) {
        return e;
    }
}

const ProcessingSequence = ['MIG_INC_T_INCDT', 'MIG_INC_T_INVPL'];
async function ScheduleJob(req) {
  try{
      for(let i = 0; i < ProcessingSequence.length; i++){
        switch(ProcessingSequence[i]){
          case 'MIG_INC_T_INCDT':
              
        }
      }
  }
  catch(e){

  }
}




module.exports = {
    scheduleIncidentJob,
};
