import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/navitemcollapse.module.css"; // Import your CSS module where you define styles

const NavItemCollapse = ({
  title,
  content = [], // Provide a default value here
  icon,
  name,
  activeNavName,
  setActiveNavName,
  handleCreateNewPost, // Add this prop to handle the button click
  isLoadingCreatePost, // Add this prop to handle loading state
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
          {Array.isArray(content) &&
            content.map((item, index) => (
              <Link key={index} to={item.link} className={styles.link}>
                {item.title}
              </Link>
            ))}
          <button
            disabled={isLoadingCreatePost}
            className={styles.createpost_button}
            onClick={handleCreateNewPost}
          >
            Adauga traseu nou
          </button>
        </div>
      )}
    </div>
  );
};

export default NavItemCollapse;
