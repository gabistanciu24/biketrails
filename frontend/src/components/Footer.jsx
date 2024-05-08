import React from "react";
import styles from "./styles/footer.module.css";
import { images } from "../constants";
import {
  FaRegEnvelope,
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
            Federația pentru Dezvoltarea Zonei Rurale "Bârgău-Călimani"
          </p>
          <ul className={styles.footer_contact}>
            <li className={styles.footer_contact_item}>
              <AiOutlinePhone className={styles.icon} />
              +40 786 780 220
            </li>
            <li className={styles.footer_contact_item}>
              <MdOutlineLocationOn className={styles.icon} />
              Nr. 110, Jelna, România
            </li>
            <li className={styles.footer_contact_item}>
              <FaRegEnvelope className={styles.icon} />
              gal@birgau-calimani.ro
            </li>
          </ul>
        </div>
        <div className={styles.footer_content}>
          <div className={styles.footer_socials}>
            <h3 className={styles.footer_social_follow}>Urmărește-ne:</h3>
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
        <div className={styles.footer_content}>
          <div className={styles.footer_program}>
            <img
              src={images.program}
              alt="Logo Federatia Pentru Dezvoltarea Zonei Rurale Birgau-Calimani"
              className={styles.footer_program_img}
            />
          </div>
        </div>
      </div>
      <p className={styles.copyright_text}>
        &copy; 2024 <span>Bike - Trails</span> | Pedaled With Love.
      </p>
    </footer>
  );
};

export default Footer;
