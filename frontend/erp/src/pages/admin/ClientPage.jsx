// import axios from "axios"
// import {useState,useEffect} from "react"


// export default function ClientPage(){

//     const[clients,setClients]=useState([])
//     const [clientName,setClientName]=useState("")
//     const [clientDOb,setClientDob]=useState("")
//     const [clientGender,setClientGender]=useState("")
//     const [clientOccupation,setClientOccupation]=useState("")
//     const [clientRegDate,setClientRegDate]=useState("")
//     const [clientAddress,setClientAddress]=useState("")
//     const [clientPhone,setClientPhone]=useState("")
//     const [clientEmail,setClientEmail]=useState("")
//     const[clientRef,setClientRef]=useState("")
//     const [clientServices,setClientServices]=useState("")
//     const [clientEnquirues,setClientEnquires]=useState("")

//     const [editingClientId, setEditingClientId] = useState(null)
//     const [editClientName, setEditClientName] = useState("")
//     const [editClientDob, setEditClientDob] = useState("")
//     const [editClientGender, setEditClientGender] = useState("")
//     const [editClientOccupation, setEditClientOccupation] = useState("")
//     const [editClientRegDate, setEditClientRegDate] = useState("")
//     const [editClientAddress, setEditClientAddress] = useState("")
//     const [editClientPhone, setEditClientPhone] = useState("")
//     const [editClientEmail, setEditClientEmail] = useState("")
//     const [editClientRef, setEditClientRef] = useState("")
//     const [editClientServices, setEditClientServices] = useState("")
//     const [editClientEnquiries, setEditClientEnquiries] = useState("")

    

//     useEffect(()=>{
//         getClients()
//     },[])

//     async function getClients(){
//         const response=await axios.get("https://erp-black-eight.vercel.app/client/read")
//         setClients(response.data)
//         console.log(clients)
//     }

//     function handleEditClient(client){
        
//     setEditingClientId(client._id)
//     setEditClientName(client.name)
//     setEditClientDob(client.dateOfBirth)
//     setEditClientGender(client.gender)
//     setEditClientOccupation(client.occupation)
//     setEditClientRegDate(client.registrationDate)
//     setEditClientAddress(client.address)
//     setEditClientPhone(client.phone)
//     setEditClientEmail(client.email)
//     setEditClientRef(client.referralSource)
//     setEditClientServices(client.services)
//     setEditClientEnquiries(client.enquiries)

//     }

//     async function handleUpdate(e,id){
//         e.preventDefault()
        
//         try{
//             const response=await axios.put(`https://erp-black-eight.vercel.app/client/${id}`,{
//                 name: editClientName,
//                 dateOfBirth: editClientDob,
//                 gender: editClientGender,
//                 occupation: editClientOccupation,
//                 registrationDate: editClientRegDate,
//                 address: editClientAddress,
//                 phone: editClientPhone,
//                 email: editClientEmail,
//                 referralSource: editClientRef,
//                 services: editClientServices,
//                 enquiries: editClientEnquiries
//             })
//             await getClients()
//             setEditingClientId(null)
//             alert(response.data.message)
            
//         }catch(error){
//             console.log(error)
//         }
//     }

//     async function handleSubmit(e){
//         e.preventDefault()
//         const token = localStorage.getItem("token")
//         try{
//             console.log("sending req")
//              const response=await axios.post("https://erp-black-eight.vercel.app/client/create",{
//             name: clientName,
//                 dateOfBirth: clientDOb,
//                 gender: clientGender,
//                 occupation: clientOccupation,
//                 registrationDate: clientRegDate,
//                 address: clientAddress,
//                 phone: clientPhone,
//                 email: clientEmail,
//                 referralSource: clientRef,
//                 services: clientServices,
//                 enquiries: clientEnquirues
//         },

//          {headers: {Authorization: `Bearer ${token}`}}
         
//     )
//        console.log(response.data)
//        getClients()
//         }catch(error){
//             console.log(error)
//         }
       
//     }

