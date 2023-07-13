const express = require("express")
const cors = require('cors');
const sessions = require('express-session')
const sessionMiddleware = require('./middleware/sessionMiddleware');
const { createTables } = require("./CreateTable");
const config = require('./config/config')

const { pool } = require('./database');


// routers
const {userRouter} = require('./controller/user/auth')


const app = express()
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST","DELETE","PUT","GET","OPTIONS","HEAD"],
    credentials:true,
}));

app.use(express.json()) // Middleware
app.use(sessionMiddleware)
// app.use(sessions({
//     secret: config.secret,
//     resave: false,
//     name: 'sid',
//     saveUninitialized: true,
//     cookie: { 
//         secure: false,
//         httpOnly: true,
//         maxAge: 36000000,
//         sameSite:"lax",
//         path:"/api"
        
//     }})); // Middleware for sessions


app.use('/api',userRouter);





app.get('/api/data', (req,res)=>{
    const data = {
        message: "Hello, to NPCL project"
    };

    res.json(data)
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


