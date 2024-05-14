import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/suggestedtrails.module.css";

const SuggestedTrails = ({ className, header, posts = [], tags }) => {
  return (
    <div className={`${styles.suggested_wrapper} ${className}`}>
      <h2>{header}</h2>
      <div className={styles.all_posts_wrapper}>
        {posts.map((item) => (
          <div key={item._id} className={styles.post_wrapper}>
            <img className={styles.post_image} src={item.image} alt="enduro" />
            <div className={styles.postdetails_wrapper}>
              <h3>{item.title}</h3>
              <span className={styles.postdate_wrapper}>
                {new Date(item.createdAt).toLocaleDateString("ro-EU", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
      <h2 className={styles.tags_title}>Tipuri</h2>
      <div className={styles.tags_wrapper}>
        {tags.map((item, index) => (
          <Link key={index} to="/" className={styles.tag}>
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedTrails;
