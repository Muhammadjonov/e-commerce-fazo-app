import React from "react";

import { Select } from "antd";
import "./_style.scss";

const { Option } = Select;

function onChange(value?: string | number) {
  console.log(`selected ${value}`);
}

function onSearch(val?: string | number) {
  console.log("search:", val);
}
export default function GoodOption() {
  return (
    <>
      <Select
        className="installment_selector_periud"
        showSearch
        placeholder="Выбрать срок"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input?: any, option?: string | any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="24_месяцев">24 месяцев</Option>
        <Option value="12_месяцев">12 месяцев</Option>
        <Option value="6_месяцев">6 месяцев</Option>
      </Select>
      <p className="good_option_installment title20_bold">
        2 042 417 cум / <br /> месяц
      </p>
    </>
  );
}
