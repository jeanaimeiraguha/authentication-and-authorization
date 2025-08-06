import { useState } from "react"
import axios from 'axios'

const Login=()=>{
    const  [username , setUsername]=useState("");
    const[password, setPassword]=useState("");
    const handleSubmit=(e)=>{
e.preventDefault();

axios.post('http://localhost:3000/login',{username,password})
.then((res)=>{
    // console.log("")
    alert("Logged in sucessfully");
})
.catch((err)=>{
    alert("Invalid credentials")

})
    }
    
    return(
        <>
        
        <form  onSubmit={handleSubmit}>
 User Name:<input type="text" onChange={(e)=>setUsername(e.target.value)} /> <br /> <br />
Password :<input type="text" onChange={(e)=>setPassword(e.target.value)} /> <br /> <br />
<button type="submit">Login</button>

        </form>
        
        </>
    )
}
export default Login