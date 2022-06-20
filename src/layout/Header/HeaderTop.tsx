import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { headerTopMenuUrl } from '../../api/apiUrls';
import baseAPI from '../../api/baseAPI';
import LanguageComp from '../../components/LanguageComp';
import Location from '../../components/Location';
import Logo from '../../components/Logo';
import PhoneComp from '../../components/PhoneComp';
import { useT } from '../../custom/hooks/useT';
import { HeaderInfoType, HeaderTopMenuInfoType, HeaderTopMenuResType } from '../../types';


let color_black2 = "#909090";

function HeaderTop(props: HeaderInfoType) {
  const { lang } = useT();
  const { phone, logo } = props;
  const [headerTopMenus, setHeaderTopMenus] = useState<HeaderTopMenuInfoType>([]);

  const getHeaderTopMenus = useCallback(() => {
    baseAPI.fetchAll<HeaderTopMenuResType>(headerTopMenuUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setHeaderTopMenus(res.data.data);
        }
      })
  }, [])

  useEffect(() => {
    getHeaderTopMenus();
  }, [getHeaderTopMenus])

  return (
    <div className='header_top'>
      <div className="container">
        <nav className='desktop_header_top'>
          <div className="left">
            <ul>
              {/* <li>
                <Location iconName='map-pin' />
              </li> */}
              {
                headerTopMenus.map((headerTopMenu) => (
                  <li key={headerTopMenu.urlValue}>
                    <Link className="header_top_link" to={`/page/${headerTopMenu.urlValue}`}>
                      {headerTopMenu.name}
                    </Link>
                  </li>

                ))
              }
            </ul>

          </div>
          <div className="right">
            <ul>
              <li>
                <PhoneComp phone={phone} isShowNumber={true} iconName={"phone-tel"} />
              </li>
              <li>
                <LanguageComp />
              </li>
            </ul>
          </div>
        </nav>
        <nav className="mobile_header_top">
          <Logo logo={logo} />
          <PhoneComp phone={phone} isShowNumber={false} iconName={"mobile_tel"} />
          {/* <Location iconName={"mobile_map-pin"} color={color_black2} /> */}
        </nav>
      </div>
    </div>
  )
}

export default HeaderTop;