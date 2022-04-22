import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Configs from './main'

export default function AdminNews()
{
    return (
        <Routes>
            <Route path='/' element={<Configs />} />
        </Routes>
    )
}
