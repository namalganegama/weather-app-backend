const User = require('../models/user');
const { getCoordinates, getWeatherData } = require('../services/weatherService');
const { getReport } = require('../services/reportService');
const { format } = require('date-fns');

async function createUser(req, res) {
    const { name, email, location } = req.body;

    try {
        const { lat, lon } = await getCoordinates(location);
        const weatherData = await getWeatherData(lat, lon);
        const report = await getReport(weatherData);

        const now = new Date();
        const date = format(now, 'yyyy/MM/dd');
        const time = format(now, 'HH:mm:ss');

        const user = new User({ name, email, location, report, date, time });
        await user.save();
        res.send({ user, weatherData });

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

async function getUsers(req, res) {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

async function getUsersByDate(req, res) {
    const { date } = req.query;

    if (!date) {
        return res.status(400).send({ error: 'Date is required' });
    }

    try {
        const users = await User.find({ date });
        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

async function updateUserLocation(req, res) {
    const { userId } = req.params;
    const { location } = req.query;

    if (!location) {
        return res.status(400).send({ error: 'Location is required' });
    }

    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const { lat, lon } = await getCoordinates(location);
        const weatherData = await getWeatherData(lat, lon);
        const report = await getReport(weatherData);

        const now = new Date();
        const date = format(now, 'yyyy/MM/dd');
        const time = format(now, 'HH:mm:ss');

        user.location = location;
        user.report = report;
        user.date = date;
        user.time = time;

        await user.save();
        res.send({ user, weatherData });

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

module.exports = {
    createUser,
    getUsers,
    getUsersByDate,
    updateUserLocation
};
