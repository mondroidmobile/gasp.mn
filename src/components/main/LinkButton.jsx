import React from 'react'

export default function LinkButton(props) {
  return (
    <button
        className={`link-button ${props.className}`}
    >
        {props.title}
    </button>
  )
}
