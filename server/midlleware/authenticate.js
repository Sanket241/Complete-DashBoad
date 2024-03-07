const jwt = require('jsonwebtoken')
const Product = require('../models/userSchemavalue')
const secret = "sanketsharmasanketsharmagoodboii"

const authenticate = async(req,res,next)=>{
    try{
        const token = req.headers.authorization;
        const verifytoken = jwt.verify(token,secret);        
        console.log(verifytoken)
        const rootuser = await Product.findOne({_id:verifytoken._id})
        if(!rootuser){
            throw new Error("Use not found")
        }
        req.token = token
        req.rootuser = rootuser
        req.userId = rootuser._id
        next()
    }catch(e){
        res.status(401).json({status:401,message:"Unauthorized no token"})
    }

}
module.exports = authenticate