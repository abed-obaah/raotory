import React, { useEffect, useState } from "react";
import { TrashIcon } from '@heroicons/react/24/solid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Table = ({ products, userEmail }) => {
    const [updatesSuccessful, setUpdatesSuccessful] = useState(0); // To count successful updates
    const [isUpdateCompleted, setIsUpdateCompleted] = useState(false); // To trigger toast once all updates are completed

    const cols = ['N/O', 'Product Name', 'Quantity Stocked', 'Quantity in Stock', "Quantity Sold", "Expiring Date", "Batch Number", 'Total Cost Price', "Retail Price"];

    useEffect(() => {
        // Function to update stock on page load
        const fetchUpdateStock = async (product) => {
            try {
                const response = await fetch("https://raotory.com.ng/apis/updateStock.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: product.id, // Use the correct product ID
                        user_email: userEmail, // Send the user email as expected by your API
                    }),
                });

                // Ensure response is valid
                const data = await response.json();

                if (data.status === "success") {
                    setUpdatesSuccessful(prev => prev + 1); // Increment the count of successful updates
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
        // Once all updates are completed, trigger the success toast
        if (updatesSuccessful === products.length && !isUpdateCompleted) {
            toast.success("Stock updated successfully for the selected products!");
            setIsUpdateCompleted(true); // Prevent the toast from triggering again
        }
    }, [updatesSuccessful, products.length, isUpdateCompleted]); // Run this effect when updatesSuccessful changes

    const handleDelete = async (drugId, product) => {
        try {
            const response = await fetch("https://raotory.com.ng/apis/inventory.php", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: userEmail, id: drugId }), // Pass the product ID and email
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
            }

            const result = await response.json();

            if (result.success) {
                toast.success('Product deleted successfully!');
                // After deletion, trigger stock update for the product
                fetchUpdateStock(product); 
            } else {
                toast.error('Failed to delete the product. Please try again.');
            }
        } catch (error) {
            console.error('Error during delete:', error);
            toast.error('Failed to delete the product: ' + error.message);
        }
    };

    return (
        <>
            <table className="w-full p-8 border-collapse border-y">
  <thead className="bg-customColor">
    <tr>
      {cols.map((col) => (
        <th key={col} className="p-3 text-gray-300 text-left font-normal">{col}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    {products.map((product, index) => (
      <tr className="p-9 border-x" key={product.id}>
        <td className="p-3 border-x">{index + 1}</td>
        <td className="p-3 border-x">{product.product_name}</td>
        <td className="p-3 border-x">{product.quantity}</td>
        <td className="p-3 border-x">{product.quantity - product.quantity_sold}</td>
        <td className="p-3 border-x">{product.quantity_sold}</td>
        <td className="p-3 border-x">{product.expiration_date}</td>
        <td className="p-3 border-x">{product.batch_number}</td>
        {/* Calculate Total Cost Price */}
        <td className="p-3 border-x">{(product.quantity_sold * product.retail_price).toFixed(2)}</td>
        <td className="p-3 border-x">{product.retail_price}</td>
        <td className="flex justify-around items-center pt-3">
          {product.totalRev}
          <div className="bg-red-200 p-2 rounded-full">
            <TrashIcon
              className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-700"
              onClick={() => handleDelete(product.id, product)} // Pass product to handleDelete
            />
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>


            <ToastContainer />
        </>
    );
}

export default Table;
