import { RightOutlined } from '@ant-design/icons';
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { CategoriesInfoType } from '../../types';
import "./_style.scss";

interface IBurgerMenu {
  isOpen: boolean;
  setIsShowBurgerMenu: Dispatch<SetStateAction<boolean>>,
  categories: CategoriesInfoType
}


function BurgerMenu(props: IBurgerMenu) {

  const { isOpen, setIsShowBurgerMenu, categories } = props;

  const openCity = (event: React.MouseEvent<Element, MouseEvent>, categoryName: string) => {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent")!;
    for (i = 0; i < tabcontent.length; i++) {
      const currentTabContent = tabcontent[i] as HTMLElement;
      currentTabContent.style["display"] = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(categoryName)!.style.display = "block";
    event.currentTarget.className += " active";
  }

  // burger menu boshqa polya bosilganda yopilish logikasi
  useEffect(() => {
    const burgerMenu = document.getElementById("burger_menu")!;
    const openBtn = document.getElementById("caregory_open_btn")!;
    const cubcategoryLink = document.getElementsByClassName("subcategry_links")!;
    // const tabLink = document.getElementsByClassName("tablinks")!;

    document.body.addEventListener("click", function (e: any) {
      const clickedPlace = e.target as Node;
      if (!(burgerMenu.contains(clickedPlace) || openBtn.contains(clickedPlace)) || (Array.from(cubcategoryLink).some(el => el.contains(clickedPlace)))) {
        setIsShowBurgerMenu(false);
      }
    });
  }, [setIsShowBurgerMenu]);

  let body = document.querySelector("body")!;

  useEffect(() => {
    if (isOpen) {
      body.style.overflowY = "hidden";
    } else {
      body.style.overflowY = "auto";
    }


    return () => {
      body.style.overflowY = "auto";
    }
  }, [isOpen])

  return (
    <div className={`burger__menu ${isOpen ? "active" : ""}`}>
      <div className="container">
        <div id="burger_menu" className={`burger_menu_wrapper`}>
          <div className="burger_menu">
            {/* menu tab */}
            <div className="tab">
              <ul>
                {
                  categories?.map((category) => (
                    <li
                      className="tablinks"
                      onMouseOver={(e) => openCity(e, category.slug)}
                      key={category.id}
                    >
                      <i className={category.icon + ` category__icon`}></i>
                      <span className="p18_regular">{category.title}</span> <RightOutlined className='right_arrow' />

                    </li>
                  ))
                }
              </ul>
            </div>
            {/* tab contents */}

            {
              categories?.map((category) => (
                <div id={category.slug} key={category.id} className="tabcontent">
                  <h3 className="title24_bold">{category.title}</h3>
                  <div className="tab_content_body">
                    <div className="subcategry_links">
                      {
                        category?.subCategories.map((subcategory) => (
                          <Link
                            to={`/category/${subcategory.slug}`}
                            className="p18_regular subcategory_link"
                            key={subcategory.id}
                          >
                            {subcategory.title}
                          </Link>
                        ))
                      }
                    </div>
                    <div className="category_img">
                      <img src={category.imageUrl} alt={category.title} />
                    </div>
                  </div>
                </div>
              ))
            }

          </div>
        </div>
      </div>
    </div >
  )
}

export default BurgerMenu