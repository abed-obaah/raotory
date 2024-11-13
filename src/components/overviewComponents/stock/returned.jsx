import React, { useEffect, useState } from "react";
import { TrashIcon } from '@heroicons/react/24/solid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const Table = () => {
    const [refunds, setRefunds] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const userEmail = user?.email;

    // Columns for the table
    const cols = ['N/O', 'Product Name', "Quantity Returned", "Expiring Date", "Batch Number", 'Total Cost Price', "Retail Price","Date Returned"];

    // Function to fetch refund data from the API
    const fetchRefunds = async () => {
        try {
            // Replace with your actual API URL and send userEmail to the API
            const response = await axios.post('https://raotory.com.ng/apis/get_refunds.php', { store_email: userEmail,user_email: userEmail});
            
            if (response.data.length === 0) {
                // No refunds found for this email
                toast.info("No refunded drugs yet.");
            } else {
                // Set refunds if data is returned
                setRefunds(response.data);
                console.log('returned:',response.data)
            }
        } catch (error) {
            // Handle errors with a toast message
            toast.error("Error fetching refund data. Please try again.");
        } finally {
            setLoading(false); // Stop loading regardless of success or failure
        }
    };

    // Fetch refund data when the component mounts
    useEffect(() => {
        fetchRefunds();
    }, [userEmail]);

    // Render loading state if data is still being fetched
    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {refunds.length > 0 ? (
                <table className="w-full p-8 border-collapse border-y">
                    <thead className="bg-customColor">
                        <tr>
                            {cols.map((col) => (
                                <th key={col} className="p-3 text-gray-300 text-left font-normal">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {refunds.map((product, index) => (
                            <tr key={product.id} className="p-9 border-x">
                                <td className="p-3 border-x">{index + 1}</td>
                                <td className="p-3 border-x">{product.refund_product_name}</td>
                                <td className="p-3 border-x">{product.quantity_returned}</td>
                                <td className="p-3 border-x">{product.expiration_date}</td>
                                <td className="p-3 border-x">{product.batch_number}</td>
                                <td className="p-3 border-x">{product.total_cost_price}</td>
                                <td className="p-3 border-x">{product.retail_price}</td>
                                <td className="p-3 border-x">
                                    {new Date(product.return_date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No refunded drugs yet.</p>
            )}
            <ToastContainer />
        </>
    );
}

export default Table;
