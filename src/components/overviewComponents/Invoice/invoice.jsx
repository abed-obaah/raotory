import React, { useState } from "react";
import VectorBG from '../../../../src/assets/Vector 18.svg';
import HeadImage from '../../../../src/assets/imager.svg';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Table from './table';
import Data from './Data';
import Refund from './ProcessRefunds';

const Invoice = () => {
    const [tab, setTab] = useState('All');
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [selectedCount, setSelectedCount] = useState(0);
    const [selectedRows, setSelectedRows] = useState([]);

    // Sample products array
    const products = [
        { NO: 1, name: 'Paracetamol', cost: 5000, sell: 400000, quantity: 120 },
        { NO: 2, name: 'Ibuprofen', cost: 3000, sell: 250000, quantity: 80 },
        { NO: 3, name: 'Aspirin', cost: 1000, sell: 150000, quantity: 200 },
        { NO: 4, name: 'Cetirizine', cost: 2500, sell: 200000, quantity: 60 },
        { NO: 5, name: 'Loratadine', cost: 1500, sell: 180000, quantity: 90 },
        { NO: 6, name: 'Diphenhydramine', cost: 2000, sell: 220000, quantity: 70 }
    ];

    const All = () => {
        return (
            <>
                <div className="bg-blue-500 relative justify-between align-center overflow-hidden w-full h-full rounded-lg p-7 text-white bg-right bg-no-repeat" style={{ backgroundImage: `url(${VectorBG})` }}>
                    <h1 className="text-2xl pb-7">All Invoices</h1>
                    <form className="flex gap-3 text-gray-400-500">
                        <div className="item">
                            <label htmlFor="">Begin Date</label><br />
                            <input type="date" className="border rounded text-gray-400" />
                        </div>
                        <div className="item">
                            <label htmlFor="">End Date</label><br />
                            <input type="date" className="border rounded text-gray-400" />
                        </div>
                        <div className="item">
                            <label htmlFor="">Status</label><br />
                            <select className="border rounded text-gray-400">
                                <option value="Any" selected>Any</option>
                                <option value="Complete">Complete</option>
                                <option value="Credit">Credit</option>
                                <option value="Part Payment">Part Payment</option>
                            </select>
                        </div>
                    </form>
                    <img src={HeadImage} alt="" className="absolute right-9 top-6" />
                </div>
                <div className="flex items-center mt-5">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 absolute ml-2" />
                    <input
                        type="text"
                        className="w-full border rounded-lg p-3 pl-10"
                        placeholder="Search by customer name"
                        style={{ backgroundColor: 'white', color: 'black' }}
                    />
                </div>
                <Table tab={tab} setTab={setTab} setSelectedInvoice={setSelectedInvoice} />
            </>
        );
    };

    switch (tab) {
        case 'All':
            return All();
        case "Data":
            return <Data tab={tab} setTab={setTab} products={products} selectedCount={selectedCount} setSelectedCount={setSelectedCount} selectedRows={selectedRows} setSelectedRows={setSelectedRows} selectedInvoice={selectedInvoice} />;
        case 'Refund':
            return <Refund tab={tab} setTab={setTab} products={products} selectedCount={selectedCount} setSelectedCount={setSelectedCount} selectedRows={selectedRows} setSelectedRows={setSelectedRows} setSelectedInvoice={setSelectedInvoice} />;
    }
};

export default Invoice;
