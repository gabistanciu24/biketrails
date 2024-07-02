import React, { useState } from "react";
import { getAllPosts } from "../../../../services/index/posts";
import { useQuery } from "@tanstack/react-query";
import { images, stables } from "../../../../constants";
import styles from "./styles/managetrails.module.css";

const ManageTrails = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: postsData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryFn: () => getAllPosts(searchKeyword, currentPage),
    queryKey: ["trails"],
  });

  const searchKeywordHandler = (e) => {
    const { value } = e.target;
    setSearchKeyword(value);
  };

  const submitSearchKeywordHandler = (e) => {
    e.preventDefault();
    refetch();
  };
  return (
    <div>
      <h1 className={styles.manage_title}>Manage Trails</h1>
      <div className={styles.table_wrapper}>
        <div className={styles.table}>
          <div className={styles.table_inside}>
            <h2>Rideri</h2>
            <div className={styles.form_wrapper}>
              <form onSubmit={submitSearchKeywordHandler}>
                <div className={styles.input_wrapper}>
                  <input
                    type="text"
                    id='"form-subscribe-Filter'
                    placeholder="Titlul traseului..."
                    onChange={searchKeywordHandler}
                    value={searchKeyword}
                  />
                </div>
                <button className={styles.input_button} type="submit">
                  Filteaza
                </button>
              </form>
            </div>
          </div>
          <div className={styles.table2_wrap}>
            <div className={styles.table2}>
              <table>
                <thead>
                  <tr>
                    <th className={styles.table_th} scope="col">
                      Titlu
                    </th>
                    <th className={styles.table_th} scope="col">
                      Categorie
                    </th>
                    <th className={styles.table_th} scope="col">
                      Data
                    </th>
                    <th className={styles.table_th} scope="col">
                      Tipuri
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading || isFetching ? (
                    <tr>
                      <td colSpan={5} className={styles.table_td}>
                        Se incarca...
                      </td>
                    </tr>
                  ) : (
                    postsData?.data.map((post) => (
                      <tr>
                        <td className={styles.table_td2}>
                          <div className={styles.table_td_wrap}>
                            <div className={styles.image_link}>
                              <a href="/">
                                <img
                                  alt={post.title}
                                  src={
                                    post?.photo
                                      ? stables.UPLOAD_FOLDER_BASE_URL +
                                        post?.photo
                                      : images.post
                                  }
                                  className={styles.post_image}
                                />
                              </a>
                            </div>
                            <div className={styles.title_container}>
                              <p>{post.title}</p>
                            </div>
                          </div>
                        </td>
                        <td className={styles.table_td2}>
                          <p>
                            {new Date(post.createdAt).toLocaleDateString(
                              "ro-EU",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </td>
                        <td className={styles.table_td2}>
                          <div className={styles.tags_wrap}>
                            {post.tags.length > 0
                              ? post.tags.map((tag, index) => (
                                  <p>
                                    {tag}
                                    {post.tags.length - 1 !== index && ","}
                                  </p>
                                ))
                              : "Fara tipuri"}
                          </div>
                        </td>
                        <td className={styles.table_td2}>
                          <a href="/" className={styles.edit}>
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div className={styles.svg_container}>
                <div className={styles.buttons_wrapper}>
                  <button type="button" className={styles.button_svg}>
                    <svg
                      width="9"
                      fill="currentColor"
                      height="8"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                    </svg>
                  </button>
                  <button type="button">1</button>
                  <button type="button">2</button>
                  <button type="button">3</button>
                  <button type="button">4</button>
                  <button type="button" className={styles.button_svg}>
                    <svg
                      width="9"
                      fill="currentColor"
                      height="8"
                      className=""
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTrails;
