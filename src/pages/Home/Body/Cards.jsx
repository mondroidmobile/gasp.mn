import React from 'react'
import Card from '../../../components/main/card'

export default function Cards() {

    /** Back aac irsen data */
    const cards = [
        {
            image: "/static/image/3.jpg",
            color: "primary",
            title: "Crystal Card",
            text: "Crystal CardLorem ipsum dolor sit amet, consectetur adiscing elit. Aenean leo urna, tempor non neque vel, ruteum tempus ligula. Maecenas accumsan varius elit sit amet posuere."
        },
        {
            image: "/static/image/7.jpg",
            color: "secondary",
            title: "Crystal Card",
            text: "Lorem ipsum dolor sit amet, consectetur adiscing elit. Aenean leo urna, tempor non neque vel, ruteum tempus ligula. Maecenas accumsan varius elit sit amet posuere."
        },
        {
            image: "/static/image/9.jpg",
            color: "success",
            title: "Crystal Card",
            text: "Lorem ipsum dolor sit amet, consectetur adiscing elit. Aenean leo urna, tempor non neque vel, ruteum tempus ligula. Maecenas accumsan varius elit sit amet posuere."
        },
    ]

    const articles = [
        {
          "source": {
            "id": "engadget",
            "name": "Engadget"
          },
          
          image: "/static/image/9.jpg",
          color: "success",
          title: "Crystal Card",
          text: "Lorem ipsum dolor sit amet, consectetur adiscing elit. Aenean leo urna, tempor non neque vel, ruteum tempus ligula. Maecenas accumsan varius elit sit amet posuere."
        },
        {
          "source": {
            "id": "engadget",
            "name": "Engadget"
          },
         
          image: "/static/image/9.jpg",
          color: "success",
          title: "Crystal Card",
          text: "Lorem ipsum dolor sit amet, consectetur adiscing elit. Aenean leo urna, tempor non neque vel, ruteum tempus ligula. Maecenas accumsan varius elit sit amet posuere."
        },
        {
          "source": {
            "id": "engadget",
            "name": "Engadget"
          },
          
          image: "/static/image/9.jpg",
          color: "success",
          title: "Crystal Card",
          text: "Lorem ipsum dolor sit amet, consectetur adiscing elit. Aenean leo urna, tempor non neque vel, ruteum tempus ligula. Maecenas accumsan varius elit sit amet posuere."
        }
      ]
    

    return (
        <div className='c-container m-top-content'>
            <div className='wrapper'>
                {
                    cards.map(
                        (element, index) => {
                            return (
                                <Card key={index} image={element.image} title={element.title} text={element.text} color={element.color} />
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}
