const express = require('express');
const User = require('../models/user');

const router = express.Router();

module.exports = router;


router.post('/users', async (req, res) => {
  const { name, email, location } = req.body;

  try {
    const user = new User({ name, email, location });
    await user.save();
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});


router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

