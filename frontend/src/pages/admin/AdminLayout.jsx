import React from "react";
import Header from "./components/header/Header.jsx";
import styles from "./styles/adminlayout.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/index/users.js";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const AdminLayout = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const { data: profileData, isLoading: profileIsLoading } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
    onSuccess: (data) => {
      if (!data?.admin) {
        navigate("/");
        toast.error("Nu detii drepturi de administrator.");
      }
    },
    onError: (error) => {
      console.log(error);
      navigate("/");
      toast.error("Nu detii drepturi de administrator.");
    },
  });

  if (profileIsLoading) {
    return (
      <div className={styles.loading_wrapper}>
        <h3>Se încarcă...</h3>
      </div>
    );
  }
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
