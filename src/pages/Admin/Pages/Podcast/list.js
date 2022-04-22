import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

import Button from '../../../../components/main/Button';

import axios from "utils/axios"
import { timeZoneToDateString } from '../../../../utils'

export default function PodcastList() {
    /** podcast хадгалах state */
    const [podcasts, setPodcasts] = useState([])

    /** back аас podcast жагсаалтыг авах */
    const getPodcasts = async () => {
        const { success, data, error } = await axios.get('/api/podcast/')
        if (success) {
            /** амжилттай дата авсан үед датаг state -д оноож өгөх нь */
            setPodcasts(data)
        }
        else {
            /** алдаа гарвал alert харуулах */
            toast.error(error)
        }
    }

    /** хуудас руу анх ороход podcast жагсаалтыг авах */
    useEffect(() => {
        getPodcasts()
    }, [])

    /** Мэдээ устгах нь */
    const handleDelete = async (id) => {
        const { success, data, info, error } = await axios.delete(`/api/podcast/${id}/`)
        if (success) {
            /** амжилттай устгасны дараа alert харуулах нь */
            toast.success(info)
            getPodcasts()
        }
        else {
            /** алдаа гарвал alert харуулах */
            toast.error(error)
        }
    }

    return (
        <>
            <h1 className={`page-title`}>Podcast</h1>
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
                                Category
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
                            podcasts.map(
                                (podcast, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td>
                                                {podcast.title}
                                            </td>
                                            <td>
                                                {podcast.author?.nickName || ""}
                                            </td>
                                            <td>
                                                {podcast.category?.name || ""}
                                            </td>
                                            <td>
                                                {timeZoneToDateString(podcast.createdAt)}
                                            </td>
                                            <td>
                                                <Link to={`/admin/podcast/update/${podcast._id}/`} className="editBtn">Засах</Link>
                                                <Button className="deleteBtn"
                                                    onClick={() => handleDelete(podcast._id)}
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
