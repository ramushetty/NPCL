const { Client} = require('pg');


const client = new Client({
    user: 'ramu',
    host:'localhost',
    database: 'npcl',
    password: 'ramu123',
    port:5432,
});



const tableQueries = [

    `
    CREATE TABLE IF NOT EXISTS users (
        user_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(50) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        data_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        e_rupee DECIMAL(10,2) DEFAULT 0.00 NOT NULL
    );
    `
];


async function createTables() {
    await client.connect();

    try {
        for (const query of tableQueries) {
            await client.query(query)
        }
        console.log('Tables created or already exists')
    } catch(error) {
        console.error('Error creating tables',error);
    }
    

}

module.exports = { createTables };



