import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

export default function Example() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const isButtonActive = otp.length > 0; // Button is active if OTP is entered

  // Handle the continue button click
  const handleContinue = async () => {
    if (isButtonActive) {
      try {
        // Make API request to verify OTP
        const response = await axios.post('https://raotory.com/apis/verify_otp.php', { email, otp });
        console.log("otp verification:",response)
        navigate('/login');
        if (response.data.success) {
          // OTP validation successful, navigate to login
          navigate('/login');
        } else {
          alert(response.data.message); // Display error message if OTP is incorrect
        }
      } catch (error) {
        alert('Error verifying OTP. Please try again.'); // Handle request error
      }
    }
  };

  // Handle the skip button click
  // const handleSkip = () => {
  //   // Navigate to the login screen or any other screen you want
  //   navigate('/login'); // Adjust the path as needed
  // };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-lg border border-gray-300 p-6 rounded-xl flex flex-col h-[700px] justify-between">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Email Verification
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Please enter the 6-digit code sent to the email provided during registration: {email}
            </p>
          </div>

          <form className="space-y-6 mt-6 flex flex-col justify-between h-full">
            <div>
              <input
                id="otp-page"
                name="otp-page"
                type="text"
                required
                placeholder="OTP Code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)} // Update OTP state on input change
                className="block w-full rounded-md border-0 py-4 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0E90DA] sm:text-sm sm:leading-6"
              />
            </div>

            <div className="mt-auto">
              <button
                type="button" // Type set to button to prevent default form submission
                disabled={!isButtonActive} // Disable button if no OTP is entered
                onClick={handleContinue} // Call handleContinue when button is clicked
                className={`flex w-full justify-center rounded-md px-10 py-4 text-sm font-semibold leading-6 text-white shadow-sm 
                  ${isButtonActive ? "bg-[#0E90DA] hover:bg-[#0E90DA]" : "bg-[#E5E5E5]"}
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E90DA]`}
              >
                Continue
              </button>

              {/* Skip Button */}
              {/* <button
                type="button" // Type set to button to prevent default form submission
                onClick={handleSkip} // Call handleSkip when button is clicked
                className="mt-4 flex w-full justify-center rounded-md px-10 py-4 text-sm font-semibold leading-6 text-white bg-gray-500 hover:bg-gray-600"
              >
                Skip
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
