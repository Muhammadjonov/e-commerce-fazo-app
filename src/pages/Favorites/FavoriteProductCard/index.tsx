import { Card, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { useT } from '../../../custom/hooks/useT';
import { addToBasket } from '../../../features/basket/basketSlice';
import { removeFromFavourites } from '../../../features/favourites/favouritesSlice';
import { isInBasket } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../Store/hooks';
import { ProductType } from '../../../types';
import "./_style.scss";

interface IFavoriteProductCard {
  product: ProductType
}

const FavoriteProductCard = (props: IFavoriteProductCard) => {
  const {
    imageUrl,
    old_price,
    price,
    name,
    slug,
    id
  } = props.product;

  const { t, lang } = useT();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.basket)
  let isThereInBasket = isInBasket(products, id);

  const removeFavourite = () => {
    dispatch(removeFromFavourites(props.product));
  };


  const handleAddBasket = () => {
    dispatch(addToBasket({ ...props.product, count: 1 }));
  }

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
            {price} {t(`sum.${lang}`)}
          </p>
          <del className='old_price p14_regular'>{old_price} {t(`sum.${lang}`)}</del>
          <h5 className="product_name">
            {name}
          </h5>
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
              <Tooltip placement='top' title={t(`compare.${lang}`)} >
                <button type='button'>
                  <img src={"/assets/icons/compare-gray.svg"} alt="cart" />
                </button>
              </Tooltip>
            </li>
          </ul>
        </div>
      </Link>
    </Card>

  )
}

export default FavoriteProductCard