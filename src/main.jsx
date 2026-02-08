import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, Route, Routes } from "react-router";
import './index.css'
import App from './App.jsx'
import NavFooter from './layout/NavFooter/NavFooter.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<NavFooter />} >
        <Route index element={<App />} />
        <Route path='/about' element={<h1>about</h1>} />
        <Route path='/product' element={<h1>product</h1>} />
        <Route path='/*' element={<Link to={"/"}>404 - Not Found</Link>}/>
      </Route>
    </Routes>
  </BrowserRouter>,
)
