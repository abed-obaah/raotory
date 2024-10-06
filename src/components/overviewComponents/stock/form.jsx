import React, { useState } from "react";
import SelectedProducts from './selected';

const Form = () => {
    const [formData, setFormData] = useState({
        productName: '',
        quantity: '',
        purchasePrice: '',
        retailPrice: '',
        wholesalePrice: '',
        batchNumber: '',
        expirationDate: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const allFieldsFilled = Object.values(formData).every(value => value !== '');

    return (
        <div className="flex justify-between">
            <form className="w-2/3">
                <input
                    type="text"
                    name="productName"
                    className="border w-full p-3 rounded-lg"
                    placeholder="Product name"
                    value={formData.productName}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="quantity"
                    className="border w-full p-3 rounded-lg mt-4"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="purchasePrice"
                    className="border w-full p-3 rounded-lg mt-4"
                    placeholder="Purchase price per one item"
                    value={formData.purchasePrice}
                    onChange={handleInputChange}
                />
                <div className="two flex gap-5">
                    <input
                        type="text"
                        name="retailPrice"
                        className="border w-full p-3 rounded-lg mt-4"
                        placeholder="Retail price"
                        value={formData.retailPrice}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="wholesalePrice"
                        className="border w-full p-3 rounded-lg mt-4"
                        placeholder="Wholesale price"
                        value={formData.wholesalePrice}
                        onChange={handleInputChange}
                    />
                </div>
                <input
                    type="text"
                    name="batchNumber"
                    className="border w-full p-3 rounded-lg mt-4"
                    placeholder="Batch Number"
                    value={formData.batchNumber}
                    onChange={handleInputChange}
                />
                <input
                    type="date"
                    name="expirationDate"
                    className="border w-full p-3 rounded-lg mt-4 mb-9"
                    placeholder="Expiration date"
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                />
                {allFieldsFilled ?
                    <button
                        type="button"
                        className="border p-3 bg-blue-500 text-white mt-8 w-full rounded-lg"
                        disabled={!allFieldsFilled}
                    >
                        Add Product
                    </button> : <button
                        type="button"
                        className="border p-3 bg-gray-300  text-white mt-8 w-full rounded-lg"
                        disabled={!allFieldsFilled}
                    >
                        Add Product
                    </button>}
            </form>
            <SelectedProducts />
        </div>
    );
};

export default Form;
