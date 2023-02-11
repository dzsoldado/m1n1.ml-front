import React from 'react'
import svg404 from '../assets/404.svg'

export default function NotFound() {
  return (
    <div>
      <img src={svg404} alt="404 Page not found" style={{maxHeight: '700px',maxWidth: '100%'}}/>
    </div>
  )
}
