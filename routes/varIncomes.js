const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.post('/', (req, res) => {
    const dataVarIncome = req.body;

    connection.query('INSERT INTO var_income SET ?', [dataVarIncome], (err, _) => {
        if (err) {
            res.status(500).send('Erreur lors de la création d\'un revenu variable');
        }
        else {
            res.status(200).send('Le nouveau revenu variable a bien été ajouté');
        }
    })
});

router.get('/', (req, res) => {
    connection.query('SELECT * FROM var_income', [], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de l\'affichage des revenus variables');
        }
        else if(results.length === 0){
            res.status(404).send('Aucun revenu variable à afficher');
            }
        else {
            res.status(200).json(results);
        }
    });
});
router.get('/:id', (req, res) => {
    const idVarIncome = req.params.id;
    
    connection.query('SELECT * FROM var_income WHERE var_income_id = ?', [idVarIncome], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de l\'affichage du revenu variable');
        }
        else if(results.length === 0){
            res.status(404).send('Le revenu variable recherché n\'existe pas');
            }
        else {
            res.status(200).json(results);
        }
    });
});

router.patch('/:id', (req, res) => {
    const dataVarIncome = req.body;
    const idVarIncome = req.params.id;

    connection.query('UPDATE var_income SET ? WHERE var_income_id = ?', [dataVarIncome, idVarIncome], (err, _) => {
        if (err) {
            res.status(500).send('Erreur lors de la modification du revenu variable');
        }
        else {
            res.status(201).send('Le revenu variable a bien été mis à jour');
        }
    })
});

router.delete('/:id', (req, res) => {
    const idVarIncome = req.params.id;

    connection.query('DELETE FROM var_income WHERE var_income_id = ?', [idVarIncome], (err, _) => {
        if (err) {
            res.status(500).send('Erreur lors de la suppression du revenu variable');
        }
        else {
            res.status(201).send('Le revenu variable a bien été supprimé');
        }
    })
});

module.exports = router;