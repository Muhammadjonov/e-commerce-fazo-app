import { Button } from 'antd'
import { useT } from '../../custom/hooks/useT';
import "./_style.scss";


function CategoryButton() {
  const { t, lang } = useT();
  return (
    <Button
      className="category_btn"
      type="link"
      id="caregory_open_btn"
    ><img src="/assets/icons/hamburger.svg" alt="menu" />  <span className='btn_text'>{t(`category.${lang}`)}</span></Button>
  )
}

export default CategoryButton
