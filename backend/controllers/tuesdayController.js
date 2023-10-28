'use strict';

const firebase = require('../db');
const Tuesday = require('../models/tuesday'); // Create a Tuesday model if it's not already created
const firestore = firebase.firestore();

const addTuesday = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('tuesday').doc().set(data);
        res.send('Record saved successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllTuesdays = async (req, res, next) => {
    try {
        const tuesdays = await firestore.collection('tuesday');
        const data = await tuesdays.get();
        const tuesdayArray = [];
        if (data.empty) {
            res.status(404).send('No Tuesday records found');
        } else {
            data.forEach(doc => {
                const tuesday = new Tuesday(
                    doc.id,
                    doc.data().time,
                    doc.data().bus,
                    doc.data().driver,
                    doc.data().routeNo,
                    doc.data().status
                );
                tuesdayArray.push(tuesday);
            });
            res.send(tuesdayArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getTuesday = async (req, res, next) => {
    try {
        const id = req.params.id;
        const tuesday = await firestore.collection('tuesday').doc(id);
        const data = await tuesday.get();
        if (!data.exists) {
            res.status(404).send('Tuesday with the given ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateTuesday = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const tuesday = await firestore.collection('tuesday').doc(id);
        await tuesday.update(data);
        res.send('Tuesday record updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteTuesday = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('tuesday').doc(id).delete();
        res.send('Record deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addTuesday,
    getAllTuesdays,
    getTuesday,
    updateTuesday,
    deleteTuesday
}
