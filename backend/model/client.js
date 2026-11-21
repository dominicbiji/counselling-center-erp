const mongoose=require("mongoose")


const clientSchema=new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    },
    counsellorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Counsellor"
    },
    name:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    occupation:{
        type:String,
        required:true
    },
    registrationDate:{
        type:Date,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    referralSource:{
        type:String,
        required:true
    },
    services:{
        type:[String],
        required:true
    },
    enquiries:{
        type:String,
        required:true
    }
})

const Client=mongoose.model("Client",clientSchema)

module.exports=Client