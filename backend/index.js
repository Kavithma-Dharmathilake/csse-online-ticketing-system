'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const busRoutes = require('./routes/bus-routes');
const driverRoutes = require('./routes/driver-routes')
const rootRoutes = require('./routes/routes-routes')
const scheduleRoutes = require('./routes/mondayschedule')
const tuesdayRoute = require('./routes/tuesday-routes');
const wednesdayRoute = require('./routes/wednesday-route');
const thursdayRoute = require('./routes/thursday-route');
const fridayRoute = require('./routes/friday-routes');
const userRoute = require('./routes/user-routes');

const corsOptions = {
  origin: 'http://localhost:3000',
};


const app = express();

app.use(express.json());

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
  })

  

app.use('/api/buses', busRoutes.routes);
app.use('/api/drivers', driverRoutes.routes);
app.use('/api/roots', rootRoutes.routes);
app.use('/api/monday', scheduleRoutes.routes);
app.use('/api/tuesday', tuesdayRoute.routes);
app.use('/api/wednesday', wednesdayRoute.routes);
app.use('/api/friday', fridayRoute.routes);
app.use('/api/thursday', thursdayRoute.routes);
app.use('/api/user', userRoute.routes);



app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));