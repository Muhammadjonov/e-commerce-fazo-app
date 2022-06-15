import { Checkbox } from 'antd';
import React from 'react'
import { UseFormRegister } from 'react-hook-form';
import "./_style.scss";

interface ICheckBoxFilter {
  register: UseFormRegister<any>;
  id: string;
  name: string;
  count?: number
}


function CheckBoxFilter(props: ICheckBoxFilter) {

  const { register, id, name, count } = props;

  return (
    <Checkbox className='checkbox_filter' {...register(id)} >
      {name} {count && <span className="count">({count})</span>}
    </Checkbox>
  )
}

export default CheckBoxFilter