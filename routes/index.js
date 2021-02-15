const express = require('express');
const router = express.Router();
const incomes = require('./incomes');
const fixExpenses = require('./fixExpenses');
const varExpenses = require('./varExpenses');

router.use('/incomes', incomes);
router.use('/fix-expenses', fixExpenses);
router.use('/var-expenses', varExpenses);

module.exports = router;