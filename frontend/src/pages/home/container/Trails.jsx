import React from "react";
import TrailCard from "./TrailCard";
import styles from "./styles/trails.module.css";
import { FaArrowRight } from "react-icons/fa";

const Trails = () => {
  return (
    <section className={styles.container}>
      <TrailCard className={styles.trail_card} />
      <TrailCard className={styles.trail_card} />
      <TrailCard className={styles.trail_card} />
      <TrailCard className={styles.trail_card} />
      <button className={styles.button}>
        <span>Mai multe trasee </span>
        <FaArrowRight className={styles.arrow} />
      </button>
    </section>
  );
};

export default Trails;
