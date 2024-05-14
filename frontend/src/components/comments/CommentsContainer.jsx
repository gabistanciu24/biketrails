import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { getCommentsData } from "../../data/comments";

const CommentsContainer = () => {
  const [comments, setComments] = useState([]);

  console.log(comments);

  useEffect(() => {
    (async () => {
      const commentData = await getCommentsData();
      setComments(commentData);
    })();
  }, []);

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    const newComment = {
      _id: "12",
      user: {
        _id: "b",
        name: "Paul M. Williams",
      },
      desc: "keep it up bro <3",
      post: "1",
      parent: null,
      replyOnUser: null,
      createdAt: "2022-12-31T17:22:05.092+0000",
    };
    setComments((curState) => {
      return [newComment, ...curState];
    });
  };

  return (
    <div>
      <CommentForm
        btnLabel="Trimite"
        formSubmitHandler={(value) => addCommentHandler(value)}
      />
    </div>
  );
};

export default CommentsContainer;
