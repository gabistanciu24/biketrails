import React from "react";
import { images, stables } from "../constants";
import { BsBicycle } from "react-icons/bs";
import styles from "./styles/trailcard.module.css";
import { Link } from "react-router-dom";

const TrailCard = ({ post, className }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <Link to={`/trail/${post.slug}`} className={styles.imageLink}>
        <img
          src={
            post.photo
              ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
              : images.post
          }
          alt="traseu"
          className={styles.postImage}
        />
      </Link>
      <div className={styles.card_wrapper}>
        <Link to={`/trail/${post.slug}`} className={styles.textLink}>
          <h2 className={styles.title}>{post.title}</h2>
          <p className={styles.caption}>{post.caption}</p>
        </Link>
        <div className={styles.user_info}>
          <div className={styles.user_details}>
            <img
              src={
                post.user.avatar
                  ? stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar
                  : images.postProfile
              }
              alt="profile_picture"
              className={styles.profileImage}
            />
            <div className={styles.user_name}>
              <h4>{post.user.name}</h4>
              <div className={styles.user_verification}>
                <span className={styles.icon_span}>
                  <BsBicycle className={styles.icon} />
                </span>
                <span className={styles.rider}>Rider</span>
              </div>
            </div>
          </div>
          <span className={styles.date}>
            {new Date(post.createdAt).getDate()}{" "}
            {new Date(post.createdAt).toLocaleString("ro-RO", {
              month: "long",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrailCard;
