import React, { useState } from "react";
import styles from "./styles/commentform.module.css";

const CommentForm = ({ btnLabel, formSubmitHandler }) => {
  const [value, setValue] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    formSubmitHandler(value);
    setValue("");
  };
  return (
    <form onSubmit={submitHandler}>
      <div className={styles.comment_form}>
        <textarea
          rows="5"
          placeholder="Lasă un comentariu..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className={styles.comment_button} type="submit">
          {btnLabel}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
