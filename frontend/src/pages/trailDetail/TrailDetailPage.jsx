import React from "react";
import MainLayout from "../../components/MainLayout";
import styles from "./styles/traildetailpage.module.css";
import BreadCrumbs from "../../components/BreadCrumbs";
import { images } from "../../constants";
import { Link } from "react-router-dom";
import SuggestedTrails from "./SuggestedTrails";

const breadCrumbsData = [
  { name: "Acasă", link: "/" },
  { name: "Trails", link: "/trail" },
  { name: "Trail title", link: "/trail/1" },
];

const postsData = [
  {
    _id: "1",
    image: images.post,
    title: "Lorem ipsum dolor sit amet.",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    _id: "2",
    image: images.post,
    title: "Lorem ipsum dolor sit amet.",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    _id: "3",
    image: images.post,
    title: "Lorem ipsum dolor sit amet.",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    _id: "4",
    image: images.post,
    title: "Lorem ipsum dolor sit amet.",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
];

const tagsData = ["Enduro", "Singletrack", "Cross-country", "Downhill"];

const TrailDetailPage = () => {
  return (
    <MainLayout>
      <section className={styles.container}>
        <article className={styles.breadcrumbs_wrap}>
          <BreadCrumbs data={breadCrumbsData} />
          <img
            className={styles.post_image}
            src={images.post}
            alt="post_image"
          />
          <Link
            to="/trail?category=selectedCategory"
            className={styles.category_link}
          >
            DOWNHILL
          </Link>
          <h1 className={styles.post_title}>Lorem ipsum dolor sit amet.</h1>
          <div className={styles.post_description}>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat
              at rerum totam saepe omnis magni fuga nemo quos recusandae sequi
              quasi, accusamus iusto autem dignissimos minus, nisi itaque fugit
              obcaecati explicabo consequatur ipsum officia error. Quod
              adipisci, ipsum doloremque fugit non nobis quis enim commodi
              alias, minima accusantium repellendus nesciunt quia dignissimos
              rerum iure nam natus debitis ratione recusandae aliquam?
            </p>
          </div>
        </article>
        <SuggestedTrails
          header="Ultimele trasee"
          posts={postsData}
          tags={tagsData}
          className={styles.suggested_trails}
        />
      </section>
    </MainLayout>
  );
};

export default TrailDetailPage;
