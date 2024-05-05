import React from "react";
import { images } from "../../../constants";
import { BsBicycle } from "react-icons/bs";
import styles from "./styles/trailcard.module.css";

const TrailCard = ({ className }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <img src={images.post} alt="post_picture" className={styles.postImage} />
      <div className={styles.card_wrapper}>
        <h2 className={styles.title}>Bâlea Cascadă</h2>
        <p className={styles.caption}>
          Am urcat pe asfalt, până la o stână de pe partea dreaptă a drumului.
        </p>
        <div className={styles.user_info}>
          <div className={styles.user_details}>
            <img src={images.postProfile} alt="profile_picture" />
            <div className={styles.user_name}>
              <h4>Vasile Pop</h4>
              <div className={styles.user_verification}>
                <span className={styles.icon_span}>
                  <BsBicycle className={styles.icon} />
                </span>
                <span className={styles.rider}>Rider</span>
              </div>
            </div>
          </div>
          <span className={styles.date}>24 Apr</span>
        </div>
      </div>
    </div>
  );
};

export default TrailCard;
