import React from "react";

import { Select } from "antd";
import "./_style.scss";
import { AlifInfoType } from "../../../types";
import { formatPrice } from "../../../helpers";
import { useT } from "../../../custom/hooks/useT";

const { Option } = Select;


interface IGoodOption {
  installmentData: AlifInfoType[];
  totalPrice: number
}

export default function GoodOption(props: IGoodOption) {
  const { installmentData, totalPrice } = props;
  const { t, lang } = useT();
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <React.Fragment>
      <Select
        className="installment_selector_periud"
        placeholder="Срок рассрочки"
        onChange={handleChange}
      >
        {
          installmentData?.map((item) => (
            <Option key={item.id} value={item.amount}>{item.name}</Option>
          ))
        }
      </Select>
      <p className="good_option_installment title20_bold">
        {formatPrice(totalPrice)} {t(`sum.${lang}`)} /  месяц
      </p>
    </React.Fragment>
  );
}
