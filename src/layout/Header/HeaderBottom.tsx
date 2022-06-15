import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import BurgerMenu from '../../components/BurgerMenu';
import CategoryMenus from '../../components/CategoryButton';
import { CategoriesInfoType, MenuCategoriesInfoType } from "../../types";

interface IHeaderBottom {
  categories: CategoriesInfoType,
  menuCategories: MenuCategoriesInfoType
}

function HeaderBottom(props: IHeaderBottom) {
  const { categories, menuCategories } = props;
  const [isShowBurgerMenu, setIsShowBurgerMenu] = useState<boolean>(false);
  let { category_slug } = useParams();
  category_slug = category_slug?.slice(1);

  // activeClassName

  const createActiveClassName = (slug: string) => {
    return category_slug === slug ? 'active' : '';
  }

  return (
    <div className="header_bottom">
      <div className="container">
        <ul className="categories desktop_categories">
          <li className="category">
            <span onClick={() => setIsShowBurgerMenu(prev => !prev)}>
              <CategoryMenus />
            </span>
          </li>
          {
            menuCategories?.map(category => (
              <li className="category" key={category.id}>
                <NavLink className={createActiveClassName(category.slug)} to={`/category/:${category.slug}`}>
                  {category.title}
                </NavLink>
              </li>
            ))
          }
        </ul>

      </div>
      <BurgerMenu categories={categories} isOpen={isShowBurgerMenu} setIsShowBurgerMenu={setIsShowBurgerMenu} />
    </div>
  )
}

export default HeaderBottom