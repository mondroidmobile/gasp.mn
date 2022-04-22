import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from 'utils/axios'

export default function ResetPass() {

    const [ data, setData ] = useState(
        {
            "password": "",
            "password2": ""
        }
    )
    const { token } = useParams()
    const navigate = useNavigate()

    const handleSubmit = async (e) =>
    {
        e.preventDefault()
        const { success, error, info } = await axios.put(`/api/sign/confirmpassword/?token=${token}`, data)
        if (success)
        {
            toast.success(info)
            navigate("/admin/")
        }
        else {
            toast.error(error)
        }
    }

    const handleChange = (event, key) =>
    {
        const value = event.target.value
        setData({ ...data, [key]: value })
    }

    return (
        <section className='loginForm'>
            <div className="box"></div>
            <div className="container resetpassword">
                <div className="form">
                    <h2>Нууц үг сэргээх</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="inputBx password">
                            <input id="password-input" type={"text"} name="password" required="required" onChange={(e) => handleChange(e, 'password')}/>
                            <span>Password</span>
                            <i className="fas fa-key"></i>
                        </div>
                        <div className="inputBx password">
                            <input id="password-input" type={"text"} name="password" required="required" onChange={(e) => handleChange(e, 'password2')}/>
                            <span>Password</span>
                            <i className="fas fa-key"></i>
                        </div>
                        <div className="inputBx">
                            <input type="submit" value="Reset" />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
