import { Navigate } from "react-router-dom";

interface IProtectedProfile {
  isLoggedIn: boolean,
  children: any
}

const ProtectedProfile = (props: IProtectedProfile) => {
  const { isLoggedIn, children } = props;

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default ProtectedProfile;