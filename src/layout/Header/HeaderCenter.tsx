import { useContext, useState } from 'react';
import { Badge, Button, Col, Drawer, Dropdown, Menu, Row } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo';
import MobileSearchComp from '../../components/MobileSearchComp';
import SearchComp from '../../components/SearchComp';
import { useT } from "../../custom/hooks/useT";
import PhoneComp from '../../components/PhoneComp';
import { changeLang, LangType, removeTokens, removeUserFromLocalStorage, setLang } from '../../helpers';
import { CategoriesInfoType, HeaderTopMenuInfoType, } from '../../types';
import { AuthContext } from '../../App';
import { useAppSelector } from '../../Store/hooks';
import { logout } from '../../features/authSlice';
import { useDispatch } from 'react-redux';

interface IHeaderCenter {
  logo: string,
  phone: string,
  categories: CategoriesInfoType,
  headerTopMenus: HeaderTopMenuInfoType
}

function HeaderCenter(props: IHeaderCenter) {
  const { logo, phone, categories, headerTopMenus } = props;
  const [isOpenHeaderCentrDrower, setIsOpenHeaderCentrDrower] = useState<boolean>(false)
  const { t, lang } = useT();
  const dispatch = useDispatch();
  const userData = useAppSelector(state => state.auth);

  const authContext = useContext(AuthContext);


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

  const handleLogout = () => {
    removeUserFromLocalStorage();
    removeTokens();
    dispatch(logout());
  }
  // userDropdown menu

  const userMenu = (
    <Menu
      items={[
        {
          label: <Link to="/profile">{t(`profile.${lang}`)}</Link>,
          key: '0',
        },
        {
          label: <Link to={"#"}>To'lov tarixi</Link>,
          key: '1',
        },
        {
          label: <Link to={"#"}>Mening buyurtmalarim</Link>,
          key: '2',
        },
        {
          label: <Link
            to="/"
            onClick={handleLogout}
          >{t(`logout.${lang}`)}</Link>,
          key: '3',
        },
      ]}
    />
  )

  return (
    <div className="header_center">
      <div className="container">
        <div className="header_centr">
          <Row gutter={[16, 16]}>
            <Col md={4}>
              <div className="header_center_left">
                <Logo logo={logo} />
              </div>
            </Col>
            <Col md={11} offset={1}>
              <div className="header_center_middle">
                <SearchComp categories={categories} />
              </div>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} md={8}>
              <div className="header_center_right">
                <ul>
                  <li>
                    {
                      !userData?.authorized ? (
                        <button type='button'
                          className="right_item"
                          onClick={authContext.onOpenSignInModal}
                        >
                          <img src="/assets/icons/User.svg" alt="user" />
                          <span className="user_nav_text">
                            {t(`signIn.${lang}`)}
                          </span>
                        </button>
                      ) : (
                        <Dropdown
                          overlay={userMenu}
                          trigger={['click']}
                        >
                          <div className="right_item">
                            <img src="/assets/icons/User.svg" alt="user" />
                            <span className="user_nav_text">
                              {userData?.user?.firstname?.slice(0, 7)}...
                            </span>
                          </div>
                        </Dropdown>
                      )
                    }
                  </li>
                  <li>
                    <Link
                      className="right_item"
                      to={"/balance"}
                    >
                      <Badge count={11}>
                        <img src="/assets/icons/Compare.svg" alt="Compare-icon" />
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
                        <img src="/assets/icons/heart.svg" alt="heart-icon" />
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
                        <img src="/assets/icons/shopping-cart.svg" alt="shopping-cart-icon" />
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
                headerTopMenus.map((headerTopMenu) => (
                  <li key={headerTopMenu.urlType} className='menu'>
                    <Link
                      to={`/page/${headerTopMenu.urlValue}`}
                      className="p14_regular"
                      onClick={() => handleOpen(false)}
                    >
                      <img src={headerTopMenu.imageUrl} alt={headerTopMenu.urlValue} />
                      {headerTopMenu.name}
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
    </div >
  )
}

export default HeaderCenter