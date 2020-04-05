const mongoose = require("mongoose")
const Schema = mongoose.Schema
const roomSchema = new Schema({
    name:{type:String,required:true},
    equipmentNum:Number,
})
co