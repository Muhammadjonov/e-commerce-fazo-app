import React from "react";

import { Select } from "antd";
import "./_style.scss";
import { AlifInfoType } from "../../../types";

const { Option } = Select;


interface IGoodOption {
  installmentData: AlifInfoType[]
}

export default function GoodOption(props: IGoodOption) {
  const { installmentData } = props;

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <React.Fragment>
      <Select
        className="installment_selector_periud"
        placeholder="To'lov muddati"
        onChange={handleChange}
        defaultValue={"1"}
      >
        {
          installmentData?.map((item) => (
            <Option key={item.id} value={item.amount}>{item.name}</Option>
          ))
        }
      </Select>
      <p className="good_option_installment title20_bold">
        2 042 417 cум / <br /> месяц
      </p>
    </React.Fragment>
  );
}
