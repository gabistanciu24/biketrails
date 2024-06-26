import React from "react";
import TrailCard from "../../../components/TrailCard";
import styles from "./styles/trails.module.css";
import { FaArrowRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../../services/index/posts";
import toast from "react-hot-toast";
import TrailCardSkeleton from "../../../components/TrailCardSkeleton";
import ErrorMessage from "../../../components/ErrorMessage";

const Trails = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);

      console.log(error);
    },
  });

  return (
    <section className={styles.container}>
      {isLoading ? (
        [...Array(3)].map((item, index) => (
          <TrailCardSkeleton
            key={index}
            className={styles.custom_style_trailcard}
          />
        ))
      ) : isError ? (
        <ErrorMessage message="Nu s-au putut incarca datele despre trasee." />
      ) : (
        data.map((post) => (
          <TrailCard key={post._id} post={post} className={styles.trail_card} />
        ))
      )}
      <div className={styles.button_wrapper}>
        <button className={styles.button}>
          <span>Mai multe trasee </span>
          <FaArrowRight className={styles.arrow} />
        </button>
      </div>
    </section>
  );
};

export default Trails;
