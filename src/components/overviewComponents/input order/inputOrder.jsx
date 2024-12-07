import { useState, useEffect } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions,Label } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext'; 
import { TrashIcon,XMarkIcon, UserPlusIcon,ArrowLeftIcon} from "@heroicons/react/24/outline";
import { ToastContainer, toast } from 'react-toastify';  // Import toast components
import 'react-toastify/dist/ReactToastify.css';  // Import toast styles
// import { useState } from 'react'
import Customer from '../Create Customer/form';
import ProductSearchComponent from './ProductSearchComponent';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import VectorBG from '../../../../src/assets/Vector18.svg';
import HeadImage from '../../../../src/assets/imager.svg';
import { useNavigate } from 'react-router-dom';









const people = [
  { id: 1, name: 'Price Type', value: '' },
  { id: 2, name: 'Retail Price', value: 'retail_price' },
  { id: 3, name: 'Wholesale Price', value: 'wholesale_price' },
];




export default function Example() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null); // Set selected customer
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [customers, setCustomers] = useState([]); // Fetched customers
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // To store the selected product
  const [totalPrice, setTotalPrice] = useState('');
  const [quantity, setQuantity] = useState(1); // Quantity input
  const [addedProducts, setAddedProducts] = useState([]); // List of added products
  const [grandTotal, setGrandTotal] = useState(0); // Overall total price
  const [selectedPaymentType, setSelectedPaymentType] = useState(''); // State for payment type
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermP, setSearchTermP] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(""); // Set selected customer
  const [filteredCustomers, setFilteredCustomers] = useState([]); // Filtered customers
  
  const [selecteds, setSelecteds] = useState(people[2]);
  
  const [isWholesale, setIsWholesale] = useState(false); // Toggle between wholesale and retail
  const [showCustomer, setShowCustomer] = useState(false); // Toggle visibility of customer dropdown
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown visibility
  const [isPaymentMade, setIsPaymentMade] = useState(false); // Track whether payment has been made
  const [isInvoiceIssued, setIsInvoiceIssued] = useState(false);
  // const [products, setProducts] = useState([]); // State to hold the fetched products
  // const [selectedProduct, setSelectedProduct] = useState(''); // State for selected product
  const [showDropdownP, setShowDropdownP] = useState(false);
  const [selectedPriceType, setSelectedPriceType] = useState('retail_price'); // Default price type

  // Function to handle price type change
  const handlePriceTypeChange = (newPriceType) => {
    setSelectedPriceType(newPriceType); // Update the selected price type
  };

  const handlePayments = () => {
    setIsPaymentMade(true); // Toggle the component
  };

  // const handleIssueInvoice = () => {
  //   setIsInvoiceIssued(true);
  // };
  

  // const handleIconClick = () => {
  //   setShowCustomer(true);
  // };

  const [showModal, setShowModal] = useState(false);

  const handleIconClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };




  const userEmail = user?.email;

  // Fetch customers from the API
  // const fetchCustomers = async () => {
  //   try {
  //     const response = await axios.get('https://raotory.com/apis/fetch_users.php', {
  //       params: { email: userEmail },
  //     })
  //     console.log("response:", response);
  //     setCustomers(response.data.users) // Assuming response contains an array of users
  //     setFilteredUniversities(response.data.users);
  //   } catch (err) {
  //     console.error(err)
  //     setError('Error fetching customers')
  //   }
  // }

  // useEffect(() => {
  //   fetchCustomers();
  // }, []);




  const fetchCustomers = async () => {
    try {
      const response = await axios.get('https://raotory.com/apis/fetch_users.php', {
        params: { email: userEmail }, // Assume userEmail is defined
      });
      console.log('response:', response);
      setCustomers(response.data.users); // Assuming response contains an array of customers
      setFilteredCustomers(response.data.users); // Initially set all customers as options
    } catch (err) {
      console.error(err);
      setError('Error fetching customers');
    }
  };
  
  // Fetch customers when the component mounts
  useEffect(() => {
    fetchCustomers();
  }, []); // Empty dependency array means this runs once when the component mounts
  
  // Filter customers based on the search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = customers.filter((customer) =>
        customer.name && customer.name.toLowerCase().includes(searchTerm.toLowerCase()) // Ensure customer.name is defined
      );
      setFilteredCustomers(filtered); // Update the filtered list of customers
    } else {
      setFilteredCustomers(customers); // Show all customers if no search term
    }
  }, [searchTerm, customers]); // Runs every time `searchTerm` or `customers` changes
  
  // Handle search term input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term as user types
  };
  



  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://raotory.com/apis/inventory.php?email=${userEmail}`);
        const data = await response.json();
        console.log("itesm",data)
        if (!data.error) {
          setProducts(data.drugs); // Store the fetched products in the state
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    if (userEmail) {
      fetchProducts();
    }
  }, [userEmail]);

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTermP.toLowerCase())
  );

  // const handleProductSelection = (e) => {
  //   const selectedProductName = e.target.value;
  //   const product = products.find((p) => p.product_name === selectedProductName);

  //   if (product) {
  //     setSelectedProduct(product);
  //     setTotalPrice(product.retail_price); // Set the price of the selected product
  //   } else {
  //     setSelectedProduct(null);
  //     setTotalPrice(''); // Clear the price if no product is selected
  //   }
  // };
  // const handleProductSelection = (e) => {
  //   const selectedProductName = e.target.value;
    
  //   // Find the product in the products array
  //   const product = products.find((p) => p.product_name === selectedProductName);
  
  //   if (product) {
  //     // Ensure the product has a valid stock value
  //     if (product.stock <= 0) {
  //       toast.error(`Sorry, ${product.product_name} is out of stock.`);
  //       setSelectedProduct(null);
  //       setTotalPrice('');
  //       return; // Exit early if the product is out of stock
  //     }
  
  //     // Set the selected product and decide on the price (retail or wholesale)
  //     setSelectedProduct(product);
      
  //     // Assuming the condition is based on some flag (e.g., `isWholesale`)
  //     const price = product.isWholesale ? product.wholesale_price : product.retail_price;
  //     setTotalPrice(price); // Set the correct price based on condition
  //   } else {
  //     // Clear the selected product and reset the price if no product is selected
  //     setSelectedProduct(null);
  //     setTotalPrice('');
  //     toast.error('Product not found, please select a valid product.');
  //   }
  // };


  const handleProductSelection = (selectedOption) => {
    if (!selectedOption) {
      // If nothing is selected, reset everything
      setSelectedProduct(null);
      setTotalPrice('');
      return;
    }
  
    // Extract product name (assuming you're passing product_name as the value)
    const selectedProductName = selectedOption.label;  // Since you used label for the display name
  
    // Find the product in the products array
    const product = products.find((p) => p.product_name === selectedProductName);
  
    if (product) {
      // Ensure the product has a valid stock value
      if (product.stock <= 0) {
        toast.error(`Sorry, ${product.product_name} is out of stock.`);
        setSelectedProduct(null);
        setTotalPrice('');
        return; // Exit early if the product is out of stock
      }
  
      // Set the selected product and decide on the price (retail or wholesale)
      setSelectedProduct(product);
      
      // Assuming the condition is based on some flag (e.g., `isWholesale`)
      const price = product.isWholesale ? product.wholesale_price : product.retail_price;
      setTotalPrice(price); // Set the correct price based on condition
    } else {
      // Clear the selected product and reset the price if no product is selected
      setSelectedProduct(null);
      setTotalPrice('');
      toast.error('Product not found, please select a valid product.');
    }
  };
  
  

  // Function to add the selected product to the table
  // const handleAddProduct = () => {
  //   if (selectedProduct && quantity > 0) {
  //     const productWithQuantity = {
  //       ...selectedProduct,
  //       quantity: quantity,
  //       total: selectedProduct.retail_price * quantity, // Calculate the total for this product
  //     };

  //     // Add the selected product to the list of added products
  //     setAddedProducts((prevProducts) => [...prevProducts, productWithQuantity]);

  //     // Update the grand total
  //     setGrandTotal((prevTotal) => prevTotal + productWithQuantity.total);

  //     // Clear the selected product and reset quantity
  //     setSelectedProduct(null);
  //     setTotalPrice('');
  //     setQuantity(1);
  //   }
  // };


  const handleAddProduct = () => {
    if (selectedProduct && quantity > 0) {
      // Use the selected price type (retail or wholesale)
      const priceToUse = selectedPriceType === 'retail_price' ? selectedProduct.retail_price : selectedProduct.wholesale_price;
  
      const productWithQuantity = {
        ...selectedProduct,
        quantity: quantity,
        total: priceToUse * quantity, // Calculate total using selected price type
      };
  
      // Add the product to the added products list
      setAddedProducts((prevProducts) => [...prevProducts, productWithQuantity]);
  
      // Update the grand total
      setGrandTotal((prevTotal) => prevTotal + productWithQuantity.total);
  
      // Reset selections
      setSelectedProduct(null);
      setTotalPrice('');
      setQuantity(1);
    }
  };
  

  const handleSellingPriceChange = (index, newPrice) => {
    // Create a copy of the added products
    const updatedProducts = [...addedProducts];
    
    // Update the price of the selected product
    updatedProducts[index].retail_price = newPrice;
  
    // Determine the correct price to use (retail_price or wholesale_price)
    const priceToUse = selecteds.value === 'retail_price' ? updatedProducts[index].retail_price : updatedProducts[index].wholesale_price;
    
    // Recalculate the total for the updated product
    updatedProducts[index].total = priceToUse * updatedProducts[index].quantity;
  
    // Update the added products state
    setAddedProducts(updatedProducts);
  
    // Recalculate the grand total
    const newGrandTotal = updatedProducts.reduce((sum, product) => sum + product.total, 0);
    setGrandTotal(newGrandTotal);
  };
  

  // const handleSellingPriceChange = (index, newPrice) => {
  //   // Create a copy of the current products
  //   const updatedProducts = [...addedProducts];
    
  //   // Update the price of the specific product at the given index
  //   updatedProducts[index].retail_price = newPrice;
  
  //   // Recalculate the total for the updated product
  //   updatedProducts[index].total = updatedProducts[index].retail_price * updatedProducts[index].quantity;
  
  //   // Update the state with the new array
  //   setAddedProducts(updatedProducts);
  
  //   // Recalculate the grand total
  //   const newGrandTotal = updatedProducts.reduce((sum, product) => sum + product.total, 0);
  //   setGrandTotal(newGrandTotal);
  // };
  




