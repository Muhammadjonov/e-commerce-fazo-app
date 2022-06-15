import React, { useState, useRef } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import "./__style.scss";
import { handleChangePhone } from '../../helpers';

interface IAuthModal {

}

const AuthModal = () => {
  const [form] = Form.useForm();
  const [phone, setPhone] = useState<string>('');


  return (
    <Modal width={620} className={"signup__modal"} visible={false} footer={null} >
      <h3 className="signup__modal__title">
        Войти или создать профиль
      </h3>
      <Form
        layout={"vertical"}
        form={form}
      >
        <Form.Item label="Номер телефона">
          <Input
            value={phone}
            name="tel_number"
            onChange={(e) => handleChangePhone(e, phone, setPhone)}
            placeholder="input placeholder"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item label="Пароль">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item>
          <Button ghost htmlType='submit'>Submit</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AuthModal