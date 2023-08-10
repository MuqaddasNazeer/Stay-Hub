const mongoose = require("mongoose");
var mongoURL = 'mongodb+srv://muqaddasnazeer468:muqaddas@test-db.djnfnra.mongodb.net/StayHub';
mongoose.connect(mongoURL,{useUnifiedTopology : true, useNewUrlParser:true});
var connection = mongoose.connection
connection.on('error', ()=>{
    console.log("MongoDb Connnetion Failed!!!")
})

connection.on('connected', ()=>{
    console.log("MongoDB Connection Successfull!!!!");
})

module.exports = mongoose
