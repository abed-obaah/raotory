import { useState, useEffect } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext'; 
import { TrashIcon } from "@heroicons/react/24/outline";

export default function Example() {
  const [selected, setSelected] = useState(null); // Set selected user
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

  const userEmail = user?.email;

  // Fetch customers from the API
  const fetchCustomers = async () => {
    try {
      const response = await axios.get('https://raotory.com.ng/apis/fetch_users.php', {
        params: { email: userEmail },
      })
      console.log("response:", response);
      setCustomers(response.data.users) // Assuming response contains an array of users
    } catch (err) {
      console.error(err)
      setError('Error fetching customers')
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://raotory.com.ng/apis/inventory.php?email=${userEmail}`);
        const data = await response.json();
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

  const handleProductSelection = (e) => {
    const selectedProductName = e.target.value;
    const product = products.find((p) => p.product_name === selectedProductName);

    if (product) {
      setSelectedProduct(product);
      setTotalPrice(product.retail_price); // Set the price of the selected product
    } else {
      setSelectedProduct(null);
      setTotalPrice(''); // Clear the price if no product is selected
    }
  };

  // Function to add the selected product to the table
  const handleAddProduct = () => {
    if (selectedProduct && quantity > 0) {
      const productWithQuantity = {
        ...selectedProduct,
        quantity: quantity,
        total: selectedProduct.retail_price * quantity, // Calculate the total for this product
      };

      // Add the selected product to the list of added products
      setAddedProducts((prevProducts) => [...prevProducts, productWithQuantity]);

      // Update the grand total
      setGrandTotal((prevTotal) => prevTotal + productWithQuantity.total);

      // Clear the selected product and reset quantity
      setSelectedProduct(null);
      setTotalPrice('');
      setQuantity(1);
    }
  };

  // Function to handle payment
 const handlePayment = async () => {
    if (!selected || addedProducts.length === 0) {
        alert("Please select a customer and add products before making a payment.");
        return;
      }
      
    const payload = {
        customer_name: selected.name,
        store_email: userEmail,
        user_email: userEmail,
        total_price: grandTotal,
        payment_type: selectedPaymentType,
        products: addedProducts.map(product => ({
            Productname: product.product_name,
            Quantity: product.quantity,
            SellPrice: product.retail_price
        }))
    };

    console.log("Payload to send:", payload);  // Log the payload

    try {
        const response = await axios.post('https://raotory.com.ng/apis/create_sale.php', payload);
        console.log("Payment response:", response.data);
    } catch (error) {
        console.error("Error making payment:", error.response ? error.response.data : error.message);
    }
};

   // Filter customers based on the search query
   const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Use a standard <label> element instead of <Label /> */}
      <label className="block font-medium text-gray-900">Search Customer</label>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        className="mt-2 mb-2 w-full h-[3.25rem] rounded-md border border-gray-300 py-1.5 px-3  focus:ring-indigo-600 focus:border-indigo-600"
      />

      {error && <div className="text-red-500">{error}</div>} {/* Display error if there's any */}

      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1 ">
          <ListboxButton className="relative w-full h-[3.25rem] cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 ">
            <span className="block truncate">{selected ? selected.name : 'Select a customer'}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
            </span>
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <ListboxOption
                  key={customer.id}
                  value={customer}
                  className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                >
                  <span className="block truncate font-normal group-data-[selected]:font-semibold">
                    {customer.name}
                  </span>

                  <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                    <CheckIcon aria-hidden="true" className="h-5 w-5" />
                  </span>
                </ListboxOption>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No results found</div>
            )}
          </ListboxOptions>
        </div>
      </Listbox>

      {error && <div className="text-red-500">{error}</div>} {/* Display error if there's any */}

      <div className="mt-10 flex space-x-4">
        <div>
          <datalist id="suggestions">
            {products.length > 0 ? (
              products.map((product) => (
                <option key={product.id} value={product.product_name}>
                  {product.product_name}
                </option>
              ))
            ) : (
              <option>No products available</option>
            )}
          </datalist>

          <input
            autoComplete="on"
            list="suggestions"
            placeholder="Search products..."
            onChange={handleProductSelection}
             className="h-5 border p-7 w-[224px] rounded-lg"
          />
        </div>

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Quantity"
          className="h-5 border p-7 w-2/4 rounded-lg"
        />

        <input
          type="text"
          value={totalPrice}
          placeholder="Amount"
          className="h-5 border p-7 w-2/4 rounded-lg"
          readOnly
        />

        <button
          onClick={handleAddProduct}
          className="mb-2 bg-[#0E90DA] text-white py-0.5 px-3 rounded"
        >
          Add Product
        </button>
      </div>

      {/* Display added products */}
      <div className="mt-9">
    <table className="w-full">
        <thead className="bg-customColor text-white h-12">
            <tr>
                <th className="border bg-customColor w-1/9 font-normal">N/O</th>
                <th className="border bg-customColor w-1/5 font-normal">Product Name</th>
                <th className="border bg-customColor w-1/5 font-normal">Cost Price</th>
                <th className="border bg-customColor w-1/5 font-normal">Selling Price</th>
                <th className="border bg-customColor w-auto font-normal">Quantity</th>
                <th className="border bg-customColor w-1/5 font-normal">Total</th>
            </tr>
        </thead>
        <tbody>
            {addedProducts.map((product, index) => (
                <tr key={index} className="border text-gray-400">
                    <td className="border p-3">{index + 1}</td>
                    <td className="border p-3">{product.product_name}</td>
                    <td className="border p-3">NGN{product.cost_price}</td>
                    <td className="border p-3" style={{ color: "black", opacity: '.8' }}>NGN{product.retail_price}</td>
                    <td className="border p-3 w-auto">
                        <input
                            type="number"
                            value={product.quantity}
                            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 0)}
                            style={{ color: "white" }}
                            className="w-full bg-gray-400 p-1 align-items"
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
            <tr>
                <td colSpan="5" className="border p-3 font-bold">Total</td>
                <td className="border p-3 bg-gray-200">NGN{grandTotal}</td>
            </tr>
        </tbody>
    </table>
</div>


      {/* Payment section */}
      <div className="mt-4">
        <label htmlFor="paymentType">Payment Type</label>
        <select
          id="paymentType"
          value={selectedPaymentType}
          onChange={(e) => setSelectedPaymentType(e.target.value)}
          className="mt-2 mb-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Payment Type</option>
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="online">Online</option>
        </select>

        
      </div>
      <div className="mt-10">
  <button
    onClick={handlePayment}  // Call handlePayment function here
    className="bg-[#0E90DA] flex w-full justify-center rounded-md px-10 py-4 text-sm font-semibold leading-6 text-white"
  >
    Make Payment
  </button>
</div>
    </div>
  );
}