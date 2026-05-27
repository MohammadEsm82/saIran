import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { Link } from 'react-router';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

import NavFooter from './layout/NavFooter/NavFooter';
import ProfileLayout from './components/Profile/ProfileLayout';
import AdminLayout from './components/Admin/AdminLayout';

import HomePage from './pages/HomePage/HomePage';
import Login from './components/Auth/Login';
import AboutUs from './pages/AboutUs/AboutUs';
import ContactUs from './pages/ContactUs/ContactUs';
import ProductsPage from './pages/ProductsPage';
import PodcastsPage from './pages/PodcastsPage';
import PodcastDetailPage from './pages/PodcastDetailPage';

import LoadingSpinner from './components/Common/LoadingSpinner';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner fullScreen />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/profile" />;
  }
  
  return children;
};

function AppRoutes() {
  
  return (
    <Routes>
      <Route path="/" element={<NavFooter />} >
        <Route index element={<HomePage />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/podcasts" element={<PodcastsPage />} />
        <Route path="/podcast/:id" element={<PodcastDetailPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile"
          element={
            <ProtectedRoute>
              <ProfileLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/profile" />} />
        <Route path='/*' element={<Link to={"/"}>404 - Not Found</Link>}/>
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;