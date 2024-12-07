import React, { useState } from "react";
import { TrashIcon } from '@heroicons/react/24/solid'; // You can use react-icons for the trash icon

const SelectedProducts = ({ products, onStockUp, onRemoveProduct }) => {
    // State to track if the button is clicked
    const [isStockingUp, setIsStockingUp] = useState(false);

    // Wrapper function to handle button click and state update
    const handleStockUpClick = async () => {
        if (!isStockingUp) {
            setIsStockingUp(true);
            try {
                await onStockUp(); // Call the parent-provided stock-up function
            } finally {
                setIsStockingUp(false); // Reset state after completion
            }
        }
    };

    return (
        <section className="border w-1/4 p-2 display-inline rounded-lg overflow-y-scroll" style={{ height: '80vh' }}>
            <h2 className="pl-3">Selected Products</h2>
            <p className="text-xs text-gray-400 pl-3">Selected products display here</p>
            <div className="contain">
                {products.length === 0 ? (
                    <p className="text-center text-gray-400">No products added yet.</p>
                ) : (
                    products.map((product, index) => (
                        <div className="flex justify-between p-4" key={index}>
                            <div className="lefttext">
                                <p className="text-normal">{product.productName} <span>x {product.quantity}</span></p>
                                <p className="text-xs text-gray-400">Expires: {product.expirationDate}</p>
                                <p className="text-xs text-gray-400">Batch Number: {product.batchNumber}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="text-normal mr-4">NGN {product.retailPrice}</p>
                                <button onClick={() => onRemoveProduct(index)} className="text-red-600">
                                    <TrashIcon className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-700" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <button
                className={`border rounded-lg p-3 text-white w-full ${isStockingUp ? 'bg-gray-400' : 'bg-[#0E90DA]'}`}
                onClick={handleStockUpClick}
                disabled={isStockingUp}
            >
                {isStockingUp ? "Stocking Up..." : "Stock Up"}
            </button>
        </section>
    );
};

export default SelectedProducts;
