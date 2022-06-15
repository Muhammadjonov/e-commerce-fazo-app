import React from 'react'

interface ITopTitleArea {
  number: string,
  title: string
}

const TopTitleArea = (props: ITopTitleArea) => {
  const { number, title } = props;
  return (
    <div className="top_title_area">
      <span className="title_number title18_bold">
        {number}
      </span> <h4 className="title18_bold top_title" >{title}</h4>
    </div>
  )
}

export default TopTitleArea