const express = require("express")
const route = express.Router()

const OrderController = require("../controllers/Order-Controller")

route.post('/create',OrderController.create)
 route.get("/getall",OrderController.getall)
route.get("/getbyid/:id",OrderController.getbyid)
route.get("/getbyname",OrderController.getbyname)
route.put("/update/:id",OrderController.update)
route.delete("/delete/:id",OrderController.delete)



module.exports = route