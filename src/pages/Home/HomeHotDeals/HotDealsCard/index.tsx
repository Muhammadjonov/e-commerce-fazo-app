import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { useT } from '../../../../custom/hooks/useT';
// import Countdown from 'react-countdown';
import "./_style.scss";

interface IHotDealsCard {
  id: number,
  name: string,
  brandName: string,
  slug: string,
  price: number | null,
  old_price: number | null,
  imageUrl: string | null,
}

function HotDealsCard(props: IHotDealsCard) {
  const {
    id,
    name,
    slug,
    brandName,
    price,
    old_price,
    imageUrl,
  } = props;
  const { t, lang } = useT();

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

  return (
    <Card className="hot_deals_card" bordered={false} hoverable>

      <div className="card_body">
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
            <button type='button'>
              <img src={"/assets/icons/filled_cart.svg"} alt="cart" />
            </button>
          </li>
          <li>
            <button type='button'>
              <img src={"/assets/icons/filled_heart.svg"} alt="heart" />
            </button>
          </li>
          <li>
            <button type='button'>
              <i className="fa-solid fa-scale-balanced"></i>
            </button>
          </li>
        </ul>
      </div>
    </Card>

  )
}

export default HotDealsCard