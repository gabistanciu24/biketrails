import React from "react";
import styles from "./styles/breadcrumbs.module.css";
import { Link } from "react-router-dom";

const BreadCrumbs = ({ data }) => {
  return (
    <div className={styles.container}>
      {data.map((item, index) => (
        <div key={index} className={styles.link_wrapper}>
          <Link to={item.link}>{item.name}</Link>
          {index !== data.length - 1 && <span>/</span>}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumbs;
