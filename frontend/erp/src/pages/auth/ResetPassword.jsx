import { useState } from "react"
import axios from "axios"
import { Link, useParams, useNavigate } from "react-router-dom"

export default function ResetPassword() {

    const { token } = useParams()
    const navigate = useNavigate()

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return
        }

        try {
            setLoading(true)
            setMessage("")

            const response = await axios.post(
                "http://localhost:5050/user/reset-password",
                {
                    token: token,
                    password: password
                }
            )

            setMessage(response.data.message)

            alert("Password reset successful!")

            navigate("/login")

        } catch (error) {
            console.log("Reset password error:", error)
            setMessage(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

                <h1 className="text-3xl font-bold text-center">
                    Reset Password
                </h1>

                <p className="text-gray-600 text-center mt-3">
                    Enter your new password below.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="mt-8">
                        <label className="block mb-2 font-medium">
                            New Password
                        </label>

                        <input
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mt-6">
                        <label className="block mb-2 font-medium">
                            Confirm Password
                        </label>

                        <input
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="w-full mt-7 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>

                </form>

                {message && (
                    <p className="text-center text-sm text-red-600 mt-5">
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
