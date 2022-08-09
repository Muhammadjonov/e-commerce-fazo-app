import { ScaleLoader } from "react-spinners"

const ScaleLoading = () => {
  let styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  }
  return (
    <div style={styles}>
      <ScaleLoader />
    </div>
  )
}

export default ScaleLoading