import React from "react";
import { TrashIcon } from '@heroicons/react/24/solid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Table = ({ products, userEmail }) => {
    const cols = ['N/O', 'Product Name', 'Quantity Stocked','Quantity in Stock', "Quantity Sold", "Expiring Date", "Batch Number", 'Total Cost Price', "Retail Price"];

    const handleDelete = async (drugId) => {
        try {
            const response = await fetch("https://raotory.com.ng/apis/inventory.php", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: userEmail, id: drugId }), // Fixed the body key
            });

            // Check if response is OK
            if (!response.ok) {
                const errorMessage = await response.text(); // Get error message from server response
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
            }

            const result = await response.json();

            if (result.success) {
                toast.success('Product deleted successfully!');
                // Optionally refresh the product list or remove the deleted item from the UI
                // For example, you can filter out the deleted product from the products array
                // Assuming there's a setProducts method passed as a prop to update the product list
                // setProducts(products.filter(product => product.id !== drugId)); // Uncomment if setProducts is provided
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
                        <tr className="p-9 border-x" key={product.id}> {/* Use product.id for key */}
                            <td className="p-3 border-x">{index + 1}</td>
                            <td className="p-3 border-x">{product.product_name}</td>
                            
                            <td className="p-3 border-x">{product.quantity}</td>
                            <td className="p-3 border-x">{product.quantity_in_stock}</td>
                            <td className="p-3 border-x">{product.quantity_sold}</td>
                            <td className="p-3 border-x">{product.expiration_date}</td>
                            <td className="p-3 border-x">{product.batch_number}</td>
                            <td className="p-3 border-x">{product.total_cost_price }</td>
                            <td className="p-3 border-x">{product.retail_price}</td>
                            <td className="flex justify-around items-center pt-3">
                                {product.totalRev} 
                                <div className="bg-red-200 p-2 rounded-full">
                                    <TrashIcon 
                                        className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-700" 
                                        onClick={() => handleDelete(product.id)} // Call handleDelete with product.id
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
