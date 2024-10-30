import React from "react";
import { TrashIcon } from '@heroicons/react/24/solid';

const Table = ({ products, userEmail }) => {
    const cols = ['N/O', 'Product Name', 'Quantity Stocked', "Quantity Sold", "Expiring Date", "Batch Number", 'Total Cost Price', "retail price",];

    const handleDelete = async (drugId) => {
        const response = await fetch("https://raotory.com.ng/apis/inventory.php", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: userEmail, drugId }),
        });
        const result = await response.json();
        if (result.success) {
            // Optionally refresh the product list or remove the deleted item from UI
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
                        <tr className="p-9 border-x" key={index}>
                            <td className="p-3 border-x">{index + 1}</td>
                            <td className="p-3 border-x">{product.product_name}</td> {/* Changed to product.product_name */}
                            <td className="p-3 border-x">{product.quantity}</td>
                            <td className="p-3 border-x">{product.quantitysold}</td>
                            <td className="p-3 border-x">{product.expiration_date}</td>
                            <td className="p-3 border-x">{product.batch_number}</td>
                            <td className="p-3 border-x">{product.retail_price}</td>
                            <td className="p-3 border-x">{product.tcp}</td>
                            <td className="flex justify-around align-center pt-3">
                                {product.totalRev} 
                                <div className="bg-red-200 p-2 rounded-full">
                                    <TrashIcon 
                                        className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-700" 
                                        onClick={() => handleDelete(product.id)} // Assuming product has an 'id' field
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Table;
