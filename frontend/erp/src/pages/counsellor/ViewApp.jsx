import axios from "axios"
import {useState,useEffect} from "react"
import { useParams,useNavigate } from "react-router-dom"



export default function ViewApp(){

const [appointments,setAppointments]=useState(null)
const [notes, setNotes] = useState("")
const {id}=useParams()

const nav=useNavigate()


useEffect(()=>{
    fetchAppointment()
},[])

    async function fetchAppointment(){
        try{
            
            const token=localStorage.getItem("token")
            const res= await axios.get(`http://localhost:5050/appointment/viewApp/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log(res.data)
            setAppointments(res.data)
            setNotes(res.data.notes||"")
            

        }catch(error){
            console.log(error)
        }

}

async function saveNotes() {
    try {
        const token = localStorage.getItem("token")

        const res = await axios.put(
            `http://localhost:5050/appointment/updateNotes/${id}`,
            {
                notes: notes
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}

async function completeSession() {
    try {
        const token = localStorage.getItem("token")

        const res = await axios.put(
            `http://localhost:5050/appointment/updateStatus/${id}`,
            {
                status: "completed"
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        setAppointments(res.data.appointment)
        alert("session completed")
        nav("/counsellorDb")
        
    } catch (error) {
        console.log(error)
    }
}

if (!appointments) {
    return (
        <p>Loading...</p>
    )
}
   
   return (
    <div className="min-h-screen bg-gray-100 p-6">

        <div className="max-w-4xl mx-auto">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Appointment Details
                </h1>
                <p className="text-gray-500 mt-1">
                    View and manage this counselling session
                </p>
            </div>

            {appointments && (
                <div className="space-y-6">

                    {/* Client Information */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-5">
                            Client Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Name
                                </p>
                                <p className="font-medium text-gray-800 mt-1">
                                    {appointments.clientId.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Phone
                                </p>
                                <p className="font-medium text-gray-800 mt-1">
                                    {appointments.clientId.phone}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Email
                                </p>
                                <p className="font-medium text-gray-800 mt-1">
                                    {appointments.clientId.email}
                                </p>
                            </div>

                        </div>
                    </div>


                    {/* Appointment Information */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">

                        <h2 className="text-lg font-semibold text-gray-800 mb-5">
                            Appointment Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Date
                                </p>
                                <p className="font-medium text-gray-800 mt-1">
                                    {new Date(
                                        appointments.date
                                    ).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Time
                                </p>
                                <p className="font-medium text-gray-800 mt-1">
                                    {appointments.time}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Type
                                </p>
                                <p className="font-medium text-gray-800 mt-1">
                                    {appointments.appointmentType}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Status
                                </p>
                                <span className="inline-block mt-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                                    {appointments.status}
                                </span>
                            </div>

                        </div>
                    </div>


                    {/* Session Notes */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">

                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Session Notes
                        </h2>

                        <textarea value={notes}
                            onChange={(e) => setNotes(e.target.value)}  
                            className="w-full min-h-40 border rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Write notes here..."
                            
                        />

                    </div>


                    {/* Actions */}
                    <div className="flex justify-end gap-3">

                        

                        <button onClick={async()=>{
                            await saveNotes()
                            await  completeSession() 
                            }}
                            className="bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
                        >{appointments.status==="completed"
                          ?"completed"
                          :"complete session"
                        
                        }
                            
                        </button>

                    </div>

                </div>
            )}

        </div>

    </div>
)
   
    
}