import { useT } from '../../custom/hooks/useT'

const EmptyFavourites = (props: { text: string }) => {
  const { t, lang } = useT();
  return (
    <div style={{ height: "45vh" }}>
      <h3 style={{ color: "var(--color_black2)", textAlign: "center" }}>{t(`${props.text}.${lang}`)}</h3>
    </div>
  )
}

export default EmptyFavourites