const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env. JWT_SECRET

const verifytoken=(req,res,next)=>{
const token = req.headers.authorization

if(token){
    jwt.verify(token,JWT_SECRET,(err,user)=>{
if(err){
    res.status(403).json("token is not valid")
}else{
    req.user = user
    next()
}
    })
}else{
    res.status(401).json("you are not authenticated")
}

}

const verifyTokenAndAuthorization=(req,res,next)=>{
    verifytoken(req,res,()=>{

        if(req.user.id === req.params.id  || req.user.isAdmin){

            next()

        }else{
            res.status(401).json(" Your not allowed to do that")
        }
    })

}

const verifyTokenAndAdmmin=(req,res,next)=>{
verifytoken(req,res,()=>{
    if(req.user.isAdmin){
        next()
    }else{
        res.status(403).json("You are not Allowed to do that")
    }
})
}


module.exports = {verifytoken,verifyTokenAndAuthorization,verifyTokenAndAdmmin}