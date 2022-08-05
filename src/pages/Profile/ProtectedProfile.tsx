import { Navigate } from "react-router-dom";
import { getAccessToken } from "../../helpers";

interface IProtectedProfile {
  children: any
}

const ProtectedProfile = (props: IProtectedProfile) => {
  const { children } = props;
  let isLoggedIn = getAccessToken();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default ProtectedProfile;