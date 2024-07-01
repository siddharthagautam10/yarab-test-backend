const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// DB connection
// const db = mysql.createConnection({
//     host: 'localhost', //process.env.DB_HOST,
//     user: 'root', //process.env.DB_USER,
//     password: '', //process.env.DB_PASS,
//     database: 'yarab_reg' //process.env.DB_NAME
// });
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("DB connected");
});

app.post('/api/register', (req, res) => {
    const {firstName, lastName, email, phone, postcode} = req.body;

    // validate

    // insert
    const user = {firstName, lastName, email, phone, postcode};
    const sql = "INSERT INTO users SET ?";

    db.query(sql, user, (err, result) => {
        if(err){
            return res.status(500).json({message:'Registration Failed'});
        }
        res.status(201).json({message:"Registration successful"});
    });
})

app.listen(port, ()=>{
    console.log('Server running ');
});