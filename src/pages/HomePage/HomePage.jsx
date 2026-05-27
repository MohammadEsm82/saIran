import styles from "./HomePage.module.css";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router";
import { Play } from "lucide-react";

import Carousel from "../../components/Carousel/Carousel";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import ParallaxBG from "../../components/ParallaxBG/ParallaxBG";

import image1 from "../../assets/images/1.webp";
import image2 from "../../assets/images/2.jpg";
import image3 from "../../assets/images/3.webp";
import ourstoryImage from "../../assets/images/ourstory.jpg";
import serviceImage from "../../assets/images/serviceImage.jpg";
import newsImage1 from "../../assets/images/news1.jpg";
import newsImage2 from "../../assets/images/news2.jpg";
import newsImage3 from "../../assets/images/news3.jpg";

function HomePage() {
  const serviceCardsRef = useRef(null);

  useGSAP(()=> {
    const services = serviceCardsRef.current;

    services.childNodes.forEach(card => {
      const content = card.childNodes[0];

      const outerRX = gsap.quickTo(card, "rotationX", { ease: "elastic" });
      const outerRY = gsap.quickTo(card, "rotationY", { ease: "elastic" });
      const innerX = gsap.quickTo(content, "x", { ease: "elastic" });
      const innerY = gsap.quickTo(content, "y", { ease: "elastic" });

      card.addEventListener("pointermove", (e) => {
        outerRX(gsap.utils.interpolate(15, -15, (e.y-card.getBoundingClientRect().y) / card.clientHeight));
        outerRY(gsap.utils.interpolate(-15, 15, (e.x-card.getBoundingClientRect().x) / card.clientWidth));
        innerX(gsap.utils.interpolate(-10, 10, (e.x-card.getBoundingClientRect().x) / card.clientWidth));
        innerY(gsap.utils.interpolate(-10, 10, (e.y-card.getBoundingClientRect().y) / card.clientHeight));
      });
      
      card.addEventListener("pointerleave", () => {
        outerRX(0);
        outerRY(0);
        innerX(0);
        innerY(0);
      });
    })
  })

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
          <Link to="aboutus">درباره ما</Link>
                 
        </div>



        <div>
          <a href="https://www.aparat.com/v/ddg406e" target="_blank" className={styles.playBtn}>
            <span>
              <Play size={30} />
            </span>
          </a>
          <img className={styles.ourstoryimage} src={ourstoryImage} alt=""/>
        </div>
      </div>


      <div className={styles.services}>
        <h3>خدمات | services</h3>
        <p>مشاوره،کالیبراسیون،آموزش و پشتیبانی تجهیزات پزشکی با استانداردهای بین‌المللی</p>
        <a href="#">توضیحات بیشتر</a>
        <div ref={serviceCardsRef} className={styles.serviceCards}>
          <div className={styles.serviceCard}>
            <div>
              <h4>خدمات مشاوره</h4>
              <p>معرفی تجهیز مناسب با نیاز و کاربرد هر مرکز درمانی<br/>نوسازی و تجهیز مراکز درمانی و اورژانس ها<br/>بهبود فرآیندهای داخلی بیمارستان ها جهت افزایش بهره وری آنها<br/>هوشمندسازی بیمارستان ها</p>
            </div>
            <img src={serviceImage} alt=""/>
          </div>
          <div className={styles.serviceCard}>
            <div>
              <h4>خدمات مشاوره</h4>
              <p>معرفی تجهیز مناسب با نیاز و کاربرد هر مرکز درمانی<br/>نوسازی و تجهیز مراکز درمانی و اورژانس ها<br/>بهبود فرآیندهای داخلی بیمارستان ها جهت افزایش بهره وری آنها<br/>هوشمندسازی بیمارستان ها</p>
            </div>
            <img src={serviceImage} alt=""/>
          </div>
          <div className={styles.serviceCard}>
            <div>
              <h4>خدمات مشاوره</h4>
              <p>معرفی تجهیز مناسب با نیاز و کاربرد هر مرکز درمانی<br/>نوسازی و تجهیز مراکز درمانی و اورژانس ها<br/>بهبود فرآیندهای داخلی بیمارستان ها جهت افزایش بهره وری آنها<br/>هوشمندسازی بیمارستان ها</p>
            </div>
            <img src={serviceImage} alt=""/>
          </div>
          <div className={styles.serviceCard}>
            <div>
              <h4>خدمات مشاوره</h4>
              <p>معرفی تجهیز مناسب با نیاز و کاربرد هر مرکز درمانی<br/>نوسازی و تجهیز مراکز درمانی و اورژانس ها<br/>بهبود فرآیندهای داخلی بیمارستان ها جهت افزایش بهره وری آنها<br/>هوشمندسازی بیمارستان ها</p>
            </div>
            <img src={serviceImage} alt=""/>
          </div>
        </div>
      </div>

      
      <div className={styles.newsRoom}>
        <h3>اتاق خبر | Newsroom</h3>
        <div className={styles.newsGrid}>
          <div className={styles.newsCard}>
            <img src={newsImage1} alt=""/>
            <div className={styles.newsDetail}>
              <a href="#"><h4>دهمین کنگره انجمن های ارتوپدی</h4></a>
              <p className={styles.date}>1403.07.19</p>
              <p>حضور پررنگ صاایران در دهمین کنگره منطقه‌ای ارتوپدی؛ نمایش توانمند</p>
              <a href="#" className={styles.newsA}>جزئیات بیشتر</a>
            </div>
          </div>
          <div className={styles.newsCard}>
            <img src={newsImage2} alt=""/>
            <div className={styles.newsDetail}>
              <a href="#"><h4>بازدید مهندس عبدالرحیم گرجی</h4></a>
              <p className={styles.date}>1403.07.19</p>
              <p>بازدید معاون فناوری اطلاعات کل سازمان زندان‌ها و هیئت همراه از صنع</p>
              <a href="#" className={styles.newsA}>جزئیات بیشتر</a>
            </div>
          </div>
          <div className={styles.newsCard}>
            <img src={newsImage3} alt=""/>
            <div className={styles.newsDetail}>
              <a href="#"><h4>بازدید جناب آقای دکتر پیرصالحی</h4></a>
              <p className={styles.date}>1403.07.19</p>
              <p>ریاست محترم سازمان غذا و دارو، از مجتمع صنعتی تجهیزات پزشکی</p>
              <a href="#" className={styles.newsA}>جزئیات بیشتر</a>
            </div>
          </div>
        </div>
        <a href="#" className={styles.archiveLink}>آرشیو خبرها</a>
      </div>
    </div>
  )
}

export default HomePage;
