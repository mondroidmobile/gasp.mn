import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

import Button from '../../../../components/main/Button';

import axios from "utils/axios"
import { timeZoneToDateString } from '../../../../utils'

export default function VideoList() {

    /** video хадгалах state */
    const [videos, setVideos] = useState([])

    /** back аас video жагсаалтыг авах */
    const getVideos = async () => {
        const { success, data, error } = await axios.get('/api/video/')
        if (success) {
            /** амжилттай дата авсан үед датаг state -д оноож өгөх нь */
            setVideos(data)
        }
        else {
            /** алдаа гарвал alert харуулах */
            toast.error(error)
        }
    }

    /** хуудас руу анх ороход мэдээний жагсаалтыг авах */
    useEffect(() => {
        getVideos()
    }, [])

    /** video устгах нь */
    const handleDelete = async (id) => {
        const { success, data, info, error } = await axios.delete(`/api/video/${id}/`)
        if (success) {
            /** амжилттай устгасны дараа alert харуулах нь */
            toast.success(info)
            getVideos()
        }
        else {
            /** алдаа гарвал alert харуулах */
            toast.error(error)
        }
    }

    return (
        <>
            <h1 className={`page-title`}>VIDEO</h1>
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
                            videos.map(
                                (video, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td>
                                                {video.title}
                                            </td>
                                            <td>
                                                {video.author?.nickName}
                                            </td>
                                            <td>
                                                {video.category?.name || ""}
                                            </td>
                                            <td>
                                                {timeZoneToDateString(video.createdAt)}
                                            </td>
                                            <td>
                                                <Link to={`/admin/video/update/${video._id}/`} className="editBtn">Засах</Link>
                                                <Button className="deleteBtn"
                                                    onClick={() => handleDelete(video._id)}
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
