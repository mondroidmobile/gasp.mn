import React from 'react'
import { Routes, Route } from 'react-router-dom'

import PodcastList from './list'
import PodcastForm from './form'

export default function AdminPodcast()
{
    return (
        <Routes>
            <Route path='/' element={<PodcastList />} />
            <Route path='/create/' element={<PodcastForm />} />
            <Route path='/update/:podcastId/' element={<PodcastForm />} />
        </Routes>
    )
}
