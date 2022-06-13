const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
name:{
    type:String,
    required:true,
    trim:true
},
desc:{
    type:String,
    required:true,
    trim:true
},
image:{
    type:String,

},
subcategories:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Subcategories"
}]

},{timestamps:true})

module.exports = mongoose.model("Categories",CategorySchema)