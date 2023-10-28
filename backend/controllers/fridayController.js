'use strict';

const firebase = require('../db');
const Friday = require('../models/friday');
const firestore = firebase.firestore();

const addFriday = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('friday').doc().set(data);
        res.send('Record saved successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllFridays = async (req, res, next) => {
    try {
        const fridays = await firestore.collection('friday');
        const data = await fridays.get();
        const fridayArray = [];
        if (data.empty) {
            res.status(404).send('No Friday records found');
        } else {
            data.forEach(doc => {
                const friday = new Friday(
                    doc.id,
                    doc.data().time,
                    doc.data().bus,
                    doc.data().driver,
                    doc.data().routeNo,
                    doc.data().status
                );
                fridayArray.push(friday);
            });
            res.send(fridayArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getFriday = async (req, res, next) => {
    try {
        const id = req.params.id;
        const friday = await firestore.collection('friday').doc(id);
        const data = await friday.get();
        if (!data.exists) {
            res.status(404).send('Friday with the given ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateFriday = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const friday = await firestore.collection('friday').doc(id);
        await friday.update(data);
        res.send('Friday record updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteFriday = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('friday').doc(id).delete();
        res.send('Record deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addFriday,
    getAllFridays,
    getFriday,
    updateFriday,
    deleteFriday
}
