const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = 5000;

// 
const shoeCollection=require('./modules/shoe_collection');

app.use(bodyParser.json());
// Routes
app.get('/shoe', (req, res) => {
    res.send(shoeCollection);
});

app.post('/shoe', (req, res) => {
    console.log(req.body);
    shoeCollection.push(req.body);
    res.sendStatus(201);
});

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});