import React, { useEffect } from "react";
import ProfilePicture from "../../components/ProfilePicture";
import MainLayout from "../../components/MainLayout";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/index/users";
import styles from "../register/styles/registerpage.module.css";
import classNames from "classnames";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError,
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
  });

  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    values: {
      name: profileIsLoading ? "" : profileData.name,
      email: profileIsLoading ? "" : profileData.email,
    },
    mode: "onchange",
  });
  const submitHandler = (data) => {};

  console.log(profileData);

  return (
    <MainLayout>
      <section className={styles.container}>
        <div className={styles.registerpage}>
          <ProfilePicture avatar={profileData?.avatar} />
          <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
            <div className={styles.input_field}>
              <label htmlFor="name">Nume</label>
              <input
                type="text"
                name="name"
                id="name"
                {...register("name", {
                  minLength: {
                    value: 1,
                    message: "Numele trebuie să aibă cel puțin un caracter",
                  },
                  required: {
                    value: true,
                    message: "Numele este obligatoriu",
                  },
                })}
                placeholder="Introdu numele..."
                className={classNames(
                  styles.placeholder,
                  errors.name ? styles.border_error : styles.border_default
                )}
              />
              {errors.name?.message && (
                <p className={styles.error_message}>{errors.name?.message}</p>
              )}
            </div>
            <div className={styles.input_field}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                    message: "Introdu un email valid",
                  },
                  required: {
                    value: true,
                    message: "Emailul este obligatoriu",
                  },
                })}
                placeholder="Introdu emailul..."
                className={classNames(
                  styles.placeholder,
                  errors.name ? styles.border_error : styles.border_default
                )}
              />
              {errors.email?.message && (
                <p className={styles.error_message}>{errors.email?.message}</p>
              )}
            </div>
            <div className={styles.input_field}>
              <label htmlFor="password">Parolă</label>
              <input
                type="password"
                name="password"
                id="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Parola este obligatorie",
                  },
                  minLength: {
                    value: 6,
                    message: "Parola trebuie sa aibă cel puțin 6 caractere",
                  },
                })}
                placeholder="Parola ta..."
                className={classNames(
                  styles.placeholder,
                  errors.name ? styles.border_error : styles.border_default
                )}
              />
              {errors.password?.message && (
                <p className={styles.error_message}>
                  {errors.password?.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || profileIsLoading}
              className={styles.register_page_redirect}
            >
              Conectare
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;
