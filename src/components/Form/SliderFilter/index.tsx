import React from 'react'
import { Slider } from "antd";
import "./_style.scss";
import { UseFormRegister } from 'react-hook-form';


interface ISliderFilter {
  register: UseFormRegister<any>;
}

function SliderFilter(props: ISliderFilter) {

  const { register } = props;

  return (
    <div className='slider_filter'>
      <div className="top">
        <input className="min_price" type="number" {...register("min_price")} />
        <input className="max_price" {...register("max_price")} />
      </div>
      <Slider className="max_min_slider" range defaultValue={[20, 50]} tipFormatter={null} />
    </div>
  )
}

export default SliderFilter