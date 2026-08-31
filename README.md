
# Sairan — E-Commerce & Podcast Platform

A modern full-stack e-commerce platform with an integrated podcast system, built to provide a complete online shopping experience alongside educational audio content.

The project includes user authentication, product management, shopping cart functionality, order management, podcast streaming, user profiles, and a dedicated admin dashboard.

---

## 📌 Project Overview

**Sairan** is a full-stack e-commerce web application that combines an online shopping platform with an integrated podcast system.

Users can browse, search, filter, and sort products, manage their shopping cart even without logging in, place orders, and view their order history.

The platform also provides a dedicated podcast section where users can discover, search, and listen to educational audio content through a custom audio player.

A dedicated **Admin Panel** is included for managing products, orders, podcasts, and system statistics.

---

# ✨ Main Features

## 🔐 1. Secure Authentication System

The authentication system is based on phone number verification and One-Time Password (OTP).

Features include:

* Phone number-based authentication
* 6-digit OTP verification
* JWT-based authentication
* Session management
* Phone number change with OTP verification
* Limited OTP attempts
* Automatic OTP expiration

---

## 🛒 2. Offline Shopping Cart

Users can add products to their shopping cart without logging in.

The cart is stored locally in the browser and can be synchronized with the user's account after authentication.

Features include:

* Add products without login
* Increase or decrease product quantity
* Remove products from the cart
* Persistent cart for guest users
* Automatic synchronization after login

This provides a smoother shopping experience for both guest and authenticated users.

---

## 🛍️ 3. Product Management

Each product contains detailed information such as:

* Product name
* Images
* Description
* Technical specifications
* Price
* Stock quantity
* Rating

Users can:

* Search for products
* Filter products by price
* Sort products by price
* Sort products by rating
* View detailed product information

---

## 📦 4. Order Management

The platform provides a complete order management system.

When an order is submitted:

* Product availability is checked
* Product stock is automatically reduced
* Order information is stored in the database
* The order is associated with the user's account

Users can also view their order history and track their previous purchases.

---

# 🎧 5. Podcast System

Sairan includes a dedicated podcast platform for educational audio content.

Features include:

* Podcast listing
* Podcast search
* New and popular podcasts
* Dedicated podcast detail pages
* Custom audio player
* Podcast cover images
* View count tracking
* Audio file management through the Admin Panel

Each podcast view can be tracked to provide basic content statistics.

---

# 🛠️ 6. Admin Panel

The application includes a dedicated administration dashboard.

### Product Management

Administrators can:

* Create products
* Edit products
* Delete products
* Upload product images
* Manage product information
* Manage product stock

### Order Management

Administrators can:

* View all orders
* View order details
* Update order status

Supported order statuses include:

* Processing
* Completed

### Podcast Management

Administrators can:

* Create podcasts
* Edit podcasts
* Delete podcasts
* Upload audio files
* Upload podcast cover images

### Dashboard & Statistics

The admin dashboard provides an overview of the system, including:

* Total products
* Total users
* Total orders
* Total sales
* Low-stock products

---

# 👤 7. User Profile

Authenticated users have access to a dedicated profile section.

Users can:

* View account information
* Edit personal information
* Change their phone number
* Verify phone number changes using OTP
* View their orders
* View purchase history
* Delete their account

---

# 📱 8. Responsive Design

The user interface is designed to provide a consistent experience across different screen sizes.

Supported devices include:

* 📱 Mobile
* 📲 Tablet
* 💻 Desktop

The UI is implemented using **Tailwind CSS** and **CSS Modules**.

---

# 🎨 9. Animations & Interactive UI

**GSAP** is used throughout the application to create smooth and interactive animations.

Animations are implemented across different sections, including:

* Home page
* Carousels
* Parallax sections
* UI elements
* Content transitions

The goal is to provide a more engaging and modern user experience.

---

# 🔒 10. Security

The application implements several security mechanisms, including:

* JWT Authentication
* Password hashing with Bcrypt
* Prepared Statements for SQL Injection protection
* Input validation with Express Validator
* OTP attempt limitations
* OTP expiration
* Role-based access control for Admin features

---

# 🧑‍💻 Technologies

## Frontend

| Technology   | Purpose                 |
| ------------ | ----------------------- |
| React.js     | User interface          |
| React Router | Client-side routing     |
| Tailwind CSS | UI styling              |
| CSS Modules  | Component-level styling |
| GSAP         | Animations              |
| Axios        | API communication       |
| Lucide React | Icons                   |

## Backend

| Technology         | Purpose            |
| ------------------ | ------------------ |
| Node.js            | JavaScript runtime |
| Express.js         | Backend framework  |
| JWT                | Authentication     |
| Bcryptjs           | Password hashing   |
| Express Validator  | Input validation   |
| Express FileUpload | File uploads       |

