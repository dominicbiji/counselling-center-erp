import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, CalendarDays, UserRound, 
    Clock, CalendarCheck, LogOut } from "lucide-react"


export default function ClientHistory(){

const nav=useNavigate()
const [sessions,setSessions]=useState([])


useEffect(()=>{
        fetchAppointmentHistory()
    },[])



     async function fetchAppointmentHistory(){
        try{
            const token=localStorage.getItem("token")
             const response = await axios.get("http://localhost:5050/appointment/clientSession",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setSessions(response.data)
            console.log(response.data)
            
        }catch(error){
            console.log(error)
        }
    }

    return (
  <div className="flex min-h-screen bg-gray-100">
    <aside className="w-64 min-h-screen bg-white shadow-md p-6 flex flex-col shrink-0">
      <h2 className="text-2xl font-bold text-blue-600 mb-10">
        Live Life
      </h2>

      <nav className="space-y-3">
        <button
          type="button"
          onClick={() => nav("/client/dashboard")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button
          type="button"
          onClick={() => nav("/client/appointments")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <CalendarDays size={20} />
          My Appointments
        </button>

        <button
          type="button"
          onClick={() => nav("/client/history")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white"
        >
          <Clock size={20} />
          Session History
        </button>

        <button
          type="button"
          onClick={() => nav("/client/profile")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <UserRound size={20} />
          My Profile
        </button>
      </nav>

      <button
        type="button"
        onClick={() => {
          localStorage.removeItem("token");
          nav("/login");
        }}
        className="mt-auto flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>

    <main className="flex-1 min-w-0 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Session History
        </h1>
        <p className="text-gray-500 mt-2">
          View your previous counselling sessions.
        </p>
      </div>

      <div className="mb-6">
        <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
          {sessions.length} Sessions
        </span>
      </div>

      {sessions.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
          <Clock size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">
            No Session History
          </h2>
          <p className="text-gray-500 mt-2">
            Your completed counselling sessions will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start gap-3 mb-5">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {session.counsellorId?.name || "Counsellor"}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {session.appointmentType || "Counselling Session"}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium capitalize">
                  {session.status || "completed"}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Counsellor Email</p>
                  <p className="text-sm text-gray-800 break-all">
                    {session.counsellorId?.email || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Session Date</p>
                  <p className="text-sm text-gray-800">
                    {session.date
                      ? new Date(session.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Session Time</p>
                  <p className="text-sm text-gray-800">
                    {session.time || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Appointment Type</p>
                  <p className="text-sm text-gray-800">
                    {session.appointmentType || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Notes</p>
                  <p className="text-sm text-gray-800">
                    {session.notes || "No notes available"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  </div>
)
    
}