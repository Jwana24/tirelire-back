const express = require('express');
const router = express.Router();
const fixIncomes = require('./fixIncomes');
const varIncomes = require('./varIncomes');
const fixExpenses = require('./fixExpenses');
const varExpenses = require('./varExpenses');

router.use('/fix-incomes', fixIncomes);
router.use('/var-incomes', varIncomes);
router.use('/fix-expenses', fixExpenses);
router.use('/var-expenses', varExpenses);

module.exports = router;