// const handlePayment = async () => {
//   if (!selectedCustomer || addedProducts.length === 0) {
//       toast.error("Please select a customer and add products before making a payment.");
//       return;
//     }

//   const payload = {
//     customer_name: selectedCustomer,
//     store_email: userEmail,
//     user_email: userEmail,
//     total_price: grandTotal,
//     payment_type: selectedPaymentType,
//     products: addedProducts.map(product => ({
//       Productname: product.product_name,
//       Quantity: product.quantity,
//       SellPrice: selecteds.value === 'retail_price' ? product.retail_price : product.wholesale_price
//     }))
//   };



//   console.log("Payload to send:", payload);  // Log the payload

//   try {
//       const response = await axios.post('https://raotory.com/apis/create_sale.php', payload);
//       console.log("Payment response:", response.data);

//       // Show a success toast when payment is successful
//       toast.success("Payment successful!");
//   } catch (error) {
//       console.error("Error making payment:", error.response ? error.response.data : error.message);

//       // Show an error toast when payment fails
//       toast.error("Payment failed. Please try again.");
//   }
// };



const handlePayment = async () => {
  if (!selectedCustomer || addedProducts.length === 0) {
    toast.error("Please select a customer and add products before making a payment.");
    return;
  }

  const payload = {
    customer_name: selectedCustomer,
    store_email: userEmail,
    user_email: userEmail,
    total_price: grandTotal,
    payment_type: selectedPaymentType,
    products: addedProducts.map(product => ({
      Productname: product.product_name,
      Quantity: product.quantity,
      PurchasePrice:product.purchase_price,
      SellPrice: selecteds.value === 'retail_price' ? product.retail_price : product.wholesale_price
    }))
  };

  console.log("Payload to send:", payload);  // Log the payload for debugging

  try {
    const response = await axios.post('https://raotory.com/apis/create_sale.php', payload);
    console.log("Payment response:", response.data);

    // Show a success toast when payment is successful
    toast.success("Payment successful!");

    // Set payment made to true
    setIsPaymentMade(true); // Update the state after successful payment

  } catch (error) {
    console.error("Error making payment:", error.response ? error.response.data : error.message);

    // Show an error toast when payment fails
    toast.error("Payment failed. Please try again.");
  }
};



