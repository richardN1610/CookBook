const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const session = require('express-session');
const dbUrl = "mongodb+srv://admin:admin@cluster0.ahkis.mongodb.net/CookBook?retryWrites=true&w=majority"

//connecting mongoose
mongoose.connect(dbUrl,{useNewUrlParser: true, useUnifiedTopology: true}).then((result) =>{
    app.listen(3000, ()=>{
        console.log("Server is up and running")
    });
}).catch((err) =>{
    console.log(err);
})

app.set('view engine','ejs');   //setting view engine to ejs
app.use(express.static('public'))  //telling the app to look for the front-end files in public folder
app.use(bodyParser.json());

app.get('/', (req,res) =>{
    res.render('index.ejs')
})

app.get('/home', (req,res) =>{
    fs.readFile('items.json', function(error,data){
        if(error){
            res.status(500).end();
        }else{
            res.render('home.ejs',{     //if not error then render home.ejs and read the trending.json file
                items : JSON.parse(data)
            });
        }
    })
})

