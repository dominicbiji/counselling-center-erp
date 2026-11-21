import {useState,useEffect} from "react"
import axios from "axios"
import { LayoutDashboard, CalendarDays, Users,
     UserRound, UserRoundCog, CalendarCheck, Clock, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"


export default function ReceptionistDashboard(){

    const nav=useNavigate()

    useEffect(()=>{
        getAppointments()
        getClients()
        getCounsellors()
        fetchDashboard() 
    },[])

    const [appointments,setAppointments]=useState([])
    const [clients,setClients]=useState([])
    const [counsellors,setCounsellors]=useState([])

    const [clientsno,setClientsno]=useState(0)
    const [counsellorsno,setCounsellorsno]=useState(0)
    const [todaysApp,setTodaysApp]=useState(0)
    const [upcomingApp,setUpcomingApp]=useState([])
    

    async function getAppointments(){
        try{
            const token=localStorage.getItem("token")
            const res=await axios.get("http://localhost:5050/appointment/getAppointment",{
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
    async function getClients(){
        try{
            const token=localStorage.getItem("token")
            const res=await axios.get("http://localhost:5050/client/read",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setClients(res.data)
            console.log(res.data)
        }catch(error){
            console.log("Error message:", error.message)
            console.log("Status:", error.response?.status)
            console.log("Response:", error.response?.data)
        }
    }
    async function getCounsellors(){
        try{
            const token=localStorage.getItem("token")
            const res=await axios.get("http://localhost:5050/counsellor/getcounsellor",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setCounsellors(res.data)
            console.log(res.data)
        }catch(error){
            console.log("Error message:", error.message)
            console.log("Status:", error.response?.status)
            console.log("Response:", error.response?.data)
        }
    }

    async function fetchDashboard() {
    try {
        const token = localStorage.getItem("token")

        const response = await axios.get("http://localhost:5050/admin/dashboard",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        setClientsno(response.data.totalClients)
        setCounsellorsno(response.data.totalCounsellors)
        setTodaysApp(response.data.todaysAppointments)
        setUpcomingApp(response.data.upcomingAppointments)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}


        
        
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
                        onClick={() => nav("/appointments")}
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        <CalendarDays size={18} />
                        Appointments
                    </button>

                    <button
                        onClick={() => nav("/counterPay")}
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        <CalendarDays size={18} />
                        payment
                    </button>

                    <button
                        onClick={() => nav("/receptionist/clients")}
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        <Users size={18} />
                        Clients
                    </button>

                    <button
                        onClick={() => nav("/receptionist/counsellors")}
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        <UserRoundCog size={18} />
                        Counsellors
                    </button>
                </div>
            </div>

            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    nav("/login");
                }}
                className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 mt-auto"
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
                    Receptionist Dashboard
                </h1>

                <p className="text-gray-500 mt-1">
                    Manage clients, counsellors and appointments
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Clients */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">
                                Total Clients
                            </p>
                            <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                {clientsno}
                            </h2>
                        </div>

                        <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                            <Users size={24} />
                        </div>
                    </div>
                </div>

                {/* Total Counsellors */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">
                                Total Counsellors
                            </p>
                            <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                {counsellorsno}
                            </h2>
                        </div>

                        <div className="bg-green-100 text-green-600 p-3 rounded-lg">
                            <UserRoundCog size={24} />
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
                                {todaysApp}
                            </h2>
                        </div>

                        <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
                            <CalendarCheck size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Appointments */}
            <div>
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Upcoming Appointments
                    </h2>

                    <button
                        onClick={() => nav("/receptionist/appointments")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                    >
                        View All
                    </button>
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
                                        Counsellor
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
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {upcomingApp.length > 0 ? (
                                    upcomingApp.slice(0, 5).map((app) => (
                                        <tr
                                            key={app._id}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className="px-6 py-5">
                                                <p className="font-semibold text-gray-800">
                                                    {app.clientId?.name || "N/A"}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {app.clientId?.phone || ""}
                                                </p>
                                            </td>

                                            <td className="px-6 py-5 text-gray-700">
                                                {app.counsellorId?.name || "N/A"}
                                            </td>

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

                                            <td className="px-6 py-5 text-gray-700">
                                                {app.time}
                                            </td>

                                            <td className="px-6 py-5 text-gray-700">
                                                {app.appointmentType}
                                            </td>

                                            <td className="px-6 py-5">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="px-6 py-10 text-center text-gray-500"
                                        >
                                            <CalendarDays
                                                size={32}
                                                className="mx-auto mb-3 text-gray-400"
                                            />
                                            No upcoming appointments found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
)




}