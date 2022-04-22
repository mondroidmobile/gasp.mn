import React, { useEffect } from 'react'

import { useConfig } from 'context/configContext'

import News from './News'
import Cards from './Cards'

export default function Index() {

  const { configs } = useConfig()

  useEffect(
    () =>
    {
      if (configs.HOME_IMAGE)
      {
        document.getElementById("colImage").style.backgroundImage = `url(${process.env.REACT_APP_SERVER_URL + configs.HOME_IMAGE})`
      }
    },
    [configs]
  )

  return (
    <div>
      <section className='side-section'>
        <div className="grid-flex">
          <div className="col col-image" id='colImage'>
            &nbsp;
          </div>
          <div className="col col-text col-left">
            <div className="Aligner-item">
              <h5 className="text-title">
                {configs.HOME_TITLE}
            </h5>
              <div className="text-about">
                <p>
                  {configs.HOME_ABOUT}
                </p>
            </div>
            <span>
                <a href="#" className="button">Link Button</a>
            </span>
            </div>
          </div>
        </div>
      </section>

      <main>
        <Cards />
        <News />
      </main>
    </div>

  )
}
