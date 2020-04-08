const mongoose = require("mongoose")
const Schema = mongoose.Schema
const equipmentSchema = new Schema({
    equipName:{type:String,required:true},
    seleVal:{type:String,required:true},
    image:String,
    desc:String
})
const roomSchema = new Schema({
    roomName:{type:String,required:true},
    equipmentNum:Number,
    children:[equipmentSchema]
})
const roommodel = mongoose.model("roomList",roomSchema)
// const equipmentModel = mongoose.model("equipmentList",equipmentSchema)
module.exports = roommodel