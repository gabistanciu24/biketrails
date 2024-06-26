import React from "react";
import styles from "./styles/errormessage.module.css";

const ErrorMessage = ({ message }) => {
  return (
    <div className={styles.error_wrapper}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
