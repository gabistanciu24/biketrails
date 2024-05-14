import React from "react";
import { images } from "../../constants";
import { FiMessageSquare, FiEdit2, FiTrash } from "react-icons/fi";
import styles from "./styles/comment.module.css";

export const Comment = ({ comment }) => {
  return (
    <div className={styles.comment_wrapper}>
      <img
        src={images.postProfile}
        alt="Profile"
        className={styles.comment_profile_pic}
      />
      <div className={styles.comment_text}>
        <h5>{comment.user.name}</h5>
        <span className={styles.comment_date}>
          {new Date(comment.createdAt).toLocaleDateString("ro-EU", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>
        <p>{comment.desc}</p>
        <div className={styles.reply_buttons}>
          <button className={styles.reply}>
            <FiMessageSquare className={styles.button} />
            <span>Răspunde</span>
          </button>
          <button className={styles.reply}>
            <FiEdit2 className={styles.button} />
            <span>Editează</span>
          </button>
          <button className={styles.reply}>
            <FiTrash className={styles.button} />
            <span>Șterge</span>
          </button>
        </div>
      </div>
    </div>
  );
};
