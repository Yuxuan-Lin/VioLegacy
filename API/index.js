const express = require('express');
const path = require('path');
const message = require('./newdata/newmessage.json');
const home = require('./newdata/newhome.json');
const opportunities = require('./newdata/newopportunities.json');
const cors = require('cors');
let exp = require('./data/experiment.json');
const fs = require('fs');

const app = express();
const user = {};

const opps = opportunities.opportunities;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());

app.get('/', (req,res,next) => {
    console.log('welcome')});

app.get('/home', (req,res,next) => {
    //console.log(req.query);
    user.name = req.query.name.replace("_"," ");
    let tempName = user.name;
    console.log(tempName);
    try{
        user.profile = home.profiles[tempName];
        res.send(user.profile);
        console.log('Home accessed');
    }catch(err){
        console.log('?????????????????');
        alert(err);
    }
});

/*
app.get('/message', (req,res,next) => {
    console.log('Message access start');
    user.chat = 
    for (const history in message.chatHistory){
        
    }
    res.send(message);
    console.log('Message accessed');
});
*/

app.get('/opportunities', (req,res,next) => {
    res.send(opportunities);
    console.log('Opportunities accessed');
});

function oppFilter(opp){
   if (opp.registered.includes(user.name)) {
       //???
       user.opp.push(opp);
   }
}

app.get('/myOpp', (req,res,next) => {
    user.opp = [];
    console.log("myOpp access start");
    opps.forEach(oppFilter); 
    res.send(user.opp);
    console.log('Opportunities accessed');
});


app.put('/opportunities', (req,res) =>{
    console.log('opportunities put start');
    console.log(req.query);
    let targetOpp = req.query.id;
    let jsonData = fs.readFileSync(__dirname+'/newdata/newopportunities.json');
    let data = JSON.parse(jsonData);
    //console.log(data);
    
    
    for (let i=0; i<2; i++){
        if (data.opportunities[i].id == targetOpp){
            console.log(data.opportunities[i]);
            if (data.opportunities[i].registered.includes(user.name)){
                console.log(typeof user.name);
                console.log(data.opportunities[i].registered);
                data.opportunities[i].registered.splice(data.opportunities[i].registered.findIndex(el => el==user.name),1);
            }
            else {
                data.opportunities[i].registered.push(user.name);
            }
        }
    }
    fs.writeFileSync(__dirname+'/newdata/newopportunities.json',(JSON.stringify(data)));
    
    console.log('opp put success');
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