// const express = require("express")
// const route = express.Router()

const route = require("express").Router()

const ProductController = require("../controllers/Product-Controller")
const upload = require("../middleware/uploadFile")

const {verifytoken,verifyTokenAndAuthorization,verifyTokenAndAdmmin} = require("../middleware/Auth")

route.post("/create",upload.array("photos"),ProductController.create)
route.get("/getall",verifyTokenAndAdmmin,ProductController.getall)
route.get("/getbyid/:id",ProductController.getbyid)
route.get("/getbyname",ProductController.getbyname)
route.put("/update/:id",ProductController.update)
route.delete("/delete/:id",ProductController.delete)

module.exports= route