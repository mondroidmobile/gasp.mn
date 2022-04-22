import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Sticky from 'react-sticky-el'

import Urls from './Urls'

export default function Header() {
  const headerMenu = [
    {
      title: "Home",
      href: "/"
    },
    {
      title: "News",
      href: "/news/"
    },
    {
      title: "Video",
      href: "/video/"
    },
    {
      title: "Podcast",
      href: "/podcast/"
    },
  ]

  const handleClick = (title) => {
    alert("clicked" + title)
  }

  return (
    <header className="container mainMenu">
        <h1 className="logo">
            <Link to="/" className="logo">Gasp</Link>
        </h1>
        
        <input type="checkbox" className="nav-toggle" id="nav-toggle"/>
        <label htmlFor="nav-toggle" className="nav-toggle-label">
          <span></span>
        </label>
        <nav>
          <ul>
            {
              headerMenu.map(
                (element, index) => {
                  return <li key={index}>
                    <NavLink
                      to={element.href}
                      // onMouseOver={() => handleClick(element.title)}
                    >
                      {element.title}
                    </NavLink>
                  </li>
                }
              )
            }
            
          </ul>
          <Urls />
        </nav>
        
        
      </header>
   
  )
}
