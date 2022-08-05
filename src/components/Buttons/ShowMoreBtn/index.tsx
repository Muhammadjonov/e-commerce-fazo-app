import { Button } from 'antd'
import { useT } from '../../../custom/hooks/useT';
import "./_style.scss";

interface IShowMoreBtn {
  onChange: () => void
}

function ShowMoreBtn(props: IShowMoreBtn) {
  const { onChange } = props;
  const { t, lang } = useT();
  return (
    <Button
      size="large"
      onClick={onChange}
      type="link"
      className='show_more_btn'
    >
      {t(`viewMore.${lang}`)}
    </Button>
  )
}

export default ShowMoreBtn