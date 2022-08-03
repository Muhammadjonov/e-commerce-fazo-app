import { Col, Row, Tooltip } from "antd";
import ProductInfoComp from "./ProductInfoComp";
import BuyButton from "./BuyButton";
import { useContext, useState } from "react";
import InstallmentModal from "../../../components/InstallmentModal";
import { CharacterAssignsType } from "../../../types";
import BuyNowModal from "./BuyNowModal";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { AuthContext } from "../../../App";
import { formatPrice, isFavourite, isInBasket, isInCompare } from "../../../helpers";
import { addToFavoutires, removeFromFavourites } from "../../../features/favourites/favouritesSlice";
import { addToBasket } from "../../../features/basket/basketSlice";
import { useT } from "../../../custom/hooks/useT";
import { addToCompare } from "../../../features/Compares/comparesSlice";
import "./_style.scss";


interface IProductDescription {
  name: string,
  price: number,
  characterAssigns: CharacterAssignsType[],
  description: string,
  short_description: string,
  id: number,
  slug: string,
  brandName: string,
  old_price: number,
  imageUrl: string,
  userSaveProduct?: boolean,
  category_id: number,
  is_treaty: number
}

const ProductDescription = (props: IProductDescription) => {
  const { id, name, brandName, slug, price, old_price, imageUrl, userSaveProduct, short_description, description, characterAssigns, category_id, is_treaty } = props;
  const [isOpenInstallmentModal, setIsOpenInstallmentModal] = useState<boolean>(false);
  const [isOpenBuyNowModal, setIsOpenBuyNowModal] = useState<boolean>(false);
  const onOpenBuyNowModal = () => setIsOpenBuyNowModal(true);
  const onCloseBuyNowModal = () => setIsOpenBuyNowModal(false);

  const dispatch = useAppDispatch();
  const auth = useAppSelector((store) => store.auth);
  const { data: favourites } = useAppSelector((state) => state.favourites);
  const { products } = useAppSelector((state) => state.basket);
  const { compares } = useAppSelector((state) => state.compares);
  let isFavorite = isFavourite(favourites, id);
  let isThereInBasket = isInBasket(products, id);
  let isThereCompare = isInCompare(compares, category_id, id);
  const { onOpenSignInModal } = useContext(AuthContext);
  let product = {
    id,
    name,
    brandName,
    slug,
    price,
    old_price,
    imageUrl,
    userSaveProduct,
    category_id,
    is_treaty,
  }
  const onOpenInstallmentModal = () => {
    if (!isInBasket(products, id)) {
      dispatch(addToBasket({ ...product, count: 1 }))
    }


    setIsOpenInstallmentModal(true);
  }
  const onCloseInstallmentModal = () => setIsOpenInstallmentModal(false);
  const { t, lang } = useT();

  const onFavouriteClick = () => {
    if (auth.authorized) {
      if (isFavorite) {
        dispatch(removeFromFavourites(product));
      } else {
        dispatch(addToFavoutires(product));
      }
    } else {
      onOpenSignInModal();
    }
  };

  const handleAddBasket = () => {
    dispatch(addToBasket({ id, name, brandName, slug, price, old_price, imageUrl, userSaveProduct, count: 1, category_id, is_treaty }))
  }
  const handleAddCompare = () => {
    dispatch(addToCompare({ category_id, id, name }))
  }


  return (
    <div className="product_desc">
      <h2 className="product_name title34_bold">
        {name}
      </h2>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={24}>
          <div className="action_area">
            <h5 className="product_price title20_bold">
              {
                is_treaty !== 1 && (
                  <>
                    {formatPrice(price)} {t(`sum.${lang}`)}
                  </>
                )
              }
            </h5>
            <div className="right">
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
                  <li>
                    <Tooltip placement='top' title={t(`compare.${lang}`)} >
                      <button
                        type='button'
                        onClick={handleAddCompare}
                      >
                        <img src={`/assets/icons/compare-${isThereCompare ? 'red' : 'gray'}.svg`} alt="compare" />
                      </button>
                    </Tooltip>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="button_area">
            <BuyButton text={t(`${is_treaty === 1 ? 'treaty' : 'buyNow'}.${lang}`)} onClick={onOpenBuyNowModal} />
            <BuyButton onClick={onOpenInstallmentModal} text={t(`buyInstallment.${lang}`)} className="checkout" />
          </div>

          {
            description ? (
              <div className="product_desc__area">
                <p className="title20_bold product_desc__area__title">
                  {t(`desc.${lang}`)}
                </p>
                <p className="p14_regular product_desc__area__content" dangerouslySetInnerHTML={{ __html: description }} />

              </div>
            ) : null
          }

          {
            characterAssigns?.length !== 0 && (
              <ProductInfoComp description={characterAssigns} />
            )
          }
        </Col>
      </Row>
      <BuyNowModal product_id={id} isOpenBuyNowModal={isOpenBuyNowModal} onOpenBuyNowModal={onOpenBuyNowModal} onCloseBuyNowModal={onCloseBuyNowModal} />
      <InstallmentModal product={product} isOpenInstallmentModal={isOpenInstallmentModal} onOpenInstallmentModal={onOpenInstallmentModal} onCloseInstallmentModal={onCloseInstallmentModal} />
    </div >
  )
}

export default ProductDescription;
