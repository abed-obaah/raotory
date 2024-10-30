import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './pages/RegistrationPage';
import OTP from './pages/EmailVerificationPage';
import Dashboard from './pages/HomePage';
import Login from './pages/LoginPage';
import ForgetPassword from './pages/forgetPassword';
import PasswordResetOtp from './pages/passwordResetOtp';
import InputOrder from './pages/Overview';
import Home from "./landingPage/index";
import { AuthProvider } from '../src/context/AuthContext'; // Import the AuthProvider
import ProtectedRoute from '../src/ProtectedRoute'; // Import the ProtectedRoute
// import Payment from './components/pricing/payment';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgetPassword' element={<ForgetPassword />} />
          <Route path='/passwordResetOtp' element={<PasswordResetOtp />} />
          <Route path='/inputOrder' element={<InputOrder />} />
          {/* <Route path='/inputOrder' element={<ProtectedRoute element={<InputOrder/>} />} /> */}
          {/* <Route path='/Payment' element={<ProtectedRoute element={<Payment/>} />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}
