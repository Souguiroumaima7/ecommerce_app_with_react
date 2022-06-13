const express = require("express")
const route = express.Router()

const AuthController = require("../controllers/Auth-Controller")

route.post("/login",AuthController.login)
route.post("/refreshtoken",AuthController.verifyRefreshToken)
route.post("/logout",AuthController.logout)


module.exports = route