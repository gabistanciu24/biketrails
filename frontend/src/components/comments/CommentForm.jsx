import React, { useState } from "react";
import styles from "./styles/commentform.module.css";

const CommentForm = ({
  btnLabel,
  formSubmitHandler,
  formCancelHandler = null,
}) => {
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
          placeholder="Adaugă un comentariu..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className={styles.comment_buttons_wrapper}>
          <button type="submit" className={styles.comment_button}>
            {btnLabel}
          </button>
          {formCancelHandler && (
            <button
              onClick={formCancelHandler}
              className={styles.comment_button}
            >
              Renunță
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
