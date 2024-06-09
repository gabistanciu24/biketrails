import React from "react";
import TrailCard from "../../../components/TrailCard";
import styles from "./styles/trails.module.css";
import { FaArrowRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../../services/index/posts";
import toast from "react-hot-toast";

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
      {!isLoading &&
        !isError &&
        data.map((post) => (
          <TrailCard key={post._id} post={post} className={styles.trail_card} />
        ))}
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
