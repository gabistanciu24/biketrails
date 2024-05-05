import React from "react";
import TrailCard from "./TrailCard";
import styles from "./styles/trails.module.css";

const Trails = () => {
  return (
    <section className={styles.container}>
      <TrailCard className={styles.trail_card} />
      <TrailCard className={styles.trail_card} />
      <TrailCard className={styles.trail_card} />
      <TrailCard className={styles.trail_card} />
    </section>
  );
};

export default Trails;
