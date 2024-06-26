import React from "react";
import styles from "./styles/trailcardskeleton.module.css";

const TrailCardSkeleton = ({ className }) => {
  return (
    <div className={`${styles.skeleton_trail_container} ${className}`}>
      {/*image */}
      <div className={styles.skeleton_image_placeholder} />
      <div className={styles.skeleton_details_wrapper}>
        {/* title */}
        <div className={styles.skeleton_caption} />
        {/* caption */}
        <div className={styles.skeleton_caption_container} />
        <div className={styles.skeleton_user_details}>
          <div className={styles.skeleton_details_div}>
            {/* profile image */}
            <div className={styles.skeleton_profile_pic} />
            <div className={styles.user_info}>
              {/* user's name */}
              <div className={styles.user_name} />
              {/* rider status */}
              <div className={styles.user_rider_icon} />
            </div>
          </div>
          {/* date */}
          <div className={styles.user_date} />
        </div>
      </div>
    </div>
  );
};

export default TrailCardSkeleton;
