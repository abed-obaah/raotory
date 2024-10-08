import React, { useState, useEffect } from "react";
import { BanknotesIcon, PrinterIcon } from "@heroicons/react/24/outline";

const Table = ({ onRowSelection, selectedCount, selectedRows, setSelectedRows, products, tab, setSelectedCount, onProcessRefunds }) => {
    const thead = ['N/O', "Product Name", "Cost Price", 'Selling Price', 'Quantity', "Total"];



    if (tab === 'Refund') {

        return (
            <>
                <p className="mt-9">{selectedCount} Products Selected</p>
                <table className=" text-gray-600 w-full">
                    <thead className="bg-gray-300 text-gray-600">
                        <tr>
                            {thead.map((Col) => (
                                <th
                                    key={Col}
                                    className={`border font-normal p-3 ${Col === "N/O" ? 'w-4' : 'w-1/5'}`}
                                >
                                    {Col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {products.filter(product => selectedRows.includes(product.NO)).map((product) => {
                            let total = product.quantity * product.sell;
                            return (
                                <tr
                                    key={product.NO}
                                    className={`text-center border cursor-pointer `}
                                >
                                    <td className="h-12 border">{product.NO}</td>
                                    <td>{product.name}</td>
                                    <td>{product.cost}</td>
                                    <td>{product.sell}</td>
                                    <td>{product.quantity}</td>
                                    <td>{total}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </>
        );
    } else {
        useEffect(() => {
            onRowSelection(selectedRows.length); // Pass the count of selected rows to the parent component
        }, [selectedRows, onRowSelection]);

        const toggleRow = (product) => {
            const isSelected = selectedRows.includes(product.NO);
            if (isSelected) {
                setSelectedRows(selectedRows.filter(row => row !== product.NO));
                console.log(selectedRows);

            } else {
                setSelectedRows([...selectedRows, product.NO]);
                console.log(selectedRows);

            }
        };

        return (
            <>
                <table className="mt-9 text-gray-600 w-full">
                    <thead className="bg-gray-300 text-gray-600">
                        <tr>
                            {thead.map((Col) => (
                                <th
                                    key={Col}
                                    className={`border font-normal p-3 ${Col === "N/O" ? 'w-4' : 'w-1/5'}`}
                                >
                                    {Col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={product.NO}
                                className={`text-center border cursor-pointer ${selectedRows.includes(product.NO) ? 'bg-blue-100' : ''}`}
                                onClick={() => toggleRow(product)}
                            >
                                <td className="h-12 border">{product.NO}</td>
                                <td>{product.name}</td>
                                <td>{product.cost}</td>
                                <td>{product.sell}</td>
                                <td>{product.quantity}</td>
                                <td>{product.quantity * product.sell}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </>
        );
    }
};

export default Table;
