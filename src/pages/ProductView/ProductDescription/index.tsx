import { Col, Row } from "antd";
import ProductInfoComp from "./ProductInfoComp";
import BuyButton from "./BuyButton";
import "./_style.scss";
import { useState } from "react";
import InstallmentModal from "../../../components/InstallmentModal";
import { CharacterAssignsType } from "../../../types";
import BuyNowModal from "./BuyNowModal";


interface IProductDescription {
  name: string,
  price: number | null,
  characterAssigns: CharacterAssignsType[],
  description: string,
  short_description: string,
  id: number
}

const ProductDescription = (props: IProductDescription) => {

  const [isOpenInstallmentModal, setIsOpenInstallmentModal] = useState<boolean>(false);
  const [isOpenBuyNowModal, setIsOpenBuyNowModal] = useState<boolean>(false);

  const onOpenInstallmentModal = () => setIsOpenInstallmentModal(true);
  const onCloseInstallmentModal = () => setIsOpenInstallmentModal(false);

  const onOpenBuyNowModal = () => setIsOpenBuyNowModal(true);
  const onCloseBuyNowModal = () => setIsOpenBuyNowModal(false);



  const { name, price, characterAssigns, description, short_description, id } = props;

  return (
    <div className="product_desc">
      <h2 className="product_name title36_bold">
        {name}
      </h2>
      <Row gutter={[16, 16]}>
        <Col>
          <div className="action_area">
            <h5 className="product_price title20_bold">
              {price} cум <img src="/assets/icons/info.svg" alt="info" />
            </h5>
            <div className="right">
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
            </div>
          </div>

          <div className="vip_discount">
            <img src="/assets/icons/vip_discount.svg" alt="discount" />
            <span className="vip_discount_text p16_regular">
              VIP скидки для VIP клиентов
            </span>
          </div>

          <div className="button_area">
            <BuyButton text="Купить сейчас" onClick={onOpenBuyNowModal} />
            <BuyButton onClick={onOpenInstallmentModal} text="Купить в рассрочку сейчас" className="checkout" />
          </div>

          <div className="title_contact">
            <p className="p14_regular left">
              Название для договора
            </p>
            <p className="p14_regular right">
              {short_description}
            </p>
          </div>
          {
            characterAssigns?.length !== 0 && (
              <ProductInfoComp description={characterAssigns} />
            )
          }
        </Col>
      </Row>
      <BuyNowModal product_id={id} isOpenBuyNowModal={isOpenBuyNowModal} onOpenBuyNowModal={onOpenBuyNowModal} onCloseBuyNowModal={onCloseBuyNowModal} />
      <InstallmentModal isOpenInstallmentModal={isOpenInstallmentModal} onOpenInstallmentModal={onOpenInstallmentModal} onCloseInstallmentModal={onCloseInstallmentModal} />
    </div>
  )
}

export default ProductDescription;
