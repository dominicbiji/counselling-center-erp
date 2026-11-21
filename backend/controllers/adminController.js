const Appointment=require("../model/appoinmentModel")
const Client = require("../model/client")
const Counsellor = require("../model/counsellor")



const adminDashboard = async (req, res) => {
    try {
        const totalClients = await Client.countDocuments()
        const totalCounsellors = await Counsellor.countDocuments()

        const today=new Date()
        const startOfToday=new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        )
        const startOfTomorrow=new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()+1
        )

        const todaysAppointments=await Appointment.countDocuments({
            date:{
                $gte:startOfToday,
                $lt:startOfTomorrow
            }
        })

        const upcomingAppointments=await Appointment.find({
            date:{
                $gte:startOfToday
            }
        })
        .populate("clientId","name phone email")
        .populate("counsellorId","name phone email")
        .sort({date:1})

        res.status(200).send({
            totalClients: totalClients,
            totalCounsellors: totalCounsellors,
            todaysAppointments:todaysAppointments,
            upcomingAppointments:upcomingAppointments
    
        })
    } catch (error) {
        console.log(error)
        res.status(500).send("error fetching dashboard data")
    }
}


module.exports={adminDashboard}