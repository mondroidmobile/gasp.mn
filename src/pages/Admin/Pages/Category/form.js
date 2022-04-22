import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from 'utils/axios'

export default function NewsForm()
{
    /** form ийн утгийг хадгалах state */
    const [ formData, setFormData ] = useState({})

    /** update хийж байгаа хуудас байх үед newsId байна */
    const { categoryId } = useParams()

    /** хуудас үсрэхэд ашиглах функц */
    const navigate = useNavigate()

    /** category дэлгэрэнгүй авах нь */
    const getCategories = async (categoryId) =>
    {
        const { success, data, error } = await axios.get(`/api/category/${categoryId ? categoryId + "/" : ""}`)
        if (success)
        {
            setFormData(data)
        }
        else {
            toast.error(error)
        }
    }

    /** анх орж ирэхэд category ыг дуудна */
    useEffect(() =>
    {
        /** хэрвээ id байвал category дэлгэрэнгүй дуудна */
        if (categoryId)
        {
            getCategories(categoryId)
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
        if (categoryId)
        {
            const { success, data, error, info } = await axios.put(`/api/category/${categoryId}/`, body)
            if (success)
            {
                toast.success(info)
                navigate('/admin/category/')
            }
            else {
                toast.error(error)
            }
            return
        }
        const { success, data, error, info } = await axios.post('/api/category/', body)
        if (success)
        {
            toast.success(info)
            navigate('/admin/category/')
        }
        else {
            toast.error(error)
        }
    }

    return (
        <>
            <h1 className={`page-title`}>category үүсгэх</h1>
            <div className={`page-content`}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Нэр:</label>
                        <input
                            type="text"
                            id='name'
                            value={formData.name}
                            onChange={(e) => handleChange(e, 'name')}
                        />
                    </div>
                    <button className='main' type='submit'>
                        Хадгалах
                    </button>
                </form>
            </div>
        </>
    )
}
