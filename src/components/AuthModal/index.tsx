import React, { useState, useRef } from 'react';
import { Button, Form, Input, Modal, Steps } from 'antd';
import "./__style.scss";
import { handleChangePhone } from '../../helpers';
import { Link } from 'react-router-dom';

const { Step } = Steps;
interface IAuthModal {

}

const AuthModal = () => {
  const [form] = Form.useForm();
  const [phone, setPhone] = useState<string>('');


  return (
    <>
      <Modal width={550} className={"signin__modal"} visible={false} footer={null} >
        <h3 className="signin__modal__title">
          Войти или создать профиль
        </h3>
        <Form
          layout={"vertical"}
          form={form}
          className="signin__modal__form"
        >
          <Form.Item label="Номер телефона">
            <Input
              value={phone}
              name="tel_number"
              onChange={(e) => handleChangePhone(e, phone, setPhone)}
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item label="Пароль">
            <Input
              autoComplete='off'
            />
          </Form.Item>
          <Form.Item className="signin__modal__form__recover__wrapper">
            <Link
              to={"#"}
              className="signin__modal__form__recover__wrapper__password"
            >
              Забыли пароль?
            </Link>
          </Form.Item>
          <Form.Item>
            <Button className="signin__modal__form__submit__btn" block ghost htmlType='submit'>ВОЙТИ</Button>
          </Form.Item>
          <Form.Item>
            <Button className="signin__modal__form__signup__btn" block ghost type='link'>ЗАРЕГИСТРИРОВАТЬСЯ</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal width={550} className={"signup__modal"} visible={false} footer={null} >
        <h3 className="signup__modal__title">
          Создание аккаунта
        </h3>
        <Steps current={0} className={"signup__modal__steps"}>
          <Step />
          <Step />
          <Step />
        </Steps>
        <Form
          layout={"vertical"}
          form={form}
          className="signup__modal__form"
        >
          <Form.Item label="Номер телефона">
            <Input
              value={phone}
              name="tel_number"
              onChange={(e) => handleChangePhone(e, phone, setPhone)}
              autoComplete="off"
            />
          </Form.Item>
          {/* <Form.Item label="Пароль">
            <Input
              autoComplete='off'
            />
          </Form.Item> */}
          <Form.Item className={"signup__modal__form__btn__wrapper"}>
            <Button className="signup__modal__form__btn__wrapper__submit__btn" ghost htmlType='submit'>Далее</Button>
          </Form.Item>
          {/* <Form.Item>
            <Button className="signup__modal__form__signup__btn" block ghost type='link'>ЗАРЕГИСТРИРОВАТЬСЯ</Button>
          </Form.Item> */}
        </Form>
      </Modal>

    </>

  )
}

export default AuthModal