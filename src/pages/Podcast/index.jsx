import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Footer from '../Home/Footer'
import HeaderMenu from '../../components/special/HeaderMenu'
import Card from '../../components/main/podcastCard'
import MoreBtn from '../../components/special/MoreBtn'

import axios from 'utils/axios'
import { timeZoneToDateString, msToTime } from 'utils/index'

export default function PodcastCard() {

  /** podcast ийн мэдээллийг хадгалах state */
  const [ podcastCard, setPodcast ] = useState([])
  const [ start, setStart ] = useState(0)
  const location = useLocation()

  /** podcast ийн мэдээллийг back аас дуудах нь */
  const getData = async (newStart) =>
  {
    /** url ээс дарагдсан category байгаа эсэхийг анх орохдоо шалгах нь */
    const paramCatName = new URLSearchParams(location.search).get("category")
    await axios.get(`/api/podcast/?${paramCatName ? `category=${paramCatName}&` : ""}start=${newStart}`)
      .then(({ success, data, error }) =>
        {
          if (success)
          {
            setPodcast([ ...podcastCard, ...data ])
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
      //  podcast ийн мэдээллийг back аас дуудах нь
      getData(start)
    },
    []
  )

  const handleMore = () =>
  {
    const newStart = podcastCard.length
    getData(newStart)
    setStart(newStart)
  }

  /** Ямар category дарагдсан түүнийг авах функц */
  const handleCategory = async (catName) =>
  {
    setStart(0)
    const { success, data, error } = await axios.get(`/api/podcast/?category=${catName}&start=0`)
    if (success)
    {
      setPodcast(data)
    }
  }

  return (
    <div>
      <HeaderMenu handleCategory={handleCategory}/>
        <section className="dark">
          <div className="container py-4">
            {
              podcastCard.map(
                (element, index) => {
                  return (
                    <Card
                      key={index}
                      image={process.env.REACT_APP_SERVER_URL + element.image}
                      title={element.title}
                      dateTime={timeZoneToDateString(element.createdAt)}
                      clock={msToTime(3600000)}
                      text={element.text}
                      url={element.url}
                    />
                  )
                }
              )
            }
            {
              // хэрэв podcast байхгүй бол
              podcastCard.length === 0
              ?
                <div style={{ display: "flex", justifyContent: "center" }}>Хоосон байна</div>
              :
                null
            }
          </div>

        </section>
        {
            // хэрэв podcast байвал харуулна
            podcastCard.length !== 0
            ?
              <MoreBtn onClick={handleMore}/>
            :
              null
          }
      <Footer />
    </div>
  )
}
