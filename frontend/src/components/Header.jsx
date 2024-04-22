import React from "react";
import { images } from "../constants";
import styles from "./styles/header.module.css";

const Header = () => {
  return (
    <section>
      <header className={styles.mainHeader}>
        <div className={styles.logoContainer}>
          <img src={images.Logo} alt="logo" className={styles.logo} />
        </div>
        <nav className={styles.navbar}>
          <ul>
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
              <button>Conectare</button>
            </li>
          </ul>
        </nav>
      </header>
    </section>
  );
};

export default Header;
