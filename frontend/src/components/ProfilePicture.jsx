import React, { useState } from "react";
import styles from "./styles/profilepicture.module.css";
import { stables } from "../constants";
import { HiOutlineCamera } from "react-icons/hi";
import CropEasy from "./crop/CropEasy";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePicture } from "../services/index/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userActions } from "../store/reducers/userReducers";

const ProfilePicture = ({ avatar }) => {
  const userState = useSelector((state) => state.user);
  const [openCrop, setOpenCrop] = useState(false);
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ token, formData }) => {
      return updateProfilePicture({
        token: token,
        formData: formData,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      setOpenCrop(false);
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Poza a fost ștearsă.");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto({ url: URL.createObjectURL(file), file });
    setOpenCrop(true);
  };

  const handleDeleteImage = () => {
    if (window.confirm("Vrei să-ți ștergi poza de profi?")) {
      try {
        const formData = new FormData();
        formData.append("profilePicture", undefined);
        mutate({ token: userState.userInfo.token, formData: formData });
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  return (
    <>
      {openCrop &&
        createPortal(
          <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
          document.getElementById("portal")
        )}{" "}
      <div className={styles.profile_pic_container}>
        <div className={styles.image_wrapper}>
          <label htmlFor="profilePicture" className={styles.picture_label}>
            {avatar ? (
              <img
                src={stables.UPLOAD_FOLDER_BASE_URL + avatar}
                alt="profile"
                className={styles.image}
              />
            ) : (
              <div className={styles.icon_wrapper}>
                <HiOutlineCamera className={styles.icon} />
              </div>
            )}
          </label>
          <input
            type="file"
            className={styles.label2}
            id="profilePicture"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="button"
          className={styles.button}
          onClick={handleDeleteImage}
        >
          Șterge
        </button>
      </div>
    </>
  );
};

export default ProfilePicture;
