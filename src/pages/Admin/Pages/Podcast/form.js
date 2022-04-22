import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from 'utils/axios'
import { getImageFormUrl } from 'utils'

export default function NewsForm()
{
    /** form ийн утгийг хадгалах state */
    const [ formData, setFormData ] = useState({})
    /** author ийн жагсаалтыг хадгалах state */
    const [ authors, setAuthors ] = useState([])
    /** ангилалуудын жагсаалтыг хадгалах state */
    const [ categories, setCategories ] = useState([])
    /** оруулсан зургийг хадгалах state */
    const [ image, setImage ] = useState(null)
    /** update хийж байгаа хуудас байх үед newsId байна */
    const { podcastId } = useParams()

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

    /** podcast дэлгэрэнгүй авах нь */
    const getPodcast = async (podcastId) =>
    {
        const { success, data, error } = await axios.get(`/api/podcast/${podcastId ? podcastId + "/" : ""}`)
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

    /** анх орж ирэхэд podcast ыг дуудна */
    useEffect(() =>
    {
        getAuthors()
        getCategories()
        /** хэрвээ id байвал podcast дэлгэрэнгүй дуудна */
        if (podcastId)
        {
            getPodcast(podcastId)
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

        const reqFormData = new FormData()
        reqFormData.append('title', formData.title)
        reqFormData.append('clock', formData.clock)
        reqFormData.append('text', formData.text)
        reqFormData.append('category', formData.category)
        reqFormData.append('author', formData.author)
        reqFormData.append('url', formData.url)

        if (image)
        {
            Array.from(image.target.files).map((file, idx) => reqFormData.append('image', file))
        }

        const config =
        {
            headers: { 'content-type': 'multipart/form-data' }
        }

        /** update үе нь */
        if (podcastId)
        {
            const { success, data, error, info } = await axios.put(`/api/podcast/${podcastId}/`, reqFormData, config)
            if (success)
            {
                toast.success(info)
                navigate('/admin/podcast/')
            }
            else {
                toast.error(error)
            }
            return
        }
        const { success, data, error, info } = await axios.post('/api/podcast/', reqFormData, config)
        if (success)
        {
            toast.success(info)
            navigate('/admin/podcast/')
        }
        else {
            toast.error(error)
        }
    }

    return (
        <>
            <h1 className={`page-title`}>Podcast үүсгэх</h1>
            <div className={`page-content`}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Тухайн podcast гарчиг :</label>
                        <input
                            type="text"
                            id='title'
                            value={formData.title}
                            onChange={(e) => handleChange(e, 'title')}
                        />
                    </div>
                    <div>
                        <label htmlFor="clock">Podcast ийн бичлэгний урт ms ээр :</label>
                        <input
                            type="number"
                            id='clock'
                            value={formData.clock}
                            onChange={(e) => handleChange(e, 'clock')}
                        />
                    </div>
                    <div>
                        <label htmlFor="text">Podcast ийн товч тайлбар:</label>
                        <textarea
                            id="text"
                            value={formData.text}
                            onChange={(e) => handleChange(e, 'text')}
                        >
                        </textarea>
                    </div>
                    <div>
                        <label htmlFor="url">Podcast ийн холбоос:</label>
                        <input
                            type={"text"}
                            id="text"
                            value={formData.url}
                            onChange={(e) => handleChange(e, 'url')}
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
                    <div>
                        <label htmlFor="image">Podcast ний thubmnail зураг:</label>
                        <input
                            id="image"
                            type={"file"}
                            onChange={setImage}
                            multiple={false}
                        >
                        </input>
                    </div>
                    <button className='main' type='submit'>
                        Хадгалах
                    </button>
                </form>
            </div>
        </>
    )
}
