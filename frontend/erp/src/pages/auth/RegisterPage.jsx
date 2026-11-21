import {useState} from "react"
import axios from "axios"
import {Link} from "react-router-dom"



export default function RegisterPage(){

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [name,setName]=useState("")

     async function handleRegister(){
            try{
                const response= await axios.post("http://localhost:5050/user/register",{
                    name:name,
                    email:email,
                    password:password
                })
                console.log(response)

            }catch(error){
                console.log(error)
            }
    }

    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">

                <h1 className="text-3xl font-bold text-center">Create Account</h1>
                <p className="text-gray-600 text-center mt-2">Create your Live Life account</p>

                <div className="mt-8">

                <label className="block mb-2 font-medium">Name</label>
                    <input className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text" placeholder="enter name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="mt-8">
                     <label className="block mb-2 font-medium">Email</label>
                    <input  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     type="text" placeholder="enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                
                <div className="mt-8">
                    <label className="block mb-2 font-medium">Password</label>
                    <input className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text" placeholder="enter password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                
                <button  className="w-full mt-7 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700" 
                 onClick={handleRegister}>submit</button>

                  <p className="text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">Login</Link>
                </p>

            

            </div>
            
            
        </div>
    )
}