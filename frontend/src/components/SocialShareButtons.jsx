import React from "react";
import {
  FaFacebookSquare,
  FaRedditSquare,
  FaWhatsappSquare,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import styles from "./styles/socialsharebuttons.module.css";
import classNames from "classnames";

const SocialShareButtons = ({ url, title }) => {
  return (
    <div className={styles.socials_wrapper}>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.facebook.com/dialog/share?app_id=899947381612021&display=popup&href=${url}`}
      >
        <FaFacebookSquare
          className={classNames(styles.socials_button, styles.facebook)}
        />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://twitter.com/intent/tweet?url=${url}`}
      >
        <FaSquareXTwitter
          className={classNames(styles.socials_button, styles.twitter)}
        />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.reddit.com/submit?url=${url}&title=${title}`}
      >
        <FaRedditSquare
          className={classNames(styles.socials_button, styles.reddit)}
        />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://api.whatsapp.com/send/?text=${url}`}
      >
        <FaWhatsappSquare
          className={classNames(styles.socials_button, styles.whatsapp)}
        />
      </a>
    </div>
  );
};

export default SocialShareButtons;
