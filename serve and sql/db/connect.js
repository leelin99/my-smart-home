const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/userinfo",{ useNewUrlParser: true ,useUnifiedTopology: true})
const db = mongoose.connection;
db.on("error",console.error.bind(console,"concention error"));
db.once("open",() => {
    console.log("dbok")
})