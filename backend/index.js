const express = require("express")
const cors = require('cors');
const { createTables } = require("./CreateTable");

const { pool } = require('./database');

const app = express()
app.use(cors());

app.use(express.json()) // Middleware

app.get('/api/data', (req,res)=>{
    const data = {
        message: "Hello, to NPCL project"
    };

    res.json(data)
});


// user registration 
app.post("/api/users", (req,res) => {
    console.log(req.body)
    const {name,email,password} = req.body;

    const insertQuery =   `
        INSERT INTO users (username,password,email) 
        VALUES ($1,$2,$3);
    `;
    const values = [name,password,email];

    pool.query(insertQuery,values)
        .then (() =>{
            res.sendStatus(201).json({message: 'user created successfully!'});
        })
        .catch((err) => {
            console.error('Error creating user',err);
            res.sendStatus(500).json({message: 'Error creating user'});
        });

});

async function startServer() {
    try {
        await createTables()
        app.listen(5000,()=>{console.log("Server is listening on port 5000")});


    }catch(err) {
        console.error('Error setting up tables and starting server', err);
    }
}

startServer()


