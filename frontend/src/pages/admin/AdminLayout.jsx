import React from "react";
import Header from "./components/header/Header.jsx";
import styles from "./styles/adminlayout.module.css";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className={styles.layout_section}>
      <Header />
      <main className={styles.admin_main}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
