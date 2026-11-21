import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function ForgotPassword() {

    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setLoading(true)
            setMessage("")

            const response = await axios.post("https://erp-black-eight.vercel.app/user/forgot-password",{ 
                email: email 
            })

            setMessage(response.data.message)

        } catch (error) {
            console.log(error);
            setMessage("Something went wrong. Please try again.")

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

                <h1 className="text-3xl font-bold text-center">
                    Forgot Password?
                </h1>

                <p className="text-gray-600 text-center mt-3">
                    Enter your registered email address to receive a password reset link.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="mt-8">
                        <label className="block mb-2 font-medium">
                            Email
                        </label>

                        <input
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="w-full mt-7 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>

                </form>

                {message && (
                    <p className="text-center text-sm text-green-600 mt-5">
                        {message}
                    </p>
                )}

                <p className="text-center text-gray-600 mt-6">
                    Remember your password?{" "}
                    <Link
                        to="/"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}
