import { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { AudioOutlined } from '@ant-design/icons';
import "./_style.scss";
import { CategoriesInfoType } from "../../types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useT } from "../../custom/hooks/useT";

const { Search } = Input;
const { Option } = Select;


interface ISearchComp {
  categories: CategoriesInfoType
}

function SearchComp(props: ISearchComp) {
  const { t, lang } = useT();

  const enterButton = (
    <>
      <img src="/assets/icons/search.svg" alt="search" />
      <span className="search_btn_text">{t(`search.${lang}`)}</span>
    </>
  );

  const [searchValues, setSearchValues] = useState({
    category: "all",
    key: ""
  })
  const { categories } = props;
  const navigate = useNavigate();

  const handleSearchValue = (e: any) => {
    setSearchValues(prev => ({ ...prev, key: e.target.value.trim() }));
  }


  // let body = document.querySelector("body")!;
  const onSelect = (value: any) => {
    setSearchValues(prev => ({ ...prev, category: value }));
    // body.style.overflowY = "auto";

  };

  const onSearch = () => {
    if (searchValues.key && searchValues.key.length > 2) {
      navigate(`/search?${new URLSearchParams(searchValues)}`);
    }
  }

  // body is not scroll

  // const onFocus = () => {
  //   body.style.overflowY = "hidden";
  // }

  // const onBlur = () => {
  //   body.style.overflowY = "auto";
  // }

  return (

    <Input.Group compact className='search_wrapper' >
      <Select
        bordered={false}
        defaultValue={"Все категории"}
        style={{ width: '30%' }}
        size='large'
        onSelect={onSelect}
      // onFocus={onFocus}
      // onBlur={onBlur}
      >
        <Option value="all">Все категории</Option>
        {
          categories?.map(category => (
            <Option key={category.id} value={category.slug}>{category.title}</Option>
          ))
        }
      </Select>
      <Search
        bordered={false}
        size='large'
        // placeholder={"input search text"}
        enterButton={enterButton}
        onSearch={onSearch}
        style={{ width: "70%" }}
        onChange={handleSearchValue}
      />
      <button type="button" className="mic_btn">
        <AudioOutlined />
      </button>
    </Input.Group>
  )
}

export default SearchComp