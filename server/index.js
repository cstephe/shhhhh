const express = require('express');
const gcpConnector = require('./gcpConnector');
const app = express();
var gcp = gcpConnector();
const apiServer = require('./apiConfig');

//Launch API
apiServer.launch(app, gcp);
//Host Client
app.use(express.static('./client'));