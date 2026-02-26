import styles from "./App.module.css";

import Carousel from "./components/Carousel/Carousel";
import ProductCarousel from "./components/ProductCarousel/ProductCarousel";
import ParallaxBG from "./components/ParallaxBG/ParallaxBG";

import image1 from "./assets/images/1.webp";
import image2 from "./assets/images/2.jpg";
import image3 from "./assets/images/3.webp";
import ourstoryImage from "./assets/images/ourstory.jpg"

import { FaPlay } from "react-icons/fa";

function App() {

  return (
    <div className={styles.container}>
      <Carousel
        slides={[
          {
            title:"آندوسکوپی",
            desc:"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد.",
            image:image1
          },
          {
            title:"مانیتور دفیبریلاتور",
            desc:"با RELIVE DM5، در حین نظارت بر علائم حیاتی حیاتی بیمار، جان خود را نجات دهید، همه این‌ها در یک دستگاه قابل اعتماد و قابل حمل. مهندسی شده برای محیط‌های اورژانسی با طراحی بصری و عملکرد قدرتمند.",
            image:image2
          },
          {
            title:"آرتروپلاستی",
            desc:"سیستم‌های آندوسکوپی SAIRAN تصویربرداری با کیفیت بالا، عملکرد شهودی و عملکرد قابل اعتماد را برای طیف گسترده‌ای از روش‌های کم‌تهاجمی ارائه می‌دهند.",
            image:image3
          }
        ]}/>

      <ProductCarousel />

      <ParallaxBG />

      <div className={styles.ourstory}>
        <div className={styles.details}>
          <h3>داستان ما | Our Story</h3>
          <p>
            صنعت تجهیزات پزشکی صاایران فعالیت خود را در زمینه‌ی طراحی و تولید تجهیزات پزشکی و آزمایشگاهی پیشرفته از سال 1378 آغاز کرده است.
            <br/>
            در حال حاضر محصولات پزشکی متعددی توسط محققان و دانش پژوهان جوان این صنعت طراحی و تولید شده است که علاوه بر تأمین نیازمندی مراکز درمانی داخل کشور، به سایر کشورها نیز صادر می گردد.
            <br/>
            طراحی و تولید محصولات جدید و متنوع، همگام با تکنولوژی روز، همواره از راهبرد های اصلی ما بوده است...
          </p>
          <a href="#">درباره ما</a>
                 
        </div>



        <div>
          <a href="https://www.aparat.com/v/ddg406e" target="_blank" className={styles.playBtn}>
            <span>
              <FaPlay/>
            </span>
          </a>
          <img className={styles.ourstoryimage} src={ourstoryImage} alt=""/>
        </div>
      </div>
    </div>
  )
}

export default App
