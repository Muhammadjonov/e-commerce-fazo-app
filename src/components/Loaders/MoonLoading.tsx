import { MoonLoader } from "react-spinners"

const MoonLoading = () => {
  let styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 209px)",
  }
  return (
    <div className="home__loading" style={styles}>
      <MoonLoader />
    </div>
  )
}

export default MoonLoading