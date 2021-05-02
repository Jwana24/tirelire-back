const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.post('/', (req, res) => {
    const dataFixIncome = {
        fix_income_name: req.body.name,
        fix_income_amount: req.body.amount,
        fix_income_date: req.body.date
    }

    connection.query('INSERT INTO fix_income SET ?', [dataFixIncome], (err, _) => {
        if (err) {
            res.status(500).send('Erreur lors de la création d\'un revenu fixe');
        }
        else {
            res.status(200).send('Le nouveau revenu fixe a bien été ajouté');
        }
    })
});

router.get('/', (req, res) => {
    connection.query('SELECT *, DATE_FORMAT(fix_income_date, "%d/%m/%Y") as fix_income_date FROM fix_income', [], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de l\'affichage des revenus fixes');
        }
        else {
            res.status(200).json(results);
        }
    });
});
router.get('/:id', (req, res) => {
    const idFixIncome = req.params.id;
    
    connection.query('SELECT * FROM fix_income WHERE fix_income_id = ?', [idFixIncome], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de l\'affichage du revenu fixe');
        }
        else if(results.length === 0){
            res.status(404).send('Le revenu fixe recherché n\'existe pas');
            }
        else {
            res.status(200).json(results);
        }
    });
});

router.patch('/:id', (req, res) => {
    const dataFixIncome = req.body;
    const idFixIncome = req.params.id;

    connection.query('UPDATE fix_income SET ? WHERE fix_income_id = ?', [dataFixIncome, idFixIncome], (err, _) => {
        if (err) {
            res.status(500).send('Erreur lors de la modification du revenu fixe');
        }
        else {
            res.status(201).send('Le revenu fixe a bien été mis à jour');
        }
    })
});

router.delete('/:id', (req, res) => {
    const idFixIncome = req.params.id;

    connection.query('DELETE FROM fix_income WHERE fix_income_id = ?', [idFixIncome], (err, _) => {
        if (err) {
            res.status(500).send('Erreur lors de la suppression du revenu fixe');
        }
        else {
            res.status(201).send('Le revenu fixe a bien été supprimé');
        }
    })
});

module.exports = router;