require("dotenv").config()

const transporter=require("./config/email")

transporter.verify((error,success)=>{
    if(error){
        console.log("email conection failed:",error)
    }else{
        console.log("email server is ready")
    }
})