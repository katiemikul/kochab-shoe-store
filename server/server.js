const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
    database: 'shoe_store', //name of database
    host: 'localhost', //where is database
    port: 5432, //portico port default
    max: 10, //number of connections at one time
    idleTimeoutMillis: 30000 //30 seconds to try and connect otherwise cancel query
});

//Below is not needed but helpful with debugging
pool.on('connect', () => {
    console.log('Postgresql connected');
});

pool.on('error', (error) => {
    console.log('Error with Postgresql pool', error);
});



const PORT = 5000;

// 
const shoeCollection=require('./modules/shoe_collection');

app.use(bodyParser.json());
app.use(express.static('server/public'));
// Routes
app.get('/shoe', (req, res) => {
    res.send(shoeCollection);
});

app.post('/shoe', (req, res) => {
    console.log(req.body);
    const shoe = req.body;
    pool.query(`INSERT INTO "shoes" ("name", "cost")
                VALUES ($1, $2);`, [shoe.name, shoe.cost]) //use back ticks - copy this directly from Postico
        .then((results) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error with post to /shoe', error);
            res.sendStatus(500);
        });
    // shoeCollection.push(req.body);
    // res.sendStatus(201);
});

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});