import {useState,useEffect} from "react"
import axios from "axios"
import { LayoutDashboard, CalendarDays, Users,
         UserRound, UserRoundCog, CalendarCheck, Clock, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function RecepCouns(){

const [counsellors,setCounsellors]=useState([])
const nav=useNavigate()
    
        useEffect(()=>{
            getCounsellors()
        },[])

   
        
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
    
      return (
    <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">

            {/* Heading */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Counsellor Details
                </h1>

                <p className="text-gray-500 mt-1">
                    View all registered counsellors and their information
                </p>
            </div>

            {/* Counsellor Count */}
            <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Counsellor List
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            All registered counsellors
                        </p>
                    </div>

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {counsellors.length} Counsellors
                    </span>
                </div>
            </div>

            {/* Counsellor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {counsellors.length > 0 ? (
                    counsellors.map((counsellor) => (
                        <div
                            key={counsellor._id}
                            className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition"
                        >
                            {/* Counsellor Name */}
                            <div className="border-b pb-4 mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {counsellor.name || "N/A"}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    {counsellor.specialization || "Counsellor"}
                                </p>

                                <span
                                    className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${
                                        counsellor.status === "active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    {counsellor.status || "N/A"}
                                </span>
                            </div>

                            {/* Counsellor Information */}
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500">
                                        Email
                                    </p>
                                    <p className="text-sm text-gray-800 font-medium break-words">
                                        {counsellor.email || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Phone
                                    </p>
                                    <p className="text-sm text-gray-800 font-medium">
                                        {counsellor.phone || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Specialization
                                    </p>
                                    <p className="text-sm text-gray-800">
                                        {counsellor.specialization || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Qualification
                                    </p>
                                    <p className="text-sm text-gray-800">
                                        {counsellor.qualification || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Experience
                                    </p>
                                    <p className="text-sm text-gray-800">
                                        {counsellor.experience != null
                                            ? `${counsellor.experience} years`
                                            : "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full bg-white rounded-xl shadow-sm border p-10 text-center">
                        <h3 className="text-lg font-semibold text-gray-700">
                            No Counsellors Found
                        </h3>

                        <p className="text-gray-500 text-sm mt-2">
                            Registered counsellors will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    </div>
);
    
}