import React from "react";
import MainLayout from "../../components/MainLayout";
import styles from "./styles/traildetailpage.module.css";
import BreadCrumbs from "../../components/BreadCrumbs";

const breadCrumbsData = [
  { name: "Acasă", link: "/" },
  { name: "Trails", link: "/trail" },
  { name: "Trail title", link: "/trail/1" },
];

const TrailDetailPage = () => {
  return (
    <MainLayout>
      <section className={styles.container}>
        <article className={styles.breadcrumbs_wrap}>
          <BreadCrumbs data={breadCrumbsData} />
        </article>
      </section>
    </MainLayout>
  );
};

export default TrailDetailPage;
