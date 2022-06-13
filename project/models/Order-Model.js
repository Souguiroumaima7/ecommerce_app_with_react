const mongoose = require("mongoose")

const itemorderproductSchema= new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Products"
    },
    color:{
        type:String,
        required:true
    },
    qte:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
})


const OrderSchema = new mongoose.Schema({
    ref:{
        type:String,
        required:true,
    },
    pricetotal:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    products:[itemorderproductSchema]

},{timestamps:true})


module.exports = mongoose.model("Order",OrderSchema)