import {useState,useEffect} from "react"
import axios from "axios"
import { LayoutDashboard, CalendarDays, Users,
     UserRound, UserRoundCog, CalendarCheck, Clock, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom"


export default function RecepApp(){

const [appointments,setAppointments]=useState([])
const nav=useNavigate()

    useEffect(()=>{
        getAppointments()
    },[])

   
    async function getAppointments(){
        try{
            const token=localStorage.getItem("token")
            const res=await axios.get("https://erp-black-eight.vercel.app/appointment/getAppointment",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setAppointments(res.data)
            console.log(res.data)
        }catch(error){
            console.log("Error message:", error.message)
            console.log("Status:", error.response?.status)
            console.log("Response:", error.response?.data)
        }
    }
    
    
    return (
    <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">

            {/* Heading */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Appointment Details
                </h1>

                <p className="text-gray-500 mt-1">
                    View and manage all scheduled appointments
                </p>
            </div>

            {/* Appointment Count */}
            <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Appointment List
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            All registered appointments
                        </p>
                    </div>

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {appointments.length} Appointments
                    </span>
                </div>
            </div>

            {/* Appointment Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appointments.length > 0 ? (
                    appointments.map((app) => (
                        <div
                            key={app._id}
                            className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition"
                        >
                            {/* Appointment Header */}
                            <div className="border-b pb-4 mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {app.clientId?.name || "Unknown Client"}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Client Appointment
                                </p>

                                <span
                                    className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${
                                        app.status === "completed"
                                            ? "bg-green-100 text-green-700"
                                            : app.status === "cancelled"
                                            ? "bg-red-100 text-red-700"
                                            : app.status === "confirmed"
                                            ? "bg-blue-100 text-blue-700"
                                            : app.status === "no-show"
                                            ? "bg-gray-100 text-gray-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                                >
                                    {app.status || "scheduled"}
                                </span>
                            </div>

                            {/* Appointment Information */}
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500">
                                        Client Email
                                    </p>
                                    <p className="text-sm text-gray-800 font-medium break-words">
                                        {app.clientId?.email || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Client Phone
                                    </p>
                                    <p className="text-sm text-gray-800 font-medium">
                                        {app.clientId?.phone || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Counsellor
                                    </p>
                                    <p className="text-sm text-gray-800 font-medium">
                                        {app.counsellorId?.name || "Not assigned"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Appointment Date
                                    </p>
                                    <p className="text-sm text-gray-800">
                                        {app.date
                                            ? new Date(app.date).toLocaleDateString(
                                                  "en-GB",
                                                  {
                                                      day: "2-digit",
                                                      month: "short",
                                                      year: "numeric"
                                                  }
                                              )
                                            : "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Appointment Time
                                    </p>
                                    <p className="text-sm text-gray-800">
                                        {app.time || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Appointment Type
                                    </p>
                                    <p className="text-sm text-gray-800">
                                        {app.appointmentType || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Notes
                                    </p>
                                    <p className="text-sm text-gray-800 break-words">
                                        {app.notes || "No notes available"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full bg-white rounded-xl shadow-sm border p-10 text-center">
                        <h3 className="text-lg font-semibold text-gray-700">
                            No Appointments Found
                        </h3>

                        <p className="text-gray-500 text-sm mt-2">
                            Scheduled appointments will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    </div>
);
    
}