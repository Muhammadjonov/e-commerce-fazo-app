import { NavLink } from 'react-router-dom'
import { useT } from '../../../custom/hooks/useT';
import { RecommendedCategoriesInfoType } from '../../../types';
import "./_style.scss";

interface IPopularModels {
  popularCategories: RecommendedCategoriesInfoType
}

export default function PopularModels(props: IPopularModels) {
  const { popularCategories } = props;
  const { t, lang } = useT()
  return (
    <>
      <div className="popular_models">
        <h2 className='popular_modal_title title24_bold'>{t(`popularModelAndCategory.${lang}`)}</h2>
        <div className="popular_models_content">
          {
            popularCategories.map((category) => (
              <NavLink
                className={isActive => "popular_model_nav_link p14_regular" + (!isActive ? "popular_model_nav_unselected" : "")
                }
                key={category.id}
                to={`/category/${category.slug}`}
              >
                {category.title}
              </NavLink>
            ))
          }
        </div>
      </div>
    </>
  )
}
