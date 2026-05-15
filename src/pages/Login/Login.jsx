import { useEffect, useRef, useState } from "react";
import styles from "./Login.module.css";
import { sendOTP, verifyOTP } from "../../api/auth";

const Login = () => {
  const [errorText, setErrorText] = useState("");

  const [showCodeInput, setShowCodeInput] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [number, setNumber] = useState("")

  const phoneInputRef = useRef(null);
  const codeInputRef = useRef(null);
  const fNameRef = useRef(null);
  const lNameRef = useRef(null);
  const mailRef = useRef(null);

  // فوکوس خودکار روی فیلد شماره تلفن هنگام بارگذاری کامپوننت
  useEffect(() => {
    phoneInputRef.current?.focus();
  }, []);

  const handlePhoneNumberChange = (event) => {
    const phoneNumber = event.target.value;
    // پاک کردن کاراکترهای غیرعددی
    const cleanedPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');
    event.target.value = cleanedPhoneNumber;
  };

  const handleLoginClick = async() => {
    if (phoneInputRef.current) {
      const phoneNumber = phoneInputRef.current.value;
      if (phoneNumber.length != 10 || phoneNumber[0] != "9") {
        setErrorText("شماره تلفن صحیح نیست")
      } else {
        setErrorText("")
        setNumber(`0${phoneNumber}`)
        const {isNew, success} = await sendOTP(phoneNumber);
        setShowCodeInput(success);
        setIsNewUser(isNew);
      }
    }
  };
  const handleVerifyCode = async(e) => {
    e.preventDefault();

    if (codeInputRef.current) {
      const code = codeInputRef.current.value;

      let data = {
        phoneNumber: number,
        code
      };
      if(isNewUser) {
        if (fNameRef.current && lNameRef.current && mailRef.current) {
          if (fNameRef.current.value < 3 || lNameRef.current.value < 3) {
            return setErrorText("نام و نام خانوادگی نباید کمتر از ۳ حرف باشد");
          }
          data = {
            ...data,
            fname: fNameRef.current.value,
            lname: lNameRef.current.value,
            mail: mailRef.current.value
          }
        } else return;
      }


      if (code.length != 6) {
        setErrorText("کد را صحیح وارد کنید")
      } else {
        setErrorText("")
        const {success, user, token} = await verifyOTP(data);
        
        if (success) {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);
          console.log(user, token)
          window.location.href = '/'
        }
      }
    }
  }

  return (
    <div className={styles.phoneLoginContainer}>
      {!showCodeInput?
        <>
          <h2 className={styles.title}>ورود | ثبت‌نام</h2>
          <p className={styles.greeting}>سلام! <br/> لطفا شماره موبایل یا ایمیل خود را وارد کنید</p>

          <div className={styles.inputGroup}>
            <span className={styles.countryCode}>+98</span>
            <input
              type="text"
              ref={phoneInputRef}
              className={styles.phoneNumberInput}
              placeholder="شماره موبایل"
              maxLength={10}
              onChange={handlePhoneNumberChange}
              // برای استفاده از Regex در زمان تایپ، می‌توان از onKeyDown استفاده کرد
              // یا پس از تغییر با state و props مقدار input را مدیریت کرد
            />
          </div>
          {errorText &&
            <p className={styles.error}>{errorText}</p>
          }

          <button className={styles.loginButton} onClick={handleLoginClick}>
            ارسال کد
          </button>

          <p className={styles.termsText}>
            ورود شما به معنای پذیرش {' '}
            <a href="#" className={styles.termsLink}>شرایط صاایران</a> {' '}
            و {' '}
            <a href="#" className={styles.termsLink}>قوانین حریم خصوصی</a> {' '}
            است.
          </p>
        </>
      :
        <form onSubmit={handleVerifyCode}>
          <h2 className={styles.title}>تایید کد</h2>
          <p className={styles.greeting}></p>
          <div className={styles.signupInputs}>
            <label style={{fontSize:"0.7rem"}}>کد ارسال شده به {number} را وارد کنید:</label>
            <input
              type="text"
              ref={codeInputRef}
              className={styles.codeInput}
              placeholder="x x x x x x"
              maxLength={6}
              onChange={e=>e.target.value = e.target.value.replace(/[^0-9]/g, '')}
            />
          </div>
          
          {isNewUser &&
            <>
              <div className={styles.signupInputs}>
                <label>نام</label>
                <input
                  ref={fNameRef}
                  placeholder="علی"
                />
              </div>
              <div className={styles.signupInputs}>
                <label>نام خانوادگی</label>
                <input
                  ref={lNameRef}
                  placeholder="رضایی"
                />
              </div>
              <div className={styles.signupInputs}>
                <label>ایمیل</label>
                <input
                  ref={mailRef}
                  type="mail"
                  placeholder="mail@example.com"
                />
              </div>
            </>
          }
          <button className={styles.loginButton} type="submit">
            ورود
          </button>
        </form>
      }
    </div>
  );
};

export default Login;