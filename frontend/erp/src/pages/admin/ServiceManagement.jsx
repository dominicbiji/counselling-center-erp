import {useState,useEffect} from "react"
import axios from "axios"



export default function ServiceManagement(){

    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [fee, setFee] = useState("")

    
    const [editId, setEditId] = useState("")
    const [editName, setEditName] = useState("")
    const [editDescription, setEditDescription] = useState("")
    const [editFee, setEditFee] = useState("")


    useEffect(() => {
        fetchServices()
    }, [])


    async function fetchServices() {
        setError("")
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get("http://localhost:5050/service/getservice",{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            setServices(res.data)
        } catch (error) {
            console.log(error)
            setError("Failed to fetch services");
        } finally {
            setLoading(false)
        }
    }

function handleEditService(service) {
    setEditId(service._id);
    setEditName(service.name);
    setEditDescription(service.description || "");
    setEditFee(String(service.fee));
}

async function handleUpdateService(e) {
    e.preventDefault()

    if (editFee === "" || !Number.isFinite(Number(editFee)) || Number(editFee) < 0) {
    alert("Please enter a valid fee");
    return
}

    try {
        const token = localStorage.getItem("token");

        await axios.put(
            `http://localhost:5050/service/updateservice/${editId}`,{
                name: editName.trim(),
                description: editDescription.trim(),
                fee: Number(editFee)
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

        alert("Service updated successfully");

        setEditId("")
        setEditName("")
        setEditDescription("")
        setEditFee("")

        await fetchServices()
    } catch (error) {
        console.log(error);
        alert(
            error.response?.data?.message ||
            "Failed to update service"
        )
    }
}
    
async function handleAddService(e) {
    e.preventDefault()

    if (fee === "" || !Number.isFinite(Number(fee)) || Number(fee) < 0) {
    alert("Please enter a valid fee");
    return
}

    try {
        const token = localStorage.getItem("token")

        const res = await axios.post("http://localhost:5050/service/addservice",
            {
                name: name.trim(),
                description: description.trim(),
                fee: Number(fee)
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

        alert("Service added successfully!");

        setName("")
        setDescription("")
        setFee("")

    await fetchServices()

    } catch (error) {
        console.log(error)
        alert(error.response?.data?.message ||"Failed to add service")
    }
}

        
return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
        <div className="mx-auto max-w-7xl">

            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                    Service Management
                </h2>
                <p className="mt-2 text-gray-500">
                    Manage counselling services, fees, and availability.
                </p>
            </div>

            {/* Add Service Form */}
            <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-5 text-xl font-semibold text-gray-800">
                    Add New Service
                </h3>

                <form onSubmit={handleAddService}>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Service Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter service name"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Fee (₹)
                            </label>
                            <input
                                type="number"
                                value={fee}
                                onChange={(e) => setFee(e.target.value)}
                                placeholder="Enter service fee"
                                min="0"
                                step="0.01"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter service description"
                                rows="3"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-5 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
                    >
                        Add Service
                    </button>
                </form>
            </div>

            {/* Edit Service Form */}
            {editId && (
                <div className="mb-8 rounded-xl border border-indigo-200 bg-indigo-50 p-6 shadow-sm">
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <h3 className="text-xl font-semibold text-gray-800">
                            Edit Service
                        </h3>

                        <button
                            type="button"
                            onClick={() => {
                                setEditId("");
                                setEditName("");
                                setEditDescription("");
                                setEditFee("");
                            }}
                            className="text-sm font-medium text-gray-600 hover:text-red-600"
                        >
                            Cancel
                        </button>
                    </div>

                    <form onSubmit={handleUpdateService}>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Service Name
                                </label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Fee (₹)
                                </label>
                                <input
                                    type="number"
                                    value={editFee}
                                    onChange={(e) => setEditFee(e.target.value)}
                                    min="0"
                                    step="0.01"
                                    required
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    rows="3"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-5 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
                        >
                            Update Service
                        </button>
                    </form>
                </div>
            )}

            {/* Services List */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold text-gray-800">
                        All Services
                    </h3>

                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                        {services.length} Services
                    </span>
                </div>

                {loading ? (
                    <p className="py-8 text-center text-gray-500">
                        Loading services...
                    </p>
                ) : error ? (
                    <p className="py-8 text-center text-red-600">
                        {error}
                    </p>
                ) : services.length === 0 ? (
                    <p className="py-8 text-center text-gray-500">
                        No services found. Add your first service above.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        {services.map((service) => (
                            <div
                                key={service._id}
                                className="rounded-xl border border-gray-200 p-5 transition hover:shadow-md"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800">
                                            {service.name}
                                        </h4>

                                        <p className="mt-2 text-sm leading-6 text-gray-500">
                                            {service.description || "No description provided"}
                                        </p>
                                    </div>

                                    <span
                                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                                            service.isActive
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-100 text-gray-600"
                                        }`}
                                    >
                                        {service.isActive ? "Active" : "Inactive"}
                                    </span>
                                </div>

                                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                                    <p className="text-xl font-bold text-indigo-700">
                                        ₹{service.fee}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => handleEditService(service)}
                                        className="rounded-lg border border-indigo-600 px-4 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
                                    >
                                        Edit Service
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    </div>
);

    


   
}