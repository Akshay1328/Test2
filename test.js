// const hana = require('@sap/hana-client');

// const conn = hana.createConnection();
// conn.connect({
//   serverNode: '71b8ac43-4fce-4374-918c-625c3ac6aa77.hana.trial-us10.hanacloud.ondemand.com:443',
//   uid: 'DBADMIN',
//   pwd: 'Joker@3105',
//   encrypt: 'true'
// });

// conn.exec('SELECT * FROM "79900AA977624C76BCE09D6FD2023360"."MIG_INC_T_INCDT";', (err, rows) => {
//     if (err) throw err;
//     console.log(rows);
// });

// import cds from '@sap/cds';
// console.log(cds)
// const cds = require('@sap/cds');
// const db = await cds.connect.to('db');

import axios from 'axios';
import https from 'https';

const srvUrl = 'https://port4004-workspaces-ws-dhynj.us10.trial.applicationstudio.cloud.sap/odata/v4/migrate/createIncidentDetails';
const authString = 'akshay.g@sodalessolutions.com' + ':' + 'Iamjoker@3105';


const agent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 1000, // Optional: Time to wait before sending keep-alive probes
  maxSockets: Infinity, // Optional: Maximum number of sockets to allow per host
});

const config = {
  httpsAgent: agent,
  headers: {
    'Authorization': 'Basic ' + Buffer.from(authString).toString('base64'),
    'Content-Type': 'application/json'
  }
};

axios.get(srvUrl, config)
.then(response => {
  console.log('Discount:', response.data);
})
.catch(error => {
  console.error('Error fetching discount:', error);
});