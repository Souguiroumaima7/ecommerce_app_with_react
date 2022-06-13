const mongoose = require("mongoose")

const UserModel = require("./User-Model")


const ClientSchema = new mongoose.Schema({
    
    adressL:{
        type:String,
        required:false,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
    
},)

const Clients = UserModel.discriminator("Clients",ClientSchema)


module.exports = mongoose.model("Clients")