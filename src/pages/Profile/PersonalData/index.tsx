import React from 'react';
import { Col } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import "./_style.scss";
import InputComp from '../../../components/Form/InputComp';

const PersonalData = () => {
  let navigate = useNavigate();
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { name: "Shermuhammad", surname: "Muxammadjonov", tel_number: "+998 (90) 363-97-00" },
  });
  const onSubmit = (data: any) => console.log("data", data);

  // console.log(watch("home")); // watch input value by passing the name of it

  return (
    <Col lg={12}>
      <div className="personal_data_card">
        <button onClick={() => navigate(-1)} className="back_link"><i className="fa-solid fa-angle-left"></i>Назад</button>

        <h3 className="personal_data_title title24_bold">
          Персональные данные
        </h3>

        <form className="personal_form" onSubmit={handleSubmit(onSubmit)}>

          <InputComp label="Ваше имя" name="name" register={register} errors={errors} required={true} />
          <InputComp label="Ваша фамилия" name="surname" register={register} errors={errors} required={true} />
          <InputComp label="Отчество" name="father_name" register={register} errors={errors} />

          <InputComp label="Номер телефона" name="tel_number" register={register} errors={errors} required={true} disabled={true} />

          <div className="change_password_wrapper">
            <h5 className="change_password_title title20_bold">
              Новый пароль
            </h5>

            <div className="change_password_inputes">
              <InputComp label="Пароль" name="password" register={register} errors={errors} type="password" />
              <InputComp label="Подтвердить пароль" name="repassword" register={register} errors={errors} type="password" />
            </div>

          </div>

        </form>
      </div>
    </Col>
  )
}

export default PersonalData