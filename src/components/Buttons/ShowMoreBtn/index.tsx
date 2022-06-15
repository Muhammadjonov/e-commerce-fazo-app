import { Button } from 'antd'
import "./_style.scss";

interface IShowMoreBtn {
  onChange: () => void
}

function ShowMoreBtn(props: IShowMoreBtn) {
  const { onChange } = props;
  return (
    <Button onClick={onChange} ghost className='show_more_btn'>
      Показать еще
    </Button>
  )
}

export default ShowMoreBtn