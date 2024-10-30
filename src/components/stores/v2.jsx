import React, { useEffect, useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { useAuth } from '../../context/AuthContext';
import success from '../../assets/success2.svg';

function NewComponent({ price, email }) {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 -py-10 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center mb-10">
        <p className="mt-2 text-2xl font-regular tracking-tight text-gray-900 sm:text-4xl">
          Price: {price} <span> Single store</span>
        </p>
        <p className="mt-3 text-md text-center leading-8 text-gray-600">
          This gives you the ability to set up your store and inventory
        </p>
        <p className="-mt-3 text-md text-center leading-8 text-gray-600">
          appropriately
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg border border-gray-300 p-6 rounded-xl flex flex-col h-[650px] justify-between">
        <div className="mx-4">
          <div className="mt-2">
            <img
              src={success}
              alt="Store"
              className="block w-full h-full rounded-lg object-contain"
            />
          </div>
          <p className="-mt-3 text-5xl text-center leading-8 text-black">
            Yay!
          </p>
          <p className="mt-3 text-md text-center leading-8 text-gray-600">
            Congratulations, you have successfully set up your store on Raotory, <span className="text-[#0E90DA]">Your stock keeping buddy!</span>
          </p>
        </div>
        <div className="mt-auto">
          <button
            type="button"
            className="flex w-full justify-center rounded-md px-10 py-4 text-sm font-semibold leading-6 text-white bg-[#0E90DA] hover:bg-[#0E90DA] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E90DA]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

const Donate = ({ price }) => {
  const publicKey = "pk_live_348fc3edc9f2f95fd5ff5b21fcf28b52ff590d86"; // Replace with your actual public key
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [store, setStore] = useState("");
  const [location, setLocation] = useState("");
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false); // State to track payment success
  const { user, isAuthenticated } = useAuth();

  const isButtonActive = store.length > 0 && location.length > 0 && phone.length > 0;

  useEffect(() => {
    if (isAuthenticated && user.email) {
      setEmail(user.email);
    }
  }, [isAuthenticated, user.email]);

  const amount = parseInt(price.replace(/NGN|,/g, '').trim(), 10); // Converts the cleaned string to an integer

  const componentProps = {
    email,
    amount: amount * 100, // Ensure amount is in kobo
    metadata: { name, phone, store, location },
    publicKey,
    text: "Pay Now",
    onSuccess: () => {
      alert("Thanks for donating!");
      setIsPaymentSuccessful(true); // Set payment success state
    },
    onClose: () => {
      alert("You need to complete your payment!")
      setIsPaymentSuccessful(true); // Set payment success state
    },
  };

  if (isPaymentSuccessful) {
    return <NewComponent price={price} email={email} />;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center mb-10">
        <p className="mt-2 text-2xl font-regular tracking-tight text-gray-900 sm:text-4xl">
          Price: {price} {/* Display the formatted price */}
        </p>
        <p className="mt-3 text-md text-center leading-8 text-gray-600">
          This gives you the ability to set up your store and inventory appropriately.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg border border-gray-300 p-6 rounded-xl">
        <div className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-lg border-0 py-4 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0E90DA] sm:text-sm sm:leading-6"
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full rounded-lg border-0 py-4 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0E90DA] sm:text-sm sm:leading-6"
          />
          <input
            type="number"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="block w-full rounded-lg border-0 py-4 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0E90DA] sm:text-sm sm:leading-6"
          />
          <input
            type="text"
            placeholder="Store"
            value={store}
            onChange={(e) => setStore(e.target.value)}
            className="block w-full rounded-lg border-0 py-4 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0E90DA] sm:text-sm sm:leading-6"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="block w-full rounded-lg border-0 py-4 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0E90DA] sm:text-sm sm:leading-6"
          />

          <PaystackButton
            className={`flex w-full justify-center rounded-md px-10 py-4 text-sm font-semibold leading-6 text-white shadow-sm 
              ${isButtonActive ? "bg-[#0E90DA] hover:bg-[#0E90DA]" : "bg-[#E5E5E5]"}
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E90DA]`}
            {...componentProps}
          />
        </div>
      </div>
    </div>
  );
};

export default Donate;
