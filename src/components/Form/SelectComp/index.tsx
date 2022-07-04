import React from 'react'
import { Select } from 'antd';
import { Control, Controller, UseFormRegister } from 'react-hook-form';
import "./_style.scss";

const { Option } = Select;

interface ISelectComp {
  label: string,
  name: string,
  register: UseFormRegister<any>,
  errors: any,
  control: Control<any>,
  select: any,
  required?: boolean
}

const SelectComp = (props: ISelectComp) => {
  const { label, name, register, errors, control, select, required = true } = props;
  return (
    <div className="select__wrapper">
      <Controller
        name={name}
        control={control}
        rules={{ required }}
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
            Object.keys(select)?.map(item => (
              <Option key={item} value={item}>{select[item]}</Option>
            ))
          }
        </Select>)}
      />
      <label className="custom__label">{label}</label>
      {errors[name] && <span className='error_message'>This field is required</span>}
    </div>
  )
}

export default SelectComp