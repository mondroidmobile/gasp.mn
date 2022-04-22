import React from 'react'

import { useConfig } from 'context/configContext'

export default function Urls()
{
    const { configs } = useConfig()

    return (
        <ul className='icon'>
            <li className="nav-item">
                <a className="nav-link" href={configs.FACEBOOK} target={"_blank"}>
                    <i className="fab fa-facebook"></i>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href={configs.INSTAGRAMM} target={"_blank"}>
                <i className="fab fa-instagram"></i>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href={configs.YOUTUBE} target={"_blank"}>
                <i className="fab fa-youtube"></i>
                </a>
            </li>
        </ul>
    )
}
