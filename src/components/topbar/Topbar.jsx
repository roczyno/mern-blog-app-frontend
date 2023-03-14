import "./topbar.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/Context";
import { useContext } from "react";
const user = true;

export default function Topbar() {
  const { user, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const PF = "https://blogallday-api.onrender.com/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });

    navigate("/login");
  };
  return (
    <div className="topbar">
      <div className="topbar-left">
        <i className="fa-brands fa-facebook topbar-icon"></i>
        <i className="fa-brands fa-linkedin topbar-icon"></i>
        <i className="fa-brands fa-github topbar-icon"></i>
        <i className="fa-brands fa-twitter topbar-icon"></i>
      </div>
      <div className="topbar-center">
        <ul className="topbar-list">
          <li className="topbar-list-item">
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li className="topbar-list-item">
            <Link to="/about" className="link">
              About
            </Link>
          </li>
          <li className="topbar-list-item">
            <Link to="/write" className="link">
              Write
            </Link>
          </li>
          <li className="topbar-list-item">
            <Link to="/contact" className="link">
              Contact
            </Link>
          </li>
          <li className="topbar-list-item" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topbar-right">
        {user ? (
          <Link to="/settings">
            <img src={PF + user.profilePic} alt="" className="topbar-profile" />
          </Link>
        ) : (
          <ul className="topbar-list">
            <li className="topbar-list-item">
              <Link to="/login" className="link">
                Login
              </Link>
            </li>
            <li className="topbar-list-item">
              <Link to="/register" className="link">
                Register
              </Link>
            </li>
          </ul>
        )}
        <i className="topbar-search-icon fa-solid fa-search"></i>
      </div>
    </div>
  );
}
