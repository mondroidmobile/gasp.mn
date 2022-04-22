import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAuth } from 'context/authContext'

import axios from 'utils/axios'

export default function LoginForm(props)
{
    const [ data, setDatas ] = useState(
        {
            email: "",
            password: "",
        }
    )
    const [ showPass, setShowPass ] = useState(false)

    const { loggedUser } = useAuth()

    const showPassword = () =>
    {
        setShowPass(!showPass)
    }

    const handleChange = (event, key) =>
    {
        const value = event.target.value
        setDatas({ ...data, [key]: value })
    }

    const handleSubmit = async (event) =>
    {
        event.preventDefault()

        const { success, data: userData, error, info } = await axios.post("/api/sign/in/", data).catch(err => err)
        if (success)
        {
            toast.success(info)
            loggedUser(userData)
        }
        else {
            toast.error(error)
        }
    }

    return (
        <section className='loginForm'>

            <div className="box">

                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>

                <div className="container">
                    <div className="form">
                        <h2>LOGIN</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBx">
                                <input type="text" required="required" onChange={(e) => handleChange(e, 'email')} />
                                <span>Login</span>
                                <i className="fas fa-user-circle"></i>
                            </div>
                            <div className="inputBx password">
                                <input id="password-input" type={showPass ? "text" : "password"} name="password" required="required" onChange={(e) => handleChange(e, 'password')}/>
                                <span>Password</span>
                                <a className="password-control" onClick={showPassword}></a>
                                <i className="fas fa-key"></i>
                            </div>
                            <div className="inputBx">
                                <input type="submit" value="Log in" />
                            </div>
                        </form>
                        <p>Forgot password? <Link to="/admin/resetpassword/">Click Here</Link></p>
                    </div>
                </div>

            </div>
        </section>


    )
}
