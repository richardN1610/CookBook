const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true
    },
    userpost:{
        type: String,
        require: true
    },
    postdate:{
        type: Date,
        default: Date.now
    }
})

//exporting the module
module.exports = Post = mongoose.model('UserPost',postSchema);