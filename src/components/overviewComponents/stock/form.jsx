import React, { useState } from "react";
import SelectedProducts from './selected';
import { useAuth } from '../../../context/AuthContext';
import axios from "axios";

const Form = () => {
    const { user } = useAuth();

    // Initialize form data
    const [formData, setFormData] = useState({
        productName: '',
        quantity: '',
        purchasePrice: '',
        retailPrice: '',
        wholesalePrice: '',
        batchNumber: '',
        expirationDate: '',
        userEmail: user?.email || ""
    });

    // State to hold selected products
    const [selectedProducts, setSelectedProducts] = useState([]); 

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Check if all fields are filled
    const allFieldsFilled = Object.values(formData).every(value => value !== '');

    // Function to handle adding a product
    const handleAddProduct = () => {
        if (allFieldsFilled) {
            setSelectedProducts(prevProducts => [...prevProducts, formData]);

            // Reset form after adding product
            setFormData({
                productName: '',
                quantity: '',
                purchasePrice: '',
                retailPrice: '',
                wholesalePrice: '',
                batchNumber: '',
                expirationDate: '',
                userEmail: user?.email || ""
            });
        } else {
            alert("Please fill out all fields before adding the product.");
        }
    };

    // Function to handle submitting the products
    const handleStockUp = async () => {
        if (selectedProducts.length === 0) {
            alert("No products added yet.");
            return;
        }

        try {
            // Adjusted API endpoint and request payload
            const response = await axios.post("https://raotory.com.ng/apis/addDrug.php", { drugs: selectedProducts });
            console.log(response.data);
            alert(response.data.message || "Products successfully stocked up!");

            // Clear selected products after successful submission
            setSelectedProducts([]);
        } catch (error) {
            console.error("There was an error adding the drugs!", error);
            alert("There was an error submitting the products.");
        }
    };

    // Calculate the minimum expiration date (one month ahead)
    const getMinExpirationDate = () => {
        const today = new Date();
        today.setMonth(today.getMonth() + 1); // Move one month ahead
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Add leading 0 if needed
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="flex justify-between mt-20">
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
                    min={getMinExpirationDate()} // Set the minimum expiration date to 1 month ahead
                />
                {allFieldsFilled ?
                    <button
                        type="button"
                        className="border p-3 bg-blue-500 text-white mt-8 w-full rounded-lg"
                        onClick={handleAddProduct}
                    >
                        Add Product
                    </button> : <button
                        type="button"
                        className="border p-3 bg-gray-300 text-white mt-8 w-full rounded-lg"
                        disabled={!allFieldsFilled}
                    >
                        Add Product
                    </button>}
            </form>
            <SelectedProducts products={selectedProducts} onStockUp={handleStockUp} />
        </div>
    );
};

export default Form;
