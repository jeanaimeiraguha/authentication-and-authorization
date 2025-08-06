import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
  const navigate = useNavigate()

  React.useEffect(() => {
    let timer

    const logout = () => {
      axios.post('http://localhost:3000/logout', {}, { withCredentials: true })
        .then(() => {
          alert('Logged out due to inactivity')
          navigate('/login')
        })
        .catch(() => {
          navigate('/login')
        })
    }

    const resetTimer = () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(logout, 5 * 60 * 1000) // 5 minutes
    }

    // Events to listen to for activity
    const events = ['mousemove', 'keydown', 'click', 'scroll']

    events.forEach(event => window.addEventListener(event, resetTimer))

    resetTimer() // start timer on mount

    // Cleanup listeners on unmount
    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer))
      if (timer) clearTimeout(timer)
    }
  }, [navigate])

  return (
    <div>
      <h2>Welcome to Dashboard</h2>
      <nav>
        <Link to="/">Home</Link> &nbsp;|&nbsp;
        <Link to="/logout">Logout</Link>
      </nav>
    </div>
  )
}

export default Dashboard
