import React from "react";
import { BiImageAlt } from "react-icons/bi";
import styles from "./styles/traildetailskeleton.module.css";

const TrailDetailSkeleton = () => {
  return (
    <section className={styles.traildetail_wrapper}>
      <article className={styles.traildetail_post_holder}>
        {/* post image */}
        <div className={styles.traildetail_post_image}>
          <BiImageAlt className={styles.traildetail_post_icon} />
        </div>
        {/* title */}
        <div className={styles.traildetail_post_title} />
        <div className={styles.traildetail_post_data}>
          <p className={styles.paragraph1}></p>
          <p className={styles.paragraph2}></p>
          <p className={styles.paragraph3}></p>
          <p className={styles.paragraph4}></p>
        </div>
      </article>
      {/* Suggested posts */}
      <div className={styles.suggested_wrapper}>
        {/* title */}
        <div className={styles.suggested_title} />
        <div className={styles.suggested_posts}>
          {[...Array(6)].map((item, index) => (
            <div key={index} className={styles.individual_post}>
              {/* image */}
              <div className={styles.individual_post_image} />
              <div className={styles.individual_post_details}>
                {/* post title */}
                <div className={styles.individual_post_title} />
                <p className={styles.individual_post_data}></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrailDetailSkeleton;
