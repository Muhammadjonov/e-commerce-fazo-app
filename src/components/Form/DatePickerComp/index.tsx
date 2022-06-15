import React from 'react'
import { DatePicker } from "antd";
import "./_style.scss";
import { Control, Controller, UseFormRegister } from 'react-hook-form';

interface IDatePickerComp {
  label: string,
  name: string,
  register: UseFormRegister<any>,
  errors: any,
  control: Control<any>
}

const DatePickerComp = (props: IDatePickerComp) => {

  const { label, name, register, errors, control } = props;

  return (
    <div className="datapicker__comp">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker placeholder='' className='date__picker' size='large' {...field} />
        )}
      />
      <label className="custom__label">{label}</label>
      {errors[name] && <span className='error_message'>This field is required</span>}
    </div>
  )
}

export default DatePickerComp