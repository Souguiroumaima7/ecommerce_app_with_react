//const route = require("express").Router()
const express = require("express")
const route = express.Router()
const upload = require("../middleware/uploadFile")
const CategoryController = require("../controllers/Category-Controller")

route.post('/create',upload.single("photo"),CategoryController.create)
route.get("/getall",CategoryController.getall)
route.get("/getbyid/:id",CategoryController.getbyid)
route.get("/getbyname",CategoryController.getbyname)
route.put("/update/:id",CategoryController.update)
route.delete("/delete/:id",CategoryController.delete)



module.exports = route