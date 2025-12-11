
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './LoginForm/Login'
import Register from './LoginForm/Register'

const App = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div>
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
      {isLogin ? (
        <Login onSwitchToRegister={() => setIsLogin(false)} />
      ) : (
        <Register onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  )
}

export default App