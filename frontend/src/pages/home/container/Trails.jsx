import React from "react";
import TrailCard from "./TrailCard";
import styles from "./styles/trailcard.module.css";

const Trails = () => {
  return (
    <section className="container">
      <TrailCard className={styles.trail_card} />
      <TrailCard className={styles.trail_card} />
    </section>
  );
};

export default Trails;
