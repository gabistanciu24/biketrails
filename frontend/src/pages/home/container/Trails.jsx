import React from "react";
import TrailCard from "../../../components/TrailCard";
import styles from "./styles/trails.module.css";
import { FaArrowRight } from "react-icons/fa";

const Trails = () => {
  return (
    <section className={styles.container}>
      <TrailCard className={styles.trail_card} />
      <TrailCard className={styles.trail_card} />
      <TrailCard className={styles.trail_card} />
      <TrailCard className={styles.trail_card} />
      <div className={styles.button_wrapper}>
        <button className={styles.button}>
          <span>Mai multe trasee </span>
          <FaArrowRight className={styles.arrow} />
        </button>
      </div>
    </section>
  );
};

export default Trails;
