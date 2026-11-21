const mongoose=require("mongoose")

const serviceSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
    },
    fee:{
        type:Number,
        required:true,
        min:0,
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

const Service=mongoose.model("Service",serviceSchema)

module.exports=Service