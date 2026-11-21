import {useNavigate} from "react-router-dom"
import axios from "axios"
import { useEffect,useState } from "react"
import {LayoutDashboard,Users,UserRoundCog,CalendarDays,FileText,
    UserPlus,LogOut,CalendarCheck,Clock,UserRound,Stethoscope} from "lucide-react"

export default function AdminDashboard(){
    const nav=useNavigate()
    const [clientsno,setClientsno]=useState(0)
    const [counsellorsno,setCounsellorsno]=useState(0)
    const [todaysApp,setTodaysApp]=useState(0)
    const [upcomingApp,setUpcomingApp]=useState([])

    useEffect(()=>{
        fetchDashboard()
    },[])


async function fetchDashboard() {
    try {
        const token = localStorage.getItem("token")

        const response = await axios.get("https://erp-black-eight.vercel.app/admin/dashboard",
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
    function handleLogout() {
       localStorage.removeItem("token")
       nav("/login")
}

        return (
    <div className="min-h-screen bg-gray-100">

        {/* Navbar */}
        <nav className="bg-white  px-6 py-4 flex justify-between items-center">

            <div className="flex items-center gap-3">

               

                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Live Life
                    </h2>

                    <p className="text-xs text-gray-500">
                        Counselling Center ERP
                    </p>
                </div>

            </div>


            <div className="flex items-center gap-5">

                <div className="flex items-center gap-2">

                    <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                        <UserRound size={18} />
                    </div>

                    <span className="font-medium text-gray-700">
                        Admin
                    </span>

                </div>


                

            </div>

        </nav>


        <div className="flex">

            {/* Sidebar */}

            <aside className="w-64 min-h-screen bg-white shadow-md p-5">

                <h3 className="text-lg font-bold text-gray-800 mb-7 px-2">
                    Admin Panel
                </h3>


                <div className="flex flex-col gap-2">

                    {/* Dashboard */}

                    <button
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg bg-blue-600 text-white"
                    >
                        <LayoutDashboard size={19} />

                        <span>
                            Dashboard
                        </span>
                    </button>


                    {/* Clients */}

                    <button
                        onClick={() => nav("/clients")}
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                    >
                        <Users size={19} />

                        <span>
                            Clients
                        </span>
                    </button>


                    {/* Counsellors */}

                    <button
                        onClick={() => nav("/counsellors")}
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                    >
                        <UserRoundCog size={19} />

                        <span>
                            Counsellors
                        </span>
                    </button>


                    {/* Receptionists */}

                    <button
                        onClick={() => nav("/receptionists")}
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                    >
                        <UserPlus size={19} />

                        <span>
                            Receptionists
                        </span>
                    </button>


                    {/* Appointments */}

                    <button onClick={() => nav("/appointments")}
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                    >
                        <CalendarDays size={19} />

                        <span>
                            Appointments
                        </span>
                    </button>

                    <button onClick={() => nav("/admin/services")}
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                    >
                        <CalendarDays size={19} />

                        <span>
                            Services
                        </span>
                    </button>
                    <button onClick={() => nav("/counterPay")}
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                    >
                        <CalendarDays size={19} />

                        <span>
                            payments
                        </span>
                    </button>


                    {/* Reports */}

                    <button onClick={() => nav("/admin/revenue")}
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                    >
                        <FileText size={19} />

                        <span>
                            Reports
                        </span>
                    </button>

                    <button onClick={handleLogout}
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition mt-4"
                    >
                        <LogOut size={19} />

                        <span>
                            Logout
                        </span>
                    </button>

                </div>

            </aside>


            {/* Main Content */}

            <main className="flex-1 p-8">

                {/* Heading */}

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome Admin
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Here's what's happening at your counselling center today.
                    </p>

                </div>


                {/* Statistics */}

                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">


                    {/* Total Clients */}

                    <div className="bg-white p-6 rounded-xl shadow-sm border">

                        <div className="flex justify-between items-start">

                            <div>

                                <p className="text-gray-500 font-medium">
                                    Total Clients
                                </p>

                                <p className="text-3xl font-bold text-gray-800 mt-3">
                                    {clientsno}
                                </p>

                            </div>


                            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                                <Users size={24} />
                            </div>

                        </div>

                    </div>


                    {/* Total Counsellors */}

                    <div className="bg-white p-6 rounded-xl shadow-sm border">

                        <div className="flex justify-between items-start">

                            <div>

                                <p className="text-gray-500 font-medium">
                                    Total Counsellors
                                </p>

                                <p className="text-3xl font-bold text-gray-800 mt-3">
                                    {counsellorsno}
                                </p>

                            </div>


                            <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">
                                <Stethoscope size={24} />
                            </div>

                        </div>

                    </div>


                    {/* Today's Appointments */}

                    <div className="bg-white p-6 rounded-xl shadow-sm border">

                        <div className="flex justify-between items-start">

                            <div>

                                <p className="text-gray-500 font-medium">
                                    Today's Appointments
                                </p>

                                <p className="text-3xl font-bold text-gray-800 mt-3">
                                    {todaysApp}
                                </p>

                            </div>


                            <div className="bg-green-100 text-green-600 p-3 rounded-xl">
                                <CalendarCheck size={24} />
                            </div>

                        </div>

                    </div>

                </section>


                {/* Upcoming Appointments */}

                <section className="mt-8">

                    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

                        {/* Section Header */}

                        <div className="px-6 py-5 border-b flex justify-between items-center">

                            <div>

                                <h2 className="text-xl font-bold text-gray-800">
                                    Upcoming Appointments
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Today's and upcoming scheduled appointments
                                </p>

                            </div>


                            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                                <CalendarDays size={22} />
                            </div>

                        </div>


                        {/* No Appointments */}

                        {upcomingApp.length === 0 ? (

                            <div className="py-12 flex flex-col items-center justify-center text-gray-500">

                                <CalendarDays
                                    size={45}
                                    className="mb-3 text-gray-400"
                                />

                                <p className="font-medium">
                                    No upcoming appointments
                                </p>

                            </div>

                        ) : (

                            /* Appointment Table */

                            <div className="overflow-x-auto">

                                <table className="w-full">

                                    <thead className="bg-gray-50">

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


                                    <tbody>

                                        {upcomingApp.map(
                                            (appointment) => (

                                                <tr
                                                    key={appointment._id}
                                                    className="border-t hover:bg-gray-50 transition"
                                                >

                                                    {/* Client */}

                                                    <td className="px-6 py-4">

                                                        <div className="flex items-center gap-3">

                                                            <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                                                                <UserRound size={18} />
                                                            </div>

                                                            <div>

                                                                <p className="font-medium text-gray-800">
                                                                    {appointment.clientId?.name}
                                                                </p>

                                                                <p className="text-sm text-gray-500">
                                                                    {appointment.clientId?.phone}
                                                                </p>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    {/* Counsellor */}

                                                    <td className="px-6 py-4">

                                                        <div className="flex items-center gap-2">

                                                            <Stethoscope
                                                                size={18}
                                                                className="text-purple-600"
                                                            />

                                                            <span className="text-gray-700">
                                                                {appointment.counsellorId?.name}
                                                            </span>

                                                        </div>

                                                    </td>


                                                    {/* Date */}

                                                    <td className="px-6 py-4">

                                                        <div className="flex items-center gap-2 text-gray-700">

                                                            <CalendarDays
                                                                size={17}
                                                                className="text-blue-500"
                                                            />

                                                            <span>
                                                                {new Date(
                                                                    appointment.date
                                                                ).toLocaleDateString()}
                                                            </span>

                                                        </div>

                                                    </td>


                                                    {/* Time */}

                                                    <td className="px-6 py-4">

                                                        <div className="flex items-center gap-2 text-gray-700">

                                                            <Clock
                                                                size={17}
                                                                className="text-orange-500"
                                                            />

                                                            <span>
                                                                {appointment.time}
                                                            </span>

                                                        </div>

                                                    </td>


                                                    {/* Appointment Type */}

                                                    <td className="px-6 py-4">

                                                        <span className="text-gray-700">
                                                            {appointment.appointmentType}
                                                        </span>

                                                    </td>


                                                    {/* Status */}

                                                    <td className="px-6 py-4">

                                                        <span
                                                            className={
                                                                appointment.status === "completed"
                                                                    ? "px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"
                                                                    : appointment.status === "cancelled"
                                                                    ? "px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700"
                                                                    : appointment.status === "confirmed"
                                                                    ? "px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
                                                                    : "px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700"
                                                            }
                                                        >
                                                            {appointment.status}
                                                        </span>

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </section>

            </main>

        </div>

    </div>
)


   
}


