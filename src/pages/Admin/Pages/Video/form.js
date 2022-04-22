import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from 'utils/axios'

export default function NewsForm()
{
    /** form ийн утгийг хадгалах state */
    const [ formData, setFormData ] = useState({})
    /** author ийн жагсаалтыг хадгалах state */
    const [ authors, setAuthors ] = useState([])
    /** ангилалуудын жагсаалтыг хадгалах state */
    const [ categories, setCategories ] = useState([])
    /** update хийж байгаа хуудас байх үед newsId байна */
    const { videoId } = useParams()

    /** хуудас үсрэхэд ашиглах функц */
    const navigate = useNavigate()

    /** author уудийн жагсаалтыг авах нь */
    const getAuthors = async () =>
    {
        const { success, data, error, info } = await axios.get('/api/author/')
        /** амжилттай дата ирвэл author ийг state -д оноох нь */
        if (success)
        {
            setAuthors(data)
        }
        else {
            /** алдаа гарвал алдааг харуулах нь */
            toast(error)
        }
    }

    /** Ангилалуудыг авах нь */
    const getCategories = async () =>
    {
        const { success, data, error, info } = await axios.get('/api/category/')
        /** амжилттай дата ирвэл ангилалийг state -д оноох нь */
        if (success)
        {
            setCategories(data)
        }
        else {
            /** алдаа гарвал алдааг харуулах нь */
            toast.error(error)
        }
    }

    /** video дэлгэрэнгүй авах нь */
    const getVideo = async (videoId) =>
    {
        const { success, data, error } = await axios.get(`/api/video/${videoId ? videoId + "/" : ""}`)
        if (success)
        {
            data.author = data.author?._id || ""
            data.category = data?.category?._id
            setFormData(data)
        }
        else {
            toast.error(error)
        }
    }

    /** анх орж ирэхэд video ыг дуудна */
    useEffect(() =>
    {
        getAuthors()
        getCategories()
        /** хэрвээ id байвал video дэлгэрэнгүй дуудна */
        if (videoId)
        {
            getVideo(videoId)
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
        if (videoId)
        {
            const { success, data, error, info } = await axios.put(`/api/video/${videoId}/`, body)
            if (success)
            {
                toast.success(info)
                navigate('/admin/video/')
            }
            else {
                toast.error(error)
            }
            return
        }
        const { success, data, error, info } = await axios.post('/api/video/', body)
        if (success)
        {
            toast.success(info)
            navigate('/admin/video/')
        }
        else {
            toast.error(error)
        }
    }

    return (
        <>
            <h1 className={`page-title`}>Video үүсгэх</h1>
            <div className={`page-content`}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="url">Тухайн бичлэгний холбоос:</label>
                        <input
                            type="text"
                            id='url'
                            value={formData.url}
                            onChange={(e) => handleChange(e, 'url')}
                        />
                    </div>
                    <div>
                        <label htmlFor="title">Тухайн бичлэгний гарчиг:</label>
                        <input
                            type="text"
                            id='title'
                            value={formData.title}
                            onChange={(e) => handleChange(e, 'title')}
                        />
                    </div>
                    <div>
                        <label htmlFor="author">Author:</label>
                        <select
                            id="author"
                            value={formData.author}
                            onChange={(e) => handleChange(e, 'author')}
                        >
                            <option value="">Сонго</option>
                            {
                                authors.map(
                                    (author, idx) =>
                                    {
                                        return (
                                            <option key={idx} value={author._id}>
                                                {author.nickName}
                                            </option>
                                        )
                                    }
                                )
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="views">Бичлгэндээр дарж орсон хүний тоо :</label>
                        <input
                            type="number"
                            id='views'
                            value={formData.views}
                            onChange={(e) => handleChange(e, 'views')}
                        />
                    </div>
                    <div>
                        <label htmlFor="category">Ангилал:</label>
                        <select
                            id="category"
                            value={formData.category}
                            onChange={(e) => handleChange(e, 'category')}
                        >
                            <option value="">Сонго</option>
                            {
                                categories.map(
                                    (category, idx) =>
                                    {
                                        return (
                                            <option key={idx} value={category._id}>
                                                {category.name}
                                            </option>
                                        )
                                    }
                                )
                            }
                        </select>
                    </div>
                    <button className='main' type='submit'>
                        Хадгалах
                    </button>
                </form>
            </div>
        </>
    )
}
