const jwt=require("jsonwebtoken")
const JWT_SECRET= process.env.JWT_SECRET

const authMiddleware= async (req,res,next)=>{
    
    try{
        const authToken=req.headers.authorization
    if(!authToken){
        return res.status(401).send("unauthourised access")
    }
    const token=authToken.split(" ")[1]
    if(!token){
        return res.status(401).send("access denied")
    }
    let decoded= await jwt.verify(token,JWT_SECRET)
    req.userId=decoded.userId
    next()

    }catch(error){
        return res.status(401).send("invalid or expired token")
    }
}

module.exports=authMiddleware