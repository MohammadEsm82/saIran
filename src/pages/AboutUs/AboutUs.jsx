import styles from "./AboutUs.module.css";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import mainImage from "../../assets/images/aboutus.jpg";
import sairanStaff from "../../assets/images/sairan-pic2.jpg";
import productionImage from "../../assets/images/production.png";
import numbersBG from "../../assets/images/numbersBG.jpg";
import visionImage from "../../assets/images/vision.jpg";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const countersRef = useRef(null);
  useGSAP(()=> {
    const countersTag = countersRef.current;

    countersTag.childNodes.forEach(number=> {
      const numberSpan = number.childNodes[0];
      gsap.from(numberSpan, {
        textContent: 0, // start from 0
        duration: 3, // animate in 3 seconds
        ease: "power3.out",
        snap: { textContent: 1 }, // increment by 1
        scrollTrigger: {
          trigger: number,
          start: "bottom bottom"
        },
        delay: 0.3,
        onUpdate: ()=>{numberSpan.textContent = numberSpan.innerText.replace(/\B(?=(\d{3})+(?!\d))/g, ",")},
      });
    });
  });
  return (
    <div className={styles.main}>
      <div className={styles.mainImage}>
        <img src={mainImage} alt=""/>
        <div>
          <h2>Innovation for a better tomorrow</h2>
          <p>SAIRAN Medical Equipments</p>
        </div>
      </div>

      <div className={styles.story}>
        <div className={styles.storyDetails}>
          <h3>داستان ما</h3>
          <p>
            صنعت تجهیزات پزشکی صاایران فعالیت خود را از سال ۱۳۷۸ با تمرکز بر طراحی و تولید تجهیزات پیشرفته پزشکی و آزمایشگاهی آغاز کرد. از آن زمان تاکنون، مجموعه‌ای متنوع از محصولات پزشکی توسط پژوهشگران و متخصصان جوان این حوزه طراحی و تولید شده است. این محصولات نه‌تنها نیاز مراکز درمانی کشور را تأمین می‌کنند، بلکه به بازارهای بین‌المللی نیز صادر می‌شوند. نوآوری مستمر و همگامی با فناوری‌های روز، همواره از راهبردهای اصلی این صنعت بوده است.
            <br />
            یکی از مزیت‌های کلیدی ما، برخورداری از گروه تحقیق و توسعه‌ای توانمند و پویاست. در صاایران، تحقیق و پژوهش همواره موتور محرک تولید محصولات نوآورانه و متنوع بوده است. تجربه موفق ما در طراحی و تولید سیستم‌های با فناوری پیشرفته، نتیجه سال‌ها تحقیق هدفمند و برنامه‌ریزی‌شده است. در سال‌های اخیر با سرمایه‌گذاری‌های مستمر در بخش تحقیق و توسعه، یکی از بزرگ‌ترین و موفق‌ترین هسته‌های پژوهشی کشور در حوزه طراحی و تولید تجهیزات پزشکی، با تکیه بر سرمایه انسانی متخصص، شکل گرفته است.
          </p>
        </div>
        <div className={styles.storyHeader}>
          <h3>Our Story</h3>
          <p>SAIRAN Medical Equipments</p>
        </div>
      </div>

      <img src={sairanStaff} className={styles.staffImage} alt="" />

      <div className={styles.production}>
        <img src={productionImage} alt=""/>
        <div>
          <h3>تولید پیشرفته، کیفیت جهانی</h3>
          <p>تولید تجهیزات پزشکی و آزمایشگاهی پیشرفته، از جمله مانیتور علائم حیاتی قلب، سیستم‌های تله‌مدیسین و تله‌مانیتورینگ، دستگاه‌های ثبت امواج مغزی، ساکشن‌های پزشکی و میکروسکوپ‌های بیولوژیکی دقیق، گواهی بر توانمندی‌های ماست. جهش در کیفیت محصولات و پاسخ‌گویی مؤثر به نیاز مشتریان را از طریق پیاده‌سازی سیستم‌های کیفیت و استانداردهای مرتبط با CE-Marking تجربه کرده‌ایم. استقرار سیستم‌های مدیریت کیفیت ISO 9001 و ISO 13485 از مهم‌ترین عوامل موفقیت ما در ارتقای رضایت مشتریان بوده است.</p>
        </div>
      </div>

      <div className={styles.numbersSection}>
        <div>
          <h3>صنعت تجهیزات پزشکی صاایران</h3>
          <p>SAIRAN Medical Equipments</p>
          <div ref={countersRef} className={styles.numbers}>
            <div>
              <span className={styles.number}>40656</span>
              <span>تعداد محصولات نصب شده</span>
            </div>
            <div>
              <span className={styles.number}>80</span>
              <span>تعداد مجوزهای محصولات</span>
            </div>
            <div>
              <span className={styles.number}>34</span>
              <span>تعداد شرکت های همکاری</span>
            </div>
            <div>
              <span className={styles.number}>6835</span>
              <span>تعداد مشتریان فعال</span>
            </div>
          </div>
        </div>
        <img src={numbersBG} alt=""/>
      </div>

      <div className={styles.vision}>
        <img src={visionImage} alt=""/>
        <div>
          <div className={styles.visionDetails}>
            <h3>چشم انداز</h3>
            <p>تبدیل‌شدن به یکی از بازیگران پیشرو در سطح منطقه‌ای و بین‌المللی در حوزه تولیدات فناوری‌های پیشرفته پزشکی، با اتکا بر نوآوری، پژوهش علمی و دانش بومی، در راستای ارائه راه‌حل‌های سلامت‌محور که فراتر از استانداردها عمل کرده و آینده‌ای سالم‌تر و مستقل‌تر برای جامعه رقم می‌زند.</p>
          </div>
          <div className={styles.visionTitle}>
            <h3><span style={{fontWeight:"100"}}>OUR</span> VISION</h3>
            <p>SAIRAN Medical Equipments</p>
          </div>
        </div>
      </div>

      <div className={styles.ourMission}>
        <div>
          <h3>رسالت ما، سلامت شماست</h3>
          <p>
            در صاایران، باور داریم که تولید تنها آغاز یک مسیر است. آنچه مسیر ما را متمایز می‌کند، <strong>تعهد به ارتقاء مداوم کیفیت، نوآوری در طراحی، و پاسخگویی مسئولانه به نیازهای سلامت جامعه</strong> است. ما بر این باوریم که استانداردها، تنها حداقل الزامات را تعیین می‌کنند؛ و برای جلب رضایت واقعی، باید فراتر از استانداردها عمل کرد.
            <br/>
            با اتکا بر این رویکرد، صاایران به مسیر خود برای ارتقاء سطح سلامت مردم ایران و دیگر نقاط جهان ادامه می‌دهد و با شعار <strong>«هر روز، بهتر از دیروز»</strong> به خلق آینده‌ای سالم‌تر متعهد است.
          </p>
        </div>
        <img src={productionImage} alt=""/>
      </div>
    </div>
  );
};

export default AboutUs;