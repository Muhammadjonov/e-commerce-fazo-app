import React, { useState } from "react";
import { Modal } from "antd";
import ModalTop from "./ModalTop";
import "./_style.scss";
import ModalBottom from "./ModalBottom";

interface IInstallmentModal {
  isOpenInstallmentModal: boolean,
  onOpenInstallmentModal: () => void,
  onCloseInstallmentModal: () => void,
}

export default function InstallmentModal(props: IInstallmentModal) {

  const { isOpenInstallmentModal, onOpenInstallmentModal, onCloseInstallmentModal } = props;

  const handleOk = () => {
    onCloseInstallmentModal()
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    onCloseInstallmentModal()
  };
  return (
    <Modal
      footer={null}
      className="installment_modal"
      title={
        <p className="installment_modal_title title20_bold">
          Купить в рассрочку
        </p>
      }
      visible={isOpenInstallmentModal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <ModalTop />
      <ModalBottom />
      <div className="installment_Modal_buttons">
        <button className="modal_continue_purchase" onClick={handleCancel}>
          Продолжить покупки
        </button>
        <button className="modal_make_purchase" onClick={handleOk}>
          Оформить покупку
        </button>
      </div>
    </Modal>

  );
}
