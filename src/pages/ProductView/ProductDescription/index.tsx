import { Col, Row } from "antd";
import ProductInfoComp from "./ProductInfoComp";
import BuyButton from "./BuyButton";
import "./_style.scss";
import { useState } from "react";
import InstallmentModal from "../../../components/InstallmentModal";

const productInfoData = [
  {
    id: "1",
    title: "Технические параметры",
    description: [
      {
        id: "1",
        desc_name: "Название",
        desc: "MacBook Pro 13 MXK32ZP/A Space Gray",
      },
      {
        id: "2",
        desc_name: "Состояние",
        desc: "Новый",
      },
      {
        id: "3",
        desc_name: "Технические параметры",
        desc: "MacBook Pro 13 MXK32ZP/A Space Gray",
      },

    ]
  },
  {
    id: "2",
    title: "Технические параметры",
    description: [
      {
        id: "1",
        desc_name: "Название",
        desc: "MacBook Pro 13 MXK32ZP/A Space Gray",
      },
      {
        id: "2",
        desc_name: "Состояние",
        desc: "Новый",
      },
      {
        id: "3",
        desc_name: "Технические параметры",
        desc: "MacBook Pro 13 MXK32ZP/A Space Gray",
      },

    ]
  }

]

const ProductDescription = () => {

  const [isOpenInstallmentModal, setIsOpenInstallmentModal] = useState<boolean>(false);

  const onOpenInstallmentModal = () => setIsOpenInstallmentModal(true);
  const onCloseInstallmentModal = () => setIsOpenInstallmentModal(false);

  return (
    <div className="product_desc">
      <h2 className="product_name title36_bold">
        MacBook Pro 13 MXK32ZP/A Space Gray
      </h2>
      <Row gutter={[16, 16]}>
        <Col sm={20}>
          <div className="action_area">
            <h5 className="product_price title20_bold">
              16 559 000 cум <img src="/assets/icons/info.svg" alt="info" />
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
            <BuyButton text="Купить сейчас" />
            <BuyButton onClick={onOpenInstallmentModal} text="Купить в рассрочку сейчас" className="checkout" />
          </div>

          <div className="title_contact">
            <p className="p14_regular left">
              Название для договора
            </p>
            <p className="p14_regular right">
              MacBook Pro 13 MXK32ZP/A Space Gray Full HD 1920x1080 IPS / Core™ i7-1165G7 / 8GB RAM / 256GB SSD
            </p>
          </div>

          {
            productInfoData.map(info => (
              <ProductInfoComp key={info.id} {...info} />
            ))
          }

        </Col>
      </Row>

      <InstallmentModal isOpenInstallmentModal={isOpenInstallmentModal} onOpenInstallmentModal={onOpenInstallmentModal} onCloseInstallmentModal={onCloseInstallmentModal} />
    </div>
  )
}

export default ProductDescription;
