import React from "react";

const SelectedProducts = ({ products, onStockUp }) => { // Receive products and onStockUp as props

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
                                {/* <p className="text-xs text-gray-400">Wholesale Price: {product.wholesalePrice}</p>
                                <p className="text-xs text-gray-400">Purchase Price: {product.purchasePrice}</p>
                                <p className="text-xs text-gray-400">Quantity: {product.quantity}</p> */}
                            </div>
                            <p className="text-normal">NGN {product.retailPrice}</p>
                        </div>
                    ))
                )}
            </div>

            <button className="border bg-blue-500 rounded-lg p-3 text-white w-full" onClick={onStockUp}>Stock Up</button>
        </section>
    );
};

export default SelectedProducts;
