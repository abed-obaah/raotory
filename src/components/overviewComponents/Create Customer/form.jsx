import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext'; // Import your AuthContext
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify styles

const EmptyForm = ({ onSuccess }) => {
    const { user } = useAuth(); // Get the current user's info from context
    const userEmail = user?.email; // Extract the email from the authenticated user

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        gender: '',
        location: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormValid) {
            try {
                setIsSubmitting(true);

                // Send the form data to the PHP script
                const response = await axios.post('https://raotory.com.ng/apis/create_customer.php', {
                    ...formData,
                    created_by: userEmail // Use userEmail from the AuthContext
                });

                // Display success toast message
                toast.success(response.data.message || 'Customer created successfully');
                
                // Redirect back to the table page
                onSuccess();

            } catch (error) {
                // Display error toast message
                toast.error('Failed to create customer');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const isFormValid = Object.values(formData).every((field) => field.trim() !== '');

    return (
        <div>
            {/* Toast container to display notifications */}
            <ToastContainer />
            
            <form onSubmit={handleSubmit} className="flex align-center justify-center flex-col gap-4 w-2/3 ml-40">
                <input
                    type="text"
                    name="name"
                    className="border w-full p-4 rounded-lg"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="tel"
                    name="phone"
                    className="border w-full p-4 rounded-lg"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="gender"
                    className="border w-full p-4 rounded-lg"
                    placeholder="Gender"
                    value={formData.gender}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="location"
                    className="border w-full p-4 rounded-lg"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                />

                {isFormValid ? (
                    <button
                        type="submit"
                        className={`p-3 ${isSubmitting ? 'bg-gray-300' : 'bg-[#0E90DA]'} w-full border rounded-lg mt-9 text-white`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Create Customer'}
                    </button>
                ) : (
                    <button
                        type="button"
                        className="p-3 bg-gray-300 w-full border rounded-lg mt-9 text-white"
                        disabled
                    >
                        Create Customer
                    </button>
                )}
            </form>
        </div>
    );
};

export default EmptyForm;
