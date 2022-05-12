import logo from "../../images/logo.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link to="/">
          <img src={logo} alt="logo" className="w-full cursor-pointer" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
