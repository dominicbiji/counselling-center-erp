import {useState,useEffect} from "react"
import axios from "axios"
import { Users, UserPlus, UserRound, UserRoundCog, 
    Pencil, Trash2, Save, X } from "lucide-react"


export default function CounsellorPage(){
const [counsellor,setCounsellor]=useState([])
const [counsellorName, setCounsellorName] = useState("")
const [counsellorEmail, setCounsellorEmail] = useState("")
const [counsellorPassword, setCounsellorPassword] = useState("")
const [counsellorPhone, setCounsellorPhone] = useState("")
const [counsellorSpecialization, setCounsellorSpecialization] = useState("")
const [counsellorQualification, setCounsellorQualification] = useState("")
const [counsellorExperience, setCounsellorExperience] = useState("")
const [counsellorStatus, setCounsellorStatus] = useState("active")

const [editingCounsellorId, setEditingCounsellorId] = useState(null)

const [editCounsellorName, setEditCounsellorName] = useState("")
const [editCounsellorEmail, setEditCounsellorEmail] = useState("")
const [editCounsellorPhone, setEditCounsellorPhone] = useState("")
const [editCounsellorSpecialization, setEditCounsellorSpecialization] = useState("")
const [editCounsellorQualification, setEditCounsellorQualification] = useState("")
const [editCounsellorExperience, setEditCounsellorExperience] = useState("")
const [editCounsellorStatus, setEditCounsellorStatus] = useState("")

useEffect(()=>{
    fetchCounsellors()
},[])

async function fetchCounsellors(){
    try{
        const token = localStorage.getItem("token")
        const response=await axios.get("http://localhost:5050/counsellor/getcounsellor",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        setCounsellor(response.data)
        console.log(response.data)
        
    }catch(error){
        console.log(error)
    }
}

async function addCounsellor(e){
    e.preventDefault()
    try{
        const token=localStorage.getItem("token")
        const response=await axios.post("http://localhost:5050/counsellor/addcounsellor",{
            name: counsellorName,
            email: counsellorEmail,
            password: counsellorPassword,
            phone: counsellorPhone,
            specialization: counsellorSpecialization,
            qualification: counsellorQualification,
            experience: counsellorExperience,
            status: counsellorStatus
        },
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        console.log(response.data)
    }catch(error){
        console.log(error)
    }
}

function editCounsellors(item){
    setEditingCounsellorId(item._id)
    setEditCounsellorName(item.name)
    setEditCounsellorEmail(item.email)
    setEditCounsellorPhone(item.phone)
    setEditCounsellorSpecialization(item.specialization)
    setEditCounsellorQualification(item.qualification)
    setEditCounsellorExperience(item.experience)
    setEditCounsellorStatus(item.status)
}

async function updateCounsellor(e,id){
    e.preventDefault()
    try{
        const token = localStorage.getItem("token")
        const response=await axios.put(`http://localhost:5050/counsellor/updatecounsellor/${id}`,{
            name: editCounsellorName,
            email: editCounsellorEmail,
            phone: editCounsellorPhone,
            specialization: editCounsellorSpecialization,
            qualification: editCounsellorQualification,
            experience: editCounsellorExperience,
            status: editCounsellorStatus
        },
        {
                headers:{
                    Authorization: `Bearer ${token}`
                }
        }
    )
        fetchCounsellors()
        setEditingCounsellorId(null)
        alert(response.data)
    }catch(error){
        console.log(error)
    }
}

async function deleteCounsellor(id){
    try{
         const token = localStorage.getItem("token")
        const response=await axios.delete(`http://localhost:5050/counsellor/deletecounsellor/${id}`,{
            headers:{
                    Authorization:`Bearer ${token}`
                }
        })
        alert(response.data)
        fetchCounsellors()
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
                        Counsellor Management
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage counselling center counsellors
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
                        {counsellor.length} Counsellors
                    </span>

                </div>

            </div>

        </div>


        {/* ADD COUNSELLOR */}

        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-10">

            <div className="flex items-center gap-3 mb-6">

                <div className="bg-blue-100 text-blue-600 p-2.5 rounded-lg">
                    <UserPlus size={21} />
                </div>

                <div>

                    <h2 className="text-xl font-semibold text-gray-800">
                        Add Counsellor
                    </h2>

                    <p className="text-sm text-gray-500">
                        Create a new counsellor profile
                    </p>

                </div>

            </div>


            <form
                onSubmit={addCounsellor}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >

                {/* NAME */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Counsellor Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter counsellor name"
                        value={counsellorName}
                        onChange={(e) =>
                            setCounsellorName(e.target.value)
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
                        value={counsellorEmail}
                        onChange={(e) =>
                            setCounsellorEmail(e.target.value)
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
                        value={counsellorPassword}
                        onChange={(e) =>
                            setCounsellorPassword(e.target.value)
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
                        value={counsellorPhone}
                        onChange={(e) =>
                            setCounsellorPhone(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>


                {/* SPECIALIZATION */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Specialization
                    </label>

                    <input
                        type="text"
                        placeholder="Enter specialization"
                        value={counsellorSpecialization}
                        onChange={(e) =>
                            setCounsellorSpecialization(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>


                {/* QUALIFICATION */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Qualification
                    </label>

                    <input
                        type="text"
                        placeholder="Enter qualification"
                        value={counsellorQualification}
                        onChange={(e) =>
                            setCounsellorQualification(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>


                {/* EXPERIENCE */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Years of Experience
                    </label>

                    <input
                        type="number"
                        placeholder="Enter years of experience"
                        value={counsellorExperience}
                        onChange={(e) =>
                            setCounsellorExperience(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>


                {/* STATUS */}

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                    </label>

                    <select
                        value={counsellorStatus}
                        onChange={(e) =>
                            setCounsellorStatus(e.target.value)
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

                        Add Counsellor

                    </button>

                </div>

            </form>

        </div>


        {/* COUNSELLORS SECTION */}

        <div>

            <div className="flex items-center gap-3 mb-5">

                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                    <Users size={20} />
                </div>

                <div>

                    <h2 className="text-xl font-semibold text-gray-800">
                        Counsellors
                    </h2>

                    <p className="text-sm text-gray-500">
                        View and manage registered counsellors
                    </p>

                </div>

            </div>


            {/* COUNSELLOR GRID */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

                {counsellor.map((item) => (

                    item._id === editingCounsellorId ? (

                        /* EDIT COUNSELLOR */

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
                                        Edit Counsellor
                                    </h3>

                                    <p className="text-xs text-gray-500">
                                        Update counsellor information
                                    </p>

                                </div>

                            </div>


                            <form
                                onSubmit={(e) =>
                                    updateCounsellor(
                                        e,
                                        editingCounsellorId
                                    )
                                }
                                className="space-y-3"
                            >

                                <input
                                    type="text"
                                    value={editCounsellorName}
                                    onChange={(e) =>
                                        setEditCounsellorName(e.target.value)
                                    }
                                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Name"
                                />

                                <input
                                    type="email"
                                    value={editCounsellorEmail}
                                    onChange={(e) =>
                                        setEditCounsellorEmail(e.target.value)
                                    }
                                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Email"
                                />

                                <input
                                    type="text"
                                    value={editCounsellorPhone}
                                    onChange={(e) =>
                                        setEditCounsellorPhone(e.target.value)
                                    }
                                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Phone"
                                />

                                <input
                                    type="text"
                                    value={editCounsellorSpecialization}
                                    onChange={(e) =>
                                        setEditCounsellorSpecialization(e.target.value)
                                    }
                                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Specialization"
                                />

                                <input
                                    type="text"
                                    value={editCounsellorQualification}
                                    onChange={(e) =>
                                        setEditCounsellorQualification(e.target.value)
                                    }
                                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Qualification"
                                />

                                <input
                                    type="number"
                                    value={editCounsellorExperience}
                                    onChange={(e) =>
                                        setEditCounsellorExperience(e.target.value)
                                    }
                                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Experience"
                                />

                                <select
                                    value={editCounsellorStatus}
                                    onChange={(e) =>
                                        setEditCounsellorStatus(e.target.value)
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
                                            setEditingCounsellorId(null)
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

                        /* COUNSELLOR CARD */

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


                            {/* COUNSELLOR DETAILS */}

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
                                        Specialization
                                    </span>

                                    <p className="font-medium text-gray-800 truncate">
                                        {item.specialization}
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
                                        Experience
                                    </span>

                                    <p className="font-medium text-gray-800">
                                        {item.experience} years
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
                                        editCounsellors(item)
                                    }
                                    className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                                >

                                    <Pencil size={15} />

                                    Edit

                                </button>


                                <button
                                    onClick={() =>
                                        deleteCounsellor(item._id)
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