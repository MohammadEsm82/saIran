import styles from "./ParallaxBG.module.css";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ParallaxBG = () => {
  const mainRef = useRef(null);

  useGSAP(()=> {
    const el = mainRef.current;
    gsap.fromTo(el,
      {
        backgroundPosition: "center 30%"
      },
      {
        backgroundPosition: "center 70%",
        ease:"none",
        delay: 0.0,
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  });

  return (
    <div ref={mainRef} className={styles.main}>
      <div className={styles.maxWidth}>
        <h3>رویدادها و نمایشگاه ها</h3>
        <p>جایی که نوآوری با جهان ملاقات می‌کند</p>
        <a href="#">آخرین رویدادها</a>
      </div>
    </div>
  );
};

export default ParallaxBG;