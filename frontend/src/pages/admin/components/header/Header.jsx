import React, { useEffect, useState } from "react";
import styles from "./styles/header.module.css";
import { images } from "../../../../constants";
import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaComments } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";
import { useWindowSize } from "@uidotdev/usehooks";
import { Link } from "react-router-dom";

const MENU_ITEMS = [
  {
    title: "Dashboard",
    link: "/admin",
    icon: <AiFillDashboard className={styles.items_icon} />,
    name: "dashboard",
    type: "link",
  },
  {
    title: "Comentarii",
    link: "/admin/comments",
    icon: <FaComments className={styles.items_icon} />,
    name: "comments",
    type: "link",
  },
  {
    title: "Trasee",
    content: [
      { title: "Nou", link: "/admin/trails/new" },
      { title: "Manage", link: "/admin/trails/manage" },
    ],
    icon: <MdDashboard className={styles.items_icon} />,
    name: "trails",
    type: "collapse",
  },
];

const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");
  const windowSize = useWindowSize();

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

  return (
    <header className={styles.header}>
      {/*logo*/}
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
              {MENU_ITEMS.map((item) =>
                item.type === "link" ? (
                  <NavItem
                    key={item.title}
                    title={item.title}
                    link={item.link}
                    icon={item.icon}
                    name={item.name}
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                  />
                ) : (
                  <NavItemCollapse
                    key={item.title}
                    title={item.title}
                    content={item.content}
                    icon={item.icon}
                    name={item.name}
                    activeNavName={activeNavName}
                    setActiveNavName={setActiveNavName}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
