import logo from '../assets/Frame.svg';
import { Link } from 'react-router-dom';

export default function Example() {
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

          <form action="#" method="POST" className="space-y-6 mt-6">
            <div>
              <div className="mt-2 mb-5">
                <input
                  id="full-name"
                  name="full-name"
                  type="text"
                  required
                  placeholder="Full Name"
                  className="block w-full rounded-md border-0 py-4 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0E90DA] sm:text-sm sm:leading-6"
                />
              </div>

              <div className="mt-2 mb-5">
                <input
                  id="email"
                  name="email"
                  type="email"
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

            <div>
              <Link to={"/otp"}>
                <button
                  className="flex w-full justify-center rounded-md bg-[#E5E5E5] px-10 py-4 text-sm font-semibold leading-6 text-white hover:bg-[#0E90DA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E90DA]"
                >
                  Continue
                </button>
              </Link>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already registered?
            <a
              href="#"
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
