import { Card, Tooltip } from 'antd';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../App';
import { useT } from '../../../custom/hooks/useT';
import { addToBasket } from '../../../features/basket/basketSlice';
import { deleteFromCompare } from '../../../features/Compares/comparesSlice';
import { addToFavoutires, removeFromFavourites } from '../../../features/favourites/favouritesSlice';
import { formatPrice, isFavourite, isInBasket } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../Store/hooks';
import { ProductType } from '../../../types';
import "./_style.scss";

interface IProductComparisonCard {
  product: ProductType
}

const ProductComparisonCard = (props: IProductComparisonCard) => {
  const {
    id,
    imageUrl,
    price,
    name,
    slug,
    category_id,
    is_treaty
  } = props.product;

  const { t, lang } = useT();

  const dispatch = useAppDispatch();
  const auth = useAppSelector((store) => store.auth);
  const { data: favourites } = useAppSelector((state) => state.favourites);
  const { products } = useAppSelector((state) => state.basket);
  let isFavorite = isFavourite(favourites, id);
  let isThereInBasket = isInBasket(products, id);
  const { compares } = useAppSelector((state) => state.compares);

  const { onOpenSignInModal } = useContext(AuthContext);

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

  const handleRemoveCompare = (category_id: number, id: number, name: string) => {
    dispatch(deleteFromCompare({ category_id, id, name }));
  }

  return (
    <Card className="product_comparison_card" bordered={false} hoverable>
      <button
        className="delete_comparison"
        type='button'
        onClick={() => handleRemoveCompare(category_id, id, name)}
      >
        <i
          className="fa-solid fa-xmark" ></i>
      </button>
      <div className="card_body">
        <Link className="product_view_link" to={`/product/detail/${slug}`}>
          <figure>
            <img src={imageUrl} alt={name} className="product_card_img" />
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

        {/* <del className='old_price p14_regular'>{formatPrice(old_price)} {t(`sum.${lang}`)}</del> */}
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
            <Tooltip placement='top' title={t(`addToFavourites.${lang}`)} >
              <button
                type='button'
                onClick={onFavouriteClick}
              >
                <img src={`/assets/icons/heart-${isFavorite ? 'red' : 'gray'}.svg`} alt="heart" />
              </button>
            </Tooltip>
          </li>
        </ul>
      </div>
    </Card >

  )
}

export default ProductComparisonCard