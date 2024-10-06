import React from "react";
import { TrashIcon } from '@heroicons/react/24/solid';
const Table = () => {
    const products = [{

        name: "Paracetamol",
        quantity: 200,
        quantitysold: 183,
        expiring: '15/10/2025',
        tcp: 100000,
        totalRev: 1000000
    }, {

        name: "Paracetamol",
        quantity: 200,
        quantitysold: 183,
        expiring: '15/10/2025',
        tcp: 100000,
        totalRev: 1000000
    }, {

        name: "Paracetamol",
        quantity: 200,
        quantitysold: 183,
        expiring: '15/10/2025',
        tcp: 100000,
        totalRev: 1000000
    }, {

        name: "Paracetamol",
        quantity: 200,
        quantitysold: 183,
        expiring: '15/10/2025',
        tcp: 100000,
        totalRev: 1000000
    }, {

        name: "Paracetamol",
        quantity: 200,
        quantitysold: 183,
        expiring: '15/10/2025',
        tcp: 100000,
        totalRev: 1000000
    }, {

        name: "Paracetamol",
        quantity: 200,
        quantitysold: 183,
        expiring: '15/10/2025',
        tcp: 100000,
        totalRev: 1000000
    }, {

        name: "Paracetamol",
        quantity: 200,
        quantitysold: 183,
        expiring: '15/10/2025',
        tcp: 100000,
        totalRev: 1000000
    }]
    const cols = ['N/O', 'Product Name', 'Quantity Stocked', "Quantity Sold", "Expiring Date", 'Total Cost Price', 'Total Revenue'];
    return (
        <>
            <table className="w-full p-8 border-collapse border-y">
                <thead className="bg-customColor">
                    <tr>
                        {cols.map((col) => (
                            <th key={col} className="p-3 text-gray-300 text-left font-normal">{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr className="p-9 border-x" key={index}>
                            <td className="p-3 border-x" >{index + 1}</td>
                            <td className="p-3 border-x" >{product.name}</td>
                            <td className="p-3 border-x" >{product.quantity}</td>
                            <td className="p-3 border-x" >{product.quantitysold}</td>
                            <td className="p-3 border-x" >{product.expiring}</td>
                            <td className="p-3 border-x" >{product.tcp}</td>
                            <td className="flex justify-around align-center pt-3">{product.totalRev} <div className="bg-red-200 p-2 rounded-full"><TrashIcon className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-700" /></div></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default Table;