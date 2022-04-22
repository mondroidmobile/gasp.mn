import React, { useEffect, useState } from 'react'
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom'

import Button from '../main/Button'

import axios from 'utils/axios'

export default function SubMenu({ handleCategory }) {

  /** back аас category ийн жагсаалтыг авч харуулах нв */
  const [ categories, setCategories ] =  useState([])
  const [ catName, setCatName ] = useState("")
  /** хуудас үсрэхэд хэрэг болно */
  const navigate = useNavigate()

  const location = useLocation()

  /** url солигдох бүрт ямар category байгаа эсэхийг шалгах */
  useEffect(
    () =>
    {
      const paramCatName = new URLSearchParams(location.search).get("category")
      setCatName(paramCatName)
    },
    [location]
  )

  /** cate ийн мэдээллийг bakc аас авах нь */
  const getCat = async () =>
  {
      const { success, data, error } = await axios.get("/api/category/").catch(err => err)
      if (success)
      {
          setCategories(data)
      }
  }

  useEffect(() =>
  {
    getCat()
  }, [])

  /** Ямар category дарагдсныг мэдэх */
  const handleClick = (category) =>
  {
    /** дарагдсан cat ийн нэр */
    const catName = category.name
    if (handleCategory)
    {
      /** categery ийн нэрийг буцаах */
      handleCategory(catName)
    }

    navigate(
      {
        search: `?${createSearchParams({
          category: catName
        })}`
      }
    )
  }

  return (
    <div  className="sub-menu">
      {
        categories.map((category, index) =>
        {
          return (
            <div className="sub-menu-nav" key={index}>
              <Button className={`nav-btn ${catName === category.name ? "active" : ""}`} title={category.name} onClick={() => handleClick(category)} />
            </div>
          )
        })
      }
    </div>
  )
}
