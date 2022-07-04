import React from 'react'
import { UseFormRegister } from 'react-hook-form';
import "./_style.scss";

interface ITextarea {
  name: string,
  label: string,
  required?: boolean,
  register: UseFormRegister<any>,
  errors: any,
  disabled?: boolean,
  type?: string
}

const Textarea = (props: ITextarea) => {

  const {
    name,
    label,
    required = true,
    register,
    errors,
    disabled,
    type = "text"
  } = props;

  return (
    <div className="textarea__wrapper">
      <textarea className="custom_textarea" placeholder={label} id={name}  {...register(name, { required, disabled })} />
      <label className="custom_label" htmlFor={name}>{label}</label>
      {errors[name] && <span className='error_message'>This field is required</span>}
    </div>
  )
}

export default Textarea;