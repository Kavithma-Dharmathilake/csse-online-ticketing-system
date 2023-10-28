const express = require('express');
const { addDriver, 
        getAllDrivers, 
        getDriver, 
        updateDriver, 
        deleteDriver 
      } = require('../controllers/driverController'); // Assuming you have a "driverController" with the relevant functions.

const router = express.Router();

router.post('/', addDriver);
router.get('/', getAllDrivers);
router.get('/:id', getDriver);
router.put('/:id', updateDriver);
router.delete('/:id', deleteDriver);

module.exports = {
    routes: router
};
