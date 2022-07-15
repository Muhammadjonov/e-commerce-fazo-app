import { useContext } from 'react'
import { Card, Row, Col, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { ProductType } from '../../types';
import { useT } from '../../custom/hooks/useT';
import { useAppDispatch, useAppSelector } from '../../Store/hooks';
import { addToBasket } from '../../features/basket/basketSlice';
import { addToFavoutires, removeFromFavourites } from '../../features/favourites/favouritesSlice';
import { AuthContext } from '../../App';
import { formatPrice, isFavourite, isInBasket, isInCompare } from '../../helpers';
import "./_style.scss";
import { addToCompare } from '../../features/Compares/comparesSlice';

interface IProductCardCol {
  product: ProductType
}

function ProductCardCol(props: IProductCardCol) {
  const {
    id,
    imageUrl,
    price,
    name,
    brandName,
    slug,
    category_id,
    is_treaty
  } = props.product;

  const { t, lang } = useT();
  const { onOpenSignInModal } = useContext(AuthContext);

  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);
  const { data: favourites } = useAppSelector((state) => state.favourites);
  const { products } = useAppSelector((state) => state.basket);
  const { compares } = useAppSelector((state) => state.compares);
  let isFavorite = isFavourite(favourites, id);
  let isThereInBasket = isInBasket(products, id);
  let isThereCompare = isInCompare(compares, category_id, id);

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

  const add = () => {
    dispatch(
      addToBasket({ ...props.product, count: 1 }))
  }

  const handleAddCompare = () => {
    dispatch(addToCompare({ category_id, id, name }))
  }

  return (
    <Card className="product_card_col" bordered={false} hoverable>
      <div className="card_body">
        <Row gutter={[20, 20]}>
          <Col md={6}>
            <Link className="product_view_link card_left" to={`/product/detail/${slug}`}>
              <figure>
                <img src={imageUrl ?? ""} alt="watch" className="product_card_img" />
              </figure>
            </Link>
          </Col>
          <Col md={12}>
            <div className="desc">
              <Link className="product_view_link" to={`/product/detail/${slug}`}>
                <h5 className="product_name title24_bold">
                  {name}
                </h5>
              </Link>
              <div className="desc_body p16_regular">
                <p className="brend p16_regular">
                  {t(`brand.${lang}`)}: <span className="title18_bold">{brandName}</span>
                </p>
                {/* <p className="manufactor p16_regular">
                Ishlab chiqaruvchi davlat: <span className="title18_bold">{manufactor}</span>
              </p>
              <p className="type p16_regular">
                Turi: <span className="title18_bold">{type}</span>
              </p> */}
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="card_right">
              <h5 className="title18_bold per_month">
                {
                  is_treaty !== 1 ? (
                    <>
                      {formatPrice(price)} {t(`sum.${lang}`)}
                    </>
                  ) : t(`treaty.${lang}`)
                }
              </h5>
              {/* <p className="price">
                {old_price} {t(`sum.${lang}`)}
              </p> */}
              {
                is_treaty !== 1 && (
                  <button
                    onClick={add}
                    type='button'
                    className="add_cart_btn">
                    <img src="/assets/icons/shopping-cart-outline.svg" alt="cart" /> <span>{t(`addToCart.${lang}`)}</span>
                  </button>
                )
              }

              <div className="card_footer">
                <ul>
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
                      <button
                        type='button'
                        onClick={handleAddCompare}
                      >
                        <img src={`/assets/icons/compare-${isThereCompare ? 'red' : 'gray'}.svg`} alt="compare" />
                      </button>
                    </ Tooltip>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Card >
  )
}

export default ProductCardCol