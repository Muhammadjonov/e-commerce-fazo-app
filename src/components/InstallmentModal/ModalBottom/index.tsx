// refactorInstallment;
import React, { useState } from "react";
import { Collapse } from "antd";
import { Radio } from "antd";
import GoodOption from "./GoodOprion";
import "./_style.scss";
// import { title } from "process";

const { Panel } = Collapse;
const modalCollapseData = [
  { id: 1, img: "/assets/icons/Logo.svg" },
  { id: 2, img: "/assets/icons/Logo.svg" },
  { id: 3, img: "/assets/icons/Logo.svg" },
];
const modalInstallmentData = [
  {
    id:"1",
    title: "Member Military",
    prepayment: "от  0%",
    cashback: "1%",
    maximumAmountOwed: "15 000 000 сум",
    transitionPeriodToTheCard: "4 месяца",
    img: "/assets/icons/card.svg",
  },
  {
    id:"2",
    title: "Member Military",
    prepayment: "от  0%",
    cashback: "1%",
    maximumAmountOwed: "15 000 000 сум",
    transitionPeriodToTheCard: "4 месяца",
    img: "/assets/icons/card.svg",
  },
  {
    id:"3",
    title: "Member Military",
    prepayment: "от  0%",
    cashback: "1%",
    maximumAmountOwed: "15 000 000 сум",
    transitionPeriodToTheCard: "4 месяца",
    img: "/assets/icons/card.svg",
  },
  {
    id:"4",
    title: "Member Military",
    prepayment: "от  0%",
    cashback: "1%",
    maximumAmountOwed: "15 000 000 сум",
    transitionPeriodToTheCard: "4 месяца",
    img: "/assets/icons/card.svg",
  },
  {
    id:"5",
    title: "Member Military",
    prepayment: "от  0%",
    cashback: "1%",
    maximumAmountOwed: "15 000 000 сум",
    transitionPeriodToTheCard: "4 месяца",
    img: "/assets/icons/card.svg",
  },
  {
    id:"6",
    title: "Member Military",
    prepayment: "от  0%",
    cashback: "1%",
    maximumAmountOwed: "15 000 000 сум",
    transitionPeriodToTheCard: "4 месяца",
    img: "/assets/icons/card.svg",
  },
  {
    id:"7",
    title: "Member Military",
    prepayment: "от  0%",
    cashback: "1%",
    maximumAmountOwed: "15 000 000 сум",
    transitionPeriodToTheCard: "4 месяца",
    img: "/assets/icons/card.svg",
  },
  {
    id:"8",
    title: "Member Military",
    prepayment: "от  0%",
    cashback: "1%",
    maximumAmountOwed: "15 000 000 сум",
    transitionPeriodToTheCard: "4 месяца",
    img: "/assets/icons/card.svg",
  },
];

export default function ModalBottom() {
  const [value, setValue] = useState(1);
  const onChange = (e?: any) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <>
     
        <Collapse
          className="installment_modal_collapse"
          expandIconPosition={"right"}
          accordion
        > 
        {modalCollapseData.map((data) => (
          <Panel
            header={
              <div
                onClick={(event) => event.stopPropagation()}
                className="good_option_block"
              >
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={data.id} className="installment_radio">
                    <img src={data.img} alt="" />
                  </Radio>
                </Radio.Group>
                <GoodOption />
              </div>
            }
            key={data.id}
            className="installment_modal_collapse_modal"
          >
            <p className="p16_regular installment_modal_text">
              При первой покупке товара, каждый клиент получает карту Start
            </p>
            <p className="modal_installment_mest_text">По карте</p>
            <Collapse
                className="modal_nest_block"
                expandIconPosition={"right"}
                accordion
              >
            
            {modalInstallmentData.map((data) => (
              <Panel
                header={
                  <div className="modal_nestCollapse_title">
                    <img className="modal_card_img" src={data.img} alt="" />
                    <span>{data.title}</span>
                  </div>
                }
                key={data.id}
                className="modal_nest_panel"
              >
                <div className="card_info_box">
                  <div className="card_info_item">
                    <p className="info_card_text p14_regular">Предоплата</p>
                    <div className="card_info_text_right">
                      <p className="info_card_text p14_regular">
                        {data.prepayment}
                      </p>
                    </div>
                  </div>
                  <div className="card_info_item">
                    <p className="info_card_text p14_regular">Кешбэк</p>
                    <div className="card_info_text_right">
                      <p className="info_card_text p14_regular">
                        {data.cashback}
                      </p>
                    </div>
                  </div>
                  <div className="card_info_item">
                    <p className="info_card_text p14_regular">
                      Максимальная сумма задолженности
                    </p>
                    <div className="card_info_text_right">
                      <p className="info_card_text p14_regular">
                        {data.maximumAmountOwed}
                      </p>
                    </div>
                  </div>
                  <div className="card_info_item">
                    <p className="info_card_text p14_regular">
                      Срок перехода на карту
                    </p>
                    <div className="card_info_text_right">
                      <p className="info_card_text p14_regular">
                        {data.transitionPeriodToTheCard}
                      </p>
                    </div>
                  </div>
                </div>
              </Panel>
          ))}
            </Collapse>
          </Panel>
           ))}
        </Collapse>
    
    </>
  );
}
