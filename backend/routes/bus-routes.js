const express = require('express');
const { addBus, 
        getAllBuses, 
        getBus, 
        updateBus, 
        deleteBus 
      } = require('../controllers/busController'); // Assuming you have a "busController" with the relevant functions.

const router = express.Router();

router.post('/', addBus);
router.get('/', getAllBuses);
router.get('/:id', getBus);
router.put('/:id', updateBus);
router.delete('/:id', deleteBus);

module.exports = {
    routes: router
}
