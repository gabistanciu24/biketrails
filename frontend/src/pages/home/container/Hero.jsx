import React from "react";
import styles from "./hero_styles/hero.module.css";
import { images } from "../../../constants";

const Hero = () => {
  return (
    <section className={styles.hero} id="acasa">
      <div className={styles.container}>
        <div className={styles.content}>
          <img src={images.Logo} alt="logo" className={styles.logo} />
          <span className={styles.subtitle}>Bike - Trails</span>
          <h1 className={styles.title}>Aventură pe două roți</h1>
          <p className={styles.description}>
            Explorează Traseele Noastre Montane și Bucură-te de Deliciile
            Culinare Locale
          </p>
          <div className={styles.buttons}>
            <a href="/" className={styles.button}>
              Trasee
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
