import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Categories from './pages/Categories'
import Statistics from './pages/Statistics'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import { api } from './services/api'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = api.getCurrentUser()
    if (user) {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    api.logout()
    setIsAuthenticated(false)
  }

  if (loading) return null // Yoki loading spinner

  return (
    <Router>
      <div className="app">
        {isAuthenticated ? (
          <Layout onLogout={handleLogout}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/stats" element={<Statistics />} />
              <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
        ) : (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onRegister={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  )
}

export default App
