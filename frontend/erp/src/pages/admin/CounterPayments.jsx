import axios from "axios"
import {useState,useEffect} from "react"


export default function CounterPayments(){

    const [bills, setBills] = useState([])
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [paymentMessage, setPaymentMessage] = useState("")
    const [selectedBill, setSelectedBill] = useState(null)
    const [paymentAmount, setPaymentAmount] = useState("")
   


    useEffect(()=>{
        fetchBills() 
    },[])

    async function fetchBills(){
        try{
            const token=localStorage.getItem("token")
            const res=await axios.get("https://erp-black-eight.vercel.app/bill/fetchAllBill",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        const sortedBills=res.data.sort((a,b)=>
        a.clientId.name.localeCompare(b.clientId.name))

        setBills(sortedBills)
        console.log(res.data)
        }catch(error){
            console.log(error)
        }
        
    }

    async function handlePayment(){
        try{
            if (!paymentAmount || Number(paymentAmount) <= 0 ||
            Number(paymentAmount) > selectedBill.outstandingBalance) {
            return alert("Enter a valid payment amount")
        }

            const token = localStorage.getItem("token")
            const res = await axios.post("https://erp-black-eight.vercel.app/payment/CounterPay",{
                billId: selectedBill._id,
                amount: Number(paymentAmount),
                paymentMethod: "cash"
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

        setPaymentMessage(res.data.message)
        setSelectedBill(null)
        setPaymentAmount("")
        fetchBills()
        }catch(error){
            console.log(error)
             setPaymentMessage(error.response?.data?.message || "Payment failed.")
        }
    }

    const filteredBills=bills.filter((bill)=>
    bill.clientId.name.toLowerCase().includes(search.toLocaleLowerCase()) &&
    (statusFilter==="all"||bill.status===statusFilter))

  
    
return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="mx-auto max-w-7xl">

            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Counter Payments
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    Manage client bills and record cash payments.
                </p>
            </div>

            {/* Payment Message */}
            {paymentMessage && (
                <p className="mb-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
                    {paymentMessage}
                </p>
            )}

            {/* Summary Cards */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Total Bills</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                        {bills.length}
                    </p>
                </div>

                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Pending Bills</p>
                    <p className="mt-2 text-3xl font-bold text-red-600">
                        {bills.filter(bill => bill.status === "pending").length}
                    </p>
                </div>

                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Partially Paid</p>
                    <p className="mt-2 text-3xl font-bold text-amber-600">
                        {bills.filter(bill => bill.status === "partially_paid").length}
                    </p>
                </div>

                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Paid Bills</p>
                    <p className="mt-2 text-3xl font-bold text-green-600">
                        {bills.filter(bill => bill.status === "paid").length}
                    </p>
                </div>

            </div>

            {/* Bills Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                {/* Search and Filter */}
                <div className="border-b p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Client Bill History
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Search clients or filter by payment status.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <input
                                type="text"
                                placeholder="Search client name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm sm:w-64"
                            />

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                            >
                                <option value="all">All statuses</option>
                                <option value="pending">Pending</option>
                                <option value="partially_paid">Partially Paid</option>
                                <option value="paid">Paid</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                            <tr>
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Total Fee</th>
                                <th className="px-6 py-4">Amount Paid</th>
                                <th className="px-6 py-4">Outstanding</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {filteredBills.length > 0 ? (
                                filteredBills.map((bill) => (
                                    <tr key={bill._id} className="hover:bg-gray-50">

                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="font-medium text-gray-900">
                                                {bill.clientId?.name || "Unknown client"}
                                            </div>
                                            <div className="mt-1 text-xs text-gray-500">
                                                Bill ID: {bill._id}
                                            </div>
                                        </td>

                                        <td className="whitespace-nowrap px-6 py-4">
                                            ₹{Number(bill.totalFee).toLocaleString("en-IN")}
                                        </td>

                                        <td className="whitespace-nowrap px-6 py-4">
                                            ₹{Number(bill.amountPaid).toLocaleString("en-IN")}
                                        </td>

                                        <td className="whitespace-nowrap px-6 py-4 font-semibold">
                                            ₹{Number(bill.outstandingBalance).toLocaleString("en-IN")}
                                        </td>

                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                bill.status === "paid"
                                                    ? "bg-green-100 text-green-700"
                                                    : bill.status === "partially_paid"
                                                    ? "bg-amber-100 text-amber-700"
                                                    : bill.status === "pending"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-gray-100 text-gray-600"
                                            }`}>
                                                {bill.status.replaceAll("_", " ")}
                                            </span>
                                        </td>

                                        <td className="whitespace-nowrap px-6 py-4 text-right">
                                            {bill.outstandingBalance > 0 &&
                                            bill.status !== "cancelled" ? (
                                                <button
                                                    onClick={() => {
                                                        setSelectedBill(bill)
                                                        setPaymentAmount("")
                                                        setPaymentMessage("")
                                                    }}
                                                    className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                                                >
                                                    Pay
                                                </button>
                                            ) : (
                                                <span className="text-xs text-gray-400">
                                                    No payment due
                                                </span>
                                            )}
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-16 text-center">
                                        <p className="font-medium text-gray-700">
                                            No bills found
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Try a different client name or status.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer */}
                <div className="border-t bg-gray-50 px-6 py-4">
                    <p className="text-sm text-gray-500">
                        Showing <span className="font-semibold text-gray-900">
                            {filteredBills.length}
                        </span>{" "}
                        of <span className="font-semibold text-gray-900">
                            {bills.length}
                        </span> bills
                    </p>
                </div>

            </div>
        </div>

        {/* Payment Modal */}
        {selectedBill && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

                    <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">
                            Record Cash Payment
                        </h2>

                        <button
                            onClick={() => {
                                setSelectedBill(null)
                                setPaymentAmount("")
                            }}
                            className="text-xl text-gray-400 hover:text-gray-700"
                        >
                            &times;
                        </button>
                    </div>

                    <p className="mb-4 text-sm text-gray-600">
                        Client: <span className="font-semibold text-gray-900">
                            {selectedBill.clientId?.name || "Unknown client"}
                        </span>
                    </p>

                    <div className="mb-5 rounded-xl bg-gray-50 p-4">
                        <p className="text-sm text-gray-500">
                            Outstanding Balance
                        </p>
                        <p className="mt-1 text-2xl font-bold text-gray-900">
                            ₹{Number(selectedBill.outstandingBalance).toLocaleString("en-IN")}
                        </p>
                    </div>

                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Payment Amount (₹)
                    </label>

                    <input
                        type="number"
                        min="0.01"
                        max={selectedBill.outstandingBalance}
                        step="0.01"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="mb-2 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <p className="mb-6 text-xs text-gray-500">
                        Maximum payment: ₹{Number(selectedBill.outstandingBalance).toLocaleString("en-IN")}
                    </p>

                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                setSelectedBill(null)
                                setPaymentAmount("")
                            }}
                            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handlePayment}
                            disabled={
                                !paymentAmount ||
                                !Number.isFinite(Number(paymentAmount)) ||
                                Number(paymentAmount) <= 0 ||
                                Number(paymentAmount) > selectedBill.outstandingBalance
                            }
                            className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Confirm Payment
                        </button>
                    </div>

                </div>
            </div>
        )}

    </div>
);


}