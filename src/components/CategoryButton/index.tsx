import { Button } from 'antd'
import "./_style.scss";

function CategoryButton() {


  return (
    <Button
      className="category_btn"
      ghost
      id="caregory_open_btn"
    ><img src="/assets/icons/hamburger.svg" alt="menu" />  <span className='btn_text'>Категории</span></Button>
  )
}

export default CategoryButton
