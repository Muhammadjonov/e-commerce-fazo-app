import { useState, useContext, useEffect } from 'react';
import { Button, Form, Input, Modal, Steps } from 'antd';
import { setToken, setUserToLocalStorage } from '../../helpers';
import { AuthContext } from '../../App';
import baseAPI from '../../api/baseAPI';
import { enterPhoneUrl, loginUrl, registerUrl, resetEnterPhoneUrl, resetPasswordUrl, resetVerifyCodeUrl, verifyCodeUrl } from '../../api/apiUrls';
import { useT } from '../../custom/hooks/useT';
import PhoneInput from 'react-phone-input-2';
import { useAppDispatch, useAppSelector } from '../../Store/hooks';
import { setUser, UserResType } from '../../features/authSlice';
import "./__style.scss";
import CountDownComp from '../CountDownComp';

const { Step } = Steps;

interface IAuthModal {
  isOpenSignUp: boolean;
  isOpenSignIn: boolean;
  onCloseSignUpModal: () => void;
  onCloseSignInModal: () => void;
}

interface ISignUpErrors {
  phoneErr: string,
  codeErr: string,
  pswErr: string
}
interface IIsLoading {
  signIn: boolean,
  resetPhone: boolean,
  resetCode: boolean,
  resetPsw: boolean,
  signUpPhone: boolean
  signUpCode: boolean
  signUpPsw: boolean
}

