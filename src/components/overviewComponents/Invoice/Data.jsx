import React, { useState } from "react";
import VectorBG from '../../../../src/assets/Vector 18.svg'
import Table from './DataTable';
import { BanknotesIcon, PrinterIcon } from "@heroicons/react/24/outline";

const Data = ({ tab, setTab, products, selectedCount, selectedRows, setSelectedCount, setSelectedRows }) => {
    const handlePrint = () => {
        alert('Print button has been clicked');
    }

    const handleRowSelection = (count) => {
        setSelectedCount(count);
    }
    const handleProcessClick = () => {
        if (selectedRows.length > 0) {
            // setSelectedCount // Pass selected rows to the parent component


            setTab('Refund');

        } else {
            alert('No items selected for refund');
        }
    };
    return (
        <>
            <div className="bg-blue-500 relative grid lg:grid-cols-4 overflow-hidden w-full h-full rounded-lg text-white bg-right bg-no-repeat px-10 py-5" style={{ backgroundImage: `url(${VectorBG})`, position: 'relative' }}>
                <div className="h-full flex flex-col justify-center border-r-2 p-4 w-full">
                    <p className="text-xs bg-yellow-100 w-1/2 text-center px-1 py-1 text-blue-900 font-semibold rounded-full">Part Payment</p>
                    <h1 className="text-2xl font-semibold">Jeremaih Omonefe</h1>
                    <p className="text-xs">INVOICE NUMBER: #234650</p>
                    <p className="text-xs">Abraka, Delta State</p>
                </div>
                <div className="h-full flex flex-col justify-center border-r-2 pl-4 w-full">
                    <p>Grand Total</p>
                    <p className="text-2xl font-semibold">NGN1,000,000</p>
                </div>
                <div className="h-full flex flex-col justify-center border-r-2 pl-4 w-full">
                    <p>Paid</p>
                    <p className="text-2xl font-semibold">NGN500,000</p>
                </div>
                <div className="h-full flex flex-col justify-center pl-4 w-full">
                    <p>Outstanding</p>
                    <p className="text-2xl font-semibold">-NGN500,000</p>
                    <button className="w-1/2 pt-1 rounded bg-white text-blue-500 flex justify-around text-xs h-6 align-center mt-4 font-semibold">
                        <BanknotesIcon height="20px" />Confirm Payment
                    </button>
                </div>
            </div>
            <Table onRowSelection={handleRowSelection} products={products} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
            <div className="mt-4 text-left ml-4">
                {selectedCount > 0 && (
                    <p className="text-xs font-semibold">{selectedCount} items selected for refund</p>
                )}
            </div>
            <button className="w-1/4 pt-2 rounded bg-blue-500 text-white flex justify-center gap-3 text-normal h-10 align-center mt-2 font-semibold" onClick={handleProcessClick}><BanknotesIcon height="20px" />
                {selectedCount > 0 ? "Process Refunds" : "Make A Refund"}
            </button>
            <button className="bg-blue-300 p-2 absolute right-10 bottom-10 rounded-full" onClick={handlePrint}>
                <PrinterIcon height="20px" stroke="blue" />
            </button>
        </>
    )
}

export default Data;
