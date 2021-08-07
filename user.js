//creating user schema
const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    }
})
module.exports = User = mongoose.model('User', user);