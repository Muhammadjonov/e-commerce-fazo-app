import { Card } from 'antd';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../App';
import { useT } from '../../../../custom/hooks/useT';
import { addToBasket } from '../../../../features/basket/basketSlice';
import { addToFavoutires, removeFromFavourites } from '../../../../features/favourites/favouritesSlice';
import { isFavourite } from '../../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../../Store/hooks';
import { ProductType } from '../../../../types';
// import Countdown from 'react-countdown';
import "./_style.scss";

interface IHotDealsCard {
  product: ProductType
}

// Random component
const Completionist = () => <div>You are good to go!</div>;
interface Irenderer {
  days: number,
  hours: number,
  minutes: number,
  seconds: number,
  completed: boolean,
}
// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }: Irenderer) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <p className="offer_end_in">
        <span className="offer_end_date p18_regular">
          {days}
          <span className="offer_end_date_text">
            ДНЕЙ
          </span>
        </span>
        <span className="offer_end_date p18_regular">
          {hours}
          <span className="offer_end_date_text">
            ЧАСОВ
          </span>
        </span>
        <span className="offer_end_date p18_regular">
          {minutes}
          <span className="offer_end_date_text">
            МИНУТ
          </span>
        </span>
        <span className="offer_end_date p18_regular">
          {seconds}
          <span className="offer_end_date_text">
            СЕКУНД
          </span>
        </span>
      </p>
    )
  }
};
function HotDealsCard(props: IHotDealsCard) {
  const {
    id,
    name,
    slug,
    brandName,
    price,
    old_price,
    imageUrl,
  } = props.product;

  const { t, lang } = useT();

  const dispatch = useAppDispatch();
  const auth = useAppSelector((store) => store.auth);
  const { data: favourites } = useAppSelector((state) => state.favourites);
  let isFavorite = isFavourite(favourites, id);
  const { onOpenSignInModal } = useContext(AuthContext);

  const onFavouriteClick = () => {
    if (auth.authorized) {

      if (isFavorite) {
        dispatch(removeFromFavourites(slug));
      } else {
        dispatch(addToFavoutires(props.product));
      }
    } else {
      onOpenSignInModal();
    }
  };

  const handleAddBasket = () => {
    dispatch(addToBasket({ ...props.product, count: 1 }))
  }

  return (
    <Card className="hot_deals_card" bordered={false} hoverable>

      <div className="card_body" title={name}>
        {/* {
          discount !== 0 && (
            <div className="discount">
              {discount}
            </div>
          )
        } */}
        <Link className="product_view_link" to={`/product/detail/${slug}`}>
          <figure>
            <img src={imageUrl ?? ""} alt="watch" className="product_card_img" />
          </figure>
        </Link>
        <p className="price title18_bold">
          <del className='old_price p14_regular'>{old_price} {t(`sum.${lang}`)}</del>{price} {t(`sum.${lang}`)}
        </p>
        <Link className='product_view_link' to={`/product/detail/${slug}`}>
          <h5 className="product_name">
            {name}
          </h5>
        </Link>
        {/* <p className="offer_end_title p14_regular">
            Предложение заканчивается через:
          </p>
          {
            <Countdown
              date={Date.now() + offer_end_in}
              renderer={renderer}
            />
          } */}
      </div>
      <div className="card_footer">
        <ul>
          <li>
            <button
              onClick={handleAddBasket}
              type='button'
            >
              <img src={"/assets/icons/shopping-cart-gray.svg"} alt="cart" />
            </button>
          </li>
          <li>
            <button
              type='button'
              onClick={onFavouriteClick}
            >
              <img src={`/assets/icons/heart-${isFavorite ? 'red' : 'gray'}.svg`} alt="heart" />
            </button>
          </li>
          <li>
            <button
              type='button'
            >
              <img src={"/assets/icons/compare-gray.svg"} alt="compare" />
            </button>
          </li>
        </ul>
      </div>
    </Card>

  )
}

export default HotDealsCard