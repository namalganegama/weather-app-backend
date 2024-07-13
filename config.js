const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://namalpathum:tN67lNKRvuw6bAVA@cluster0.cfp9h4s.mongodb.net/weatherData?retryWrites=true&w=majority&appName=Cluster0');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected successfully');
});