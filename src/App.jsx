import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './pages/RegistrationPage';
import OTP from './pages/EmailVerificationPage';
import Dashboard from './pages/HomePage';
import Login from './pages/LoginPage';
import ForgetPassword from './pages/forgetPassword';
import PasswordResetOtp from './pages/passwordResetOtp';
import InputOrder from './pages/Overview';
import Home from './landingPage/index';
import { AuthProvider } from './context/AuthContext'; // Ensure correct import
import ProtectedRoute from './ProtectedRoute'; // Ensure correct import
import { useMediaQuery } from 'react-responsive'; // Import react-responsive

export default function App() {
  // Check if the screen size is large enough (not mobile)
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1024 });

  // If not a large screen, show the "Mobile not supported" message
  if (!isDesktopOrLaptop) {
    return <div>This system can't be used on mobile phones</div>;
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Signin />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/" element={<Login />} />
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
