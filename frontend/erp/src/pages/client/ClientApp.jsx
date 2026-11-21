import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { LayoutDashboard, CalendarDays, UserRound, 
        Clock, CalendarCheck, LogOut } from "lucide-react"


export default function ClientApp(){
  
        useEffect(()=>{
            fetchAppointment()
        },[])

        const nav=useNavigate()
        const [appointments,setAppointments]=useState([])
    
        
        async function fetchAppointment(){
            try{
                const token=localStorage.getItem("token")
                 const response = await axios.get("http://localhost:5050/appointment/clientAppointment",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setAppointments(response.data)
                console.log(response.data)
                
            }catch(error){
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
                        onClick={() => nav("/client/dashboard")}
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </button>

                    <button
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg bg-blue-600 text-white"
                    >
                        <CalendarDays size={18} />
                        My Appointments
                    </button>

                    <button
                        onClick={() => nav("/client/history")}
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        <Clock size={18} />
                        Session History
                    </button>

                    <button
                        onClick={() => nav("/client/profile")}
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        <UserRound size={18} />
                        My Profile
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

            {/* Heading */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    My Appointments
                </h1>

                <p className="text-gray-500 mt-1">
                    View your scheduled counselling appointments
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
                            Your appointments and their current status
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
                                    {app.counsellorId?.name || "Counsellor"}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    {app.appointmentType || "Counselling Session"}
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

                            {/* Appointment Details */}
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500">
                                        Counsellor Email
                                    </p>

                                    <p className="text-sm text-gray-800 font-medium break-words">
                                        {app.counsellorId?.email || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Appointment Date
                                    </p>

                                    <p className="text-sm text-gray-800 font-medium">
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

                                    <p className="text-sm text-gray-800 font-medium">
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
                        <CalendarDays
                            size={36}
                            className="mx-auto mb-3 text-gray-400"
                        />

                        <h3 className="text-lg font-semibold text-gray-700">
                            No Appointments Found
                        </h3>

                        <p className="text-gray-500 text-sm mt-2">
                            Your scheduled appointments will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    </div>
)
    
}