'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const studentRoutes = require('./routes/student-routes');
const busRoutes = require('./routes/bus-routes');
const driverRoutes = require('./routes/driver-routes')

const app = express();

app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
  })

  

app.use('/api/students', studentRoutes.routes);
app.use('/api/buses', busRoutes.routes);
app.use('/api/drivers', driverRoutes.routes);



app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));