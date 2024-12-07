import logo from '../assets/Frame.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Example() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setLoading(false); // Stop loading
      return;
    }

    try {
      const response = await axios.post('https://raotory.com/apis/register.php', {
        full_name: fullName,
        email,
        password,
        confirm_password: confirmPassword
      });

      console.log("Response data:", response.data); // Check the response

      if (response.data.status === 'success') {
        console.log("Navigating to OTP screen with email:", email);
        navigate('/otp', { state: { email } });
      } else {
        setMessage(response.data.message); // Handle error messages
        navigate('/otp', { state: { email } });
      }
    } catch (error) {
      console.error("Error during registration:", error); // Log error
      setMessage('An error occurred during registration. Please try again.');
      navigate('/otp', { state: { email } });
    } finally {
      setLoading(false); // Stop loading in both success and error cases
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-lg border border-gray-200 p-6 rounded-xl">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Register
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Please enter your registration details correctly
            </p>
          </div>

          <form action="#" method="POST" className="space-y-6 mt-6" onSubmit={handleSubmit}>
            <div>
              <div className="mt-2 mb-5">
                <input
                  id="full-name"
                  name="full-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className="block w-full rounded-md border-0 py-4 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0E90DA] sm:text-sm sm:leading-6"
                />
              </div>

              <div className="mt-2 mb-5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                  className="block w-full rounded-md border-0 py-4 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0E90DA] sm:text-sm sm:leading-6"
                />
              </div>

              <div className="mt-2 mb-5">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="block w-full rounded-md border-0 py-4 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0E90DA] sm:text-sm sm:leading-6"
                />
              </div>

              <div className="mt-2 mb-3">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm Password"
                  className="block w-full rounded-md border-0 py-4 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0E90DA] sm:text-sm sm:leading-6"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-[#0E90DA]"
                />
                <label
                  htmlFor="terms"
                  className="ml-3 block text-sm leading-6 text-black"
                >
                  Agree to Our terms and Conditions
                </label>
              </div>
            </div>
            {message && <p className="text-red-500">{message}</p>}

            <div>
              <button
                type="submit"
                className={`flex w-full justify-center rounded-md ${loading ? 'bg-gray-300' : 'bg-[#E5E5E5]'} px-10 py-4 text-sm font-semibold leading-6 text-white hover:bg-[#0E90DA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E90DA]`}
                disabled={loading} // Disable the button when loading
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 0114.243-4.243A9.956 9.956 0 0112 20a9.956 9.956 0 01-6.243-2.243A8 8 0 014 12z"
                      />
                    </svg>
                    Loading...
                  </div>
                ) : (
                  'Continue'
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already registered?
            <a
              href="/"
              className="pl-1 font-semibold leading-6 text-[#0E90DA] hover:text-indigo-500"
            >
              Login
            </a>
          </p>
          <div className="flex flex-col items-center mt-10">
            <img
              alt="Your Company"
              src={logo}
              className="h-5 w-auto mb-4"
            />
          </div>
        </div>
      </div>
    </>
  );
}
