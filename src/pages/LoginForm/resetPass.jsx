import React, { useState } from 'react'
import { toast } from 'react-toastify'

import axios from 'utils/axios'

export default function ResetPass() {

    const [ data, setData ] = useState("")

    const handleSubmit = async (e) =>
    {
        e.preventDefault()
        const { success, error, info } = await axios.post("/api/sign/resetpassword/", { email: data })
        if (success)
        {
            toast.success(info)
        }
        else {
            toast.error(error)
        }
    }

    return (
        <section className='loginForm'>
            <div className="box"></div>
            <div className="container resetpassword">
                <div className="form">
                    <h2>Нууц үг сэргээх</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="inputBx">
                            <input type={"text"} onChange={(e) => setData(e.target.value)}/>
                            <span>Email</span>
                            <i className="fas fa-envelope"></i>
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
