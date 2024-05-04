const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { logRequests, setHeaders, handleError } = require('./middleware');
const recommendationRoutes = require('./routes/recommendationRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Use custom middleware
app.use(logRequests);
app.use(setHeaders);

// Routes
app.use('/', recommendationRoutes);

// Error handling middleware should be last
app.use(handleError);

module.exports = app;