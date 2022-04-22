import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import HeaderMenu from '../../components/special/HeaderMenu'
import Card from '../../components/main/newsCard'
import Footer from '../Home/Footer'

import MoreBtn from '../../components/special/MoreBtn'

import axios from 'utils/axios'
import { timeZoneToDateString } from 'utils/index'

export default function News() {

  /** news ийн мэдээллийг хадгалах state */
  const [ news, setNews ] = useState([])
  const [ start, setStart ] = useState(0)
  const location = useLocation()

  /** news ийн мэдээллийг back аас дуудах нь */
  const getData = async (newStart) =>
  {
    /** url ээс дарагдсан category байгаа эсэхийг анх орохдоо шалгах нь */
    const paramCatName = new URLSearchParams(location.search).get("category")
    await axios.get(`/api/news/${paramCatName ? `?category=${paramCatName}&start=${newStart}` : `?start=${newStart}`}`)
      .then(({ success, data, error }) =>
        {
          if (success)
          {
            setNews([ ...news, ...data ])
          }
        }
      )
      .catch(err =>
        {

        }
      )
  }

  useEffect(
    () =>
    {
      //  news ийн мэдээллийг back аас дуудах нь
      getData(start)
    },
    []
  )

  const handleMore = () =>
  {
    const newStart = news.length
    getData(newStart)
    setStart(newStart)
  }

  /** Ямар category дарагдсан түүнийг авах функц */
  const handleCategory = async (catName) =>
  {
    setStart(0)
    const { success, data, error } = await axios.get(`/api/news/?category=${catName}&start=0`)
    if (success)
    {
      setNews(data)
    }
  }

  return (
    <div>
      <HeaderMenu handleCategory={handleCategory} />
      <div className="news-menu">
        <div className="content-wrapper">
          {
            news.length > 0
            ?
              news.map(
                (element, index) => {
                  return (
                    <Card
                      key={index}
                      id={element._id}
                      image={element.image}
                      title={element.title}
                      text={element.text}
                      createdAt={timeZoneToDateString(element.createdAt)}
                    />
                  )
                }
              )
            :
              "Хоосон байна"
          }
        </div>
      </div>
      {
        news.length > 0
        ?
          <MoreBtn onClick={handleMore}/>
        :
          null
      }
      <Footer />
    </div>
  )
}
