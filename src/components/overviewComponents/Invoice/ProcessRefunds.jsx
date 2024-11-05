// In your Refund component
import React from "react";
import VectorBG from '../../../../src/assets/Vector18.svg'
import Table from './DataTable';
import { BanknotesIcon, PrinterIcon } from "@heroicons/react/24/outline";

const Refund = ({ tab, setTab, products, selectedCount, selectedRows, setSelectedCount, setSelectedRows, selectedInvoice }) => { // Accept selectedInvoice
    let refundAmount = 0;

    products.filter(product => selectedRows.includes(product.NO)).map((product) => {
        refundAmount += product.sell * product.quantity;
    });

    return (
        <>
            <div className="bg-blue-500 relative grid lg:grid-cols-4 overflow-hidden w-full h-full rounded-lg text-white bg-right bg-no-repeat px-10 py-5" style={{ backgroundImage: `url(${VectorBG})`, position: 'relative' }}>
                {/* Display selected invoice information */}
                {selectedInvoice && ( // Check if selectedInvoice exists
                    <div className="h-full flex flex-col justify-center border-r-2 p-4 w-full">
                        <p className="text-xs bg-yellow-100 w-1/2 text-center px-1 py-1 text-blue-900 font-semibold rounded-full">Part Payment</p>
                        <h1 className="text-2xl font-semibold">{selectedInvoice.customerName}</h1> {/* Assuming you have customerName in selectedInvoice */}
                        <p className="text-xs">INVOICE NUMBER: #{selectedInvoice.invoiceNumber}</p> {/* Assuming you have invoiceNumber */}
                        <p className="text-xs">{selectedInvoice.address}</p> {/* Assuming you have address */}
                    </div>
                )}
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

            <Table products={products} selectedRows={selectedRows} tab={tab} selectedCount={selectedCount} />

            <button className="w-1/4 pt-2 rounded bg-blue-500 text-white flex justify-center gap-3 text-normal h-10 align-center mt-2 font-semibold"><BanknotesIcon height="20px" />
                Refund NGN{refundAmount}
            </button>
        </>
    )
}

export default Refund;
