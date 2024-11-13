import React, { useState } from 'react';
import { TrashIcon,XMarkIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from 'react-toastify';  // Import toast components
import 'react-toastify/dist/ReactToastify.css'; 

const ProductSearchComponent = ({
  selectedCustomer,
  showDropdown,
  setShowDropdown,
  handleSearchChange,
  filteredCustomers,
  setSelectedCustomer,
  searchTerm,
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
  handleSelectChange
}) => {
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
            {/* Modal and Icon */}
          </div>
        </div>
        <div className="mt-10 flex space-x-4 -ml-5">
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
          {/* <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Quantity"
            className="h-5 border p-7 w-2/4 rounded-lg"
          /> */}
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
        <div className="mt-9">
          <table className="w-full">
            <thead className="bg-customColor text-white h-12">
              <tr>
                <th>N/O</th>
                <th>Product Name</th>
                <th>Cost Price</th>
                <th>Selling Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {addedProducts.map((product, index) => (
                <tr key={index} className="border text-gray-400">
                  <td>{index + 1}</td>
                  <td>{product.product_name}</td>
                  <td>{product.retail_price}</td>
                  <td>
                    <input
                      type="number"
                      value={product.retail_price}
                      onChange={(e) => handleSellingPriceChange(index, parseInt(e.target.value) || 0)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                    />
                  </td>
                  <td>NGN{product.retail_price * product.quantity}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="5">Total</td>
                <td>NGN{grandTotal}</td>
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
