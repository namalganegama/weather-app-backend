const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/users', UserController.createUser);
router.get('/users', UserController.getUsers);
router.get('/users/weather', UserController.getUsersByDate);
router.put('/users/:userId/location', UserController.updateUserLocation);

module.exports = router;