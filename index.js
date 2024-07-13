const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config');
const routes = require('./routes/routes');

const app = express();

app.use(bodyParser.json());

app.use('/', routes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});