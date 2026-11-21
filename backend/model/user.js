const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true,
        default:"client",
        enum:["admin","counsellor","client","receptionist"]
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    }
})

const User=mongoose.model("User",userSchema)

module.exports=User