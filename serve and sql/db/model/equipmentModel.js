const mongoose = require("mongoose")
const Schema = mongoose.Schema
const equipmentSchema = new Schema({
    equipName:{type:String,required:true},
    seleVal:{type:String,required:true},
    image:String,
    desc:String
})
const equipmentModel = mongoose.model("equipmentList",equipmentSchema)
module.exports = equipmentModel