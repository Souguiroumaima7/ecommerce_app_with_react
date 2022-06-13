const ordermodel = require("../models/Order-Model")




module.exports={
    create:async(req,res)=>{
   
        try {
            const order = new ordermodel(req.body)
            await order.save(req.body,(err,item)=>{
                if(err){
                    res.status(406).json({success:false, message:"Failed to create order"})
                }else{
                    res.status(201).json({success:true, message:"order created successfuly", data:item})
                }
            })
    
        } catch (error) {
            res.status(500).json(error)
        }
    },
    
    getall:async(req,res)=>{
    try {
       await ordermodel.find({}).exec((err,items)=>{
           if(err){
            res.status(406).json({success:false, message:"Failed to got all orders"}) 
           }else{
            res.status(201).json({success:true, message:"List of orders", data:items})
           }
       })
    
    } catch (error) {
        res.status(500).json(error)
    }
    
    
    },
    getbyid:async(req,res)=>{
        try {
           await ordermodel.findById(req.params.id).exec((err,item)=>{
               if(err){
                res.status(406).json({success:false, message:"Failed to got order by this id"}) 
               }else{
                res.status(201).json({success:true, message:"order", data:item})
               }
           })
        
        } catch (error) {
            res.status(500).json(error)
        }
        
        
        },
        getbyname:async(req,res)=>{
            try {
               await ordermodel.find({name:req.query.name}).exec((err,items)=>{
                   if(err){
                    res.status(406).json({success:false, message:"Failed to got order by this name"}) 
                   }else{
                    res.status(201).json({success:true, message:"subcategory", data:items})
                   }
               })
            
            } catch (error) {
                res.status(500).json(error)
            }
            
            
            },
            update:async(req,res)=>{
                try {
                
                    await ordermodel.findByIdAndUpdate(req.params.id,req.body,{new:true}).exec((err,item)=>{
                        if(err){
                            res.status(406).json({success:false, message:"Failed to update order"})
                        }else{
                            res.status(201).json({success:true, message:"order updated successfuly", data:item})
                        }
                    })
                } catch (error) {
                    res.status(500).json(error)
                }
            },
            delete:async(req,res)=>{
                try {
                
                    await ordermodel.findByIdAndRemove(req.params.id).exec((err,items)=>{
                        if(err){
                            res.status(406).json({success:false, message:"Failed to deleted order"})
                        }else{
                            res.status(201).json({success:true, message:"subcategory deleted order"})
                        }
                    })
                } catch (error) {
                    res.status(500).json(error)
                }
            }
            


}