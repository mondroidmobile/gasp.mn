import React from 'react'
import { Routes, Route } from 'react-router-dom'

import AdminNews from './News'
import AdminAuthors from './Author'
import AdminCategory from './Category'
import AdminVideo from './Video'
import AdminPodcast from './Podcast'
import AdminConfig from './Config'

export default function AdminPages()
{
    return (
        <Routes>
            <Route path='/news/*' element={<AdminNews />} />
            <Route path='/author/*' element={<AdminAuthors />} />
            <Route path='/category/*' element={<AdminCategory />} />
            <Route path='/video/*' element={<AdminVideo />} />
            <Route path='/podcast/*' element={<AdminPodcast />} />
            <Route path='/config/*' element={<AdminConfig />} />
        </Routes>
    )
}