const handleIssueInvoice = async () => {
  try {
    const response = await fetch("https://raotory.com/apis/issueInvoice.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_name: selectedCustomer,
        user_email: userEmail, // Replace with the actual user email
        paid_amount: grandTotal,
        sales_status: selectedPaymentType,
        products: addedProducts, // Products should have product_name, quantity, retail_price, etc.
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log("Invoice issued successfully:", result.message);
      setIsInvoiceIssued(true);
    } else {
      console.error("Error issuing invoice:", result.error);
    }
  } catch (error) {
    console.error("Failed to issue invoice:", error);
  }
};





   // Filter customers based on the search query
  //  const filteredCustomers = customers.filter((customer) =>
  //   customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

// Assuming you have addedProducts and setAddedProducts state
// const handleRemoveProduct = (index) => {
//   // Create a new array without the removed product
//   const updatedProducts = addedProducts.filter((_, i) => i !== index);
//   setAddedProducts(updatedProducts);

//   // Optionally recalculate the grand total after the removal
//   const newTotal = updatedProducts.reduce((sum, product) => sum + (product.retail_price * product.quantity), 0);
//   setGrandTotal(newTotal);
// };

const handleRemoveProduct = (index) => {
  // Remove the product at the given index
  const updatedProducts = addedProducts.filter((_, i) => i !== index);
  setAddedProducts(updatedProducts);

  // Recalculate the grand total after the removal
  const newTotal = updatedProducts.reduce((sum, product) => sum + product.total, 0);
  setGrandTotal(newTotal);
};


