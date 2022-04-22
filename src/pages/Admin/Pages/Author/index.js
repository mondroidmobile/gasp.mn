import React from 'react'
import { Routes, Route } from 'react-router-dom'

import AuthorList from './list'
import AuthorForm from './form'

export default function AdminAuthors()
{
    return (
        <Routes>
            <Route path='/' element={<AuthorList />} />
            <Route path='/create/' element={<AuthorForm />} />
            <Route path='/update/:authorId/' element={<AuthorForm />} />
        </Routes>
    )
}
