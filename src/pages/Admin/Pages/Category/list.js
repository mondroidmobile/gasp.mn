import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

import Button from '../../../../components/main/Button';

import axios from "utils/axios"
import { timeZoneToDateString } from '../../../../utils'

export default function CategoryList() {

    /** category ийг хадгалах state */
    const [categories, setCategories] = useState([])

    /** back аас category жагсаалтыг авах */
    const getCategory = async () => {
        const { success, data, error } = await axios.get('/api/category/')
        if (success) {
            /** амжилттай дата авсан үед датаг state -д оноож өгөх нь */
            setCategories(data)
        }
        else {
            /** алдаа гарвал alert харуулах */
            toast.error(error)
        }
    }

    /** хуудас руу анх ороход category жагсаалтыг авах */
    useEffect(() => {
        getCategory()
    }, [])

    /** category устгах нь */
    const handleDelete = async (id) => {
        const { success, data, info, error } = await axios.delete(`/api/category/${id}/`)
        if (success) {
            /** амжилттай устгасны дараа alert харуулах нь */
            toast.success(info)
            getCategory()
        }
        else {
            /** алдаа гарвал alert харуулах */
            toast.error(error)
        }
    }

    return (
        <>
            <h1 className={`page-title`}>Category</h1>
            <div className={`page-content`}>
                <div className="table-title">
                    <Link to={"/admin/news/create/"} className="addBtn">Add</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Нэр
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
                            categories.map(
                                (category, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <td>
                                                {category.name}
                                            </td>
                                            <td>
                                                {timeZoneToDateString(category.createdAt)}
                                            </td>
                                            <td>
                                                <Link to={`/admin/category/update/${category._id}/`} className="editBtn">Засах</Link>
                                                <Button className="deleteBtn"
                                                    /* style={{
                                                         color: "red"
                                                     }}*/
                                                    onClick={() => handleDelete(category._id)}
                                                    title="Устгах"
                                                />
                                            </td>
                                            <div className="hr-line-dashed"></div>
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
