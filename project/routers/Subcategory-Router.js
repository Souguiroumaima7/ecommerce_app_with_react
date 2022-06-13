const express = require("express")
const route = express.Router()

const SubCategoryController = require("../controllers/Subcategory-Controller")

route.post('/create',SubCategoryController.create)
 route.get("/getall",SubCategoryController.getall)
route.get("/getbyid/:id",SubCategoryController.getbyid)
route.get("/getbyname",SubCategoryController.getbyname)
route.put("/update/:id",SubCategoryController.update)
route.delete("/delete/:id",SubCategoryController.delete)



module.exports = route