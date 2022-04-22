import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from 'context/authContext'

import Menu from './Menu'
import AdminPages from './Pages'

import css from './style.module.css'

export default function MainAdminPage()
{

    const { signOut } = useAuth()

    useEffect(() => {

        const body = document.getElementsByTagName('body')[0]
        body.style.backgroundColor = "#ececec"
        body.style.color = "#102c58"
        body.style.lineHeight = 1.42857143
        body.style.fontSize = "14px"

        const $ = window.$

        var Dashboard = function () {
            var global = {
                tooltipOptions: {
                    placement: "right"
                },
                menuClass: ".c-menu"
            };

            var menuChangeActive = function menuChangeActive(el) {
                var hasSubmenu = $(el).hasClass("has-submenu");
                $(global.menuClass + " .is-active").removeClass("is-active");

                // if (hasSubmenu) {
                // 	$(el).find("ul").slideDown();
                // }
            };

            var sidebarChangeWidth = function sidebarChangeWidth() {
                var $menuItemsTitle = $("li .menu-item__title");

                $("body").toggleClass("sidebar-is-reduced sidebar-is-expanded");
                $(".hamburger-toggle").toggleClass("is-opened");

                if ($("body").hasClass("sidebar-is-expanded")) {
                    $('[data-toggle="tooltip"]').tooltip("destroy");
                } else {
                    $('[data-toggle="tooltip"]').tooltip(global.tooltipOptions);
                }
            };

            return {
                init: function init() {
                    $(".js-hamburger").on("click", sidebarChangeWidth);

                    $(".js-menu li").on("click", function (e) {
                    });

                    $('[data-toggle="tooltip"]').tooltip(global.tooltipOptions);
                }
            };
        }();

        Dashboard.init()
        return () =>
        {
            const body = document.getElementsByTagName('body')[0]
            body.style.backgroundColor = "#000";
            body.style.color = "#fff"
            body.style.lineHeight = 1.42857143
            body.style.fontSize = "14px"
        }
    }, [])

    const logout = () =>
    {
        signOut()
    }

    return (
        <>
            <div className={`sidebar-is-reduced body`}>
                <header className={`l-header`}>
                    <div className={`l-header__inner clearfix`}>
                        <div className={`c-header-icon js-hamburger`}>
                            <div className={`hamburger-toggle`}>
                                <span className={`bar-top`}></span>
                                <span className={`bar-mid`}></span>
                                <span className={`bar-bot`}></span>
                            </div>
                        </div>
                        <div className={`c-header-icon has-dropdown`}>
                            <span className={`c-badge c-badge--header-icon animated shake`}>87</span>
                            <i className={`fa fa-bell`}></i>
                            <div className={`c-dropdown c-dropdown--notifications`}>
                                <div className={`c-dropdown__header`}></div>
                                <div className={`c-dropdown__content`}></div>
                            </div>
                        </div>
                        <div className={`c-search`}>
                            <input className={`c-search__input u-input`} placeholder="Search..." type="text"/>
                        </div>
                        <div className={`header-icons-group`}>
                            <div className={`c-header-icon basket`}>
                                <span className={`c-badge c-badge--header-icon animated shake`}>12</span>
                                <i className={`fa fa-shopping-basket`}></i>
                            </div>
                            <div className={`c-header-icon logout`} onClick={logout}>
                                <i className={`fa fa-power-off`}></i>
                            </div>
                        </div>
                    </div>
                </header>
                <div className={`l-sidebar`}>
                    <div className={`c-logo`}>
                        <Link to={"/"}>
                            <div className={`logo__txt`}>G</div>
                        </Link>
                    </div>
                    <div className={`l-sidebar__content`}>
                    <nav className={`c-menu js-menu`}>
                        <ul className={`u-list`}>
                            <Menu title={'Author'} to="/admin/author/" icon='fa fa-user'/>
                            <Menu title={'Category'} to="/admin/category/" icon='fas fa-books'/>
                            <Menu title={'News'} to="/admin/news/" icon='fal fa-newspaper'/>
                            <Menu title={'Video'} to="/admin/video/" icon={"fab fa-youtube"}/>
                            <Menu title={'Podcast'} to="/admin/podcast/" icon='fal fa-podcast'/>
                            <Menu title={'Config'} to="/admin/config/" icon='fal fa-cog'/>
                            {/* <Menu
                                to={"/admin/"}
                                title={'Modules'}
                                subs={
                                    [
                                        {
                                            title: "ONE"
                                        },
                                        {
                                            title: "Two"
                                        }
                                    ]
                                }
                            /> */}
                        </ul>
                    </nav>
                    </div>
                </div>
            </div>
            <main className={`l-main`}>
                <div className={`c-content-wrapper content-wrapper--with-bg`}>
                    <AdminPages />
                </div>
            </main>
        </>
    )
}
