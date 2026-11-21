import axios from "axios"
import {useEffect,useState} from "react"
import { LayoutDashboard, CalendarDays, Users, History, LogOut, Ban } from "lucide-react"
import { useNavigate } from "react-router-dom"


export default function CounsellorDashboard(){

    const [appointment,setAppointment]=useState([])
    const [clients,setClients]=useState([])
    
    const nav = useNavigate()

    useEffect(()=>{
        fetchAppointment()
        fetchClients()
    },[])


    async function fetchClients(){
        const token=localStorage.getItem("token")
        const response=await axios.get("https://erp-black-eight.vercel.app/client/myClients",{
            headers: {
                    Authorization: `Bearer ${token}`
                }
        })
        setClients(response.data)
        console.log(response.data)
    }

    async function fetchAppointment(){
        try{
            const token=localStorage.getItem("token")
            const response=await axios.get("https://erp-black-eight.vercel.app/appointment/myappointments",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setAppointment(response.data)
            console.log(response.data)


        }catch(error){
            console.log(error)
        }
    }

    

    

function handleLogout(){}
       
   return (
    <div className="min-h-screen bg-gray-100 flex">

        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white shadow-md p-6 flex flex-col">

            <div>
                <h2 className="text-2xl font-bold text-blue-600 mb-10">
                    Live Life
                </h2>

                <div className="flex flex-col gap-3">

                    <button
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg bg-blue-600 text-white"
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </button>


                    <button
                        onClick={() => nav("/counsellor/clients")}
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        <Users size={18} />
                        My Clients
                    </button>

                    <button
                        onClick={() => nav("/counsellor/history")}
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        <History size={18} />
                        Appointment History
                    </button>

                </div>
            </div>

            <button
                onClick={() => {
                    localStorage.removeItem("token")
                    nav("/login")
                }}
                className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600"
            >
                <LogOut size={18} />
                Logout
            </button>

        </div>


        {/* Main Content */}
        <div className="flex-1 p-8">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Counsellor Dashboard
                </h1>

                <p className="text-gray-500 mt-1">
                    Manage your clients and appointments
                </p>
            </div>


            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                {/* My Clients */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-gray-500 text-sm">
                                My Clients
                            </p>

                            <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                {clients.length}
                            </h2>
                        </div>

                        <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                            <Users size={24} />
                        </div>

                    </div>
                </div>


                {/* Today's Appointments */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-gray-500 text-sm">
                                Today's Appointments
                            </p>

                            <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                {
                                    appointment.filter(app =>
                                        new Date(app.date).toDateString() ===
                                        new Date().toDateString()
                                    ).length
                                }
                            </h2>
                        </div>

                        <div className="bg-green-100 text-green-600 p-3 rounded-lg">
                            <CalendarDays size={24} />
                        </div>

                    </div>
                </div>


                {/* Total Appointments */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-gray-500 text-sm">
                                Total Appointments
                            </p>

                            <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                {appointment.length}
                            </h2>
                        </div>

                        <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
                            <History size={24} />
                        </div>

                    </div>
                </div>

            </div>


            {/* Today's Appointments */}
            <div>

                <div className="flex items-center justify-between mb-5">

                    <h2 className="text-2xl font-bold text-gray-800">
                        Today's Appointments
                    </h2>

                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                        {
                            appointment.filter(app =>
                                new Date(app.date).toDateString() ===
                                new Date().toDateString()
                            ).length
                        } Appointments
                    </span>

                </div>


                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-50 border-b">

                                <tr>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                        Client
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                        Date
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                        Time
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                        Type
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                        Status
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody className="divide-y">

                                {
                                    appointment
                                        .filter(app =>
                                            new Date(app.date).toDateString() ===
                                            new Date().toDateString()
                                        )
                                        .map((app) => (

                                            <tr
                                                key={app._id}
                                                className="hover:bg-gray-50 transition"
                                            >

                                                {/* Client */}
                                                <td className="px-6 py-5">

                                                    <p className="font-semibold text-gray-800">
                                                        {app.clientId?.name}
                                                    </p>

                                                    <p className="text-sm text-gray-500">
                                                        {app.clientId?.email}
                                                    </p>

                                                </td>


                                                {/* Date */}
                                                <td className="px-6 py-5 text-gray-700">

                                                    {new Date(app.date).toLocaleDateString(
                                                        "en-GB",
                                                        {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric"
                                                        }
                                                    )}

                                                </td>


                                                {/* Time */}
                                                <td className="px-6 py-5 text-gray-700">
                                                    {app.time}
                                                </td>


                                                {/* Type */}
                                                <td className="px-6 py-5 text-gray-700">
                                                    {app.appointmentType}
                                                </td>


                                                {/* Status */}
                                                <td className="px-6 py-5">

                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-medium
                                                        ${
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
                                                        {app.status}
                                                    </span>

                                                </td>


                                                {/* Action */}
                                                <td className="px-6 py-5">

                                                    <div className="flex items-center justify-between w-full">

                                                        {/* Attend */}
                                                        {
                                                            app.status !== "completed" &&
                                                            app.status !== "cancelled" &&
                                                            app.status !== "no-show" && (

                                                                <button
                                                                    onClick={() =>
                                                                        nav(`/counsellor/appointment/${app._id}`)
                                                                    }
                                                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                                                                >
                                                                    Attend
                                                                </button>

                                                            )
                                                        }


                                                        {/* Cancel */}
                                                        {
                                                            app.status !== "completed" &&
                                                            app.status !== "cancelled" && (

                                                                <button
                                                                    className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition"
                                                                >
                                                                    <Ban size={16} />
                                                                    Cancel
                                                                </button>

                                                            )
                                                        }

                                                    </div>

                                                </td>

                                            </tr>

                                        ))
                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    </div>
)
   
   
}