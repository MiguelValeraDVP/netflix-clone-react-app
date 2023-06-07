import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { navLinksList } from "../../../utils/linksList";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";

import "./burger-menu.css";
import "./navbar.css";
import {
  NotImplementedToast,
  moveIntoTopPage,
} from "../../../utils/generalConsts";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store";

const Navbar = ({ isScrolled }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.netflix.user);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="navbar-container">
      <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <Link to={"/"}>
              <img
                src={logo}
                alt="logo"
                className="img-mobile"
                onClick={moveIntoTopPage}
              />
            </Link>
          </div>
          <ul className={`links flex ${menuOpen ? "show-menu" : ""}`}>
            {navLinksList.map((item, index) => {
              return (
                <li key={index}>
                  <Link to={item.link}>{item.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search flex ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setInputHover(false);
                }
              }}
            >
              <FaSearch onClick={NotImplementedToast} className={`mobile`} />
            </button>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search bar not implemented yet"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={(event) => {
                setShowSearch(false);
                setInputHover(false);
                event.target.value = "";
              }}
            />
          </div>
          <button onClick={toggleMenu} className="mobile">
            {user ? (
              <FaPowerOff onClick={handleLogout} />
            ) : (
              <Link to={"/login"}>
                <span className="login-button">Log in</span>
              </Link>
            )}
          </button>
          <BurgerMenu onClick={toggleMenu} isMenuOpen={menuOpen} />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
