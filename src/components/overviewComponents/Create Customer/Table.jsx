import React, { useEffect, useState } from "react";
import { TrashIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext'; 
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Table = () => {
    const { user } = useAuth();
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('https://raotory.com.ng/apis/fetch_users.php', {
                params: { email: user?.email },
            });
            setCustomers(response.data.users);
            
        } catch (err) {
            console.error(err);
            setError('Error fetching customers');
        }
    };

    // const deleteCustomer = async (id) => {
    //     try {
    //         await axios.delete(`https://raotory.com.ng/apis/delete_user.php?id=${id}`);
    //         fetchCustomers();
    //     } catch (err) {
    //         console.error(err);
    //         setError('Error deleting customer');
    //     }
    // };

    const deleteCustomer = async (id) => {
        try {
          await axios.delete(`https://raotory.com.ng/apis/delete_user.php?id=${id}`);
          fetchCustomers();
          toast.success('Customer deleted successfully!'); // Show success toast on customer deletion
        } catch (err) {
          console.error(err);
          setError('Error deleting customer');
          toast.error('Failed to delete customer. Please try again.'); // Show error toast on deletion failure
        }
      };




    const updateCustomer = async () => {
        try {
            const response = await axios.put('https://raotory.com.ng/apis/update_user.php', selectedCustomer);
            console.log(response.data);  // Log the full response
            if (response.data.message) {
                alert(response.data.message); // Show a success message
            }
            fetchCustomers(); // Fetch updated customer list
            setOpen(false); // Close the dialog
        } catch (err) {
            console.error(err);
            setError('Error updating customer');
        }
    };
    

    const handleModify = (customer) => {
        setSelectedCustomer(customer); 
        setOpen(true); 
    };

    useEffect(() => {
        if (user?.email) {
            fetchCustomers();
        }
    }, [user]);

    const cols = ['Customer Name', 'Phone Number', "Gender", "Location"];

    return (
        <div>
            <ToastContainer />
            {error && <p className="text-red-500">{error}</p>}
            <table className="w-full p-8 border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        {cols.map((col) => (
                            <th key={col} className="p-3 text-gray-400 text-left">{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {customers.length > 0 ? (
                        customers.map((person, index) => (
                            <tr key={index} className="mb-4">
                                <td className="p-3 bg-white">{person.name}</td>
                                <td className="p-3 bg-white">{person.phone}</td>
                                <td className="p-3 bg-white">
                                    {person.gender === 'male' ? (
                                        <p className="icon bg-blue-100 text-blue-900 font-bold text-center flex justify-center items-center h-8 w-8 rounded-full">M</p>
                                    ) : (
                                        <p className="icon bg-gray-100 text-blue-900 font-bold text-center flex justify-center items-center h-8 w-8 rounded-full">F</p>
                                    )}
                                </td>
                                <td className="p-3 flex bg-white">
                                    {person.location}
                                    <div className="btns flex w-1/2 ml-20 space-x-10">
                                        <button
                                            className="bg-[#0E90DA] p-1 text-white w-full rounded-lg ml-5"
                                            onClick={() => handleModify(person)} 
                                        >
                                            Modify
                                        </button>
                                        <div className="bg-red-200 p-2 ml-5 rounded-full">
                                            <TrashIcon
                                                className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-700"
                                                onClick={() => deleteCustomer(person.id)} 
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={cols.length} className="p-3 text-center bg-white">No customers found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {selectedCustomer && (
                <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                    />
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <DialogPanel
                                transition
                                className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                            >
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-[#0E90DA]" />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            Modify User
                                        </DialogTitle>
                                        <form className="mt-2">
                                            <div className="mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                                <input
                                                    type="text"
                                                    value={selectedCustomer.name}
                                                    onChange={(e) => setSelectedCustomer({ ...selectedCustomer, name: e.target.value })}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                                <input
                                                    type="text"
                                                    value={selectedCustomer.number}
                                                    onChange={(e) => setSelectedCustomer({ ...selectedCustomer, number: e.target.value })}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Location</label>
                                                <input
                                                    type="text"
                                                    value={selectedCustomer.location}
                                                    onChange={(e) => setSelectedCustomer({ ...selectedCustomer, location: e.target.value })}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-sm font-medium text-gray-700">Gender</label>
                                                <select
                                                    value={selectedCustomer.gender}
                                                    onChange={(e) => setSelectedCustomer({ ...selectedCustomer, gender: e.target.value })}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                >
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                </select>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-[#0E90DA] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#0E90DA] focus:ring-offset-2 sm:text-sm"
                                        onClick={updateCustomer} // Call update function here
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-2 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0E90DA] focus:ring-offset-2 sm:text-sm"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            )}
        </div>
    );
};

export default Table;
