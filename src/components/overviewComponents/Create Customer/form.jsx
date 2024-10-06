import React, { useState } from 'react';

const EmptyForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        gender: '',
        location: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const isFormValid = Object.values(formData).every((field) => field.trim() !== '');

    return (
        <form className="flex align-center justify-center flex-col gap-4 w-2/3 ml-40">
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

            {isFormValid ? <button
                className="p-3 bg-blue-600 w-full border rounded-lg mt-9 text-white"
                disabled={!isFormValid}
            >
                Create Customer
            </button> :
                <button
                    className="p-3 bg-gray-300 w-full border rounded-lg mt-9 text-white"
                    disabled={!isFormValid}
                >
                    Create Customer
                </button>}
        </form>
    );
};

export default EmptyForm;
