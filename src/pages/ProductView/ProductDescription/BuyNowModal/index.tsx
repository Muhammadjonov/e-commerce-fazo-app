import { Button, Form, Input, message, Modal } from 'antd'
import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2';
import { buyNowUrl } from '../../../../api/apiUrls';
import baseAPI from '../../../../api/baseAPI';
import NotificationComp from '../../../../components/NotificationComp';
import { useT } from '../../../../custom/hooks/useT';
import { useAppSelector } from '../../../../Store/hooks';
import "./__style.scss";


interface IBuyNowModal {
  isOpenBuyNowModal: boolean,
  onOpenBuyNowModal: () => void,
  onCloseBuyNowModal: () => void,
  product_id: number
}

const BuyNowModal = (props: IBuyNowModal) => {
  const { t, lang } = useT();
  const { user } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [formErr, setFormErr] = useState<string>("")
  const { isOpenBuyNowModal, onOpenBuyNowModal, onCloseBuyNowModal, product_id } = props;
  let formData = new FormData();

  const [form] = Form.useForm();

  const handleOk = () => {
    onCloseBuyNowModal()
  };

  const handleCancel = () => {
    onCloseBuyNowModal();
    form.resetFields();
    setFormErr("");
  };

  const onFinishBuyNow = (values: any) => {
    const { full_name, phone } = values;
    formData.append("full_name", full_name);
    formData.append("phone", phone);
    formData.append("product_id", product_id.toString());

    setIsLoading(true);
    baseAPI.create<any>(buyNowUrl, formData)
      .then((res) => {
        if (res.data.status === 200) {
          setIsLoading(false);
          NotificationComp(t(`buyNowNotif1.${lang}`), t(`buyNowNotif2.${lang}`), "top")
          handleCancel();
        }
        else if (res.data.status === 403) {
          setFormErr(res.data?.message);
        }
      })
      .catch((err) => {
        console.log("err", err);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      })

  }

  return (
    <Modal
      title={t(`checkout.${lang}`)}
      visible={isOpenBuyNowModal}
      onOk={handleOk}
      onCancel={handleCancel}
      className="buy__now__modal"
      footer={null}
    >
      <Form
        layout={"vertical"}
        form={form}
        className="buy__now__modal__form"
        onFinish={onFinishBuyNow}
        initialValues={{ phone: user?.username }}
      >
        <Form.Item label={t(`yourFirstName.${lang}`)}
          name="full_name"
          rules={[{ required: true }]}
          className="buy__now__modal__form__fullname"
        >
          <Input placeholder={t(`yourFirstName.${lang}`)} />
        </Form.Item> <Form.Item label={t(`phoneNumber.${lang}`)}
          name="phone"
          rules={[{ required: true }]}
          className="buy__now__modal__form__phone"
        >
          <PhoneInput
            country={'uz'}
            onlyCountries={['uz']}
            countryCodeEditable={false}
            disableDropdown={true}
          />
        </Form.Item>
        <span className="buy__now__from__err">{formErr}</span>
        <div className="buy__now__modal__form__btns">
          <Button
            onClick={handleCancel}
            type='link'
          >
            {t(`cancel.${lang}`)}
          </Button>
          <Button
            type="primary"
            htmlType='submit'
            loading={isLoading}
          >
            {t(`checkout.${lang}`)}
          </Button>
        </div>

      </Form>
    </Modal>
  )
}

export default BuyNowModal