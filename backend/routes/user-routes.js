
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Import your user controller

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userController.authenticateUser(email, password);

        if (user) {
          
            if (userController.isManager(user)) {

                res.status(200).json({ message: 'Manager logged in successfully' });
            } else {
              
                res.status(200).json({ message: 'Customer logged in successfully' });
            }
        } else {
           
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = {
    routes: router
}

