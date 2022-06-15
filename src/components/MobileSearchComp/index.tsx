import React, { useState } from 'react'
import { Input } from "antd"
import "./_style.scss";
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const enterButton = (
  <img src="/assets/icons/search.svg" alt="search" />
);


function MobileSearchComp() {
  const [searchValues, setSearchValues] = useState({
    category: "all",
    key: ""
  })
  const navigate = useNavigate();

  const handleSearchValue = (e: any) => {
    setSearchValues(prev => ({ ...prev, key: e.target.value.trim() }));
  }

  const onSearch = () => {
    if (searchValues.key && searchValues.key.length > 2) {
      navigate(`/search?${new URLSearchParams(searchValues)}`);
    }
  }

  return (
    <Search
      onChange={handleSearchValue}
      bordered={false}
      size="middle"
      placeholder="input search text"
      enterButton={enterButton}
      onSearch={onSearch}
      style={{ maxWidth: "100%" }}
      className="mobile_search"
    />
  )
}

export default MobileSearchComp