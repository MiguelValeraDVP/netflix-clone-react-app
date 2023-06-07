import { moveIntoTopPage } from "./generalConsts";

export const navLinksList = [
  { name: "Home", link: "/" },
  { name: "TV Shows", link: "/tv" },
  { name: "Movies", link: "/movies" },
  { name: "My list", link: "/my-list" },
];

export const footerLinksList = [
  { name: "Home", link: "/", onClick: `${moveIntoTopPage()}` },
  { name: "About this project", link: "/about-this-project" },
  { name: "Contact", link: "/contact" },
  {
    name: "Portfolio",
    link: "https://portfolio-miguel-valera-2023.netlify.app/",
  },
];
