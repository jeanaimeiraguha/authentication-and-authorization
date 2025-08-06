import express from "express";
import session from "express-session";
import cors from "cors";
import mysql from "mysql";

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: "Iii",
    resave: false,
    saveUninitialized: false,
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "backend",
});

db.connect((err) => {
  if (err) {
    console.log("Failed");
  } else {
    console.log("Connection succeed");
  }
});

app.get("/", (req, res) => {
  res.send("Welcome"); 
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Login Failed", error: err });
    }

    if (results.length > 0) {
      req.session.user = results[0]; 
      return res.send("You logged in"); 
    } else {
      return res.send("Wrong credentials");
    }
  });
});
//Middleware to ensure login got done sucessfully
const isLoggedIn=(req,res,next)=>{
if(req.session.user){
    next();
}
else{
    res.send("please first  Login to continue plz")
}
}
//Only admin Login Page
app.get('/admin',isLoggedIn,(req,res)=>{
    if(req.session.user.username=="Iraguha"){
        res.send("Welcome Admin")
    }
    else{
        res.send("Only admin can acess this page")
    }
})
//logout page demo
app.post('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.send('Logged Out successfully')
    })
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
