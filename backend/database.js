const { Pool } = require('pg');

const pool = new Pool({
    user: 'ramu',
    host:'localhost',
    database: 'npcl',
    password: 'ramu123',
    port:5432,
});


module.exports = { pool };