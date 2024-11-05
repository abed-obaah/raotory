import React, { useEffect, useState } from "react";
import VectorBG from '../../../../src/assets/Vector18.svg';
import { BanknotesIcon, PrinterIcon } from "@heroicons/react/24/outline";
import axios from "axios"; // Import Axios
import { useAuth } from '../../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Data = ({ tab, setTab, products, selectedCount, selectedRows, setSelectedCount, setSelectedRows, selectedInvoice, onRowSelection }) => {
    const { user } = useAuth();
    const userEmail = user?.email;

    // State to store the updated quantities for each selected product
    const [updatedQuantities, setUpdatedQuantities] = useState({});

    const handlePrint = () => {
        alert('Print button has been clicked');
    };

    const handleRowSelection = (count) => {
        setSelectedCount(count);
    };

    // Function to handle quantity change for a specific product
    const handleQuantityChange = (e, productId) => {
        const newQuantity = parseInt(e.target.value, 10);

        setUpdatedQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: newQuantity
        }));
    };

    const handleProcessClick = async () => {
        if (selectedRows.length > 0) {
            try {
                const storeEmail = userEmail;
    
                // Prepare the refund request payload, including the updated quantities
                const refundRequests = selectedRows.map(productId => {
                    const productQuantity = updatedQuantities[productId] || selectedInvoice.quantity; // Use updated quantity if available
                    return {
                        invoice_id: selectedInvoice.id,
                        product_id: productId,
                        product_name: selectedInvoice.product_name,
                        customer_email: selectedInvoice.customer,
                        store_email: storeEmail,
                        quantity: productQuantity  // Include the quantity in the payload
                    };
                });
    
                // Send the POST request to the backend
                const response = await axios.post('https://raotory.com.ng/apis/refund.php', refundRequests);
                
                // Log the response on success
                console.log('Response:', response.data);
                // Show success toast on successful refund processing
                toast.success('Refund processed successfully!'); // Notify the user of success
            } catch (error) {
                console.error('Error processing refunds:', error);
                // Show error toast on failure
                toast.error('Failed to process refunds. Please try again.'); // Notify the user of failure
            }
        } else {
            // Show error toast if no items are selected for refund
            toast.error('No items selected for refund');
        }
    };

    useEffect(() => {
        console.log('Selected Invoice:', selectedInvoice);
    }, [selectedInvoice]);

    const invoiceProducts = selectedInvoice?.products || [];
    const outstandingAmount = selectedInvoice ? selectedInvoice.total_price - selectedInvoice.paid : 0;
    const thead = ['N/O', "Product Name", "Cost Price", 'Selling Price', 'Quantity to return', "Total"];

    useEffect(() => {
        if (typeof onRowSelection === 'function') {
            onRowSelection(selectedRows.length);
        } else {
            console.error('onRowSelection is not a function', onRowSelection);
        }
    }, [selectedRows, onRowSelection]);

    const toggleRowSelection = (productId) => {
        setSelectedRows((prevSelected) => {
            if (prevSelected.includes(productId)) {
                return prevSelected.filter(id => id !== productId); // Deselect
            } else {
                return [...prevSelected, productId]; // Select
            }
        });
    };

    return (
        <>
        <ToastContainer />
            <div className="bg-blue-500 relative grid lg:grid-cols-4 overflow-hidden w-full h-full rounded-lg text-white bg-right bg-no-repeat px-10 py-5" style={{ backgroundImage: `url(${VectorBG})`, position: 'relative' }}>
                <div className="h-full flex flex-col justify-center border-r-2 p-4 w-full">
                    <p className={`text-xs ${selectedInvoice?.status === 'Part Payment' ? 'bg-yellow-100' : ''} w-1/2 text-center px-1 py-1 text-blue-900 font-semibold`}>
                        {selectedInvoice?.status || "N/A"}
                    </p>
                    <h1 className="text-2xl font-semibold">{selectedInvoice?.customer || "N/A"}</h1>
                    <p className="text-xs">INVOICE NUMBER: #{selectedInvoice?.id || "N/A"}</p>
                    <p className="text-xs">Abraka, Delta State</p>
                </div>
                <div className="h-full flex flex-col justify-center border-r-2 pl-4 w-full">
                    <p>Grand Total</p>
                    <p className="text-2xl font-semibold">{selectedInvoice?.amount || "0"}</p>
                </div>
                <div className="h-full flex flex-col justify-center border-r-2 pl-4 w-full">
                    <p>Paid</p>
                    <p className="text-2xl font-semibold">{selectedInvoice?.amount || "0"}</p>
                </div>
                <div className="h-full flex flex-col justify-center pl-4 w-full">
                    <p>Outstanding</p>
                    <p className="text-2xl font-semibold">NGN {outstandingAmount || "0"}</p>
                    <button className="w-1/2 pt-1 rounded bg-white text-blue-500 flex justify-around text-xs h-6 align-center mt-4 font-semibold">
                        <BanknotesIcon height="20px" /> Confirm Payment
                    </button>
                </div>
            </div>

            <table className="mt-9 text-gray-600 w-full">
                <thead className="bg-gray-300 text-gray-600">
                    <tr>
                        {thead.map((Col) => (
                            <th key={Col} className={`border font-normal p-3 ${Col === "N/O" ? 'w-4' : 'w-1/5'}`}>
                                {Col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {selectedInvoice ? (
                        <tr 
                            className={`text-center border cursor-pointer ${selectedRows.includes(selectedInvoice.id) ? 'bg-blue-500' : 'bg-gray-100'}`}
                            onClick={() => toggleRowSelection(selectedInvoice.id)} // Toggle selection on click
                        >
                            <td className="h-12 border">1</td> {/* Static row number */}
                            <td>{selectedInvoice.product_name}</td>
                            <td>{selectedInvoice.amount}</td>
                            <td>{selectedInvoice.sell}</td>

                            {/* Input field for changing the quantity */}
                            <td>
                                <input 
                                    type="number" 
                                    className="border w-full text-center" 
                                    value={updatedQuantities[selectedInvoice.id] || selectedInvoice.quantity} 
                                    min="1"
                                    onChange={(e) => handleQuantityChange(e, selectedInvoice.id)} 
                                />
                            </td>

                            {/* Dynamically update total based on quantity * sell */}
                            <td>{(updatedQuantities[selectedInvoice.id] || selectedInvoice.quantity) * selectedInvoice.sell}</td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan={thead.length} className="text-center py-4">
                                No invoice selected
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mt-4 text-left ml-4">
                <p>{selectedRows.length} item(s) selected for refund</p>
            </div>
            <button className="w-1/4 pt-2 rounded bg-blue-500 text-white flex justify-center gap-3 text-normal h-10 align-center mt-2 font-semibold" onClick={handleProcessClick}>
                <BanknotesIcon height="20px" />
                {selectedRows.length > 0 ? "Process Refunds" : "Make A Refund"}  {/* Change this line */}
            </button>
            <button className="bg-blue-300 p-2 absolute right-10 bottom-10 rounded-full" onClick={handlePrint}>
                <PrinterIcon height="20px" stroke="blue" />
            </button>
        </>
    );
};

export default Data;
