import React, { useState } from "react";
import VectorBG from '../../../../src/assets/Vector 18.svg';
import { BanknotesIcon, PrinterIcon, MagnifyingGlassIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const Settings = () => {
    // State to manage editable fields
    const [isEditableName, setIsEditableName] = useState(false);
    const [isEditablePharmacyName, setIsEditablePharmacyName] = useState(false);
    const [isEditablePhoneNumber, setIsEditablePhoneNumber] = useState(false);
    const [isEditableEmail, setIsEditableEmail] = useState(false);
    const [isEditablePassword, setIsEditablePassword] = useState(false);
    const [name, setName] = useState('Amala Ewedu');
    const [pharmacyName, setPharmacyName] = useState('Amala Pharmacy');
    const [phoneNumber, setPhoneNumber] = useState('+234 8234042938');
    const [email, setEmail] = useState('amala@example.com');
    const [password, setPassword] = useState('password');

    return (
        <>
            <div className="flex items-center mb-5">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 absolute ml-2" />
                <input
                    type="text"
                    className="w-full border rounded-lg p-3 pl-10"
                    placeholder="Search Settings"
                    style={{ backgroundColor: 'white', color: 'black ' }}
                />
            </div>

            <form action="" className="border p-5 rounded mt-9 text-gray-400">
                <h2 className="font-xs mb-6 text-gray-400">Personal Information</h2>

                <label htmlFor="">Name</label>
                <div className="flex relative items-center mb-5 w-auto">
                    <PencilSquareIcon
                        className="h-7 w-7 text-blue-600 bg-blue-200 p-1 rounded-full absolute right-7 cursor-pointer"
                        onClick={() => setIsEditableName((prev) => !prev)}
                    />
                    <input
                        type="text"
                        className="w-full border rounded-lg p-3 pl-4"
                        placeholder="Amala Ewedu"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        readOnly={!isEditableName}
                        style={{ backgroundColor: 'white', color: 'darkblue' }}
                    />
                </div>

                <label htmlFor="">Pharmacy Name</label>
                <div className="flex relative items-center mb-5 w-auto">
                    <PencilSquareIcon
                        className="h-7 w-7 text-blue-600 bg-blue-200 p-1 rounded-full absolute right-7 cursor-pointer"
                        onClick={() => setIsEditablePharmacyName((prev) => !prev)}
                    />
                    <input
                        type="text"
                        className="w-full border rounded-lg p-3 pl-4"
                        placeholder="Amala Pharmacy"
                        value={pharmacyName}
                        onChange={(e) => setPharmacyName(e.target.value)}
                        readOnly={!isEditablePharmacyName}
                        style={{ backgroundColor: 'white', color: 'darkblue' }}
                    />
                </div>

                <label htmlFor="">Phone Number</label>
                <div className="flex relative items-center mb-5 w-auto">
                    <PencilSquareIcon
                        className="h-7 w-7 text-blue-600 bg-blue-200 p-1 rounded-full absolute right-7 cursor-pointer"
                        onClick={() => setIsEditablePhoneNumber((prev) => !prev)}
                    />
                    <input
                        type="text"
                        className="w-full border rounded-lg p-3 pl-4"
                        placeholder="+234 8234042938"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        readOnly={!isEditablePhoneNumber}
                        style={{ backgroundColor: 'white', color: 'darkblue' }}
                    />
                </div>

                <label htmlFor="">Email</label>
                <div className="flex relative items-center mb-5 w-auto">
                    <p className="h-7  w-1/7 text-xs font-semibold rounded text-blue-600  absolute right-7 cursor-pointer" onClick={() => {
                        alert('Request for change of email has been sent')
                    }}>
                        Request for Change
                    </p>
                    <input
                        type="email"
                        className="w-full border rounded-lg p-3 pl-4"
                        placeholder="amala@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly={!isEditableEmail}
                        style={{ backgroundColor: 'white', color: 'darkblue' }}
                    />
                </div>
            </form>
            <div className="border rounded-lg p-8 text-gray-400 mt-8 w-full">
                <label htmlFor="">Password</label>
                <div className="flex relative items-center mb-5 w-auto">
                    <p className="h-7  w-1/7 text-xs font-semibold rounded text-blue-600  absolute right-7 cursor-pointer" onClick={() => {
                        alert('Request for change of password has been sent')
                    }}>
                        Request for Change
                    </p>
                    <input
                        type="password"
                        className="w-full border rounded-lg p-3 pl-4"
                        placeholder="amala@example.com"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        readOnly={!isEditablePassword}
                        style={{ backgroundColor: 'white', color: 'darkblue' }}
                    />
                </div>
            </div>
        </>
    );
};

export default Settings;