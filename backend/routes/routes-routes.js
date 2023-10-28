const express = require('express');
const {   addBusRoute,
    getAllBusRoutes,
    getBusRoute,
    updateBusRoute,
    deleteBusRoute
      } = require('../controllers/routeController');

const router = express.Router();

router.post('/', addBusRoute);
router.get('/', getAllBusRoutes);
router.get('/:id', getBusRoute);
router.put('/:id', updateBusRoute);
router.delete('/:id', deleteBusRoute);

module.exports = {
    routes: router
}
