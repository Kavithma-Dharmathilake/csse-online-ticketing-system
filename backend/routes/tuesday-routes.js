const express = require('express');
const {
    addTuesday,
    getAllTuesdays,
    getTuesday,
    updateTuesday,
    deleteTuesday
} = require('../controllers/tuesdayController');

const router = express.Router();

router.post('/', addTuesday);
router.get('/', getAllTuesdays);
router.get('/:id', getTuesday);
router.put('/:id', updateTuesday);

module.exports = {
    routes: router
}
