const firebase = require('../db');
const firestore = firebase.firestore();
const UserModel = require('../models/users');


// Function to authenticate a user
const authenticateUser = async (email, password) => {
    const usersCollection = firestore().collection('users');

    try {
        const data = await usersCollection.get();

        data.forEach(doc => {
            const userData = doc.data();

            if (userData.email === email && userData.password === password) {
                const user = new UserModel(
                    doc.id,
                    userData.email,
                    userData.contact,
                    userData.password,
                    userData.status,
                    userData.totalcredit,
                    userData.userType
                );

                return user;
            }
        }
        )


        return null;
    } catch (error) {
        throw error;
    }
};


const isManager = (user) => {
    return user && user.userType === 'manager';
};

module.exports = {
    authenticateUser,
    isManager,
};
