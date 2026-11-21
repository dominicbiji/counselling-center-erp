import axios from "axios"
import {useState,useEffect} from "react"


export default function Revenue(){

    const [totalRevenue,setTotalRevenue]=useState(0)
    const [monthlyRevenue,setMonthlyRevenue]=useState([])
    const [thisMonthRevenue,setThisMonthRevenue]=useState(0)
    const [selectedMonth, setSelectedMonth] = useState("")
    

    useEffect(()=>{
        fetchRevenue()
    },[])

    async function fetchRevenue(){
        try{
            const token=localStorage.getItem("token")
            const res=await axios.get("https://erp-black-eight.vercel.app/payment/revenue",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
           
            setTotalRevenue(res.data.totalRevenue)
            setMonthlyRevenue(res.data.monthlyRevenue)
            setThisMonthRevenue(res.data.thisMonthRevenue)

            console.log(res.data.totalRevenue)
        }catch(error){
            console.log(error)
        }
    }

    const selectedRevenue = monthlyRevenue.find((item) =>
    `${item._id.year}-${item._id.month}` === selectedMonth
)
   return (
    <div className="p-5">

        <h1 className="text-2xl font-bold mb-6">
            Revenue Dashboard
        </h1>

        {/* Revenue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Total Revenue */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">
                    Total Revenue
                </p>

                <h2 className="mt-3 text-3xl font-bold text-green-600">
                    ₹{Number(totalRevenue).toLocaleString("en-IN")}
                </h2>

                <p className="mt-4 text-sm text-gray-500">
                    All successful payments
                </p>
            </div>

            {/* This Month's Revenue */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">
                    This Month's Revenue
                </p>

                <h2 className="mt-3 text-3xl font-bold text-blue-600">
                    ₹{Number(thisMonthRevenue).toLocaleString("en-IN")}
                </h2>

                <p className="mt-4 text-sm text-gray-500">
                    Successful payments received this month
                </p>
            </div>

        </div>

        {/* Month-wise Revenue */}
        <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-xl font-semibold">
                Month-wise Revenue
            </h2>

            <p className="mt-2 text-sm text-gray-500">
                Select a month to view its revenue.
            </p>

            <select
                className="mt-4 w-full rounded-lg border border-gray-300 p-3 md:w-72"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
            >
                <option value="">
                    Select a month
                </option>

                {monthlyRevenue.map((item) => (
                    <option
                        key={`${item._id.year}-${item._id.month}`}
                        value={`${item._id.year}-${item._id.month}`}
                    >
                        {new Date(
                            item._id.year,
                            item._id.month - 1
                        ).toLocaleDateString("en-IN", {
                            month: "long",
                            year: "numeric"
                        })}
                    </option>
                ))}
            </select>

            {/* Selected Month Revenue */}
            {selectedMonth && (
                <div className="mt-5 rounded-lg bg-gray-50 p-5">

                    <p className="text-sm text-gray-500">
                        Selected Month Revenue
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-green-600">
                        ₹{Number(selectedRevenue?.revenue ?? 0).toLocaleString("en-IN")}
                    </h3>

                </div>
            )}

        </div>

    </div>
)
}