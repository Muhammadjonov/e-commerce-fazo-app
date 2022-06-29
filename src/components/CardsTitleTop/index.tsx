import React from 'react'
import { Link } from 'react-router-dom';
import "./_style.scss";

interface ICardsTitleTop {
  title: string,
  toUrl: string,
  isShow?: boolean
}

function CardsTitleTop(props: ICardsTitleTop) {
  const { title, toUrl, isShow = true } = props;

  return (
    <div className="cards_title_top">
      <h4 className="title24_bold hot_deals_title">
        {title}
      </h4>
      {
        isShow && (
          <Link className="show_more p18_regular" to={toUrl}>
            Посмотреть все <i className="fa-solid fa-right-long"></i>
          </Link>
        )
      }
    </div>
  )
}

export default CardsTitleTop