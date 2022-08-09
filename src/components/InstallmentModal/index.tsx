import { Button, Collapse, Modal, Radio, Tooltip } from "antd";
import { useT } from "../../custom/hooks/useT";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { ProductType } from "../../types";
import { addToFavoutires, removeFromFavourites } from "../../features/favourites/favouritesSlice";
import { decrement, deleteFromBasket, increment } from "../../features/basket/basketSlice";
import GoodOption from "./GoodOption";
import "./_style.scss";
import { AuthContext } from "../../App";
import { useCallback, useContext, useEffect, useState } from "react";
import { formatPrice, isFavourite } from "../../helpers";
import baseAPI from "../../api/baseAPI";
import { alifShopUrl } from "../../api/apiUrls";
import { Link } from "react-router-dom";

let { Panel } = Collapse;
interface IInstallmentModal {
  isOpenInstallmentModal: boolean,
  onOpenInstallmentModal: () => void,
  onCloseInstallmentModal: () => void,
  product: ProductType
}


export default function InstallmentModal(props: IInstallmentModal) {
  const { t, lang } = useT();
  const { isOpenInstallmentModal, onOpenInstallmentModal, onCloseInstallmentModal, product } = props;
  const dispatch = useAppDispatch();
  const auth = useAppSelector((store) => store.auth);
  const { data: favourites } = useAppSelector((state) => state.favourites);
  const { products, totalPrice, totalProductCount } = useAppSelector((store) => store.basket);
  const { onOpenSignInModal } = useContext(AuthContext);
  const [alifData, setAlifData] = useState<any>();

  const onFavouriteClick = (product: ProductType, isFavorite: boolean) => {
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

  // getAlif data
  const getAlifData = useCallback(() => {
    baseAPI.fetchAll<any>(alifShopUrl)
      .then((res) => {
        setAlifData(res.data.data);
      })
  }, [])

  useEffect(() => {
    getAlifData();
  }, [getAlifData]);

  const handleOk = () => {
    onCloseInstallmentModal();
  };

  const handleCancel = () => {
    onCloseInstallmentModal()
  };
  return (
    <Modal
      footer={null}
      className="installment_modal"
      title={
        <p className="installment_modal_title title20_bold">
          {t(`buyInInstallments.${lang}`)}
        </p>
      }
      visible={isOpenInstallmentModal}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1140}
    >
      <div
        className='modal_top_wrapper'
      >
        {
          products?.map((product) => (
            <div
              className="modal_top_flex_box"
              key={product.id}
            >
              <div className="modal_left_block">
                <Link to={`/product/detail/${product.slug}`}>
                  <div className="product__img">
                    <img src={product.imageUrl} alt={product.name} />
                  </div>
                </Link>
                <div className="modal_name_box">
                  <p className='modal_good_title p18_regular'>{product.name}</p>
                  <p className='modal_good_price title18_bold'>{formatPrice(product.price)} {t(`sum.${lang}`)}</p>
                </div>
              </div>
              <div className="modal_option_block">
                <div className="product__counter__wrapper">
                  <button
                    className="decr"
                    type='button'
                    onClick={() => dispatch(decrement({ id: product.id }))}
                    disabled={product?.count < 2}
                  >
                    -
                  </button>
                  <span className="product__counter__wrapper__total">{product?.count}</span>
                  <button
                    className="incr"
                    type='button'
                    onClick={() => dispatch(increment({ id: product.id }))}
                    disabled={product?.count > 99}
                  >
                    +
                  </button>
                </div>
                <div className="product__action__wrapper">

                  <Tooltip placement='top' title={t(`addToFavourites.${lang}`)} >
                    <button
                      type='button'
                      onClick={() => onFavouriteClick(product, isFavourite(favourites, product.id))}
                    >
                      <img src={`/assets/icons/heart-${isFavourite(favourites, product.id) ? 'red' : 'gray'}.svg`} alt="heart" />
                    </button>
                  </Tooltip>
                  <button
                    type="button"
                    onClick={() => dispatch(deleteFromBasket({ ...product }))}
                  >
                    <img className='delete_icon' src="/assets/icons/delete.svg" alt="outlined_heart" />
                  </button>
                </div>
              </div>

            </div>
          ))
        }

      </div>
      <Radio.Group >
        <Collapse
          className="installment_modal_collapse"
          expandIconPosition={"end"}
          accordion
        >
          <Panel
            header={
              <div
                onClick={(event) => event.stopPropagation()}
                className="good_option_block"
              >

                <Radio value={1} className="installment_radio">
                  <div className="intallment__brand__img">
                    <img src={"/assets/img/alif.png"} alt="alif" />
                  </div>
                </Radio>

                <GoodOption />
              </div>
            }
            key={1}
          >

            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel magni culpa explicabo!
          </Panel>
          <Panel
            header={
              <div
                onClick={(event) => event.stopPropagation()}
                className="good_option_block"
              >

                <Radio value={2} className="installment_radio">
                  <div className="intallment__brand__img">
                    <img src={"/assets/img/alif.png"} alt="alif" />
                  </div>
                </Radio>

                <GoodOption />
              </div>
            }
            key={2}
          >

            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel magni culpa explicabo!
          </Panel>
        </Collapse>
      </Radio.Group>
      <div className="installment_Modal_buttons">
        <Button
          type="link"
          className="modal_continue_purchase"
          onClick={handleCancel}
          size="large"
        >
          {t(`continueShopping.${lang}`)}
        </Button>
        <Button
          type="link"
          className="modal_make_purchase"
          onClick={handleOk}
          size="large"
        >
          {t(`checkout.${lang}`)}
        </Button>
      </div>
    </Modal >

  );
}
