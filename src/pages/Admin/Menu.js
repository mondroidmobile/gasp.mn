import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Menu({ title, subs, initIsActive=false, to, icon="fa fa-plane" })
{

    const hasSubs = (subs && subs.length > 0)

    useEffect(() =>
    {
        if (initIsActive === true)
        {

        }
    }, [])

    return (
        <li className={`c-menu__item ${hasSubs ? 'has-submenu' : ""}`} data-toggle="tooltip" title={title}>
            <NavLink className={`c-menu__item__inner`} to={to}>
                <i className={`${icon}`}></i>
                <div className={`c-menu-item__title`}>
                    <span>{title}</span>
                </div>
                {
                    hasSubs
                    &&
                        <div className={`c-menu-item__expand js-expand-submenu`}>
                            <i className={`fa fa-angle-down`}></i>
                        </div>
                }
            </NavLink>
            {
                hasSubs
                ?
                    <ul className={`c-menu__submenu u-list`}>
                        {
                            subs.map((sub, idx) =>
                            {
                                return (
                                    <li key={idx}>{sub.title}</li>
                                )
                            })
                        }
                    </ul>
                : null
            }
        </li>
    )
}
