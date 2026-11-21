const Bill=require("../model/bill")
const Client=require("../model/client")
const Appointment=require("../model/appoinmentModel")


const getBills=async (req,res)=>{
    try{
        const client=await Client.findOne({userId:req.userId})
        
        if(!client){
            return res.status(404).json({message:"client not found"})
        }
        const bill=await Bill.find({clientId:client._id})
        
        res.status(200).send(bill)
         
    }catch(error){
        console.log(error)
        res.status(500).json({message:"failed to fetch bill"})
    }
}

const fetchAllBill=async (req,res)=>{
    try{
        const response=await Bill.find().populate("clientId","name")
        res.status(200).send(response)
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Failed to fetch bills"
        })
    }
}




module.exports={getBills,fetchAllBill}