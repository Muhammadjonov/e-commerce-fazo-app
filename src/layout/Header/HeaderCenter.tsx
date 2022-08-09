import { useContext, useState } from 'react';
import { Badge, Button, Col, Collapse, Drawer, Dropdown, Menu, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import MobileSearchComp from '../../components/MobileSearchComp';
import SearchComp from '../../components/SearchComp';
import { useT } from "../../custom/hooks/useT";
import PhoneComp from '../../components/PhoneComp';
import { changeLang, LangType, removeTokens, removeUserFromLocalStorage, setLang } from '../../helpers';
import { CategoriesInfoType, HeaderTopMenuInfoType, } from '../../types';
import { AuthContext, CartContext, MobileCategoriesContext } from '../../App';
import { useAppSelector } from '../../Store/hooks';
import { logout } from '../../features/authSlice';
import { useDispatch } from 'react-redux';
import { deleteAllFavourites } from '../../features/favourites/favouritesSlice';

const { Panel } = Collapse;
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
  const { data: favourites } = useAppSelector(state => state.favourites);
  const { products: inBasketProducts } = useAppSelector(state => state.basket);
  const { compares, totalElements } = useAppSelector((state) => state.compares);
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const mobileCategoriesContext = useContext(MobileCategoriesContext);
  let navigate = useNavigate()
  const handleOpen = (value: boolean) => {
    let fazoWrapper = document.querySelector(".mixel_wrapper")!;
    setIsOpenHeaderCentrDrower(value);

  }

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
    window.location.reload();
  }

  const handleLogout = () => {
    removeUserFromLocalStorage();
    removeTokens();
    dispatch(logout());
    dispatch(deleteAllFavourites());
    navigate("/", { replace: true })
  }
  // userDropdown menu
  const userMenu = (
    <Menu
      items={[
        {
          label: <Link to="/profile">{t(`personalCabinet.${lang}`)}</Link>,
          key: '1',
        },
        {
          label: <Link to={"/profile/order-history"}>{t(`myOrders.${lang}`)}</Link>,
          key: '2',
        },
        {
          label: <button
            type='button'
            onClick={handleLogout}
          >{t(`logout.${lang}`)}</button>,
          key: '3',
        },
      ]}
    />
  )

  // drawer sign in handle

  const handleOpenDrawerSignIn = () => {
    authContext.onOpenSignInModal();
    handleOpen(false);
  }
  const handleOpenDrawerSignUp = () => {
    authContext.onOpenSignUpModal();
    handleOpen(false);
  }

  // cart modal

  const handleOpenCart = () => {
    cartContext.onOpenCartModal();
  }

  // mobile categories 

  const handleOpenCategories = (value: boolean) => {
    if (value) {
      mobileCategoriesContext.onOpenMobileCategories();
    } else {
      mobileCategoriesContext.onCloseMobileCategories();
    }
  }

  const mobileCategoriesDrowerTitle = (
    <Link
      onClick={() => handleOpenCategories(false)}
      className="logo"
      to={"/"}>
      <img className="logo_img" src={logo} alt="logo" />
    </Link>
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
              <div className="header_center_middle" id="search__comp">
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
                          <img src="/assets/icons/user.svg" alt="user" />
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
                            <img src="/assets/icons/user.svg" alt="user" />
                            <span className="user_nav_text">
                              {userData?.user?.first_name?.slice(0, 7)}{(userData?.user?.first_name?.length) && (userData?.user?.first_name?.length > 7) ? "..." : ""}
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
                      <Badge count={totalElements}>
                        <img src="/assets/icons/balance.svg" alt="balance-icon" />
                      </Badge>
                      <span className="user_nav_text">{t(`comparison.${lang}`)}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="right_item"
                      to={"/favourites"}
                    >
                      <Badge count={favourites?.length}>
                        <img src="/assets/icons/heart.svg" alt="heart-icon" />
                      </Badge>
                      <span className="user_nav_text">{t(`favorite.${lang}`)}</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="right_item"
                      onClick={handleOpenCart}
                    >
                      <Badge count={inBasketProducts?.length}>
                        <img src="/assets/icons/shopping-cart.svg" alt="shopping-cart-icon" />
                      </Badge>
                      <span className="user_nav_text">{t(`cart.${lang}`)}</span>
                    </button>
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
              {
                !userData?.authorized ?
                  (
                    <>
                      <div className="left">
                        <button
                          type="button"
                          className={"sign_in_btn"}
                          onClick={handleOpenDrawerSignIn}
                        >
                          <span className="user_wrapper">
                            <img src="/assets/icons/user.svg" alt="user" />
                          </span>
                          <span className="p14_regular sign_in_text" >{t(`signIn.${lang}`)}</span>
                        </button>
                      </div>
                      <div className="right">
                        <button
                          type="button"
                          className={"sign_up_btn"}
                          onClick={handleOpenDrawerSignUp}
                        >
                          <span className="p14_regular sign_up_text">{t(`registration.${lang}`)}</span>
                        </button>
                      </div>
                    </>) : (
                    <Dropdown
                      overlay={userMenu}
                      trigger={['click']}
                    >
                      <div className="right_item">
                        <img src="/assets/icons/user.svg" alt="user" />
                        <span className="reg_area__user__text">
                          {userData?.user?.first_name}
                        </span>
                      </div>
                    </Dropdown>
                  )
              }
            </div>
            <ul className="menu_wrapper">
              {
                headerTopMenus.map((headerTopMenu) => (
                  <li key={headerTopMenu.name} className='menu'>
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
                O'zb
              </button>
            </div>

            <div className="tel_area">
              <PhoneComp phone={phone} iconName='mobile_tel' isShowNumber={true} />
            </div>
          </Drawer>

          {/* mobile category drower */}
          <Drawer
            title={mobileCategoriesDrowerTitle}
            placement="left"
            onClose={() => handleOpenCategories(false)}
            visible={mobileCategoriesContext.isOpenMobileCategories}
            className="mobile_categories_drower"
          >
            <Collapse
              // defaultActiveKey={['1']}
              accordion
              ghost
              expandIconPosition="end"
            >
              {
                categories.map(category => (
                  <Panel header={<div className="mobile_categories_drower__panel__header"><i className={category.icon}></i><span>{category.title}</span></div>} key={category.id}>
                    {
                      category.subCategories.map(subcategory => (

                        <Link key={subcategory.id} to={`/category/${subcategory.slug}`} onClick={() => handleOpenCategories(false)}>{subcategory.title}</Link>

                      ))
                    }
                  </Panel>
                ))
              }
            </Collapse>
          </Drawer>
        </div>
      </div>
    </div >
  )
}

export default HeaderCenter