const mysql = require('mysql');
const dotenv = require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.NODE_ENV_HOST,
    user: process.env.NODE_ENV_USER,
    password: process.env.NODE_ENV_PASS,
    database: process.env.NODE_ENV_DB
});

module.exports = connection;