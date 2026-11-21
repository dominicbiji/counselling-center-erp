
import axios from "axios"
import {useEffect,useState} from "react"



export default function CounsellorCl(){

    const [clients,setClients]=useState([])
   

    useEffect(()=>{
        fetchClients()
    },[])


    async function fetchClients(){
        const token=localStorage.getItem("token")
        const response=await axios.get("http://localhost:5050/client/myClients",{
            headers: {
                    Authorization: `Bearer ${token}`
                }
        })
        setClients(response.data)
        console.log(response.data)
    }

   
  return (
    <div className="min-h-screen bg-gray-100 p-6">

        <div className="max-w-7xl mx-auto">

            {/* Heading */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    My Clients
                </h1>

                <p className="text-gray-500 mt-1">
                    View and manage clients assigned to you
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
                            Your assigned clients
                        </p>
                    </div>

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {clients.length} Clients
                    </span>

                </div>

            </div>


            {/* Client Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {clients.map((client) => (

                    <div
                        key={client._id}
                        className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition"
                    >

                        {/* Client Name */}
                        <div className="border-b pb-4 mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {client.name}
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

                                <p className="text-sm text-gray-800 font-medium">
                                    {client.email}
                                </p>
                            </div>


                            <div>
                                <p className="text-xs text-gray-500">
                                    Phone
                                </p>

                                <p className="text-sm text-gray-800 font-medium">
                                    {client.phone}
                                </p>
                            </div>


                            <div>
                                <p className="text-xs text-gray-500">
                                    Gender
                                </p>

                                <p className="text-sm text-gray-800">
                                    {client.gender}
                                </p>
                            </div>


                            <div>
                                <p className="text-xs text-gray-500">
                                    Date of Birth
                                </p>

                                <p className="text-sm text-gray-800">
                                    {new Date(
                                        client.dateOfBirth
                                    ).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </p>
                            </div>


                            <div>
                                <p className="text-xs text-gray-500">
                                    Occupation
                                </p>

                                <p className="text-sm text-gray-800">
                                    {client.occupation}
                                </p>
                            </div>


                            <div>
                                <p className="text-xs text-gray-500">
                                    Address
                                </p>

                                <p className="text-sm text-gray-800">
                                    {client.address}
                                </p>
                            </div>


                            <div>
                                <p className="text-xs text-gray-500">
                                    Enquiries
                                </p>

                                <p className="text-sm text-gray-800">
                                    {client.enquiries}
                                </p>
                            </div>


                            <div>
                                <p className="text-xs text-gray-500">
                                    Referral Source
                                </p>

                                <p className="text-sm text-gray-800">
                                    {client.referralSource}
                                </p>
                            </div>


                            {/* Services */}
                            <div>
                                <p className="text-xs text-gray-500 mb-2">
                                    Services
                                </p>

                                <div className="flex flex-wrap gap-2">

                                    {client.services?.map((service, index) => (

                                        <span
                                            key={index}
                                            className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium"
                                        >
                                            {service}
                                        </span>

                                    ))}

                                </div>
                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    </div>
)
        

    
}