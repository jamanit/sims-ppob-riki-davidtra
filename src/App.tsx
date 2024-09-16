import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useAuthCheck } from './utils/useAuthCheck';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TopUpPage from './pages/TopUpPage';
import PaymentPage from './pages/PaymentPage';
import TransactionPage from './pages/TransactionPage';
import ProfilePage from './pages/ProfilePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/topup" element={<ProtectedRoute><TopUpPage /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
        <Route path="/transaction" element={<ProtectedRoute><TransactionPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
};

// Filter route tertentu dengan check token dan set header component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { loading, error } = useAuthCheck();

  if (loading) {
    return <p>Memuat...</p>;
  }

  if (error) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Sembunyikan header hanya di halaman login dan register
  const hideHeader = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideHeader && <Header />}
      {children}
    </>
  );
};

export default App;
