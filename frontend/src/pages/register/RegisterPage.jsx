import React, { useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./styles/registerpage.module.css";
import classNames from "classnames";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/users.js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducers.js";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signup({ name, email, password });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onchange",
  });
  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };
  const password = watch("password");

  return (
    <MainLayout>
      <section className={styles.container}>
        <div className={styles.registerpage}>
          <h1>Inregistrează-te</h1>
          <form onSubmit={handleSubmit(submitHandler)}>
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
                    message: "Intro un email valid",
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
            <div className={styles.input_field}>
              <label htmlFor="confirmPassword">Confirmare parolă</label>
              <input
                type="password"
                name="confirmPassword"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirmarea parolei este obilatorie",
                  },
                  validate: (value) => {
                    if (value !== password) {
                      return "Parolele nu se potrivesc";
                    }
                  },
                })}
                placeholder="Confirmă parola..."
                className={classNames(
                  styles.placeholder,
                  errors.name ? styles.border_error : styles.border_default
                )}
              />
              {errors.confirmPassword?.message && (
                <p className={styles.error_message}>
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            <Link to="/forget-password" className={styles.forgot_password}>
              Ai uitat parola?
            </Link>
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={styles.register_page_redirect}
            >
              Înregistrare
            </button>
            <div className={styles.login_page_redirect_wrapper}>
              <p className={styles.login_page_redirect}>Deja membru?</p>
              <Link to="/login">Conectează-te!</Link>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default RegisterPage;
