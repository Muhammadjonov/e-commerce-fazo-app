import { Card } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';

interface IPopularSliderCard {
  id: number,
  title: string,
  slug: string,
  imageUrl: string
}

function PopularSliderCard(props: IPopularSliderCard) {
  const { title, imageUrl, slug } = props;
  return (
    <Card hoverable bordered={false}>
      <Link to={`/category/:${slug}`} className="popular_slider_card">
        <h5 className="title20_bold popular_card_title">
          {title}
        </h5>
        <figure>
          <img src={imageUrl} alt={title} />
        </figure>
      </Link>
    </Card>
  )
}

export default PopularSliderCard