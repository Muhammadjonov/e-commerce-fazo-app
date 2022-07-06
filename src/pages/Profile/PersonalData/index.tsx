import React, { useState } from 'react';
import { Button, Col, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import "./_style.scss";
import InputComp from '../../../components/Form/InputComp';
import { setUser } from '../../../features/authSlice';
import { useAppSelector } from '../../../Store/hooks';
import baseAPI from '../../../api/baseAPI';
import { profileUpdateUrl } from '../../../api/apiUrls';
import { setUserToLocalStorage } from '../../../helpers';
import { useDispatch } from 'react-redux';
import { useT } from '../../../custom/hooks/useT';

const PersonalData = () => {
  const { t, lang } = useT();
  let navigate = useNavigate();
  const [profileUpdateErr, setProfileUpdateErr] = useState<string>("");
  const { user } = useAppSelector(state => state.auth)
  const dispatch = useDispatch();

  const { first_name, last_name, username, middle_name } = user;;


  const { register, control, handleSubmit, watch, formState: { errors } } = useForm(user ? {
    defaultValues: {
      first_name, last_name, username: `+${username}`, middle_name
    }
  } : {});

  const onSubmit = (data: any) => {
    baseAPI.create<any>(profileUpdateUrl, data)
      .then((res) => {
        if (res.data.status === 200) {
          dispatch(setUser(res.data));
          setUserToLocalStorage(res.data.data);
          message.success("Ma'lumotlaringiz muvaffaqiyatli yangilandi");
        } else if (res.data.status === 403) {
          setProfileUpdateErr(res.data?.message)
        }
      })
      .catch((err) => {

      })
  }
  // console.log(watch("home")); // watch input value by passing the name of it
  return (
    <Col lg={12}>
      <div className="personal__data__card">
        <button onClick={() => navigate(-1)} className="personal__data__card__back__link"><i className="fa-solid fa-angle-left"></i>{t(`back.${lang}`)}</button>

        <h3 className="personal__data__card__title title24_bold">
          {t(`personalData.${lang}`)}
        </h3>

        <form className="personal__data__card__form" onSubmit={handleSubmit(onSubmit)}>

          <InputComp label={t(`yourFirstName.${lang}`)} name="first_name" register={register} errors={errors} required={false} />
          <InputComp label={t(`yourLastName.${lang}`)} name="last_name" register={register} errors={errors} required={true} />
          <InputComp label={t(`yourMiddleName.${lang}`)} name="middle_name" register={register} errors={errors} required={false} />

          <InputComp label={t(`phoneNumber.${lang}`)} name="username" register={register} errors={errors} required={true} disabled={true} />

          <div className="personal__data__card__form__change__psw">
            <h5 className="personal__data__card__form__change__psw__title title20_bold">
              {t(`newPassword.${lang}`)}
            </h5>

            <div className="personal__data__card__form__change__psw__input">
              <InputComp label={t(`password.${lang}`)} name="password" register={register} errors={errors} type="password" required={false} />
              <InputComp label={t(`repeatPassword.${lang}`)} name="password_repeat" register={register} errors={errors} type="password" required={false} />
            </div>
          </div>
          <span className="personal__data__card__form__error">{profileUpdateErr}</span>
          <Button className="personal__data__card__form__submitbtn" htmlType='submit' block>{t(`save.${lang}`)}</Button>
        </form>
      </div>
    </Col>
  )
}

export default PersonalData