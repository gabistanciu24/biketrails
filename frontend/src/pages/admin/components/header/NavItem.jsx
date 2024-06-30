import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles/navitem.module.css";

const NavItem = ({
  link,
  title,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  const isActive = name === activeNavName;
  return (
    <NavLink
      to={link}
      onClick={() => setActiveNavName(name)}
      className={`${styles.navItem} ${isActive ? styles.active : ""}`}
    >
      {icon} {title}
    </NavLink>
  );
};

export default NavItem;