## Database

### MySQL

MySQL is used to store and manage application data, including:

* Users
* Products
* Orders
* Podcasts
* Related application data

---

# 👥 User Roles

## User

Regular users can:

* Browse products
* Search products
* Filter and sort products
* Use the shopping cart without logging in
* Place orders
* View order history
* Edit their profile
* Change their phone number
* Browse and listen to podcasts

## Admin

Administrators have access to all regular user features plus:

* Product management
* Order management
* Podcast management
* Image uploads
* Audio file uploads
* Admin dashboard
* System statistics

---

# 🏗️ Project Structure

```text
sairan/
│
├── public/
│
├── src/
│   ├── api/
│   ├── components/
│   │   ├── Admin/
│   │   ├── Auth/
│   │   ├── Cart/
│   │   ├── Carousel/
│   │   ├── Common/
│   │   ├── ParallaxBG/
│   │   ├── ProductCarousel/
│   │   ├── Products/
│   │   └── Profile/
│   │
│   ├── contexts/
│   ├── layout/
│   └── pages/
│
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/MohammadEsm82/saIran.git
```

## 2. Navigate to the Project

```bash
cd saIran
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Start the Development Server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

# 🏭 Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

# 🧪 Code Quality

Run ESLint to check the codebase:

```bash
npm run lint
```

---

# 📊 Project Status

* ✅ React Application
* ✅ Responsive UI
* ✅ Phone Authentication
* ✅ OTP Verification
* ✅ JWT Authentication
* ✅ Shopping Cart
* ✅ Guest Shopping Cart
* ✅ Product Management
* ✅ Order Management
* ✅ Podcast System
* ✅ Custom Audio Player
* ✅ Admin Dashboard
* ✅ File Upload
* ✅ MySQL Database
* ✅ GSAP Animations
* ✅ Production Build
* ✅ ESLint Configuration

---

# 🚀 Future Improvements

The project architecture can be extended with additional features such as:

* Online payment gateway
* Discount and coupon system
* Wishlist
* Notification system
* Product reviews and comments
* Advanced pagination
* Product recommendation system
* Advanced analytics dashboard
* Docker support
* CI/CD pipeline
* Production deployment

---

# 🎓 Academic Project

This project was developed as an academic project with the goal of implementing a complete full-stack e-commerce platform with user authentication, product and order management, podcast streaming, and an administrative dashboard.

**Supervisor:** Dr. Mohammad Reza Soltan Aghaei
**University:** Islamic Azad University, Isfahan (Khorasgan) Branch

---

# 👨‍💻 Developer

**Mohammad Esmaeili**

Frontend & Full-Stack Developer

---

## 📄 License

This project was developed for educational and academic purposes.




# Sairan — E-Commerce & Podcast Platform

یک پلتفرم فروشگاه اینترنتی مدرن با قابلیت ارائه محتوای صوتی و پادکست، طراحی و توسعه‌یافته با React.js و Node.js.

این پروژه با هدف ایجاد یک تجربه‌ی کامل برای خرید آنلاین، مدیریت محصولات و سفارشات، احراز هویت کاربران و ارائه‌ی محتوای آموزشی صوتی طراحی شده است.

---

## 📌 معرفی پروژه

**Sairan** یک فروشگاه اینترنتی Full-Stack است که علاوه بر فروش محصولات، یک سیستم پادکست اختصاصی نیز در اختیار کاربران قرار می‌دهد.

کاربران می‌توانند محصولات را مشاهده و جستجو کنند، آن‌ها را بر اساس قیمت و امتیاز فیلتر و مرتب کنند، حتی بدون ورود به حساب کاربری سبد خرید خود را مدیریت کنند و پس از ورود، سفارش خود را ثبت و پیگیری کنند.

در کنار فروشگاه، بخش Podcast امکان جستجو، مشاهده و پخش محتوای صوتی آموزشی را فراهم می‌کند.

این پروژه همچنین دارای یک **پنل مدیریت اختصاصی** برای کنترل محصولات، سفارشات، کاربران و پادکست‌ها است.

---

# ✨ ویژگی‌های اصلی

## 🔐 1. سیستم احراز هویت

سیستم Authentication پروژه بر پایه‌ی شماره تلفن و کد یکبارمصرف (OTP) طراحی شده است.

* ورود و ثبت‌نام با شماره تلفن
* ارسال کد تأیید ۶ رقمی
* احراز هویت با JWT
* مدیریت Session کاربر
* امکان تغییر شماره تلفن با تأیید OTP
* محدودیت تعداد تلاش برای ورود
* انقضای خودکار کدهای تأیید

---

## 🛒 2. سبد خرید آفلاین

یکی از قابلیت‌های مهم پروژه، امکان استفاده از سبد خرید بدون نیاز به ورود است.

کاربر می‌تواند:

* بدون Login محصول به سبد خرید اضافه کند
* تعداد محصولات را تغییر دهد
* محصولات را حذف کند
* سبد خرید خود را در مرورگر حفظ کند
* پس از ورود، سبد خرید را با اطلاعات حساب کاربری همگام کند

این قابلیت باعث می‌شود تجربه‌ی خرید کاربران مهمان نیز حفظ شود.

---

## 🛍️ 3. سیستم مدیریت محصولات

محصولات دارای اطلاعات کامل شامل:

* نام محصول
* تصاویر
* توضیحات
* مشخصات فنی
* قیمت
* موجودی
* امتیاز

کاربران می‌توانند محصولات را:

* جستجو کنند
* بر اساس قیمت فیلتر کنند
* بر اساس قیمت مرتب کنند
* بر اساس امتیاز مرتب کنند
* جزئیات محصول را مشاهده کنند

---

## 📦 4. سیستم سفارشات

سیستم سفارش امکان ثبت و مدیریت سفارش‌های کاربران را فراهم می‌کند.

در هنگام ثبت سفارش:

* موجودی محصولات بررسی می‌شود
* موجودی کاهش پیدا می‌کند
* اطلاعات سفارش در دیتابیس ذخیره می‌شود
* سفارش به حساب کاربری متصل می‌شود

کاربران نیز می‌توانند تاریخچه سفارشات خود را مشاهده کنند.

---

# 🎧 5. سیستم Podcast

پروژه علاوه بر فروشگاه، دارای یک بخش اختصاصی برای پادکست است.

امکانات این بخش:

* نمایش لیست پادکست‌ها
* جستجوی پادکست
* نمایش پادکست‌های جدید و محبوب
* صفحه اختصاصی هر پادکست
* Audio Player اختصاصی
* نمایش تصویر Cover
* ثبت تعداد بازدید
* مدیریت فایل صوتی از پنل ادمین

---

# 🛠️ 6. پنل مدیریت

پروژه دارای یک Admin Panel اختصاصی برای مدیریت بخش‌های مختلف سیستم است.

### مدیریت محصولات

ادمین می‌تواند:

* محصول جدید ایجاد کند
* محصول را ویرایش کند
* محصول را حذف کند
* تصاویر محصول را آپلود کند
* موجودی و اطلاعات محصول را مدیریت کند

### مدیریت سفارشات

ادمین می‌تواند:

* تمام سفارشات را مشاهده کند
* جزئیات سفارش را بررسی کند
* وضعیت سفارش را تغییر دهد

وضعیت‌های سفارش شامل:

* در حال پردازش
* تکمیل شده

### مدیریت Podcast

ادمین می‌تواند:

* پادکست جدید ایجاد کند
* پادکست را ویرایش کند
* پادکست را حذف کند
* فایل صوتی آپلود کند
* تصویر Cover آپلود کند

### Dashboard

داشبورد مدیریتی اطلاعات آماری سیستم را نمایش می‌دهد، از جمله:

* تعداد محصولات
* تعداد کاربران
* تعداد سفارشات
* مجموع فروش
* محصولات با موجودی کم

---

# 👤 7. پروفایل کاربری

کاربران دارای پنل پروفایل اختصاصی هستند.

امکانات:

* مشاهده اطلاعات حساب
* ویرایش اطلاعات شخصی
* تغییر شماره تلفن
* تأیید شماره تلفن با OTP
* مشاهده سفارشات
* مشاهده تاریخچه خرید
* حذف حساب کاربری

---

# 📱 8. طراحی Responsive

رابط کاربری با تمرکز بر تجربه کاربری در دستگاه‌های مختلف طراحی شده است.

پشتیبانی از:

* 📱 Mobile
* 📲 Tablet
* 💻 Desktop

ساختار UI با استفاده از Tailwind CSS و CSS Modules پیاده‌سازی شده است.

---

# 🎨 9. انیمیشن و تعاملات UI

برای ایجاد تجربه کاربری بهتر، از **GSAP** برای پیاده‌سازی انیمیشن‌های روان استفاده شده است.

انیمیشن‌ها در بخش‌های مختلف سایت از جمله:

* صفحات اصلی
* Carousel
* Parallax
* عناصر UI
* انتقال و نمایش محتوا

استفاده شده‌اند.

---

# 🔒 10. امنیت

برخی از مکانیزم‌های امنیتی استفاده‌شده در پروژه:

* JWT Authentication
* Password Hashing با Bcrypt
* Prepared Statements برای جلوگیری از SQL Injection
* Input Validation با Express Validator
* محدودیت تلاش برای OTP
* Expiration برای کدهای تأیید
* کنترل دسترسی بخش Admin

---

# 🧑‍💻 تکنولوژی‌های استفاده شده

## Frontend

| Technology   | Usage                  |
| ------------ | ---------------------- |
| React.js     | ساخت رابط کاربری       |
| React Router | مدیریت Routing         |
| Tailwind CSS | طراحی UI               |
| CSS Modules  | استایل‌دهی کامپوننت‌ها |
| GSAP         | Animation              |
| Axios        | ارتباط با API          |
| Lucide React | آیکون‌ها               |

## Backend

| Technology         | Usage             |
| ------------------ | ----------------- |
| Node.js            | Runtime           |
| Express.js         | Backend Framework |
| JWT                | Authentication    |
| Bcryptjs           | Password Hashing  |
| Express Validator  | Validation        |
| Express FileUpload | File Upload       |

## Database

**MySQL**

برای ذخیره و مدیریت اطلاعات:

* کاربران
* محصولات
* سفارشات
* پادکست‌ها
* اطلاعات مرتبط با سیستم

استفاده شده است.

---

# 👥 نقش‌های کاربری

## User

کاربر عادی می‌تواند:

* مشاهده محصولات
* جستجوی محصولات
* فیلتر و مرتب‌سازی
* استفاده از سبد خرید بدون Login
* ثبت سفارش
* مشاهده سفارشات
* ویرایش پروفایل
* تغییر شماره تلفن
* مشاهده و پخش پادکست‌ها

## Admin

ادمین علاوه بر تمام امکانات کاربر:

* مدیریت محصولات
* مدیریت سفارشات
* مدیریت Podcast
* آپلود تصاویر
* آپلود فایل‌های صوتی
* مشاهده Dashboard
* مشاهده آمار سیستم

را در اختیار دارد.

---

# 🏗️ ساختار کلی پروژه

```text
sairan/
│
├── public/
│
├── src/
│   ├── api/
│   ├── components/
│   │   ├── Admin/
│   │   ├── Auth/
│   │   ├── Cart/
│   │   ├── Carousel/
│   │   ├── Common/
│   │   ├── ParallaxBG/
│   │   ├── ProductCarousel/
│   │   ├── Products/
│   │   └── Profile/
│   │
│   ├── contexts/
│   ├── layout/
│   └── pages/
│
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

