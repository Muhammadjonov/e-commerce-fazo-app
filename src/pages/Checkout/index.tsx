import React, { useState } from 'react'
import { Col, Row, Radio, Space, Divider, Button } from 'antd';
import BreadcrumbComp from '../../components/BreadcrumbComp';
import { useForm, SubmitHandler } from "react-hook-form";
import "./_style.scss";
import InputComp from '../../components/Form/InputComp';
import TopTitleArea from './TopTitleArea';
import OutlineBtn from '../../components/Buttons/OutlineBtn';
import OrderCard from './OrderCard';
import type { RadioChangeEvent } from 'antd';
import SelectComp from '../../components/Form/SelectComp';
import DatePickerComp from '../../components/Form/DatePickerComp';

const breadcrumbs = [
  {
    id: "1",
    toUrl: "/",
    text: "Главная",
  },
  {
    id: "2",
    toUrl: "#",
    text: "Оформить покупку",
  }
];

const orderData = {
  id: "1",
  img: "/assets/img/order_1.png",
  name: "Galaxy A03 Core 2/32Gb Black",
  count: "1 шт",
  price: "1 334 000 cум"
}

type checkoutType = {

}

const Checkout = () => {

  const { control, register, handleSubmit, watch, formState: { errors } } = useForm<checkoutType>();
  const onSubmit: SubmitHandler<checkoutType> = data => console.log(data);

  // payment types

  const [paymentType, setPaymenType] = useState(1);

  const onPaymentChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setPaymenType(e.target.value);
  };


  return (
    <section className='checkout_wrapper'>
      <div className="container">
        <div className="checkout_breadcrumb_area">
          <BreadcrumbComp breadcrumbs={breadcrumbs} />
        </div>
        <div className="checkout_body">
          <form className="checkout_form" onSubmit={handleSubmit(onSubmit)}>
            <Row gutter={[30, 30]}>
              <Col md={17} sm={24} xs={24}>
                <div className="checkout_form_wrapper">
                  <h3 className="checkout_form_title title28_bold">
                    Оформить покупку
                  </h3>
                  {/* personal data */}

                  <div className="your_data">
                    <TopTitleArea number={"1"} title={"Ваши данные"} />

                    <div className="your_data__input__wrapper">
                      <InputComp name="tel_number" label={"Телефон"} register={register} errors={errors} required={true} />
                    </div>
                  </div>
                  <div className="your_data__inputs__wrapper">
                    <InputComp name="name" label={"Имя"} register={register} errors={errors} required={true} />
                    <InputComp name="surname" label={"Фамилия"} register={register} errors={errors} required={true} />
                  </div>

                  {/* your orders */}
                  <div className="your__orders">
                    <div className="your__orders__top">
                      <TopTitleArea number={"2"} title={"Ваш заказ"} />
                      <OutlineBtn text={"Изменить"} />
                    </div>

                    <OrderCard {...orderData} />
                  </div>

                  {/* paynemt types */}
                  <div className="payment__types">
                    <TopTitleArea number={"3"} title="Выберите способ оплаты" />

                    <Radio.Group className="payment__types__radios" onChange={onPaymentChange} value={paymentType}>
                      <Space style={{ width: "100%" }} size={[0, 15]} direction="vertical">
                        <Radio value={1}>Оплата через Payme </Radio>
                        <Radio value={2}>Онлайн оплата по карте UZCARD и HUMO
                        </Radio>
                        <Radio value={3}>Наличными при получении</Radio>
                        <Radio value={4}>Рассрочка</Radio>
                      </Space>
                    </Radio.Group>

                  </div>

                  {/* how to obtain */}

                  <div className="howto__obtain">
                    <TopTitleArea number={"4"} title={"Способ получения"} />
                    <label className="howto__obtain__label" htmlFor="">Ваш город</label>
                    <Radio className="city" id="city">Ташкент<span className='city__text'>Доставка Fazo</span></Radio>

                    <label htmlFor="" className="howto__obtain__label">Укажите адрес доставки</label>

                    <div className="howto__obtain__selects">
                      <SelectComp label={"Регион / Область*"} name="region" register={register} errors={errors} control={control} />
                      <SelectComp label={"Город  / Район*"} name="district" register={register} errors={errors} control={control} />
                    </div>
                    <div className="howto__obtain__address">
                      <InputComp name="address" label={"Адрес"} register={register} errors={errors} required={true} />
                      <InputComp name="flat_layer" label={"Этаж"} register={register} errors={errors} required={true} />
                    </div>
                    <div className="howto__obtain__date">
                      <DatePickerComp label={"Дата доставки"} name="district" register={register} errors={errors} control={control} />
                    </div>
                  </div>

                </div>
              </Col>
              <Col md={7} sm={24} xs={24}>
                <div className="checkout__from__right">
                  <h3 className="title18_bold checkout__from__right__title">
                    Ваши данные
                  </h3>

                  <div className="checkout__from__right__block">
                    <p className="p16_regular">
                      4 товара на сумму
                    </p>
                    <h3 className="title18_bold">
                      5 262 000 cум
                    </h3>
                  </div>

                  <div className="checkout__from__right__block">
                    <p className="p16_regular">
                      Доставка
                    </p>
                    <h3 className="title18_bold">
                      бесплатно
                    </h3>
                  </div>
                  <Divider />

                  <div className="checkout__from__right__block">
                    <p className="p16_regular">
                      Всего к оплате
                    </p>
                    <h3 className="title18_bold">
                      5 262 000 cум
                    </h3>
                  </div>

                  <Button className="checkout__from__right__submit__btn" htmlType='submit' ghost block>Оформить покупку</Button>


                  <p className="p16_regular checkout__from__right__accept__terms">
                    Подтверждая заказ, я принимаю условия <br />
                    <a className="checkout__from__right__accept__terms__link" href="http://" target="_blank" rel="noopener noreferrer">Пользовательского соглашения</a>
                  </p>
                </div>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Checkout