import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Sticky from 'react-sticky-el'

import { useConfig } from 'context/configContext'

import Urls from '../../../components/special/Urls'

export default function Index() {
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

  const { configs } = useConfig()

  useEffect(
    () =>
    {
      if (configs.SITE_BANNER_IMAGE)
      {
        /** Header ийн арын  зургийг сольж байна */
        document.getElementById("headerImage").style.backgroundImage = `url(${process.env.REACT_APP_SERVER_URL + configs.SITE_BANNER_IMAGE})`
      }
    },
    [configs]
  )

  return (
    <div>
      <div className='headerImg' id='headerImage'>
        <h1>Gasp</h1>
        <p>{configs.HOME_GOAL}</p>

      </div>
      <Sticky className='header-zindex'>
        <header className="container mainMenu position-relative">
          <h1 className="logo">
            <a href="index.html" className="logo">Gasp</a>
          </h1>

          <input type="checkbox" className="nav-toggle" id="nav-toggle" />
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

              <Urls />
            </ul>
          </nav>
        </header>
      </Sticky>
    </div>
  )
}
