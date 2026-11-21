const User=require("../model/user")


function roleMiddleware(...requiredRoles){
    return async (req,res,next)=>{
        try{
            const user=await User.findById(req.userId)
            const role=user.role

            if(requiredRoles.includes(role)){
                console.log(req.userId)
                console.log(user.role)
                next()
            }
            
            else{
                res.status(403).send("forbidden")
            }
        }catch(error){
            console.log(error)
        }
    }
}


module.exports=roleMiddleware