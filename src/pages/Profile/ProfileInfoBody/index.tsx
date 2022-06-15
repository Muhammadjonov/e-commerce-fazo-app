import React, { useState } from 'react'
import { Avatar, Button, Col, Switch } from 'antd'

import "./_style.scss";
import DeleteAddressModal from './DeleteAddressModal';
import AddAddress from './AddAddress';
import { Link } from 'react-router-dom';


const ProfileInfoBody = () => {

  const handleOnChangeNotif = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  }

  return (
    <>
      <Col lg={12}>
        <div className="personal_data bordered_card">
          <div className="top">

            <div className="left">
              <Avatar icon={<img src='/assets/icons/user.svg' alt="user" />} />
              <span className="text">
                Личные данные
              </span>
            </div>
            <Link to="/profile/personal-data" className="change_profile_btn">
              Изменит
            </Link>
          </div>

          <div className="body">
            <h5 className="user_title">
              Shukurillo Tojinazarov
            </h5>
            <p className="tel_number"><span>Телефон:</span>+998 99 0333848</p>
          </div>

        </div>
      </Col>
      <Col lg={12}>
        <div className="notifications bordered_card">
          <div className="top">
            <div className="left">
              <Avatar icon={<img src='/assets/icons/mail.svg' alt="user" />} />
              <span className="text">
                Уведомления
              </span>
            </div>
          </div>
          <div className="body">
            <h5 className="notif_title">
              Получать информацию об акциях и скидках
            </h5>

            <div className="switch_notif">
              <Switch onChange={handleOnChangeNotif} /><span className="notif_text">
                По SMS
              </span>
            </div>
          </div>
        </div>
      </Col>
      <Col lg={12}>
        <div className="my_cards bordered_card">
          <div className="top">
            <div className="left">
              <Avatar icon={<img src='/assets/icons/credit-card.svg' alt="user" />} />
              <span className="text">
                Моя карта
              </span>
            </div>
          </div>
          <div className="body">
            <p className="card_text">
              Отсутствует
            </p>
          </div>
        </div>

      </Col>
      <Col lg={12}>
        <div className="add_address bordered_card">
          <div className="top">
            <div className="left">
              <Avatar icon={<img src='/assets/icons/truck.svg' alt="truck" />} />
              <span className="text">
                Адрес доставки
              </span>
            </div>
            <Button className="add_address_btn" ghost>
              Добавить
            </Button>
          </div>
          <div className="body">

            <div className="address_wrap">
              <div className="address_item">
                <p className="address_top">
                  Адрес по умолчанию
                </p>
                <div className="address_name">
                  <p className="title">
                    Адрес:
                  </p>
                  <p className="address_value">
                    Дом: 0 дом №Konizar mfy kvartira №62-uy
                  </p>

                </div>

                <div className="address_btn_area">
                  <span className="edit_address_btn">
                    Редактировать
                  </span>
                  <button onClick={DeleteAddressModal} type="button" className="delete_address_btn">
                    <i className="fa-regular fa-trash-can"></i>
                  </button>

                </div>
              </div>
            </div>

            <AddAddress />

            {/* <ChangeAddress /> */}

          </div>
        </div>
      </Col>
    </>
  )
}

export default ProfileInfoBody