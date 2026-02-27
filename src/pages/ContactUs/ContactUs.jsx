import styles from "./ContactUs.module.css";

import ContactUsImage from "../../assets/images/contactus.jpg";

const ContactUs = () => {
  const submitHandler = (e) => {
    e.preventDefault();

    alert("پیام با موفقیت ارسال شد!");
  }
  return (
    <div className={styles.main}>
      <img src={ContactUsImage}  className={styles.contactusimg} alt="تماس با ما"/>

      <div className={styles.contactTitle}>
        <h3>CONTACT US</h3>
        <p>SAIRAN Medical Equipment</p>
      </div>

      <div className={styles.contactarea}>
        <form className={styles.form} onSubmit={submitHandler}>
          <h3 className={styles.wideGridItem}>با ما در ارتباط باشید</h3>
          <input type="text" placeholder="نام شما*" required/>
          <input type="email" placeholder="ایمیل*" required/>
          <input className={styles.wideGridItem} type="text" placeholder="موضوع"/>
          <textarea className={styles.wideGridItem} placeholder="متن پیام"/>
          <button type="submit">ارسال پیام</button>
        </form>
        
        <div className={styles.contactInfo}>          
          <p>اصفهان، خیابان کاوه، ما بین خیابان مخابرات و جابر انصاری،جنب بانک ملی</p>
          <p> صنعت تجهیزات پزشکی ساختمان</p>
          <p>پشتیبانی: 5200- 031</p>
          <p>تلفن همراه: 09137009708</p>
          <p>تلفکس: 5200 031</p>
          <a href="mailto: moslehInfo@gmail.com">moslehInfo@gmail.com</a>
        </div>
      </div>

      <iframe
        title="map-iframe"
        src="https://neshan.org/maps/iframe/places/_bQmZqIxOWIn#c35.640-51.393-16z-0p/35.639895917906244/51.390443560866544"
        width="100%"
        height="700"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};

export default ContactUs;