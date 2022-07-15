import { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { AudioOutlined } from '@ant-design/icons';
import "./_style.scss";
import { CategoriesInfoType } from "../../types";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
  let { pathname } = useLocation();

  const handleSearchValue = (e: any) => {
    setSearchValues(prev => ({ ...prev, key: e.target.value.trim() }));
  }

  const onSelect = (value: any) => {
    setSearchValues(prev => ({ ...prev, category: value }));
  };

  const onSearch = () => {
    if (searchValues.key && searchValues.key.length > 2) {
      navigate(`/search?${new URLSearchParams(searchValues)}`);
    }
  }

  // pathname o'zgarganda search ni tozalash logikasi

  useEffect(() => {
    setSearchValues({
      category: "all",
      key: ""
    })
  }, [pathname])


  return (

    <Input.Group compact className='search_wrapper'>
      <Select
        bordered={false}
        value={searchValues.category}
        style={{ width: '30%' }}
        size='large'
        onSelect={onSelect}
        getPopupContainer={() => document.getElementById("search__comp")!}
      >
        <Option value="all">{t(`allCategory.${lang}`)}</Option>
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
        value={searchValues.key}
        style={{ width: "70%" }}
        onChange={handleSearchValue}
      />
      {/* <button type="button" className="mic_btn">
        <AudioOutlined />
      </button> */}
    </Input.Group>
  )
}

export default SearchComp