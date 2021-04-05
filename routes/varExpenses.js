const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.post('/', (req, res) => {
    const dataVarExpense = {
        var_expense_name: req.body.name,
        var_expense_amount: req.body.amount,
        var_expense_date: req.body.date
    }

    connection.query('INSERT INTO var_expense SET ?', [dataVarExpense], (err, _) => {
        if (err) {
            res.status(500).send('Erreur lors de la création d\'une dépense variable');
        }
        else {
            res.status(200).send('La nouvelle dépense variable a bien été ajouté');
        }
    })
});

router.get('/', (_, res) => {
    connection.query('SELECT * FROM var_expense', [], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de l\'affichage des dépenses variables');
        }
        else if(results.length === 0){
            res.status(404).send('Aucune dépense variable à afficher');
            }
        else {
            res.status(200).json(results);
        }
    });
});
router.get('/:id', (req, res) => {
    const idVarExpense = req.params.id;
    
    connection.query('SELECT * FROM var_expense WHERE var_expense_id = ?', [idVarExpense], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de l\'affichage de la dépense variable');
        }
        else if(results.length === 0){
            res.status(404).send('La dépense variable recherchée n\'existe pas');
            }
        else {
            res.status(200).json(results);
        }
    });
});

router.patch('/:id', (req, res) => {
    const dataVarExpense = req.body;
    const idVarExpense = req.params.id;

    connection.query('UPDATE var_expense SET ? WHERE var_expense_id = ?', [dataVarExpense, idVarExpense], (err, _) => {
        if (err) {
            res.status(500).send('Erreur lors de la modification de la dépense variable');
        }
        else {
            res.status(201).send('La dépense variable a bien été mis à jour');
        }
    })
});

router.delete('/:id', (req, res) => {
    const idVarExpense = req.params.id;

    connection.query('DELETE FROM var_expense WHERE var_expense_id = ?', [idVarExpense], (err, _) => {
        if (err) {
            res.status(500).send('Erreur lors de la suppression de la dépense variable');
        }
        else {
            res.status(201).send('La dépense variable a bien été supprimé');
        }
    })
});

module.exports = router;