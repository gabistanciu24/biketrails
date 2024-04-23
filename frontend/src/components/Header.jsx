import React from "react";
import { images } from "../constants";
import styles from "./styles/header.module.css";

const Header = () => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={images.Logo} alt="logo" className={styles.logo} />
        </div>
        <div className={styles.navbar}>
          <ul className={styles.navbar_items}>
            <li>
              <a href="/">Acasa</a>
            </li>
            <li>
              <a href="/">Trasee</a>
            </li>
            <li>
              <a href="/">Despre noi</a>
            </li>
            <li>
              <button className={styles.login}>Conecteaza-te</button>
            </li>
          </ul>
        </div>
      </header>
    </section>
  );
};

export default Header;
