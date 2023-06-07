import React from "react";
import { FaBars, FaPowerOff } from "react-icons/fa";
import "./burger-menu.css";
import { navLinksList } from "../../../utils/linksList";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store";

const BurgerMenu = ({ onClick, isMenuOpen }) => {
  const user = useSelector((state) => state.netflix.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <button className="burger-menu" onClick={onClick}>
      {!isMenuOpen ? (
        <FaBars />
      ) : (
        <ul className="links">
          <div className="burger-menu-header">
            <img src={logo} alt="logo" className="burger-menu-logo" />
            <FaBars />
          </div>
          {navLinksList.map((item, index) => {
            return (
              <li key={index}>
                <Link to={item.link}> {item.name}</Link>
              </li>
            );
          })}

          <li>
            {user ? (
              <span style={{ color: "#ca0813" }}>
                Logout
                <FaPowerOff
                  color="#ca0813"
                  style={{ marginLeft: "4px" }}
                  onClick={handleLogout}
                />
              </span>
            ) : (
              <Link to={"/login"}>
                <span style={{ color: "#ca0813" }}> Log in</span>
              </Link>
            )}
          </li>
        </ul>
      )}
    </button>
  );
};

export default BurgerMenu;
