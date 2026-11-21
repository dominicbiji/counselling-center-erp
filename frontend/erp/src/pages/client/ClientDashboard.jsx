import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard,CalendarDays,UserRound, 
    Clock,CalendarCheck,LogOut,Bell } from "lucide-react"

export default function ClientDashboard(){

    useEffect(()=>{
        fetchClient()
        fetchAppointment()
        fetchAppointmentHistory()
        getBills()
        fetchUnreadCount()
    },[])

    useEffect(()=>{
        const script=document.createElement("script")
        script.src="https://checkout.razorpay.com/v1/checkout.js"
        script.onload=()=>{
            console.log("Razorpay script loaded successfully")
        }
        document.body.appendChild(script)
        return()=>{
            script.remove()
        }
    },[])

    const nav=useNavigate()
    const [client,setClient]=useState(null)
    const [appointments,setAppointments]=useState([])
    const [sessions,setSessions]=useState([])
    const [bills,setBills]=useState([])
    const [payments,setPayments]=useState({})
    const [unreadCount, setUnreadCount] = useState(0)

    async function fetchUnreadCount() {
    try {
        const token = localStorage.getItem("token")

        const res = await axios.get(
            "http://localhost:5050/notification/getNot",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        setUnreadCount(res.data.filter(not => !not.isRead).length)

    } catch (error) {
        console.log(error)
    }
}

    async function fetchClient(){
        try{
            const token=localStorage.getItem("token")
            const response=await axios.get("http://localhost:5050/client/account",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        setClient(response.data)
        
        }catch(error){
            console.log(error)
        }
       
    }

    async function fetchAppointment(){
        try{
            const token=localStorage.getItem("token")
             const response = await axios.get("http://localhost:5050/appointment/clientAppointment",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setAppointments(response.data)
           
            
        }catch(error){
            console.log(error)
        }
    }


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
            
            
        }catch(error){
            console.log(error)
        }
    }
    async function getBills(){
        console.log("its working")
        try{
            const token=localStorage.getItem("token")
            const res=await axios.get("http://localhost:5050/bill/getBill",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log("bills",res.data)
            setBills(res.data)
        }catch(error){
            console.log("Status:", error.response?.status);
            console.log("Error:", error.response?.data || error.message)
        }
    }

    function isUpcoming(app) {
        if (!app.date) return false;

        const appointmentDate = new Date(app.date);
        const today = new Date();

        appointmentDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        return (
            appointmentDate >= today &&
            !["cancelled", "completed", "no-show"].includes(
                app.status?.toLowerCase()
            )
        )
    }
    async function handlePayment(bill){
        const amount=Number(payments[bill._id])
        if(!payments[bill._id]){
            return alert("please enter a amount")
        }
        if(amount<=0){
            return alert("amount must be greaterthan zero")
        }
        if(amount>bill.outstandingBalance){
            return alert("amount cannot exceed the outstanding balance")
        }
            
        try{
            const token=localStorage.getItem("token")
            const res=await axios.post("http://localhost:5050/payment/createPayment",{
                billId:bill._id,
                amount:amount
            },
        {
            headers:{
                    Authorization:`Bearer ${token}`
                }
        })
        console.log(res.data)
        const options={
            key:res.data.key,
            amount:res.data.amount,
            currency:res.data.currency,
            order_id:res.data.orderId,
            name: "Counselling Center",
            description: "Appointment payment",

            handler:async function(response){
                try{
                     console.log("payment response:",response)

                const verifyData={
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature
                }
                const verifyRes=await axios.post("http://localhost:5050/payment/verifyPayment", verifyData,
                   
                {
                    headers: {
                             Authorization: `Bearer ${token}`
                        }
                })
                console.log("verification result:",verifyRes.data)
                await getBills()

                }catch(error){
                    console.log("Verification error:",
                error.response?.data || error.message)
                }

            }
        }
        const rzp=new window.Razorpay(options)
        rzp.open()
        }catch(error){
            console.log("Payment setup error:",
        error.response?.data || error.message)
        }
    }

    return (
    <div className="min-h-screen bg-gray-100 flex">

        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white shadow-md p-6 flex flex-col">
            <div>
                <h2 className="text-2xl font-bold text-blue-600 mb-10">
                    Live Life
                </h2>

                <div className="flex flex-col gap-3">
                    <button
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg bg-blue-600 text-white"
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </button>

                    <button
                        onClick={() => nav("/client/appointments")}
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        <CalendarDays size={18} />
                        My Appointments
                    </button>

                    <button
                        onClick={() => nav("/client/history")}
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        <Clock size={18} />
                        Session History
                    </button>

                    <button
                        onClick={() => nav("/client/profile")}
                        className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        <UserRound size={18} />
                        My Profile
                    </button>
                </div>
            </div>

            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    nav("/login");
                }}
                className="flex items-center gap-3 text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 mt-auto"
            >
                <LogOut size={18} />
                Logout
            </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">

            {/* Header */}
           <div className="flex items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome{client?.name ? `, ${client.name}` : ""}
                </h1>

                <p className="text-gray-500 mt-1">
                    Your counselling journey at a glance
                </p>
            </div>

            <button
                onClick={() => nav("/notifications")}
                className="relative flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl transition shadow-sm"
            >
                <Bell size={20} />
                <span className="hidden sm:inline">Notifications</span>
                {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center border-2 border-white">
                    {unreadCount > 99 ? "99+" : unreadCount}
                </span>
            )}
            </button>
        </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                {/* Total Appointments */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">
                                Total Appointments
                            </p>

                            <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                {appointments.length + sessions.length}
                            </h2>
                        </div>

                        <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                            <CalendarDays size={24} />
                        </div>
                    </div>
                </div>

                {/* Upcoming Appointments */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">
                                Upcoming Appointments
                            </p>

                            <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                {appointments.filter(isUpcoming).length}
                            </h2>
                        </div>

                        <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg">
                            <Clock size={24} />
                        </div>
                    </div>
                </div>

               

                        {/* Completed Sessions */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">
                                        Completed Sessions
                                    </p>

                                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                        {sessions.length}
                                    </h2>
                                </div>

                                <div className="bg-green-100 text-green-600 p-3 rounded-lg">
                                    <CalendarCheck size={24} />
                                </div>
                            </div>
                        </div>
                    </div>

                   {/* My Bills Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-5">
                My Bills
            </h2>

            {bills.length === 0 ? (
                <p className="text-gray-500 text-sm">
                    No bills available.
                </p>) 
        : (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600">
                    <tr>
                        <th className="px-4 py-3">Total Fee</th>
                        <th className="px-4 py-3">Amount Paid</th>
                        <th className="px-4 py-3">Balance Due</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {bills.map((bill) => (
                        <tr
                            key={bill._id}
                            className="border-b hover:bg-gray-50"
                        >
                            <td className="px-4 py-4">
                                ₹{bill.totalFee}
                            </td>

                            <td className="px-4 py-4">
                                ₹{bill.amountPaid}
                            </td>

                            <td className="px-4 py-4 font-medium">
                                ₹{bill.outstandingBalance}
                            </td>

                            <td className="px-4 py-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        bill.status === "paid"
                                            ? "bg-green-100 text-green-700"
                                            : bill.status === "partially_paid"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : bill.status === "cancelled"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-orange-100 text-orange-700"
                                    }`}
                                >
                                    {bill.status.replace("_", " ")}
                                </span>
                            </td>

                            
                            <td className="px-4 py-4">
                                {bill.outstandingBalance > 0 && bill.status !== "cancelled" ? (
                                    <div className="flex items-center gap-2 min-w-[240px]">

                                        <div className="relative flex-1">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                                                ₹
                                            </span>

                                            <input
                                                type="number"
                                                min="1"
                                                max={bill.outstandingBalance}
                                                step="1"
                                                placeholder="Amount"
                                                value={payments[bill._id] || ""}
                                                onChange={(e) =>
                                                    setPayments({
                                                        ...payments,
                                                        [bill._id]: e.target.value
                                                    })
                                                }
                                                className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            />
                                        </div>

                                        <button
                                            onClick={() => handlePayment(bill)}
                                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm whitespace-nowrap"
                                        >
                                            Pay Now
                                        </button>

                                    </div>
                                ) : (
                                    <span className={`inline-flex items-center gap-1 text-sm font-medium ${
                                        bill.status === "cancelled"
                                            ? "text-red-600"
                                            : "text-green-600"
                                    }`}>
                                        {bill.status === "cancelled" ? "Cancelled" : "Paid"}
                                    </span>
                                )}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )}
</div>  

            {/* Upcoming Appointments */}
            <div>
                <div className="flex items-center justify-between mb-5 mt-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Upcoming Appointments
                        </h2>

                        <p className="text-gray-500 mt-1">
                            Keep track of your scheduled sessions
                        </p>
                    </div>

                    <button
                        onClick={() => nav("/client/appointments")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                    >
                        View All
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                        Counsellor
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                        Date
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                        Time
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                        Type
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {appointments.length > 0 ? (
                                    appointments.filter(isUpcoming)
                                        .slice(0, 5)
                                        .map(app => (
                                            <tr
                                                key={app._id}
                                                className="hover:bg-gray-50 transition"
                                            >
                                                <td className="px-6 py-5 font-semibold text-gray-800">
                                                    {app.counsellorId?.name || "N/A"}
                                                </td>

                                                <td className="px-6 py-5 text-gray-700">
                                                    {app.date
                                                        ? new Date(app.date).toLocaleDateString(
                                                            "en-GB",
                                                            {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric"
                                                            }
                                                        )
                                                        : "N/A"}
                                                </td>

                                                <td className="px-6 py-5 text-gray-700">
                                                    {app.time || "N/A"}
                                                </td>

                                                <td className="px-6 py-5 text-gray-700">
                                                    {app.appointmentType || "N/A"}
                                                </td>

                                                <td className="px-6 py-5">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                            app.status === "confirmed"
                                                                ? "bg-blue-100 text-blue-700"
                                                                : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                    >
                                                        {app.status || "scheduled"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-10 text-center text-gray-500"
                                        >
                                            No appointments found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
);
    
}
