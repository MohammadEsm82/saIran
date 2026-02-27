import { Link, Outlet } from "react-router";
import styles  from "./NavFooter.module.css";

import logo from "../../assets/images/logo.png";

const NavFooter = () => {
  return (
    <div className={styles.main}>
      <nav className={styles.nav}> 
        <div className={styles.maxwidth}>
            <div className={styles.navLinks}>
              <Link to={"/"}>صفحه اصلی</Link>
              <Link to={"/aboutus"}>درباره ما</Link>
              <Link to={"/product"}>محصولات</Link>
              <Link to={"#"}>خدمات</Link>
              <Link to={"#"}>تحقیق و توسعه</Link>
              <Link to={"#"}>اتاق خبر</Link>
              <Link to={"/contactus"}>تماس با ما</Link>
            </div>

            <Link to={"/"}>
              <img src={logo} alt=""/>
            </Link>
        </div>
      </nav>
      <div className={styles.outlet}>
        <Outlet />
      </div>

      <footer className={styles.footer}>


        {/* background geometric lines */}
        <svg
          className={styles.footerLines}
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
        >
          <polyline
            points="650,0 1000,260"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="1"
            fill="none"
          />
          <polyline
            points="420,400 900,120"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1"
            fill="none"
          />
          <polyline
            points="200,320 720,0"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1"
            fill="none"
          />
        </svg>

        <div className={styles.footercontent}>


          <div className={styles.left}>
            <h1 className={styles.footertitle}>ارتباط با ما</h1>
            <p className={styles.footertext}>اصفهان-حکیم نظامی-جنب بانک ملت</p>
            <p className={styles.footertext}> تلفن همراه: 091370097</p>
            <p className={styles.footertext}>تلفکس : 7648376</p>
            <p className={styles.footertext}>moslehINFO@gmail.com</p>

          </div>


          <div className={styles.right}>
                <h3 className={styles.footertext}>صنعت تجهیزات پزشکی صاایران</h3>
                <p className={styles.footertext}>فعالیت خود را را در زمینه ای طراحی و تولید تجهیزات پزشکی
                 اغاز کرده
                </p>

          </div>
          
         

        </div>

        <div className={styles.copyright}>
          <p > تمام حقوق نزد گروه صنعت تجهیزات پزشکی ما محفوظ است.</p>

        </div>
        

      </footer>
    </div>
  );
};

export default NavFooter;