import React from 'react'
import { Routes, Route } from 'react-router-dom'

import MainNewsList from './main'
import NewsAbout from './NewsAbout'

export default function News()
{
    return (
        <Routes>
            <Route path='/' element={<MainNewsList />}/>
            <Route path='/:newsId/' element={<NewsAbout />}/>
        </Routes>
    )
}
