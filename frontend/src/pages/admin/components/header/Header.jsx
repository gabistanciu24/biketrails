import React, { useEffect, useState } from "react";
import styles from "./styles/header.module.css";
import { images } from "../../../../constants";
import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaComments } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";
import { useWindowSize } from "@uidotdev/usehooks";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { createPost } from "../../../../services/index/posts";

const Header = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");
  const windowSize = useWindowSize();

  const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } =
    useMutation({
      mutationFn: ({ token }) => {
        const postPicture = null;
        const title = "New Trail";
        const caption = "This is a new trail.";
        const body = { type: "doc", content: [] };

        return createPost({
          token,
          postPicture,
          title,
          caption,
          body,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"]);
        toast.success("Traseu creat, modifica acum!");
        navigate(`/admin/trails/manage/edit/${data.slug}`);
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const toggleMenuHandler = () => {
    setIsMenuActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (windowSize.width < 1024) {
      setIsMenuActive(false);
    } else {
      setIsMenuActive(true);
    }
  }, [windowSize.width]);

  const handleCreateNewPost = () => {
    mutateCreatePost({ token: userState.userInfo.token });
  };

  return (
    <header className={styles.header}>
      {/* logo */}
      <Link to="/">
        <img src={images.Logo} alt="logo" className={styles.logo1} />
      </Link>
      {/* menu burger icon */}
      <div className={styles.sidebar_container}>
        {isMenuActive ? (
          <AiOutlineClose
            onClick={toggleMenuHandler}
            className={styles.sidebar_icon}
          />
        ) : (
          <AiOutlineMenu
            onClick={toggleMenuHandler}
            className={styles.sidebar_icon}
          />
        )}
      </div>
      {/* sidebar container */}
      {isMenuActive && (
        <div className={styles.underlay}>
          {/* underlay */}
          <div onClick={toggleMenuHandler} className={styles.sidebar} />
          {/* sidebar */}
          <div className={styles.sidebar_div}>
            <Link to="/">
              <img src={images.Logo} alt="logo" className={styles.logo2} />
            </Link>
            <h4 className={styles.main_menu}>MENIU PRINCIPAL</h4>
            {/* menu items */}
            <div className={styles.menu_items}>
              <NavItem
                title="Dashboard"
                link="/admin"
                icon={<AiFillDashboard className={styles.icon} />}
                name="dashboard"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />

              <NavItem
                title="Comments"
                link="/admin/comments"
                icon={<FaComments className={styles.icon} />}
                name="comments"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />

              <NavItemCollapse
                title="Trails"
                icon={<MdDashboard className={styles.icon} />}
                name="posts"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
                content={[
                  { title: "Manage trails", link: "/admin/trails/manage" },
                ]}
                handleCreateNewPost={handleCreateNewPost}
                isLoadingCreatePost={isLoadingCreatePost}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
