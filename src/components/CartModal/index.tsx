import { Button, Divider, Empty, Modal } from 'antd'
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import { useT } from '../../custom/hooks/useT';
import { decrement, deleteFromBasket, increment } from '../../features/basket/basketSlice';
import { addToFavoutires, removeFromFavourites } from '../../features/favourites/favouritesSlice';
import { formatPrice, getBasketFromLocalStorage, isFavourite } from '../../helpers';
import { useAppDispatch, useAppSelector } from '../../Store/hooks';
import { ProductType } from '../../types';
import EmptyCart from './EmptyCart';
import "./__style.scss";
interface ICartModal {
  isOpenCart: boolean,
  onOpenCartModal: () => void;
  onCloseCartModal: () => void;
}

const CartModal = (props: ICartModal) => {
  const { t, lang } = useT();
  const { isOpenCart, onCloseCartModal, onOpenCartModal } = props;
  const data = getBasketFromLocalStorage();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((store) => store.auth);
  const { products, totalElements, totalPrice, totalProductCount } = useAppSelector((store) => store.basket);
  const { data: favourites } = useAppSelector((state) => state.favourites);
  const { onOpenSignInModal } = useContext(AuthContext);
  let navigete = useNavigate();
  const onFavouriteClick = (product: ProductType, isFavorite: boolean) => {
    if (auth.authorized) {

      if (isFavorite) {
        dispatch(removeFromFavourites(product.slug));
      } else {
        dispatch(addToFavoutires(product));
      }
    } else {
      onOpenSignInModal();
    }
  };

  const hanldeClickCheckout = () => {
    if (!auth.authorized) {
      onOpenSignInModal();
    } else {
      navigete("/checkout");
      onCloseCartModal();
    }
  }


  return (
    <Modal
      title={<h3 className="title20_bold cart__title">Купить сейчас</h3>}
      visible={isOpenCart}
      footer={null}
      className="cart__modal"
      onCancel={onCloseCartModal}
      width={1140}
    >
      {
        products?.length !== 0 ?
          <>
            {
              products?.map(product =>
              (
                <React.Fragment key={product.id}>
                  <div className="cart__modal__product__card">
                    <div className="cart__modal__product__card__left">
                      <figure className="cart__modal__product__card__left__img">
                        <img src={product.imageUrl} alt={product.name} />
                      </figure>
                      <div className="cart__modal__product__card__left__info">
                        <h3 className="cart__modal__product__card__left__info__product__name">
                          {product.name}
                        </h3>
                        <p className="cart__modal__product__card__left__info__product__price title18_bold">
                          {formatPrice(product.price)} cум
                        </p>
                      </div>
                    </div>
                    <div className="cart__modal__product__card__right">
                      <div className="cart__modal__product__card__right__count">
                        <button
                          className="decr"
                          type='button'
                          onClick={() => dispatch(decrement({ id: product.id }))}
                          disabled={product?.count < 2}
                        >
                          -
                        </button>
                        <span className="cart__modal__product__card__right__count__total">{product?.count}</span>
                        <button
                          className="incr"
                          type='button'
                          onClick={() => dispatch(increment({ id: product.id }))}
                          disabled={product?.count > 99}
                        >
                          +
                        </button>
                      </div>
                      <div className="cart__modal__product__card__right__btns">
                        <button
                          type='button'
                          className="cart__modal__product__card__right__btns__favourite"
                          onClick={() => onFavouriteClick(product, isFavourite(favourites, product.id))}
                        >
                          <img src={`/assets/icons/heart-${isFavourite(favourites, product.id) ? 'red' : 'gray'}.svg`} alt="heart" />
                        </button>
                        <button
                          type='button'
                          className="cart__modal__product__card__right__btns__delete"
                          onClick={() => dispatch(deleteFromBasket({ id: product.id }))}
                        >
                          <img src={`/assets/icons/delete.svg`} alt="delete" />
                        </button>

                      </div>
                    </div>
                  </div>
                  <Divider />
                </React.Fragment>
              )
              )
            }

            <div className="cart__modal__total__count__price">
              <p className="cart__modal__total__count__price__text">
                <span className="p18_regular">Итого {totalProductCount} товара</span> <span className="title24_bold">
                  {formatPrice(totalPrice)} {t(`sum.${lang}`)}
                </span>
              </p>
            </div>
            <div className="cart__modal__btns">
              <Button
                className="cart__modal__btns__continue__btn"
                type="link"
                onClick={onCloseCartModal}
                size="large"
              >
                Продолжить покупки
              </Button>
              <Button
                className="cart__modal__btns__checkout__btn"
                type="link"
                size="large"
                onClick={hanldeClickCheckout}
              >
                {t(`checkout.${lang}`)}
              </Button>
            </div>
          </> :
          data?.products?.length && data?.products?.length > 0 ? (
            <div style={{ height: "500px" }}></div>
          ) : (
            <EmptyCart onCloseCartModal={onCloseCartModal} />
          )
      }

    </Modal>
  )
}

export default CartModal