import { UseFormRegister } from 'react-hook-form';
import { useT } from '../../../custom/hooks/useT';
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
  } = props;
  const { t, lang } = useT();

  return (
    <div className="textarea__wrapper">
      <textarea className="custom_textarea" placeholder={label} id={name}  {...register(name, { required, disabled })} />
      <label className="custom_label" htmlFor={name}>{label}</label>
      {errors[name] && <span className='error_message'>{t(`requiredErrMessage.${lang}`)}</span>}
    </div>
  )
}

export default Textarea;