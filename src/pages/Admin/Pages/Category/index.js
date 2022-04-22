import React from 'react'
import { Routes, Route } from 'react-router-dom'

import CategoryList from './list'
import CategoryForm from './form'

export default function AdminCategory()
{
    return (
        <Routes>
            <Route path='/' element={<CategoryList />} />
            <Route path='/create/' element={<CategoryForm />} />
            <Route path='/update/:categoryId/' element={<CategoryForm />} />
        </Routes>
    )
}
