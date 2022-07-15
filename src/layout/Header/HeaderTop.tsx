import { Link } from 'react-router-dom';
import LanguageComp from '../../components/LanguageComp';
import Logo from '../../components/Logo';
import PhoneComp from '../../components/PhoneComp';
import { HeaderTopMenuInfoType } from '../../types';


interface IHeaderTop {
  logo: string,
  phone: string,
  headerTopMenus: HeaderTopMenuInfoType
}

function HeaderTop(props: IHeaderTop) {
  const { logo, phone, headerTopMenus } = props;

  return (
    <div className='header_top'>
      <div className="container">
        <nav className='desktop_header_top'>
          <div className="left">
            <ul>
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
        </nav>
      </div>
    </div>
  )
}

export default HeaderTop;