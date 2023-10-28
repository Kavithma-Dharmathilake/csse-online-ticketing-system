const express = require('express');
const {
    addFriday,
    getAllFridays,
    getFriday,
    updateFriday,
    deleteFriday
} = require('../controllers/fridayController');

const router = express.Router();

router.post('/', addFriday);
router.get('/', getAllFridays);
router.get('/:id', getFriday);
router.put('/:id', updateFriday);
router.delete('/:id', deleteFriday);

module.exports = {
    routes: router
}
