const mongoose=require("mongoose")

const appointmentSchema=new mongoose.Schema({
    clientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Client",
        required:true
    },
    counsellorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Counsellor",
        required: true
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    time: {
        type: String,
        required: true
    },

    appointmentType: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["scheduled", "confirmed", "completed", "cancelled", "no-show"],
        default: "scheduled"
    },

    notes: {
        type: String
    }

})

const Appointment=mongoose.model("Appointment",appointmentSchema)

module.exports=Appointment

