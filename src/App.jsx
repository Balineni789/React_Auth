
import React, { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './LoginForm/Login'
import Register from './LoginForm/Register'
import Home from './LoginForm/Home'

const App = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route 
          path="/" 
          element={
            isLogin ? (
              <Login onSwitchToRegister={() => setIsLogin(false)} />
            ) : (
              <Register onSwitchToLogin={() => setIsLogin(true)} />
            )
          } 
        />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
