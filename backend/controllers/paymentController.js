const Payment = require("../model/payment")
const Bill = require("../model/bill")
const Razorpay = require("razorpay")
const razorpayInstance=new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})
const mongoose=require("mongoose")
const crypto=require("crypto")


const createPayment=async (req,res)=>{
    try{
        const {billId,amount}=req.body
        if (!billId || amount === undefined || amount === null) {
            return res.status(400).json({
                message: "Bill Id and amount are required"
            })
        }
        const amountValid=Number.isFinite(amount)
        if(!amountValid){
            return res.status(400).json({message:"amount must be avalid number"})
        }
        const billValid=mongoose.Types.ObjectId.isValid(billId)
        if(!billValid){
            return res.status(400).json({message:"invalid bill id"})
        }
        const bill=await Bill.findById(billId)
        if(!bill){
            return res.status(404).json({ message:"bill not found"})
        }
        if(bill.outstandingBalance<=0){
            return res.status(400).json({message:"bill has no outstanding balance"})
        }
        if(amount<=0||amount>bill.outstandingBalance){
            return  res.status(400).json({message:"invalid payment amount"})
        }
        const amountInPaise=(amount*100)
        if(!Number.isInteger(amountInPaise)){
            return res.status(400).json({message:"invalid amount"})
        }
        const razorpayOrder=await razorpayInstance.orders.create({
            amount:amountInPaise,
            currency:"INR",
            receipt:`receipt_${Date.now()}`
        })
        const payment=new Payment({
            billId:billId,
            amount:amount,
            paymentMethod:"razorpay",
            status:"pending",
            razorpayOrderId:razorpayOrder.id
        })
        await payment.save()
        res.status(201).json({
            key: process.env.RAZORPAY_KEY_ID,
            orderId:razorpayOrder.id,
            amount:razorpayOrder.amount,
            currency:razorpayOrder.currency,
            paymentId:payment._id
        })
    }catch(error){
        console.log(error)
         return res.status(500).json({
        message: "Failed to create payment"
    })
    }
}

const verifyPayment=async (req,res)=>{
    try{
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body

        if(!razorpay_order_id|| !razorpay_payment_id|| !razorpay_signature){
            return res.status(400).json({message:"payment verification details are missing"})
        }

        const payment=await Payment.findOne({razorpayOrderId:razorpay_order_id})
        if(!payment){
            return res.status(404).json({message:"payment record not found"})
        }
        const expectedSign=crypto
        .createHmac("sha256",process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id+"|"+razorpay_payment_id)
        .digest("hex")

        const verifysign=expectedSign===razorpay_signature
        if(!verifysign){
            return res.status(400).json({message:"signature verification failed"})
        }
       
        const verifyStatus=payment.status==="success"
        if(verifyStatus){
            return res.status(400).json({message:"payment already verified"})
        }

        const razorpayPayment=await razorpayInstance.payments.fetch(razorpay_payment_id)
        if(razorpayPayment.order_id!==razorpay_order_id){
            return res.status(400).json({message:"payment doesnot belongs to this order"})
        }

        if(razorpayPayment.amount!==payment.amount*100){
            return res.status(400).json({message:"payment does not match"})
        }

        if(razorpayPayment.status!=="captured"){
            return res.status(400).json({message:"payment has not been captured"})
        }

        const session=await mongoose.startSession()
        try{
            await session.withTransaction(async()=>{

        const currentPayment=await Payment.findOne({razorpayOrderId: razorpay_order_id}).session(session)
        if(!currentPayment) {
            throw new Error("Payment record not found")
        }
        if (currentPayment.status === "success") {
            throw new Error("Payment already verified")
        }

            currentPayment.status = "success"
            currentPayment.razorpayPaymentId = razorpay_payment_id
            currentPayment.paidAt = new Date()

            await currentPayment.save({ session })
            

            const bill = await Bill.findById(currentPayment.billId).session(session)
            if (!bill) {
                throw new Error("Bill not found");
            }
            if (currentPayment.amount > bill.outstandingBalance) {
                throw new Error("Payment exceeds outstanding balance");
            }

            bill.amountPaid = currentPayment.amount + bill.amountPaid
            bill.outstandingBalance = bill.outstandingBalance - currentPayment.amount

            if (bill.outstandingBalance === 0) {
                bill.status = "paid"
            } else {
                bill.status = "partially_paid"
            }

            await bill.save({ session });
        })
        }finally{
            await session.endSession()
        }
        return res.status(200).json({
        message: "Payment verified successfully"
    })
        
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"failed to verify payment"})
    }
}

