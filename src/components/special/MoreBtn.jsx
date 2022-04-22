import React from 'react'

import Button from '../main/Button'

export default function MoreBtn({ onClick }) {
  return (
    <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
    >
        <Button title="More" onClick={onClick} />
    </div>
  )
}
