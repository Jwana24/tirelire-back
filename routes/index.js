const express = require('express');
const router = express.Router();
const incomes = require('./income');

router.use('/incomes', incomes);

module.exports = router;