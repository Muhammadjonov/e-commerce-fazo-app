import React from 'react'
import "./_style.scss";


interface ICompareItem {
  id: string,
  isActiveClass: boolean,
  text: string
}

const CompareItem = (props: ICompareItem) => {

  const { isActiveClass, text } = props;

  return (

    <span className={`compare_item ${isActiveClass ? "active" : ""}`}>

      {text}

      <button type='button' className="detete_compare_item">
        <i className="fa-solid fa-xmark"></i>
      </button>
    </span>
  )
}

export default CompareItem;