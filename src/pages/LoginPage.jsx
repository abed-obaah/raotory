import React, { useState } from 'react';
import logo from '../assets/Frame.svg';
import { Link } from 'react-router-dom';

export default function Example() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = email && password; // Both fields must be filled

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

          <form action="#" method="POST" className="space-y-6 mt-6">
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
              <Link
              to={'/forgetPassword'}
               className="flex items-center">
                <label htmlFor="terms" className="ml-3 block text-sm leading-6 text-black">
                  Forgot password?
                </label>
              </Link>
            </div>

            <div>
              <Link to={isFormValid ? "/dashboard" : "#"}>
                <button
                  disabled={!isFormValid}
                  className={`flex w-full justify-center rounded-md px-10 py-4 text-sm font-semibold leading-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    isFormValid ? 'bg-[#0E90DA] hover:bg-[#0C7CC0]' : 'bg-[#E5E5E5]'
                  }`}
                >
                  Continue
                </button>
              </Link>
            </div>
          </form>

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
