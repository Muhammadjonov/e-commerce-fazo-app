import { Link } from "react-router-dom";
interface ILogo {
  logo: string
}

const Logo = (props: ILogo) => {
  const { logo } = props;
  return (
    <Link className="logo" to={"/"}>
      <img className="logo_img" src={logo} alt="logo" />
    </Link>
  );
}
export default Logo;