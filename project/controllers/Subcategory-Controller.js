const SubcatModel = require("../models/Subcategory-Model")
const categoryModel = require("../models/Category-Model")


module.exports={

create:async(req,res)=>{
   
    try {
        const subcat = new SubcatModel(req.body)
        await subcat.save(req.body,(err,item)=>{
            if(err){
                res.status(406).json({success:false, message:"Failed to create subcategory"})
            }else{
                categoryModel.findByIdAndUpdate(req.body.category,
                 {$push:{subcategories:subcat}},()=>{
                    subcat.populate([{path:"category", select:"name"},{path:"products", select:"price"}],()=>{

                        res.status(201).json({success:true, message:"subcategory created successfuly", data:item})
                    })

                 }   
                    )
            }
        })

    } catch (error) {
        res.status(500).json(error)
    }
},

getall:async(req,res)=>{
try {
   await SubcatModel.find({}).exec((err,items)=>{
       if(err){
        res.status(406).json({success:false, message:"Failed to got all subcategories"}) 
       }else{
        res.status(201).json({success:true, message:"List of subcategories", data:items})
       }
   })

} catch (error) {
    res.status(500).json(error)
}


},
getbyid:async(req,res)=>{
    try {
       await SubcatModel.findById(req.params.id).exec((err,item)=>{
           if(err){
            res.status(406).json({success:false, message:"Failed to got subcategory by this id"}) 
           }else{
            res.status(201).json({success:true, message:"subcategory", data:item})
           }
       })
    
    } catch (error) {
        res.status(500).json(error)
    }
    
    
    },
    getbyname:async(req,res)=>{
        try {
           await SubcatModel.find({name:req.query.name}).exec((err,items)=>{
               if(err){
                res.status(406).json({success:false, message:"Failed to got subcategory by this name"}) 
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
            
                await SubcatModel.findByIdAndUpdate(req.params.id,req.body,{new:true}).exec((err,item)=>{
                    if(err){
                        res.status(406).json({success:false, message:"Failed to update subcategory"})
                    }else{
                        res.status(201).json({success:true, message:"subcategory updated successfuly", data:item})
                    }
                })
            } catch (error) {
                res.status(500).json(error)
            }
        },
        delete:async(req,res)=>{
            try {
            
                await SubcatModel.findByIdAndRemove(req.params.id).exec((err,items)=>{
                    if(err){
                        res.status(406).json({success:false, message:"Failed to deleted subcategory"})
                    }else{
                        res.status(201).json({success:true, message:"subcategory deleted successfuly"})
                    }
                })
            } catch (error) {
                res.status(500).json(error)
            }
        }
        
        
    




}