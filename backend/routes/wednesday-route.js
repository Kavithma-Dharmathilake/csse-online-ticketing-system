const express = require('express');
const {
    addWednesday,
    getAllWednesdays,
    getWednesday,
    updateWednesday,
    deleteWednesday
} = require('../controllers/wednesdayController');

const router = express.Router();

router.post('/', addWednesday);
router.get('/', getAllWednesdays);
router.get('/:id', getWednesday);
router.put('/:id', updateWednesday);
router.delete('/:id', deleteWednesday);

module.exports = {
    routes: router
}
