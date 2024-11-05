import React, { useState, useEffect } from "react";
import { useAuth } from '../../../context/AuthContext';

const Table = ({ tab, setTab, setSelectedInvoice }) => {
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Limit to 5 items per page
    const { user } = useAuth();
    const userEmail = user?.email;
    const thead = ['Customer Name', 'Invoice Number', 'Sales Type', 'Status'];
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        const fetchInvoices = async () => {
            if (!userEmail) {
                console.error("No user email provided");
                return; 
            }
            try {
                const response = await fetch(`https://raotory.com.ng/apis/invoice.php?user_email=${encodeURIComponent(userEmail)}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (data.success) {
                    const formattedInvoices = data.invoices.map(invoice => ({
                        id: invoice.id,
                        customer: invoice.customer_name,
                        product_name: invoice.product_name,
                        date: invoice.sales_date,
                        amount: `NGN ${parseFloat(invoice.paid_amount).toFixed(2)}`,
                        status: invoice.sales_status,
                        total_price: invoice.total_price, // Ensure this data is available
                        paid: invoice.paid, // Ensure this data is available
                        products: invoice.products, // Assuming this is part of the data
                    }));
                    setInvoices(formattedInvoices);
                } else {
                    console.error('Error fetching invoices:', data.error);
                }
            } catch (error) {
                console.error('Network or fetch error:', error);
            }
        };

        fetchInvoices();
    }, [userEmail]);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(invoices.length / itemsPerPage)) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    // const handleClick = (invoice) => {
    //     setSelectedInvoice(invoice); // Pass the selected invoice to the parent component
    //     setTab('Data'); // Change the tab to 'Data'
    // };


    const handleClick = (invoice) => {
        console.log('Selected Invoice:', invoice); // Check if this logs the correct invoice
        setSelectedInvoice(invoice); // Set the selected invoice
        setTab('Data'); // Change the tab to 'Data'
    };

    const Type = (status) => {
        let bgColor;
        if (status === "Paid") {
            bgColor = "bg-green-200";
        } else if (status === 'Credit') {
            bgColor = "bg-red-200";
        } else if (status === 'Part') {
            bgColor = "bg-yellow-100";
        } else {
            bgColor = "bg-gray-200";
        }

        return (
            <td className={`h-1/2 mt-1 py-1 flex justify-center align-center rounded-full w-full ${bgColor}`}>
                {status}
            </td>
        );
    };

    const indexOfLastInvoice = currentPage * itemsPerPage;
    const indexOfFirstInvoice = indexOfLastInvoice - itemsPerPage;
    const currentInvoices = invoices.slice(indexOfFirstInvoice, indexOfLastInvoice);

    return (
        <>
            <table className="w-full mt-9">
                <thead>
                    <tr>
                        {thead.map((th, index) => (
                            <th key={index} className="text-gray-400 font-semibold text-left">{th}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentInvoices.map((invoice, index) => (
                        <tr key={index} className="text-left rounded-lg text-blue-900 font-semibold">
                            <td className="mb-5 h-10">{invoice.customer}</td>
                            <td>{invoice.id}</td>
                            <td>{invoice.product_name}</td>
                            {Type(invoice.status || "Unknown")}
                            <td className="text-center">
                                <button className="border bg-blue-600 px-7 py-1 text-white rounded" onClick={() => handleClick(invoice)}>
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination controls */}
            <div className="flex justify-between mt-4">
                <button 
                    className={`px-4 py-2 bg-gray-300 text-gray-700 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="px-4 py-2">{`Page ${currentPage} of ${Math.ceil(invoices.length / itemsPerPage)}`}</span>
                <button 
                    className={`px-4 py-2 bg-gray-300 text-gray-700 rounded ${currentPage === Math.ceil(invoices.length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(invoices.length / itemsPerPage)}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default Table;
