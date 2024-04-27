import React, { useState } from "react";
import { images } from "../constants";
import styles from "./styles/header.module.css";
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [navIsVisible, setNavIsVisible] = useState(false);

  const navVisibilityHandler = () => {
    setNavIsVisible((curState) => {
      return !curState;
    });
  };
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={images.Logo} alt="logo" className={styles.logo} />
        </div>
        <div className={styles.burger}>
          {navIsVisible ? (
            <IoClose
              className={styles.burger_icon}
              onClick={navVisibilityHandler}
            />
          ) : (
            <TiThMenu
              className={styles.burger_icon}
              onClick={navVisibilityHandler}
            />
          )}
        </div>
        <div
          className={styles.navbar}
          style={{ top: navIsVisible ? "0" : "-70rem" }}
        >
          <ul className={styles.navbar_items}>
            <li
            // onClick={navVisibilityHandler}
            >
              <a href="/">Acasă</a>
            </li>
            <li
            // onClick={navVisibilityHandler}
            >
              <a href="/">Trasee</a>
            </li>
            <li
            // onClick={navVisibilityHandler}
            >
              <a href="/">Despre noi</a>
            </li>
            <li
            // onClick={navVisibilityHandler}
            >
              <a href="/">Contact</a>
            </li>
            <li
            // onClick={navVisibilityHandler}
            >
              <button className={styles.login}>Conectează-te</button>
            </li>
          </ul>
        </div>
      </header>
    </section>
  );
};

export default Header;
