import mysql from "mysql"
import express from "express"
import cors from  "cors"
const app=express()
app.use(cors())
app.use(express.json())
const db =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"backend"
})
db.connect((err)=>{
    if(err){
        console.log("Ann error occured while trying to connect to db");
    }
    else{
        console.log("Connection succeed");
    }
})
app.get('/',(req,res)=>{


    res.send("Hello dev")
})
app.listen(3000,()=>{
    console.log(`MY app is running on http://localhost:3000`)
})