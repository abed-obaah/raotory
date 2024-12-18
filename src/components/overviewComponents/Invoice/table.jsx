import React, { useState, useEffect } from "react";
import { useAuth } from '../../../context/AuthContext';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import VectorBG from '../../../../src/assets/Vector18.svg';
import HeadImage from '../../../../src/assets/imager.svg';

const Table = ({ tab, setTab, setSelectedInvoice }) => {
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [beginDate, setBeginDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('Any');
    const itemsPerPage = 5;
    const { user } = useAuth();
    const userEmail = user?.email;

    useEffect(() => {
        const fetchInvoices = async () => {
            if (!userEmail) {
                console.error("No user email provided");
                return; 
            }
            try {
                const response = await fetch(`https://raotory.com/apis/invoice.php?user_email=${encodeURIComponent(userEmail)}`);
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
        setSelectedInvoice(invoice);
        setTab('Data');
    };

    // Filter invoices based on search term, date, and status
    const filteredInvoices = invoices.filter((invoice) => {
        // Check if the search term matches the customer name (case-insensitive)
        const matchesSearch = invoice.customer.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Check if the status matches or if "Any" is selected
        const matchesStatus = status === 'Any' || invoice.status === status;
        
        // Check if the invoice date falls within the selected date range
        const invoiceDate = new Date(invoice.date);
        const matchesDate =
            (!beginDate || invoiceDate >= new Date(beginDate)) &&
            (!endDate || invoiceDate <= new Date(endDate));
    
        // Return true if all conditions are met
        return matchesSearch && matchesStatus && matchesDate;
    });
    

    const indexOfLastInvoice = currentPage * itemsPerPage;
    const indexOfFirstInvoice = indexOfLastInvoice - itemsPerPage;
    const currentInvoices = filteredInvoices.slice(indexOfFirstInvoice, indexOfLastInvoice);

    return (
        <>
            <div className="container mx-auto p-6">
                <div
                    className="bg-blue-500 relative justify-between align-center overflow-hidden w-full h-full rounded-lg p-7 text-white bg-right bg-no-repeat"
                    style={{ backgroundImage: `url(${VectorBG})` }}
                >
                    <h1 className="text-2xl pb-7">All Invoices for {userEmail}</h1>
                    <form className="flex gap-3 text-gray-400-500">
                        <div className="item">
                            <label htmlFor="begin-date">Begin Date</label><br />
                            <input
                                type="date"
                                id="begin-date"
                                className="border rounded text-gray-400"
                                value={beginDate}
                                onChange={(e) => setBeginDate(e.target.value)}
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="end-date">End Date</label><br />
                            <input
                                type="date"
                                id="end-date"
                                className="border rounded text-gray-400"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="status">Status</label><br />
                            <select
                                id="status"
                                className="border rounded text-gray-400"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Any">Any</option>
                                <option value="Complete">completed</option>
                                <option value="Credit">credit</option>
                                <option value="Part">part Payment</option>
                            </select>
                        </div>
                    </form>
                    <img src={HeadImage} alt="" className="absolute right-9 top-6" />
                </div>

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

                {/* Table Header */}
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

                {/* Table Rows */}
                {currentInvoices.map(invoice => (
                    <div key={invoice.id} className="invoice-row flex items-center p-3 border-2 mb-5 rounded-lg border-gray-200">
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
                            <button
                                className="view-btn bg-blue-500 text-white px-4 py-2 rounded-lg"
                                onClick={() => handleClick(invoice)}
                            >
                                View
                            </button>
                        </div>
                    </div>
                ))}

                {/* Pagination */}
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
            </div>
        </>
    );
};

export default Table;
