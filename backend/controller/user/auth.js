const express = require('express');
const userRouter = express.Router();
const {pool} = require('../../database');

// login user
userRouter.post('/login', async (req,res) => {
    const {email,password} = req.body;
    console.log(email,password)
    try{
        const result = await pool.query(
            'SELECT user_id,username,e_rupee,email FROM users WHERE email= $1 AND password = $2',
            [email,password]
        )
        if (result.rowCount === 1) {
            req.session.userId = result.rows[0].user_id;
            res.status(200).json({
                success: true,
                name: result.rows[0].username,
                email: result.rows[0].email,
                e_rupee: result.rows[0].e_rupee,
            });
        } else {
            res.status(401).json({error: "Invalid username or password"})
        }

    } catch(e){
        console.log(e)
        res.status(500).json({error: "Database error"})
    }

});


// user registration 
userRouter.post("/users", (req,res) => {
    console.log(req.body)
    const {name,email,password} = req.body;

    const insertQuery =   `
        INSERT INTO users (username,password,email) 
        VALUES ($1,$2,$3);
    `;
    const values = [name,password,email];
    // need to handle unique email id
    pool.query(insertQuery,values)
        .then (() =>{
            res.status(201).json({message: 'user created successfully!'});
        })
        .catch((err) => {
            console.error('Error creating user',err);
            res.status(500).json({message: 'Error creating user'});
        });

});


userRouter.get('/user', async (req,res) => {
    if (req.session.userId) {
        try{
            const result = await pool.query(
                'SELECT user_id,username,e_rupee,email FROM users WHERE user_id = $1',
                [req.session.userId]
            )
            if (result.rowCount === 1) {
                res.status(200).json({
                    name: result.rows[0].username,
                    email: result.rows[0].email,
                    e_rupee: result.rows[0].e_rupee,
                });
            } else {
                res.status(401).json({error: "Invalid session"})
            }
        } catch (e) {
            console.error("Error fetching user data ",e)
        }
        

    } else {
        res.status(401).json({error: 'Unauthozied'});
    }
})


userRouter.post('/logout/', (req,res) => {
    req.session.destroy()
    res.status(200).clearCookie('sid',{
        path:"/api"
    }).json({success:true})
})

module.exports = {userRouter}