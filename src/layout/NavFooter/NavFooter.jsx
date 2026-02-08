import { Link, Outlet } from "react-router";
import styles from "./NavFooter.module.css";

import logo from "../../assets/images/logo.png";

const NavFooter = () => {
  return (
    <div className={styles.main}>
      <nav className={styles.nav}>
        <div className={styles.navLinks}>
          <Link to={"/"}>صفحه اصلی</Link>
          <Link to={"/about"}>درباره ما</Link>
          <Link to={"/product"}>محصولات</Link>
          <Link to={"#"}>خدمات</Link>
          <Link to={"#"}>تحقیق و توسعه</Link>
          <Link to={"#"}>اتاق خبر</Link>
          <Link to={"#"}>تماس با ما</Link>
        </div>

        <Link to={"/"}>
          <img src={logo} alt=""/>
        </Link>
      </nav>

      <div className={styles.outlet}>
        <Outlet />
      </div>

      <footer className={styles.footer}>
        <p>درباره ما</p>
      </footer>
    </div>
  );
};

export default NavFooter;