/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import propTypes from "prop-types";
import { ReactComponent as Logo } from "src/assets/images/logo.svg";
import { Link, withRouter } from "react-router-dom";

function Header({ onLight, location }) {
  const linkColor = onLight ? "text-gray-900" : "text-white";
  const linkCTA = location.pathname.indexOf("/login") > -1 ? `/register` : `/login`;
  const textCTA = location.pathname.indexOf("/login") > -1 ? "Daftar" : "Masuk";

  return (
    <header className="flex justify-between items-center">
      <div style={{ height: 54 }}>
        <Logo className={onLight ? "on-light" : "on-dark"} />
      </div>
      <ul className="flex">
        <li>
          <Link
            to="/"
            className={[linkColor, "hover:text-teal-500 text-lg px-6 font-medium py-3"].join(" ")}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className={[linkColor, " hover:text-teal-500 text-lg px-6 font-medium py-3"].join(" ")}
          >
            Pricing
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className={[linkColor, " hover:text-teal-500 text-lg px-6 font-medium py-3"].join(" ")}
          >
            Features
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className={[linkColor, " hover:text-teal-500 text-lg px-6 font-medium py-3"].join(" ")}
          >
            Story
          </Link>
        </li>
        <li>
          <Link
            to={linkCTA}
            className="text-white bg-indigo-700 hover:bg-indigo-800 transition-all duration-200 
             hover:text-teal-500 text-lg px-6 py-3 ml-6"
          >
            {textCTA}
          </Link>
        </li>
      </ul>
    </header>
  );
}

Header.propTypes = {
  onLight: propTypes.bool,
};

export default withRouter(Header);
