import React, { useEffect, useState } from "react";
import { deletePost, getAllPosts } from "../../../../services/index/posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { images, stables } from "../../../../constants";
import styles from "./styles/managetrails.module.css";
import Pagination from "../../../../components/Pagination";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

let isFirstRun = true;

const ManageTrails = () => {
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
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

  const { mutate: mutateDeletePost, isLoading: isLoadingDeletePost } =
    useMutation({
      mutationFn: ({ slug, token }) => {
        return deletePost({
          slug,
          token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"]);
        toast.success("Track is deleted.");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  useEffect(() => {
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    refetch();
  }, [refetch, currentPage]);

  const searchKeywordHandler = (e) => {
    const { value } = e.target;
    setSearchKeyword(value);
  };

  const submitSearchKeywordHandler = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const deletePostHandler = ({ slug, token }) => {
    mutateDeletePost({ slug, token });
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
                  ) : postsData?.data?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className={styles.no_trails}>
                        Nici un traseu nu a fost gasit!
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
                          <button
                            disabled={isLoadingDeletePost}
                            type="button"
                            className={styles.button_svg}
                            onClick={() => {
                              deletePostHandler({
                                slug: post?.slug,
                                token: userState.userInfo.token,
                              });
                            }}
                          >
                            Delete
                          </button>
                          <Link to="/" className={styles.link_edit}>
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {!isLoading && (
                <Pagination
                  onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                  totalPageCount={JSON.parse(
                    postsData?.headers?.["x-totalpagecount"]
                  )}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTrails;
