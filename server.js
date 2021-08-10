const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const connectDB = require('./connection');
const userDetails = require('./user');
const UserPost = require('./userpost');
//connecting mongoose from connection.js
connectDB();

let isAuthenticated = true;

app.set('view engine', 'ejs');   //setting view engine to ejs
app.use(express.static('public'))  //telling the app to look for the front-end files in public folder
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/home', (req, res) => {
    if (isAuthenticated == true) {    //ensure that user cannot directly access home page without permission.
        fs.readFile('items.json', function (error, data) {
            if (error) {
                res.status(500).end();
            } else {
                //finding all the posts from the db
                UserPost.find({}, function (error, posts) {
                    res.render('home.ejs', {     //if not error then render home.ejs and read the trending.json file
                        items: JSON.parse(data),
                        userpost: posts //getting posts from db
                    });
                }).sort({   //sorting the data from mongodb in descending order (-1 indicates desc)
                    postdate: -1
                });
            }
        })

    } else {
        res.render('index.ejs');
    }
})

app.post('/', async (req, res) => {
    if (req.body.reqtype === 'signup') {
        const username = req.body.signupName;
        const password = req.body.signupPassword;
        const email = req.body.signupEmail;
        try {
            const response = await userDetails.create({ //creating new user in the database (mongodb atlas)
                username: username,
                password: password,
                email: email
            })
        } catch (error) {
            if (error.code === 11000) {
                // duplicate key
                return res.json({ status: 'error', error: 'Username already in use' })
            }
            throw error
        }
        return res.json({ status: 'ok' })
    }

    if (req.body.reqtype = "login") {
        const username = req.body.username;
        const password = req.body.password;
        const user = await userDetails.findOne({ username }).lean();
        if (!user) {
            return res.json({ status: 'error', error: 'Invalid Credentials.' })
        }
        if (user) {
            //checking user input with user.password from database
            //could use bcrypt to make it more secure.
            if (user.password === password) {
                isAuthenticated = true; //changing user permission to access home page to true.
                return res.json({ status: 'matched' })
            } else {
                return res.json({ status: 'error', error: 'Invalid Credentials.' }) //responding to the client invalid credentials
            }
        }
    }

})

app.post('/home', async (req, res) => {
    const userInput = req.body.userInput;   //getting input from client
    try {
        const post = await UserPost.create({
            userpost: userInput
        })
    } catch (error) {
        return res.json({ status: 'error', error: 'Sorry, please try again' })
    }
    return res.json({ status: 'posted' })
})

app.listen(3000, () => {
    console.log("Server is started")
});