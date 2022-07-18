import { Button, Col, Modal, Row, Select } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { useLocation } from 'react-router-dom';
import { contactTypesUrl, feedBackUrl } from '../../../api/apiUrls';
import baseAPI from '../../../api/baseAPI';
import InputComp from '../../../components/Form/InputComp';
import SelectComp from '../../../components/Form/SelectComp';
import Textarea from '../../../components/Form/TextareaComp';
import { useT } from '../../../custom/hooks/useT';
import "./__style.scss";


const Feedback = () => {
  const { t, lang } = useT();
  const [error, setError] = useState<string>("");
  const { pathname } = useLocation();
  const [contactTypes, setContactTypes] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, control, handleSubmit, watch, formState: { errors }, reset } = useForm({
    defaultValues: {
      phone: "",
      name: "",
      last_name: "",
      email: "",
      type_id: "",
      text: ""
    }
  })

  const successFeedback = () => {
    Modal.success({
      content: t(`yourMessageHasBeenSent.${lang}`),
    });
  };

  const formData = new FormData();

  const onSubmit = (data: any) => {
    let { name, last_name, phone, email, type_id, text } = data;
    formData.append("name", name);
    formData.append("last_name", last_name);
    formData.append("phone", `+${phone}`);
    formData.append("email", email);
    formData.append("type_id", type_id);
    formData.append("text", text);
    setIsLoading(true);
    baseAPI.create<any>(feedBackUrl, formData)
      .then((res) => {
        if (res.data.status === 200) {
          successFeedback();
          reset();
          setIsLoading(false);
        } else if (res.data.status === 403) {
          setError(res.data.message);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        console.log("err", e);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  useEffect(() => {
    reset();
    return () => {
      setError("");
    }
  }, [pathname])

  const getContactTypes = useCallback(() => {
    baseAPI.fetchAll<any>(contactTypesUrl)
      .then((res) => {
        // if (res.data.status === 200) {
        setContactTypes(res.data);
        // }
      })
      .catch((err) => {
        console.log("err", err);
      })
  }, [])

  useEffect(() => {
    getContactTypes();
  }, [getContactTypes])


  return (
    <div className="feedback">
      <h3 className="feedback__title title24_bold">
        {t(`feedback.${lang}`)}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="feedback__form">
        <Row gutter={[20, 20]}>
          <Col lg={10} md={12} sm={24} xs={24}>
            <InputComp label={t(`yourFirstName.${lang}`)} name="name" register={register} errors={errors} />
          </Col>
          <Col lg={10} md={12} sm={24} xs={24}>
            <InputComp label={t(`yourLastName.${lang}`)} name="last_name" register={register} errors={errors} />
          </Col>
          <Col lg={10} md={12} sm={24} xs={24}>
            <Controller rules={{ required: true }} control={control} name="phone" render={({ field }) => (
              <PhoneInput
                {...field}
                country={'uz'}
                onlyCountries={['uz']}
                // countryCodeEditable={false}
                disableDropdown={true}
                placeholder="+998"
              />
            )} />
            {errors["phone"] && <span className='error__message'>{t(`requiredErrMessage.${lang}`)}</span>}
          </Col>
          <Col lg={10} md={12} sm={24} xs={24}>
            <InputComp type='email' label={t(`yourEmail.${lang}`)} name="email" register={register} errors={errors} />
          </Col>
          <Col sm={24} xs={24}>
            <SelectComp select={contactTypes} label={t(`topic.${lang}`)} name="type_id" register={register} errors={errors} control={control} />
          </Col>
          <Col sm={24} xs={24}>
            <Textarea label={t(`yourMessage.${lang}`)} name="text" register={register} errors={errors} />
            <span className='error__message'>{error}</span>
            <div className="feedback__form__btns">
              <Button onClick={() => reset()} className="feedback__form__btns__cancel" type="link">{t(`cancel.${lang}`)}</Button>
              <Button loading={isLoading} htmlType='submit' className="feedback__form__btns__send" type="link">{t(`send.${lang}`)}</Button>
            </div>
          </Col>
        </Row>
      </form>
    </div>
  )
}

export default Feedback