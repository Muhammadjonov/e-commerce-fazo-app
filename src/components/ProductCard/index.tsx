import React, { useContext } from 'react';
import { Card, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { useT } from '../../custom/hooks/useT';
import { ProductType } from '../../types';
import "./_style.scss";
import { useAppDispatch, useAppSelector } from '../../Store/hooks';
import { addToFavoutires, removeFromFavourites } from '../../features/favourites/favouritesSlice';
import { AuthContext } from '../../App';
import { getBasketFromLocalStorage, isFavourite, isInBasket } from '../../helpers';
import { addToBasket } from '../../features/basket/basketSlice';


interface IProductCard {
  product: ProductType
}

function ProductCard(props: IProductCard) {
  const {
    name,
    brandName,
    slug,
    price,
    old_price,
    imageUrl,
    id
    // userSaveProduct: isFavourite
  } = props.product;
  const dispatch = useAppDispatch();
  const auth = useAppSelector((store) => store.auth);
  const { data: favourites } = useAppSelector((state) => state.favourites);
  const { products } = useAppSelector((state) => state.basket);
  let isFavorite = isFavourite(favourites, id);
  let isThereInBasket = isInBasket(products, id);
  const { onOpenSignInModal } = useContext(AuthContext);
  const { t, lang } = useT();

  const onFavouriteClick = () => {
    if (auth.authorized) {
      if (isFavorite) {
        dispatch(removeFromFavourites(props.product));
      } else {
        dispatch(addToFavoutires(props.product));
      }
    } else {
      onOpenSignInModal();
    }
  };

  const handleAddBasket = () => {
    dispatch(addToBasket({ ...props.product, count: 1 }));
  }

  return (
    <Card className="product_card" bordered={false} hoverable>
      <div className="card_body" title={name}>
        <Link className="product_view_link" to={`/product/detail/${slug}`}>
          <figure>
            <img src={imageUrl ?? ""} alt={name} className="product_card_img" />
          </figure>
        </Link>
        <p className="price title18_bold">
          {price} {t(`sum.${lang}`)}
        </p>
        <del className='old_price p14_regular'>{old_price} {t(`sum.${lang}`)}</del>
        <Link className="product_view_link" to={`/product/detail/${slug}`}>
          <h5 className="product_name">
            {name}
          </h5>
        </Link>
      </div>
      <div className="card_footer">
        <ul>
          <li>
            <Tooltip placement='top' title={t(`addToCart.${lang}`)} >
              <button
                type='button'
                onClick={handleAddBasket}
              >
                <img src={`/assets/icons/shopping-cart-${isThereInBasket ? 'red' : 'gray'}.svg`} alt="cart" />
              </button>
            </Tooltip>
          </li>
          <li>
            <Tooltip placement='top' title={t(`addToFavourites.${lang}`)} >
              <button
                type='button'
                onClick={onFavouriteClick}
              >
                <img src={`/assets/icons/heart-${isFavorite ? 'red' : 'gray'}.svg`} alt="heart" />
              </button>
            </Tooltip>
          </li>
          <li>
            <Tooltip placement='top' title={t(`compare.${lang}`)} >
              <button type='button'>
                <img src={"/assets/icons/compare-gray.svg"} alt="compare" />
              </button>
            </ Tooltip>
          </li>
        </ul>
      </div>
    </Card >
  )
}

export default ProductCard