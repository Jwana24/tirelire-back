const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.post('/', (req, res) => {
    const dataIncome = req.body;

    connection.query('INSERT INTO income SET ?', [dataIncome], (err, _) => {
        if (err) {
            // res.status(500).send('Erreur lors de la création d\'un revenu');
            res.send(err);
        }
        else {
            res.status(200).send('Le nouveau revenu a bien été ajouté');
        }
    })
});

// router.get('/', (req, res) => {

// });

// router.patch('/', (req, res) => {

// });

// router.delete('/', (req, res) => {

// });

module.exports = router;