import React, { useState, useEffect } from "react";
import success from '../../assets/success2.svg';
import { PaystackButton } from 'react-paystack';
import { useAuth } from '../../context/AuthContext';

const publicKey = "pk_live_348fc3edc9f2f95fd5ff5b21fcf28b52ff590d86"; // Replace with your Paystack public key

// function NewComponent({ price, email }) {
//   const amount = price; // Convert to kobo for Paystack

//   return (
//     <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 -py-10 lg:px-8">
//       <div className="mx-auto max-w-2xl lg:text-center mb-10">
//         <p className="mt-2 text-2xl font-regular tracking-tight text-gray-900 sm:text-4xl">
//           Price: {price} <span> Single store</span>
//         </p>
//         <p className="mt-3 text-md text-center leading-8 text-gray-600">
//           This gives you the ability to set up your store and inventory
//         </p>
//         <p className="-mt-3 text-md text-center leading-8 text-gray-600">
//           appropriately
//         </p>
//       </div>

//       <div className="sm:mx-auto sm:w-full sm:max-w-lg border border-gray-300 p-6 rounded-xl flex flex-col h-[650px] justify-between">
//         <div className="mx-4">
//           <div className="mt-2">
//             <img
//               src={success}
//               alt="Store"
//               className="block w-full h-full rounded-lg object-contain"
//             />
//           </div>
//           <p className="-mt-3 text-5xl text-center leading-8 text-black">
//             Yay!
//           </p>
//           <p className="mt-3 text-md text-center leading-8 text-gray-600">
//             Congratulations, you have successfully set up your store on Raotory, <span className="text-[#0E90DA]">Your stock keeping buddy!</span>
//           </p>
//         </div>

//         <div className="mt-auto">
//           <PaystackButton
//             className="cursor-pointer text-center text-xs tracking-wide uppercase bg-gray-400 font-bold text-[#e0eafc] border-none rounded h-11 w-full mt-10"
//             {...{ email, amount, publicKey, text: "Pay Now", onSuccess: () => alert("Thanks for doing business with us! Come back soon!!"), onClose: () => alert("Wait! Don't leave :(") }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

export default function Example({ price }) {
  const [store, setStore] = useState("");
  const [location, setLocation] = useState("");
  const [number, setNumber] = useState("");
  const { user, isAuthenticated } = useAuth();
  

  useEffect(() => {
    const storedStore = localStorage.getItem("store");
    const storedLocation = localStorage.getItem("location");
    const storedNumber = localStorage.getItem("number");

    if (storedStore) setStore(storedStore);
    if (storedLocation) setLocation(storedLocation);
    if (storedNumber) setNumber(storedNumber);
  }, []);

  useEffect(() => {
    localStorage.setItem("store", store);
    localStorage.setItem("location", location);
    localStorage.setItem("number", number);
  }, [store, location, number]);

  const isButtonActive = store.length > 0 && location.length > 0 && number.length > 0;

  // const handleContinue = () => {
  //   if (isButtonActive) {
  //     const email = "user@example.com"; // Replace with actual email
  //     const amount = price; // Set the amount in Naira

  //     // Trigger the payment
  //     <NewComponent price={amount} email={email} />
  //   }
  // };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 -py-10 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-10">
          <p className="mt-2 text-2xl font-regular tracking-tight text-gray-900 sm:text-4xl">
            Price: {price}
          </p>
          <p className="mt-3 text-md text-center leading-8 text-gray-600">
            This gives you the ability to set up your store and inventory
          </p>
          <p className="-mt-3 text-md text-center leading-8 text-gray-600">
            appropriately
          </p>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-lg border border-gray-300 p-6 rounded-xl flex flex-col h-[600px] justify-between">
          <form action="#" method="POST" className="space-y-6 mt-6 flex flex-col justify-between h-full">
            <div className="mx-4">
              <div className="mt-2">
                <input
                  id="store"
                  name="store"
                  type="text"
                  required
                  placeholder="Store"
                  value={store}
                  onChange={(e) => setStore(e.target.value)}
                  className="block w-full rounded-lg border-0 py-4 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0E90DA] sm:text-sm sm:leading-6"
                />
              </div>

              <div className="mt-5">
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="block w-full rounded-lg border-0 py-4 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0E90DA] sm:text-sm sm:leading-6"
                />
              </div>

              <div className="mt-5">
                <input
                  id="Phone-number"
                  name="Phone-number"
                  type="text"
                  required
                  placeholder="Phone number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="block w-full rounded-lg border-0 py-4 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0E90DA] sm:text-sm sm:leading-6"
                />
              </div>
              <div className="flex items-center mt-10">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                  Agree to create store on Raotory
                </label>
              </div>
            </div>

            <div className="mt-auto">
            <PaystackButton
              className={`flex w-full justify-center rounded-md px-10 py-4 text-sm font-semibold leading-6 text-white shadow-sm 
                ${isButtonActive ? "bg-[#0E90DA] hover:bg-[#0E90DA]" : "bg-[#E5E5E5]"}
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E90DA]`} 
              {...{ email: user?.email, amount: price, publicKey, text: "Pay Now", onSuccess: () => alert("Thanks for doing business with us! Come back soon!!"), onClose: () => alert("Wait! Don't leave :(") }} 
            />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
