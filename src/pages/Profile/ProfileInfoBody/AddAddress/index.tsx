import React from 'react'
import "./_style.scss";
import { Controller, useForm } from 'react-hook-form';
import { Button, Checkbox } from 'antd';
import InputComp from '../../../../components/Form/InputComp';
import OutlineBtn from '../../../../components/Buttons/OutlineBtn';

const AddAddress = () => {


  const { register, control, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data: any) => console.log("data", data);

  // console.log(watch("home")); // watch input value by passing the name of it

  return (
    <div className="new_address">
      <form onSubmit={handleSubmit(onSubmit)} className="add_address_form">

        <InputComp name="address" register={register} errors={errors} label="Улица" />

        <div className="change_wrap">

          <InputComp name="home" register={register} errors={errors} label="Улица" />
          <InputComp name="address" register={register} errors={errors} label="Улица" />

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
          <OutlineBtn text={"Отмена"} />

        </div>
      </form>
    </div>
  )
}

export default AddAddress