import {useState,useEffect} from "react"
import axios from "axios"

export default function AppHistory(){

    useEffect(()=>{
        console.log("AppHistory loaded")
        fetchAppointments()
    },[])


    const [appointments,setAppointments]=useState([])

    async function fetchAppointments(){
        try{
            const token=localStorage.getItem("token")
            const res=await axios.get("https://erp-black-eight.vercel.app/appointment/history",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setAppointments(res.data)
            console.log(res.data)
        }catch(error){
            console.log(error)
        }
    }

    return (
    <div className="min-h-screen bg-gray-100 p-6">

        <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Appointment History
                </h1>

                <p className="text-gray-500 mt-1">
                    View your completed counselling sessions
                </p>
            </div>


            {/* History Table */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

                <div className="p-5 border-b">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Completed Sessions
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {appointments.length} completed session
                        {appointments.length !== 1 ? "s" : ""}
                    </p>
                </div>


                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead className="bg-gray-50 border-b">

                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Client
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Date
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Time
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Type
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Notes
                                </th>
                            </tr>

                        </thead>


                        <tbody className="divide-y">

                            {appointments.map((appointment) => (

                                <tr
                                    key={appointment._id}
                                    className="hover:bg-gray-50 transition"
                                >

                                    {/* Client */}
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-800">
                                            {appointment.clientId?.name}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {appointment.clientId?.email}
                                        </p>
                                    </td>


                                    {/* Date */}
                                    <td className="px-6 py-4 text-gray-700">
                                        {new Date(
                                            appointment.date
                                        ).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        })}
                                    </td>


                                    {/* Time */}
                                    <td className="px-6 py-4 text-gray-700">
                                        {appointment.time}
                                    </td>


                                    {/* Type */}
                                    <td className="px-6 py-4 text-gray-700">
                                        {appointment.appointmentType}
                                    </td>


                                    {/* Status */}
                                    <td className="px-6 py-4">

                                        <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                                            {appointment.status}
                                        </span>

                                    </td>


                                    {/* Notes */}
                                    <td className="px-6 py-4">

                                        <p className="text-sm text-gray-600 max-w-xs">
                                            {appointment.notes || "No notes"}
                                        </p>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    </div>
)
}