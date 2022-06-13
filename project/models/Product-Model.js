const mongoose =require("mongoose")

const GallerySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true, 
    }
})


const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    }, 
    description:{
        type:String,
        required:true,
        trim:true,
    }, 
   price:{
        type:String,
        required:true,
        trim:true,
    },
    stock:{
        type:String,
        required:true,
        trim:true,
    },
    galleries:[GallerySchema],

    subcategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subcategories"
    },

    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order"
    }]
},{timestamps:true})



module.exports = mongoose.model("Products",ProductSchema)