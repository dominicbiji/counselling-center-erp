const Bill=require("../model/bill")
const Service=require("../model/service")

const createBillApp=async (appointment,session)=>{
    
        const service=await Service.findById(appointment.serviceId).session(session)
        if(!service){
            throw new Error("service not found")
        }
        if(service.isActive===false){
            throw new Error("service is inactive")
        }
        const billExists=await Bill.findOne({appointmentId:appointment._id}).session(session)
        if(billExists){
            throw new Error("bill already generated for this appointment")
        }
        const bill=new Bill({
            clientId:appointment.clientId,
            appointmentId:appointment._id,
            totalFee:service.fee,
            amountPaid:0,
            outstandingBalance:service.fee,
            status:"pending"
        })
        await bill.save({session})
        return bill
}

module.exports={createBillApp}