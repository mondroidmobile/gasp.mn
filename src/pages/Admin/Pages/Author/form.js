import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from 'utils/axios'

export default function NewsForm()
{
    /** form ийн утгийг хадгалах state */
    const [ formData, setFormData ] = useState({})

    /** update хийж байгаа хуудас байх үед newsId байна */
    const { authorId } = useParams()

    /** хуудас үсрэхэд ашиглах функц */
    const navigate = useNavigate()

    /** author дэлгэрэнгүй авах нь */
    const getAuthor = async (authorId) =>
    {
        const { success, data, error } = await axios.get(`/api/author/${authorId ? authorId + "/" : ""}`)
        if (success)
        {
            setFormData(data)
        }
        else {
            toast.error(error)
        }
    }

    /** анх орж ирэхэд author ыг дуудна */
    useEffect(() =>
    {
        /** хэрвээ id байвал author дэлгэрэнгүй дуудна */
        if (authorId)
        {
            getAuthor(authorId)
        }
    }, [])

    /** өөрчлөлтийг state -д хадгалах */
    const handleChange = (event, key) =>
    {
        const value = event.target.value
        setFormData({ ...formData, [key]: value })
    }

    /** хадгалах үед back руу хүсэлт шидэж хадгалах функц */
    const handleSubmit = async (event) =>
    {
        /** submit дарахад хуудас refresh хийж байгааг болиулсан */
        event.preventDefault()

        const body = formData

        /** update үе нь */
        if (authorId)
        {
            const { success, data, error, info } = await axios.put(`/api/author/${authorId}/`, body)
            if (success)
            {
                toast.success(info)
                navigate('/admin/author/')
            }
            else {
                toast.error(error)
            }
            return
        }
        const { success, data, error, info } = await axios.post('/api/author/', body)
        if (success)
        {
            toast.success(info)
            navigate('/admin/author/')
        }
        else {
            toast.error(error)
        }
    }

    return (
        <>
            <h1 className={`page-title`}>Author үүсгэх</h1>
            <div className={`page-content`}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nickName">NickName:</label>
                        <input
                            type="text"
                            id='nickName'
                            value={formData.nickName}
                            onChange={(e) => handleChange(e, 'nickName')}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">email:</label>
                        <input
                            type="email"
                            id='email'
                            value={formData.email}
                            onChange={(e) => handleChange(e, 'email')}
                        />
                    </div>
                    {
                        !authorId
                        &&
                            <div>
                                <label htmlFor="password">Нууц үг:</label>
                                <input
                                    type="password"
                                    id='password'
                                    value={formData.password}
                                    onChange={(e) => handleChange(e, 'password')}
                                />
                            </div>
                    }
                    <button className='saveBtn' type='submit'>
                        Хадгалах
                    </button>
                </form>
            </div>
        </>
    )
}
