import { UnorderedListOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext, CartContext, MobileCategoriesContext } from '../../../App';
import { useT } from '../../../custom/hooks/useT'
import { useAppSelector } from '../../../Store/hooks';

import "./__style.scss";

const MobileMenu = () => {
  const { t, lang } = useT();
  const userData = useAppSelector(state => state.auth);
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const mobileCategoriesContext = useContext(MobileCategoriesContext);
  const { data: favoutites } = useAppSelector(state => state.favourites);
  const { products: inBasketProducts } = useAppSelector(state => state.basket);

  return (
    <div className='mobile__menu'>
      <ul className="mobile__menu__list">
        <li className="mobile__menu__list__item">
          <button
            type="button"
            className='mobile__menu__list__item__link'
            onClick={() => mobileCategoriesContext.onOpenMobileCategories()}
          >
            <UnorderedListOutlined className='mobile__menu__list__item__link__img' />
            <span className="mobile__menu__list__item__link__text">
              {t(`category.${lang}`)}
            </span>
          </button>
        </li>
        <li className="mobile__menu__list__item">
          <Link to="/balance" className='mobile__menu__list__item__link'>
            <Badge count={11}>
              <img className='mobile__menu__list__item__link__img' src="/assets/icons/compare-outline.svg" alt="compare" />
            </Badge>
            <span className="mobile__menu__list__item__link__text">
              {t(`compare.${lang}`)}
            </span>
          </Link>
        </li>
        <li className="mobile__menu__list__item">
          <button
            type='button'
            className='mobile__menu__list__item__link'
            onClick={() => cartContext.onOpenCartModal()}
          >
            <Badge count={inBasketProducts?.length}>
              <img className='mobile__menu__list__item__link__img' src="/assets/icons/shopping-cart-outline.svg" alt="cart" />
            </Badge>
            <span className="mobile__menu__list__item__link__text">
              {t(`cart.${lang}`)}
            </span>
          </button>
        </li>
        <li className="mobile__menu__list__item">
          <Link to="/favourites" className='mobile__menu__list__item__link'>
            <Badge count={favoutites?.length}>
              <img className='mobile__menu__list__item__link__img' src="/assets/icons/heart-outline.svg" alt="heart" />
            </Badge>
            <span className="mobile__menu__list__item__link__text">
              {t(`favorite.${lang}`)}
            </span>
          </Link>
        </li>
        <li className="mobile__menu__list__item">
          {
            !userData?.authorized ? (
              <button
                type="button"
                onClick={authContext.onOpenSignInModal}
                className='mobile__menu__list__item__link'
              >
                <img className='mobile__menu__list__item__link__img' src="/assets/icons/user-outline.svg" alt="menu" />
                <span className="mobile__menu__list__item__link__text">
                  {t(`signIn.${lang}`)}
                </span>
              </button>
            ) : (
              <Link to="/profile" className='mobile__menu__list__item__link'>
                <img className='mobile__menu__list__item__link__img' src="/assets/icons/user-outline.svg" alt="menu" />
                <span className="mobile__menu__list__item__link__text">
                  {userData?.user?.first_name?.slice(0, 7)}{(userData?.user?.first_name?.length) && (userData?.user?.first_name?.length > 7) ? "..." : ""}
                </span>
              </Link>
            )
          }

        </li>

      </ul>
    </div>
  )
}

export default MobileMenu