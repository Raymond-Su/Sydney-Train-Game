const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const handleLogs = require('morgan');
const routes = require('./api/routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(handleLogs('dev'));

// add middlewares
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// API Route
app.use('/api/', routes);

app.use('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// Handle Errors
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
