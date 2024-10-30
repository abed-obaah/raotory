import React, { useState } from "react";
import axios from 'axios';
import logo from '../assets/Frame.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext

export default function Example() {
  const { login } = useAuth(); // Get the login function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const isFormValid = email && password;// Both fields must be filled

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://raotory.com.ng/apis/login.php', {
        email,
        password
      });

      if (response.data.status === "success") {
        setMessage(response.data.message);
        const userDetails = response.data.user;
        console.log("User Details:", userDetails);
        login(userDetails); // Store user details in context
        navigate('/dashboard');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-lg border border-gray-200 p-6 rounded-xl">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Please enter your login credentials details correctly
            </p>
          </div>

          <form action="#" method="POST" className="space-y-6 mt-6" onSubmit={handleLogin}>
            <div>
              <div className="mt-2 mb-5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-4 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0E90DA] sm:text-sm sm:leading-6"
                />
              </div>

              <div className="mt-2 mb-5">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-4 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0E90DA] sm:text-sm sm:leading-6"
                />
              </div>
              <Link to={'/forgetPassword'} className="flex items-center">
                <label htmlFor="terms" className="ml-3 block text-sm leading-6 text-black">
                  Forgot password?
                </label>
              </Link>
            </div>

            <div>
              <button
                type="submit"
                disabled={!isFormValid || loading} // Disable the button when loading
                className={`flex w-full justify-center rounded-md px-10 py-4 text-sm font-semibold leading-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  isFormValid && !loading ? "bg-[#0E90DA] hover:bg-[#0C7CC0]" : "bg-[#E5E5E5]"
                }`}
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
          {message && <p className="text-red-500">{message}</p>}

          <p className="mt-10 text-center text-sm text-gray-500">
            Don’t have an account?
            <Link to={'/'} className="pl-1 font-semibold leading-6 text-[#0E90DA] hover:text-indigo-500">
              Register
            </Link>
          </p>
          <div className="flex flex-col items-center mt-10">
            <img alt="Your Company" src={logo} className="h-5 w-auto mb-4" />
          </div>
        </div>
      </div>
    </>
  );
}
