const UserModel = require("../models/User-Model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET
const RT_SECRET = process.env.RT_SECRET


let RefreshTokens=[]
// generate Accesstoken

const generateAccessToken =(user)=>{
  return jwt.sign({id:user.id, isAdmin:user.isAdmin},JWT_SECRET,{expiresIn:"30m"})
}
//generate RefreshToken

const generateRefreshToken =(user)=>{
  return jwt.sign({id:user.id, isAdmin:user.isAdmin},RT_SECRET,{expiresIn:"1h"})
}

module.exports={

    login:async(req,res)=>{

      try {
        const user = await UserModel.findOne({email:req.body.email})
        !user && res.status(406).json("email not founded")

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(406).json("password incorrect")

        const AccessToken = generateAccessToken(user)
        const RefreshToken = generateRefreshToken(user)
        RefreshTokens.push(RefreshToken)
       


      const {password,_id,email,...others}= user._doc
        res.status(201).json({others,token:AccessToken,RT:RefreshToken})
          
      } catch (error) {
         res.status(500).json(error)
      }
    },

    verifyRefreshToken:(req,res,next)=>{
    const RefreshToken = req.body.token

    if(!RefreshToken)
      return res.status(401).json("you are not authenticated")
      if(!RefreshTokens.includes(RefreshToken))
      return res.status(403).json("RefreshToken is not valid")

      jwt.verify(RefreshToken,RT_SECRET,(err,user)=>{
        err && console.log(err)
        RefreshTokens=RefreshTokens.filter((token)=>token!==RefreshToken)

        const newAcessToken = generateAccessToken(user)
        const newRefreshToken =generateRefreshToken(user)
        RefreshTokens.push(newRefreshToken)

        res.status(200).json({token:newAcessToken, refreshtoken:newRefreshToken })

      })

    },
    logout:(req,res,next)=>{

 const RefreshToken = req.body.token

RefreshTokens = RefreshTokens.filter((token)=>token !==RefreshToken)

res.status(201).json(" you are logged out")

    }

}