const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.post('/', (req, res) => {
    const dataIncome = req.body;

    connection.query('INSERT INTO income SET ?', [dataIncome], (err, _) => {
        if (err) {
            res.status(500).send('Erreur lors de la création d\'un revenu');
        }
        else {
            res.status(200).send('Le nouveau revenu a bien été ajouté');
        }
    })
});

router.get('/', (req, res) => {
    connection.query('SELECT * FROM income', [], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de l\'affichage des revenus');
        }
        else if(results.length === 0){
            res.status(404).send('Aucun revenu à afficher');
            }
        else {
            res.status(200).json(results);
        }
    });
});
router.get('/:id', (req, res) => {
    const idIncome = req.params.id;
    
    connection.query('SELECT * FROM income WHERE income_id = ?', [idIncome], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de l\'affichage du revenu');
        }
        else if(results.length === 0){
            res.status(404).send('Le revenu recherché n\'existe pas');
            }
        else {
            res.status(200).json(results);
        }
    });
});

router.patch('/:id', (req, res) => {
    const dataIncome = req.body;
    const idIncome = req.params.id;

    connection.query('UPDATE income SET ? WHERE income_id = ?', [dataIncome, idIncome], (err, _) => {
        if (err) {
            res.status(500).send('Erreur lors de la modification du revenu');
        }
        else {
            res.status(201).send('Le revenu a bien été mis à jour');
        }
    })
});

router.delete('/:id', (req, res) => {
    const idIncome = req.params.id;

    connection.query('DELETE FROM income WHERE income_id = ?', [idIncome], (err, _) => {
        if (err) {
            res.status(500).send('Erreur lors de la suppression du revenu');
        }
        else {
            res.status(201).send('Le revenu a bien été supprimé');
        }
    })
});

module.exports = router;