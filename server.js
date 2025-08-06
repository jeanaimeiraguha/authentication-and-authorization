import mysql from "mysql";
import express from "express";
import cors from "cors";
import session from "express-session";

const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Setup session middleware
app.use(session({
  secret: "iraguha",        // Used to sign the session ID cookie
  resave: false,
  saveUninitialized: false
}));

// Connect to MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "backend"
});

db.connect((err) => {
  if (err) {
    console.log(" An error occurred while connecting to the DB");
    console.log(err);
  } else {
    console.log(" DB connection successful");
  }
});

// Home route
app.get("/", (req, res) => {
  res.send("Hello dev");
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Login Failed", error: err });
    }

    if (results.length > 0) {
      req.session.user = results[0];
      return res.send(" You are now logged in");
    } else {
      return res.send(" Wrong credentials");
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log(" App is running at http://localhost:3000");
});
