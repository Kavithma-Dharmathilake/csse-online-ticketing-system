'use strict';

const firebase = require('../db');
const Driver = require('../models/driver'); 
const firestore = firebase.firestore();

const addDriver = async (req, res, next) => {
    try {
        const data = req.body;
        const driverData = {
            name: data.name,
            contact: data.contact,
            age:data.age,
            address:data.address,
            licenceNo: data.licenceNo
        };

        await firestore.collection('drivers').doc(data.id).set(driverData);
        res.send('Driver record saved successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllDrivers = async (req, res, next) => {
    try {
        const drivers = await firestore.collection('drivers');
        const data = await drivers.get();
        const driversArray = [];
        if (data.empty) {
            res.status(404).send('No driver records found');
        } else {
            data.forEach(doc => {
                const driver = new Driver(
                    doc.id,
                    doc.data().name,
                    doc.data().contact,
                    doc.data().licenceNo,
                    doc.data().age,
                    doc.data().address
                );
                driversArray.push(driver);
            });
            res.send(driversArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getDriver = async (req, res, next) => {
    try {
        const id = req.params.id;
        const driver = await firestore.collection('drivers').doc(id);
        const data = await driver.get();
        if (!data.exists) {
            res.status(404).send('Driver with the given ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateDriver = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const driver = await firestore.collection('drivers').doc(id);
        await driver.update(data);
        res.send('Driver record updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteDriver = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('drivers').doc(id).delete();
        res.send('Driver record deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addDriver,
    getAllDrivers,
    getDriver,
    updateDriver,
    deleteDriver
};
