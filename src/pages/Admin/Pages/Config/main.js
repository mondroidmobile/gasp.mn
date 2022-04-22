import React from 'react'

import ConfigText from './ConfigText'
import ConfigTextArea from './ConfigTextArea'
import ConfigImage from './ConfigImage'

export default function Configs() {
    return (
        <>
            <h1 className={`page-title`}>Тохиргоо</h1>
            <div className={`page-content`}>
                <h3>Үндсэн</h3>
                <hr />
                <ConfigImage configName={"SITE_LOGO"} title="сайтын лого"/>
                <ConfigImage configName={"SITE_BANNER_IMAGE"} title="сайтын banner зураг"/>
                <ConfigImage configName={"SITE_MENU_IMAGE"} title="сайтын цэсны арын зураг"/>
                <h3>Холбоосууд</h3>
                <hr />
                <ConfigText configName={"FACEBOOK"} title="FACEBOOK"/>
                <ConfigText configName={"INSTAGRAMM"} title="INSTAGRAM"/>
                <ConfigText configName={"YOUTUBE"} title="YOUTUBE"/>
                <ConfigText configName={"GOOGLE_MAP"} title="GOOGLE MAP"/>
                <h3>Нүүр хуудас</h3>
                <hr />
                <ConfigImage configName={"HOME_IMAGE"} title="Ерөнхий танилцуулагын зураг"/>
                <ConfigTextArea configName={"HOME_ABOUT"} title="Ерөнхий танилцуулага"/>
                <ConfigText configName={"HOME_TITLE"} title="Ерөнхий танилцуулагын гарчиг"/>
                <ConfigTextArea configName={"HOME_GOAL"} title="Сайтын уриа"/>
                <h3>Footer</h3>
                <hr />
                <ConfigTextArea configName={"FOOTER_ADDRESS"} title="Хаяг"/>
                <ConfigText configName={"FOOTER_EMAIL"} title="Мэйл"/>
                <ConfigText configName={"FOOTER_SITE"} title="Сайт"/>
                <ConfigText configName={"FOOTER_PHONE"} title="Утас"/>
                <ConfigText configName={"FOOTER_PHONE_NUMBER"} title="Гар утас"/>
                <h3>SITE EMAIL</h3>
                <hr />
                <ConfigText configName={"SITE_EMAIL"} title="Сайтын цахим хаяг"/>
                <ConfigText configName={"SITE_EMAIL_PASS"} title="Сайтын цахим хаягын нууц үг"/>
            </div>
        </>
    )
}
