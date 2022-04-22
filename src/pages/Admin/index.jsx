import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { useAuth } from 'context/authContext'

import MainAdminPage from './MainAdminPage'
import LoginForm from 'pages/LoginForm'
import ResetPass from 'pages/LoginForm/resetPass'
import ConfirmPass from 'pages/LoginForm/confirmPass'

export default function Admin()
{
  const { userDetail } = useAuth()
  const isAuth = Object.keys(userDetail).length > 0

  return (
    <Routes>
        <Route path='/*' element={isAuth ? <MainAdminPage /> : <LoginForm />} />
        {
          !isAuth
          &&
            <>
              <Route path='/resetpassword/' element={<ResetPass />} />
              <Route path='/resetpassword/:token/' element={<ConfirmPass />} />
            </>
        }
    </Routes>
  )
}
