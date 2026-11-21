import axios from "axios"
import {useState} from "react"

export default function ProfilePage(){

const [user,setUser]=useState(null)

    async function getProfile(){
        try{
            const token =localStorage.getItem("token")
            const response= await axios.get("http://localhost:5050/user/profile",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log(response.data)
            setUser(response.data)

        }catch(error){
            console.log(error)
        }
    }
    function handleLogout(){
        localStorage.removeItem("token")
    }
    return(
        <div>
            <h3>profile page</h3>
            <button onClick={getProfile}>profile</button>

            {user && (
                <div>
                
            <h2>{user.name}</h2>
            <h4>{user.email}</h4>
            <h4>{user.role}</h4>
                
            
            </div>
            
            )}
            
                
           <button onClick={handleLogout}>log out</button>
           
        </div>
    )
}