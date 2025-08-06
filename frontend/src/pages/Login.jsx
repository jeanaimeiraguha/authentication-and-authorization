import { useState } from "react"

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


            
        </form>
        
        </>
    )
}
export default Login