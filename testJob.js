const schedule = require('node-schedule');

// Start 5 seconds from now
const startTime = new Date(Date.now() + 5000);

// End 15 minutes after start
const endTime = new Date(startTime.getTime() + 15 * 60 * 1000); // 15 mins in ms

const job = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function () {
  console.log('Time for tea!');
});


// Run job once, 5 seconds from now
const runAt = new Date(Date.now() + 5000);

const job = schedule.scheduleJob(runAt, () => {
  console.log('Running one-time job...');
});
