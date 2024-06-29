import React from "react";
import { images, stables } from "../../constants";
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
  updateComment,
  deleteComment,
  replies,
}) => {
  const isUserLoggedIn = Boolean(logginedUserId);
  const commentBelongsToUser = logginedUserId === comment.user._id;
  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === comment._id;
  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === comment._id;
  const repliedCommentId = parentId ? parentId : comment._id;
  const replyOnUserId = comment.user._id;

  const handleFormSubmit = (value, isEdit = false) => {
    if (isEdit) {
      updateComment(value, comment._id);
    } else {
      addComment(value, repliedCommentId, replyOnUserId);
    }
    setAffectedComment(null); // Close the form after submit
  };

  return (
    <div className={styles.comment_wrapper}>
      <img
        src={
          comment?.user?.avatar
            ? stables.UPLOAD_FOLDER_BASE_URL + comment.user.avatar
            : images.postProfile
        }
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
        {!isEditing && <p>{comment.desc}</p>}
        {isEditing && (
          <CommentForm
            btnLabel="Modifică"
            formSubmitHandler={(value) => handleFormSubmit(value, true)}
            formCancelHandler={() => setAffectedComment(null)}
            initialText={comment.desc}
          />
        )}
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
              <button
                className={styles.reply}
                onClick={() =>
                  setAffectedComment({ type: "editing", _id: comment._id })
                }
              >
                <FiEdit2 className={styles.button} />
                <span>Editează</span>
              </button>
              <button
                className={styles.reply}
                onClick={() => deleteComment(comment._id)}
              >
                <FiTrash className={styles.button} />
                <span>Șterge</span>
              </button>
            </>
          )}
        </div>
        {isReplying && (
          <CommentForm
            btnLabel="Răspunde"
            formSubmitHandler={(value) => handleFormSubmit(value)}
            formCancelHandler={() => setAffectedComment(null)}
          />
        )}
        {replies.length > 0 && (
          <div>
            {replies.map((reply) => (
              <Comment
                key={reply._id}
                addComment={addComment}
                affectedComment={affectedComment}
                setAffectedComment={setAffectedComment}
                comment={reply}
                deleteComment={deleteComment}
                logginedUserId={logginedUserId}
                replies={[]}
                updateComment={updateComment}
                parentId={comment._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
