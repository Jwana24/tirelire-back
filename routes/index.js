const express = require('express');
const router = express.Router();
const incomes = require('./incomes');

router.use('/incomes', incomes);

module.exports = router;