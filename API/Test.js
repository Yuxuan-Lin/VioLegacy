const express = require('express');
const path = require('path');
const message = require('./data/message.json');
const home = require('./data/home.json');
const opportunities = require('./data/opportunities.json');
const cors = require('cors');
let exp = require('./data/experiment.json');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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

app.post('/', function(req, res){
    if(req.body){
        let newMessage = {chatTime:'2020/9/16',chatContent:req.body,chatSender:'self'};
        //console.log('body: ' + JSON.stringify(req.body));
        console.log('I am the best.');
        exp.data.push(JSON.parse(JSON.stringify(newMessage)));
        fs.writeFile('API/data/experiment.json',JSON.stringify(exp), function (err) {
            if (err) console.log(err);
        });
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log('Server Started!')});