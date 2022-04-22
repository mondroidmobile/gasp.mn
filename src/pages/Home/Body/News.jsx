import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import axios from 'utils/axios'

export default function News() {

    const [ lastNews, setNews ] = useState([])

    const getLastNews = async () =>
    {
        const { success, data, error } = await axios.get("/api/news/home/").catch(err => err)
        if (success)
        {
            setNews(data)
        }
    }

    useEffect(
        () =>
        {
            getLastNews()
        },
        []
    )

    return (
        <section className='m-top-content'>
            <div className="c-container">
                <div className="c-row flexWrap">
                    {
                        lastNews.map((news, idx) =>
                        {
                            return (
                                <div className={`col-md-4`} key={idx}>
                                    <div className="card card-01 height-fix">
                                        <img className="card-img-top" src={process.env.REACT_APP_SERVER_URL + news.image} alt="Card image cap" />
                                        <div className="card-img-overlay">
                                            <h4 className="card-title"><Link to={`/news/${news._id}/`}>{news.title}</Link></h4>
                                            <p className="card-text">{news.text}</p>
                                            <p className="card-text"><Link to={`/news/${news._id}/`}></Link><i className="fa fa-heart-o"></i></p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}
