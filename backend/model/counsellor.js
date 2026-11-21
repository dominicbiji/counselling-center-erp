const mongoose=require("mongoose")
const User=require("./user")


const counsellorSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

const Counsellor=mongoose.model("Counsellor",counsellorSchema)

module.exports=Counsellor
