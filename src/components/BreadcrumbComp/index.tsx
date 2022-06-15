import React from 'react'
import { Breadcrumb } from "antd";
import { Link } from 'react-router-dom';
import "./_style.scss";
import { useT } from '../../custom/hooks/useT';

interface IBreadcrumbComp {
  breadcrumbs:
  {
    id: number,
    toUrl: string,
    text: string
  }[]

}

function BreadcrumbComp(props: IBreadcrumbComp) {
  const { breadcrumbs } = props;

  const { lang } = useT();

  return (
    // @ts-ignore
    <Breadcrumb
      className='breadcrumb_comp'
      separator={<i className="fa-solid fa-angle-right"></i>}
    >
      {
        breadcrumbs.map(breadcrumb => (
          // @ts-ignore
          <Breadcrumb.Item key={breadcrumb.id}>
            <Link className="breadcrm_link" to={breadcrumb.toUrl}>{breadcrumb.text} </Link> </Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  )
}

export default BreadcrumbComp;