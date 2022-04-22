import React from 'react'

export default function Footer(props) {
    return (
        <ul className="footer__nav">
            <li className="nav__item nav__item--extra">
                <h2 className="nav__title">{props.title}</h2>

                <ul className="nav__ul">
                    {
                        props.menus.map(
                            (element, index) => {
                                return (
                                    <li key={index}>
                                        <div className="nav__link">
                                            <b>{element.subtitle}:&nbsp;</b>{element.text}
                                        </div>
                                    </li>
                                )
                            }
                        )
                    }
                </ul>
            </li>
        </ul>
    )
}
