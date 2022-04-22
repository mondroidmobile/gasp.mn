import React from 'react'
import { Routes, Route } from 'react-router-dom'

import VideoList from './list'
import VideoForm from './form'

export default function AdminVideo()
{
    return (
        <Routes>
            <Route path='/' element={<VideoList />} />
            <Route path='/create/' element={<VideoForm />} />
            <Route path='/update/:videoId/' element={<VideoForm />} />
        </Routes>
    )
}
