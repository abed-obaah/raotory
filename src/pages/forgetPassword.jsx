import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Example() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const isButtonActive = otp.length > 0;

  const handleContinue = () => {
    if (isButtonActive) {
      navigate('/passwordResetOtp'); // Navigate to LoginScreen
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-lg border border-gray-300 p-6 rounded-xl  flex flex-col h-[700px] justify-between">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot password
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
            Please enter the email address associated with your account
            </p>
          </div>

          <form action="#" method="POST" className="space-y-6 mt-6 flex flex-col justify-between h-full">
            <div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="email"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="block w-full rounded-md border-0 py-4 pl-4 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0E90DA] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-auto">
              <button
                type="button" // Changed type to "button" since we're handling the submit manually
                disabled={!isButtonActive}
                onClick={handleContinue} // Handle button press
                className={`flex w-full justify-center rounded-md px-10 py-4 text-sm font-semibold leading-6 text-white
                  ${isButtonActive ? "bg-[#0E90DA] hover:bg-[#0E90DA]" : "bg-[#E5E5E5]"}
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E90DA]`}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
