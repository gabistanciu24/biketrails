import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/navitemcollapse.module.css"; // Import your CSS module where you define styles

const NavItemCollapse = ({
  title,
  content,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setActiveNavName(name);
    } else {
      setActiveNavName("");
    }
  };

  return (
    <div className={`${styles.collapse} ${isOpen ? styles.open : ""}`}>
      <div className={styles.collapseHeader} onClick={toggleCollapse}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.title}>{title}</span>
        <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className={styles.collapseContent}>
          {content.map((item, index) => (
            <Link key={index} to={item.link} className={styles.link}>
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavItemCollapse;
