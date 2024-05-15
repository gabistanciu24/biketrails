import React from "react";
import { images } from "../../constants";
import { FiMessageSquare, FiEdit2, FiTrash } from "react-icons/fi";
import styles from "./styles/comment.module.css";
import CommentForm from "./CommentForm";

export const Comment = ({
  comment,
  logginedUserId,
  affectedComment,
  setAffectedComment,
  addComment,
  parentId = null,
}) => {
  const isUserLoggedIn = Boolean(logginedUserId);
  const commentBelongsToUser = logginedUserId === comment.user._id;
  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === comment._id;
  const repliedCommentId = parentId ? parentId : comment._id;
  const replyOnUserId = comment.user._id;

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
          {isUserLoggedIn && (
            <button
              className={styles.reply}
              onClick={() =>
                setAffectedComment({ type: "replying", _id: comment._id })
              }
            >
              <FiMessageSquare className={styles.button} />
              <span>Răspunde</span>
            </button>
          )}
          {commentBelongsToUser && (
            <>
              {" "}
              <button className={styles.reply}>
                <FiEdit2 className={styles.button} />
                <span>Editează</span>
              </button>
              <button className={styles.reply}>
                <FiTrash className={styles.button} />
                <span>Șterge</span>
              </button>
            </>
          )}
        </div>
        {isReplying && (
          <CommentForm
            btnLabel="Răspunde"
            formSubmitHandler={(value) =>
              addComment(value, repliedCommentId, replyOnUserId)
            }
            formCancelHandler={() => setAffectedComment(null)}
          />
        )}
      </div>
    </div>
  );
};
