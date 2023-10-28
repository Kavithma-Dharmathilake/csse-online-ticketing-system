const express = require('express');
const {  addMondaySchedule,
    getAllMondaySchedules,
    getMondaySchedule,
    updateMondaySchedule,
    deleteMondaySchedule
      } = require('../controllers/scheduleController'); // Assuming you have a "driverController" with the relevant functions.

const router = express.Router();

router.post('/', addMondaySchedule);
router.get('/', getAllMondaySchedules);
router.get('/:id', getMondaySchedule);
router.put('/:id', updateMondaySchedule);
router.delete('/:id', deleteMondaySchedule);

module.exports = {
    routes: router
};
