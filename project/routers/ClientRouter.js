const express = require("express")
const route = express.Router()

const ClientController = require("../controllers/ClientController")


const upload = require('../middleware/uploadFile')

route.post('/create',upload.single("photo"),ClientController.register)
route.get('/getall',ClientController.getall)
route.get("/getbyid/:id",ClientController.getbyid)
route.get("/getbyname",ClientController.getbyname)
route.put("/update/:id",upload.single("photo"),ClientController.update)
route.delete("/delete/:id",ClientController.delete)
route.get("/stats",ClientController.getstats)

module.exports = route