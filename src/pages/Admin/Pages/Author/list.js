import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

import Button from '../../../../components/main/Button';

import axios from "utils/axios"
import { timeZoneToDateString } from '../../../../utils'

export default function NewsList() {

    /** author ийг хадгалах state */
    const [authors, setAuthor] = useState([])

    /** back аас author жагсаалтыг авах */
    const getAuthor = async () => {
        const { success, data, error } = await axios.get('/api/author/')
        if (success) {
            /** амжилттай дата авсан үед датаг state -д оноож өгөх нь */
            setAuthor(data)
        }
        else {
            /** алдаа гарвал alert харуулах */
            toast.error(error)
        }
    }

    /** хуудас руу анх ороход author жагсаалтыг авах */
    useEffect(() => {
        getAuthor()
    }, [])

    /** Author устгах нь */
    const handleDelete = async (id) => {
        const { success, data, info, error } = await axios.delete(`/api/author/${id}/`)
        if (success) {
            /** амжилттай устгасны дараа alert харуулах нь */
            toast.success(info)
            getAuthor()
        }
        else {
            /** алдаа гарвал alert харуулах */
            toast.error(error)
        }
    }

    return (
        <>
            <h1 className={`page-title`}>Author</h1>
            <div className={`page-content`}>
                <div className="table-title">
                    <Link to={"/admin/author/create/"} className="addBtn">Add</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                NickName
                            </th>
                            <th>
                                email
                            </th>
                            <th>
                                бүртгүүлсэн огноо
                            </th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            authors.map(
                                (author, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td>
                                                {author.nickName}
                                            </td>
                                            <td>
                                                {author.email}
                                            </td>
                                            <td>
                                                {timeZoneToDateString(author.createdAt)}
                                            </td>
                                            <td>
                                                <Link to={`/admin/author/update/${author._id}/`} className="editBtn">Засах</Link>
                                                <Button className="deleteBtn"
                                                    /* style={{
                                                         color: "red"
                                                     }}*/
                                                    onClick={() => handleDelete(author._id)}
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
