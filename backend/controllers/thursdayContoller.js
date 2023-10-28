'use strict';

const firebase = require('../db');
const Thursday = require('../models/thursday');
const firestore = firebase.firestore();

const addThursday = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('thursday').doc().set(data);
        res.send('Record saved successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllThursdays = async (req, res, next) => {
    try {
        const thursdays = await firestore.collection('thursday');
        const data = await thursdays.get();
        const thursdayArray = [];
        if (data.empty) {
            res.status(404).send('No Thursday records found');
        } else {
            data.forEach(doc => {
                const thursday = new Thursday(
                    doc.id,
                    doc.data().time,
                    doc.data().bus,
                    doc.data().driver,
                    doc.data().routeNo,
                    doc.data().status
                );
                thursdayArray.push(thursday);
            });
            res.send(thursdayArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getThursday = async (req, res, next) => {
    try {
        const id = req.params.id;
        const thursday = await firestore.collection('thursday').doc(id);
        const data = await thursday.get();
        if (!data.exists) {
            res.status(404).send('Thursday with the given ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateThursday = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const thursday = await firestore.collection('thursday').doc(id);
        await thursday.update(data);
        res.send('Thursday record updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteThursday = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('thursday').doc(id).delete();
        res.send('Record deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addThursday,
    getAllThursdays,
    getThursday,
    updateThursday,
    deleteThursday
}
