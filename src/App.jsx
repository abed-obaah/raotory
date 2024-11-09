import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './pages/RegistrationPage';
import OTP from './pages/EmailVerificationPage';
import Dashboard from './pages/HomePage';
import Login from './pages/LoginPage';
import ForgetPassword from './pages/forgetPassword';
import PasswordResetOtp from './pages/passwordResetOtp';
import InputOrder from './pages/Overview';
import Home from "./landingPage/index";
import { AuthProvider } from '../src/context/AuthContext'; // Ensure correct import
import ProtectedRoute from './ProtectedRoute'; // Ensure correct import

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Signin />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/passwordResetOtp" element={<PasswordResetOtp />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/inputOrder" element={<ProtectedRoute><InputOrder /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
