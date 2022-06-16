import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { footerSettingsUrl } from '../../api/apiUrls';
import baseAPI from '../../api/baseAPI';
import { FooterSettingsResType, FooterSettingsInfoType } from '../../types';
import './_style.scss';
function LeftBox() {
  const [footerSettings, setFooterSettings] = useState<FooterSettingsInfoType>({} as FooterSettingsInfoType);

  const getFooterSettings = useCallback(() => {
    baseAPI.fetchAll<FooterSettingsResType>(footerSettingsUrl)
      .then((res) => {
        if (res.data.status === 200) {
          setFooterSettings(res.data.data);
        }
      })
  }, [])

  useEffect(() => {
    getFooterSettings();
  }, [getFooterSettings])

  const { logo, phone, email, address, workingDays } = footerSettings;

  return (
    <div className="footer_left_box">
      <Link to={"/"}>
        <img className='footer_logo' src={logo} alt="logo" />
      </Link>
      <div className="footer_lft_bottom">
        <p>График работы колл-центра</p>
        <span>{workingDays}</span>
        <div className="contact_number_footer">
          <p>Колл-центр:</p>
          <a href={`tel:${phone}`}>{phone}</a>
        </div>
      </div>
    </div>
  )
}
export default LeftBox;