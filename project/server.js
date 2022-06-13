// création d'un serveur local
const express =require("express")
const app = express()
const Database =require("./config/database")
const dotenv =require("dotenv")
const cors = require("cors")
const morgan = require("morgan")
const PORT = process.env.PORT


var corsOptions= {
    origin:"http://localhost:3000",
    optionsSuccessStatus:200
}

app.use(express.json())
app.use(cors("corsOptions"))
app.use(morgan("tiny"))


const ProuductRouter = require("./routers/productrouter")
const CategoryRouter = require ("./routers/Category-Router")
const SubcategoryRouter = require("./routers/Subcategory-Router")
const OrderRouter = require ("./routers/Order-Router")
const ClientRouter = require("./routers/ClientRouter")

//Authentification
const AuthRouter = require("./routers/Auth-Router")


app.use("/products",ProuductRouter)
app.use("/categories",CategoryRouter)
app.use("/subcategories",SubcategoryRouter)
app.use("/orders",OrderRouter)
app.use("/client",ClientRouter)


//Authentification
app.use("/Auth",AuthRouter)



app.get("/getImage/:img", (req,res)=>{
    res.sendFile(__dirname + "/storages/" + req.params.img)
})



app.listen(PORT, ()=>{
    console.log(`server runing on http://localhost:${PORT}`)
})