import React from 'react'

import { numberToString, minusDate } from 'utils/index'

export default function Video({ url, title="", views=0, createdAt }) {
    return (
        <div className="item item--1">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe src={`${url}?rel=0&amp;showinfo=0`} frameBorder="0" allowFullScreen=""></iframe>
            </div>
            <div className="video-text">
                <h6>{title}</h6>
                <div id="metadata-line" className="style-scope ytd-video-meta-block">

                    <span className="style-scope ytd-video-meta-block">{numberToString(views)} views </span>

                    <span className="style-scope ytd-video-meta-block">{createdAt ? `| ${minusDate(createdAt)}` : null}</span>
                    <dom-repeat strip-whitespace="" className="style-scope ytd-video-meta-block"><template is="dom-repeat"></template></dom-repeat>
                </div>
            </div>
        </div>
    )
}
