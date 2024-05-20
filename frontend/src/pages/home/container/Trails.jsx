import React from "react";
import TrailCard from "../../../components/TrailCard";
import styles from "./styles/trails.module.css";
import { FaArrowRight } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { changeCount } from "../../../store/actions/countActions";

const Trails = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  const countChangeHandler = (type) => {
    dispatch(changeCount(type));
  };

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
        {/* Just for testing stuff */}
        <div className={styles.testing_div}>
          <button onClick={() => countChangeHandler("DECREASE")}>
            decrease
          </button>
          {count.number}
          <button onClick={() => countChangeHandler("INCREASE")}>
            increase
          </button>
        </div>
      </div>
    </section>
  );
};

export default Trails;