# ⚙️ نصب و اجرای پروژه

### 1. Clone کردن Repository

```bash
git clone https://github.com/MohammadEsm82/saIran.git
```

### 2. ورود به پروژه

```bash
cd saIran
```

### 3. نصب Dependencies

```bash
npm install
```

### 4. اجرای پروژه در حالت Development

```bash
npm run dev
```

پروژه معمولاً روی آدرس زیر اجرا می‌شود:

```text
http://localhost:5173
```

---

# 🏭 Production Build

برای ایجاد نسخه Production:

```bash
npm run build
```

برای اجرای نسخه Build شده:

```bash
npm run preview
```

---

# 🧪 بررسی کیفیت کد

برای اجرای ESLint:

```bash
npm run lint
```

---

# 📊 وضعیت پروژه

* ✅ React Application
* ✅ Responsive UI
* ✅ Authentication
* ✅ OTP Verification
* ✅ JWT Authentication
* ✅ Shopping Cart
* ✅ Product Management
* ✅ Order Management
* ✅ Podcast System
* ✅ Audio Player
* ✅ Admin Dashboard
* ✅ File Upload
* ✅ MySQL Database
* ✅ Responsive Design
* ✅ GSAP Animations
* ✅ Production Build

---

# 🚀 قابلیت‌های قابل توسعه

ساختار پروژه به گونه‌ای طراحی شده که در آینده می‌توان امکانات بیشتری به آن اضافه کرد، مانند:

* درگاه پرداخت آنلاین
* سیستم تخفیف و Coupon
* Wishlist
* Notification System
* سیستم Review و Comment
* Pagination پیشرفته
* سیستم پیشنهاد محصولات
* گزارش‌های آماری پیشرفته
* Dockerization
* CI/CD
* Deployment اتوماتیک

---

# 🎓 درباره پروژه

این پروژه به عنوان یک پروژه دانشگاهی طراحی و توسعه داده شده است و هدف آن پیاده‌سازی یک سیستم فروشگاهی Full-Stack با قابلیت ارائه محتوای صوتی و مدیریت کامل کاربران و محصولات بوده است.

**استاد راهنما:** دکتر محمدرضا سلطان آقایی
**دانشگاه:** دانشگاه آزاد اسلامی واحد اصفهان (خوراسگان)

---

# 👨‍💻 توسعه‌دهنده

**Mohammad Esmaeili**

Frontend & Full-Stack Developer

---

## 📄 License

این پروژه با هدف آموزشی و دانشگاهی توسعه داده شده است.
--