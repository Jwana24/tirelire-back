const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.post('/', (req, res) => {
    const dataFixExpense = {
        fix_expense_name: req.body.name,
        fix_expense_amount: req.body.amount,
        fix_expense_date: req.body.date
    }

    connection.query('INSERT INTO fix_expense SET ?', [dataFixExpense], (err, _) => {
        if (err) {
            res.status(500).send('Erreur lors de la création d\'une dépense fixe');
        }
        else {
            res.status(200).send('La nouvelle dépense fixe a bien été ajouté');
        }
    })
});

router.get('/', (_, res) => {
    connection.query('SELECT * FROM fix_expense', [], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de l\'affichage des dépenses fixes');
        }
        else if(results.length === 0){
            res.status(404).send('Aucune dépense fixe à afficher');
            }
        else {
            res.status(200).json(results);
        }
    });
});
router.get('/:id', (req, res) => {
    const idFixExpense = req.params.id;
    
    connection.query('SELECT * FROM fix_expense WHERE fix_expense_id = ?', [idFixExpense], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de l\'affichage de la dépense fixe');
        }
        else if(results.length === 0){
            res.status(404).send('La dépense fixe recherchée n\'existe pas');
            }
        else {
            res.status(200).json(results);
        }
    });
});

router.patch('/:id', (req, res) => {
    const dataFixExpense = req.body;
    const idFixExpense = req.params.id;

    connection.query('UPDATE fix_expense SET ? WHERE fix_expense_id = ?', [dataFixExpense, idFixExpense], (err, _) => {
        if (err) {
            res.status(500).send('Erreur lors de la modification de la dépense fixe');
        }
        else {
            res.status(201).send('La dépense fixe a bien été mis à jour');
        }
    })
});

router.delete('/:id', (req, res) => {
    const idFixExpense = req.params.id;

    connection.query('DELETE FROM fix_expense WHERE fix_expense_id = ?', [idFixExpense], (err, _) => {
        if (err) {
            res.status(500).send('Erreur lors de la suppression de la dépense fixe');
        }
        else {
            res.status(201).send('La dépense fixe a bien été supprimé');
        }
    })
});

module.exports = router;