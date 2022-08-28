
import { Button, Collapse, Modal, Radio, RadioChangeEvent, Select, Tooltip } from "antd";
import { useT } from "../../custom/hooks/useT";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { AlifInfoType, AlifResType, IntendInfoType, IntendResType, ProductType } from "../../types";
import { addToFavoutires, removeFromFavourites } from "../../features/favourites/favouritesSlice";
import { decrement, deleteFromBasket, increment, ProductTypeBasket } from "../../features/basket/basketSlice";
import { AuthContext, InstallmentDataType } from "../../App";
import { useCallback, useContext, useEffect, useState } from "react";
import { formatPrice, isFavourite } from "../../helpers";
import baseAPI from "../../api/baseAPI";
import { alifShopUrl, intendUrl } from "../../api/apiUrls";
import { Link, useLocation } from "react-router-dom";
import "./_style.scss";

let { Panel } = Collapse;
interface IInstallmentModal {
  isOpenInstallmentModal: boolean,
  onCloseInstallmentModal: () => void,
  installmentData: InstallmentDataType,
  setInstallmentData: React.Dispatch<React.SetStateAction<InstallmentDataType>>
}


let { Option } = Select;

export default function InstallmentModal(props: IInstallmentModal) {
  let { pathname } = useLocation();
  const { t, lang } = useT();
  const { isOpenInstallmentModal, onCloseInstallmentModal, installmentData, setInstallmentData } = props;
  const dispatch = useAppDispatch();
  const auth = useAppSelector((store) => store.auth);
  const { data: favourites } = useAppSelector((state) => state.favourites);
  const { products, totalPrice, totalProductCount } = useAppSelector((store) => store.basket);
  const { onOpenSignInModal } = useContext(AuthContext);

  const [alifData, setAlifData] = useState<AlifInfoType[]>([]);
  const [intendData, setIntendData] = useState<IntendInfoType[]>([]);
  const [isAlifDataLoading, setIsAlifDataLoading] = useState<boolean>(true);
  const [month12, setMonth12] = useState<AlifInfoType>({} as AlifInfoType)

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
    setIsAlifDataLoading(true);
    baseAPI.fetchAll<AlifResType>(alifShopUrl)
      .then((res) => {
        setAlifData(res.data?.data);
        let month12 = res.data?.data?.find(item => item.month === 12)!
        setMonth12(month12);
        setIsAlifDataLoading(false);
        setInstallmentData(prev => ({ ...prev, alifAmount: month12?.amount, alifMonth: month12?.month, alifMonthId: month12?.id, installment: "1" }))
      })
      .catch((e) => {
        console.log("err", e);
      })
      .finally(() => {
        setIsAlifDataLoading(false);
      })
  }, [])
  // getIntend data 
  let productIds = products.map((product) => product.id)

  const getIntendData = useCallback(() => {
    console.log("ids", productIds)
    baseAPI.create<IntendResType>(intendUrl, { ids: productIds })
      .then((res) => {
        if (res.data.status === 200) {
          setIntendData(res.data.data);
        }
      })
      .catch((e) => console.log("err", e))
      .finally(() => {

      })
  }, [])

  useEffect(() => {
    getAlifData();
    getIntendData()
  }, [getAlifData, getIntendData]);

  const handleOk = () => {
    onCloseInstallmentModal();
  };

  const handleCancel = () => {
    onCloseInstallmentModal()
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setInstallmentData(prev => ({ ...prev, installment: e.target.value }));
  }
  // alif
  const handleAlifSelectChange = (value: any) => {
    let values = value.split(",");
    setInstallmentData(prev => ({ ...prev, alifMonthId: +values[0], alifAmount: +values[1], alifMonth: values[2] }))
  };

  // delete product

  const deleteFrBasket = (product: ProductTypeBasket) => {
    if (pathname === "/checkout") {
      if (products.length > 1) {
        dispatch(deleteFromBasket({ ...product }))
      }
    } else {
      dispatch(deleteFromBasket({ ...product }))
    }
  }

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
                    onClick={() => deleteFrBasket(product)}
                  >
                    <img className='delete_icon' src="/assets/icons/delete.svg" alt="outlined_heart" />
                  </button>
                </div>
              </div>

            </div>
          ))
        }

      </div>

      <Radio.Group onChange={onChange} value={installmentData.installment} >
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
                {
                  !isAlifDataLoading && (
                    <Radio value={"1"} className="installment_radio">
                      <div className="intallment__brand__img">
                        <img src={"/assets/img/alif.png"} alt="alif" />
                      </div>
                      <Select
                        className="installment_selector_periud"
                        placeholder="Срок рассрочки"
                        onChange={handleAlifSelectChange}
                        defaultValue={`${month12?.id},${month12?.amount},${month12?.month}`}
                      >
                        {
                          alifData?.map((item) => (
                            <Option key={item.id} value={`${item.id},${item.amount},${item.month}`}>{item.name}</Option>
                          ))
                        }
                      </Select>
                      {
                        lang === "ru" ? (
                          <p className="good_option_installment title20_bold">
                            {formatPrice((totalPrice * ((100 + (installmentData.alifAmount ?? 0)) / 100)) / (installmentData.alifMonth ?? 1))} cум / месяц
                          </p>
                        ) : (
                          <p className="good_option_installment title20_bold">
                            oyiga {formatPrice((totalPrice * ((100 + (installmentData.alifAmount ?? 0)) / 100)) / (installmentData.alifMonth ?? 1))} so'm
                          </p>
                        )
                      }

                    </Radio>
                  )
                }
              </div>
            }
            key={1}
          >
            <div className="installment__content">
              <p className="installment__content__text">
                {t(`conInstallPays.${lang}`)}
              </p>
              <h4 className="installment__content__title">
                {t(`installAmount.${lang}`)}
              </h4>
              <div className="installment__content__item">
                <p className="item__title">
                  {t(`termMonth.${lang}`)}
                </p>
                <p className="item__value">
                  {installmentData.alifMonth ?? ""}
                </p>
              </div>
              <div className="installment__content__item">
                <p className="item__title">
                  {t(`monthlyPayment.${lang}`)}
                </p>
                {
                  lang === "ru" ? (
                    <p className="item__value">
                      {formatPrice((totalPrice * ((100 + (installmentData.alifAmount ?? 0)) / 100)) / (installmentData.alifMonth ?? 1))} cум / месяц
                    </p>
                  ) : (
                    <p className="item__value">
                      oyiga {formatPrice((totalPrice * ((100 + (installmentData.alifAmount ?? 0)) / 100)) / (installmentData.alifMonth ?? 1))} so'm
                    </p>
                  )
                }
              </div>
              <div className="installment__content__item">
                <p className="item__title">
                  {t(`amountTotalPay.${lang}`)}
                </p>
                <p className="item__value">
                  {formatPrice((totalPrice * ((100 + (installmentData.alifAmount ?? 0)) / 100)))} {t(`sum.${lang}`)}
                </p>
              </div>

            </div>
          </Panel>

        </Collapse >
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
        <Link to={`/checkout?${new URLSearchParams({ type: installmentData.installment, monthId: installmentData?.alifMonthId?.toString() ?? "", duration: installmentData.installment === "1" ? installmentData?.alifMonth?.toString() ?? "" : installmentData?.intendMonth?.toString() ?? "" })}`}>
          <Button
            type="link"
            className="modal_make_purchase"
            onClick={handleOk}
            size="large"
          >
            {t(`checkout.${lang}`)}
          </Button>
        </Link>
      </div>
    </Modal >

  );
}