//      async function handleDelete(id) {
//         try {
//             const res = await axios.delete(`https://erp-black-eight.vercel.app/client/${id}`)
//             alert(res.data)
//             getClients()
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     return(
//         <div className="min-h-screen bg-gray-100 p-6">
//             <div className="mb-6">
//                 <h1 className="text-3xl font-bold text-gray-800">Client Management</h1>
//             </div>

//             <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//                  <h2 className="text-xl font-semibold text-gray-800 mb-5">Add Client</h2>

//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    
//             <input  className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Name" value={clientName} onChange={e => setClientName(e.target.value)} />
//             <input  className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500" type="date" value={clientDOb} onChange={e => setClientDob(e.target.value)} />
//             <input  className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Gender" value={clientGender} onChange={e => setClientGender(e.target.value)} />
//             <input  className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Occupation" value={clientOccupation} onChange={e => setClientOccupation(e.target.value)} />
//             <input  className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500" type="date" value={clientRegDate} onChange={e => setClientRegDate(e.target.value)} />
//             <input  className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Address" value={clientAddress} onChange={e => setClientAddress(e.target.value)} />
//             <input  className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Phone" value={clientPhone} onChange={e => setClientPhone(e.target.value)} />
//             <input  className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500" type="email" placeholder="Email" value={clientEmail} onChange={e => setClientEmail(e.target.value)} />
//             <input  className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Referral Source" value={clientRef} onChange={e => setClientRef(e.target.value)} />
//             <input  className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Services" value={clientServices} onChange={e => setClientServices(e.target.value)} />
//             <input  className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Enquiries" value={clientEnquirues} onChange={e => setClientEnquires(e.target.value)} />
//             <button className="bg-blue-600 text-white rounded-lg px-4 py-2.5 font-medium hover:bg-blue-700 transition" type="submit">Add Client</button>
// </form>
               
//             </div>

//         <div>
//              <h2 className="text-xl font-semibold text-gray-800 mb-5">Clients</h2>

//              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//              {
//                 clients.map((client)=>(
//                     client._id===editingClientId?

//                     <div>
//                         <form onSubmit={(e)=>handleUpdate(e,client._id)}>
//                             <input type="text" value={editClientName} onChange={(e)=>setEditClientName(e.target.value)}/>
//                             <input type="date" value={editClientDob}  onChange={e => setEditClientDob(e.target.value)}/>
//                             <input type="text" value={editClientGender}onChange={e => setEditClientGender(e.target.value)}/>
//                             <input type="text"  value={editClientOccupation}onChange={e => setEditClientOccupation(e.target.value)}  />
//                             <input  type="date"  value={editClientRegDate} onChange={e => setEditClientRegDate(e.target.value)} />
//                             <input  type="text" value={editClientAddress} onChange={e => setEditClientAddress(e.target.value)}/>
//                             <input type="text" value={editClientPhone} onChange={e => setEditClientPhone(e.target.value)} />
//                             <input  type="email" value={editClientEmail}  onChange={e => setEditClientEmail(e.target.value)} />
//                             <input  type="text"  value={editClientRef} onChange={e => setEditClientRef(e.target.value)} />
//                             <input type="text"  value={editClientServices} onChange={e => setEditClientServices(e.target.value)} />
//                             <input  type="text" value={editClientEnquiries}  onChange={e => setEditClientEnquiries(e.target.value)} />
//                               <button type="submit">update</button>
//                               <button onClick={()=>setEditingClientId(null)}type="button">cancel</button>
//                             <div/>
//                         </form>
//                     </div>

//                     :<div key={client._id}>
//                         <p>{client._id}</p>
//                         <p>{client.name}</p>
//                         <p>{client.dateOfBirth}</p>
//                         <p>{client.gender}</p>
//                         <p>{client.occupation}</p>
//                         <p>{client.registrationDate}</p>
//                         <p>{client.address}</p>
//                         <p>{client.phone}</p>
//                         <p>{client.email}</p>
//                         <p>{client.referralSource}</p>
//                         <p>{client.services}</p>
//                         <p>{client.enquiries}</p>
//                         <button onClick={()=>handleEditClient(client)}>edit</button>
//                         <button onClick={() => handleDelete(client._id)}>delete</button>
//                     </div>
                    
//                 ))
//             }
//             </div>
//         </div>
//     )
// }

import axios from "axios"
import { useState, useEffect } from "react"
import {Users, UserPlus, UserRound, Lock, CalendarDays, VenusAndMars,
    BriefcaseBusiness, Phone, Mail, MapPin, GitBranch, ClipboardList,
    MessageSquare, Pencil, Trash2, Save, X, UserRoundCog} from "lucide-react"

export default function ClientPage(){

    const[counsellors,setCounsellors]=useState([])
    const [selectedCounsellor,setSelectedCounsellor]=useState("")

    const[clients,setClients]=useState([])
    const [clientName,setClientName]=useState("")
    const [clientPassword,setClientPassword]=useState("")
    const [clientDOb,setClientDob]=useState("")
    const [clientGender,setClientGender]=useState("")
    const [clientOccupation,setClientOccupation]=useState("")
    const [clientRegDate,setClientRegDate]=useState("")
    const [clientAddress,setClientAddress]=useState("")
    const [clientPhone,setClientPhone]=useState("")
    const [clientEmail,setClientEmail]=useState("")
    const[clientRef,setClientRef]=useState("")
    const [clientServices,setClientServices]=useState("")
    const [clientEnquirues,setClientEnquires]=useState("")

    const [editingClientId, setEditingClientId] = useState(null)
    const [editClientName, setEditClientName] = useState("")
    const [editClientPass,setEditClientPass]=useState("")
    const [editClientDob, setEditClientDob] = useState("")
    const [editClientGender, setEditClientGender] = useState("")
    const [editClientOccupation, setEditClientOccupation] = useState("")
    const [editClientRegDate, setEditClientRegDate] = useState("")
    const [editClientAddress, setEditClientAddress] = useState("")
    const [editClientPhone, setEditClientPhone] = useState("")
    const [editClientEmail, setEditClientEmail] = useState("")
    const [editClientRef, setEditClientRef] = useState("")
    const [editClientServices, setEditClientServices] = useState("")
    const [editClientEnquiries, setEditClientEnquiries] = useState("")

    useEffect(()=>{
        getClients()
        getCounsellors()
    },[])

    async function getCounsellors(){
        try{
            const token = localStorage.getItem("token")

        const response = await axios.get(
            "https://erp-black-eight.vercel.app/counsellor/getcounsellor",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        setCounsellors(response.data)
        }catch(error){
            console.log(error)
        }
    }

    async function getClients(){
    try {
        const token = localStorage.getItem("token")

        const response = await axios.get("https://erp-black-eight.vercel.app/client/read",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

        setClients(response.data)
        console.log(response.data)

    } catch(error) {
        console.log(error)
    }
}

    function handleEditClient(client){
        
        setEditingClientId(client._id)
        setEditClientName(client.name)
        setEditClientDob(client.dateOfBirth)
        setEditClientGender(client.gender)
        setEditClientOccupation(client.occupation)
        setEditClientRegDate(client.registrationDate)
        setEditClientAddress(client.address)
        setEditClientPhone(client.phone)
        setEditClientEmail(client.email)
        setEditClientRef(client.referralSource)
        setEditClientServices(client.services)
        setEditClientEnquiries(client.enquiries)
    }

    async function handleUpdate(e,id){
        e.preventDefault()
        
        try{
            const token=localStorage.getItem("token")
            const response=await axios.put(`https://erp-black-eight.vercel.app/client/${id}`,{
                name: editClientName,
                password:editClientPass,
                dateOfBirth: editClientDob,
                gender: editClientGender,
                occupation: editClientOccupation,
                registrationDate: editClientRegDate,
                address: editClientAddress,
                phone: editClientPhone,
                email: editClientEmail,
                referralSource: editClientRef,
                services: editClientServices,
                enquiries: editClientEnquiries
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            await getClients()
            setEditingClientId(null)
            alert(response.data.message)
            
        }catch(error){
            console.log(error)
        }
    }

    async function handleSubmit(e){
        e.preventDefault()

        const token = localStorage.getItem("token")

        try{
            const response=await axios.post(
                "https://erp-black-eight.vercel.app/client/create",
                {
                    name: clientName,
                    password:clientPassword,
                    dateOfBirth: clientDOb,
                    gender: clientGender,
                    occupation: clientOccupation,
                    registrationDate: clientRegDate,
                    address: clientAddress,
                    phone: clientPhone,
                    email: clientEmail,
                    referralSource: clientRef,
                    services: clientServices,
                    enquiries: clientEnquirues,
                    counsellorId: selectedCounsellor
                },
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            alert("client created sucessfully")
            console.log(response.data)
            getClients()

        }catch(error){
            console.log(error)
        }
    }

    async function handleDelete(id) {
        try {
            const token=localStorage.getItem("token")
            const res = await axios.delete(`https://erp-black-eight.vercel.app/client/${id}`,{
                
            headers: {
            Authorization: `Bearer ${token}`
        }
            })
            alert(res.data)
            getClients()
        } catch (error) {
            console.log(error)
        }
    }

   return (
    <div className="min-h-screen bg-gray-100 p-6">

        {/* PAGE HEADER */}

        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div className="flex items-center gap-4">

                <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                    <Users size={28} />
                </div>

                <div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Client Management
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage counselling center clients
                    </p>

                </div>

            </div>


            <div className="bg-white px-5 py-3 rounded-xl shadow-sm border">

                <div className="flex items-center gap-2 text-gray-600">

                    <Users
                        size={17}
                        className="text-blue-600"
                    />

                    <span className="font-medium">
                        {clients.length} Clients
                    </span>

                </div>

            </div>

        </div>


        {/* ADD CLIENT */}

        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-10">

            <div className="flex items-center gap-3 mb-6">

                <div className="bg-blue-100 text-blue-600 p-2.5 rounded-lg">
                    <UserPlus size={21} />
                </div>

                <div>

                    <h2 className="text-xl font-semibold text-gray-800">
                        Add Client
                    </h2>

                    <p className="text-sm text-gray-500">
                        Create a new client profile
                    </p>

                </div>

            </div>


            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >

                {/* NAME */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Client Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter client name"
                        value={clientName}
                        onChange={(e) =>
                            setClientName(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>


                {/* PASSWORD */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={clientPassword}
                        onChange={(e) =>
                            setClientPassword(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>


                {/* DATE OF BIRTH */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                    </label>

                    <input
                        type="date"
                        value={clientDOb}
                        onChange={(e) =>
                            setClientDob(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>


                {/* GENDER */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                    </label>

                    <select
                        value={clientGender}
                        onChange={(e) =>
                            setClientGender(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >

                        <option value="">
                            Select gender
                        </option>

                        <option value="Male">
                            Male
                        </option>

                        <option value="Female">
                            Female
                        </option>

                        <option value="Other">
                            Other
                        </option>

                    </select>

                </div>


                {/* OCCUPATION */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Occupation
                    </label>

                    <input
                        type="text"
                        placeholder="Enter occupation"
                        value={clientOccupation}
                        onChange={(e) =>
                            setClientOccupation(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>


                {/* REGISTRATION DATE */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Registration Date
                    </label>

                    <input
                        type="date"
                        value={clientRegDate}
                        onChange={(e) =>
                            setClientRegDate(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>


                {/* ADDRESS */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                    </label>

                    <input
                        type="text"
                        placeholder="Enter address"
                        value={clientAddress}
                        onChange={(e) =>
                            setClientAddress(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>


                {/* PHONE */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                    </label>

                    <input
                        type="text"
                        placeholder="Enter phone number"
                        value={clientPhone}
                        onChange={(e) =>
                            setClientPhone(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>


                {/* EMAIL */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter email"
                        value={clientEmail}
                        onChange={(e) =>
                            setClientEmail(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>


                {/* REFERRAL SOURCE */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Referral Source
                    </label>

                    <input
                        type="text"
                        placeholder="Enter referral source"
                        value={clientRef}
                        onChange={(e) =>
                            setClientRef(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>


                {/* SERVICES */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Services
                    </label>

                    <input
                        type="text"
                        placeholder="Enter services"
                        value={clientServices}
                        onChange={(e) =>
                            setClientServices(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>


                {/* ENQUIRIES */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Enquiries
                    </label>

                    <input
                        type="text"
                        placeholder="Enter enquiries"
                        value={clientEnquirues}
                        onChange={(e) =>
                            setClientEnquires(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>


                {/* COUNSELLOR */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Assign Counsellor
                    </label>

                    <select
                        value={selectedCounsellor}
                        onChange={(e) =>
                            setSelectedCounsellor(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >

                        <option value="">
                            Select counsellor
                        </option>

                        {counsellors.map((item) => (

                            <option
                                key={item._id}
                                value={item._id}
                            >
                                {item.name}
                            </option>

                        ))}

                    </select>

                </div>


                {/* ADD BUTTON */}

                <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center pt-3">

                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-blue-600 text-white rounded-lg px-8 py-3 font-medium hover:bg-blue-700 transition shadow-sm"
                    >

                        <UserPlus size={18} />

                        Add Client

                    </button>

                </div>

            </form>

        </div>


        {/* CLIENTS SECTION */}

        <div>

            <div className="flex items-center gap-3 mb-5">

                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                    <Users size={20} />
                </div>

                <div>

                    <h2 className="text-xl font-semibold text-gray-800">
                        Clients
                    </h2>

                    <p className="text-sm text-gray-500">
                        View and manage registered clients
                    </p>

                </div>

            </div>


            {/* CLIENT GRID */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

                {clients.map((client) => (

                    client._id === editingClientId ? (

                        /* EDIT CLIENT */

                        <div
                            key={client._id}
                            className="bg-white rounded-xl shadow-sm border p-4"
                        >

                            <div className="flex items-center gap-3 mb-5">

                                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                                    <Pencil size={18} />
                                </div>

                                <div>

                                    <h3 className="text-base font-semibold text-gray-800">
                                        Edit Client
                                    </h3>

                                    <p className="text-xs text-gray-500">
                                        Update client information
                                    </p>

                                </div>

                            </div>


                            <form
                                onSubmit={(e) =>
                                    handleUpdate(e, editingClientId)
                                }
                                className="space-y-3"
                            >

                                <input
                                    type="text"
                                    value={editClientName}
                                    onChange={(e) =>
                                        setEditClientName(e.target.value)
                                    }
                                    placeholder="Name"
                                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <input
                                    type="date"
                                    value={editClientDob}
                                    onChange={(e) =>
                                        setEditClientDob(e.target.value)
                                    }
                                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <select
                                    value={editClientGender}
                                    onChange={(e) =>
                                        setEditClientGender(e.target.value)
                                    }
                                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                >

                                    <option value="">
                                        Select gender
                                    </option>

                                    <option value="Male">
                                        Male
                                    </option>

                                    <option value="Female">
                                        Female
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>


                                <input
                                    type="text"
                                    value={editClientOccupation}
                                    onChange={(e) =>
                                        setEditClientOccupation(e.target.value)
                                    }
                                    placeholder="Occupation"
                                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <input
                                    type="date"
                                    value={editClientRegDate}
                                    onChange={(e) =>
                                        setEditClientRegDate(e.target.value)
                                    }
                                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <input
                                    type="text"
                                    value={editClientAddress}
                                    onChange={(e) =>
                                        setEditClientAddress(e.target.value)
                                    }
                                    placeholder="Address"
                                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <input
                                    type="text"
                                    value={editClientPhone}
                                    onChange={(e) =>
                                        setEditClientPhone(e.target.value)
                                    }
                                    placeholder="Phone"
                                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <input
                                    type="email"
                                    value={editClientEmail}
                                    onChange={(e) =>
                                        setEditClientEmail(e.target.value)
                                    }
                                    placeholder="Email"
                                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <input
                                    type="text"
                                    value={editClientRef}
                                    onChange={(e) =>
                                        setEditClientRef(e.target.value)
                                    }
                                    placeholder="Referral Source"
                                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <input
                                    type="text"
                                    value={editClientServices}
                                    onChange={(e) =>
                                        setEditClientServices(e.target.value)
                                    }
                                    placeholder="Services"
                                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <input
                                    type="text"
                                    value={editClientEnquiries}
                                    onChange={(e) =>
                                        setEditClientEnquiries(e.target.value)
                                    }
                                    placeholder="Enquiries"
                                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                />


                                {/* EDIT BUTTONS */}

                                <div className="flex gap-2 pt-2">

                                    <button
                                        type="submit"
                                        className="flex-1 flex items-center justify-center gap-1.5 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition text-sm"
                                    >

                                        <Save size={15} />

                                        Update

                                    </button>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            setEditingClientId(null)
                                        }
                                        className="flex-1 flex items-center justify-center gap-1.5 bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300 transition text-sm"
                                    >

                                        <X size={15} />

                                        Cancel

                                    </button>

                                </div>

                            </form>

                        </div>

                    ) : (

                        /* CLIENT CARD */

                        <div
                            key={client._id}
                            className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition"
                        >

                            {/* CARD HEADER */}

                            <div className="flex items-center gap-3 mb-4">

                                <div className="bg-blue-100 text-blue-600 p-2.5 rounded-full">
                                    <UserRound size={20} />
                                </div>

                                <div className="min-w-0">

                                    <h3 className="text-base font-semibold text-gray-800 truncate">
                                        {client.name}
                                    </h3>

                                    <p className="text-xs text-gray-500 truncate">
                                        {client.email}
                                    </p>

                                </div>

                            </div>


                            {/* CLIENT DETAILS */}

                            <div className="space-y-2 text-sm">

                                <div>

                                    <span className="text-gray-500">
                                        Phone
                                    </span>

                                    <p className="font-medium text-gray-800 truncate">
                                        {client.phone}
                                    </p>

                                </div>


                                <div>

                                    <span className="text-gray-500">
                                        Gender
                                    </span>

                                    <p className="font-medium text-gray-800">
                                        {client.gender}
                                    </p>

                                </div>


                                <div>

                                    <span className="text-gray-500">
                                        Occupation
                                    </span>

                                    <p className="font-medium text-gray-800 truncate">
                                        {client.occupation}
                                    </p>

                                </div>


                                <div>

                                    <span className="text-gray-500">
                                        Services
                                    </span>

                                    <p className="font-medium text-gray-800 truncate">
                                        {client.services}
                                    </p>

                                </div>


                                <div>

                                    <span className="text-gray-500">
                                        Registration Date
                                    </span>

                                    <p className="font-medium text-gray-800">
                                        {client.registrationDate
                                            ? new Date(client.registrationDate).toLocaleDateString()
                                            : "-"
                                        }
                                    </p>

                                </div>

                            </div>


                            {/* ACTIONS */}

                            <div className="flex gap-2 mt-5 pt-3 border-t">

                                <button
                                    onClick={() =>
                                        handleEditClient(client)
                                    }
                                    className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                                >

                                    <Pencil size={15} />

                                    Edit

                                </button>


                                <button
                                    onClick={() =>
                                        handleDelete(client._id)
                                    }
                                    className="flex-1 flex items-center justify-center gap-1.5 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition text-sm"
                                >

                                    <Trash2 size={15} />

                                    Delete

                                </button>

                            </div>

                        </div>

                    )

                ))}

            </div>

        </div>

    </div>
)
}