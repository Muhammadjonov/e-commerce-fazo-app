import { UseFormRegister } from 'react-hook-form';
import { useT } from '../../../custom/hooks/useT';
import "./_style.scss";

interface IInputComp {
  name: string,
  label: string,
  required?: boolean,
  register: UseFormRegister<any>,
  errors: any,
  disabled?: boolean,
  type?: string
}

const InputComp = (props: IInputComp) => {
  const {
    name,
    label,
    required = true,
    register,
    errors,
    disabled,
    type = "text"
  } = props;

  const { t, lang } = useT();

  return (
    <div className="input_wrapper">
      <input className="custom_input" type={type} placeholder={label} id={name}  {...register(name, { required, disabled })} />
      <label className="custom_label" htmlFor={name}>{label}</label>
      {errors[name] && <span className='error_message'>{t(`requiredErrMessage.${lang}`)}</span>}
    </div>
  )
}

export default InputComp;