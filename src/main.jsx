import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, Route, Routes } from "react-router";
import './index.css'

import NavFooter from './layout/NavFooter/NavFooter.jsx';
import App from './App.jsx'
import AboutUs from './pages/AboutUs/AboutUs.jsx';
import ContactUs from './pages/ContactUs/ContactUs.jsx';
import Login from "./pages/Login/Login.jsx"
import Profile from './pages/Profile/Profile.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<NavFooter />} >
        <Route index element={<App />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/product' element={<h1>product</h1>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/*' element={<Link to={"/"}>404 - Not Found</Link>}/>
      </Route>
    </Routes>
  </BrowserRouter>,
)
