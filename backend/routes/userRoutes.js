const express = require('express');
const axios = require('axios');
const User = require('../models/User.js');

const router = express.Router();

// POST /user
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, dob } = req.body;

    // Fetch random dog image
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
    const profilePicture = response.data.message;

    const user = new User({
      firstName,
      lastName,
      dob,
      profilePicture,
    });

    await user.save();
    res.status(201).json({ message: 'User saved successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /user
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    const usersWithAge = users.map((user) => {
      const ageDifMs = Date.now() - new Date(user.dob).getTime();
      const ageDate = new Date(ageDifMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);

      return {
        firstName: user.firstName,
        lastName: user.lastName,
        dob: user.dob,
        profilePicture: user.profilePicture,
        age,
      };
    });
    res.json(usersWithAge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
