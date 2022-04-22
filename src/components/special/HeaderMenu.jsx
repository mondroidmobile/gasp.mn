import React from 'react'

import { useConfig } from 'context/configContext'

import Header from './Header'
import SubMenu from './SubMenu'

export default function HeaderMenu({ handleCategory })
{

    const { configs } = useConfig()

    return (
        <div>
            <Header />
            <div className="header">
                <img className="header-img" src={process.env.REACT_APP_SERVER_URL + configs.SITE_MENU_IMAGE} alt="Card image cap" />
            </div>
            <SubMenu handleCategory={handleCategory}/>
        </div>
    )
}
