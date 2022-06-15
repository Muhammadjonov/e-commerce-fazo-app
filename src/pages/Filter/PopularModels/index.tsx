import React from 'react'
import { NavLink } from 'react-router-dom'
import "./_style.scss";
const popularModelsData = [
  {
    id: "1",
    text: "Realme",
    toUrl: "#"
  },
  {
    id: "2",
    text: "Игровые",
    toUrl: "#"
  },
  {
    id: "3",
    text: "Оптимальные",
    toUrl: "#"
  },
  {
    id: "4",
    text: "Смартфоны Samsung",
    toUrl: "#"
  },
  {
    id: "5",
    text: "Смартфоны Apple",
    toUrl: "#"
  },
  {
    id: "6",
    text: "Смартфоны",
    toUrl: "#"
  },
  {
    id: "7",
    text: "Смартфоны Samsung",
    toUrl: "#"
  },
  {
    id: "8",
    text: "Смартфоны",
    toUrl: "#"
  },
  {
    id: "9",
    text: "Игровые",
    toUrl: "#"
  }
]
export default function PopularModels() {
  return (
    <>
    <div className="popular_models">
      <h2 className='popular_modal_title title24_bold'>Популярные категории и модели</h2>
    <div className="popular_models_content">
    {
      popularModelsData.map(data =>(
        <NavLink
        className={isActive => "popular_model_nav_link p14_regular" + (!isActive ? "popular_model_nav_unselected" : "")
        }      
        key={data.id}
        to={data.toUrl}
        >
          {data.text}
        </NavLink>
      ))
      }
    </div>
    </div>
    </>
  )
}
