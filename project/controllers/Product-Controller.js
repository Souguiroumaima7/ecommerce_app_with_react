const ProductModel = require("../models/Product-Model")
const SubcatModel = require("../models/Subcategory-Model")

module.exports ={

create:async(req,res)=>{

    req.body["galleries"]= req.files.length <= 0 ? [] : req.files.map((file)=>{
        return { name :file.filename, description: "Add Prod"}
    })
    try {
        const product = new ProductModel(req.body)
       await product.save(req.body,(err,item)=>{
           if(err){
               res.status(406).json({success:false, message:"err to save product"+err})
           }else{
            SubcatModel.findByIdAndUpdate(req.body.subcategory,
              {$push:{Products:product}},()=>{
                  
product.populate("subcategory",()=>{

    res.status(201).json({success:true, message:"success register", data:item})
})

            }  
            )
            

           }
       })

    } catch (error) {
        res.status(500).json(error)
    }
},
// Get All Product 
getall:async(req,res)=>{
    try {
        await ProductModel.find({}).exec((err,items)=>{
            if(err){
                res.status(406).json({success:false, message:"err to got all products"})   
            }else{
                res.status(201).json({success:true, message:"List of products", data:items})
            }
        })
        
    } catch (error) {
        res.status(500).json(error)
    }
},
//Get ById
getbyid:async(req,res)=>{
    try {
        await ProductModel.findById(req.params.id).exec((err,item)=>{
            if(err){
                res.status(406).json({success:false, message:"err to got product"})   
            }else{
                res.status(201).json({success:true, message:"product", data:item})
            }
        })
        
    } catch (error) {
        res.status(500).json(error)
    }

},
//Get By Name
getbyname:async(req,res)=>{
    try {
       await ProductModel.find({name:req.query.name}).exec((err,items)=>{
        if(err){
            res.status(406).json({success:false, message:"err to got product by this name"})   
        }else{
            res.status(201).json({success:true, message:"product", data:items})
        }
       }) 
        
    } catch (error) {
      res.status(500).json(error) 
    }
},
//UpdateProduct
update:async(req,res)=>{
try {
    await ProductModel.findByIdAndUpdate(req.params.id,req.body,{new:true}).exec((err,item)=>{
        if(err){
            res.status(406).json({success:false, message:"err to update product "})   
        }else{
            res.status(201).json({success:true, message:"product updated successufly", data:item})
        }
    })
} catch (error) {
    res.status(500).json(error) 
}
},
// delete
delete:async(req,res)=>{
    try {
        await ProductModel.findByIdAndDelete(req.params.id).exec((err,item)=>{
            if(err){
                res.status(406).json({success:false, message:"err to deleted product "})   
            }else{
                res.status(201).json({success:true, message:"product deleted successufly"})
            }
        })
        
    } catch (error) {
        res.status(500).json(error)   
    }
}






}