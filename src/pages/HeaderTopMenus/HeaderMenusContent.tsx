import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { useLocation, useParams } from 'react-router-dom';
import { b2bUrl } from '../../api/apiUrls';
import baseAPI from '../../api/baseAPI';
import InputComp from '../../components/Form/InputComp';
import { useT } from '../../custom/hooks/useT'
import { LoadingContext } from 'react-router-loading';
import { oneLeftMenuUrl } from '../../api/apiUrls';
import { LeftMenuInfoType, OneLeftMenuResType } from '../../types';

const HeaderMenusContent = () => {
  const { t, lang } = useT();
  const [isB2BLoading, setIsB2BLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const { pathname } = useLocation();
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      phone: "",
      name: "",
      last_name: "",
      email: "",
      type_id: "",
      text: ""
    }
  })
  let { page_slug } = useParams();
  const [onePage, setOnePage] = useState<LeftMenuInfoType>({} as LeftMenuInfoType);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const loadingContext = useContext(LoadingContext);
  let isB2B = page_slug === "b2b-savdosi" ? true : false;
  const successB2b = () => {
    Modal.success({
      content: t(`acceptYourApp.${lang}`),
    });
  };


  const getOnePage = useCallback(() => {
    setIsLoading(true);
    baseAPI.fetchWithParams<OneLeftMenuResType>(oneLeftMenuUrl, { key: page_slug })
      .then((res) => {
        if (res.data.status === 200) {
          setOnePage(res.data.data);
          setIsLoading(false);
          loadingContext.done()
        }
      })
      .catch((e) => {
        console.log("err", e);
      })
      .finally(() => {
        loadingContext.done();
      })
  }, [page_slug])

  useEffect(() => {
    getOnePage();
  }, [getOnePage])

  const formData = new FormData();

  const onSubmit = (data: any) => {
    let { first_name, last_name, phone, email, company_name } = data;
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("company_name", company_name);
    formData.append("phone", `+${phone}`);
    formData.append("email", email);
    setIsB2BLoading(true);
    baseAPI.create<any>(b2bUrl, formData)
      .then((res) => {
        if (res.data.status === 200) {
          successB2b();
          reset();
          setIsB2BLoading(false);
        } else if (res.data.status === 403) {
          setError(res.data.message);
          setIsB2BLoading(false);
        }
      })
      .catch((e) => {
        console.log("err", e);
      })
      .finally(() => {
        setIsB2BLoading(false);
      })
  }

  useEffect(() => {
    reset();
    return () => {
      setError("");
    }
  }, [pathname])

  return (
    <>
      <div className="header_top_menus__body__content" dangerouslySetInnerHTML={{ __html: onePage.content }} />
      <div className="b2b">
        {/* <h3 className="b2b__title title24_bold">
        {t(`b2bTrade.${lang}`)}
      </h3> */}

        <div className="b2b__body">
          <h3 className="b2b__body__title title24_bold">
            {t(`b2bFormTitle.${lang}`)}
          </h3>
          <p className="b2b__body__desc">
            {t(`b2bFormDesc.${lang}`)}
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="b2b__form">
            <Row gutter={[20, 20]} >
              <Col lg={10} md={12} sm={24} xs={24}>
                <InputComp label={t(`yourFirstName.${lang}`)} name="first_name" register={register} errors={errors} />
              </Col>
              <Col lg={10} md={12} sm={24} xs={24}>
                <InputComp label={t(`yourLastName.${lang}`)} name="last_name" register={register} errors={errors} />
              </Col>
              <Col lg={10} md={12} sm={24} xs={24}>
                <InputComp label={t(`companyName.${lang}`)} name="company_name" register={register} errors={errors} />
              </Col>
              <Col lg={10} md={12} sm={24} xs={24}>
                <Controller rules={{ required: true }} control={control} name="phone" render={({ field }) => (
                  <PhoneInput
                    {...field}
                    country={'uz'}
                    onlyCountries={['uz']}
                    disableDropdown={true}
                    placeholder="+998"
                  />
                )} />
                {errors["phone"] && <span className='error__message'>{t(`requiredErrMessage.${lang}`)}</span>}
              </Col>
              <Col lg={20} md={24} sm={24} xs={24}>
                <InputComp type='email' label={t(`yourEmail.${lang}`)} name="email" register={register} errors={errors} />
                <span className='error__message'>{error}</span>
              </Col>
              <Col lg={20} md={24} sm={24} xs={24}>
                <div className="b2b__form__btn">
                  <Button
                    size="large"
                    loading={isB2BLoading}
                    htmlType='submit'
                    className="b2b__form__btn__submit"
                    block
                    type="link"
                  >
                    {t(`send.${lang}`)}
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        </div>
      </div >
    </>
  )
}

export default HeaderMenusContent