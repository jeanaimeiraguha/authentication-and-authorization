import mysql from "mysql"
import express from "express"
import cors from  "cors"
// import express-session from "express"
import session from "express-session"
const app=express()
app.use(cors())
app.use(express.json())
// Setup form data reading
app.use(express.urlencoded({extended:true}))

// Setup Session

app.use(session({
    secret:"iraguha",
    resave:false ,
    saveUninitialized:false

}))


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
//route for login

app.post('/login',(req,res)=>{
    const {username,password}=req.body;
    const sql ="SELECT * FROM users where username=? AND password=?";
    db.query(sql,[username,password],(err,results)=>{

        if(err) return res.status(404).json("LOgin Failed");

    })
})



app.listen(3000,()=>{
    console.log(`MY app is running on http://localhost:3000`)
})