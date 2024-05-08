import React from "react";
import styles from "./styles/footer.module.css";
import { images } from "../constants";
import {
  FaRegEnvelope,
  FaCaretRight,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { AiOutlinePhone } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footer_grid} container grid`}>
        <div className={styles.footer_content}>
          <a href="/" className={styles.footer_logo}>
            <img
              src={images.FDZR}
              alt="Logo Federatia Pentru Dezvoltarea Zonei Rurale Birgau-Calimani"
              className={styles.footer_logo_img}
            />
          </a>
          <p className={styles.footer_description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
            exercitationem!
          </p>
          <ul className={styles.footer_contact}>
            <li className={styles.footer_contact_item}>
              <AiOutlinePhone className={styles.icon} />
              +40 799 999 999
            </li>
            <li className={styles.footer_contact_item}>
              <MdOutlineLocationOn className={styles.icon} />
              25/B Am o strada, Bistrita
            </li>
            <li className={styles.footer_contact_item}>
              <FaRegEnvelope className={styles.icon} />
              stanciumgabi24@gmail.com
            </li>
          </ul>
        </div>
        <div className={styles.footer_content}>
          <h3 className={styles.footer_title}>Navigare Rapida</h3>
          <ul className={styles.footer_links}>
            <li>
              <a href="#acasa" className={styles.footer_link}>
                <FaCaretRight className={styles.icon} />
                Acasa
              </a>
            </li>
            <li>
              <a href="#about" className={styles.footer_link}>
                <FaCaretRight className={styles.icon} />
                Despre noi
              </a>
            </li>
            <li>
              <a href="#servicii" className={styles.footer_link}>
                <FaCaretRight className={styles.icon} />
                Servicii
              </a>
            </li>
            <li>
              <a href="#beneficii" className={styles.footer_link}>
                <FaCaretRight className={styles.icon} />
                Beneficii
              </a>
            </li>
            <li>
              <a href="#motive" className={styles.footer_link}>
                <FaCaretRight className={styles.icon} />
                De ce noi?
              </a>
            </li>
            <li>
              <a href="#contact" className={styles.footer_link}>
                <FaCaretRight className={styles.icon} />
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.footer_content}>
          <h3 className={styles.footer_title}>Program</h3>
          <div className={styles.footer_opening_hour}>
            <ul className={styles.opening_hour_list}>
              <li className={styles.opening_hour_item}>
                <span>Luni:</span>
                <span>08AM - 06PM</span>
              </li>
              <li className={styles.opening_hour_item}>
                <span>Marti:</span>
                <span>08AM - 06PM</span>
              </li>
              <li className={styles.opening_hour_item}>
                <span>Miercuri:</span>
                <span>08AM - 06PM</span>
              </li>
              <li className={styles.opening_hour_item}>
                <span>Joi:</span>
                <span>08AM - 06PM</span>
              </li>
              <li className={styles.opening_hour_item}>
                <span>Vineri:</span>
                <span>08AM - 06PM</span>
              </li>
              <li className={styles.opening_hour_item}>
                <span>Sambata:</span>
                <span>08AM - 02PM</span>
              </li>
              <li className={styles.opening_hour_item}>
                <span>Duminica:</span>
                <span>INCHIS</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footer_content}>
          <h3 className={styles.footer_title}>Newsletter</h3>
          <p className={styles.footer_description}>
            Aboneaza-te la Newsletter-ul Nostru Pentru a fi la Curent cu
            Ofertele
          </p>
          <form action="" className={styles.subscribe_form}>
            <input
              type="email"
              placeholder="Adresa de Email"
              className={`${styles.form_input} subscribe_input`}
            />
            <button className={`${styles.btn} btn_flex subscribe_btn`}>
              <FaRegEnvelope /> Abonare
            </button>
          </form>
          <div className={styles.footer_socials}>
            <h3 className={styles.footer_social_follow}>Urmareste-ne:</h3>
            <div className={styles.footer_social_links}>
              <a href="/" className={styles.footer_social_link}>
                <FaFacebookF />
              </a>
              <a href="/" className={styles.footer_social_link}>
                <FaXTwitter />
              </a>
              <a
                href="https://www.linkedin.com/in/gabriel-stanciu-b66482268/"
                className={styles.footer_social_link}
              >
                <FaLinkedinIn />
              </a>
              <a href="/" className={styles.footer_social_link}>
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.copyright_text}>
        &copy; Copyright 2024 <span>Bike-Trails</span> All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
