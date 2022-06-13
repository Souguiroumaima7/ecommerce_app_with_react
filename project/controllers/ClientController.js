const ClientModel =require("../models/ClientModel")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c7903c5eb4820f",
    pass: "55eda7ac279ed9"
  }
});

module.exports= {
  register:async(req,res)=>{


    req.body.image=req.file?.filename
     
  try {

        const salt = await bcrypt.genSalt(10)
        const HashPassword = await bcrypt.hashSync(req.body.password,salt)

      const client = new ClientModel({
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      email:req.body.email,
      adressL:req.body.adressL,
      password:HashPassword ,
      image: req.body.image
    })

    await client.save(req.body,(err,item)=>{
    
         if(err){
             res.status(406).json({success:false, message:"Failed register"+err})
         }else{
          transport.sendMail({
            from: "myapp@gmail.com",
            to: item.email,
            cc: '@gmail.com',
            bcc: "@gmail.com",
            subject: "Welcome " + item.firstName,
            text: "bonjour mr ",
            html: `<!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta http-equiv="x-ua-compatible" content="ie=edge">
              <title>Welcome Email</title>
            </head>
            <body>
              <h2>Hello ${item.firstname +" "+ item.lastname}! </h2>
              <p>We're glad to have you on board at ${item.email}. </p>
              <p>We're glad to have you on board at it gate</p>
            </body>
            </html>`,
            // attachments: [{
            //     filename: req.file.filename,
            //     path: "./storages/" + req.file.filename,
            //     cid: "test"
            // }]
        }, function(err, info) {
            if (err) {
                console.log("error:", err)
            } else {
                console.log("Email Send successufly:", info + reponse)
            }
        })


             res.status(201).json({success:true, message:" success register", data:item})
         }
     })
    
  } catch (error) {
    res.status(500).json(error)
  }
  


  },
  getall:async(req,res)=>{
    try {
      await ClientModel.find({}).exec((err,items)=>{
        if(err){
          res.status(406).json({success:false, message:"Failed to got all clients"})
      }else{
          res.status(201).json({success:true, message:" List of clients", data:items})
      }

      })
      
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getbyid:async(req,res)=>{
    try {
       await  ClientModel.findById(req.params.id).exec((err,item)=>{
           if(err){
            res.status(406).json({success:false, message:"Failed "}) 
           }else{
            res.status(201).json({success:true, message:"success", data:item})
           }
       })
    
    } catch (error) {
        res.status(500).json(error)
    }
    
    
    },
    getbyname:async(req,res)=>{
        try {
           await  ClientModel.find({firstname:req.query.firstname}).exec((err,items)=>{
               if(err){
                res.status(406).json({success:false, message:"Failed "}) 
               }else{
                res.status(201).json({success:true, message:"success", data:items})
               }
           })
        
        } catch (error) {
            res.status(500).json(error)
        }
        
        
        },
        update:async(req,res)=>{

         
            try {
            
                await  ClientModel.findByIdAndUpdate(req.params.id,req.body,{new:true}).exec((err,item)=>{
                    if(err){
                        res.status(406).json({success:false, message:"Failed "})
                    }else{
                        res.status(201).json({success:true, message:"success", data:item})
                    }
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },
        delete:async(req,res)=>{
            try {
            
                await ClientModel.findByIdAndRemove(req.params.id).exec((err,items)=>{
                    if(err){
                        res.status(406).json({success:false, message:"Failed"})
                    }else{
                        res.status(201).json({success:true, message:"success"})
                    }
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },
        getstats:async(req,res)=>{
          const date = new Date()
          const lastYear = new Date(date.setFullYear(date.getFullYear()-1))
          try {

             const data = await  ClientModel.aggregate([
              {$match:{createdAt:{$gte:lastYear}}},
               {$project:{month:{$month:"$createdAt"}}},
               {$group:{_id:"$month", Total:{$sum:1}}}

            ])
            res.status(201).json(data)
            
          } catch (error) {
            res.status(500).json(error)
          }
        }
        


}