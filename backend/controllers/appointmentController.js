const Appointment=require("../model/appoinmentModel")
const Client = require("../model/client")
const Counsellor = require("../model/counsellor")
const Service=require("../model/service")
const mongoose = require("mongoose")
const billApp=require("../services/billingService")
const Notification = require("../model/notification")

const addAppointment=async (req,res)=>{
    try{
        const {clientId,counsellorId,date,time,appointmentType,status,notes,serviceId}=req.body
       
        console.log("Received serviceId:", serviceId)
console.log("Request body:", req.body)
        const service = await Service.findById(serviceId)

         if (!service) {
            return res.status(404).json({
                message: "Service not found"
            })
        }
        if (!service.isActive) {
            return res.status(400).json({
                message: "This service is currently inactive"
            })
        }
        const appointment=new Appointment({
            clientId:clientId,
            counsellorId:counsellorId,
            serviceId: serviceId,
            date:date,
            time:time,
            appointmentType:appointmentType,
            status:status,
            notes:notes
        })  
        const session=await mongoose.startSession()
        try{
            await session.withTransaction(async()=>{
            await appointment.save({session})
            await billApp.createBillApp(appointment,session)
        })
       
        }finally{
            await session.endSession()
        } 

        try {
            const client = await Client.findById(clientId);

            if (!client) {
                return res.json({message:"cannot find client"})
            } else if (!client.userId) {
                console.log("Client has no linked user account")
            } else {
                await Notification.create({
                    userId: client.userId,
                    title: "Appointment Booked",
                    message: `Your appointment has been booked for ${date} at ${time}.`,
                    type: "appointment",
                    link: "/client/appointments"
                })
            }
            
        } catch (notificationError) {
            console.error(
                "Notification creation failed:",
                notificationError
            )
        }

        return res.status(201).json({
            message: "Appointment booked and bill generated successfully"
        })
        
    }catch(error){
        console.error(error)
        return res.status(500).json({
        message: "Failed to book appointment"
    })
    }
}

const getAppointment=async(req,res)=>{
    try{
        const response=await Appointment.find().populate("clientId", "name phone email")
        .populate("counsellorId", "name email")
        res.status(200).send(response)
    }catch(error){
        console.log(error)
    }
}

const viewAppointment=async (req,res)=>{
    try{
         const counsellor = await Counsellor.findOne({
            userId: req.userId
        })
        if (!counsellor) {
            return res.status(404).send("counsellor not found")
        }
        
        const {id}=req.params
        const response=await Appointment.findOne({
            _id:id,
            counsellorId:counsellor._id
        }).populate("clientId","name phone email")

        if (!response) {
            return res.status(404).send("appointment not found")
        }
        res.status(200)
    }catch(error){
        console.log(error)
    }
}

const updateAppointment=async (req,res)=>{
    try{
        const {id}=req.params
        const{clientId,counsellorId,date,time,appointmentType,status,notes, serviceId}=req.body
        const response=await Appointment.findByIdAndUpdate(id,{
            clientId:clientId,
            counsellorId:counsellorId,
            date:date,
            time:time,
            appointmentType:appointmentType,
            status:status,
            notes:notes,
            serviceId: serviceId
        },{
            new:true
        })
        if(!response){
            return res.status(404).send("appointment not found")
        }
            return res.status(200).send("appointment updated successfuly")
    }catch(error){
        console.log(error)
    }
}

const cancelAppointment=async(req,res)=>{
    try{
        const {id}=req.params
        const appointment= await Appointment.findById(id)
        if(!appointment){
            res.send("appointment not found")
            return
        }
        const response=await Appointment.findByIdAndUpdate(id,{
            status:"cancelled"
        })
        res.status(200).send("appointment cancelled successfully")

    }catch(error){
        console.log(error)
    }
}

const fetchAppointment=async (req,res)=>{
    try{
        const counsellor=await Counsellor.findOne({
            userId:req.userId
        })
        if(!counsellor){
            res.status(401).send("counsellor not found")
            return
        }
        const appointments=await Appointment.find({
            counsellorId:counsellor._id
        }).populate("clientId","name phone email")
       if(appointments.length===0){
        res.status(200).send("no appointments booked yet")
        return
       }
        res.status(200).send(appointments)
    }catch(error){
        console.log(error)
    }
}

const updateStatus=async (req,res)=>{
    try{
         const { status } = req.body

        const counsellor = await Counsellor.findOne({
            userId: req.userId
        })

        if (!counsellor) {
            return res.status(404).send("counsellor not found")
        }

        const appointment = await Appointment.findOne({
            _id: req.params.id,
            counsellorId: counsellor._id
        })

        if (!appointment) {
            return res.status(404).send("appointment not found")
        }

        appointment.status = status

        await appointment.save()

        res.status(200).send({
            message: "appointment status updated",
            appointment: appointment
        })
    }catch(error){
        console.log(error)
    }
}

const updateNotes = async (req, res) => {
    try {
        const { notes } = req.body

        const counsellor = await Counsellor.findOne({
            userId: req.userId
        })

        if (!counsellor) {
            return res.status(404).send("counsellor not found")
        }

        const appointment = await Appointment.findOne({
            _id: req.params.id,
            counsellorId: counsellor._id
        })

        if (!appointment) {
            return res.status(404).send("appointment not found")
        }

        appointment.notes = notes

        await appointment.save()

        res.status(200).send({
            message: "notes updated successfully",
            appointment: appointment
        })

    } catch (error) {
        console.log(error)
        res.status(500).send("error updating notes")
    }
}

const ClientDbAppointment=async (req,res)=>{
    try{
        const client=await Client.findOne({
            userId:req.userId
        })
        if(!client){
            res.status(401).send("client not found")
            return
        }
        const appointments=await Appointment.find({
            clientId:client._id
        }).populate("counsellorId","name phone email")
       if(appointments.length===0){
        res.status(200).send("no appointments booked yet")
        return
       }
        res.status(200).send(appointments)
    }catch(error){
        console.log(error)
    }
}

const ClientSessionHistory=async (req,res)=>{
    try{
        const client=await Client.findOne({
            userId:req.userId
        })
        if(!client){
            res.status(401).send("client not found")
            return
        }
        const appointments=await Appointment.find({
            clientId:client._id,status:"completed"
        }).populate("counsellorId","name phone email")
       if(appointments.length===0){
        res.status(200).send("no completed sessions yet")
        return
       }
        res.status(200).send(appointments)
    }catch(error){
        console.log(error)
    }
}

const appHistory=async (req,res)=>{
    try{
        const counsellor=await Counsellor.findOne({userId:req.userId})
        if(!counsellor){
           return res.status(404).send("unauthourized")
        }
        const appointment=await Appointment.find({
            counsellorId:counsellor._id,
            status:"completed"
        }).populate("clientId","name phone email")

       if(appointment.length===0){
        res.status(200).send("no appointments booked yet")
        return
       }
        res.status(200).send(appointment)
    }catch(error){
        console.log(error)
    }
}


module.exports={addAppointment,getAppointment,viewAppointment,updateAppointment,cancelAppointment,
    fetchAppointment,updateStatus,updateNotes,ClientDbAppointment,ClientSessionHistory,appHistory}