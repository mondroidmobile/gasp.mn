import { useConfig } from 'context/configContext'
import React from 'react'
import Card from '../../../components/main/footer'

export default function Footer() {

  const { configs } = useConfig()

  const footer = [
    {
      title: "Байршил",
      menus: [
        {
          subtitle: "Хаяг",
          text: <a href={configs.GOOGLE_MAP} target="_blank">
            {configs.FOOTER_ADDRESS}
          </a>
        }
      ]
    },
    {
      title: "Шуудан хаяг",
      menus: [
        {
          subtitle: "Мэйл",
          text: configs.FOOTER_EMAIL
        },
        {
          subtitle: "Сайт",
          text: configs.FOOTER_SITE
        },
      ]
    },
    {
      title: "Холбоо барих",
      menus: [
        {
          subtitle: "Утас",
          text: configs.FOOTER_PHONE
        },
        {
          subtitle: "Гар утас",
          text: configs.FOOTER_PHONE_NUMBER
        },
      ]
    },
  ]

  return (
    <footer className="footer">
      <div className="footer__addr">
        <h1 className="footer__logo">
          <a href="#">Gasp</a>
          <p>{configs.HOME_GOAL}</p>
        </h1>

      </div>
      <ul className="footer__nav">
        {
          footer.map(
            (element, index) => {
              return (
                <Card key={index} title={element.title} menus={element.menus} />
              )
            }
          )
        }
      </ul>
    </footer>
  )
}