// const handleQuantityChange = (index, newQuantity) => {
//   // Ensure the new quantity is a positive number
//   const updatedQuantity = newQuantity > 0 ? newQuantity : 1;

//   // Create a copy of the current products
//   const updatedProducts = [...addedProducts];

//   // Update the quantity of the specific product at the given index
//   updatedProducts[index].quantity = updatedQuantity;

//   // Recalculate the total for the updated product
//   updatedProducts[index].total = updatedProducts[index].retail_price * updatedQuantity;

//   // Update the state with the new array
//   setAddedProducts(updatedProducts);

//   // Recalculate the grand total
//   const newGrandTotal = updatedProducts.reduce((sum, product) => sum + product.total, 0);
//   setGrandTotal(newGrandTotal);
// };


const handleQuantityChange = (index, newQuantity) => {
  // Ensure the new quantity is a positive number
  const updatedQuantity = newQuantity > 0 ? newQuantity : 1;

  // Create a copy of the current products
  const updatedProducts = [...addedProducts];

  // Decide on the price (retail or wholesale) based on the product's condition
  const price = updatedProducts[index].isWholesale ? updatedProducts[index].wholesale_price : updatedProducts[index].retail_price;

  // Update the quantity of the specific product at the given index
  updatedProducts[index].quantity = updatedQuantity;

  // Recalculate the total for the updated product
  updatedProducts[index].total = price * updatedQuantity;

  // Update the state with the new array
  setAddedProducts(updatedProducts);

  // Recalculate the grand total
  const newGrandTotal = updatedProducts.reduce((sum, product) => sum + product.total, 0);
  setGrandTotal(newGrandTotal);
};



  const handleSelectChange = (e) => {
    const selectedId = parseInt(e.target.value); // get the selected id
    const selectedOption = people.find(person => person.id === selectedId);
    setSelecteds(selectedOption);
  };



  const handleBack = () => {
    setIsInvoiceIssued(false);  // Reset to show "Make Payment"
    setIsPaymentMade(false);      // Keep the payment made status
  };




  return (
//     <div>

//       <ToastContainer />
//       {/* Use a standard <label> element instead of <Label /> */}
//       <label className="block font-medium text-gray-900">Search Customers</label>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//   {/* Modal Trigger */}
 

//   {/* Listbox */}
//   <div style={{ flex: 1 }}>
//   <div className="relative w-80"> {/* Increased width here */}
//   {/* Input field to display selected customer */}
//   <input
//     type="text"
//     value={selectedCustomer}  // Changed 'selectedUniversity' to 'selectedCustomer'
//     className="w-full p-2 border border-gray-300 rounded-lg font-regular text-lg pr-16"
//     placeholder="Select Customer"
//     readOnly
//     onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown visibility on click
//   />

//   {/* Dropdown container that shows only when showDropdown is true */}
//   {showDropdown && (
//     <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
//       {/* Search input inside dropdown */}
//       <input
//         type="text"
//         className="w-full p-2 border-b border-gray-300 rounded-t-lg"
//         placeholder="Search for a customer"
//         value={searchTerm}
//         onChange={handleSearchChange}
//       />

//       {/* Dropdown list */}
//       <div className="max-h-40 overflow-y-auto">
//         {filteredCustomers.map((customer, index) => ( // Changed 'filteredUniversities' to 'filteredCustomers'
//           <button
//             key={index}
//             className="w-full text-left p-2 hover:bg-gray-100"
//             onClick={() => {
//               setSelectedCustomer(customer.name); // Set the selected customer
//               setSearchTerm('');  // Clear search term after selecting
//               setShowDropdown(false);  // Close dropdown after selection
//             }}
//           >
//             {customer.name} {/* Changed 'university.name' to 'customer.name' */}
//           </button>
//         ))}
//       </div>
//     </div>
//   )}

//   {/* Change link */}
//   <a href="#" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-blue-600">
//     Change
//   </a>

//   {/* Error message */}
//   {error && <div className="text-red-500 mt-2">{error}</div>}
// </div>

//   </div>

//   <div>
//     {!showModal ? (
//      <UserPlusIcon
//      height="40px"
//      color="#0E90DA"
//      style={{
//        cursor: 'pointer',
//        border: '2px solid #0E90DA', // Border with the same color as the icon
//        borderRadius: '50%',          // Makes it fully rounded
//        padding: '8px'                // Adds space inside the border
//      }}
//      onClick={handleIconClick}
//    />
//     ) : null}

//     {/* Modal */}
//     {showModal && (
//      <div style={modalStyles.overlay}>
//      <div style={modalStyles.content}>
//        {/* Close Icon (XMarkIcon) at the top right corner */}
//        <XMarkIcon
//          onClick={handleCloseModal}
//          style={{
//            position: 'absolute',
//            top: '10px',
//            left: '24px',
//            cursor: 'pointer',
//            width: '24px',  // Set the size of the icon
//            height: '24px',
//            color: '#0E90DA', // Optional: match the icon color
//          }}
//        />
       
//        {/* Modal content */}
//        <Customer />
   
      
//      </div>
//    </div>
//     )}
//   </div>
// </div>



//       {error && <div className="text-red-500">{error}</div>} {/* Display error if there's any */}

//       <div className="mt-10 flex space-x-4">
//         <div>
//           <datalist id="suggestions">
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <option key={product.id} value={product.product_name}>
//                   {product.product_name}
//                 </option>
//               ))
//             ) : (
//               <option>No products available</option>
//             )}
//           </datalist>

//           <input
//             autoComplete="on"
//             list="suggestions"
//             placeholder="Search products..."
//             onChange={handleProductSelection}
//              className="h-5 border p-7 w-[224px] rounded-lg"
//           />
//         </div>

//         <input
//           type="number"
//           value={quantity}
//           onChange={(e) => setQuantity(Number(e.target.value))}
//           placeholder="Quantity"
//           className="h-5 border p-7 w-2/4 rounded-lg"
//         />

//         <input
//           type="text"
//           value={totalPrice}
//           placeholder="Amount"
//           className="h-5 border p-7 w-2/4 rounded-lg"
//           readOnly
//         />

//         <button
//           onClick={handleAddProduct}
//           className="mb-2 bg-[#0E90DA] text-white py-0.5 px-3 rounded"
//         >
//           Add Product
//         </button>
//       </div>

//       <div className="flex justify-end">
//   {/* <Listbox value={selecteds} onChange={setSelecteds} as="div" className="w-[10%]">
    
//     <div className="relative mt-2">
//       <ListboxButton className="py-3 relative w-full cursor-default rounded-md bg-white pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm/6">
//         <span className="block truncate">{selecteds.name}</span>
//         <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//           <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
//         </span>
//       </ListboxButton>

//       <ListboxOptions
//         transition
//         className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
//       >
//         {people.map((person) => (
//           <ListboxOption
//             key={person.id}
//             value={person}
//             className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
//           >
//             <span className="block truncate font-normal group-data-[selected]:font-semibold">
//               {person.name}
//             </span>

//             <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
//               <CheckIcon aria-hidden="true" className="h-5 w-5" />
//             </span>
//           </ListboxOption>
//         ))}
//       </ListboxOptions>
//     </div>
//   </Listbox> */}

//   <select onChange={handleSelectChange} value={selecteds.id} className='className="py-3 h-[3.25rem] mt-10 relative w-[10%] cursor-default rounded-md bg-white pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm/6"'>
//         {people.map((person) => (
//           <option key={person.id} value={person.id} className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white">
//             {person.name}
//           </option>
//         ))}
//       </select>
// </div>



//       {/* Display added products */}
//       <div className="mt-9">
//       <table className="w-full">
//                 <thead className="bg-customColor text-white h-12">
//                     <tr>
//                         <th className="border bg-customColor w-1/9 font-normal">N/O</th>
//                         <th className="border bg-customColor w-1/5 font-normal">Product Name</th>
//                         <th className="border bg-customColor w-1/5 font-normal">Cost Price</th>
//                         <th className="border bg-customColor w-1/5 font-normal">Selling Price</th>
//                         <th className="border bg-customColor w-auto font-normal">Quantity</th>
//                         <th className="border bg-customColor w-1/5 font-normal">Total</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {addedProducts.map((product, index) => (
//                         <tr key={index} className="border text-gray-400">
//                             <td className="border p-3">{index + 1}</td>
//                             <td className="border p-3">{product.product_name}</td>
//                                           <td className="border p-3">
//                       NGN
//                       {selecteds.value === 'retail_price'
//                         ? product.retail_price
//                         : product.wholesale_price}
//                     </td>
//                             <td className="border p-3" style={{ color: "black", opacity: '.8' }}>
//                             <input
//                                 type="number"
//                                 value={
//                                   selecteds.value === 'retail_price'
//                                     ? product.retail_price
//                                     : product.wholesale_price
//                                 }
//                                 onChange={(e) => handleSellingPriceChange(index, parseInt(e.target.value) || 0)}
//                                 style={{ color: "black" }}
//                                 className="w-full bg-gray-400 p-1 align-items"
//                               />
//                             </td>
//                             <td className="border p-3 w-auto">
//                                 {/* <input
//                                     type="number"
//                                     value={product.quantity}
//                                     onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 0)}
//                                     style={{ color: "white" }}
//                                     className="w-full bg-gray-400 p-1 align-items"
//                                 /> */}

//                                   <input
//                                     type="number"
//                                     value={product.quantity}
//                                     onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)} // Default to 1 if input is invalid
//                                     style={{ color: "white" }}
//                                     className="w-full bg-gray-400 p-1 align-items"
//                                   />
//                             </td>
//                             <td className="border p-3 flex justify-between">
//                                 NGN{product.retail_price * product.quantity} {/* Update total based on the new price */}
//                                 <div
//                                     className="bg-red-300 p-2 rounded-full cursor-pointer"
//                                     onClick={() => handleRemoveProduct(index)}  // Call the remove function
//                                 >
//                                     <TrashIcon height="20px" color="red" />
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//                     <tr>
//                         <td colSpan="5" className="border p-3 font-bold">Total</td>
//                         <td className="border p-3 bg-gray-200">NGN{grandTotal}</td>
//                     </tr>
//                 </tbody>
//             </table>
//     </div>



//       {/* Payment section */}
//       <div className="mt-4">
//         <label htmlFor="paymentType p-2">Payment Type</label>
//         <select
//           id="paymentType"
//           value={selectedPaymentType}
//           onChange={(e) => setSelectedPaymentType(e.target.value)}
//           className="mt-2 mb-2 border border-gray-300 rounded-md h-[2.5rem] px-2 ml-5"
//         >
//           <option value="">Select Payment Type</option>
//           <option value="cash">Cash</option>
//           <option value="card">Card</option>
//           <option value="online">Online</option>
//         </select>

        
//       </div>
//       <div className="mt-10">
//   {/* <button
//     onClick={handlePayment}  // Call handlePayment function here
//     className="bg-[#0E90DA] flex w-full justify-center rounded-md px-10 py-4 text-sm font-semibold leading-6 text-white"
//   >
//     Make Payment
//   </button> */}
//   <button
//     onClick={handlePayment}  // Call handlePayment function here
//     className="bg-[#0E90DA] flex w-full justify-center rounded-md px-10 py-4 text-sm font-semibold leading-6 text-white"
//   >
//     Make Payment
//   </button>
// </div>
//     </div>

<div>

{!isPaymentMade ? (
  <ProductSearchComponent
    selectedCustomer={selectedCustomer}
    showDropdown={showDropdown}
    showDropdownP={showDropdownP}
    setShowDropdown={setShowDropdown}
    setShowDropdownP={setShowDropdownP}
    handleSearchChange={handleSearchChange}
    filteredCustomers={filteredCustomers}
    setSelectedCustomer={setSelectedCustomer}
    searchTerm={searchTerm}
    searchTermP={searchTermP}
    error={null} // Pass error state if needed
    handleProductSelection={handleProductSelection}
    products={products}
    quantity={quantity}
    setQuantity={setQuantity}
    totalPrice={totalPrice}
    handleAddProduct={handleAddProduct}
    addedProducts={addedProducts}
    handleQuantityChange={handleQuantityChange}
    handleSellingPriceChange={handleSellingPriceChange}
    handleRemoveProduct={handleRemoveProduct}
    grandTotal={grandTotal}
    selectedPaymentType={selectedPaymentType}
    setSelectedPaymentType={setSelectedPaymentType}
    handlePayment={handlePayment}
    people={[]} // Example prop for select input if needed
    handleSelectChange={handleSelectChange}
    selectedPriceType={selectedPriceType} // The current price type
    handlePriceTypeChange={handlePriceTypeChange}
  />
) : isInvoiceIssued ? (
 
  <div>


          <div className="bg-[#0E90DA] relative justify-between align-center overflow-hidden w-full h-full rounded-lg p-7 text-white bg-right bg-no-repeat" style={{ backgroundImage: `url(${VectorBG})` }}>
                            <h1 className="text-2xl">{selectedCustomer}</h1>
                            <div className="flex justify-between items-start gap-3 text-gray-500">
                                      {/* Invoice Details */}
                                      <div className="text-white">
                                        <h2>INVOICE NUMBER: #234650</h2>
                                        <h2>Abraka, Delta State</h2>
                                      </div>

                                      {/* Grand Total Section */}
                                      <div className="text-white text-right">
                                        <h1 className="font-semibold text-md">Grand Total</h1>
                                        <h1 className="text-5xl">NGN{grandTotal}</h1>
                                      </div>
                                    </div>
          </div>
          {isInvoiceIssued && (
                <div
                onClick={handleBack}  // Go back to the "Make Payment" state
                className="flex items-center justify-center w-[40px] h-[40px] bg-[#0E90DA] rounded-full text-white border-2 cursor-pointer"
              >
                <ArrowLeftIcon height={20} color="white" />
              </div>
              
              )}
          


              <table className="mt-9">
                <thead className="bg-[#E5E5E5] text-[#757575] h-12">
                  <tr>
                    <th className="border bg-[#E5E5E5] w-1/9 font-normal">N/O</th>
                    <th className="border bg-[#E5E5E5] w-1/5 font-normal">Product Name</th>
                    <th className="border bg-[#E5E5E5] w-1/5 font-normal">Cost Price</th>
                    <th className="border bg-[#E5E5E5] w-1/5 font-normal">Selling Price</th>
                    <th className="border bg-[#E5E5E5] w-auto font-normal">Quantity</th>
                    <th className="border bg-[#E5E5E5] w-1/5 font-normal">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map over the addedProducts array to display products in the table */}
                  {addedProducts.map((product, index) => (
                    <tr key={index} className="border text-gray-400">
                      <td className="border p-3">{index + 1}</td>
                      <td className="border p-3 w-1/5">{product.product_name}</td>
                      <td className="border p-3">NGN{product.purchase_price}d</td>
                      <td className="border p-3" style={{ color: "black", opacity: '.8' }}>NGN{product.retail_price}</td>
                      <td className="border p-3 w-1/5">
                        <input
                          type="number"
                          value={product.quantity}
                          onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 0)}
                          style={{ color: "white" }}
                          className="w-full bg-gray-400 p-1 align-items"
                          readOnly
                        />
                      </td>
                      <td className="border p-3 flex justify-between">
                        NGN{product.retail_price * product.quantity}
                        <div className="bg-red-300 p-2 rounded-full">
                          <TrashIcon height='20px' color="red" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
  </div>

) : (
  /* If payment is made but invoice isn't, show this simplified payment success */
  <div>
  <div className="mt-2">
    <input
      id="customer"
      name="customer"
      type="text"
      value={selectedCustomer}
      placeholder="you@example.com"
      className="block w-[40%] rounded-md border-0 py-5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
    />
  <Menu as="div" className="relative inline-block text-left mt-10">
  <div>
  <MenuButton className="flex items-center justify-between w-[1348px] rounded-md bg-white px-6 py-5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
  <span>Options</span>
  <ChevronDownIcon aria-hidden="true" className="ml-4 text-gray-400 size-5" />
</MenuButton>

  </div>

  <MenuItems
    transition
    className="absolute right-0 z-10 mt-2 w-[1348px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
  >
    <div className="py-1">
      {/* Replace with product list */}
      {addedProducts.length > 0 ? (
        addedProducts.map((product, index) => (
          <MenuItem key={index}>
            <div className="block px-4 py-2 text-sm text-gray-700">
              {product.product_name}
              - Quantity: {product.quantity} - Price: {product.retail_price}
            </div>
          </MenuItem>
        ))
      ) : (
        <MenuItem>
          <div className="block px-4 py-2 text-sm text-gray-700">No products added</div>
        </MenuItem>
      )}
    </div>
  </MenuItems>
</Menu>

            <div className="mt-4 flex justify-between items-center">
                              <div className="w-[55%]">
                                
                                <select
                                  id="paymentType"
                                  value={selectedPaymentType}
                                  onChange={(e) => setSelectedPaymentType(e.target.value)}
                                  className="mt-2 mb-2 border border-gray-300 rounded-md h-[3.6em] px-2 pr-2 w-[60%]"
                                >
                                  <option value="">Payment Type</option>
                                  <option value="cash">Cash</option>
                                  <option value="card">Card</option>
                                  <option value="online">Online</option>
                                </select>
                              </div>

                          <div className="w-[40%]">
                            <input
                              id="customer"
                              name="customer"
                              type="text"
                              value={grandTotal}
                              placeholder="Amount"
                              className="block w-full rounded-md border-0 py-5 px-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                            />
                          </div>
            </div>
</div>

</div>
)}

<button
  onClick={
    !isPaymentMade
      ? handlePayment // If payment not made, call handlePayments
      : isInvoiceIssued
      ? () => {} // Do nothing if invoice is already issued
      : handleIssueInvoice // If payment made but invoice not issued, issue invoice
  }
  className={`bg-[#0E90DA] flex ${
    isInvoiceIssued ? 'w-[15%] justify-start' : 'w-full justify-center'
  } rounded-md px-10 py-4 text-lg font-semibold leading-6 text-white mt-10`}
>
  {/* Button text changes based on the states */}
  {!isPaymentMade
    ? 'Make Payment'
    : isInvoiceIssued
    ? 'Print Invoice'
    : 'Issue Invoice'}
</button>



</div>
  );
}

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '119vw',  // Full width of the window
    height: '100vh',  // Full height of the window
    backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Semi-transparent background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    position: 'relative',
    width: '714px',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  closeButton: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#0E90DA',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};
