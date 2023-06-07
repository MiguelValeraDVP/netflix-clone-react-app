import React from "react";
import "../../../index.css";
import "./footer.css";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { TbBrandGmail } from "react-icons/tb";
import { Link } from "react-router-dom";
import { moveIntoTopPage } from "../../../utils/generalConsts";
import logo from "../../../assets/logo.png";
const Footer = () => {
  return (
    <footer>
      <Link to={"/"} className="flex column j-center a-center">
        <img src={logo} alt="" className="footer-logo" />
        <p
          style={{
            color: "rgba(255, 255, 255, 0.126)",
            fontSize: "11px",
          }}
        >
          clone by Miguel Valera
        </p>
      </Link>

      <ul className="permalinks">
        {/* {footerLinksList.map((item) => {
          return (
            <li
              {...(item.name === "Home"
                ? (onclick = { moveIntoTopPage })
                : (onclick = {}))}
            >
              {item.name}
            </li>
          );
        })} */}
        <li>
          <Link to={"/"} onClick={moveIntoTopPage()}>
            Home
          </Link>
        </li>
        <li>
          <Link to={"/about-this-project"}>About this project</Link>
        </li>
        <li>
          <Link to={"/contact"}>Contact</Link>
        </li>
        <li>
          <Link to={"https://portfolio-miguel-valera-2023.netlify.app/"}>
            Portolio
          </Link>
        </li>
      </ul>

      <div className="footer__socials">
        <a
          href="https://www.linkedin.com/in/miguel-valera-developer/"
          target="_blank"
          rel="noreferrer"
        >
          <BsLinkedin />
        </a>
        <a
          href="https://github.com/MiguelValeraDVP"
          target="_blank"
          rel="noreferrer"
        >
          <BsGithub />
        </a>
        <a href="mailto: miguel.valera.97@gmail.com">
          <TbBrandGmail />
        </a>
      </div>

      <div className="footer__copyright">
        <small>&copy; MiguelValera Full stack Dev 2023</small>
      </div>
    </footer>
  );
};

export default Footer;
