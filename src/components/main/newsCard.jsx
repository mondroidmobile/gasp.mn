import React from 'react'
import { Link } from 'react-router-dom'

export default function newsCard({ createdAt, title, text, id, image })
{

    const errorImage = 'https://images.pexels.com/photos/127513/pexels-photo-127513.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'

    return (
        <div className="news-card">
            <Link to={`/news/${id}/`} className="news-card__card-link"></Link>
            <img
                src={process.env.REACT_APP_SERVER_URL + image}
                alt=""
                className="news-card__image"
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src=errorImage;
                  }
                }
            />
            <div className="news-card__text-wrapper">
                <h3 className="news-card__title">{title}</h3>
                <div className="news-card__post-date">{createdAt}</div>
                <div className="news-card__details-wrapper">
                    <p className="news-card__excerpt">
                        {text}&hellip;
                    </p>
                    <Link to={`/news/${id}/`} className="news-card__read-more">
                        Read more <i className="fas fa-long-arrow-alt-right"></i>
                    </Link>
                </div>
            </div>
        </div>


    )
}
