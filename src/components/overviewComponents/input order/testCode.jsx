import React, { useEffect, useState } from "react";
import Table from './TableComp';
import { useAuth } from '../../../context/AuthContext'; 
import axios from 'axios';
import VectorBG from '../../../../src/assets/Vector 18.svg';
// import { useAuth } from '../../../context/AuthContext';
import { PaystackButton } from 'react-paystack';

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
    // const isButtonActive = store.length > 0 && location.length > 0 && phone.length > 0;

    const publicKey = "pk_live_348fc3edc9f2f95fd5ff5b21fcf28b52ff590d86";
    const [email, setEmail] = useState("");
    // const [name, setName] = useState("");
    // const [phone, setPhone] = useState("");
    // const [store, setStore] = useState("");
    // const [location, setLocation] = useState("");
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false); // State to track payment success
   


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
            const response = await axios.get('https://raotory.com.ng/apis/fetch_users.php', {
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
            const response = await fetch(`https://raotory.com.ng/apis/inventory.php?email=${userEmail}`);
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
    const handleClick = () => {
        if (tab === 'input') {
            calculateTotalPrice();
            setTab('Pay');
        } else if (tab === 'Pay') {
            setTab('invoice');
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


    const componentProps = {
        email:user.email,
        amount: totalPrice * 100, // Ensure amount is in kobo
        publicKey,
        text: " Issue Invoice",
        onSuccess: async () => {
          // Call the PHP script to store the payment information
        //   const response = await fetch('https://raotory.com.ng/apis/store_payment.php', { // Update with your PHP script path
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     body: new URLSearchParams({
        //       email,
        //       store_name: storeName,
        //       location,
        //       number_of_items: numberOfItems,
        //     }), // Send additional data as form data
        //   });
    
        //   const data = await response.json();
        //   if (data.success) {
        //     alert(data.message); // Notify the user
        //     setIsPaymentSuccessful(true); // Set payment success state
        //   } else {
        //     alert(data.message || 'An error occurred.');
        //   }
        alert("order made!")
        },
        onClose: () => alert("You need to complete your payment!"),
      };


    // Input page
    const inputPage = () => (
        <div>
            <form>
                {error && <p className="text-red-500">{error}</p>}
                <select
                    value={selectedCustomer}
                    onChange={handleSelectChange}
                    className="h-10 border p-2 w-3/5 rounded-lg"
                    placeholder="Select Customer"
                >
                    <option value="" disabled>Select Customer</option>
                    {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name}
                        </option>
                    ))}
                </select>
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
                 className="h-5 border p-7 w-1/2 rounded-lg"
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
            <PaystackButton
                    className={`flex w-full justify-center rounded-md px-10 py-4 text-sm font-semibold leading-6 text-white shadow-sm bg-[#0E90DA] hover:bg-[#0E90DA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E90DA]`}
                    {...componentProps}
                />

            {/* <button className="border absolute bottom-0 rounded-lg mt-5 p-3 align-items bg-blue-500 text-white" style={{ width: '100%' }} onClick={handleClick}>
                Issue Invoice
            </button> */}
        </div>
    );

    // Send Invoice page
    const sendInvoice = () => (
        <>
            <div className="bg-blue-500 flex justify-between align-center w-full h-full rounded-lg p-8 text-white bg-right bg-no-repeat" style={{ backgroundImage: `url(${VectorBG})` }}>
                <div className="right">
                    <h2 className="text-4xl font-semibold">Okeme Izu</h2>
                    <p className="text-xs mt-2 font-normal">INVOICE NUMBER: #234650</p>
                    <p className="text-xs mt-1 font-normal">Abraka, Delta State</p>
                </div>
                <div className="left mr-12 mt-1 font-semibold">
                    <p>Grand Total</p>
                    <h2 className="text-4xl">NGN1,645,680</h2>
                </div>
            </div>
            <button className="w-1/3 border rounded-lg mt-5 p-3 align-items bg-blue-500 text-white" onClick={handleClick}>Print Invoice</button>
        </>
    );

    return (
        <div>
            {tab === 'input' && inputPage()}
            {tab === 'Pay' && payPage()}
            {tab === 'invoice' && sendInvoice()}
        </div>
    );
};

export default InputOrder;
