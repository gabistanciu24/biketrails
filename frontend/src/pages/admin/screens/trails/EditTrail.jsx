import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSinglePost, updatePost } from "../../../../services/index/posts";
import { useParams } from "react-router-dom";
import Editor from "../../../../components/editor/Editor";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import styles from "./styles/edittrail.module.css";
import { stables } from "../../../../constants";

const EditTrail = () => {
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const [body, setBody] = useState(null);
  const [initialPhoto, setInitialPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);

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
    onSuccess: () => {
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
      setBody(data?.body || { type: "doc", content: [] });
    }
  }, [data, isError, isLoading]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleUpdatePost = async () => {
    let updatedData = new FormData();

    if (photo) {
      updatedData.append("postPicture", photo);
    } else if (initialPhoto) {
      const picture = await fetch(stables.UPLOAD_FOLDER_BASE_URL + initialPhoto)
        .then((response) => response.blob())
        .then((blob) => new File([blob], initialPhoto, { type: blob.type }));
      updatedData.append("postPicture", picture);
    }

    updatedData.append("body", JSON.stringify(body));

    mutateUpdatePostDetail({
      updatedData,
      slug,
      token: userState.userInfo.token,
    });
  };

  const handleDeleteImage = () => {
    if (window.confirm("Vrei sa stergi poza acestui traseu?")) {
      setInitialPhoto(null);
      setPhoto(null);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error loading trail details</div>
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
                  {/* Placeholder content */}
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
            <h1 className={styles.title}>{data?.title}</h1>
            <div className={styles.body}>
              <Editor
                content={data.body}
                editable={true}
                onDataChange={(newData) => {
                  setBody(newData);
                }}
              />
            </div>
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

export default EditTrail;