const AuthModal = (props: IAuthModal) => {
  const { isOpenSignUp, isOpenSignIn, onCloseSignUpModal, onCloseSignInModal } = props;
  const { t, lang } = useT();
  const [isLoadings, setIsLoadings] = useState<IIsLoading>({} as IIsLoading)
  const [current, setCurrent] = useState<number>(0);
  const [resetPswCurrent, setResetPswCurrent] = useState<number>(0);
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [phone, setPhone] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [resetPhone, setResetPhone] = useState<string>('');
  const [resetCode, setResetCode] = useState<string>('');
  const [signUpErrors, setSignUpErrors] = useState<ISignUpErrors>({} as ISignUpErrors)
  const [resetErrors, setResetErrors] = useState<ISignUpErrors>({} as ISignUpErrors)
  const [signinError, setSigninError] = useState<string>("");
  const [signinForm] = Form.useForm();
  const [signUp1Form] = Form.useForm();
  const [signUp2Form] = Form.useForm();
  const [signUp3Form] = Form.useForm();
  const [resetPswForm1] = Form.useForm();
  const [resetPswForm2] = Form.useForm();
  const [resetPswForm3] = Form.useForm();

  let formData = new FormData();

  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.loading);

  const onFinishSignIn = (values: any) => {
    let { phone, password } = values;
    formData.append("username", phone);
    formData.append("password", password);
    setIsLoadings(prev => ({ ...prev, signIn: true }));
    baseAPI.create<UserResType>(loginUrl, formData)
      .then((res) => {
        if (res.data.status === 200) {
          dispatch(setUser(res.data));
          setUserToLocalStorage(res.data?.data);
          setToken(res.data?.data?.auth_key);
          setIsLoadings(prev => ({ ...prev, signIn: false }));
          onCancelSignIn();
        } else if (res.data.status === 403) {
          setSigninError(res.data.message)
          setIsLoadings(prev => ({ ...prev, signIn: false }));
        }
      })
      .finally(() => {
        setIsLoadings(prev => ({ ...prev, signIn: false }));
      })
  };

  const onFinishSignUp1 = (values: any) => {
    let { phone } = values;
    setPhone(phone);
    formData.append('phone', phone);
    setIsLoadings(prev => ({ ...prev, signUpPhone: true }));
    baseAPI.create<any>(enterPhoneUrl, formData)
      .then((res) => {
        if (res.data.status === 200) {
          setCurrent(1);
          setIsLoadings(prev => ({ ...prev, signUpPhone: false }));
        } else if (res.data.status === 403) {
          setSignUpErrors(prev => ({ ...prev, phoneErr: res.data?.message }));
          setIsLoadings(prev => ({ ...prev, signUpPhone: false }));
        }
      })
      .catch((err) => {
        console.log('err', err);
      })
      .finally(() => {
        setIsLoadings(prev => ({ ...prev, signUpPhone: false }));
      })
  }

  const resendCode = (url: string) => {
    if (url === enterPhoneUrl) {
      formData.append('phone', phone);
    } else formData.append("phone", resetPhone)
    baseAPI.create<any>(url, formData)
      .then((res) => {
        if (res.data.status === 200) {
        } else if (res.data.status === 403) {
          setSignUpErrors(prev => ({ ...prev, phoneErr: res.data?.message }))
        }
      })
      .catch((err) => {
        console.log('err', err);
      })
      .finally(() => {

      })


    setResetErrors({
      phoneErr: "",
      codeErr: "",
      pswErr: ""
    });
    setSignUpErrors({
      phoneErr: "",
      codeErr: "",
      pswErr: ""
    });
    signUp2Form.resetFields();
    resetPswForm2.resetFields();
  }

  const onFinishSignUp2 = (values: any) => {
    let { code } = values;
    setCode(code);
    formData.append('phone', phone);
    formData.append('code', code);
    setIsLoadings(prev => ({ ...prev, signUpCode: true }));
    baseAPI.create<any>(verifyCodeUrl, formData)
      .then((res) => {
        if (res.data.status === 200) {
          setCurrent(2);
          setIsLoadings(prev => ({ ...prev, signUpCode: false }));
        } else if (res.data.status === 403) {
          setSignUpErrors(prev => ({ ...prev, codeErr: res.data?.message }));
          setIsLoadings(prev => ({ ...prev, signUpCode: false }));
        }
      })
      .catch((err) => {
        console.log('err', err);
      })
      .finally(() => {
        setIsLoadings(prev => ({ ...prev, signUpCode: false }));
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
    setIsLoadings(prev => ({ ...prev, signUpPsw: true }));
    baseAPI.create<UserResType>(registerUrl, formData)
      .then((res) => {
        if (res.data.status === 200) {
          dispatch(setUser(res.data));
          setUserToLocalStorage(res.data?.data);
          setToken(res.data?.data?.auth_key)
          onCloseSignUpModal();
          setIsLoadings(prev => ({ ...prev, signUpPsw: false }));
        } else if (res.status === 403) {
          setSignUpErrors(prev => ({ ...prev, pswErr: res.data?.message }));
          setIsLoadings(prev => ({ ...prev, signUpPsw: false }));
        }
      })
      .catch((err) => {
        console.log('err', err);
      }).finally(() => {
        setIsLoadings(prev => ({ ...prev, signUpPsw: false }));
      })
  }

  // reset password 

  const onFinishReset1 = (values: any) => {
    let { phone } = values;
    setResetPhone(phone);
    formData.append('phone', phone);
    setIsLoadings(prev => ({ ...prev, resetPhone: true }));
    baseAPI.create<any>(resetEnterPhoneUrl, formData)
      .then((res) => {
        if (res.data.status === 200) {
          setResetPswCurrent(1);
          setIsLoadings(prev => ({ ...prev, resetPhone: false }));
        } else if (res.data.status === 403) {
          setResetErrors(prev => ({ ...prev, phoneErr: res.data.message }));
          setIsLoadings(prev => ({ ...prev, resetPhone: false }));
        }
      })
      .catch((err) => {
        console.log('err', err);
      })
      .finally(() => {
        setIsLoadings(prev => ({ ...prev, resetPhone: false }));
      })
  }
  const onFinishReset2 = (values: any) => {
    let { code } = values;
    setResetCode(code);
    formData.append('phone', resetPhone);
    formData.append('code', code);
    setIsLoadings(prev => ({ ...prev, resetCode: true }));
    baseAPI.create<any>(resetVerifyCodeUrl, formData)
      .then((res) => {
        if (res.data.status === 200) {
          setResetPswCurrent(2);
          setIsLoadings(prev => ({ ...prev, resetCode: false }));
        } else if (res.data.status === 403) {
          setResetErrors(prev => ({ ...prev, codeErr: res.data.message }));
          setIsLoadings(prev => ({ ...prev, resetCode: false }));
        }
      })
      .catch((err) => {
        console.log('err', err);
      })
      .finally(() => {
        setIsLoadings(prev => ({ ...prev, resetCode: false }));
      })
  }

  const onFinishReset3 = (values: any) => {
    let { password, password_repeat } = values;
    formData.append('phone', resetPhone);
    formData.append("code", resetCode);
    formData.append("password", password);
    formData.append("password_repeat", password_repeat);
    setIsLoadings(prev => ({ ...prev, resetPsw: true }));
    baseAPI.create<any>(resetPasswordUrl, formData)
      .then((res) => {
        if (res.data.status === 200) {
          dispatch(setUser(res.data));
          setUserToLocalStorage(res.data?.data);
          setToken(res.data?.data?.auth_key)
          onCancelSignIn();
          setResetPswCurrent(0);
          setIsLoadings(prev => ({ ...prev, resetPsw: false }));
        } else if (res.data.status === 403) {
          setResetErrors(prev => ({ ...prev, pswErr: res.data.message }));
          setIsLoadings(prev => ({ ...prev, resetPsw: false }));
        }
      })
      .catch((err) => {
        console.log('err', err);
      })
      .finally(() => {
        setIsLoadings(prev => ({ ...prev, resetPsw: false }));
      })
  }


  const setBack = (current: number) => {
    setCurrent(current);
    signUp1Form.resetFields();
    signUp2Form.resetFields();
    signUp3Form.resetFields();
    setSignUpErrors({
      phoneErr: "",
      codeErr: "",
      pswErr: ""
    });
  }

  const setBackReset = (current: number) => {
    setResetPswCurrent(current);
    setResetErrors({
      phoneErr: "",
      codeErr: "",
      pswErr: ""
    });
    setSigninError("");
    resetPswForm1.resetFields();
    resetPswForm2.resetFields();
    resetPswForm3.resetFields();
  }

  // signin modal onCancel

  const onCancelSignIn = () => {
    signinForm.resetFields();
    onCloseSignInModal();
    setIsSignIn(true);
    setSigninError("");
    setResetErrors({
      phoneErr: "",
      codeErr: "",
      pswErr: ""
    });
  }
  // signUp modal onCancel 

  const onCancelSignUp = () => {
    signUp1Form.resetFields();
    signUp2Form.resetFields();
    signUp3Form.resetFields();
    setCurrent(0);
    onCloseSignUpModal();
    setSignUpErrors({
      phoneErr: "",
      codeErr: "",
      pswErr: ""
    })
  }

  // clear interval;


  const authContext = useContext(AuthContext);

  return (
    <>
      <Modal
        width={550}
        className={"signin__modal"}
        visible={isOpenSignIn}
        onCancel={onCancelSignIn}
        footer={null}
        wrapClassName="auth__modal"
      >
        {
          isSignIn ? (
            <>
              <h3 className="signin__modal__title">
                {t(`signInOrCreateAccount.${lang}`)}
              </h3>
              <Form
                layout={"vertical"}
                form={signinForm}
                className="signin__modal__form"
                onFinish={onFinishSignIn}
              >
                <Form.Item label={t(`phoneNumber.${lang}`)}
                  name="phone"
                  rules={[{ required: true }]}
                  className="signin__modal__form__phone__input"
                >
                  <PhoneInput
                    country={'uz'}
                    onlyCountries={['uz']}
                    countryCodeEditable={false}
                    disableDropdown={true}
                    inputProps={{
                      autoFocus: true
                    }}
                  />
                </Form.Item>
                <Form.Item label={t(`password.${lang}`)}
                  name="password"
                  rules={[{ required: true }]}
                >
                  <Input.Password
                  />
                </Form.Item>
                <span className="auth__error__text">{signinError}</span>
                <div className="signin__modal__form__recover__wrapper">
                  <button
                    type='button'
                    onClick={() => setIsSignIn(false)}
                    className="signin__modal__form__recover__wrapper__password"
                  >
                    {t(`forgetPassword.${lang}`)}
                  </button>
                </div>

                <Button loading={isLoadings.signIn} className="signin__modal__form__submit__btn" block ghost htmlType='submit'>{t(`signIn.${lang}`)}</Button>
                <Button
                  className="signin__modal__form__signup__btn"
                  onClick={() => {
                    onCloseSignInModal();
                    authContext.onOpenSignUpModal();
                  }}
                  block
                  type='link'
                >
                  {t(`signUp.${lang}`)}
                </Button>

              </Form>
            </>
          ) : (
            <>
              <h3 className="signin__modal__title">
                {t(`resetPassword.${lang}`)}
              </h3>
              <Steps
                current={resetPswCurrent}
                className={"signup__modal__steps"}
              >
                <Step />
                <Step />
                <Step />
              </Steps>
              {/* reset password */}
              {
                resetPswCurrent === 0 ? (
                  <Form
                    layout={"vertical"}
                    form={resetPswForm1}
                    className="signin__modal__form"
                    onFinish={onFinishReset1}
                  >
                    <Form.Item label={t(`phoneNumber.${lang}`)}
                      name="phone"
                      rules={[{ required: true }]}
                      className="signin__modal__form__phone__input"
                    >
                      <PhoneInput
                        country={'uz'}
                        onlyCountries={['uz']}
                        countryCodeEditable={false}
                        disableDropdown={true}
                      />
                    </Form.Item>
                    <span className="auth__error__text">{resetErrors.phoneErr}</span>
                    <div
                      className="signup__modal__form__btn__wrapper"
                    >
                      <button></button>


                      <Button
                        className="signup__modal__form__btn__wrapper__submit__btn"
                        loading={isLoadings.resetPhone}
                        ghost
                        htmlType='submit'
                      >{t(`next.${lang}`)}
                      </Button>
                    </div>
                  </Form>
                ) : resetPswCurrent === 1 ? (
                  <Form
                    layout={"vertical"}
                    form={resetPswForm2}
                    className="signin__modal__form"
                    onFinish={onFinishReset2}
                  >
                    <p className="signup__modal__form__timeout__text">
                      {
                        lang === "ru" ? `На номер +${resetPhone.slice(0, 3) + ` (` + resetPhone.slice(3, 5) + `) ... - ` + resetPhone.slice(8, 10) + ` - ` + resetPhone.slice(10)} было выслано
                  СМС сообщение с кодом` : lang === "uz" ? `+${resetPhone.slice(0, 3) + ` (` + resetPhone.slice(3, 5) + `) ... - ` + resetPhone.slice(8, 10) + ` - ` + resetPhone.slice(10)} telefon raqamiga aktivatsiya kodi jo'natildi.` : ""
                      }
                    </p>
                    <Form.Item label={(`password.${lang}`)}
                      name="code"
                      rules={[{ required: true }]}
                    >
                      <Input.Password
                        placeholder={t(`enterRecSmsCode.${lang}`)}
                        maxLength={4}
                      />
                    </Form.Item>
                    <span className="auth__error__text">{resetErrors.codeErr}</span>
                    <CountDownComp url={resetEnterPhoneUrl} repiteCode={resendCode} />
                    <div
                      className="signup__modal__form__btn__wrapper"
                    >
                      <Button
                        className="signup__modal__form__btn__wrapper__back__btn"
                        ghost
                        onClick={() => setBackReset(0)}
                      >
                        {t(`back.${lang}`)}
                      </Button>

                      <Button
                        className="signup__modal__form__btn__wrapper__submit__btn"
                        loading={isLoadings.resetCode}
                        ghost
                        htmlType='submit'
                      >
                        {t(`next.${lang}`)}
                      </Button>
                    </div>
                  </Form>
                ) : (
                  <Form
                    layout={"vertical"}
                    form={resetPswForm3}
                    className="signin__modal__form"
                    onFinish={onFinishReset3}
                  >
                    <Form.Item
                      name="password"
                      rules={[{ required: true }]}
                    >
                      <Input.Password
                        placeholder={t(`password.${lang}`)}
                      />
                    </Form.Item>
                    <Form.Item
                      name="password_repeat"
                      rules={[{ required: true }]}
                    >
                      <Input.Password
                        placeholder={t(`repeatPassword.${lang}`)}
                      />
                    </Form.Item>
                    <span className='auth__error__text'>{resetErrors.pswErr}</span>
                    <div
                      className="signup__modal__form__btn__wrapper"
                    >
                      <Button className="signup__modal__form__btn__wrapper__back__btn"
                        ghost
                        onClick={() => setBackReset(0)}
                      >
                        {t(`back.${lang}`)}
                      </Button>
                      <Button
                        loading={isLoadings.resetPsw}
                        className="signup__modal__form__btn__wrapper__submit__btn" ghost htmlType='submit'>{t(`next.${lang}`)}</Button>
                    </div>
                  </Form>
                )
              }
            </>
          )
        }
      </Modal>

      <Modal
        width={550}
        className={"signup__modal"}
        visible={isOpenSignUp}
        onCancel={onCancelSignUp}
        footer={null}
        wrapClassName="auth__modal"
      >
        <h3 className="signup__modal__title">
          {t(`createProfile.${lang}`)}
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
              form={signUp1Form}
            >
              <Form.Item
                label={t(`phoneNumber.${lang}`)}
                name="phone"
                rules={[{ required: true }]}
              >
                <PhoneInput
                  country={'uz'}
                  onlyCountries={['uz']}
                  countryCodeEditable={false}
                  disableDropdown={true}
                />
              </Form.Item>
              <span className='auth__error__text'>{signUpErrors.phoneErr}</span>
              <div
                className="signup__modal__form__btn__wrapper"
              >
                <button></button>
                <Button className="signup__modal__form__btn__wrapper__submit__btn" ghost
                  loading={isLoadings.signUpPhone}
                  htmlType='submit'>{t(`next.${lang}`)}</Button>
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
              form={signUp2Form}
            >
              <p className="signup__modal__form__timeout__text">
                {
                  lang === "ru" ? `На номер +${phone.slice(0, 3) + ` (` + phone.slice(3, 5) + `) ... - ` + phone.slice(8, 10) + ` - ` + phone.slice(10)} было выслано
                  СМС сообщение с кодом` : lang === "uz" ? `+${phone.slice(0, 3) + ` (` + phone.slice(3, 5) + `) ... - ` + phone.slice(8, 10) + ` - ` + phone.slice(10)} telefon raqamiga aktivatsiya kodi jo'natildi.` : ""
                }
              </p>
              <Form.Item
                name="code"
                rules={[{ required: true }]}
              >
                <Input.Password
                  placeholder={t(`enterRecSmsCode.${lang}`)}
                  maxLength={4}
                />
              </Form.Item>
              <span className="auth__error__text">{signUpErrors.codeErr}</span>
              <CountDownComp url={enterPhoneUrl} repiteCode={resendCode} />
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
                  loading={isLoadings.signUpCode}
                >
                  {t(`next.${lang}`)}
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
              form={signUp3Form}
            >
              < Form.Item
                name="firstname"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder={t(`yourFirstName.${lang}`)}
                />
              </Form.Item>
              <Form.Item
                name="lastname"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder={t(`yourLastName.${lang}`)}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true }]}
              >
                <Input.Password
                  placeholder={t(`password.${lang}`)}
                />
              </Form.Item>
              <Form.Item
                name="password_repeat"
                rules={[{ required: true }]}
              >
                <Input.Password
                  placeholder={t(`repeatPassword.${lang}`)}
                />
              </Form.Item>
              <span className="auth__error__text">{signUpErrors.pswErr}</span>

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

                <Button className="signup__modal__form__btn__wrapper__submit__btn" ghost
                  loading={isLoadings.signUpPsw}
                  htmlType='submit'>{t(`next.${lang}`)}</Button>
              </div>
            </Form>
          )
        }
      </Modal >
    </>

  )
}

export default AuthModal