import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const role = useSelector((state) => state.data.role);
  return (
    <div>
      <header className="header">
        <nav className="navbar navbar-expand-lg header-nav">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand logo">
              <img
                src="/assets/img/logo.png"
                className="img-fluid"
                alt="Logo"
              />
            </Link>
          </div>
          <ul className="nav header-navbar-rht">
            <li className="nav-item">
              <Link
                className="nav-link header-login"
                to={!role ? "/login" : "/logout"}
              >
                {!role ? "Login / Signup" : "Logout"}
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
