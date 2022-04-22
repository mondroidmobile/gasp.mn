import React from 'react'

export default function ImageTitle(props) {
  return (
    <div className="card card-01 height-fix">
        <img className={`card-img-top ${props.imgClassName}`} src="/static/image/2.jpg" alt="Card image cap" />
        <div className="card-img-overlay">
        <h4 className="card-title"><a href="#">What is Computer Technology | IGI Global</a></h4>
        <p className="card-text">Computer technology requires a completely different methodology </p>
        <p className="card-text"><a href="#" className="fa fa-bookmark-o"></a><a className="fa fa-heart-o" href="#"></a></p>
        </div>
    </div>
  )
}
