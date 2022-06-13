
const mongoose = require("mongoose")
const UserModel = require("./User-Model")

const ProviderSchema = new mongoose.Schema({
    
    company:{
        type:String,
        required:true,
    }
  
},)

const Providers = UserModel.discriminator("Providers",ProviderSchema)

module.exports = mongoose.model("Providers")