import { Card, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { useT } from '../../../custom/hooks/useT';
import { addToBasket } from '../../../features/basket/basketSlice';
import { addToCompare } from '../../../features/Compares/comparesSlice';
import { removeFromFavourites } from '../../../features/favourites/favouritesSlice';
import { formatPrice, isInBasket, isInCompare } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../Store/hooks';
import { ProductType } from '../../../types';
import "./_style.scss";

interface IFavouriteProductCard {
  product: ProductType
}

const FavouriteProductCard = (props: IFavouriteProductCard) => {
  const {
    imageUrl,
    old_price,
    price,
    name,
    slug,
    id,
    category_id,
    is_treaty
  } = props.product;

  const { t, lang } = useT();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.basket);
  const { compares } = useAppSelector((state) => state.compares);
  let isThereInBasket = isInBasket(products, id);
  let isThereCompare = isInCompare(compares, category_id, id);

  const removeFavourite = () => {
    dispatch(removeFromFavourites(props.product));
  };

  const handleAddBasket = () => {
    dispatch(addToBasket({ ...props.product, count: 1 }));
  }

  const handleAddCompare = () => {
    dispatch(addToCompare({ category_id, id, name }))
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
      <div className="card_body">
        <Link className="product_view_link" to={`/product/detail/${slug}`}>
          <figure>
            <img src={imageUrl ?? ""} alt={name} className="product_card_img" />
          </figure>
        </Link>
        <p className="price title18_bold">
          {
            is_treaty !== 1 ? (
              <>
                {formatPrice(price)} {t(`sum.${lang}`)}
              </>
            ) : t(`treaty.${lang}`)
          }
        </p>
        {/* <del className='old_price p14_regular'>{old_price} {t(`sum.${lang}`)}</del> */}
        <Link className="product_view_link" to={`/product/detail/${slug}`}>
          <h5 className="product_name">
            {name}
          </h5>
        </Link>
      </div>
      <div className="card_footer">
        <ul>
          {
            is_treaty !== 1 && (
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
            )
          }
          <li>
            <Tooltip placement='top' title={t(`compare.${lang}`)} >
              <button type='button'
                onClick={handleAddCompare}
              >
                <img src={`/assets/icons/compare-${isThereCompare ? 'red' : 'gray'}.svg`} alt="compare" />
              </button>
            </Tooltip>
          </li>
        </ul>
      </div>
    </Card >

  )
}

export default FavouriteProductCard