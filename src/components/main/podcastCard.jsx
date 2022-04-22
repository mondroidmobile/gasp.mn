import React from 'react'

export default function podcastCard(props) {
    return (
        <div>
            <article className="postcard dark blue">
                <a className="postcard__img_link" href={props.url} target={"_blank"}>
                    <img className="postcard__img" src={props.image} alt="Image Title" />
                </a>
                <div className="postcard__text">
                    <h1 className="postcard__title blue"><a href={props.url} target={"_blank"}>{props.title}</a></h1>
                    <div className="postcard__subtitle small">
                        <time dateTime={props.dateTime}>
                            <i className="fas fa-calendar-alt mr-2"></i>{" "}{props.dateTime}
                        </time>
                    </div>
                    <div className="postcard__bar"></div>
                    <div className="postcard__preview-txt">{props.text}</div>
                    <ul className="postcard__tagbox">
                        <li className="tag__item"><i className="fas fa-tag mr-2"></i>Podcast</li>
                        <li className="tag__item"><i className="fas fa-clock mr-2"></i>{props.clock}</li>
                        <li className="tag__item play blue">
                            <a href={props.url} target={"_blank"}><i className="fas fa-play mr-2"></i>Play Episode</a>
                        </li>
                    </ul>
                </div>
            </article>
        </div>


    )
}
