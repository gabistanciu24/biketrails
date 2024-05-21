import React from "react";
import MainLayout from "../../components/MainLayout";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./styles/registerpage.module.css";

const RegisterPage = () => {
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
    console.log(data);
  };
  const password = watch("password");

  return (
    <MainLayout>
      <section className={styles.container}>
        <div className={styles.registerpage}>
          <h1>Inregistrează-te</h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div>
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
              />
              {errors.name?.message && <p>{errors.name?.message}</p>}
            </div>
            <div>
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
              />
              {errors.email?.message && <p>{errors.email?.message}</p>}
            </div>
            <div>
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
              />
              {errors.password?.message && <p>{errors.password?.message}</p>}
            </div>
            <div>
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
              />
              {errors.confirmPassword?.message && (
                <p>{errors.confirmPassword?.message}</p>
              )}
            </div>
            <Link to="/forget-password">Ai uitat parola?</Link>
            <button type="submit" disabled={!isValid}>
              Înregistrare
            </button>
            <p>
              Deja membru? <Link to="/login">Conectează-te!</Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default RegisterPage;
