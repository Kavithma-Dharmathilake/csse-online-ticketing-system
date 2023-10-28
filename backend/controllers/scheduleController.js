const firebase = require('../db');
const Monday = require('../models/monday'); // Assuming you have a "monday" model with the relevant fields.
const firestore = firebase.firestore();

const addMondaySchedule = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('mondays').doc().set(data);
        res.send('Monday schedule record saved successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllMondaySchedules = async (req, res, next) => {
    try {
        const schedules = await firestore.collection('mondays');
        const data = await schedules.get();
        const schedulesArray = [];
        if (data.empty) {
            res.status(404).send('No Monday schedule records found');
        } else {
            data.forEach(doc => {
                const schedule = new Monday(
                    doc.id,
                    doc.data().time,
                    doc.data().bus,
                    doc.data().driver,
                    doc.data().routeNo,
                    doc.data().status
                );
                schedulesArray.push(schedule);
            });
            res.send(schedulesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getMondaySchedule = async (req, res, next) => {
    try {
        const id = req.params.id;
        const schedule = await firestore.collection('mondays').doc(id);
        const data = await schedule.get();
        if (!data.exists) {
            res.status(404).send('Monday schedule with the given ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateMondaySchedule = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const schedule = await firestore.collection('mondays').doc(id);
        await schedule.update(data);
        res.send('Monday schedule record updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteMondaySchedule = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('mondays').doc(id).delete();
        res.send('Monday schedule record deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addMondaySchedule,
    getAllMondaySchedules,
    getMondaySchedule,
    updateMondaySchedule,
    deleteMondaySchedule
};
