import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getSinglePost, updatePost } from "../../../../services/index/posts";
import { Link, useParams } from "react-router-dom";
import TrailDetailSkeleton from "../../../components/TrailDetailSkeleton";
import ErrorMessage from "../../../../components/ErrorMessage";
import { parseJsonToHtml } from "../../../../utils/parseJsonToHtml";
import { stables } from "../../../../constants";
import { HiOutlineCamera } from "react-icons/hi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import styles from "./styles/edittrail.module.css";

const EditPost = () => {
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const [initialPhoto, setInitialPhoto] = useState(null);
  const [photo, setphoto] = useState(null);
  const [body, setBody] = useState(null);
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["trail", slug],
  });

  const {
    mutate: mutateUpdatePostDetail,
    isLoading: isLoadingUpdatePostDetail,
  } = useMutation({
    mutationFn: ({ updatedData, slug, token }) => {
      return updatePost({
        updatedData,
        slug,
        token,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["trail", slug]);
      toast.success("Trail updated");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      setInitialPhoto(data?.photo);
      setBody(parseJsonToHtml(data?.body));
    }
  }, [data, isError, isLoading]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setphoto(file);
  };

  const handleUpdatePost = async () => {
    let updatedData = new FormData();

    if (!initialPhoto && photo) {
      updatedData.append("postPicture", photo);
    } else if (initialPhoto && !photo) {
      const urlToObject = async (url) => {
        let response = await fetch(url);
        let blob = await response.blob();
        const file = new File([blob], initialPhoto, { type: blob.type });
        return file;
      };
      const picture = await urlToObject(
        stables.UPLOAD_FOLDER_BASE_URL + data?.photo
      );
      console.log(picture);
      updatedData.append("postPicture", picture);
    }

    updatedData.append("document", JSON.stringify({}));

    mutateUpdatePostDetail({
      updatedData,
      slug,
      token: userState.userInfo.token,
    });
  };

  const handleDeleteImage = () => {
    if (window.confirm("Vrei sa stergi poza acestui traseu?")) {
      setInitialPhoto(null);
      setphoto(null);
    }
  };

  return (
    <div>
      {" "}
      {isLoading ? (
        <TrailDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Nu s-au putut incarca detaliile traseului." />
      ) : (
        <section className={styles.edit_section}>
          <article>
            <label htmlFor="postPicture" className={styles.postpicture_label}>
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt={data?.title}
                  className={styles.postpicture}
                />
              ) : initialPhoto ? (
                <img
                  src={stables.UPLOAD_FOLDER_BASE_URL + data?.photo}
                  alt={data?.title}
                  className={styles.postpicture}
                />
              ) : (
                <div className={styles.picture_placeholder}>
                  <HiOutlineCamera className={styles.placeholder_icon} />
                </div>
              )}
            </label>
            <input
              type="file"
              className="sr-only"
              id="postPicture"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={handleDeleteImage}
              className={styles.delete_button}
            >
              Delete Image
            </button>
            <div className={styles.categories_wrap}>
              {" "}
              {data?.categories.map((category) => (
                <Link
                  to={`/trail?category=${category.name}`}
                  className={styles.category_link}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <h1 className={styles.title}>{data?.title}</h1>
            <div className={styles.body}>{body}</div>
            <button
              disabled={isLoadingUpdatePostDetail}
              type="button"
              onClick={handleUpdatePost}
              className={styles.update_button}
            >
              Update Trail
            </button>
          </article>
        </section>
      )}
    </div>
  );
};

export default EditPost;
