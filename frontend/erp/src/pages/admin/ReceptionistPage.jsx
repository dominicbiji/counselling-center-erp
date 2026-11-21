import {useState,useEffect} from "react"
import axios from "axios"
import { Users, UserPlus, UserRound, Pencil, Trash2, Save, X } from "lucide-react"



export default function ReceptionistPage(){

    const [receptionist,setReceptionist]=useState([])

    const [receptionistName, setReceptionistName] = useState("")
    const [receptionistEmail, setReceptionistEmail] = useState("")
    const [receptionistPassword, setReceptionistPassword] = useState("")
    const [receptionistPhone, setReceptionistPhone] = useState("")
    const [receptionistQualification, setReceptionistQualification] = useState("")
    const [receptionistStatus, setReceptionistStatus] = useState("active")


    const [editingReceptionistId, setEditingReceptionistId] = useState(null)

    const [editReceptionistName, setEditReceptionistName] = useState("")
    const [editReceptionistEmail, setEditReceptionistEmail] = useState("")
    const [editReceptionistPhone, setEditReceptionistPhone] = useState("")
    const [editReceptionistQualification, setEditReceptionistQualification] = useState("")
    const [editReceptionistStatus, setEditReceptionistStatus] = useState("")


    useEffect(()=>{
        fetchReceptionists()
    },[])

    async function fetchReceptionists(){
        try{
            const token=localStorage.getItem("token")
            const response= await axios.get("http://localhost:5050/receptionist/getreceptionist",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setReceptionist(response.data)
            console.log(response.data)
        }catch(error){
            console.log(error)
        }
    }

    async function addReceptionists(e){
        e.preventDefault()
        try{
            const token=localStorage.getItem("token")
        const response= await axios.post("http://localhost:5050/receptionist/addReceptionist",{
            name: receptionistName,
            email: receptionistEmail,
            password: receptionistPassword,
            phone: receptionistPhone,
            qualification: receptionistQualification,
            status: receptionistStatus
        },
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        
    )
        fetchReceptionists()
        alert(response.data)
        }catch(error){
            console.log(error)
        }
        
    }

    function editReceptionist(item) {
    setEditingReceptionistId(item._id)

    setEditReceptionistName(item.name)
    setEditReceptionistEmail(item.email)
    setEditReceptionistPhone(item.phone)
    setEditReceptionistQualification(item.qualification)
    setEditReceptionistStatus(item.status)
}

async function updateReceptionist(e,id){
    e.preventDefault()
    try{
         const token=localStorage.getItem("token")
     const res=await axios.put(`http://localhost:5050/receptionist/updateReceptionist/${id}`,{
        name: editReceptionistName,
        email: editReceptionistEmail,
        phone: editReceptionistPhone,
        qualification: editReceptionistQualification,
        status: editReceptionistStatus
    },
    {
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    fetchReceptionists()
    setEditingReceptionistId(null)
    alert(res.data)
    }catch(error){
        console.log(error)
    }
   
}

async function deleteReceptionist(id){
    try{
        const token=localStorage.getItem("token")
    const res= await axios.delete(`http://localhost:5050/receptionist/deleteReceptionist/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    alert(res.data)
    fetchReceptionists()
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
                    <Users size={28} />
                </div>

                <div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Receptionist Management
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage counselling center receptionists
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
                        {receptionist.length} Receptionists
                    </span>

                </div>

            </div>

        </div>


        {/* ADD RECEPTIONIST */}

        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-10">

            <div className="flex items-center gap-3 mb-6">

                <div className="bg-blue-100 text-blue-600 p-2.5 rounded-lg">
                    <UserPlus size={21} />
                </div>

                <div>

                    <h2 className="text-xl font-semibold text-gray-800">
                        Add Receptionist
                    </h2>

                    <p className="text-sm text-gray-500">
                        Create a new receptionist profile
                    </p>

                </div>

            </div>


            <form
                onSubmit={addReceptionists}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >

                {/* NAME */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>

                    <input
                        type="text"
                        value={receptionistName}
                        onChange={(e) =>
                            setReceptionistName(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter name"
                    />

                </div>


                {/* EMAIL */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>

                    <input
                        type="email"
                        value={receptionistEmail}
                        onChange={(e) =>
                            setReceptionistEmail(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter email"
                    />

                </div>


                {/* PASSWORD */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>

                    <input
                        type="password"
                        value={receptionistPassword}
                        onChange={(e) =>
                            setReceptionistPassword(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter password"
                    />

                </div>


                {/* PHONE */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                    </label>

                    <input
                        type="text"
                        value={receptionistPhone}
                        onChange={(e) =>
                            setReceptionistPhone(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter phone number"
                    />

                </div>


                {/* QUALIFICATION */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Qualification
                    </label>

                    <input
                        type="text"
                        value={receptionistQualification}
                        onChange={(e) =>
                            setReceptionistQualification(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter qualification"
                    />

                </div>


                {/* STATUS */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                    </label>

                    <select
                        value={receptionistStatus}
                        onChange={(e) =>
                            setReceptionistStatus(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >

                        <option value="active">
                            Active
                        </option>

                        <option value="inactive">
                            Inactive
                        </option>

                    </select>

                </div>


                {/* ADD BUTTON */}

                <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center pt-3">

                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-blue-600 text-white rounded-lg px-8 py-3 font-medium hover:bg-blue-700 transition shadow-sm"
                    >

                        <UserPlus size={18} />

                        Add Receptionist

                    </button>

                </div>

            </form>

        </div>


        {/* RECEPTIONISTS SECTION */}

        <div>

            <div className="flex items-center gap-3 mb-5">

                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                    <Users size={20} />
                </div>

                <div>

                    <h2 className="text-xl font-semibold text-gray-800">
                        Receptionists
                    </h2>

                    <p className="text-sm text-gray-500">
                        View and manage registered receptionists
                    </p>

                </div>

            </div>


            {/* RECEPTIONIST GRID */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

                {receptionist.map((item) => (

                    editingReceptionistId === item._id ? (

                        /* EDIT RECEPTIONIST */

                        <div
                            key={item._id}
                            className="bg-white rounded-xl shadow-sm border p-4"
                        >

                            <div className="flex items-center gap-3 mb-5">

                                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                                    <Pencil size={18} />
                                </div>

                                <div>

                                    <h3 className="text-base font-semibold text-gray-800">
                                        Edit Receptionist
                                    </h3>

                                    <p className="text-xs text-gray-500">
                                        Update receptionist information
                                    </p>

                                </div>

                            </div>


                            <form
                                onSubmit={(e) =>
                                    updateReceptionist(
                                        e,
                                        editingReceptionistId
                                    )
                                }
                                className="space-y-3"
                            >

                                <input
                                    type="text"
                                    value={editReceptionistName}
                                    onChange={(e) =>
                                        setEditReceptionistName(e.target.value)
                                    }
                                    placeholder="Name"
                                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <input
                                    type="email"
                                    value={editReceptionistEmail}
                                    onChange={(e) =>
                                        setEditReceptionistEmail(e.target.value)
                                    }
                                    placeholder="Email"
                                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <input
                                    type="text"
                                    value={editReceptionistPhone}
                                    onChange={(e) =>
                                        setEditReceptionistPhone(e.target.value)
                                    }
                                    placeholder="Phone"
                                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <input
                                    type="text"
                                    value={editReceptionistQualification}
                                    onChange={(e) =>
                                        setEditReceptionistQualification(e.target.value)
                                    }
                                    placeholder="Qualification"
                                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <select
                                    value={editReceptionistStatus}
                                    onChange={(e) =>
                                        setEditReceptionistStatus(e.target.value)
                                    }
                                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                >

                                    <option value="active">
                                        Active
                                    </option>

                                    <option value="inactive">
                                        Inactive
                                    </option>

                                </select>


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
                                            setEditingReceptionistId(null)
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

                        /* RECEPTIONIST CARD */

                        <div
                            key={item._id}
                            className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition"
                        >

                            {/* CARD HEADER */}

                            <div className="flex items-center gap-3 mb-4">

                                <div className="bg-blue-100 text-blue-600 p-2.5 rounded-full">
                                    <UserRound size={20} />
                                </div>

                                <div className="min-w-0">

                                    <h3 className="text-base font-semibold text-gray-800 truncate">
                                        {item.name}
                                    </h3>

                                    <p className="text-xs text-gray-500 truncate">
                                        {item.email}
                                    </p>

                                </div>

                            </div>


                            {/* RECEPTIONIST DETAILS */}

                            <div className="space-y-2 text-sm">

                                <div>

                                    <span className="text-gray-500">
                                        Phone
                                    </span>

                                    <p className="font-medium text-gray-800 truncate">
                                        {item.phone}
                                    </p>

                                </div>


                                <div>

                                    <span className="text-gray-500">
                                        Qualification
                                    </span>

                                    <p className="font-medium text-gray-800 truncate">
                                        {item.qualification}
                                    </p>

                                </div>


                                <div>

                                    <span className="text-gray-500">
                                        Status
                                    </span>

                                    <p
                                        className={
                                            item.status === "active"
                                                ? "text-green-600 font-medium"
                                                : "text-red-600 font-medium"
                                        }
                                    >
                                        {item.status}
                                    </p>

                                </div>

                            </div>


                            {/* ACTIONS */}

                            <div className="flex gap-2 mt-5 pt-3 border-t">

                                <button
                                    onClick={() =>
                                        editReceptionist(item)
                                    }
                                    className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                                >

                                    <Pencil size={15} />

                                    Edit

                                </button>


                                <button
                                    onClick={() =>
                                        deleteReceptionist(item._id)
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