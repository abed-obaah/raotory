import React, { useState, useEffect } from "react";
import success from '../../assets/success2.svg';
import { PaystackButton } from 'react-paystack'

function NewComponent() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 -py-10 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center mb-10">
        <p className="mt-2 text-2xl font-regular tracking-tight text-gray-900 sm:text-4xl">
          Single store
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


function CheckoutView(){
  const publicKey = "pk_your_public_key_here"
  const amount = 1000000 // Remember, set in kobo!
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")


  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! Don't leave :("),
  }



 
  return (
   <div className="flex flex-row mx-auto my-5 w-[635px] h-[430px] bg-white shadow-lg">
      <div className="w-1/2 relative">
        <img
          src="path_to_your_image" // Add your image source here
          alt="Item"
          className="h-[430px] w-full object-cover"
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-800 opacity-20 z-1"></div>
        <div className="absolute bottom-0 mb-5 ml-5 text-[#84a17d] text-left z-10">
          <h2 className="text-2xl">Item Title</h2>
          <p className="font-bold">Item Amount</p>
        </div>
      </div>
      <div className="bg-[#84a17d] flex flex-col justify-center w-1/2 h-[430px]">
        <div className="p-5">
          <div className="flex flex-col mb-5">
            <label className="text-left text-[#e0eafc] text-xs mb-1 uppercase tracking-wide">Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border border-gray-300 rounded h-9 text-[#e0eafc]"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label className="text-left text-[#e0eafc] text-xs mb-1 uppercase tracking-wide">Email</label>
            <input
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border border-gray-300 rounded h-9 text-[#e0eafc]"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label className="text-left text-[#e0eafc] text-xs mb-1 uppercase tracking-wide">Phone</label>
            <input
              type="text"
              id="phone"
              onChange={(e) => setPhone(e.target.value)}
              className="bg-transparent border border-gray-300 rounded h-9 text-[#e0eafc]"
            />
          </div>
          <PaystackButton className="cursor-pointer text-center text-xs tracking-wide uppercase bg-gray-400 font-bold text-[#e0eafc] border-none rounded h-11 w-full mt-10" {...componentProps} />
        </div>
      </div>
    </div>

  );
}

export default function Example() {
  const [store, setStore] = useState("");
  const [location, setLocation] = useState("");
  const [number, setNumber] = useState("");
  const [isContinueClicked, setIsContinueClicked] = useState(false);
  const amount = 10000;

  // Load the state from localStorage on component mount
  useEffect(() => {
    const storedStore = localStorage.getItem("store");
    const storedLocation = localStorage.getItem("location");
    const storedNumber = localStorage.getItem("number");
    const storedIsContinueClicked = localStorage.getItem("isContinueClicked");

    if (storedStore) setStore(storedStore);
    if (storedLocation) setLocation(storedLocation);
    if (storedNumber) setNumber(storedNumber);
    if (storedIsContinueClicked === "true") setIsContinueClicked(true);
  }, []);

  // Save the state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("store", store);
    localStorage.setItem("location", location);
    localStorage.setItem("number", number);
    localStorage.setItem("isContinueClicked", isContinueClicked);
  }, [store, location, number, isContinueClicked]);

  const isButtonActive = store.length > 0 && location.length > 0 && number.length > 0;

  const handleContinue = () => {
    if (isButtonActive) {
      // Set the state to display the NewComponent
      setIsContinueClicked(true);
    }
  };

  // // Render the initial checkout view
  // const checkoutView = (
  //   <div className="App">
  //     <div className="container">
  //       <div className="item">
  //         <div className="overlay-effect"></div>
  //         <img
  //           className="item-image"
  //           src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
  //           alt="product"
  //         />
  //         <div className="item-details">
  //           <p className="item-details__title">Coconut Oil</p>
  //           <p className="item-details__amount">NGN{amount / 100}</p>
  //         </div>
  //       </div>
  //       <div className="checkout">
  //         <div className="checkout-form">
  //           <div className="checkout-field">
  //             <label>Name</label>
  //             <input />
  //           </div>
  //           <div className="checkout-field">
  //             <label>Email</label>
  //             <input />
  //           </div>
  //           <div className="checkout-field">
  //             <label>Phone</label>
  //             <input />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  // Render either the checkout view or the NewComponent based on state
  return (
    <>
      {isContinueClicked ? <CheckoutView amount={amount} /> : <CheckoutView/>}
      {/* {isContinueClicked ? <NewComponent /> : <CheckoutView/>} */}

      {!isContinueClicked && (
        <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 -py-10 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-10">
            <p className="mt-2 text-2xl font-regular tracking-tight text-gray-900 sm:text-4xl">
              Single store
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
                    Agree to create store on raotory
                  </label>
                </div>
              </div>

              <div className="mt-auto">
                <button
                  type="button"
                  disabled={!isButtonActive}
                  className={`flex w-full justify-center rounded-md px-10 py-4 text-sm font-semibold leading-6 text-white ${isButtonActive ? "bg-[#0E90DA] hover:bg-[#0E90DA]" : "bg-gray-300 cursor-not-allowed"}`}
                  onClick={handleContinue}
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
