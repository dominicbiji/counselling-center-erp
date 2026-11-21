import {useState} from "react"
import axios from "axios"
import {Link,useNavigate} from "react-router-dom"

export default function LoginPage(){

    const navigate=useNavigate()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    async function handleLogin(){
       try{
        const response= await axios.post("http://localhost:5050/user/login",{
            email:email,
            password:password
        })
        alert("Login successful!")
        console.log(response)

        if(response.data.success){
            localStorage.setItem("token",response.data.authtoken)
            const token=localStorage.getItem("token")
            const tk= await axios.get("http://localhost:5050/user/profile",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            
            console.log(tk.data.role)
            const role=tk.data.role
            if(role==="admin"){
                navigate("/admin")
            }
            else if(role==="counsellor"){
                navigate("/counsellorDb")
            }
            else if(role==="client"){
                navigate("/client/dashboard")
            }
            else if(role==="receptionist"){
                navigate("/receptionistDb")
            }
        }

       }catch(error){
            console.log(error)
            console.log("error")
       }
    }
    
    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

                <h1 className="text-3xl font-bold text-center">login page</h1>
                <p className="text-gray-600 text-center mt-2">Login to your Live Life account </p>

                <div className="mt-8">
                    <label className="block mb-2 font-medium">Email </label>
                    <input className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                     type="text" placeholder="enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>

                <div className="mt-8">
                    <label className="block mb-2 font-medium">Password</label>
                    <input className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     type="password" placeholder="enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>

                <div className="text-right mt-3">
                    <Link
                        to="/forgot-password"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Forgot Password?
                    </Link>
                </div>
                
                <div>
                    <button className="w-full mt-7 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                     onClick={handleLogin}>login</button>
                      <p className="text-center text-gray-600 mt-6">Don't have an account?{" "}
                        <Link to="/register"className="text-blue-600 hover:text-blue-700 font-medium">Register</Link>
                      </p>
                      
                </div>
                
            </div>
            
        </div>
    )
}