import React, { useState } from "react";
import Table from './Table';
import Form from './form';
import { toast } from 'react-toastify'; // Import the toast from react-toastify

const CreateCustomerComponent = () => {
    const [tab, setTab] = useState('table');

    // Handle the button click to switch to the form
    const handleClick = () => {
        if (tab === 'table') {
            setTab('create');
        }
    };

    // Function to handle what happens on successful customer creation
    const handleSuccess = () => {
        // Show the success toast
        toast.success('Customer created successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        
        // Switch back to the table view
        setTab('table');
    };

    // Render the customer page with the table and the create button
    const customerPage = () => {
        return (
            <>
                <div className="flex justify-between mb-9 w-full">
                    <form action="" className="w-1/3">
                        <input
                            type="text"
                            className="border p-3 rounded-lg w-full"
                            placeholder="Search Customer"
                        />
                    </form>
                    <button
                        className="bg-[#0E90DA] p-3 rounded-lg text-white w-1/4"
                        onClick={handleClick}
                    >
                        Create Customer
                    </button>
                </div>
                <Table />
            </>
        );
    };

    // Switch between the table view and the form view
    switch (tab) {
        case 'table':
            return customerPage();
        case 'create':
            return (
                <Form
                    // Pass the handleSuccess function as the onSuccess prop
                    onSuccess={handleSuccess}
                />
            );
        default:
            return null;
    }
};

export default CreateCustomerComponent;
