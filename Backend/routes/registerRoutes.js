const express = require('express');
const router = express.Router();
const User = require('../Models/userModel');

// Register Route
router.post('/', async (req, res) => {
    try {
        const { username, email, firstName, lastName, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // Create a new user
        const newUser = new User({
            username,
            email,
            firstName,
            lastName,
            password,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
