import axios from "axios"
import {useState,useEffect} from "react"
import { Bell, CalendarDays, CreditCard, 
    MessageSquare, Info, Clock, CheckCircle2 } from "lucide-react"

export default function Notification(){

    const [notifications, setNotifications] = useState([])

    useEffect(()=>{
         console.log("Notification component mounted")
        fetchNotifications()
    },[])

    async function markAsRead(id) {
    try {
        const token = localStorage.getItem("token")

        await axios.put(
            `https://erp-black-eight.vercel.app/notification/updateNot/${id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        setNotifications(prev =>
            prev.map(not =>
                not._id === id
                    ? { ...not, isRead: true }
                    : not
            )
        )

    } catch (error) {
        console.log(error)
    }
}

    async function fetchNotifications(){
        console.log("Fetching notifications...")
        try{
            const token = localStorage.getItem("token")
             console.log("Token exists:", !!token)
            const res = await axios.get("https://erp-black-eight.vercel.app/notification/getNot",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
             console.log("Notification response:", res.data)
        setNotifications(res.data)
        }catch(error){
            console.error("Failed to fetch notifications:", error)
        }
    }
    function getNotificationIcon(type) {
    if (type === "appointment") {
        return <CalendarDays size={20} />
    }

    if (type === "payment") {
        return <CreditCard size={20} />
    }

    if (type === "message") {
        return <MessageSquare size={20} />
    }

    return <Info size={20} />
}

function getNotificationColor(type) {
    if (type === "appointment") {
        return "bg-blue-100 text-blue-600"
    }

    if (type === "payment") {
        return "bg-green-100 text-green-600"
    }

    if (type === "message") {
        return "bg-purple-100 text-purple-600"
    }

    return "bg-gray-100 text-gray-600"
}

   return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">

            <div className="flex items-center gap-4 mb-8">
                <div className="bg-blue-600 text-white p-3 rounded-xl">
                    <Bell size={26} />
                </div>

                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Notifications
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Stay updated with your appointments, payments and messages.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-500 text-sm">Total Notifications</p>
                        <Bell size={20} className="text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mt-3">
                        {notifications.length}
                    </h2>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-500 text-sm">Unread</p>
                        <MessageSquare size={20} className="text-orange-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mt-3">
                        {notifications.filter(not => !not.isRead).length}
                    </h2>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-500 text-sm">Read</p>
                        <CheckCircle2 size={20} className="text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mt-3">
                        {notifications.filter(not => not.isRead).length}
                    </h2>
                </div>

            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">

                <div className="flex items-center justify-between p-5 border-b border-gray-200">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Recent Activity
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Your latest updates
                        </p>
                    </div>

                    <span className="text-sm text-gray-500">
                        {notifications.length} items
                    </span>
                </div>

                {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4">
                        <div className="bg-gray-100 text-gray-400 p-4 rounded-full mb-4">
                            <Bell size={30} />
                        </div>

                        <h3 className="text-lg font-semibold text-gray-700">
                            You're all caught up
                        </h3>

                        <p className="text-sm text-gray-500 mt-2 text-center">
                            New appointments, payments and other updates will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {notifications.map(not => (
                            <div
                                key={not._id}
                                className={`flex gap-4 p-5 transition ${
                                    not.isRead
                                        ? "bg-white"
                                        : "bg-blue-50/60"
                                }`}
                            >
                                <div
                                    className={`h-11 w-11 shrink-0 rounded-xl flex items-center justify-center ${getNotificationColor(not.type)}`}
                                >
                                    {getNotificationIcon(not.type)}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="font-semibold text-gray-800">
                                            {not.title}
                                        </h3>

                                        {!not.isRead && (
                                            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                                                New
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-sm text-gray-600 mt-1 leading-6">
                                        {not.message}
                                    </p>

                                <div className="flex items-center gap-2 text-xs text-gray-400 mt-3">
                                    <Clock size={14} />
                                    <span>
                                        {new Date(not.createdAt).toLocaleString()}
                                    </span>
                                </div>

                                {!not.isRead && (
                                    <button
                                        onClick={() => markAsRead(not._id)}
                                        className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800 transition"
                                    >
                                        Mark as read
                                    </button>
                                )}

                                </div>

                                {!not.isRead && (
                                    <div className="pt-2">
                                        <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                                    </div>
                                )}
                                </div>    
                        ))}
                    </div>
                )}

            </div>

        </div>
    </div>
)
}