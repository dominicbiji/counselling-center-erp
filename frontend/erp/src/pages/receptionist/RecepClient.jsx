import {useState,useEffect} from "react"
import axios from "axios"
import { LayoutDashboard, CalendarDays, Users,
     UserRound, UserRoundCog, CalendarCheck, Clock, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";



export default function RecepClient(){

const [clients,setClients]=useState([])
const nav=useNavigate()

    useEffect(()=>{
        getClients()
    },[])

    

    async function getClients(){
        try{
            const token=localStorage.getItem("token")
            const res=await axios.get("https://erp-black-eight.vercel.app/client/read",{
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
    
   return (
    <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">

            {/* Heading */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Client Details
                </h1>

                <p className="text-gray-500 mt-1">
                    View and manage all registered clients
                </p>
            </div>

            {/* Client Count */}
            <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Client List
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            All registered clients
                        </p>
                    </div>

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {clients.length} Clients
                    </span>
                </div>
            </div>

            {/* Client Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.length > 0 ? (
                    clients.map((client) => (
                        <div
                            key={client._id}
                            className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition"
                        >
                            {/* Client Name */}
                            <div className="border-b pb-4 mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {client.name || "N/A"}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Client
                                </p>
                            </div>

                            {/* Client Information */}
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500">
                                        Email
                                    </p>
                                    <p className="text-sm text-gray-800 font-medium break-words">
                                        {client.email || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Phone
                                    </p>
                                    <p className="text-sm text-gray-800 font-medium">
                                        {client.phone || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Gender
                                    </p>
                                    <p className="text-sm text-gray-800">
                                        {client.gender || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Date of Birth
                                    </p>
                                    <p className="text-sm text-gray-800">
                                        {client.dateOfBirth
                                            ? new Date(
                                                  client.dateOfBirth
                                              ).toLocaleDateString("en-GB", {
                                                  day: "2-digit",
                                                  month: "short",
                                                  year: "numeric"
                                              })
                                            : "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Occupation
                                    </p>
                                    <p className="text-sm text-gray-800">
                                        {client.occupation || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Address
                                    </p>
                                    <p className="text-sm text-gray-800 break-words">
                                        {client.address || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Enquiries
                                    </p>
                                    <p className="text-sm text-gray-800">
                                        {client.enquiries || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Referral Source
                                    </p>
                                    <p className="text-sm text-gray-800">
                                        {client.referralSource || "N/A"}
                                    </p>
                                </div>

                                {/* Services */}
                                <div>
                                    <p className="text-xs text-gray-500 mb-2">
                                        Services
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {Array.isArray(client.services) &&
                                        client.services.length > 0 ? (
                                            client.services.map(
                                                (service, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium"
                                                    >
                                                        {service}
                                                    </span>
                                                )
                                            )
                                        ) : (
                                            <span className="text-sm text-gray-400">
                                                No services listed
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full bg-white rounded-xl shadow-sm border p-10 text-center">
                        <h3 className="text-lg font-semibold text-gray-700">
                            No Clients Found
                        </h3>

                        <p className="text-gray-500 text-sm mt-2">
                            Registered client details will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    </div>
);

   
}