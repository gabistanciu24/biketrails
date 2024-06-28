import React, { useState } from "react";
import CommentForm from "./CommentForm";
import { Comment } from "./Comment";
import styles from "./styles/commentscontainer.module.css";
import { useMutation } from "@tanstack/react-query";
import { createNewComment } from "../../services/index/comments";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const CommentsContainer = ({ logginedUserId, comments, postSlug }) => {
  const userState = useSelector((state) => state.user);
  const [affectedComment, setAffectedComment] = useState(null);

  const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({ token, desc, slug, parent, replyOnUser }) => {
        return createNewComment({ token, desc, slug, parent, replyOnUser });
      },
      onSuccess: () => {
        toast.success("Comentariu adaugat, se asteapta permisiunea adminului.");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    if (!userState.userInfo || !userState.userInfo.token) {
      toast.error("Pentru a adauga un comentariu trebuie sa te autentifici!");
      return;
    }
    mutateNewComment({
      desc: value,
      parent,
      replyOnUser,
      token: userState.userInfo.token,
      slug: postSlug,
    });
    setAffectedComment(null);
  };

  console.log(userState.userInfo.token);

  const updateCommentHandler = (value, commentId) => {};

  const deleteCommentHandler = (commentId) => {};

  return (
    <div>
      <CommentForm
        btnLabel="Trimite"
        formSubmitHandler={(value) => addCommentHandler(value)}
        loading={isLoadingNewComment}
      />
      <div className={styles.all_comments}>
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            logginedUserId={logginedUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            replies={comment.replies}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
