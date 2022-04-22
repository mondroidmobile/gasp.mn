import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import { useConfig } from 'context/configContext'

import Loader from 'components/main/Loader'

import Home from './Home'
import News from './News/'
import Video from './Video'
import Podcast from './Podcast'
import Admin from './Admin'
import { useAuth } from 'context/authContext'

export default function Page() {

  const [ isLoading, setLoading ] = useState(true)
  const { getConfigs } = useConfig()
  const { getDetail } = useAuth()

  /** Сайтад хэрэгтэй утгуудыг веб уншихаас өмнө татаж авах */
  const getDatas = async () =>
  {
    /** Тохиргооны мэдээллийг дуудна */
    await getConfigs()
    await getDetail()
    setLoading(false)
  }

  useEffect(
    () =>
    {
      getDatas()
    },
    []
  )

  if (isLoading)
  {
    return <Loader />
  }

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/news/*' element={<News />} />
      <Route path='/video/' element={<Video />} />
      <Route path='/podcast/' element={<Podcast />} />
      <Route path='/admin/*' element={<Admin />} />
    </Routes>
  )
}
