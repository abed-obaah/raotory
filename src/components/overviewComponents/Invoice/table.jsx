import React, { useState, useEffect } from "react";
import { useAuth } from '../../../context/AuthContext';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Table = ({ tab, setTab, setSelectedInvoice }) => {
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5; // Limit to 5 items per page
    const { user } = useAuth();
    const userEmail = user?.email;
    const thead = ['Customer Names', 'Invoice Number', 'Product Name', 'Sales Type', 'Status'];
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
                console.log("invoice for user:",data)
                if (data.success) {
                    const formattedInvoices = data.invoices.map(invoice => ({
                        id: invoice.id,
                        customer: invoice.customer_name,
                        product_name: invoice.product_name,
                        date: invoice.sales_date,
                        amount: `NGN ${parseFloat(invoice.paid_amount).toFixed(2)}`,
                        status: invoice.sales_status,
                        total_price: invoice.total_price,
                        paid: invoice.paid,
                        products: invoice.products,
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
        if (currentPage < Math.ceil(filteredInvoices.length / itemsPerPage)) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleClick = (invoice) => {
        console.log('Selected Invoice:', invoice);
        setSelectedInvoice(invoice);
        setTab('Data');
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

    // Filter invoices based on search term
    const filteredInvoices = invoices.filter(invoice =>
        invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastInvoice = currentPage * itemsPerPage;
    const indexOfFirstInvoice = indexOfLastInvoice - itemsPerPage;
    const currentInvoices = filteredInvoices.slice(indexOfFirstInvoice, indexOfLastInvoice);

    return (
        <>
            <div className="container mx-auto p-6 ">
                <div className="flex items-center mt-5">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 absolute ml-2" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border rounded-lg p-3 pl-10"
                        placeholder="Search by customer name"
                        style={{ backgroundColor: 'white', color: 'black' }}
                    />
                </div>
                {/* Header Section */}
                <div className="table-header flex p-3 font-semibold text-gray-500">
                    <div className="w-1/4">Customer Name</div>
                    <div className="w-1/4">Invoice Number</div>
                    <div className="w-1/4">Product Name</div>
                    <div className="w-1/4">Sales Type</div>
                    <div className="w-1/4 flex justify-between items-center">
                        <span>Status</span>
                        <span>Action</span>
                    </div>
                </div>

                {/* Invoice Rows */}
                {currentInvoices.map(invoice => (
                    <div key={invoice.id} className="invoice-row flex items-center p-3 border-2 mb-5 rounded-lg border-gray-200 bo">
                        <div className="w-1/4 flex items-center">
                            <div className="avatar w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold">
                                {invoice.customer[0]}
                            </div>
                            <span className="ml-3 font-semibold text-gray-900">{invoice.customer}</span>
                        </div>
                        <div className="w-1/4 text-gray-900">#B2A{invoice.id}</div>
                        <div className="w-1/4 text-gray-900">{invoice.product_name}</div>
                        <div className="w-1/4 flex items-center justify-between">
                            <span className={`status-badge px-3 py-1 rounded-full ${
                                invoice.status === 'Paid' ? 'bg-green-100 text-green-600' :
                                invoice.status === 'Credit' ? 'bg-red-100 text-red-600' :
                                'bg-yellow-100 text-yellow-600'
                            }`}>
                                {invoice.status}
                            </span>
                            <span className="status-badge px-3 py-1 rounded-full bg-green-100 text-green-600
                               
                            ">
                                Paid
                            </span>
                            <button className="view-btn bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => handleClick(invoice)}>
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-between mt-4">
                <button 
                    className={`px-4 py-2 bg-gray-300 text-gray-700 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="px-4 py-2">{`Page ${currentPage} of ${Math.ceil(filteredInvoices.length / itemsPerPage)}`}</span>
                <button 
                    className={`px-4 py-2 bg-gray-300 text-gray-700 rounded ${currentPage === Math.ceil(filteredInvoices.length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(filteredInvoices.length / itemsPerPage)}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default Table;