const payAtCounter=async (req,res)=>{
    try{
        const {billId,amount,paymentMethod}=req.body
        if(!billId||!paymentMethod||amount===undefined||amount===null){
            return res.status(400).json({message:"Bill ID, amount and payment method are required"})
        }
        if(paymentMethod!=="cash"){
            return res.status(400).json({message:"invalid payment method"})
        }

        const paymentAmount=Number(amount)
        const amountCheck=Number.isFinite(paymentAmount)

        if(!amountCheck){
            return res.status(400).json({message:"invalid amount"})

        }if(paymentAmount<=0){
            return res.status(400).json({message:"invalid amount"})
        }
        
        const billIdCheck=mongoose.Types.ObjectId.isValid(billId)
        if(!billIdCheck){
            return res.status(400).json({ message: "Invalid bill ID" })
        }
        
        const findBill=await Bill.findById(billId)
        if(!findBill){
            return res.status(404).json({ message: "Bill not found" })
        }

        if(findBill.status==="cancelled"){
            return res.status(400).json({ message: "cannot pay a cancelled bill" })
        }
        if(findBill.outstandingBalance<=0){
            return res.status(400).json({ message: "there is no outstanding bill" })
        }
        if(paymentAmount>findBill.outstandingBalance){
            return res.status(400).json({ message: "payment exceeds the outstanding balance" })
        }
        
        const session=await mongoose.startSession()

        let newPayment
        let currentBill

        try{
             await session.withTransaction(async()=>{
                 currentBill = await Bill.findById(billId).session(session)
                if (!currentBill) {
                        throw new Error("BILL_NOT_FOUND");
                    }

                    if (currentBill.status === "cancelled") {
                        throw new Error("BILL_CANCELLED");
                    }

                    if (currentBill.outstandingBalance <= 0) {
                        throw new Error("NO_OUTSTANDING_BALANCE");
                    }

                    if (paymentAmount > currentBill.outstandingBalance) {
                        throw new Error("PAYMENT_EXCEEDS_BALANCE");
                    }

                newPayment= new Payment({
                billId:currentBill._id,
                amount:paymentAmount,
                paymentMethod:"cash",
                status:"success",
                paidAt:new Date()
        })
        await newPayment.save({session})

        currentBill.amountPaid=paymentAmount+currentBill.amountPaid
        currentBill.outstandingBalance=currentBill.outstandingBalance-paymentAmount

        if(currentBill.outstandingBalance===0){
            currentBill.status="paid"
        }else{
           currentBill.status="partially_paid"
        }
        await currentBill.save({session})
        })

        }finally{
            await session.endSession()
        }
           
        
        return res.status(201).json({
            message:"payment recieved successfully",
            paymentId:newPayment._id,
            amountPaid:currentBill.amountPaid,
            balance:currentBill.outstandingBalance,
            status:currentBill.status
        })
       

    }catch(error){
        console.log(error)
         return res.status(400).json({message:"failed to record counter payment"})
    }
}

const getRevenue=async (req,res)=>{
    try{
        const now = new Date()
        const startOfMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        )

         const startOfNextMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            1
        )

        const totalResponse=await Payment.aggregate([
            {
                $match:{status:"success"}
            },
            {
                $group:{
                    _id:null,
                    totalRevenue:{$sum:"$amount"}
                }
            }
        ])
        const totalRevenue =
            totalResponse.length > 0
                ? totalResponse[0].totalRevenue
                : 0

                const monthResponse = await Payment.aggregate([
            {
                $match: {
                    status: "success",
                    paidAt: {
                        $gte: startOfMonth,
                        $lt: startOfNextMonth
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    thisMonthRevenue: {
                        $sum: "$amount"
                    }
                }
            }
        ])
        const thisMonthRevenue =
            monthResponse.length > 0
                ? monthResponse[0].thisMonthRevenue
                : 0

        const monthlyRevenue = await Payment.aggregate([
            {
                $match: {
                    status: "success",
                    paidAt: {
                        $ne: null
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: {
                            $year: "$paidAt"
                        },
                        month: {
                            $month: "$paidAt"
                        }
                    },
                    revenue: {
                        $sum: "$amount"
                    }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            }
        ])

        res.status(200).json({totalRevenue,monthlyRevenue,thisMonthRevenue})

    }catch(error){
        console.log(error)
        res.status(500).json({ message: "Failed to fetch revenue statistics" })
    }
}


module.exports={createPayment,verifyPayment,payAtCounter,getRevenue}