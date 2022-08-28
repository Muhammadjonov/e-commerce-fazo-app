import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Col, Row, Radio, Space, Divider, Button, Select, DatePicker, DatePickerProps, Input, Form } from 'antd';
import BreadcrumbComp from '../../components/BreadcrumbComp';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import InputComp from '../../components/Form/InputComp';
import TopTitleArea from './TopTitleArea';
import OutlineBtn from '../../components/Buttons/OutlineBtn';
import OrderCard from './OrderCard';
import { useAppDispatch, useAppSelector } from '../../Store/hooks';
import { CartContext, InstallmentModalContext } from '../../App';
import { useT } from '../../custom/hooks/useT';
import { formatPrice, getBasketFromLocalStorage, removeBasketFromLocalStorage } from '../../helpers';
import baseAPI from '../../api/baseAPI';
import { alifOrderUrl, alifUserCheckUrl, alifValCodeUrl, districtsUrl, orderPaymentTypesUrl, orderUrl, regionsUrl } from '../../api/apiUrls';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import { dropBasket } from '../../features/basket/basketSlice';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import "./_style.scss";

const { Option } = Select;

const Checkout = () => {
  const { t, lang } = useT();
  const { onOpenCartModal } = useContext(CartContext);
  const { setIsOpenInstallmentModal, installmentData } = useContext(InstallmentModalContext);
  const [paymentTypes, setPaymentTypes] = useState<any>({});
  const [regions, setRegions] = useState<any>({});
  const [districts, setDistricts] = useState<any>({});
  const [delivery_date, setDeliveryDate] = useState<string>("");
  const { products: inBasketProducts, totalProductCount, totalPrice } = getBasketFromLocalStorage();
  const [isOrderLoading, setIsOrderLoading] = useState<boolean>();
  const [orderError, setOrderError] = useState<string>("");

  const { control, register, handleSubmit, watch, formState: { errors } } = useForm<any>({
    defaultValues: {
      payment_type: installmentData.installment !== undefined ? "3" : "1"
    }
  });
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const getRegions = useCallback(() => {
    baseAPI.fetchAll<any>(regionsUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setRegions(res.data.data);
        }
      })
  }, [])

  let regionId = watch("region_id");
  const getDistricts = useCallback(() => {
    baseAPI.fetchWithParams<any>(districtsUrl, { regionId })
      .then((res) => {
        if (res.data.status === 200) {
          setDistricts(res.data.data)
        }
      })
  }, [regionId])

  const getPaymentTypes = useCallback(() => {
    baseAPI.fetchAll<any>(orderPaymentTypesUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setPaymentTypes(res.data.data);
        }
      })
  }, [])

  useEffect(() => {
    getPaymentTypes();
    getRegions();
  }, [getPaymentTypes, getRegions])

  useEffect(() => {
    getDistricts();
  }, [getDistricts])

  const handleChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    setDeliveryDate(dateString);
  }

  // totalPrc
  let districtId = watch("district_id");
  let totalPrc = totalPrice + (districtId !== undefined && districts[districtId]?.price);
  let products: { productId: number, count: number }[] = []
  const onSubmit: SubmitHandler<any> = data => {
    inBasketProducts.forEach((product: any) => {
      products.push({
        productId: product.id,
        count: product.count
      })
    });
    setIsOrderLoading(true);
    let { payment_type } = data;
    if (payment_type === "3") {
      if (installmentData.installment === "1") {
        baseAPI.create<any>(alifOrderUrl, { ...data, products, delivery_date, otp: +alifValCode, monthId: installmentData.alifMonthId ?? 1 })
          .then((res) => {
            if (res.data?.status === 200) {
              navigate("/");
              dispatch(dropBasket)
              removeBasketFromLocalStorage();
              window.location.reload();
            }
          })
          .catch((e) => console.log("err", e))
          .finally(() => {
            setIsOrderLoading(false);
          })
      } else if (installmentData.installment === "2") {
        // baseAPI.create<any>()
      }
    } else (
      baseAPI.create<any>(orderUrl, { ...data, products, delivery_date })
        .then((res) => {
          if (res.data.status === 200) {
            window.open(
              res.data.data?.url,
              "_blank"
            );
            navigate("/");
            dispatch(dropBasket)
            removeBasketFromLocalStorage();
            window.location.reload();
          } else if (res.data.status === 403) {
            setOrderError(res.data.message)
          }
        })
        .catch((e) => {
          console.log("err", e);
        })
        .finally(() => {
          setIsOrderLoading(false);
        })
    )

  };

  useEffect(() => {
    return () => {
      setOrderError("");
    }
  }, [])

  // Alif user check
  const [alifUserPhonenumberCheck, setAlifUserPhonenumberCheck] =
    useState<string>("");
  const [alifUserPhonenumberCheckMessage, setAlifUserPhonenumberCheckMessage] =
    useState<string>("");
  const [alifValCode, setAlifValCode] = useState<string>("");
  const [isAlifCheckLoading, setAlifCheckIsLoading] = useState<boolean>(true);
  const [alifValCodeMesg, setAlifValMesg] = useState<string>("");

  // handle alif sms code 
  const handleChangeAlifValCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    setAlifValCode(inputValue)
  }

  const handleCheckAlifUser = (value: string) => {

    if (value.length > 11) {
      setAlifCheckIsLoading(true);
      baseAPI
        .createWithParams<any>(alifUserCheckUrl, null, {
          phone: `+${value}`
        })
        .then((res) => {
          if (res.data.status === 200) {
            setAlifUserPhonenumberCheckMessage(res.data?.data?.message);
            setAlifCheckIsLoading(false);
            // alifValCode
            baseAPI.createWithParams<any>(alifValCodeUrl, null, { phone: `+${value}` })
              .then((res) => {
                if (res.data.status === 200) {
                  setAlifValMesg(res.data?.data?.message);
                } else if (res.data.status === 403) {
                  setAlifValMesg(res.data?.message?.message)
                }
              })
              .catch((e) => console.log("er", e))
              .finally(() => {

              })
          } else if (res.data.status === 403) {
            setAlifUserPhonenumberCheckMessage(res.data?.message?.message);
          }
        }
        )
        .catch((e) => console.log(e))
        .finally(() => {
        })

      setAlifUserPhonenumberCheck(value);
    }
  }

  // installment modal

  const onOpenInstallmentModal = () => {
    setIsOpenInstallmentModal(true)
  }

  // breadcrumb
  const breadcrumbs = [
    {
      id: "1",
      toUrl: "/",
      text: t(`home.${lang}`),
      className: ""
    },
    {
      id: "2",
      toUrl: "#",
      text: t(`checkout.${lang}`),
      className: ""
    }
  ];

  return (
    <section className='checkout_wrapper'>
      <div className="container">
        <div className="checkout_breadcrumb_area">
          <BreadcrumbComp breadcrumbs={breadcrumbs} />
        </div>
        <div className="checkout_body">
          <form className="checkout_form" onSubmit={handleSubmit(onSubmit)}>
            <Row gutter={[{ lg: 30, md: 20, sm: 10, xs: 10 }, { lg: 30, md: 20, sm: 10, xs: 10 }]}>
              <Col md={17} sm={24} xs={24}>
                <div className="checkout_form_wrapper">
                  <h3 className="checkout_form_title title28_bold">
                    {t(`checkout.${lang}`)}
                  </h3>
                  {/* personal data */}

                  <div className="your_data">
                    <TopTitleArea number={"1"} title={t(`yourData.${lang}`)} />
                    <Row gutter={[20, 20]}>
                      <Col md={12} sm={24} xs={24}>
                        <Controller rules={{ required: true }} control={control} name="phone" render={({ field }) => (
                          <PhoneInput
                            {...field}
                            country={'uz'}
                            onlyCountries={['uz']}
                            disableDropdown={true}
                            placeholder="+998"
                          />
                        )} />
                        {errors["phone"] && <span className='your_data__error__message'>{t(`requiredErrMessage.${lang}`)}</span>}
                      </Col>
                      <Col md={12} sm={0} xs={0}></Col>
                      <Col md={12} sm={24} xs={24}>
                        <InputComp name="first_name" label={t(`yourFirstName.${lang}`)} register={register} errors={errors} required={true} />
                      </Col>
                      <Col md={12} sm={24} xs={24}>
                        <InputComp name="last_name" label={t(`yourLastName.${lang}`)} register={register} errors={errors} required={true} />
                      </Col>
                    </Row>
                  </div>
                  {/* your orders */}
                  <div className="your__orders">
                    <div className="your__orders__top">
                      <TopTitleArea number={"2"} title={t(`yourOrder.${lang}`)} />
                      <OutlineBtn onClick={onOpenCartModal} text={t(`edit.${lang}`)} />
                    </div>
                    {
                      inBasketProducts?.map((product: any) => (
                        <OrderCard key={product.id} {...product} />
                      ))
                    }
                  </div>

                  {/* paynemt types */}
                  <div className="payment__types">
                    <TopTitleArea number={"3"} title={t(`selectPayMeth.${lang}`)} />
                    <Controller
                      name={"payment_type"}
                      control={control}
                      render={({ field }) => (
                        <Radio.Group
                          {...field} className="payment__types__radios">
                          <Space style={{ width: "100%" }} size={[0, 15]} direction="vertical">
                            {
                              Object.keys(paymentTypes)?.map((paymentType) => {
                                if (paymentType === "3") {
                                  return (
                                    <Radio
                                      key={paymentType}
                                      value={paymentType}
                                      onClick={onOpenInstallmentModal}
                                    >
                                      {paymentTypes[paymentType]}
                                    </Radio>
                                  )
                                } else {
                                  return (
                                    <Radio key={paymentType} value={paymentType}>{paymentTypes[paymentType]} </Radio>
                                  )
                                }
                              }
                              )
                            }
                          </Space>
                        </Radio.Group>
                      )}
                    />
                    {errors["payment_type"] && <span className='error__message'>{t(`requiredErrMessage.${lang}`)}</span>}
                  </div>

                  {/* alif user check */}
                  {
                    watch("payment_type") === "3" && (
                      <>
                        <div className="payment-type-content">
                          <h4 className="payment-type">
                            {t(`installmentType.${lang}`)}: {installmentData.installment === "1" ? "Alif" : "Intend"}
                          </h4>
                          <div className="payment-type-item item-1">
                            <span>{t(`installmentPeriod.${lang}`)}:</span> <br />
                            <span>{installmentData.installment === "1" ? installmentData.alifMonth : installmentData.intendMonth} {lang === "ru" ? "мес." : "oy"}</span>
                          </div>
                          <div className="payment-type-item">
                            <span>{t(`monthlyPayment.${lang}`)}:</span> <br />
                            {
                              lang === "ru" ? (
                                <span>
                                  {installmentData.installment === "1" ?
                                    formatPrice((totalPrice * ((100 + (installmentData.alifAmount ?? 0)) / 100)) / (installmentData.alifMonth ?? 1)) : 1
                                  } cум / месяц
                                </span>
                              ) : (
                                <span>
                                  oyiga {installmentData.installment === "1" ?
                                    formatPrice((totalPrice * ((100 + (installmentData.alifAmount ?? 0)) / 100)) / (installmentData.alifMonth ?? 1)) : null
                                  } so'm
                                </span>
                              )
                            }

                          </div>
                          <OutlineBtn onClick={onOpenInstallmentModal} text={t(`edit.${lang}`)} />
                        </div>
                        <Divider />
                        <div className="payment-type-content">
                          <h4 className="payment-type">
                            {lang === "ru" ? `Авторизация верифицированного пользователя ${installmentData.installment === "1" ? "Alif" : "Intend"}` : `${installmentData.installment === "1" ? "Alif" : "Intend"} foydalanuvchisini ro'yxatdan o'tganligini tekshirish`}
                          </h4>
                          <div className="payment-type-item item-1">
                            <Form.Item
                              className="payment__type__phone__input"
                              label={t(`enterPhoneNumber.${lang}`)}
                            >
                              <PhoneInput
                                country={"uz"}
                                onlyCountries={["uz"]}
                                countryCodeEditable={false}
                                disableDropdown={true}
                                onChange={handleCheckAlifUser}
                              />
                              <div className="register-not">
                                {alifUserPhonenumberCheckMessage}
                              </div>
                              <div className="register-not mt-5">
                                {t(`notRegistered.${lang}`)},{" "}
                                <a href="https://alifnasiya.uz/auth/registration?source=https%3A%2F%2Fmobile.tmart.uz%2Fkr%2Fshop%2Fcheckout" target="_blank" rel="noopener noreferrer">{lang === "ru" ? `пройдите регистрацию в Alif` : `Alif da ro'yxatdan o'ting`}</a>
                              </div>
                            </Form.Item>
                            {
                              !isAlifCheckLoading && (
                                <Form.Item
                                  label={"Sms kod"}
                                  className="payment__type__password"
                                >
                                  <Input.Password
                                    onChange={handleChangeAlifValCode}
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    size="large"
                                    maxLength={4}
                                  />
                                  <div className="register-not">
                                    {alifValCodeMesg}
                                  </div>
                                </Form.Item>
                              )
                            }
                          </div>
                        </div>
                        <Divider />
                      </>
                    )}
                  {/* how to obtain */}

                  <div className="howto__obtain">
                    <TopTitleArea number={"4"} title={t(`howToObtain.${lang}`)} />
                    {/* <label className="howto__obtain__label" htmlFor="">Ваш город</label> */}
                    {/* <Radio className="city" id="city">Ташкент<span className='city__text'>Доставка Fazo</span></Radio> */}

                    <label htmlFor="" className="howto__obtain__label">{t(`enterDeliveryAddress.${lang}`)}</label>
                    <Row gutter={[20, 20]}>
                      <Col md={12} sm={24} xs={24}>
                        <div className="select__wrapper">
                          <Controller
                            name={"region_id"}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (<Select
                              {...field}
                              size='large'
                              className="select__comp"
                              showSearch
                              style={{ width: "100%" }}
                              optionFilterProp="children"
                              filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                              filterSort={(optionA, optionB) =>
                                (optionA!.children as unknown as string)
                                  .toLowerCase()
                                  .localeCompare((optionB!.children as unknown as string).toLowerCase())
                              }
                            >
                              {
                                Object.keys(regions)?.map(region => (
                                  <Option key={region} value={region}>{regions[region]}</Option>
                                ))
                              }
                            </Select>)}
                          />
                          <label className="custom__label">{t(`regionOblast.${lang}`)}</label>
                          {errors["region_id"] && <span className='error_message'>{t(`requiredErrMessage.${lang}`)}</span>}
                        </div>
                      </Col><Col md={12} sm={24} xs={24}>
                        <div className="select__wrapper">
                          <Controller
                            name={"district_id"}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (<Select
                              {...field}
                              size='large'
                              className="select__comp"
                              showSearch
                              style={{ width: "100%" }}
                              optionFilterProp="children"
                              filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                              filterSort={(optionA, optionB) =>
                                (optionA!.children as unknown as string)
                                  .toLowerCase()
                                  .localeCompare((optionB!.children as unknown as string).toLowerCase())
                              }
                            >
                              {
                                Object.keys(districts)?.map(district => (
                                  <Option key={district} value={district}>{districts[district]["name"]}</Option>
                                ))
                              }
                            </Select>)}
                          />
                          <label className="custom__label">{t(`cityDistr.${lang}`)}</label>
                          {errors["district_id"] && <span className='error_message'>{t(`requiredErrMessage.${lang}`)}</span>}
                        </div>
                      </Col>
                    </Row>

                  </div>
                  <div className="howto__obtain__address">
                    <InputComp name="address" label={t(`address.${lang}`)} register={register} errors={errors} required={true} />
                    <InputComp name="floor" label={t(`floor.${lang}`)} register={register} errors={errors} required={true} />
                  </div>
                  <Row gutter={[20, 20]}>
                    <Col sm={24} xs={24}>
                      <div className="howto__obtain__datapicker__comp">
                        <DatePicker
                          name="name"
                          onChange={handleChangeDate}
                          placeholder=''
                          format={'YYYY/MM/DD'}
                          className='date__picker'
                          size='large'
                        />

                        <label className="custom__label">{t(`dateDelivery.${lang}`)}</label>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col md={7} sm={24} xs={24}>
                <div className="checkout__form__right">
                  <h3 className="title18_bold checkout__form__right__title">
                    {t(`yourData.${lang}`)}
                  </h3>

                  <div className="checkout__form__right__block">
                    <p className="p16_regular">
                      {totalProductCount} {t(`goodForAmount.${lang}`)}
                    </p>
                    <h3 className="title18_bold">
                      {formatPrice(totalPrice)} {t(`sum.${lang}`)}
                    </h3>
                  </div>

                  <div className="checkout__form__right__block">
                    <p className="p16_regular">
                      {t(`delivery.${lang}`)}
                    </p>
                    <h3 className="title18_bold">
                      {districtId !== undefined ? districts[districtId]?.price :
                        t(`free.${lang}`)
                      }
                    </h3>
                  </div>
                  <Divider />

                  <div className="checkout__form__right__block">
                    <p className="p16_regular">
                      {t(`totalPayment.${lang}`)}
                    </p>
                    <h3 className="title18_bold">
                      {formatPrice(+totalPrc)}{` `} {t(`sum.${lang}`)}
                    </h3>
                  </div>

                  <Button
                    className="checkout__form__right__submit__btn"
                    htmlType='submit'
                    type="link"
                    block
                    size='large'
                    loading={isOrderLoading}
                  >
                    {t(`checkout.${lang}`)}
                  </Button>


                  <p className="checkout__form__right__accept__terms">
                    {
                      lang === "uz" ? (<>
                        Buyurtmani tasdiqlash orqali men<br />
                        <a className="checkout__form__right__accept__terms__link" href="http://" target="_blank" rel="noopener noreferrer">Foydalanuvchi shartnomasi</a> shartlarini qabul qilaman.
                      </>
                      ) : (
                        <>
                          Подтверждая заказ, я принимаю условия <br />
                          <a className="checkout__form__right__accept__terms__link" href="http://" target="_blank" rel="noopener noreferrer">Пользовательского соглашения</a>
                        </>
                      )
                    }
                  </p>
                  <div className="checkout__form__right__error__message">
                    {orderError}
                  </div>
                </div>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    </section >
  )
}

export default Checkout