import {useState,useEffect} from "react"
import axios from "axios"
import { CalendarDays, CalendarPlus, Pencil, X, Save, Ban, Users } from "lucide-react"



export default function Appointmentpage(){

    const [client,setClient]=useState("")
    const [counsellor,setCounsellor]=useState("")
    const [date,setDate]=useState("")
    const [time,setTime]=useState("")
    const [appTypes,setAppTypes]=useState("")
    const [status,setStatus]=useState("scheduled")
    const [notes,setNotes]=useState("")

    const [clientList,setClientList]=useState([])
    const [counsellorList,setCounsellorList]=useState([])
    const [serviceId,setServiceId]=useState("")
    const [serviceList,setServiceList]=useState([])



    const [editingAppointmentId, setEditingAppointmentId] = useState(null)

    const [editClient, setEditClient] = useState("")
    const [editCounsellor, setEditCounsellor] = useState("")
    const [editDate, setEditDate] = useState("")
    const [editTime, setEditTime] = useState("")
    const [editAppType, setEditAppType] = useState("")
    const [editStatus, setEditStatus] = useState("")
    const [editNotes, setEditNotes] = useState("")
    const [editServiceId,setEditServiceId]=useState("")
   

    const [appointment,setAppointment]=useState([])

    useEffect(()=>{
        getClients()
        getCounsellors()
        getAppointment()
        getServices()
    },[])

    async function getClients(){
        try{
            const token=localStorage.getItem("token")
            const res= await axios.get("https://erp-black-eight.vercel.app/client/read",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setClientList(res.data)
            console.log(res.data)
        }catch(error){
            console.log(error)
        }
    }
    async function getServices(){
        try{
            const token=localStorage.getItem("token")
            const res=await axios.get("https://erp-black-eight.vercel.app/service/getservice",{
                 headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setServiceList(res.data)
            console.log(res.data)
        }catch(error){
            console.log(error)
        }
        
    }

    function editAppointment(app){

    setEditingAppointmentId(app._id)
    setEditClient(app.clientId)
    setEditCounsellor(app.counsellorId)
    setEditDate(app.date)
    setEditTime(app.time)
    setEditAppType(app.appointmentType)
    setEditStatus(app.status)
    setEditNotes(app.notes)
    setEditServiceId(app.serviceId?._id || app.serviceId || "")
    
    
    }

    async function getCounsellors(){
        try{
            const token=localStorage.getItem("token")
            const res=await axios.get("https://erp-black-eight.vercel.app/counsellor/getcounsellor",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setCounsellorList(res.data)
            console.log(res.data)
        }catch(error){
            console.log(error)
        }
    }

    async function addAppointment(e){
        e.preventDefault()
        try{
         const token=localStorage.getItem("token")
         const res=await axios.post("https://erp-black-eight.vercel.app/appointment/addAppointment",{
                clientId:client,
                counsellorId:counsellor,
                date:date,
                time:time,
                appointmentType:appTypes,
                status:status,
                notes:notes,
                serviceId:serviceId
         },
         
        {
            headers:{
                    Authorization:`Bearer ${token}`
                }
        }
         )
         
         alert(res.data.message)
         getAppointment()
            
    }catch(error){
        console.log(error)
    }
        
    }

    async function getAppointment(){
        try{
            const token=localStorage.getItem("token")
            const res=await axios.get("https://erp-black-eight.vercel.app/appointment/getAppointment",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setAppointment(res.data)
            console.log(res.data)
        }catch(error){
            console.log(error)
        }
    }

    async function updateAppointment(id){
        try{
            const token=localStorage.getItem("token")
            const res=await axios.put(`https://erp-black-eight.vercel.app/appointment/updateAppointment/${id}`,{
                clientId: editClient,
                counsellorId: editCounsellor,
                date: editDate,
                time: editTime,
                appointmentType: editAppType,
                status: editStatus,
                notes: editNotes,
                serviceId:editServiceId
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        console.log(res.data)
        setEditingAppointmentId(null)
        getAppointment()
        }catch(error){
            console.log(error)
        }
    }

    async function cancelAppointment(id){
        try{
            const token=localStorage.getItem("token")
            const res=await axios.put(`https://erp-black-eight.vercel.app/appointment/cancelAppointment/${id}`,null,{
                 headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log(res.data)
            getAppointment()
        }catch(error){
            console.log(error)
        }
    }

    return (
    <div className="min-h-screen bg-gray-100 p-6">

        {/* PAGE HEADER */}

        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div className="flex items-center gap-4">

                <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                    <CalendarDays size={28} />
                </div>

                <div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Appointment Management
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage client appointments and schedules
                    </p>

                </div>

            </div>


            <div className="bg-white px-5 py-3 rounded-xl shadow-sm border">

                <div className="flex items-center gap-2 text-gray-600">

                    <CalendarDays
                        size={17}
                        className="text-blue-600"
                    />

                    <span className="font-medium">
                        {appointment.length} Appointments
                    </span>

                </div>

            </div>

        </div>


        {/* ADD APPOINTMENT */}

        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-10">

            <div className="flex items-center gap-3 mb-6">

                <div className="bg-blue-100 text-blue-600 p-2.5 rounded-lg">
                    <CalendarPlus size={21} />
                </div>

                <div>

                    <h2 className="text-xl font-semibold text-gray-800">
                        Add Appointment
                    </h2>

                    <p className="text-sm text-gray-500">
                        Schedule a new client appointment
                    </p>

                </div>

            </div>


            <form
                onSubmit={addAppointment}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >

                {/* CLIENT */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Client
                    </label>

                    <select
                        value={client}
                        onChange={(e) =>
                            setClient(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >

                        <option value="">
                            Select client
                        </option>

                        {clientList.map((client) => (

                            <option
                                key={client._id}
                                value={client._id}
                            >
                                {client.name}
                            </option>

                        ))}

                    </select>

                </div>


                {/* COUNSELLOR */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Counsellor
                    </label>

                    <select
                        value={counsellor}
                        onChange={(e) =>
                            setCounsellor(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >

                        <option value="">
                            Select counsellor
                        </option>

                        {counsellorList.map((counsellor) => (

                            <option
                                key={counsellor._id}
                                value={counsellor._id}
                            >
                                {counsellor.name}
                            </option>

                        ))}

                    </select>

                </div>


                {/* DATE */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                    </label>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) =>
                            setDate(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>


                {/* TIME */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                    </label>

                    <input
                        type="time"
                        value={time}
                        onChange={(e) =>
                            setTime(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>


                {/* APPOINTMENT TYPE */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Appointment Type
                    </label>

                    <select
                        value={appTypes}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) =>{
                            const selectedType=e.target.value
                             setAppTypes(e.target.value)
                             const matchedService=serviceList.find((service)=>service.name.toLowerCase().replace(/\s+/g, "-")===selectedType)
                             setServiceId(matchedService?matchedService._id:"")
                        }}>

                        <option value="">
                            Select appointment type
                        </option>

                        <option value="initial-consultation">
                            Initial Consultation
                        </option>

                        <option value="follow-up">
                            Follow-up
                        </option>

                        <option value="individual-counselling">
                            Individual Counselling
                        </option>

                    </select>

                </div>


                {/* NOTES */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notes
                    </label>

                    <textarea
                        value={notes}
                        onChange={(e) =>
                            setNotes(e.target.value)
                        }
                        rows="1"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Enter notes"
                    />

                </div>


                {/* ADD BUTTON */}

                <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center pt-3">

                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-blue-600 text-white rounded-lg px-8 py-3 font-medium hover:bg-blue-700 transition shadow-sm"
                    >

                        <CalendarPlus size={18} />

                        Add Appointment

                    </button>

                </div>

            </form>

        </div>


        {/* APPOINTMENTS SECTION */}

        <div>

            <div className="flex items-center gap-3 mb-5">

                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                    <CalendarDays size={20} />
                </div>

                <div>

                    <h2 className="text-xl font-semibold text-gray-800">
                        Appointments
                    </h2>

                    <p className="text-sm text-gray-500">
                        View and manage scheduled appointments
                    </p>

                </div>

            </div>


            {/* APPOINTMENT TABLE */}

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead className="bg-gray-50 border-b">

                            <tr>

                                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                                    Client
                                </th>

                                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                                    Counsellor
                                </th>

                                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                                    Date
                                </th>

                                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                                    Time
                                </th>

                                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                                    Type
                                </th>

                                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {appointment.map((app) => (

                                app._id === editingAppointmentId ? (

                                    /* EDIT APPOINTMENT */

                                    <tr key={app._id}>

                                        <td
                                            colSpan="7"
                                            className="p-0"
                                        >

                                            <div className="bg-gray-50 p-6">

                                                <div className="bg-white rounded-xl shadow-sm border p-6">

                                                    {/* EDIT HEADER */}

                                                    <div className="flex items-center justify-between mb-6">

                                                        <div className="flex items-center gap-3">

                                                            <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                                                                <Pencil size={18} />
                                                            </div>

                                                            <div>

                                                                <h2 className="text-xl font-semibold text-gray-800">
                                                                    Edit Appointment
                                                                </h2>

                                                                <p className="text-sm text-gray-500">
                                                                    Update appointment information
                                                                </p>

                                                            </div>

                                                        </div>


                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setEditingAppointmentId(null)
                                                            }
                                                            className="text-gray-500 hover:text-gray-700"
                                                        >

                                                            <X size={20} />

                                                        </button>

                                                    </div>


                                                    {/* EDIT FORM */}

                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                                                        {/* CLIENT */}

                                                        <div>

                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Client
                                                            </label>

                                                            <select
                                                                value={editClient}
                                                                onChange={(e) =>
                                                                    setEditClient(e.target.value)
                                                                }
                                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            >

                                                                <option value="">
                                                                    Select client
                                                                </option>

                                                                {clientList.map((client) => (

                                                                    <option
                                                                        key={client._id}
                                                                        value={client._id}
                                                                    >
                                                                        {client.name}
                                                                    </option>

                                                                ))}

                                                            </select>

                                                        </div>


                                                        {/* COUNSELLOR */}

                                                        <div>

                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Counsellor
                                                            </label>

                                                            <select
                                                                value={editCounsellor}
                                                                onChange={(e) =>
                                                                    setEditCounsellor(e.target.value)
                                                                }
                                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            >

                                                                <option value="">
                                                                    Select counsellor
                                                                </option>

                                                                {counsellorList.map((counsellor) => (

                                                                    <option
                                                                        key={counsellor._id}
                                                                        value={counsellor._id}
                                                                    >
                                                                        {counsellor.name}
                                                                    </option>

                                                                ))}

                                                            </select>

                                                        </div>


                                                        {/* DATE */}

                                                        <div>

                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Date
                                                            </label>

                                                            <input
                                                                type="date"
                                                                value={editDate}
                                                                onChange={(e) =>
                                                                    setEditDate(e.target.value)
                                                                }
                                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            />

                                                        </div>


                                                        {/* TIME */}

                                                        <div>

                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Time
                                                            </label>

                                                            <input
                                                                type="time"
                                                                value={editTime}
                                                                onChange={(e) =>
                                                                    setEditTime(e.target.value)
                                                                }
                                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            />

                                                        </div>


                                                        {/* TYPE */}

                                                        <div>

                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Appointment Type
                                                            </label>

                                                            <select
                                                                value={editAppType}
                                                                 className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                onChange={(e) =>{
                                                                    const selectedType = e.target.value
                                                                    setEditAppType(selectedType)
                                                                    const matchedService = serviceList.find((service) => service.name.toLowerCase().replace(/\s+/g, "-") === selectedType)
                                                                            setEditServiceId(matchedService ? matchedService._id : "")
                                                                }}>

                                                                <option value="">
                                                                    Select type
                                                                </option>

                                                                <option value="initial-consultation">
                                                                    Initial Consultation
                                                                </option>

                                                                <option value="follow-up">
                                                                    Follow-up
                                                                </option>

                                                                <option value="individual-counselling">
                                                                    Individual Counselling
                                                                </option>

                                                            </select>

                                                        </div>


                                                        {/* STATUS */}

                                                        <div>

                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Status
                                                            </label>

                                                            <select
                                                                value={editStatus}
                                                                onChange={(e) =>
                                                                    setEditStatus(e.target.value)
                                                                }
                                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            >

                                                                <option value="scheduled">
                                                                    Scheduled
                                                                </option>

                                                                <option value="confirmed">
                                                                    Confirmed
                                                                </option>

                                                                <option value="completed">
                                                                    Completed
                                                                </option>

                                                                <option value="cancelled">
                                                                    Cancelled
                                                                </option>

                                                                <option value="no-show">
                                                                    No Show
                                                                </option>

                                                            </select>

                                                        </div>


                                                        {/* NOTES */}

                                                        <div className="md:col-span-2 lg:col-span-3">

                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Notes
                                                            </label>

                                                            <textarea
                                                                value={editNotes}
                                                                onChange={(e) =>
                                                                    setEditNotes(e.target.value)
                                                                }
                                                                rows="3"
                                                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                                                placeholder="Enter notes"
                                                            />

                                                        </div>

                                                    </div>


                                                    {/* EDIT BUTTONS */}

                                                    <div className="flex justify-end gap-3 mt-6">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setEditingAppointmentId(null)
                                                            }
                                                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                                                        >

                                                            <X size={16} />

                                                            Cancel

                                                        </button>


                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateAppointment(
                                                                    editingAppointmentId
                                                                )
                                                            }
                                                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                                                        >

                                                            <Save size={16} />

                                                            Update Appointment

                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        </td>

                                    </tr>

                                ) : (

                                    /* NORMAL APPOINTMENT */

                                    <tr
                                        key={app._id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >

                                        <td className="px-5 py-4 text-sm text-gray-800 font-medium">

                                            {clientList.find(
                                                (client) =>
                                                    client._id === app.clientId
                                            )?.name}

                                        </td>


                                        <td className="px-5 py-4 text-sm text-gray-600">

                                            {counsellorList.find(
                                                (counsellor) =>
                                                    counsellor._id === app.counsellorId
                                            )?.name}

                                        </td>


                                        <td className="px-5 py-4 text-sm text-gray-600">

                                            
                                            {new Date(app.date).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric"
                                            })}
                                        

                                        </td>


                                        <td className="px-5 py-4 text-sm text-gray-600">

                                            {app.time}

                                        </td>


                                        <td className="px-5 py-4 text-sm text-gray-600">

                                            {app.appointmentType}

                                        </td>


                                        <td className="px-5 py-4">

                                            <span
                                                className={
                                                    app.status === "completed"
                                                        ? "text-green-600 font-medium text-sm"
                                                        : app.status === "cancelled"
                                                        ? "text-red-600 font-medium text-sm"
                                                        : "text-blue-600 font-medium text-sm"
                                                }
                                            >

                                                {app.status}

                                            </span>

                                        </td>


                                        <td className="px-5 py-4">

                                            <div className="flex gap-2">

                                                <button
                                                    onClick={() =>
                                                        editAppointment(app)
                                                    }
                                                    className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                                                >

                                                    <Pencil size={14} />

                                                    Edit

                                                </button>


                                                <button
                                                    onClick={() =>
                                                        cancelAppointment(app._id)
                                                    }
                                                    className="flex items-center gap-1.5 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition text-sm"
                                                >

                                                    <Ban size={14} />

                                                    Cancel

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                )

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    </div>
)

}