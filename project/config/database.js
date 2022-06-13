const mongoose=require("mongoose")
const dotenv =require("dotenv").config()
const DB_URL = process.env.DB_URL


 const Database = mongoose.connect(DB_URL,{UseNewUrlparser:true},(err)=>{
     if(err){
         
         console.log(err)

     }else{

         console.log("mongodb working good")
     }
 })

 



 module.exports= Database