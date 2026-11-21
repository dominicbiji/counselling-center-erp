const mongoose=require("mongoose")

const receptionistSchema=new mongoose.Schema({
     name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const Receptionist=mongoose.model("Receptionist",receptionistSchema)
module.exports=Receptionist