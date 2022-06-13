const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const baseOptions = {
    discriminatorKey: 'itemtype', // our discriminator key, could be anything
    collection: 'users', // the name of our collection
  };

const UserSchema = new mongoose.Schema({

    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    image:{
    type:String,
        
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

},baseOptions,
{timestamps:true})

// UserSchema.pre("save",(next)=>{
// if(this.password){
//     const salt = bcrypt.genSalt(10)
//     this.password = bcrypt.hash(this.password,salt)
//     next()
// }

// })


module.exports = mongoose.model("Users",UserSchema)