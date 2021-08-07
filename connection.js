const mongoose = require('mongoose');
const dbUrl = "mongodb+srv://admin:admin@cluster0.ahkis.mongodb.net/CookBook?retryWrites=true&w=majority";

const connectDB = async ()=>{
   await mongoose.connect(dbUrl,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}).then((result) =>{
        console.log("Connected to the database")
}).catch((err) =>{
    console.log(err);
})
}

module.exports = connectDB; //exporting the const