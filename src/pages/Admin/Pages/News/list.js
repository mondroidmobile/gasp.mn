import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

import Button from '../../../../components/main/Button';

import axios from "utils/axios"
import { timeZoneToDateString } from '../../../../utils'

export default function NewsList() {

    /** мэдээнүүдийг хадгалах state */
    const [newsList, setNews] = useState([])

    /** back аас мэдээний жагсаалтыг авах */
    const getNews = async () => {
        const { success, data, error } = await axios.get('/api/news/')
        if (success) {
            /** амжилттай дата авсан үед датаг state -д оноож өгөх нь */
            setNews(data)
        }
        else {
            /** алдаа гарвал alert харуулах */
            toast.error(error)
        }
    }

    /** хуудас руу анх ороход мэдээний жагсаалтыг авах */
    useEffect(() => {
        getNews()
    }, [])

    /** Мэдээ устгах нь */
    const handleDelete = async (id) => {
        const { success, data, info, error } = await axios.delete(`/api/news/${id}/`)
        if (success) {
            /** амжилттай устгасны дараа alert харуулах нь */
            toast.success(info)
            getNews()
        }
        else {
            /** алдаа гарвал alert харуулах */
            toast.error(error)
        }
    }

    return (
        <>
            <h1 className={`page-title`}>NEWS</h1>

            <div className={`page-content`}>
                <div className="table-title">
                    <Link to={"/admin/news/create/"} className="addBtn">Add</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Гарчиг
                            </th>
                            <th>
                                Үүсгэсэн
                            </th>
                            <th>
                                Огноо
                            </th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            newsList.map(
                                (news, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td>
                                                {news.title}
                                            </td>
                                            <td>
                                                {news.author?.nickName || ""}
                                            </td>
                                            <td>
                                                {timeZoneToDateString(news.createdAt)}
                                            </td>
                                            <td>
                                                <Link to={`/admin/news/update/${news._id}/`} className="editBtn">Засах</Link>
                                                <Button className="deleteBtn"
                                                    onClick={() => handleDelete(news._id)}
                                                    title="Устгах"
                                                />
                                            </td>
                                        </tr>
                                    )
                                }
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
