const mongoose = require("mongoose")
const Schema = mongoose.Schema
const roomSchema = new Schema({
    roomName:{type:String,required:true},
    equipmentNum:Number,
})
const roommodel = mongoose.model("roomList",roomSchema)
module.exports = roommodel