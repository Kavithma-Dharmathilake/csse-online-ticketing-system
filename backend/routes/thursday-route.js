const express = require('express');
const {
    addThursday,
    getAllThursdays,
    getThursday,
    updateThursday,
    deleteThursday
} = require('../controllers/thursdayContoller');

const router = express.Router();

router.post('/', addThursday);
router.get('/', getAllThursdays);
router.get('/:id', getThursday);
router.put('/:id', updateThursday);
router.delete('/:id', deleteThursday);

module.exports = {
    routes: router
}
