import React, { useState } from "react";
import styles from "./styles/profilepicture.module.css";
import { stables } from "../constants";
import { HiOutlineCamera } from "react-icons/hi";
import CropEasy from "./crop/CropEasy";
import { createPortal } from "react-dom";

const ProfilePicture = ({ avatar }) => {
  const [openCrop, setOpenCrop] = useState(false);
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto({ url: URL.createObjectURL(file), file });
    setOpenCrop(true);
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
        <button type="button" className={styles.button}>
          Șterge
        </button>
      </div>
    </>
  );
};

export default ProfilePicture;
