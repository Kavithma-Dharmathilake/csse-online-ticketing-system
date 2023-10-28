'use strict';

const firebase = require('../db');
const BusRoute = require('../models/busroute');
const firestore = firebase.firestore();

const addBusRoute = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('busRoutes').doc().set(data);
        res.send('Bus route saved successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllBusRoutes = async (req, res, next) => {
    try {
        const busRoutes = await firestore.collection('busRoutes');
        const data = await busRoutes.get();
        const busRoutesArray = [];
        if (data.empty) {
            res.status(404).send('No bus route records found');
        } else {
            data.forEach(doc => {
                const route = new BusRoute(
                    doc.id,
                    doc.data().routeNo,
                    doc.data().start,
                    doc.data().end,
                    doc.data().fee
                );
                busRoutesArray.push(route);
            });
            res.send(busRoutesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getBusRoute = async (req, res, next) => {
    try {
        const id = req.params.id;
        const route = await firestore.collection('busRoutes').doc(id);
        const data = await route.get();
        if (!data.exists) {
            res.status(404).send('Bus route with the given ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateBusRoute = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const route = await firestore.collection('busRoutes').doc(id);
        await route.update(data);
        res.send('Bus route updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteBusRoute = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('busRoutes').doc(id).delete();
        res.send('Bus route deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addBusRoute,
    getAllBusRoutes,
    getBusRoute,
    updateBusRoute,
    deleteBusRoute
};
