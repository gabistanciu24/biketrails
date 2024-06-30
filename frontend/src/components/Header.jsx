import React, { useState } from "react";
import { images } from "../constants";
import styles from "./styles/header.module.css";
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/user.js";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [navIsVisible, setNavIsVisible] = useState(false);
  const userState = useSelector((state) => state.user);

  const navVisibilityHandler = () => {
    setNavIsVisible((curState) => {
      return !curState;
    });
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={images.Logo} alt="logo" className={styles.logo} />
        </div>
        <div className={styles.burger}>
          {navIsVisible ? (
            <IoClose
              className={styles.burger_icon}
              onClick={navVisibilityHandler}
            />
          ) : (
            <TiThMenu
              className={styles.burger_icon}
              onClick={navVisibilityHandler}
            />
          )}
        </div>
        <div
          className={styles.navbar}
          style={{ top: navIsVisible ? "0" : "-70rem" }}
        >
          <ul className={styles.navbar_items}>
            <li
            // onClick={navVisibilityHandler}
            >
              <a href="/">Acasă</a>
            </li>
            <li
            // onClick={navVisibilityHandler}
            >
              <a href="/trasee">Trasee</a>
            </li>
            <li
            // onClick={navVisibilityHandler}
            >
              <a href="/about">Despre noi</a>
            </li>

            {userState?.userInfo?.admin && (
              <li
              // onClick={navVisibilityHandler}
              >
                <button
                  onClick={() => navigate("/admin")}
                  className={styles.login}
                >
                  Admin Dashboard
                </button>
              </li>
            )}
            {userState.userInfo ? (
              <>
                <li>
                  <button
                    className={styles.login}
                    onClick={() => navigate("/profile")}
                  >
                    Profil
                  </button>
                </li>
                <li>
                  <button className={styles.login} onClick={logoutHandler}>
                    Deconectare
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">
                  <button className={styles.login}>Conectează-te</button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </header>
    </section>
  );
};

export default Header;
