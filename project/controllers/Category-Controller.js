const categoryModel = require("../models/Category-Model")




module.exports={

create:async(req,res)=>{
    req.body.image= req.file.filename
try {
const category =  new  categoryModel(req.body)
await category.save(req.body,(err, category)=>{
    if(err){
        res.status(406).json({success:false, message:"Failed to created category"})
    }else{
        res.status(201).json({success:true, message:"category Add successufly", data:category})
    }
})
    
} catch (error) {
    res.status(500).json(error)
}



},

getall:async(req,res)=>{
    try {
    
        await categoryModel.find({}).exec((err,items)=>{
            if(err){
                res.status(406).json({success:false, message:"Failed to got all categories"})
            }else{
                res.status(201).json({success:true, message:"List of Categories", data:items})
            }
        })
    } catch (error) {
        res.status(500).json(error)
    }
},
getbyid:async(req,res)=>{
    try {
    
        await categoryModel.findById(req.params.id).exec((err,item)=>{
            if(err){
                res.status(406).json({success:false, message:"Failed to got category"})
            }else{
                res.status(201).json({success:true, message:"Category", data:item})
            }
        })
    } catch (error) {
        res.status(500).json(error)
    }
},
getbyname:async(req,res)=>{
    try {
    
        await categoryModel.find({name:req.query.name}).exec((err,items)=>{
            if(err){
                res.status(406).json({success:false, message:"Failed to got  categories by this name"})
            }else{
                res.status(201).json({success:true, message:"List of Categories", data:items})
            }
        })
    } catch (error) {
        res.status(500).json(error)
    }
},
update:async(req,res)=>{
    try {
    
        await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true}).exec((err,item)=>{
            if(err){
                res.status(406).json({success:false, message:"Failed to update category"})
            }else{
                res.status(201).json({success:true, message:"category updated successfuly", data:item})
            }
        })
    } catch (error) {
        res.status(500).json(error)
    }
},
delete:async(req,res)=>{
    try {
    
        await categoryModel.findByIdAndRemove(req.params.id).exec((err,items)=>{
            if(err){
                res.status(406).json({success:false, message:"Failed to deleted category"})
            }else{
                res.status(201).json({success:true, message:"category deleted successfuly"})
            }
        })
    } catch (error) {
        res.status(500).json(error)
    }
}






}