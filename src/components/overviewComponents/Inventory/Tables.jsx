import React, { useEffect, useState } from "react";
import { TrashIcon } from '@heroicons/react/24/solid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Table = ({ products, userEmail }) => {
  const [updatesSuccessful, setUpdatesSuccessful] = useState(0);
  const [isUpdateCompleted, setIsUpdateCompleted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // To store the selected product for editing
  const [modalVisible, setModalVisible] = useState(false); // To control modal visibility
  const [updatedProduct, setUpdatedProduct] = useState({}); // Store updated values
  const [searchQuery, setSearchQuery] = useState(""); // Search query for filtering products

  const cols = ['N/O', 'Product Name', 'Quantity Stocked', 'Quantity in Stock', "Quantity Sold", "Expiring Date", "Batch Number", "Purchase Price", 'Total Cost Price', "Retail Price"];

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchUpdateStock = async (product) => {
      try {
        const response = await fetch("https://raotory.com/apis/updateStock.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: product.id,
            user_email: userEmail,
          }),
        });

        const data = await response.json();

        if (data.status === "success") {
          setUpdatesSuccessful(prev => prev + 1);
        } else {
          console.error(`Failed to update stock for ${product.product_name}. ${data.message}`);
        }
      } catch (error) {
        console.error('Error during stock update:', error);
      }
    };

    if (userEmail) {
      products.forEach(product => {
        fetchUpdateStock(product);
      });
    }
  }, [userEmail, products]);

  useEffect(() => {
    if (updatesSuccessful === products.length && !isUpdateCompleted) {
      toast.success("Stock updated successfully for the selected products!");
      setIsUpdateCompleted(true);
    }
  }, [updatesSuccessful, products.length, isUpdateCompleted]);

  const handleDelete = async (drugId, product) => {
    try {
      const response = await fetch("https://raotory.com/apis/inventory.php", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, id: drugId }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }

      const result = await response.json();
      console.log('result of inventory:', result);
      if (result.success) {
        toast.success('Product deleted successfully!');
        fetchUpdateStock(product);
      } else {
        toast.error('Failed to delete the product. Please try again.');
      }
    } catch (error) {
      console.error('Error during delete:', error);
      toast.error('Failed to delete the product: ' + error.message);
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product); // Set the product to be edited
    setUpdatedProduct({ ...product }); // Pre-fill the updatedProduct state with the current product details
    setModalVisible(true); // Show the modal
  };

  const handleModalClose = () => {
    setModalVisible(false); // Close the modal
    setSelectedProduct(null); // Reset selected product
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch("https://raotory.com/apis/updateProduct.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...updatedProduct,
          user_email: userEmail, // Include the email
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
        toast.success("Product updated successfully!");
        setModalVisible(false);
        setSelectedProduct(null);
      } else {
        toast.error("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product: " + error.message);
    }
  };

  return (
    <>
      <div className="top flex w-full justify-between align-center" style={{ height: '10vh' }}>
        <input
          type="text"
          className="w-3/4 border rounded-lg px-6"
          style={{ height: '45px' }}
          placeholder="Search by Product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
      </div>
      <table className="w-full p-8 border-collapse border-y">
        <thead className="bg-customColor">
          <tr>
            {cols.map((col) => (
              <th key={col} className="p-3 text-gray-300 text-left font-normal">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr className="p-9 border-x" key={product.id}>
              <td className="p-3 border-x">{index + 1}</td>
              <td className="p-3 border-x">{product.product_name}</td>
              <td className="p-3 border-x">{product.quantity}</td>
              <td className="p-3 border-x">{product.quantity - product.quantity_sold}</td>
              <td className="p-3 border-x">{product.quantity_sold}</td>
              <td className="p-3 border-x">{product.expiration_date}</td>
              <td className="p-3 border-x">{product.batch_number}</td>
              <td className="p-3 border-x">{product.purchase_price}</td>
              <td className="p-3 border-x">{(product.quantity * product.purchase_price).toFixed(2)}</td>
              <td className="p-3 border-x">{product.retail_price}</td>
              <td className="flex justify-around items-center pt-3">
                <div className="bg-red-200 p-2 rounded-full">
                  <TrashIcon
                    className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(product.id, product)} 
                  />
                </div>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEditClick(product)} // Open modal to edit the product
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing Product */}
      {modalVisible && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Product Details</h3>
            <label className="block mb-2">
              Product Name:
              <input
                type="text"
                value={updatedProduct.product_name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, product_name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-2">
              Quantity:
              <input
                type="number"
                value={updatedProduct.quantity}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, quantity: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-2">
              Expiration Date:
              <input
                type="date"
                value={updatedProduct.expiration_date}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, expiration_date: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-2">
              Batch Number:
              <input
                type="text"
                value={updatedProduct.batch_number}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, batch_number: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-2">
            purchase price:
              <input
                type="text"
                value={updatedProduct.purchase_price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, purchase_price: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-2">
            retail price:
              <input
                type="text"
                value={updatedProduct.retail_price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, retail_price: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={handleModalClose} // Close modal without saving
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleUpdate} // Save updated product
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default Table;
