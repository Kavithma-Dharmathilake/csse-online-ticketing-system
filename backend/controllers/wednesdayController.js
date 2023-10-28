'use strict';

const firebase = require('../db');
const Wednesday = require('../models/wednesday');
const firestore = firebase.firestore();

const addWednesday = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('wednesday').doc().set(data);
        res.send('Record saved successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllWednesdays = async (req, res, next) => {
    try {
        const wednesdays = await firestore.collection('wednesday');
        const data = await wednesdays.get();
        const wednesdayArray = [];
        if (data.empty) {
            res.status(404).send('No Wednesday records found');
        } else {
            data.forEach(doc => {
                const wednesday = new Wednesday(
                    doc.id,
                    doc.data().time,
                    doc.data().bus,
                    doc.data().driver,
                    doc.data().routeNo,
                    doc.data().status
                );
                wednesdayArray.push(wednesday);
            });
            res.send(wednesdayArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getWednesday = async (req, res, next) => {
    try {
        const id = req.params.id;
        const wednesday = await firestore.collection('wednesday').doc(id);
        const data = await wednesday.get();
        if (!data.exists) {
            res.status(404).send('Wednesday with the given ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateWednesday = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const wednesday = await firestore.collection('wednesday').doc(id);
        await wednesday.update(data);
        res.send('Wednesday record updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteWednesday = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('wednesday').doc(id).delete();
        res.send('Record deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addWednesday,
    getAllWednesdays,
    getWednesday,
    updateWednesday,
    deleteWednesday
}
