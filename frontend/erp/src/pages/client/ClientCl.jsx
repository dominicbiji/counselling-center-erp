import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, CalendarDays, UserRound, 
    Clock, CalendarCheck, LogOut } from "lucide-react"



export default function ClientCl(){
const nav=useNavigate()
const [client,setClient]=useState(null)

     useEffect(()=>{
        fetchClient()
    },[])

    async function fetchClient(){
        try{
            const token=localStorage.getItem("token")
            const response=await axios.get("https://erp-black-eight.vercel.app/client/account",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        setClient(response.data)
        console.log(response.data)
        }catch(error){
            console.log(error)
        }
       
    }

    async function fetchAppointment(){
        try{
            const token=localStorage.getItem("token")
             const response = await axios.get("https://erp-black-eight.vercel.app/appointment/clientAppointment",
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
  <div className="flex min-h-screen bg-gray-100">
    {/* Sidebar */}
    <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-blue-600 mb-10">
        Live Life
      </h2>

      <nav className="space-y-3">
        <button
          onClick={() => nav("/client/dashboard")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button
          onClick={() => nav("/client/appointments")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <CalendarDays size={20} />
          My Appointments
        </button>

        <button
          onClick={() => nav("/client/history")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <Clock size={20} />
          Session History
        </button>

        <button
          onClick={() => nav("/client/profile")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white"
        >
          <UserRound size={20} />
          My Profile
        </button>
      </nav>

      <button
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

    {/* Main Content */}
    <main className="flex-1 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          My Profile
        </h1>
        <p className="text-gray-500 mt-2">
          View your personal and contact information.
        </p>
      </div>

      {!client ? (
        <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
          <p className="text-gray-500">Loading profile...</p>
        </div>
      ) : (
        <div className="max-w-4xl">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold">
                {client.name?.charAt(0)?.toUpperCase() || "C"}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {client.name || "Client"}
                </h2>
                <p className="text-gray-500 mt-1">
                  Client Profile
                </p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Full Name</p>
                <p className="text-gray-800 font-medium">
                  {client.name || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Gender</p>
                <p className="text-gray-800 font-medium">
                  {client.gender || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                <p className="text-gray-800 font-medium">
                  {client.dateOfBirth
                    ? new Date(client.dateOfBirth).toLocaleDateString("en-GB")
                    : "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Occupation</p>
                <p className="text-gray-800 font-medium">
                  {client.occupation || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Email Address</p>
                <p className="text-gray-800 font-medium break-all">
                  {client.email || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                <p className="text-gray-800 font-medium">
                  {client.phone || "N/A"}
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 mb-1">Address</p>
                <p className="text-gray-800 font-medium">
                  {client.address || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Additional Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Services</p>
                <p className="text-gray-800 font-medium">
                  {Array.isArray(client.services)
                    ? client.services.join(", ") || "N/A"
                    : client.services || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Referral Source</p>
                <p className="text-gray-800 font-medium">
                  {client.referralSource || "N/A"}
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 mb-1">Enquiries</p>
                <p className="text-gray-800 font-medium">
                  {client.enquiries || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  </div>
);
  
}