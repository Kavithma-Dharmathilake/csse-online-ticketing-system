'use strict';

const firebase = require('../db');
const Bus = require('../models/bus'); // Assuming you have a Bus model
const firestore = firebase.firestore();

const addBus = async (req, res, next) => {
    try {

            const data = req.body;
            const busData = {
                licenceNo: data.licenceNo,
                capacity: data.capacity,
                plateNo: data.plateNo,
                currentPassenger: data.currentPassenger
            };
    
            await firestore.collection('buses').doc(data.id).set(busData);
            res.send('Bus record saved successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllBuses = async (req, res, next) => {
    try {
        const buses = await firestore.collection('buses');
        const data = await buses.get();
        const busesArray = [];
        if (data.empty) {
            res.status(404).send('No bus records found');
        } else {
            data.forEach(doc => {
                const bus = new Bus(
                    doc.id,
                    doc.data().licenceNo,
                    doc.data().capacity,
                    doc.data().plateNo,
                    doc.data().currentPassenger
                );
                busesArray.push(bus);
            });
            res.send(busesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getBus = async (req, res, next) => {
    try {
        const id = req.params.id;
        const bus = await firestore.collection('buses').doc(id);
        const data = await bus.get();
        if (!data.exists) {
            res.status(404).send('Bus with the given ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateBus = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const bus = await firestore.collection('buses').doc(id);
        await bus.update(data);
        res.send('Bus record updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteBus = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('buses').doc(id).delete();
        res.send('Bus record deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addBus,
    getAllBuses,
    getBus,
    updateBus,
    deleteBus
}
