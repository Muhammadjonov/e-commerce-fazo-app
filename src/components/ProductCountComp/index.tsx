import { useT } from '../../custom/hooks/useT';
import "./_style.scss";

interface IProductCountComp {
  total: number,
  perCount: number
}

function ProductCountComp(props: IProductCountComp) {
  const { total, perCount } = props;
  const { t, lang } = useT();
  return (
    <div className="product_count">
      <p className="p16_regular">
        {t(`products.${lang}`)} {perCount} / {total}
      </p>
    </div>
  )
}

export default ProductCountComp