const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const connectDB = require('./connection');
const userDetails = require('./user');
//connecting mongoose from connection.js
connectDB();

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

app.post('/', async (req, res) => {

    if(req.body.reqtype === 'signup'){
        const username = req.body.signupName;  
        const password = req.body.signupPassword;
        const email = req.body.signupEmail;
        try {
            const response = await userDetails.create({
                username: username,
                password : password,
                email : email
            })
        } catch (error) {
            if (error.code === 11000) {
                // duplicate key
                return res.json({ status: 'error', error: 'Username already in use' })
            }
            throw error
        }
        res.json({status: 'ok'})
    }
        
    if(req.body.reqtype = "login"){
        const username = req.body.username;
        const password = req.body.password;
        const user = await userDetails.findOne({username}).lean();
        if(!user){
            return res.json({ status: 'error', error: 'Invalid Credentials.' })
        }
        if(user){
            //checking user input with user.password from database
            //could use bcrypt to make it more secure.
            if(user.password === password){
                return res.json({ status: 'matched'})
            }else{
                return res.json({ status: 'error', error: 'Invalid Credentials.' })
            }
        }
    }    
})

app.listen(3000, ()=>{
    console.log("Server is started")
});