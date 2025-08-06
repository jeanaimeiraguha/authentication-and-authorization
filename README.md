# 🛡️ Simple Authentication System with React & Node.js

This project demonstrates a basic authentication system built using:

- **Frontend:** React.js (with Hooks)
- **Backend:** Node.js + Express
- **Database:** MySQL (via `mysql2`)
- **Session Management:** express-session

The system allows a user to **register** with a username and password, then **log in** using those credentials. Session is used to track logged-in users securely.

---


## 🚀 Functional Overview

### 📝 Register
- The user fills in a `username` and `password`.
- Passwords are securely hashed with `bcrypt` before being stored in MySQL.
- Backend checks if username already exists before inserting.
- On success, a success message is sent back to the frontend.

### 🔐 Login
- The user provides the registered `username` and `password`.
- Backend compares the provided password with the hashed password in the database.
- If successful, a session is created and the user is logged in.
- If login fails, a message is returned indicating invalid credentials.

### 🔄 Session Management
- `express-session` is used to manage login sessions.
- After login, a session cookie is stored in the browser.
- The backend uses this to keep track of logged-in users.

---

## 🛠️ Installation and Setup

### Backend
```bash
cd backend
npm install
node index.js

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

cd frontend
npm install
npm start
