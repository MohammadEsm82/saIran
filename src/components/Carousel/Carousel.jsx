import styles from "./Carousel.module.css";

import defaultImg from "../../assets/images/1.webp"
import { useState } from "react";

const Carousel = (props) => {
  const {
    slides=[{
      title:"Endoscopy",
      desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit est commodi impedit nulla ea illo molestias nobis laudantium pariatur neque modi esse quasi soluta error quibusdam repellendus fugiat, nam aliquam accusamus vel animi quisquam? Voluptatum modi natus ex, minima aut, ad, sit quo eaque reiciendis maiores neque. Repudiandae, fugit quaerat?",
      image:defaultImg
    }]
  } = props;

  const [current, setCurrent] = useState(0);

  const clickHandler = (direction) => {
    switch (direction) {
      case "+":
        setCurrent((current+1)%slides.length);
        break;
      case "-":
        if (current==0) {
          setCurrent(slides.length-1);
        } else {
          setCurrent(current-1);
        }
        break;
    
      default:
        break;
    };
  };

  return (
    <div className={styles.main}>
      {slides.map((slide, index)=> (
        <div key={index} className={`${styles.slide} ${current==index?styles.activeSlide:""}`}>
          <img src={slide.image} alt={slide.title}/>
          <div>
            <h2>{slide.title}</h2>
            <p>{slide.desc}</p>
          </div>
        </div>
      ))}
      <div className={styles.leftA}>
        <div onClick={()=>clickHandler("-")}>
          <span>{"->"}</span>
        </div>
      </div>
      <div className={styles.rightA}>
        <div onClick={()=>clickHandler("+")}>
          <span>{"<-"}</span>
        </div>
      </div>
    </div>
  );
};

export default Carousel;