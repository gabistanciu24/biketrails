import React from "react";
import styles from "./styles/cta.module.css";
import { images } from "../../../constants";

const CTA = () => {
  return (
    <span className={styles.wrapper}>
      <svg
        id="wave"
        className={styles.wave}
        viewBox="0 0 2100 200"
        version="1.1"
      >
        <defs>
          <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
            <stop stopColor="rgba(31, 64, 52, 1)" offset="0%" />
            <stop stopColor="rgba(31, 64, 52, 1)" offset="100%" />
          </linearGradient>
        </defs>
        <path
          fill="url(#sw-gradient-0)"
          d="M0,108L120,132C240,156,480,204,720,186C960,168,1200,84,1440,84C1680,84,1920,168,2160,210C2400,252,2640,252,2880,252C3120,252,3360,252,3600,252C3840,252,4080,252,4320,222C4560,192,4800,132,5040,114C5280,96,5520,120,5760,150C6000,180,6240,216,6480,228C6720,240,6960,228,7200,234C7440,240,7680,264,7920,252C8160,240,8400,192,8640,168C8880,144,9120,144,9360,156C9600,168,9840,192,10080,210C10320,228,10560,240,10800,240C11040,240,11280,228,11520,210C11760,192,12000,168,12240,168C12480,168,12720,192,12960,198C13200,204,13440,192,13680,180C13920,168,14160,156,14400,138C14640,120,14880,96,15120,96C15360,96,15600,120,15840,138C16080,156,16320,168,16560,198C16800,228,17040,276,17160,300L17280,324L17280,360L17160,360C17040,360,16800,360,16560,360C16320,360,16080,360,15840,360C15600,360,15360,360,15120,360C14880,360,14640,360,14400,360C14160,360,13920,360,13680,360C13440,360,13200,360,12960,360C12720,360,12480,360,12240,360C12000,360,11760,360,11520,360C11280,360,11040,360,10800,360C10560,360,10320,360,10080,360C9840,360,9600,360,9360,360C9120,360,8880,360,8640,360C8400,360,8160,360,7920,360C7680,360,7440,360,7200,360C6960,360,6720,360,6480,360C6240,360,6000,360,5760,360C5520,360,5280,360,5040,360C4800,360,4560,360,4320,360C4080,360,3840,360,3600,360C3360,360,3120,360,2880,360C2640,360,2400,360,2160,360C1920,360,1680,360,1440,360C1200,360,960,360,720,360C480,360,240,360,120,360L0,360Z"
        />
      </svg>
      <section className={styles.cta_section}>
        <div className={styles.container}>
          <div className={styles.cta_title}>
            <h2>Fii la curent cu aventurile noastre!</h2>
            <div className={styles.mailbox}>
              <input
                type="email"
                className={styles.email}
                placeholder="Mailul tău..."
              />
              <button className={styles.email_button}>Abonare</button>
            </div>
            <p>
              <span>Bucură-te de pedalat!</span> Lasa-ne sa te tinem la curent
              cu cele mai frumoase trasee, tu doar fii pregatit.
            </p>
          </div>
          <div className={styles.image_container}>
            <div className={styles.shapes_container}>
              <div className={styles.shape_1} />
              <div className={styles.shape_2} />
              <div className={styles.image_wrapper}>
                <img src={images.CTA} alt="Call To Action Img" />
                <div className={styles.image_text}>
                  <h2>Piatra Mare</h2>
                  <p>
                    Am lăsat mașinile în Timișul de jos și am pornit la urcare
                    pe marcaj bandă roșie.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </span>
  );
};

export default CTA;
