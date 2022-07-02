import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useT } from '../../../custom/hooks/useT';
import { removeFromFavourites } from '../../../features/favourites/favouritesSlice';
import { useAppDispatch, useAppSelector } from '../../../Store/hooks';
import { ProductType } from '../../../types';
import "./_style.scss";

const FavoriteProductCard = (props: ProductType) => {
  const {
    imageUrl,
    old_price,
    price,
    name,
    slug
  } = props;

  const { t } = useT();
  const dispatch = useAppDispatch();

  const removeFavourite = () => {
    dispatch(removeFromFavourites(slug));
  };

  return (
    <Card className="favorite_product_card" bordered={false} hoverable>
      <button
        className="delete_favorite"
        type='button'
        onClick={removeFavourite}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
      <Link className="product_view_link" to={`/product/detail/${slug}`}>
        <div className="card_body">
          <figure>
            <img src={imageUrl ?? ""} alt={name} className="product_card_img" />
          </figure>
          <p className="price title18_bold">
            {price} сум
          </p>
          <del className='old_price p14_regular'>{old_price} сум</del>
          <h5 className="product_name">
            {name}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam officia harum amet?
          </h5>
        </div>
        <div className="card_footer">
          <ul>
            <li>
              <button type='button'>
                <img src={"/assets/icons/shopping-cart-gray.svg"} alt="cart" />
              </button>
            </li>
            <li>
              <button type='button'>
                <img src={"/assets/icons/compare-gray.svg"} alt="cart" />
              </button>
            </li>
          </ul>
        </div>
      </Link>
    </Card>

  )
}

export default FavoriteProductCard