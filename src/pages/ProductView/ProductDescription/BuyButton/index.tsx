import { Button } from 'antd';
import "./_style.scss";

interface IBuyButton {
  text: string;
  className?: string;
  onClick?: () => void
}

function BuyButton(props: IBuyButton) {
  const { text, className = "", onClick } = props;

  return (
    <Button onClick={onClick} type='link' size="large" className={`buy_button ${className}`}>
      {text}
    </Button>
  )
}

export default BuyButton