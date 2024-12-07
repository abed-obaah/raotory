import React, { useEffect, useState } from "react";
import Table from './TableComp';
import Table1 from './tablev1';
import { useAuth } from '../../../context/AuthContext'; 
import axios from 'axios';
import VectorBG from '../../../../src/assets/Vector18.svg';

const InputOrder = () => {
    const { user } = useAuth();
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [tab, setTab] = useState('input');
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [tableInfo, setTableInfo] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedPaymentType, setSelectedPaymentType] = useState('');

    const paymentTypes = [
        { id: 1, name: 'Card Payment' },
        { id: 2, name: 'Bank Transfer' },
        { id: 3, name: 'Mobile Money' },
        { id: 4, name: 'USSD' },
    ];

    const userEmail = user?.email;

    // Fetch customers
    const fetchCustomers = async () => {
        try {
            const response = await axios.get('https://raotory.com/apis/fetch_users.php', {
                params: { email: userEmail },
            });
            setCustomers(response.data.users);
        } catch (err) {
            console.error(err);
            setError('Error fetching customers');
        }
    };

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`https://raotory.com/apis/inventory.php?email=${userEmail}`);
            const data = await response.json();
            if (!data.error) {
                setTotalProducts(data.totalDrugs);
                setProducts(data.drugs);
            }
        };
        fetchProducts();
    }, [userEmail]);

    useEffect(() => {
        if (userEmail) {
            fetchCustomers();
        }
    }, [userEmail]);

    // Handle payment type change
    const handlePaymentTypeChange = (e) => {
        setSelectedPaymentType(e.target.value);
    };

    // Function to calculate total price
    const calculateTotalPrice = () => {
        const total = tableInfo.reduce((sum, item) => sum + item.SellPrice * item.Quantity, 0);
        setTotalPrice(total);
    };

    // Handle product change
    const handleProductChange = (e) => {
        const selectedId = e.target.value;
        setSelectedProduct(selectedId);
        const product = products.find((p) => p.id === Number(selectedId));
        if (product) {
            setPrice(product.retail_price);
        } else {
            setPrice('');
        }
    };

    // Add product to table
    const addProductToTable = () => {
        const product = products.find((p) => p.id === Number(selectedProduct));
        if (product) {
            const newEntry = {
                N0: tableInfo.length + 1,
                Productname: product.product_name,
                CostPrice: product.purchase_price,
                SellPrice: product.retail_price,
                Quantity: quantity,
            };
            setTableInfo([...tableInfo, newEntry]);
            setSelectedProduct('');
            setQuantity(1);
        }
    };

    // Handle Make Payment
    const handleClick = async (e) => {
        e.preventDefault();
    
        if (tab === 'input') {
            calculateTotalPrice();
            setTab('Pay');
        } else if (tab === 'Pay') {
            // Prepare the data
            const customer = customers.find(c => c.id === Number(selectedCustomer));
            const products = tableInfo.map(item => ({
                Productname: item.Productname,
                Quantity: item.Quantity,
                SellPrice: item.SellPrice,
            }));
    
            const payload = {
                customer_name: selectedCustomer || '', // Assuming the customer object has an email
                store_email: user?.email || '', // Assuming the customer object has an email
                products,
                total_price: totalPrice,
                payment_type: selectedPaymentType,
            };
    
            if (!payload.customer_email || !payload.products.length || !payload.total_price || !payload.payment_type) {
                setError('All fields are required');
                return;
            }
    
            try {
                // Make the POST request to your PHP endpoint
                const response = await axios.post('https://raotory.com/apis/create_sale.php', payload, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                // Check the response from the backend
                if (response.data.success) {
                    alert(`Invoice issued successfully with Sale ID: ${response.data.sale_id}`);
                    setError('');
                    // Navigate to the 'invoice' tab only if the API call is successful
                    setTab('invoice');
                } else {
                    setError(response.data.error || 'An error occurred');
                }
            } catch (error) {
                setError('Failed to send data to the server: ' + error.message);
            }


            if (!selectedCustomer || !selectedPaymentType || tableInfo.length === 0 || totalPrice <= 0) {
                setError("All fields are required");
                return;
            }
        
            const orderData = {
                customer_name: customers.find(c => c.id === Number(selectedCustomer))?.name,
                store_email: user?.email, // Replace with actual store email if needed
                products: tableInfo.map(item => ({
                    Productname: item.Productname,
                    Quantity: item.Quantity,
                    SellPrice: item.SellPrice,
                })),
                total_price: totalPrice,
                payment_type: selectedPaymentType,
            };
        
            try {
                const response = await fetch('https://raotory.com/apis/create_sale.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData),
                });
        
                const result = await response.json();
                if (result.error) {
                    setError(result.error);
                } else {
                    // Handle success
                    console.log("Invoice issued successfully", result);
                     setTab('invoice');
                }
            } catch (error) {
                setError("An error occurred: " + error.message);
            }
        } else if (tab === 'invoice') {
            setTab('input');
        }
    };
    

    const handleSelectChange = (e) => {
        const selectedId = e.target.value;
        setSelectedCustomer(selectedId);
        const selectedCustomerObject = customers.find(c => c.id === Number(selectedId));
        console.log('Selected Customer Name:', selectedCustomerObject?.name);
    };


    

    // Input page
    const inputPage = ({ customers, products, error, addProductToTable, tableInfo, setTableInfo }) => {
        const [dropdownVisible, setDropdownVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filterCustomers = () => {
        if (!searchTerm) return customers;
        return customers.filter(customer =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <form>
                {error && <p className="text-red-500">{error}</p>}
                <div className="relative inline-block text-left dropdown">
    <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dropbtn"
    >
        {selectedCustomer || "Select Customer"}
        <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
        >
            <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06 0l4.47 4.47 4.47-4.47a.75.75 0 111.06 1.06l-5 5a.75.75 0 01-1.06 0l-5-5a.75.75 0 010-1.06z"
                clipRule="evenodd"
            />
        </svg>
    </button>
    
    {dropdownVisible && (
        <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg dropdown-content">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchInputChange}
                className="block w-full rounded-md border border-gray-300 p-2 mb-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {filterCustomers().map(customer => (
                <div
                    key={customer.id}
                    onClick={() => {
                        setSelectedCustomer(customer.name);
                        setDropdownVisible(false);
                        setSearchTerm(''); // Clear search on selection
                    }}
                    className="cursor-pointer select-none relative p-2 hover:bg-indigo-600 hover:text-white dropdown-item"
                >
                    {customer.name}
                </div>
            ))}
        </div>
    )}
</div>
                
                <div className="binput flex mt-10 r-0">
                    <select
                        value={selectedProduct}
                        onChange={handleProductChange}
                        className="h-10 border p-2 w-3/5 rounded-lg"
                    >
                        <option value="" disabled>Select Product</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.product_name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={price}
                        placeholder="Price Type"
                        className="h-5 border p-7 w-2/6 ml-4 rounded-lg"
                        readOnly
                    />
                    <button type="button" onClick={addProductToTable} className="ml-2 bg-blue-500 text-white rounded p-2">Add</button>
                </div>
            </form>
            <Table tab="input" tableInfo={tableInfo} setTableInfo={setTableInfo} />
            <button className="w-full border rounded-lg mt-5 p-3 align-items bg-blue-500 text-white" onClick={handleClick}>
                Make Payment
            </button>
        </div>
    );
}

    // Pay page
    const payPage = () => (
        <div className="relative w-full" style={{ height: "80vh" }}>
            <form>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="text"
                    value={
                        selectedCustomer 
                            ? customers.find(c => c.id === Number(selectedCustomer))?.name || '' 
                            : ''
                    }
                    placeholder="Selected Customer"
                    className="h-5 border p-7 w-full rounded-lg"
                    readOnly
                />
                <input
                    type="text"
                    value={tableInfo.map(item => item.Productname).join(', ')}
                    placeholder="Selected Products"
                    className="h-5 border p-7 w-full mt-5 rounded-lg"
                    readOnly
                />
                <input
                        type="text"
                        value={tableInfo.map(item => item.Quantity).join(', ')}
                        placeholder="Amount"
                        className="h-5 border p-7 w-full mt-5 rounded-lg"
                        readOnly
                    />
                <div className="btm flex mt-10">
                <select
                value={selectedPaymentType} // Ensure this is a string that matches the option values
                onChange={(e) => {
                    console.log('Selected payment type:', e.target.value); // Debug log
                    setSelectedPaymentType(e.target.value);
                }}
                className="h-10 border p-2 w-3/5 rounded-lg"
            >
                <option value="" disabled>Select Payment Type</option>
                {paymentTypes.map(payment => (
                    <option key={payment.id} value={payment.name}>
                        {payment.name}
                    </option>
                ))}
            </select>
                    <input
                        type="text"
                        value={totalPrice}
                        placeholder="Amount"
                        className="h-5 border p-7 w-1/2 rounded-lg"
                        readOnly
                    />
                </div>
            </form>
            <button className="border absolute bottom-0 rounded-lg mt-5 p-3 align-items bg-blue-500 text-white" style={{ width: '100%' }} onClick={handleClick}>
                Issue Invoice
            </button>
        </div>
    );

    // Send Invoice page
    const sendInvoice = () => (
        <>
            <div className="bg-blue-500 flex justify-between align-center w-full h-full rounded-lg p-8 text-white bg-right bg-no-repeat" style={{ backgroundImage: `url(${VectorBG})` }}>
                <div className="right">
                    <h2 className="text-4xl font-semibold">{
                        selectedCustomer 
                            ? customers.find(c => c.id === Number(selectedCustomer))?.name || '' 
                            : ''
                    }</h2>
                    
                 
              
                {/* <input
                    type="text"
                    value={tableInfo.map(item => item.Productname).join(', ')}
                    placeholder="Selected Products"
                    className="h-5 border p-7 w-full mt-5 rounded-lg"
                    readOnly
                /> */}
                    <p className="text-xs mt-2 font-normal">INVOICE NUMBER: #234650</p>
                    <p className="text-xs mt-1 font-normal">Abraka, Delta State</p>
                </div>
                <div className="left mr-12 mt-1 font-semibold">
                    <p>Grand Total</p>
                    <h2 className="text-4xl">NGN{totalPrice}</h2>
                </div>
            </div>
            <Table1 tab="input" tableInfo={tableInfo} setTableInfo={setTableInfo} />
            <button className="w-1/3 border rounded-lg mt-5 p-3 align-items bg-blue-500 text-white" onClick={handleClick}>Print Invoice</button>
        </>
    );

    return (
        <div>
           {tab === 'input' && inputPage({ customers, products, error, addProductToTable, tableInfo, setTableInfo })}
            {tab === 'Pay' && payPage()}
            {tab === 'invoice' && sendInvoice()}
        </div>
    );
};

export default InputOrder;
