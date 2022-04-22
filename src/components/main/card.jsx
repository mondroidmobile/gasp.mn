import React from 'react'

export default function card(props) {
    return (
        <div className={`card border-${props.color}`}>
            <div className={`card-header ${props.color}`}>
               <img src={props.image} alt="" className="text-image"/>
           </div>
            <div className={`card-body text-${props.color}`}>
                <h3 className="card-title">{props.title}</h3>
                <p className="card-text">{props.text}</p>
            </div>
        </div>
       
    )
}
