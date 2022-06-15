import { useState } from 'react';
import { Badge, Button, Col, Drawer, Row } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo';
import MobileSearchComp from '../../components/MobileSearchComp';
import SearchComp from '../../components/SearchComp';
import { useT } from "../../custom/hooks/useT";
import PhoneComp from '../../components/PhoneComp';
import { changeLang, LangType, setLang } from '../../helpers';
import { HeartOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { CategoriesInfoType } from '../../types';

const drowerMenusData = [
  {
    id: "1",
    img: "/assets/icons/menu1.svg",
    text: "Наши магазины"
  },
  {
    id: "2",
    img: "/assets/icons/menu2.svg",
    text: "B2B продажи"
  },
  {
    id: "3",
    img: "/assets/icons/menu3.svg",
    text: "Покупка в рассрочку"
  },
  {
    id: "4",
    img: "/assets/icons/menu4.svg",
    text: "Способы оплаты"
  },
  {
    id: "5",
    img: "/assets/icons/menu5.svg",
    text: "Гарантия на товары"
  },

]

interface IHeaderCenter {
  logo: string,
  phone: string,
  categories: CategoriesInfoType,
}

function HeaderCenter(props: IHeaderCenter) {
  const [isOpenHeaderCentrDrower, setIsOpenHeaderCentrDrower] = useState<boolean>(false)
  const { t, lang } = useT();
  const { logo, phone, categories } = props;

  const handleOpen = (value: boolean) => setIsOpenHeaderCentrDrower(value)

  const drowerTitle = (
    <Link
      onClick={() => handleOpen(false)}
      className="logo"
      to={"/"}>
      <img className="logo_img" src={logo} alt="logo" />
    </Link>
  )

  const handleChangeLang = (language: LangType) => {
    setLang(language)
    changeLang(language);
    handleOpen(false);
  }

  return (
    <div className="header_center">
      <div className="container">
        <div className="header_centr">
          <Row gutter={[16, 16]}>
            <Col lg={4}>
              <div className="header_center_left">
                <Logo logo={logo} />
              </div>
            </Col>
            <Col lg={11} offset={1}>
              <div className="header_center_middle">
                <SearchComp categories={categories} />
              </div>
            </Col>
            <Col lg={6} offset={2}>
              <div className="header_center_right">
                <ul>
                  <li>
                    <Link
                      className="right_item"
                      to={""}
                    >
                      <UserOutlined style={{ fontSize: '26px', color: 'var(--brand_color_black)' }} />
                      <span className="user_nav_text">
                        {t(`signIn.${lang}`)}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="right_item"
                      to={"/balance"}
                    >
                      <Badge count={11}>
                        <i className="fa-solid fa-scale-unbalanced"></i>
                      </Badge>
                      <span className="user_nav_text">Сравнение</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="right_item"
                      to={"/favorites"}
                    >
                      <Badge count={5}>
                        <HeartOutlined style={{ fontSize: '26px', color: 'var(--brand_color_black)' }} />
                      </Badge>
                      <span className="user_nav_text">{t(`favorite.${lang}`)}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="right_item"
                      to={""}
                    >
                      <Badge count={11}>
                        <ShoppingCartOutlined style={{ fontSize: '26px', color: 'var(--brand_color_black)' }} />
                      </Badge>
                      <span className="user_nav_text">Корзина</span>
                    </Link>
                  </li>

                </ul>
              </div>

            </Col>

          </Row>

        </div>
        {/* mobile header centr */}
        <div className="mobile_header_centr">
          {/* drower */}

          <Button type="primary" onClick={() => handleOpen(true)} className="open_drower_btn">
            <img src="/assets/icons/bars.svg" alt="bars" />
          </Button>

          <MobileSearchComp />


          <Drawer
            title={drowerTitle}
            placement={"left"}
            onClose={() => handleOpen(false)}
            visible={isOpenHeaderCentrDrower}
            key={"right"}
            className={"header_top_drower"}
          >
            <div className="reg_area">
              <div className="left">
                <button type="button" className={"sign_in_btn"}>
                  <span className="user_wrapper">
                    <img src="/assets/icons/user.svg" alt="user" />
                  </span>
                  <span className="p14_regular sign_in_text" >Войти</span>
                </button>
              </div>
              <div className="right">
                <button type="button" className={"sign_up_btn"}>
                  <span className="p14_regular sign_up_text">Регистрация</span>
                </button>
              </div>
            </div>
            <ul className="menu_wrapper">
              {
                drowerMenusData.map(data => (
                  <li key={data.id} className='menu'>
                    <Link
                      to={data.img}
                      className="p14_regular"
                      onClick={() => handleOpen(false)}
                    >
                      <img src={data.img} alt="menu_img" />
                      {data.text}
                    </Link>
                  </li>
                ))
              }
            </ul>
            <div className="langs_area">
              <button
                type='button'
                className={`lang_btn p16_regular ${lang === "ru" ? "active" : ""}`}
                onClick={() => handleChangeLang("ru")}
              >
                Рус
              </button>
              <button
                type='button'
                className={`lang_btn p16_regular ${lang === "uz" ? "active" : ""}`}
                onClick={() => handleChangeLang("uz")}
              >
                Узб
              </button>
            </div>

            <div className="tel_area">
              <PhoneComp phone={phone} iconName='mobile_tel' isShowNumber={true} />
            </div>
          </Drawer>



        </div>
      </div>
    </div>
  )
}

export default HeaderCenter