import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Editor } from '@tinymce/tinymce-react';

import axios from 'utils/axios'

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

    /** Мэдээний үндсэн мэдээллийг ref хийж хариуг нь авах нь */
    const editorRef = useRef(null);

    /** update хийж байгаа хуудас байх үед newsId байна */
    const { newsId } = useParams()

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

    /** мэдээний дэлгэрэнгүй авах нь */
    const getNews = async (newsId) =>
    {
        const { success, data, error } = await axios.get(`/api/news/${newsId}/`)
        if (success)
        {
            data.author = data.author?._id || ""
            setFormData(data)
        }
        else {
            toast.error(error)
        }
    }

    /** анх орж ирэхэд author ыг дуудна */
    useEffect(() =>
    {
        getAuthors()
        getCategories()
        /** хэрвээ id байвал мэдээний дэлгэрэнгүй дуудна */
        if (newsId)
        {
            getNews(newsId)
        }
    }, [])

    /** өөрчлөлтийг state -д хадгалах */
    const handleChange = (event, key) =>
    {
        const value = event.target.value
        setFormData({ ...formData, [key]: value })
    }

    /** Зураг оруулахад ажиллах функц */
    const uploadImageCallBack = async (blobInfo, success, failure, progress) =>
    {
        // Сонгогдсон зургийг авах
        const file = blobInfo.blob()

        const formData = new FormData()
        formData.append('image', file)

        const config =
        {
            headers: { 'content-type': 'multipart/form-data' }
        }
        const { success: rSuccess, data, error, info } = await axios.post(`/api/config/image/`, formData, config).catch(err => err)
        rSuccess
        ?
            success(process.env.REACT_APP_SERVER_URL + data)
        :
            failure()
    }

    /** хадгалах үед back руу хүсэлт шидэж хадгалах функц */
    const handleSubmit = async (event) =>
    {
        /** submit дарахад хуудас refresh хийж байгааг болиулсан */
        event.preventDefault()

        /** үндсэн мэдээний дэлгэрэнгүй мэдээллийг html ээр авсан нь */
        const news = editorRef.current.getContent()

        const reqFormData = new FormData()
        reqFormData.append('title', formData.title)
        reqFormData.append('text', formData.text)
        reqFormData.append('author', formData.author)
        reqFormData.append('category', formData.category)
        reqFormData.append('news', news)

        if (image)
        {
            Array.from(image.target.files).map((file, idx) => reqFormData.append('image', file))
        }

        const config =
        {
            headers: { 'content-type': 'multipart/form-data' }
        }

        /** update үе нь */
        if (newsId)
        {
            const { success, data, error, info } = await axios.put(`/api/news/${newsId}/`, reqFormData, config)
            if (success)
            {
                toast.success(info)
                navigate('/admin/news/')
            }
            else {
                toast.error(error)
            }
            return
        }
        const { success, data, error, info } = await axios.post('/api/news/', reqFormData, config)
        if (success)
        {
            toast.success(info)
            navigate('/admin/news/')
        }
        else {
            toast.error(error)
        }
    }

    return (
        <>
            <h1 className={`page-title`}>Мэдээ үүсгэх</h1>
            <div className={`page-content`}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Гарчиг:</label>
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
                        <label htmlFor="text">Тайлбар:</label>
                        <textarea
                            id="text"
                            value={formData.text}
                            onChange={(e) => handleChange(e, 'text')}
                        >
                        </textarea>
                    </div>
                    <div>
                        <label htmlFor="image">Зураг:</label>
                        <input
                            id="image"
                            type={"file"}
                            onChange={setImage}
                            multiple={false}
                        >
                        </input>
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
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue="<p>This is the initial content of the editor.</p>"
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: 'image | preview',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            plugins: "casechange advcode advlist lists spellchecker formatpainter autoresize visualblocks tinydrive image link media imagetools wordcount code",
                            toolbar: [
                                "bold italic underline | forecolor | formatselect | alignleft aligncenter alignright | bullist numlist",
                                "cut copy paste formatpainter removeformat | casechange visualblocks | spellchecker | link image media | code"
                            ],
                            images_upload_handler: uploadImageCallBack,
                            image_title: true,
                            image_advtab: true,
                            importcss_append: true,
                        }}
                    />
                    <button className='main' type='submit'>
                        Хадгалах
                    </button>
                </form>
            </div>
        </>
    )
}
