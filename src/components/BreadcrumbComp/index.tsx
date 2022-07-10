import React from 'react'
import { Breadcrumb } from "antd";
import { Link } from 'react-router-dom';
import "./_style.scss";
import { useT } from '../../custom/hooks/useT';

interface IBreadcrumbComp {
  breadcrumbs:
  {
    id: string,
    toUrl: string,
    text: string,
    className: string
  }[]

}

function BreadcrumbComp(props: IBreadcrumbComp) {
  const { breadcrumbs } = props;

  const { lang } = useT();

  return (
    <Breadcrumb
      className='breadcrumb_comp'
      separator={<i className="fa-solid fa-angle-right"></i>}
    >
      {
        breadcrumbs.map((breadcrumb) => {
          let last = breadcrumbs[breadcrumbs?.length - 1].id === breadcrumb.id;
          return (
            <Breadcrumb.Item key={breadcrumb.id} className={breadcrumb.className}>
              {
                last ? (breadcrumb.text)
                  : (
                    <Link className="breadcrm_link" to={breadcrumb.toUrl}>{breadcrumb.text}
                    </Link>
                  )
              }
            </Breadcrumb.Item>
          )
        }
        )
      }
    </Breadcrumb>
  )
}

export default BreadcrumbComp;