import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Button, Checkbox } from 'antd';
import "./_style.scss";
import InputComp from '../../../../components/Form/InputComp';


const ChangeAddress = () => {

  const { register, control, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data: any) => console.log("data", data);

  // console.log(watch("home")); // watch input value by passing the name of it

  return (
    <div className="address_change">
      <form onSubmit={handleSubmit(onSubmit)} className="add_address_form">

        <div className="change_item">
          <input placeholder='Улица' id="address"  {...register("address", { required: true })} />
          <label htmlFor="address">Улица</label>
          {errors.address && <span className='error_message'>This field is required</span>}
        </div>

        <div className="change_wrap">
          <InputComp name="home" label="Дом" register={register} errors={errors} />
          <InputComp name="flat" label="Квартира" register={register} errors={errors} />
        </div>

        <div className="isDefaultAddress_wrap">
          <Controller
            name="isDefaultAddress"
            control={control}
            render={({ field }) => <Checkbox {...field} >Адрес по умолчанию</Checkbox>}
          />
        </div>

        <div className="submit_btn">
          <input type="submit" className="change_save" value={"Сохранить"} />
          <Button className="cancel_btn" ghost>Отмена</Button>
        </div>
      </form>
    </div>
  )
}

export default ChangeAddress