const mongoose = require("mongoose")

const SubCatSchema = new mongoose.Schema({

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
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Categories"
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Products"
    }]
},{timestamps:true})

module.exports = mongoose.model("Subcategories",SubCatSchema)