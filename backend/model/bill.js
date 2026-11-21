const mongoose=require("mongoose")

const billSchema=new mongoose.Schema({
    clientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Client",
        required:true
    },
    appointmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Appointment",
        required:true,
        unique:true
    },
    totalFee:{
        type:Number,
        required:true,
        min:0
    },
    amountPaid:{
        type:Number,
        required:true,
        min:0,
        default:0
    },
    outstandingBalance:{
        type:Number,
        required:true,
        min:0,
        default:0
    },
    status:{
        type:String,
        enum:["pending","partially_paid","paid","cancelled"],
        default:"pending"
    }
})
const Bill=mongoose.model("Bill",billSchema)
module.exports=Bill