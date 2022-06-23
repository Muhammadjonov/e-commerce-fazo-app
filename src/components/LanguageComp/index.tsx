import React from 'react'
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useT } from '../../custom/hooks/useT';
import { changeLang, LangType, setLang } from '../../helpers';

export type Tlangs = [
  {
    1: string,
    2: "ru"
  },
  {
    1: string,
    2: "uz"
  }

]

function LanguageComp() {
  const { lang } = useT();
  let langs: Tlangs = [{ 1: "Ру", 2: "ru" }, { 1: "O'zb", 2: "uz" }];

  const handleSetLang = (language: LangType) => {
    setLang(language);
    changeLang(language);
    window.location.reload();

  }

  let langMenu = (
    <Menu>
      {langs.filter(lg => lg[2] !== lang).map((language, idx) => (
        <Menu.Item key={idx} onClick={() => handleSetLang(language[2])}>
          <span>{language[1]}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  const currentLangText = lang === "uz" ? "O'zb" : "Ру";

  return (
    <Dropdown overlay={langMenu} placement="bottomRight">
      <span className='p16_regular lang_text'>{currentLangText} <DownOutlined /></span>
    </Dropdown>
  )
}

export default LanguageComp