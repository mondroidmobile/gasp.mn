import React from 'react'
import { Routes, Route } from 'react-router-dom'

import NewsList from './list'
import NewsForm from './form'

export default function AdminNews()
{
    return (
        <Routes>
            <Route path='/' element={<NewsList />} />
            <Route path='/create/' element={<NewsForm />} />
            <Route path='/update/:newsId/' element={<NewsForm />} />
        </Routes>
    )
}
