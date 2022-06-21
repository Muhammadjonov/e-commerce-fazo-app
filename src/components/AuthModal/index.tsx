import React, { useState, useContext } from 'react';
import { Button, Form, Input, Modal, Steps } from 'antd';
import "./__style.scss";
import { handleChangePhone, setToken, setUserToLocalStorage } from '../../helpers';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../App';
import baseAPI from '../../api/baseAPI';
import { enterPhoneUrl, registerUrl, verifyCodeUrl } from '../../api/apiUrls';
import { useT } from '../../custom/hooks/useT';
import PhoneInput from 'react-phone-input-2';
import { useAppDispatch, useAppSelector } from '../../Store/hooks';
import { setUser, UserResType } from '../../features/authSlice';

const { Step } = Steps;

interface IAuthModal {
  isOpenSignUp: boolean;
  isOpenSignIn: boolean;
  onCloseSignUpModal: () => void;
  onCloseSignInModal: () => void;
}

const AuthModal = (props: IAuthModal) => {
  const { isOpenSignUp, isOpenSignIn, onCloseSignUpModal, onCloseSignInModal } = props;
  const { t, lang } = useT();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [phone, setPhone] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [error1, setError2] = useState<string>('');
  const [error3, setError3] = useState<string>('');
  const [minutes, setMinutes] = useState(0);
  const [secunds, setSecunds] = useState(0);
  const [isConfirm, setIsConfirm] = useState(true);
  let interval: any;
  let formData = new FormData();

  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state) => state.loading);
  const onFinishSignIn = (values: any) => {
    console.log('Success:', values);

  };

  const onFinishFailedSignIn = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onFinishSignUp1 = (values: any) => {
    let { phone } = values;
    setPhone(phone);
    formData.append('phone', phone);
    baseAPI.create<any>(enterPhoneUrl, formData)
      .then((res) => {
        if (res.data.status === 200) {
          setCurrent(1);
          startTimer();
        } else if (res.data.status === 403) {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        console.log('err', err);
      })
  }

  const resendCode = () => {
    formData.append('phone', phone);
    baseAPI.create<any>(enterPhoneUrl, formData)
      .then((res) => {
        if (res.data.status === 200) {
          startTimer();
        } else if (res.data.status === 403) {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        console.log('err', err);
      })

    setIsConfirm(true);
    startTimer();
  }

  const onFinishSignUp2 = (values: any) => {
    let { code } = values;
    setCode(code);
    formData.append('phone', phone);
    formData.append('code', code);
    baseAPI.create<any>(verifyCodeUrl, formData)
      .then((res) => {
        if (res.data.status === 200) {
          setCurrent(2);
        } else if (res.data.status === 403) {
          setError2(res.data.message);
        }
      })
      .catch((err) => {
        console.log('err', err);
      })
  }
  const onFinishSignUp3 = (values: any) => {
    let { firstname, lastname, password, password_repeat } = values;
    formData.append('phone', phone);
    formData.append('code', code);
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('password', password);
    formData.append('password_repeat', password_repeat);
    baseAPI.create<UserResType>(registerUrl, formData)
      .then((res) => {
        if (res.data.status === 200) {
          dispatch(setUser(res.data));
          setUserToLocalStorage(res.data?.data);
          setToken(res.data?.data?.auth_key)
          onCloseSignUpModal();
        } else if (res.status === 403) {
          setError3(res.data.message);
        }
      })
      .catch((err) => {
        console.log('err', err);
      })
  }
  // set interval

  const startTimer = () => {
    let finishDate = new Date();
    finishDate.setMinutes(finishDate.getMinutes() + 2);
    let finishDateTime = finishDate.getTime();

    interval = setInterval(() => {
      let now = new Date().getTime();
      let distance = finishDateTime - now;
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let secunds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval);
        setIsConfirm(false);
      } else {
        setMinutes(minutes);
        setSecunds(secunds);
      }
    }, 1000);
  };


  const setBack = (current: number) => {
    setCurrent(current);
  }

  const authContext = useContext(AuthContext);

  return (
    <>
      <Modal width={550} className={"signin__modal"} visible={isOpenSignIn} onCancel={onCloseSignInModal} footer={null} >
        <h3 className="signin__modal__title">
          Войти или создать профиль
        </h3>
        <Form
          layout={"vertical"}
          form={form}
          className="signin__modal__form"
          onFinish={onFinishSignIn}
        >
          <Form.Item label="Номер телефона"
            name="tel_number"
            rules={[{ required: true }]}
          >
            <Input
              // value={phone}
              // onChange={handleChangePhone}
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item label="Пароль"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password
            // onChange={handleChangeCode}
            />
          </Form.Item>
          <div className="signin__modal__form__recover__wrapper">
            <Link
              to={"#"}
              className="signin__modal__form__recover__wrapper__password"
            >
              Забыли пароль?
            </Link>
          </div>

          <Button className="signin__modal__form__submit__btn" block ghost htmlType='submit'>ВОЙТИ</Button>
          <Button
            className="signin__modal__form__signup__btn"
            onClick={() => {
              onCloseSignInModal();
              authContext.onOpenSignUpModal();
            }}
            block
            type='link'
          >ЗАРЕГИСТРИРОВАТЬСЯ
          </Button>

        </Form>
      </Modal>

      <Modal width={550} className={"signup__modal"} visible={isOpenSignUp} onCancel={onCloseSignUpModal} footer={null} >
        <h3 className="signup__modal__title">
          Создание аккаунта
        </h3>
        <Steps
          current={current}
          className={"signup__modal__steps"}
        >
          <Step />
          <Step />
          <Step />
        </Steps>
        {/* 1-bosqich */}
        {
          current === 0 && (
            <Form
              layout={"vertical"}
              className="signup__modal__form"
              autoComplete="off"
              onFinish={onFinishSignUp1}
            >
              <Form.Item
                label="Номер телефона"
                name="phone"
                rules={[{ required: true }]}
              >
                <PhoneInput
                  country={'uz'}
                  onlyCountries={['uz']}
                  placeholder={"+998"}
                  disableDropdown={true}
                />
              </Form.Item>
              <div
                className="signup__modal__form__btn__wrapper"
              >
                {
                  current !== 0 ? (
                    <Button className="signup__modal__form__btn__wrapper__back__btn"
                      ghost
                    >
                      {t(`back.${lang}`)}
                    </Button>
                  ) : <></>
                }

                <Button className="signup__modal__form__btn__wrapper__submit__btn" ghost htmlType='submit'>Далее</Button>
              </div>
            </Form>
          )
        }

        {/* 2-bosqich */}
        {
          current === 1 && (

            <Form
              layout={"vertical"}
              className="signup__modal__form"
              onFinish={onFinishSignUp2}
              autoComplete="off"
            >
              <p className="signup__modal__form__timeout__text">
                {phone} telefon raqamiga SMS-kod jo'natildi.
              </p>
              <Form.Item
                name="code"
                rules={[{ required: true }]}
              >
                <Input.Password
                  placeholder={"Введите полученный код"}
                />
              </Form.Item>
              <div className="signup__modal__form__resend_btn_wrapper">
                <p className="signup__modal__form__timeout__text">
                  {isConfirm && (
                    lang === "ru" ? (
                      <>
                        Отправить повторный код можно через
                        <span className="d-block">
                          0{minutes} : {`${secunds < 10 ? "0" : ""}${secunds}`}
                        </span>
                      </>
                    ) : lang === "uz" ? (
                      <>
                        Kodni{` `}
                        <span className="d-block">
                          0{minutes} : {`${secunds < 10 ? "0" : ""}${secunds}`} dan kegin qayta jo'natishingiz mumkin
                        </span>
                      </>
                    ) : null
                  )}
                </p>
                {
                  !isConfirm && (
                    <button
                      onClick={resendCode}
                      type="button"
                      className="signup__modal__form__resend_btn_wrapper__code"
                    >
                      Отправить код еще раз
                    </button>
                  )
                }
              </div>
              <div
                className="signup__modal__form__btn__wrapper"
              >
                <Button
                  className="signup__modal__form__btn__wrapper__back__btn"
                  ghost
                  onClick={() => setBack(0)}
                >
                  {t(`back.${lang}`)}
                </Button>

                <Button
                  className="signup__modal__form__btn__wrapper__submit__btn"
                  ghost
                  htmlType='submit'
                >
                  Далее
                </Button>
              </div>
            </Form>
          )
        }

        {/* 3-bosqich */}
        {
          current === 2 && (
            <Form
              layout={"vertical"}
              className="signup__modal__form"
              onFinish={onFinishSignUp3}
            >
              < Form.Item
                name="firstname"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder='Имя'
                />
              </Form.Item>
              <Form.Item
                name="lastname"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder='Фамилия'
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true }]}
              >
                <Input.Password
                  placeholder='Пароль'
                />
              </Form.Item>
              <Form.Item
                name="password_repeat"
                rules={[{ required: true }]}
              >
                <Input.Password
                  placeholder='Павторите пароль'
                />
              </Form.Item>
              <div
                className="signup__modal__form__btn__wrapper"
              >
                <Button
                  className="signup__modal__form__btn__wrapper__back__btn"
                  ghost
                  onClick={() => setBack(1)}
                >
                  {t(`back.${lang}`)}
                </Button>

                <Button className="signup__modal__form__btn__wrapper__submit__btn" ghost htmlType='submit'>Далее</Button>
              </div>
            </Form>
          )
        }
      </Modal >

    </>

  )
}

export default AuthModal