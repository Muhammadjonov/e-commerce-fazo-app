import React from 'react';
import { Link } from 'react-router-dom'
import './_style.scss';

function RightBlock() {

  return (
    <div className="footer_right_box">
      <div className="footer_right_wrapper">
        <div className="footer_right_wrapper_item">
          <h2 className="title20_bold">Категории</h2>
          <ul>
            <li>
              <Link to="#">Ноутбуки</Link>
            </li>
            <li>
              <Link to="#">Игровые кресла</Link>
            </li>
            <li>
              <Link to="#">Телефоны</Link>
            </li>
            <li>
              <Link to="#">Модули памяти</Link>
            </li>
            <li>
              <Link to="#">Моноблоки</Link>
            </li>
          </ul>
        </div>
        <div className="footer_right_wrapper_item">
          <h2 className="title20_bold">Общее</h2>
          <ul>
            <li>
              <Link to="#">Новости</Link>
            </li>
            <li>
              <Link to="#">О нас</Link>
            </li>
            <li>
              <Link to="#">Наши магазины</Link>
            </li>
            <li>
              <Link to="#">Политика конфиденциальности</Link>
            </li>
            <li>
              <Link to="#">Правила программы лояльности</Link>
            </li>
            <li>
              <Link to="#">Контакты</Link>
            </li>
          </ul>
        </div>
        <div className="footer_right_wrapper_item">
          <h2 className="title20_bold">Покупателям</h2>
          <ul>
            <li>
              <Link to="#"></Link>
            </li>
            <li>
              <Link to="#">Покупка в рассрочку</Link>
            </li>
            <li>
              <Link to="#">Доставка и оплата</Link>
            </li>
            <li>
              <Link to="#">Правила покупок с cashback</Link>
            </li>
            <li>
              <Link to="#">Возврат / Обмен</Link>
            </li>
            <li>
              <Link to="#">Правила пользования купонами</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default RightBlock;