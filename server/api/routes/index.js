const express = require('express');
const router = express.Router();

router.use('/solve', require('./solve'));

module.exports = router;
