const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dotenv = require('dotenv')
dotenv.config();
const api = require('./routes');
const port = process.env.NODE_ENV_PORT || 5000;

app.use('/api', api);

app.listen(port, (err) => {
    if (err) {
        throw new Error('Something bad happened :(');
    }
    console.log(`Server is listening on ${port}...`);
});