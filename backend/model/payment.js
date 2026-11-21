const mongoose=require("mongoose")

const paymentSchema=new mongoose.Schema({
    billId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Bill",
        required:true
    },
        amount: {
        type: Number,
        required: true,
        min: 0
    },
        paymentMethod: {
        type: String,
        enum: ["razorpay", "cash"],
        required: true
    },
        status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending"
    },
        razorpayOrderId: {
        type: String,
        default: null
    },
        razorpayPaymentId: {
        type: String,
        default: null
    },
        paidAt: {

        type: Date,
        default: null
    }

},{ timestamps: true })

const Payment = mongoose.model("Payment", paymentSchema)

module.exports = Payment