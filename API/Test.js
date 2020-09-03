const express = require('express');
const path = require('path');
const message = require('./data/message.json');
const home = require('./data/home.json');
const opportunities = require('./data/opportunities.json');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (req,res,next) => {
    console.log('welcome')});

app.get('/home', (req,res,next) => {
    res.send(home);
    console.log('Home accessed');
});

app.get('/message', (req,res,next) => {
    res.send(message);
    console.log('Message accessed');
});

app.get('/opportunities', (req,res,next) => {
    res.send(opportunities);
    console.log('Opportunities accessed');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log('Server Started!')});