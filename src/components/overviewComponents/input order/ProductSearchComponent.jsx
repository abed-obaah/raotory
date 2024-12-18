import React, { useState,useEffect } from 'react';
import { TrashIcon,XMarkIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from 'react-toastify';  // Import toast components
import 'react-toastify/dist/ReactToastify.css'; 
import Select from 'react-select'
import Customer from '../Create Customer/form';

const ProductSearchComponent = ({
  selectedCustomer,
  showDropdown,
  showDropdownP,
  setShowDropdown,
  setShowDropdownP,
  handleSearchChange,
  filteredCustomers,
  setSelectedCustomer,
  searchTerm,
  searchTermP,
  error,
  handleProductSelection,
  products,
  quantity,
  setQuantity,
  totalPrice,
  handleAddProduct,
  addedProducts,
  handleQuantityChange,
  handleSellingPriceChange,
  selecteds,
  handleRemoveProduct,
  grandTotal,
  selectedPaymentType,
  setSelectedPaymentType,
  handlePayment,
  people,
  handleSelectChange,
  selectedProduct,  // Add selectedProduct as a prop
  setSelectedProduct ,
  selectedPriceType,
   handlePriceTypeChange
  
}) => {


 // State to hold the fetched products
  // const [selectedProduct, setSelectedProduct] = useState(''); // State for selected product]
  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTermP.toLowerCase())
  );
  // const [totalPrice, setTotalPrice] = useState('');



  // TODO 
  // ADD THE PRICE INT THE SELECT DROPDOWN

  const productOptions = products.map((product) => ({
    value: product.id,
    label: product.product_name,
    
  }));
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (selectedCustomer) {
      setShowDropdown(false); // Close dropdown when a customer is selected
    }
  }, [selectedCustomer]);

  return (
    <div>
      <div>
        <ToastContainer />
        <label className="block font-medium text-gray-900">Search Customers</label>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div className="relative w-80">
                      <input
                        type="text"
                        value={selectedCustomer}
                        className="w-full p-2 border border-gray-300 rounded-lg font-regular text-lg pr-16"
                        placeholder="Select Customer"
                        readOnly
                        onClick={() => setShowDropdown(!showDropdown)}
                      />
                      {showDropdown && (
                        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                          <input
                            type="text"
                            className="w-full p-2 border-b border-gray-300 rounded-t-lg"
                            placeholder="Search for a customer"
                            value={searchTerm}
                            onChange={handleSearchChange}
                          />
                          <div className="max-h-40 overflow-y-auto">
                            {filteredCustomers.map((customer, index) => (
                              <button
                                key={index}
                                className="w-full text-left p-2 hover:bg-gray-100"
                                onClick={() => {
                                  setSelectedCustomer(customer.name);
                                  setSearchTerm('');
                                  setShowDropdown(false);
                                  
                                }}
                              >
                                {customer.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {error && <div className="text-red-500 mt-2">{error}</div>}
                    </div>
                  </div>
                  <div>
                    <UserPlusIcon
                      className="w-10 h-10 cursor-pointer text-white bg-[#0E90DA] p-2 rounded-full shadow-lg hover:bg-blue-300 transition-colors"
                      onClick={() => setShowModal(true)} // Toggle modal visibility on click
                    />
                  </div>
        </div>


        {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[50%] p-6 rounded-lg shadow-lg">
            <Customer />
            <button
              className="mt-4 bg-red-500 text-white p-2 rounded"
              onClick={() => setShowModal(false)} // Close modal
            >
              Close
            </button>
          </div>
        </div>
      )}
        <div className="mt-10 flex space-x-4 -ml-5 justify-between">
          <div className='flex space-x-3 ml-5'>
          <div>
                 <div className="mt-2">
      <label
        htmlFor="product-select"
        className="block text-sm font-medium text-gray-900"
      >
        Select a product
      </label>
      <Select
        id="product-select"
        value={selectedProduct} // Control the selected value
        onChange={handleProductSelection} // Handle change
        options={productOptions} // List of products as options
        placeholder="Search products..." // Placeholder text
        getOptionLabel={(e) => e.label} // Label display for each option
        getOptionValue={(e) => e.value} // Value used for selection
        className="mt-2 block w-[600px] rounded-md text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600"
        isSearchable={true} // Enable searching
      />
    </div>
          </div>



              {/* <div className="relative w-80">
              
              <input
                type="text"
                value={selectedProduct}
                className="w-full p-2 border border-gray-300 rounded-lg font-bold text-lg pr-16"
                placeholder="Select Product"
                readOnly
                onClick={() => setShowDropdownP(!showDropdownP)}
              />
              
           
              {showDropdownP && (
                <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                
                  <input
                    type="text"
                    className="w-full p-2 border-b border-gray-300 rounded-t-lg"
                    placeholder="Search for a product"
                    value={searchTermP}
                    onChange={(e) => setSearchTermP(e.target.value)}
                  />
                  
                 
                  <div className="max-h-40 overflow-y-auto">
                    {filteredProducts.length === 0 ? (
                      <p className="p-2 text-center text-sm">No products found</p>
                    ) : (
                      filteredProducts.map((product, index) => (
                        <button
                          key={index}
                          className="w-full text-left p-2 hover:bg-gray-100"
                          onClick={() => {
                            setSelectedProduct(product.product_name);
                            setTotalPrice(product.retail_price);
                            setSearchTermP('');
                            setShowDropdownP(false);
                          }}
                        >
                          {product.product_name}{product.retail_price}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}

            
              <a href="#" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-blue-600">
                Change
              </a>
            </div> */}

              {/* <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="Quantity"
                className="h-5 border p-7 w-2/4 rounded-lg"
              /> */}
              {/* <input
                type="text"
                value={totalPrice}
                placeholder="Amount"
                className="h-5 border p-7 w-2/4 rounded-lg"
                readOnly
              /> */}
              
          </div>
        
          <button
              onClick={handleAddProduct}
              className="mb-2 bg-[#0E90DA] text-white py-1 px-4 rounded text-sm h-10 mt-10"
            >
              Add Product
          </button>
          
          
        </div>
        <div className="w-1/4 ml-auto">
      <label htmlFor="location" className="block text-sm/6 font-medium text-gray-900">
        Price Type
      </label>
      <select
        id="location"
        name="location"
        value={selectedPriceType} // Controlled select input
        onChange={(e) => handlePriceTypeChange(e.target.value)} // Call the handler when price type changes
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm/6"
      >
        <option value="retail_price">Retail price</option>
        <option value="wholesale_price">Wholesale</option>
      </select>
    </div>

        <div className="mt-9">
        <table className="w-full border-collapse">
  <thead className="bg-customColor text-white h-12">
    <tr>
      <th className="text-left px-4 py-2">N/O</th>
      <th className="text-left px-4 py-2">Product Name</th>
      <th className="text-left px-4 py-2">Cost Price</th>
      <th className="text-left px-4 py-2">Selling Price</th>
      <th className="text-left px-4 py-2">Quantity</th>
      <th className="text-left px-4 py-2">Total</th>
      <th className="text-left px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {addedProducts.map((product, index) => (
      <tr key={index} className="border-b">
        <td className="px-4 py-2">{index + 1}</td>
        <td className="px-4 py-2">{product.product_name}</td>
        <td className="px-4 py-2">NGN {product.purchase_price}</td>
        <td className="px-4 py-2">
          <input
            type="number"
            value={product.retail_price}
            onChange={(e) => handleSellingPriceChange(index, parseInt(e.target.value) || 0)}
            className="w-20 border border-gray-300 rounded px-2 py-1 text-gray-700"
          />
        </td>
        <td className="px-4 py-2">
          <input
            type="number"
            value={product.quantity}
            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
            className="w-20 border border-gray-300 rounded px-2 py-1 text-gray-700"
          />
        </td>
        <td className="px-4 py-2">NGN {product.retail_price * product.quantity}</td>
        <td className="px-4 py-2">
          <div
            className="bg-red-100 hover:bg-red-200 p-2 rounded-full cursor-pointer inline-flex items-center justify-center"
            onClick={() => handleRemoveProduct(index)}
          >
            <TrashIcon height="20px" color="red" />
          </div>
        </td>
      </tr>
    ))}
    <tr className="bg-gray-100">
      <td colSpan="5" className="text-right font-semibold px-4 py-2">Grand Total:</td>
      <td className="font-bold px-4 py-2">NGN {grandTotal}</td>
      <td></td>
    </tr>
  </tbody>
</table>

        </div>
        <div className="mt-4">
          <label htmlFor="paymentType">Payment Type</label>
          <select
            id="paymentType"
            value={selectedPaymentType}
            onChange={(e) => setSelectedPaymentType(e.target.value)}
            className="mt-2 mb-2 border border-gray-300 rounded-md h-[2.5rem] px-2 ml-5"
          >
            <option value="">Select Payment Type</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="online">Online</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductSearchComponent;
