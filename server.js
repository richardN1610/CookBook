const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const connectDB = require('./connection.js');
const userDetails = require('./user');
const UserPost = require('./userpost');
// const { isObject } = require('util');
// const { urlencoded } = require('body-parser');
const userpost = require('./userpost');
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });
//connecting mongoose from connection.js
connectDB();

var isAuthenticated = false;

app.set('view engine', 'ejs');   //setting view engine to ejs
app.use(express.static('public'))  //telling the app to look for the front-end files in public folder
app.use(bodyParser.json()); // for parsing application/json

//empty global variable
let userInput = "";

//rendering the index page
app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/search', (req, res) => {
    if (isAuthenticated) {
        fs.readFile('items.json', function (error, data) {
            if (error) {
                res.status(500).end();
            } else {
                UserPost.collection.find({ userpost: userInput }).toArray(function (err, doc) // read user input from global value and find if a value exists
                {
                    res.render('search.ejs', {     //if not error then render home.ejs and read the trending.json file
                        items: JSON.parse(data),
                        userpost: doc //getting posts from db
                    });
                })
            }
        })
    } else {
        res.render('index.ejs');
    }
})

//rendering home page
app.get('/home', (req, res) => {
    if (isAuthenticated) {    //ensure that user cannot directly access home page without permission.
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
    isAuthenticated = false;
    return res.json({ status: "logged-out" })
})

app.post('/search', async (req, res) => {
    const searchKey = req.body.search;
    userInput = searchKey;  //assigning user input to userInput value
    //The toArray() method returns an array that contains all the documents from a cursor.
    UserPost.collection.find({ userpost: searchKey }).toArray(function (err, doc) //find if a value exists
    {

    });
    res.json({ status: "done" });
    return userInput;   //returning global value
})

//have to user server.listen instead of app
server.listen(3000, () => {
    console.log("Server is started")
});

io.on('connection', (socket) => {
    socket.on("message", (data) => {
        //saving data to the database
        const newPost = UserPost.create({
            userpost: data
        })
    })
    socket.on('message', data => {
        socket.emit('message', data) //io will send the 'message' to all the user on the server
        //if I use socket then it will only send to the current user.
    })
})